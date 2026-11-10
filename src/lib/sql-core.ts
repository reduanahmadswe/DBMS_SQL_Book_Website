import type { Database, SqlJsStatic, SqlValue } from 'sql.js';

export interface ResultSet {
  columns: string[];
  rows: SqlValue[][];
}

export interface RunOutcome {
  ok: boolean;
  results: ResultSet[];
  /** সর্বশেষ স্টেটমেন্টে প্রভাবিত সারি (INSERT/UPDATE/DELETE) */
  changes: number;
  error?: { raw: string; bn: string };
  ms: number;
}

/** ফ্রেশ ledu_mart ডাটাবেস বানায়। seedSql হলো src/data/ledu_mart.sql-এর কনটেন্ট। */
export function createDb(SQL: SqlJsStatic, seedSql: string): Database {
  const db = new SQL.Database();
  db.exec(seedSql);
  db.exec('PRAGMA foreign_keys = ON;');
  return db;
}

const ERROR_HINTS: [RegExp, (m: RegExpMatchArray) => string][] = [
  [
    /no such table: (\S+)/i,
    (m) =>
      `"${m[1]}" নামে কোনো টেবিল নেই। বানান ঠিক আছে কি? বাঁ পাশের Schema থেকে টেবিলের নাম দেখে নাও।`,
  ],
  [
    /no such column: (\S+)/i,
    (m) => `"${m[1]}" নামে কোনো কলাম পাওয়া যায়নি। কলামের নাম বা টেবিল alias ঠিক আছে কিনা দেখো।`,
  ],
  [
    /syntax error/i,
    () => 'SQL-এর গঠনে ভুল আছে। কমা, বন্ধনী, কোটেশন বা কীওয়ার্ডের বানান আর ক্রম খেয়াল করো।',
  ],
  [/near "([^"]+)"/i, (m) => `"${m[1]}" শব্দের কাছাকাছি কোথাও গোলমাল।`],
  [
    /UNIQUE constraint failed: (\S+)/i,
    (m) => `${m[1]} কলামে ডুপ্লিকেট মান ঢোকানোর চেষ্টা — UNIQUE/PRIMARY KEY নিয়ম ভাঙছে।`,
  ],
  [/NOT NULL constraint failed: (\S+)/i, (m) => `${m[1]} কলামে NULL রাখা যাবে না (NOT NULL)।`],
  [/CHECK constraint failed/i, () => 'CHECK নিয়ম ভাঙছে — মানটি শর্তের বাইরে।'],
  [
    /FOREIGN KEY constraint failed/i,
    () =>
      'Foreign key নিয়ম ভাঙছে — যে রেকর্ডকে রেফার করছ সেটা নেই, বা এই রেকর্ডকে অন্য টেবিল রেফার করছে।',
  ],
  [
    /ambiguous column name: (\S+)/i,
    (m) => `"${m[1]}" কলামটি একাধিক টেবিলে আছে — টেবিলের নাম বা alias দিয়ে লেখো (যেমন c.${m[1]})।`,
  ],
  [/incomplete input/i, () => 'স্টেটমেন্ট অসম্পূর্ণ — হয়তো বন্ধনী বা কোটেশন বন্ধ করোনি।'],
  [/readonly|read-only/i, () => 'ডাটাবেসটি read-only।'],
];

export function friendlyError(raw: string): string {
  for (const [re, f] of ERROR_HINTS) {
    const m = raw.match(re);
    if (m) return f(m);
  }
  return 'কোয়েরিটি চালানো যায়নি। নিচের মূল error বার্তা দেখে ভুল খুঁজে বের করো।';
}

/** একাধিক ; দিয়ে আলাদা স্টেটমেন্ট চালায়; প্রতিটি SELECT-এর ফল আলাদা ResultSet হয়। */
export function runSql(db: Database, sql: string): RunOutcome {
  const t0 = typeof performance !== 'undefined' ? performance.now() : Date.now();
  try {
    const results = db.exec(sql).map((r) => ({ columns: r.columns, rows: r.values }));
    return {
      ok: true,
      results,
      changes: db.getRowsModified(),
      ms: (typeof performance !== 'undefined' ? performance.now() : Date.now()) - t0,
    };
  } catch (e) {
    const raw = e instanceof Error ? e.message : String(e);
    return {
      ok: false,
      results: [],
      changes: 0,
      error: { raw, bn: friendlyError(raw) },
      ms: 0,
    };
  }
}

export interface TableInfo {
  name: string;
  columns: { name: string; type: string; pk: boolean; notnull: boolean }[];
  rowCount: number;
}

export function listTables(db: Database): TableInfo[] {
  const names =
    db
      .exec(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name",
      )[0]
      ?.values.map((r) => String(r[0])) ?? [];
  return names.map((name) => {
    const cols = db.exec(`PRAGMA table_info("${name}")`)[0]?.values ?? [];
    const count = db.exec(`SELECT COUNT(*) FROM "${name}"`)[0]?.values[0]?.[0];
    return {
      name,
      rowCount: Number(count ?? 0),
      columns: cols.map((c) => ({
        name: String(c[1]),
        type: String(c[2]),
        notnull: Number(c[3]) === 1,
        pk: Number(c[5]) > 0,
      })),
    };
  });
}

export function formatCell(v: SqlValue): string {
  if (v === null) return 'NULL';
  if (v instanceof Uint8Array) return `<${v.length} bytes>`;
  return String(v);
}
