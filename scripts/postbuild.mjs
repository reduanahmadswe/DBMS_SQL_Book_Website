// বিল্ডের পরে: প্রতিটি রুটের জন্য আলাদা index.html (নিজস্ব title/description/canonical), sitemap.xml, robots.txt।
// এটা পূর্ণ SSR প্রি-রেন্ডার নয়, তবে শেয়ার-প্রিভিউ ও সার্চ ইঞ্জিনের মেটাডেটা ঠিক রাখে এবং
// স্ট্যাটিক হোস্টে সরাসরি /chapters/xyz খুললেও কাজ করে।
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
if (!existsSync(join(dist, 'index.html')))
  throw new Error('dist/index.html নেই — আগে vite build চালান');

const cfgSrc = readFileSync(join(root, 'site.config.ts'), 'utf8');
const baseUrl = cfgSrc.match(/baseUrl:\s*'([^']+)'/)[1];
const siteName = cfgSrc.match(/\n\s*name:\s*'([^']+)'/)[1];

const metaSrc = readFileSync(join(root, 'src/content/meta.ts'), 'utf8');
const bnDigits = (n) => String(n).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[d]);
const chapters = [
  ...metaSrc.matchAll(/^\s*\[(\d+),\s*'([^']*)',\s*'([^']*)',\s*'(p\d+)',\s*'([^']+)'\],?$/gm),
].map((m) => ({
  number: Number(m[1]),
  title: m[2],
  subtitle: m[3],
  slug: m[5],
}));

const template = readFileSync(join(dist, 'index.html'), 'utf8');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

function page(path, title, desc) {
  const full = title ? `${title} | ${siteName}` : siteName;
  const url = `${baseUrl}${path}`;
  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(full)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(desc)}$2`)
    .replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(full)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(desc)}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/, `$1${url}$2`)
    .replace(/(<meta property="og:image" content=")[^"]*(")/, `$1${baseUrl}/og-default.png$2`)
    .replace(/(<meta name="twitter:image" content=")[^"]*(")/, `$1${baseUrl}/og-default.png$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/, `$1${esc(full)}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/, `$1${esc(desc)}$2`);
  if (path !== '/') {
    const d = join(dist, path);
    mkdirSync(d, { recursive: true });
    writeFileSync(join(d, 'index.html'), html);
  } else writeFileSync(join(dist, 'index.html'), html);
}

const siteDesc = cfgSrc.match(/description:\s*\n?\s*'([^']+)'/)[1];
page('/', '', siteDesc);
const extra = [
  ['/playground', 'SQL খেলার মাঠ', 'ব্রাউজারেই SQL চালাও — লেদু মার্টের ডাটাবেস দিয়ে।'],
  ['/glossary', 'শব্দকোষ', 'বাংলা ↔ English টেকনিক্যাল শব্দকোষ।'],
  ['/cheatsheet', 'SQL চিটশিট', 'এক পাতায় SQL চিটশিট।'],
  ['/question-bank', 'প্রশ্ন ব্যাংক', 'বিশ্ববিদ্যালয় ও ব্যাংক আইটি পরীক্ষার প্রশ্ন।'],
];
extra.forEach(([p, t, d]) => page(p, t, d));
chapters.forEach((c) =>
  page(`/chapters/${c.slug}`, `${bnDigits(c.number)}. ${c.title}`, c.subtitle),
);
writeFileSync(join(dist, '404.html'), template); // GitHub Pages SPA ফলব্যাক

const urls = ['/', ...extra.map((e) => e[0]), ...chapters.map((c) => `/chapters/${c.slug}`)];
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${baseUrl}${u}</loc></url>`).join('\n')}\n</urlset>\n`,
);
writeFileSync(
  join(dist, 'robots.txt'),
  `User-agent: *\nAllow: /\nSitemap: ${baseUrl}/sitemap.xml\n`,
);
console.log(`postbuild: ${urls.length} পেজের HTML + sitemap.xml + robots.txt তৈরি হয়েছে`);
