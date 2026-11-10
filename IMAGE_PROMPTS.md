# IMAGE_PROMPTS.md — গল্পের ছবির তালিকা ও প্রম্পট

প্রতিটি গল্পের ছবি এখন বিল্ট-ইন SVG হিসেবে আছে। এর চেয়ে ভালো ছবি বানালে **WebP** ফরম্যাটে (১২০০×৬৭৫, ১৬:৯) নিচের পথে রাখলেই `<StoryImage>` অটোমেটিক সেটা দেখাবে (এরপর `npm run gen:search` বা `npm run dev/build` চালাও — ম্যানিফেস্ট হালনাগাদ হবে)।

হিরো ছবি: `public/ledu-hero.webp` (১৬০০×৭২০)।

## একই চরিত্র-নকশা (প্রতিটি প্রম্পটে ব্যবহার করো)

> **Style:** flat vector illustration, clean shapes, soft rounded corners, minimal shading, friendly and funny storybook mood, no text inside the image except where specified, brand palette purple `#6E14A9` and teal `#11A39A` with warm skin tones and off-white paper tones, subtle bangladeshi everyday setting.
>
> **Ledu:** young Bangladeshi man (~25), tousled black hair with a small cowlick, big friendly smile, teal T-shirt, purple gamcha (checked scarf) around neck, brown skin.
> **Kodom Chacha:** elderly man, white beard, round glasses, white woven cap with teal band, purple panjabi (kurta), calm amused expression.
> **Fotka:** same age as Ledu, slicked-back hair, black sunglasses, gold chain, loud orange shirt, smug crooked smile.
> **Minu:** young woman, black hair in one braid with a teal tie, teal round glasses, purple kurti, holding a book.

---

## পেজ ও ছবি

| অধ্যায় | ফাইল পথ | বাংলা ক্যাপশন | Alt টেক্সট |
|---|---|---|---|
| হিরো (হোমপেজ) | `public/ledu-hero.webp` | — | লেদুর টং-এ চায়ের কেটলি হাতে লেদু |
| 0. ভূমিকা | `public/images/chapters/introduction/tea-stall.webp` | লেদুর টং — কেটলি আর বাকির খাতা, এই দুটোই লেদুর সম্বল | লেদুর টং-এর কাউন্টারে কেটলি হাতে হাসিমুখে লেদু, পাশে বাকির খাতা আর গরম চায়ের ধোঁয়া |
| 1. খাতার যন্ত্রণা | `public/images/chapters/khatar-jontrona/khata-flood.webp` | খাতা, স্প্রেডশিট আর কাস্টমারের দাবি — লেদু ডুবে যাচ্ছে তথ্যের বন্যায় | খাতার পাতার স্তূপে ঘেরা লেদু ঘাবড়ে গেছে, কাস্টমার বলছে টাকা শোধ করেছে কিন্তু খাতায় লেখা নেই |
| 2. ডাটাবেস আর DBMS | `public/images/chapters/database-ar-dbms/dbms-storeroom.webp` | কদম চাচার গোছানো গুদাম — প্রতিটি তাকে লেবেল, আর পুরোটা সামলায় একজন ম্যানেজার | গোছানো তাকে লেবেল-লাগানো টেবিলের নাম, লেদু আর কদম চাচা পাশাপাশি দাঁড়িয়ে |

> নতুন অধ্যায় লেখার সময় প্রতিটি `<StoryImage>`-এর জন্য এখানে একটি সারি যোগ করা হবে।

## প্রম্পট

### হিরো — `ledu-hero.webp`
Wide 20:9 flat vector illustration. A small roadside tea stall ("tong") in Savar, Bangladesh, with a purple tin roof and a teal signboard reading "লেদুর টং" in clean Bangla lettering. **Ledu** stands behind the counter holding a steaming steel tea kettle, grinning. On the counter: a thick red-covered ledger book (the "khata") with a handwritten "বাকি" note, tea cups with steam. A wooden bench on the left, a pale sun on the right. Soft teal-tinted sky. Brand colors #6E14A9 and #11A39A dominate. Friendly, slightly funny, no photographic detail. Leave calm empty space at the top right for the title overlay.

### 0. `tea-stall`
Same scene as the hero but 16:9, tighter framing on Ledu and the counter, kettle steam curling, ledger book clearly visible in the foreground, morning light.

### 1. `khata-flood`
16:9 flat vector. **Ledu** at the centre looking panicked (wide eyes, small round open mouth, hands raised), buried up to his waist in a flood of loose ledger pages and red ledgers, pages flying in the air with scribbled amounts in Bangla numerals. Two speech bubbles: one from an angry customer on the left "আমি তো পরশুই শোধ করেছি!", one from Ledu "কোন পাতায় ছিল রে বাবা!". Mood: comic chaos. Colors: purple background tint, off-white paper, red cover accents.

### 2. `dbms-storeroom`
16:9 flat vector. A tidy warehouse with three tall teal-and-purple shelves, every shelf compartment labelled with a database table name in monospace (customers, products, orders, payments, riders, suppliers, stores, employees, categories, deliveries, order_items). **Ledu** (right of centre) looks impressed; **Kodom Chacha** (far right) stands proudly with a hand raised, speech bubble: "লেদু বাপজান, সব জিনিসের একটা জায়গা, আর একজন ম্যানেজার — এটাই DBMS।". Calm, organised mood in contrast to the khata-flood scene.

---

## পর্ব ১–৩ (অধ্যায় ৩–১৩) — গল্পের ছবি

ফাইল পথের ছাঁচ: `public/images/chapters/<slug>/<name>.webp` (১২০০×৬৭৫)। সব প্রম্পটের শুরুতে উপরের "একই চরিত্র-নকশা" অংশ জুড়ে দাও।

| অধ্যায় | slug / name | বাংলা ক্যাপশন | দৃশ্য (English prompt) |
|---|---|---|---|
| 3 | `database-er-tin-tola/schema-change` | গুদামে নতুন তাক বসাতেই দোকানির খাতা গুলিয়ে গেল | Ledu installing a new shelf in a warehouse while cashier Rubel stares confused at a broken POS screen; Kodom Chacha points to a thin curtain labelled "view" between them. |
| 4 | `data-model/model-tree` | ক্যাটাগরির গাছে এক পণ্য দুই ডালে — লেদু ধাঁধায় | Ledu at a whiteboard tree diagram of grocery categories, a tea packet connected to two branches with confused scribbles; Kodom Chacha smiling beside a web-shaped diagram. |
| 5 | `er-diagram/entity-hunt` | মিনুর প্রশ্নে লেদু ব্যবসার 'জিনিস'গুলোর তালিকা বানাচ্ছে | Minu holding a notebook asking questions, Ledu listing "customer, product, order, rider" with little doodles. |
| 6 | `sompokker-khela/relationship-knots` | সম্পর্কের সুতো জট পাকালে মাঝে একটা নতুন গিঁট (টেবিল) লাগে | Ledu tangled in colourful threads connecting orders and products, Minu pointing to a neat junction box in the middle. |
| 7 | `eer/employee-types` | একই কর্মী-পরিবার, কিন্তু কাজ অনুযায়ী আলাদা বৈশিষ্ট্য | A family-tree style group: Ledu with a rider (helmet, bike key), a store manager (clipboard) and a support agent (headset), Kodom Chacha explaining. |
| 8 | `er-theke-table/er-to-table` | কদম চাচার নিয়ম: প্রতিটি এন্টিটি একটা টেবিল… | Kodom Chacha at a board turning a hand-drawn ER diagram into neat tables with arrows, Ledu taking notes. |
| 9 | `table-er-bhasha/table-anatomy` | মিনু টেবিলের সারি, কলাম আর ঘর চিনিয়ে দিচ্ছে | Minu pointing at a giant table: row highlighted "tuple", column highlighted "attribute"; Ledu amazed. |
| 10 | `chabir-gocha/key-bunch` | চাবির গোছা: কোন চাবিটা কোন তালার? | Ledu holding a big ring of differently shaped keys (some with tags: super, candidate, primary); Kodom Chacha holding the smallest gold key. |
| 11 | `niyomer-bera/fence` | ফটকা ভুল ডাটা ঢোকাতে চাইছে, কদম চাচার constraint-বেড়া আটকে দিচ্ছে | Fotka (sunglasses) trying to push a crate labelled "price -10" over a sturdy fence labelled CHECK / FOREIGN KEY; Kodom Chacha standing guard. |
| 12 | `relational-algebra/algebra-class` | মিনুর ক্লাস: σ সারি বাছে, π কলাম বাছে, ⋈ টেবিল জোড়ে | Minu teaching at a blackboard with big σ, π and ⋈ symbols and small tables; Ledu scribbling. |
| 13 | `relational-calculus/wish-list` | লেদু বলছে 'কী চাই' — 'কীভাবে' ভাবার দায়িত্ব ডাটাবেসের | Ledu phoning in a pizza order with a speech bubble "I want…", Kodom Chacha laughing with a cooking pot. |
