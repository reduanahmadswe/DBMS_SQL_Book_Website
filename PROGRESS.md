# PROGRESS.md — লেদুর ডাটাবেস অভিযান

নতুন সেশনে এই ফাইল পড়ে কাজ শুরু করো। স্ট্যাটাস: `todo` → `drafted` → `reviewed`।

## ফেজ

| ফেজ | বিষয় | স্ট্যাটাস |
|---|---|---|
| 1 | Foundation + অধ্যায় ০–২ | **সম্পন্ন (রিভিউ বাকি: ব্যবহারকারীর দেখা)** |
| 2 | পর্ব ১–৩ (অধ্যায় ৩–১৩) + পূর্ণ ERD সেট | **সম্পন্ন (ব্যবহারকারীর রিভিউ বাকি)** |
| 3 | পর্ব ৪ SQL (১৪–২৭) | todo |
| 4 | পর্ব ৫–৬ (২৮–৩৭) | todo |
| 5 | পর্ব ৭–১১ + শেষ অংশ (৩৮–৫২) | todo |
| 6 | Extra পেজ, SEO, পারফরম্যান্স, ডিপ্লয় | todo |

## অধ্যায়ের স্ট্যাটাস

`meta.ts`-এর `readySlugs`-এ slug যোগ করলে অধ্যায় "চালু" হয়; ফাইলের নাম `NN-<slug>.mdx`।

| # | slug | স্ট্যাটাস |
|---|---|---|
| 0 | introduction | drafted |
| 1 | khatar-jontrona | drafted |
| 2 | database-ar-dbms | drafted |
| 3–13 | database-er-tin-tola, data-model, er-diagram, sompokker-khela, eer, er-theke-table, table-er-bhasha, chabir-gocha, niyomer-bera, relational-algebra, relational-calculus | drafted |
| 14–52 | (বাকি সব) | todo |

## Phase 1-এ যা হয়েছে

- Vite 8 + React 19 + TypeScript strict + Tailwind v4 + MDX + Shiki (বিল্ড-টাইম) + sql.js।
- থিম টোকেন (লাইট/ডার্ক, WCAG AA যাচাই করা রঙ), Hind Siliguri + Tiro Bangla + JetBrains Mono (self-hosted)।
- লেআউট: হোম, চ্যাপ্টার (সাইডবার ড্রয়ার, TOC, পড়ার অগ্রগতি, prev/next, শেয়ার), প্লেগ্রাউন্ড, শব্দকোষ, ৪০৪, সার্চ (MiniSearch, Ctrl+K)।
- MDX কম্পোনেন্ট: Dialogue, Callout, KeyTerm, Summary, Exercise/Answer, StaticCode, Quiz, SqlRunner, Figure (+লাইটবক্স), StoryImage, TableView, SchemaDiagram, ERDiagram (Chen + Crow's Foot, (min,max), ISA সাপোর্ট), কনসেপ্ট ডায়াগ্রাম।
- চরিত্র SVG: লেদু, কদম চাচা, ফটকা, মিনু; দৃশ্য: tea-stall, khata-flood, dbms-storeroom।
- `ledu_mart.sql` (১১ টেবিল, ৩০ অর্ডার, ৬৮ order_items) — `scripts/gen-ledu-mart.mjs` থেকে তৈরি।
- `check:sql`, Vitest (২২ টেস্ট), ESLint, বিল্ড-পরবর্তী per-route HTML + sitemap + robots।

## জানা সীমাবদ্ধতা / পরের ধাপের কাজ

- **প্রি-রেন্ডার:** React Router v8 framework mode + MDX ঝুঁকিপূর্ণ হওয়ায় Vite SPA + `scripts/postbuild.mjs` (প্রতি রুটে আলাদা মেটাডেটাসহ HTML) বেছে নেওয়া হয়েছে। চ্যাপ্টারের মূল লেখা JS চালু হলে রেন্ডার হয়। Phase 6-এ প্রকৃত প্রি-রেন্ডারিং (বা অন্তত `<noscript>`/সারসংক্ষেপ) বিবেচনা।
- OG ইমেজ এখন একটি ডিফল্ট SVG (অনেক সোশ্যাল প্ল্যাটফর্ম SVG নেয় না) → Phase 6-এ PNG/WebP বানাতে হবে।
- ERD কম্পোনেন্টে এখন সব আছে: ISA (বৃত্ত d/o/U ও ত্রিভুজ), aggregation, category, weak entity, identifying relationship, composite/multi/derived attribute, (min,max), ternary, unary। বাকি: shared-subclass lattice ও Crow's Foot-এ aggregation বাক্স।

## Phase 2-এ যা হয়েছে

- অধ্যায় ৩–১৩ (প্রতিটিতে গল্প-দৃশ্য, ≥২ ডায়াগ্রাম, কুইজ, অনুশীলন); `check:sql` এখন মোট ৪৫ কোয়েরি।
- ERD সেট (Chen ও Crow's Foot দুটোতেই): attribute-প্রকার, 1:1, unary, ternary, weak entity, ধাপে ধাপে লেদু মার্ট (ধাপ ১, ২, পূর্ণ), EER (disjoint, overlapping+total, ISA ত্রিভুজ, aggregation, category), ক্লাসিক ছয়টি (University, Library, Hospital, Bank, Hotel, E-commerce) ম্যাপ করা স্কিমাসহ।
- নতুন ডায়াগ্রাম: ThreeSchema, Tiers, DbmsComponents, DataModelShapes, KeyHierarchy, QueryTree। শব্দকোষ ৭৩ শব্দ। MDX-এ `<Erd d="নাম" />`।
- (min,max) লেবেল Elmasri/Silberschatz-সম্মত করা হয়েছে (max আসে বিপরীত দিকের কার্ডিনালিটি থেকে)।
- সার্ভিস ওয়ার্কার (অফলাইন) Phase 6-এ।
- সাইডবারে "শীঘ্রই" ট্যাগ আছে এমন অধ্যায়ের পেজে placeholder দেখায়।
- চিটশিট ও প্রশ্ন ব্যাংক পেজ এখন জায়গাধারক (Phase 6)।
- লেখকের নাম ইংরেজিতেই (`Reduan Ahmad`) রাখা হয়েছে; বাংলা বানান চাইলে `site.config.ts`-এ বদলান।
- সামাজিক লিংক `site.config.ts`-এ প্লেসহোল্ডার।
