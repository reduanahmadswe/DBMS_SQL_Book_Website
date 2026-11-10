# লেদুর ডাটাবেস অভিযান

গল্পে গল্পে DBMS আর SQL — পুরোটা বাংলায়। কোনো ব্যাকএন্ড নেই; সব লেখা ফাইলে, SQL চলে ব্রাউজারেই (SQLite → WebAssembly)।

## চালানো

```bash
npm install
npm run dev          # http://localhost:5173
```

অন্যান্য কমান্ড:

```bash
npm run build        # সার্চ ইনডেক্স + টাইপচেক + বিল্ড + প্রতি রুটের HTML/sitemap (dist/)
npm run preview      # বিল্ড করা সাইট দেখা
npm run typecheck
npm run lint
npm run check:sql    # সব <SqlRunner> কোয়েরি তাজা ledu_mart-এ চালিয়ে যাচাই
npm test             # Vitest
```

## ফোল্ডার

```
site.config.ts            সাইটের নাম, লেখক, সোশ্যাল লিংক, baseUrl — এখানেই বদলান
src/content/meta.ts       অধ্যায়ের ক্রম, শিরোনাম, পর্ব; readySlugs (কোন অধ্যায় লেখা শেষ)
src/content/chapters/     NN-<slug>.mdx — প্রতিটি অধ্যায়
src/content/quizzes/      কুইজের ডাটা (টাইপড)
src/content/glossary.ts   শব্দকোষ
src/data/ledu_mart.sql    ডাটাবেস স্কিমা + সিড (scripts/gen-ledu-mart.mjs থেকে তৈরি)
src/data/erd-defs.ts      ERD-র ডাটা-সংজ্ঞা
src/components/           layout, mdx, diagrams, playground, characters
scripts/                  check-sql, সার্চ ইনডেক্স, postbuild, সিড জেনারেটর
```

## অধ্যায় যোগ/সম্পাদনা

1. `src/content/meta.ts`-এ অধ্যায়টি আগে থেকেই তালিকায় আছে। `src/content/chapters/NN-<slug>.mdx` ফাইল বানাও (`NN` দুই অঙ্কের ক্রম, `<slug>` meta-র slug)।
2. `readySlugs`-এ slug যোগ করো।
3. কুইজ লিখলে `src/content/quizzes/chNN.ts` বানিয়ে MDX-এ `import { questions } from '@/content/quizzes/chNN'` করো।
4. নতুন শব্দ `glossary.ts`-এ যোগ করো।
5. `npm run check:sql && npm test && npm run build` চালাও।

অধ্যায়ের ছাঁচ (`00-introduction.mdx` দেখো): গল্প → সমস্যাটা আসলে কী → কদম চাচার ক্লাস → টেকনিক্যাল গভীরে → হাতে-কলমে → ফটকার ভুল → পরীক্ষার টিপস → এক নজরে → কুইজ → অনুশীলন।

### MDX কম্পোনেন্ট (ইম্পোর্ট ছাড়াই পাওয়া যায়)

| কম্পোনেন্ট | ব্যবহার |
|---|---|
| `<Dialogue who="ledu\|kodom\|fotka\|minu">` | চরিত্রের সংলাপ |
| `<Callout type="tip\|warning\|exam\|note" title="…">` | হাইলাইট বক্স |
| `<KeyTerm en="…" bn="…">ব্যাখ্যা</KeyTerm>` | নতুন পরিভাষা |
| `<SqlRunner initialQuery={`…`} expectRows={N} expectError />` | চালানোযোগ্য SQL। `check:sql` এগুলো যাচাই করে। `expectRows` = শেষ ফলাফলের সারি; `expectError` = ইচ্ছাকৃত error |
| `<StaticCode lang="mysql">` + কোড-ফেন্স | প্লেগ্রাউন্ডে না-চলা কোড (লেবেলসহ)। কোড-ফেন্সের আগে-পরে ফাঁকা লাইন দাও |
| `<Quiz questions={questions} />` | MCQ |
| `<Exercise n={1}>প্রশ্ন <Answer>সমাধান</Answer></Exercise>` | অনুশীলন |
| `<Summary>` | এক নজরে |
| `<Figure n={1} caption="…" alt="…">` | নম্বরযুক্ত চিত্র + লাইটবক্স (`চিত্র <অধ্যায়>.<n>`) |
| `<StoryImage name="khata-flood" n={1} caption="…" />` | গল্পের ছবি (WebP থাকলে সেটা, নইলে SVG দৃশ্য) |
| `<ERDiagram def={…} />` | Chen / Crow's Foot টগলসহ ERD |
| `<TableView>`, `<TableRow>`, `<LeduSchema />`, `<SchemaDiagram>` | টেবিল ও স্কিমা ছবি |
| `<FileVsDbms />`, `<DataToInfo />`, `<DbmsUsers />`… | কনসেপ্ট ডায়াগ্রাম (`ConceptDiagrams.tsx`) |

### গল্পের ছবি বদলানো

`IMAGE_PROMPTS.md`-এর প্রম্পট দিয়ে ছবি বানিয়ে `public/images/chapters/<slug>/<name>.webp` এবং হিরো হিসেবে `public/ledu-hero.webp` রাখো। `npm run gen:search` (বা dev/build) চালালেই ধরা পড়বে।

## ডিপ্লয়

স্ট্যাটিক সাইট; `dist/` ফোল্ডারই সব। `vercel.json` ও `netlify.toml` দেওয়া আছে। GitHub Pages-এ `dist/` পুশ করো (`404.html` SPA ফলব্যাকের কাজ করে)। ডিপ্লয়ের আগে `site.config.ts`-এ `baseUrl` ঠিক করো — canonical, sitemap ও OG লিংক এটা থেকেই আসে।

## প্রযুক্তি

React 19 · TypeScript (strict) · Vite 8 · Tailwind CSS v4 · MDX · Shiki (বিল্ড-টাইম) · sql.js · MiniSearch · Vitest · ESLint · Prettier।

React Router v8 framework-mode prerender না নিয়ে Vite SPA + `scripts/postbuild.mjs` ব্যবহার করা হয়েছে — কারণ ও সীমাবদ্ধতা `PROGRESS.md`-এ।
