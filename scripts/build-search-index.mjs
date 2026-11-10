// বিল্ড-টাইম জেনারেটর: সার্চ ইনডেক্স + ছবির ম্যানিফেস্ট → src/generated/
// চালান: npm run gen:search
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const out = join(root, 'src/generated');
mkdirSync(out, { recursive: true });

// meta.ts থেকে অধ্যায়ের তালিকা পার্স (সরল রেগুলার এক্সপ্রেশন — Row ফরম্যাট স্থির)
const metaSrc = readFileSync(join(root, 'src/content/meta.ts'), 'utf8');
const rowRe = /^\s*\[(\d+),\s*'([^']*)',\s*'([^']*)',\s*'(p\d+)',\s*'([^']+)'\],?$/gm;
const chapters = [];
for (const m of metaSrc.matchAll(rowRe)) {
  chapters.push({ number: Number(m[1]), title: m[2], subtitle: m[3], part: m[4], slug: m[5] });
}

const chapDir = join(root, 'src/content/chapters');
const docs = [];
let id = 0;
const strip = (s) =>
  s
    .replace(/<[^>]+>/g, ' ')
    .replace(/[`*_>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

for (const c of chapters) {
  docs.push({
    id: id++,
    kind: 'chapter',
    slug: c.slug,
    title: `${c.number}. ${c.title}`,
    text: c.subtitle,
    heading: '',
  });
  const file = readdirSync(chapDir).find(
    (f) => f.endsWith(`-${c.slug}.mdx`) || f === `${c.slug}.mdx`,
  );
  if (!file) continue;
  const src = readFileSync(join(chapDir, file), 'utf8');
  let inCode = false;
  let h = 0;
  for (const line of src.split('\n')) {
    if (line.startsWith('```')) inCode = !inCode;
    if (inCode) continue;
    const m = line.match(/^(#{2,3})\s+(.+)$/);
    if (m) {
      h++;
      docs.push({
        id: id++,
        kind: 'heading',
        slug: c.slug,
        title: strip(m[2]),
        text: `${c.number}. ${c.title}`,
        heading: `h-${h}`,
      });
    }
  }
}

// শব্দকোষ
const gSrc = readFileSync(join(root, 'src/content/glossary.ts'), 'utf8');
const gRe =
  /\{\s*en:\s*'((?:[^'\\]|\\.)*)',\s*bn:\s*'((?:[^'\\]|\\.)*)',\s*def:\s*'((?:[^'\\]|\\.)*)',\s*chapter:\s*'([^']+)',?\s*\}/g;
for (const m of gSrc.matchAll(gRe)) {
  docs.push({
    id: id++,
    kind: 'term',
    slug: m[4],
    title: `${m[1]} — ${m[2]}`,
    text: m[3],
    heading: '',
  });
}

writeFileSync(join(out, 'search-index.json'), JSON.stringify(docs));

// ছবির ম্যানিফেস্ট (public/ফোল্ডারে থাকা WebP)
const pub = join(root, 'public');
const walk = (dir) =>
  !existsSync(dir)
    ? []
    : readdirSync(dir).flatMap((f) => {
        const p = join(dir, f);
        return statSync(p).isDirectory() ? walk(p) : [p];
      });
const chapImgs = walk(join(pub, 'images/chapters'))
  .map((p) => relative(join(pub, 'images/chapters'), p).replace(/\\/g, '/'))
  .filter((p) => p.endsWith('.webp'));
writeFileSync(
  join(out, 'images.json'),
  JSON.stringify({ hero: existsSync(join(pub, 'ledu-hero.webp')), chapters: chapImgs }, null, 2),
);

console.log(
  `search index: ${docs.length} entries · images: ${chapImgs.length} chapter + hero=${existsSync(join(pub, 'ledu-hero.webp'))}`,
);
