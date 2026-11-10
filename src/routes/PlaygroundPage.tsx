import { useCallback, useEffect, useRef, useState } from 'react';
import type { Database } from 'sql.js';
import { listTables, runSql, type RunOutcome, type TableInfo } from '@/lib/sql-core';
import { usePageMeta } from '@/lib/page-meta';
import { bnDigits } from '@/content/meta';
import { SqlEditor } from '@/components/playground/SqlEditor';
import { ResultTable } from '@/components/playground/ResultTable';

const samples: { label: string; sql: string }[] = [
  { label: 'সব কাস্টমার', sql: 'SELECT * FROM customers;' },
  {
    label: 'দামি পণ্য (৫০০+ টাকা)',
    sql: 'SELECT name, price FROM products\nWHERE price > 500\nORDER BY price DESC;',
  },
  {
    label: 'কাস্টমারসহ অর্ডার (JOIN)',
    sql: 'SELECT o.order_id, c.name, o.order_date, o.status\nFROM orders o\nJOIN customers c ON c.customer_id = o.customer_id\nORDER BY o.order_id\nLIMIT 10;',
  },
  {
    label: 'ক্যাটাগরি অনুযায়ী পণ্য গোনা',
    sql: 'SELECT c.name AS category, COUNT(*) AS products\nFROM products p\nJOIN categories c ON c.category_id = p.category_id\nGROUP BY c.name\nORDER BY products DESC;',
  },
  {
    label: 'ম্যানেজারসহ কর্মী (SELF JOIN)',
    sql: 'SELECT e.name AS employee, m.name AS manager\nFROM employees e\nLEFT JOIN employees m ON m.employee_id = e.manager_id;',
  },
  {
    label: 'Query plan দেখো',
    sql: 'EXPLAIN QUERY PLAN\nSELECT * FROM orders WHERE customer_id = 3;',
  },
];

export default function PlaygroundPage() {
  usePageMeta(
    'SQL খেলার মাঠ',
    'ব্রাউজারেই SQL চালাও, লেদু মার্টের ডাটাবেস দিয়ে, কোনো ইনস্টলেশন ছাড়া।',
    '/playground',
  );
  const dbRef = useRef<Database | null>(null);
  const gen = useRef(0); // দ্রুত রিসেট/আনমাউন্টে পুরনো লোড বাতিল করার টোকেন
  const [sql, setSql] = useState(samples[2]!.sql);
  const [out, setOut] = useState<RunOutcome | null>(null);
  const [tables, setTables] = useState<TableInfo[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [err, setErr] = useState('');

  const load = useCallback(async () => {
    const mine = ++gen.current;
    try {
      const { openLeduMart } = await import('@/lib/sql-engine');
      dbRef.current?.close();
      const db = await openLeduMart();
      if (mine !== gen.current) {
        db.close();
        return;
      }
      dbRef.current = db;
      setTables(listTables(db));
      setOut(null);
      setStatus('ready');
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
      setStatus('error');
    }
  }, []);

  const reset = () => {
    setStatus('loading');
    void load();
  };

  useEffect(() => {
    // WASM ইঞ্জিন একটি বাইরের সিস্টেম; setState শুধু await-এর পরে হয় (সিঙ্ক্রোনাস নয়)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load();
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps -- ইচ্ছাকৃত: ক্লিনআপের সময়ের সর্বশেষ মান দরকার
      gen.current++;
      dbRef.current?.close();
    };
  }, [load]);

  const run = useCallback(() => {
    const db = dbRef.current;
    if (!db) return;
    const r = runSql(db, sql);
    setOut(r);
    if (r.ok) setTables(listTables(db)); // CREATE/DROP-এর পর স্কিমা হালনাগাদ
  }, [sql]);

  return (
    <main id="main" className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="font-display text-3xl sm:text-4xl">SQL খেলার মাঠ</h1>
      <p className="mt-1 text-ink-soft">
        তোমার ব্রাউজারেই SQLite চলছে, যা খুশি করো, ভুল হলে "ডাটাবেস রিসেট" চাপলেই আবার তাজা।
        (MySQL/PostgreSQL-এর stored procedure, GRANT ইত্যাদি এখানে চলবে না।)
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[18rem_1fr]">
        <aside
          aria-label="স্কিমা ব্রাউজার"
          className="rounded-2xl border border-line bg-surface p-3"
        >
          <div className="mb-2 flex items-center justify-between">
            <h2 className="font-display text-lg">লেদু মার্ট স্কিমা</h2>
            <button type="button" className="btn btn-ghost btn-sm" onClick={reset}>
              ডাটাবেস রিসেট
            </button>
          </div>
          {status === 'loading' && (
            <p className="text-ink-soft" role="status">
              ডাটাবেস লোড হচ্ছে…
            </p>
          )}
          {status === 'error' && <p className="text-[var(--bad-text)]">লোড হয়নি: {err}</p>}
          <ul className="space-y-1">
            {tables.map((t) => (
              <li key={t.name}>
                <details className="rounded-lg px-2 py-1 hover:bg-surface-2">
                  <summary className="cursor-pointer font-mono text-[0.93rem] font-semibold">
                    {t.name}{' '}
                    <span className="font-body text-xs font-normal text-ink-faint">
                      ({bnDigits(t.rowCount)})
                    </span>
                  </summary>
                  <ul className="mb-1 ml-4 mt-1 font-mono text-[0.85rem] leading-relaxed text-ink-soft">
                    {t.columns.map((c) => (
                      <li key={c.name}>
                        <button
                          type="button"
                          className="text-left hover:text-brand"
                          onClick={() =>
                            setSql(
                              (s) =>
                                `${s}${s.endsWith(' ') || s.endsWith('\n') || !s ? '' : ' '}${c.name}`,
                            )
                          }
                          title="কোয়েরিতে যোগ করো"
                        >
                          {c.pk ? 'PK ' : ''}
                          {c.name} <span className="text-ink-faint">{c.type.toLowerCase()}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            ))}
          </ul>
        </aside>

        <section aria-label="এডিটর ও ফলাফল" className="min-w-0">
          <div className="mb-2 flex flex-wrap gap-2" role="group" aria-label="নমুনা কোয়েরি">
            {samples.map((s) => (
              <button
                key={s.label}
                type="button"
                className="rounded-full border border-line bg-surface px-3 py-1 text-sm hover:border-brand hover:bg-brand-tint"
                onClick={() => setSql(s.sql)}
              >
                {s.label}
              </button>
            ))}
          </div>
          <SqlEditor value={sql} onChange={setSql} onRun={run} label="SQL কোয়েরি" minRows={8} />
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="btn btn-teal"
              onClick={run}
              disabled={status !== 'ready'}
            >
              চালাও ▶
            </button>
            <span className="text-sm text-ink-faint">Ctrl/⌘ + Enter</span>
            {out?.ok && (
              <span className="ml-auto text-sm text-ink-soft">
                {bnDigits(out.ms.toFixed(1))} মি.সে.
              </span>
            )}
          </div>
          <div aria-live="polite" className="mt-4 space-y-4">
            {out && !out.ok && out.error && (
              <div className="rounded-xl border border-[var(--bad-line)] bg-[var(--bad-bg)] p-4 text-[var(--bad-text)]">
                <p className="font-semibold">{out.error.bn}</p>
                <p className="mt-1 break-words font-mono text-sm">{out.error.raw}</p>
              </div>
            )}
            {out?.ok && out.results.length === 0 && (
              <p className="rounded-xl bg-[var(--good-bg)] p-4 text-[var(--good-text)]">
                সফলভাবে চলেছে{out.changes > 0 ? `, ${bnDigits(out.changes)}টি সারি প্রভাবিত` : ''}।
              </p>
            )}
            {out?.ok && out.results.map((r, i) => <ResultTable key={i} result={r} />)}
          </div>
        </section>
      </div>
    </main>
  );
}
