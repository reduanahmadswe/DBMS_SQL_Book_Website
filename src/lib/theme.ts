import { useSyncExternalStore } from 'react';
import { safeGet, safeSet } from './storage';

export type Theme = 'light' | 'dark';
const KEY = 'ledu:theme';
const listeners = new Set<() => void>();

export function currentTheme(): Theme {
  if (typeof document === 'undefined') return 'light';
  const attr = document.documentElement.getAttribute('data-theme');
  return attr === 'dark' ? 'dark' : 'light';
}

export function applyStoredTheme(): void {
  const saved = safeGet(KEY);
  document.documentElement.setAttribute('data-theme', saved === 'dark' ? 'dark' : 'light');
}

export function setTheme(t: Theme): void {
  document.documentElement.setAttribute('data-theme', t);
  safeSet(KEY, t);
  listeners.forEach((l) => l());
}

export function useTheme(): Theme {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    currentTheme,
    () => 'light',
  );
}
