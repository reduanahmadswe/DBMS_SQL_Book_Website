// প্রতিটি MDX-এর <SqlRunner initialQuery={`...`} /> বের করে তাজা ledu_mart-এ চালায়; কোনো error হলে fail করে।
// যদি expectRows={N} থাকে, তবে শেষ ফলাফলের সারি-সংখ্যাও মেলায়।
// চালান: npm run check:sql
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import initSqlJs from 'sql.js';

const root = fileURLToPath(new URL('..', import.meta.url));
const dir = join(root, 'src/content/chapters');
const seed = readFileSync(join(root, 'src/data/ledu_mart.sql'), 'utf8');
const SQL = await initSqlJs();

// ১) ডেটা ফাইল নিজেই ঠিক আছে কি
try {
  const db = new SQL.Database();
  db.exec(seed);
  db.close();
} catch (e) {
  console.error('ledu_mart.sql লোড হয়নি:', e.message);
  process.exit(1);
}

const re = /<SqlRunner\b([\s\S]*?)\/>/g;
const qRe = /initialQuery=\{`([\s\S]*?)`\}/;
const eRe = /expectRows=\{(\d+)\}/;
const errRe = /\bexpectError\b/;
let total = 0;
let failed = 0;

for (const f of readdirSync(dir)
  .filter((x) => x.endsWith('.mdx'))
  .sort()) {
  const src = readFileSync(join(dir, f), 'utf8');
  let idx = 0;
  for (const m of src.matchAll(re)) {
    idx++;
    const attrs = m[1];
    const qm = attrs.match(qRe);
    if (!qm) {
      console.error(`✗ ${f} #${idx}: initialQuery={\`...\`} পাওয়া যায়নি`);
      failed++;
      continue;
    }
    total++;
    const sql = qm[1].trim();
    const db = new SQL.Database();
    try {
      db.exec(seed);
      db.exec('PRAGMA foreign_keys = ON;');
      const wantErr = errRe.test(attrs);
      let res;
      try {
        res = db.exec(sql);
      } catch (err) {
        if (wantErr) continue; // ইচ্ছাকৃত error — প্রত্যাশিত
        throw err;
      }
      if (wantErr) throw new Error('error প্রত্যাশিত ছিল (expectError), কিন্তু কোয়েরি সফল হয়েছে');
      const exp = attrs.match(eRe);
      if (exp) {
        const got = res.length ? res[res.length - 1].values.length : 0;
        if (got !== Number(exp[1]))
          throw new Error(`সারি-সংখ্যা মেলেনি: প্রত্যাশিত ${exp[1]}, পাওয়া গেছে ${got}`);
      }
    } catch (e) {
      failed++;
      console.error(`✗ ${f} #${idx}: ${e.message}\n    ${sql.split('\n').join('\n    ')}`);
    } finally {
      db.close();
    }
  }
}

if (failed) {
  console.error(`\ncheck:sql ব্যর্থ — ${failed}টি সমস্যা (${total}টি কোয়েরি যাচাই হয়েছে)`);
  process.exit(1);
}
console.log(`check:sql ঠিক আছে — ${total}টি কোয়েরি সফলভাবে চলেছে`);
