import type { ReactNode } from 'react';

type Cell = string | number | null;

interface Props {
  name?: string;
  columns: string[];
  rows: Cell[][];
  /** হাইলাইট করা সারির index (০ থেকে) */
  hiRows?: number[];
  /** হাইলাইট করা কলামের index */
  hiCols?: number[];
  /** "ভুল/অ্যানোমালি" হিসেবে লাল করা সারি */
  badRows?: number[];
  /** ঠিক/ভালো সারি (সবুজ) */
  goodRows?: number[];
  /** প্রাইমারি কি কলামের index (আন্ডারলাইন) */
  pk?: number[];
  caption?: ReactNode;
  compact?: boolean;
}

/** আগে/পরে দেখানোর সুন্দর টেবিল — সাধারণ HTML table, তাই স্ক্রিন-রিডারও পড়তে পারে। */
export function TableView({
  name,
  columns,
  rows,
  hiRows = [],
  hiCols = [],
  badRows = [],
  goodRows = [],
  pk = [],
  caption,
  compact,
}: Props) {
  return (
    <div className="inline-block min-w-[16rem] max-w-full align-top">
      {name && <p className="mb-1 font-mono text-sm font-semibold text-brand">{name}</p>}
      <div className="overflow-x-auto rounded-lg border border-line bg-surface">
        <table
          className={`w-full border-collapse ${compact ? 'text-[0.85rem]' : 'text-[0.93rem]'} leading-snug`}
        >
          {caption && <caption className="sr-only">{caption}</caption>}
          <thead>
            <tr>
              {columns.map((c, i) => (
                <th
                  key={i}
                  scope="col"
                  className={`whitespace-nowrap border-b border-line px-3 py-1.5 text-left font-semibold ${hiCols.includes(i) ? 'bg-[var(--warn-bg)]' : 'bg-surface-2'} ${pk.includes(i) ? 'underline decoration-brand decoration-2 underline-offset-4' : ''}`}
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, ri) => {
              const rowCls = badRows.includes(ri)
                ? 'bg-[var(--bad-bg)]'
                : goodRows.includes(ri)
                  ? 'bg-[var(--good-bg)]'
                  : hiRows.includes(ri)
                    ? 'bg-[var(--warn-bg)]'
                    : '';
              return (
                <tr key={ri} className={rowCls}>
                  {r.map((v, ci) => (
                    <td
                      key={ci}
                      className={`whitespace-nowrap border-b border-line px-3 py-1.5 last:border-r-0 ${hiCols.includes(ci) ? 'bg-[var(--warn-bg)]' : ''} ${v === null ? 'italic text-ink-faint' : ''}`}
                    >
                      {v === null ? 'NULL' : v}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** পাশাপাশি একাধিক টেবিল (যেমন 1NF → 2NF ভাঙা) */
export function TableRow({ children }: { children: ReactNode }) {
  return <div className="flex flex-wrap items-start gap-4">{children}</div>;
}
