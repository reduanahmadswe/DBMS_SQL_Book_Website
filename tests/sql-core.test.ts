// @vitest-environment node
import { readFileSync } from 'node:fs';
import { beforeAll, describe, expect, it } from 'vitest';
import initSqlJs, { type SqlJsStatic } from 'sql.js';
import { createDb, friendlyError, listTables, runSql } from '@/lib/sql-core';
import { tokenize } from '@/lib/sql-highlight';

let SQL: SqlJsStatic;
const seed = readFileSync(new URL('../src/data/ledu_mart.sql', import.meta.url), 'utf8');

beforeAll(async () => {
  SQL = await initSqlJs();
});

describe('ledu_mart seed', () => {
  it('has the 11 expected tables with data', () => {
    const t = listTables(createDb(SQL, seed));
    expect(t.map((x) => x.name).sort()).toEqual([
      'categories',
      'customers',
      'deliveries',
      'employees',
      'order_items',
      'orders',
      'payments',
      'products',
      'riders',
      'stores',
      'suppliers',
    ]);
    expect(t.every((x) => x.rowCount >= 3)).toBe(true);
    expect(t.find((x) => x.name === 'orders')!.rowCount).toBe(30);
  });
  it('has no orphan foreign keys', () => {
    const db = createDb(SQL, seed);
    const r = runSql(db, 'PRAGMA foreign_key_check;');
    expect(r.ok).toBe(true);
    expect(r.results).toEqual([]);
  });
});

describe('runSql', () => {
  it('returns one result set per SELECT', () => {
    const db = createDb(SQL, seed);
    const r = runSql(db, 'SELECT 1 AS a; SELECT 2 AS b;');
    expect(r.ok).toBe(true);
    expect(r.results.map((x) => x.columns[0])).toEqual(['a', 'b']);
  });
  it('reports friendly Bangla errors with the raw message', () => {
    const db = createDb(SQL, seed);
    const r = runSql(db, 'SELECT * FROM nope;');
    expect(r.ok).toBe(false);
    expect(r.error!.raw).toMatch(/no such table/);
    expect(r.error!.bn).toContain('nope');
  });
  it('enforces CHECK and FOREIGN KEY constraints', () => {
    const db = createDb(SQL, seed);
    expect(
      runSql(
        db,
        "INSERT INTO products (name,category_id,supplier_id,price,stock,unit) VALUES ('x',1,1,-5,1,'kg')",
      ).ok,
    ).toBe(false);
    expect(
      runSql(db, "INSERT INTO orders VALUES (500, 999, 1, '2024-01-01', 'PENDING')").error!.raw,
    ).toMatch(/FOREIGN KEY/);
  });
  it('ROLLBACK restores state', () => {
    const db = createDb(SQL, seed);
    const r = runSql(
      db,
      'BEGIN; UPDATE products SET stock = 0; ROLLBACK; SELECT MIN(stock) FROM products;',
    );
    expect(r.results[0]!.rows[0]![0]).toBeGreaterThan(0);
  });
  it('maps unknown errors to a generic Bangla message', () => {
    expect(friendlyError('weird')).toMatch(/চালানো যায়নি/);
  });
});

describe('tokenize', () => {
  it('classifies keywords, strings, numbers and comments', () => {
    const t = tokenize("SELECT 'a''b', 12 -- hi\nFROM t");
    expect(t.filter((x) => x.kind === 'kw').map((x) => x.text)).toEqual(['SELECT', 'FROM']);
    expect(t.find((x) => x.kind === 'str')!.text).toBe("'a''b'");
    expect(t.find((x) => x.kind === 'num')!.text).toBe('12');
    expect(t.find((x) => x.kind === 'cmt')!.text).toBe('-- hi');
  });
  it('round-trips the source text exactly', () => {
    const src = "select count(*) as n\nfrom orders where status = 'ডেলিভারড';";
    expect(
      tokenize(src)
        .map((x) => x.text)
        .join(''),
    ).toBe(src);
  });
});
