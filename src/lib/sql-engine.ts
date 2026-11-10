import type { Database, SqlJsStatic } from 'sql.js';
import { createDb } from './sql-core';

let sqlPromise: Promise<SqlJsStatic> | null = null;
let seedPromise: Promise<string> | null = null;

/** sql.js (WASM) শুধু প্রথমবার দরকার হলেই লোড হয়, অন্য পেজে এটা বান্ডলে আসে না। */
export function loadSqlJs(): Promise<SqlJsStatic> {
  sqlPromise ??= (async () => {
    const [{ default: initSqlJs }, { default: wasmUrl }] = await Promise.all([
      import('sql.js'),
      import('sql.js/dist/sql-wasm-browser.wasm?url'),
    ]);
    return initSqlJs({ locateFile: () => wasmUrl });
  })();
  sqlPromise.catch(() => (sqlPromise = null)); // ব্যর্থ হলে আবার চেষ্টা করা যাবে
  return sqlPromise;
}

function loadSeed(): Promise<string> {
  seedPromise ??= import('../data/ledu_mart.sql?raw').then((m) => m.default);
  return seedPromise;
}

/** একদম নতুন ledu_mart ডাটাবেস (প্রতিটি রানারের নিজস্ব কপি)। */
export async function openLeduMart(): Promise<Database> {
  const [SQL, seed] = await Promise.all([loadSqlJs(), loadSeed()]);
  return createDb(SQL, seed);
}

export async function getSeedSql(): Promise<string> {
  return loadSeed();
}
