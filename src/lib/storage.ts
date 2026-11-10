import { useSyncExternalStore } from 'react';

/** localStorage-এর সব অ্যাক্সেস try/catch-এ মোড়ানো (private mode, blocked storage ইত্যাদির জন্য)। */
export function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
export function safeSet(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage unavailable — ignore */
  }
}

export interface QuizScore {
  score: number;
  total: number;
  at: number;
}

export interface ProgressState {
  read: string[];
  last: string | null;
  quiz: Record<string, QuizScore>;
}

const KEY = 'ledu:progress:v1';
const empty: ProgressState = { read: [], last: null, quiz: {} };

export function parseProgress(raw: string | null): ProgressState {
  if (!raw) return empty;
  try {
    const v = JSON.parse(raw) as Partial<ProgressState>;
    return {
      read: Array.isArray(v.read) ? v.read.filter((x): x is string => typeof x === 'string') : [],
      last: typeof v.last === 'string' ? v.last : null,
      quiz: v.quiz && typeof v.quiz === 'object' ? v.quiz : {},
    };
  } catch {
    return empty;
  }
}

let state: ProgressState = parseProgress(safeGet(KEY));
const listeners = new Set<() => void>();

function commit(next: ProgressState): void {
  state = next;
  safeSet(KEY, JSON.stringify(next));
  listeners.forEach((l) => l());
}

export const progress = {
  get: (): ProgressState => state,
  subscribe(l: () => void): () => void {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  markRead(slug: string): void {
    if (!state.read.includes(slug)) commit({ ...state, read: [...state.read, slug] });
  },
  setLast(slug: string): void {
    if (state.last !== slug) commit({ ...state, last: slug });
  },
  saveQuiz(chapter: string, score: number, total: number): void {
    const prev = state.quiz[chapter];
    if (prev && prev.score >= score) return; // সেরা স্কোর রাখি
    commit({ ...state, quiz: { ...state.quiz, [chapter]: { score, total, at: Date.now() } } });
  },
  reset(): void {
    commit(empty);
  },
};

export function useProgress(): ProgressState {
  return useSyncExternalStore(progress.subscribe, progress.get, progress.get);
}
