import type { ReactNode } from 'react';
import { Avatar, characterInfo, type CharacterId } from '../characters/Characters';

/* ───────── Dialogue ───────── */
const bubble: Record<CharacterId, string> = {
  ledu: 'border-accent bg-accent-tint',
  kodom: 'border-brand bg-brand-tint',
  fotka: 'border-[#e8743b] bg-[color-mix(in_srgb,#e8743b_14%,var(--surface))]',
  minu: 'border-[#d45a9c] bg-[color-mix(in_srgb,#d45a9c_13%,var(--surface))]',
};

export function Dialogue({ who, children }: { who: CharacterId; children: ReactNode }) {
  const info = characterInfo[who];
  return (
    <div className="not-prose my-5 flex items-start gap-3">
      <Avatar who={who} size={52} title={false} />
      <div
        className={`relative min-w-0 flex-1 rounded-2xl rounded-tl-sm border-2 px-4 py-2.5 ${bubble[who]}`}
      >
        <p className="mb-0.5 text-sm font-semibold text-ink-soft">{info.name}</p>
        <div className="space-y-2 text-[1.02rem] leading-[1.8] text-ink [&_code]:rounded [&_code]:bg-surface [&_code]:px-1 [&_code]:font-mono [&_code]:text-[0.88em] [&_p]:m-0">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ───────── Callout ───────── */
type CalloutType = 'tip' | 'warning' | 'exam' | 'note';
const callout: Record<CalloutType, { title: string; cls: string; icon: ReactNode }> = {
  tip: {
    title: 'টিপস',
    cls: 'border-[var(--good-line)] bg-[var(--good-bg)]',
    icon: (
      <path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2V16h5v-.1c0-.8.4-1.5 1-2A6 6 0 0 0 12 3Z" />
    ),
  },
  warning: {
    title: 'সাবধান',
    cls: 'border-[var(--warn-line)] bg-[var(--warn-bg)]',
    icon: <path d="M12 3 2 21h20L12 3Zm0 6v6m0 3v.01" />,
  },
  exam: {
    title: 'পরীক্ষার টিপস',
    cls: 'border-brand bg-brand-tint',
    icon: <path d="M4 5h16v14H4zM8 9h8M8 13h5" />,
  },
  note: {
    title: 'জেনে রাখো',
    cls: 'border-accent bg-accent-tint',
    icon: <path d="M12 8v.01M11 12h1v5h1M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z" />,
  },
};

export function Callout({
  type = 'note',
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const c = callout[type];
  return (
    <aside className={`not-prose my-6 rounded-xl border-l-[6px] px-4 py-3 ${c.cls}`} role="note">
      <p className="mb-1 flex items-center gap-2 font-semibold text-ink">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {c.icon}
        </svg>
        {title ?? c.title}
      </p>
      <div className="space-y-2 text-[1.02rem] leading-[1.8] text-ink [&_code]:rounded [&_code]:bg-surface [&_code]:px-1 [&_code]:font-mono [&_code]:text-[0.88em] [&_li]:ml-5 [&_li]:list-disc [&_p]:m-0">
        {children}
      </div>
    </aside>
  );
}

/* ───────── KeyTerm: "Primary Key (প্রাইমারি কি — যে চাবি দিয়ে…)" ───────── */
export function KeyTerm({ en, bn, children }: { en: string; bn: string; children?: ReactNode }) {
  return (
    <span>
      <strong className="font-semibold text-brand">{en}</strong>{' '}
      <span className="text-ink-soft">
        ({bn}
        {children ? <> — {children}</> : null})
      </span>
    </span>
  );
}

/* ───────── Summary ("এক নজরে") ───────── */
export function Summary({ children }: { children: ReactNode }) {
  return (
    <section
      className="not-prose my-8 rounded-2xl border-2 border-dashed border-accent bg-accent-tint p-5"
      aria-label="এক নজরে"
    >
      <p className="mb-2 font-display text-xl text-ink">এক নজরে</p>
      <div className="space-y-2 leading-[1.8] text-ink [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_p]:m-0 [&_strong]:font-semibold [&_code]:rounded [&_code]:bg-surface [&_code]:px-1 [&_code]:font-mono [&_code]:text-[0.88em]">
        {children}
      </div>
    </section>
  );
}

/* ───────── Exercise + Answer ───────── */
export function Exercise({ n, children }: { n: number; children: ReactNode }) {
  return (
    <div className="not-prose my-5 rounded-xl border border-line bg-surface p-4 shadow-[var(--shadow)]">
      <p className="mb-2 font-semibold text-brand">অনুশীলনী {n}</p>
      <div className="space-y-3 leading-[1.8] [&_code]:rounded [&_code]:bg-surface-2 [&_code]:px-1 [&_code]:font-mono [&_code]:text-[0.88em] [&_p]:m-0">
        {children}
      </div>
    </div>
  );
}

export function Answer({ children }: { children: ReactNode }) {
  return (
    <details className="group mt-3 rounded-lg border border-line bg-surface-2 px-3 py-2">
      <summary className="cursor-pointer select-none font-semibold text-accent-text marker:text-accent">
        সমাধান দেখো
      </summary>
      <div className="mt-2 space-y-2 leading-[1.8] [&_code]:rounded [&_code]:bg-surface [&_code]:px-1 [&_code]:font-mono [&_code]:text-[0.88em] [&_p]:m-0">
        {children}
      </div>
    </details>
  );
}

/* ───────── StaticCode — প্লেগ্রাউন্ডে চলবে না এমন কোড ───────── */
const langLabel: Record<string, string> = {
  mysql: 'MySQL',
  postgresql: 'PostgreSQL',
  sqlserver: 'SQL Server',
  oracle: 'Oracle',
  sql: 'SQL',
  json: 'JSON',
  text: 'টেক্সট',
};

export function StaticCode({
  lang = 'sql',
  note,
  children,
}: {
  lang?: string;
  note?: string;
  children: ReactNode;
}) {
  const label = langLabel[lang] ?? lang;
  const runnable = lang === 'sql';
  return (
    <div className="not-prose my-6 overflow-hidden rounded-xl border border-line bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line bg-surface-2 px-3 py-1.5 text-sm">
        <span className="rounded-full bg-brand px-2.5 py-0.5 font-semibold text-on-brand">
          {label}
        </span>
        {!runnable && (
          <span className="text-ink-soft">
            {note ?? `এটা ${label} সিনট্যাক্স — প্লেগ্রাউন্ডে (SQLite) চালানো যাবে না`}
          </span>
        )}
      </div>
      <div className="[&_pre]:m-0 [&_pre]:rounded-none [&_pre]:border-0">{children}</div>
    </div>
  );
}
