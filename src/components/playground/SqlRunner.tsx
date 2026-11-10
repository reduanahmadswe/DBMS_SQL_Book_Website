import { useCallback, useEffect, useRef, useState } from 'react';
import type { Database } from 'sql.js';
import { runSql, type RunOutcome } from '@/lib/sql-core';
import { bnDigits } from '@/content/meta';
import { SqlEditor } from './SqlEditor';
import { ResultTable } from './ResultTable';

interface Props {
  initialQuery: string;
  /** check:sql-এ ফলাফলের সারি সংখ্যা যাচাই করতে (শেষ ResultSet-এর) */
  expectRows?: number;
  /** check:sql-এ ইচ্ছাকৃত error প্রত্যাশিত (যেমন constraint ভাঙার উদাহরণ) */
  expectError?: boolean;
  minRows?: number;
}

/** MDX-এর ভেতরের "চালাও ▶" বক্স। প্রতিটির নিজস্ব তাজা ledu_mart ডাটাবেস থাকে। */
export function SqlRunner({ initialQuery, minRows }: Props) {
  const query = initialQuery.trim();
  const [sql, setSql] = useState(query);
  const [out, setOut] = useState<RunOutcome | null>(null);
  const [busy, setBusy] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const dbRef = useRef<Database | null>(null);
  const alive = useRef(true);

  const getDb = useCallback(async () => {
    if (!dbRef.current) {
      const { openLeduMart } = await import('@/lib/sql-engine');
      const db = await openLeduMart();
      if (!alive.current) {
        db.close(); // কম্পোনেন্ট এর মধ্যে সরে গেছে — WASM মেমরি ছাড়ি
        throw new Error('unmounted');
      }
      dbRef.current = db;
    }
    return dbRef.current;
  }, []);

  const run = useCallback(async () => {
    setBusy(true);
    setLoadError(null);
    try {
      const db = await getDb();
      setOut(runSql(db, sql));
    } catch (e) {
      if (alive.current) setLoadError(e instanceof Error ? e.message : String(e));
    } finally {
      if (alive.current) setBusy(false);
    }
  }, [getDb, sql]);

  const reset = useCallback(() => {
    dbRef.current?.close();
    dbRef.current = null;
    setSql(query);
    setOut(null);
  }, [query]);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      dbRef.current?.close();
      dbRef.current = null;
    };
  }, []);

  const modified = sql.trim() !== query;

  return (
    <div className="not-prose my-6 rounded-xl border border-line bg-surface-2 p-3 shadow-[var(--shadow)]">
      <SqlEditor
        value={sql}
        onChange={setSql}
        onRun={() => void run()}
        label="SQL কোয়েরি লেখার জায়গা"
        minRows={minRows ?? 2}
      />
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="btn btn-teal btn-sm"
          onClick={() => void run()}
          disabled={busy}
        >
          {busy ? 'চলছে…' : 'চালাও ▶'}
        </button>
        {(modified || out) && (
          <button type="button" className="btn btn-ghost btn-sm" onClick={reset}>
            আগের অবস্থায় ফেরো
          </button>
        )}
        <span className="text-sm text-ink-faint">Ctrl/⌘ + Enter</span>
        {out?.ok && (
          <span className="ml-auto text-sm text-ink-soft">
            {bnDigits(out.ms.toFixed(1))} মি.সে.
          </span>
        )}
      </div>
      <div aria-live="polite" className="mt-3 space-y-3">
        {loadError && (
          <p className="rounded-lg bg-[var(--bad-bg)] p-3 text-[var(--bad-text)]">
            SQL ইঞ্জিন লোড হয়নি: {loadError}
          </p>
        )}
        {out && !out.ok && out.error && (
          <div className="rounded-lg border border-[var(--bad-line)] bg-[var(--bad-bg)] p-3 text-[var(--bad-text)]">
            <p className="font-semibold">{out.error.bn}</p>
            <p className="mt-1 break-words font-mono text-sm opacity-90">{out.error.raw}</p>
          </div>
        )}
        {out?.ok && out.results.length === 0 && (
          <p className="rounded-lg bg-[var(--good-bg)] p-3 text-[var(--good-text)]">
            সফলভাবে চলেছে
            {out.changes > 0 ? ` — ${bnDigits(out.changes)}টি সারি প্রভাবিত হয়েছে` : ''}। (কোনো
            ফলাফল-টেবিল নেই)
          </p>
        )}
        {out?.ok && out.results.map((r, i) => <ResultTable key={i} result={r} />)}
      </div>
    </div>
  );
}
