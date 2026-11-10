import type { QuizQuestion } from '@/lib/quiz';

export const ch10: QuizQuestion[] = [
  {
    q: 'Super key কী?',
    options: [
      'যেকোনো একটি কলাম',
      'এক বা একাধিক attribute-এর সেট, যা দিয়ে relation-এর প্রতিটি tuple অনন্যভাবে চেনা যায়',
      'শুধু primary key',
      'foreign key',
    ],
    answer: 1,
    explain: 'Super key-তে বাড়তি attribute থাকতে পারে। যেমন {customer_id, name} একটি super key।',
  },
  {
    q: 'Candidate key কোনটি?',
    options: [
      'ন্যূনতম super key, এর কোনো প্রকৃত উপসেট আর super key নয়',
      'সবচেয়ে বড় super key',
      'foreign key',
      'NULL-able কলাম',
    ],
    answer: 0,
    explain: 'Candidate key = minimal super key।',
  },
  {
    q: 'R(A, B, C)-তে candidate key শুধু A। কতগুলো super key আছে?',
    options: ['১', '২', '৩', '৪'],
    answer: 3,
    explain: 'A যুক্ত যেকোনো উপসেট: {A}, {A,B}, {A,C}, {A,B,C} = ৪টি (২^(n−1) = ২² = ৪)।',
  },
  {
    q: 'Candidate key-দের মধ্যে যেটি primary key হিসেবে নির্বাচিত হয়নি, তাকে বলে—',
    options: ['Foreign key', 'Alternate key', 'Surrogate key', 'Composite key'],
    answer: 1,
    explain: 'Primary key বাদে বাকি candidate key-গুলো alternate key।',
  },
  {
    q: 'Primary key ও UNIQUE constraint-এর একটি পার্থক্য—',
    options: [
      'PK-তে NULL চলে না; টেবিলে PK একটিই, UNIQUE একাধিক হতে পারে',
      'UNIQUE-তে ডুপ্লিকেট চলে',
      'দুটো একই',
      'PK শুধু টেক্সটে',
    ],
    answer: 0,
    explain:
      'PK: NOT NULL + unique, প্রতি টেবিলে একটি। UNIQUE: একাধিক থাকতে পারে এবং (বেশিরভাগ DBMS-এ) NULL অনুমোদিত।',
  },
  {
    q: 'Surrogate key কী?',
    options: [
      'ব্যবসায়িক অর্থযুক্ত natural key',
      'সিস্টেম-তৈরি অর্থহীন (সাধারণত auto-increment) আইডি',
      'foreign key',
      'composite key',
    ],
    answer: 1,
    explain: 'Surrogate key = ব্যবসায়িক অর্থহীন কৃত্রিম key (যেমন auto-increment id)।',
  },
  {
    q: 'order_items-এ (order_id, product_id) মিলে PK। এটি কোন ধরনের key?',
    options: ['Composite key', 'Surrogate key', 'Alternate key', 'Foreign key only'],
    answer: 0,
    explain: 'একাধিক attribute মিলে গঠিত key = composite key।',
  },
];

export const ch11: QuizQuestion[] = [
  {
    q: 'Entity integrity constraint কী বলে?',
    options: [
      'Foreign key সবসময় মিলতে হবে',
      'Primary key-র কোনো অংশ NULL হতে পারবে না',
      'সব কলাম NOT NULL',
      'কোনো ডুপ্লিকেট নয়',
    ],
    answer: 1,
    explain: 'Entity integrity: প্রাইমারি কি-তে NULL নিষিদ্ধ (এবং unique)।',
  },
  {
    q: 'Referential integrity কী নিশ্চিত করে?',
    options: [
      'Foreign key-র মান হয় NULL, নয়তো রেফার-করা টেবিলের কোনো বিদ্যমান key-র সমান',
      'সব টেবিলে সমান সারি',
      'কলামের type সঠিক',
      'PK একটিই',
    ],
    answer: 0,
    explain: 'FK-তে ঝুলন্ত (dangling) রেফারেন্স থাকতে পারবে না।',
  },
  {
    q: 'ON DELETE CASCADE-এ parent সারি মুছলে child সারির কী হয়?',
    options: [
      'child-ও স্বয়ংক্রিয়ভাবে মুছে যায়',
      'child-এর FK NULL হয়',
      'মোছা বাতিল হয়',
      'কিছুই না',
    ],
    answer: 0,
    explain: 'CASCADE = parent-এর পরিবর্তন child-এ ছড়িয়ে পড়ে (মুছলে child-ও মুছে)।',
  },
  {
    q: 'ON DELETE SET NULL-এ parent মুছলে child-এর FK কী হয়?',
    options: ['মুছে যায়', 'NULL হয়', '০ হয়', 'অপরিবর্তিত'],
    answer: 1,
    explain: 'SET NULL: child সারি থাকে, কিন্তু FK মান NULL হয় (কলাম NOT NULL হলে এটি সম্ভব নয়)।',
  },
  {
    q: 'RESTRICT / NO ACTION-এ child সারি থাকলে parent মোছার চেষ্টা করলে কী হয়?',
    options: ['মোছা সফল', 'ত্রুটি দিয়ে বাতিল', 'child মুছে যায়', 'FK NULL হয়'],
    answer: 1,
    explain:
      'RESTRICT/NO ACTION অপারেশনটি প্রত্যাখ্যান করে (পার্থক্য: কখন যাচাই হয়, RESTRICT তাৎক্ষণিক, NO ACTION statement/transaction শেষে)।',
  },
  {
    q: 'DEFAULT constraint কখন কাজ করে?',
    options: [
      'মান না দিলে নির্ধারিত ডিফল্ট মান বসে',
      'মান বদলানো আটকায়',
      'ডুপ্লিকেট আটকায়',
      'টেবিল মোছা আটকায়',
    ],
    answer: 0,
    explain: 'INSERT-এ কলামের মান উহ্য থাকলে DEFAULT-এর মান বসে।',
  },
  {
    q: 'CHECK (price > 0) কোন integrity-র উদাহরণ?',
    options: ['Domain integrity', 'Entity integrity', 'Referential integrity', 'কোনোটিই নয়'],
    answer: 0,
    explain: 'কলামের বৈধ মানের পরিসর সীমিত করা = domain (semantic) integrity।',
  },
];

export const ch12: QuizQuestion[] = [
  {
    q: 'Selection (σ) কী করে?',
    options: ['কলাম বাছে', 'শর্ত মেনে সারি বাছে', 'দুটি রিলেশন জোড়ে', 'নাম বদলায়'],
    answer: 1,
    explain: 'σ_condition(R) শর্ত-সিদ্ধ tuple-গুলো (সারি) বাছে।',
  },
  {
    q: 'Projection (π) ফলাফলে ডুপ্লিকেট সারির কী হয়?',
    options: ['থাকে', 'মুছে যায় (relation সেট)', 'দ্বিগুণ হয়', 'error'],
    answer: 1,
    explain:
      'রিলেশনাল অ্যালজেব্রা সেট-ভিত্তিক, তাই π-এর পর ডুপ্লিকেট থাকে না (SQL-এ DISTINCT লাগে)।',
  },
  {
    q: 'R ∪ S, R ∩ S, R − S-এর জন্য শর্ত কী?',
    options: [
      'R, S union-compatible (একই degree ও সঙ্গতিপূর্ণ domain) হতে হবে',
      'R, S-এর সারি সংখ্যা সমান',
      'কোনো শর্ত নেই',
      'R-এ কোনো key থাকবে',
    ],
    answer: 0,
    explain:
      'Union compatibility: একই সংখ্যক attribute ও সংশ্লিষ্ট attribute-গুলোর domain সামঞ্জস্যপূর্ণ।',
  },
  {
    q: 'R-এ ৪টি tuple, S-এ ৫টি। R × S-এ কয়টি tuple?',
    options: ['৯', '২০', '১', '৫'],
    answer: 1,
    explain: 'Cartesian product-এ |R| × |S| = ৪ × ৫ = ২০টি।',
  },
  {
    q: 'Natural join কোন attribute-এর ভিত্তিতে জোড়ে?',
    options: [
      'যেকোনো attribute',
      'দুই রিলেশনের একই নামের সব attribute-এ সমান মান',
      'শুধু primary key',
      'কোনোটি নয়',
    ],
    answer: 1,
    explain: 'Natural join = একই নামের attribute-এর equi-join + পুনরাবৃত্ত কলাম একবার রাখা।',
  },
  {
    q: 'কোন ক্ষেত্রে Division (÷) ব্যবহার হয়?',
    options: ['"সবগুলো"-র (for all) ধরনের প্রশ্নে', 'সংখ্যা ভাগে', 'ডুপ্লিকেট মুছতে', 'sorting-এ'],
    answer: 0,
    explain: 'যেমন "যে ছাত্র সব আবশ্যিক কোর্সে ভর্তি", division।',
  },
  {
    q: 'Rename (ρ) এর কাজ কী?',
    options: ['রিলেশন/attribute-এর নাম বদলানো', 'সারি মোছা', 'টেবিল তৈরি', 'সাজানো'],
    answer: 0,
    explain: 'ρ_{S(A1,…)}(R) নতুন নাম দেয়; self-join-এ জরুরি।',
  },
  {
    q: 'Left outer join-এ ডান রিলেশনে মিল না পেলে বাঁ রিলেশনের tuple-এর ডান-পাশের attribute-এর মান কী হয়?',
    options: ['০', 'NULL', 'ফাঁকা স্ট্রিং', 'tuple বাদ'],
    answer: 1,
    explain: 'Outer join মিলহীন tuple রেখে অপর পাশ NULL দিয়ে পূর্ণ করে।',
  },
];

export const ch13: QuizQuestion[] = [
  {
    q: 'Tuple Relational Calculus-এর সাধারণ রূপ কোনটি?',
    options: ['{ t | P(t) }', '{ <x1,…,xn> | P }', 'σ(R)', 'SELECT'],
    answer: 0,
    explain: 'TRC: { t | P(t) }, t একটি tuple variable, P predicate। { <x1,…,xn> | P } হলো DRC।',
  },
  {
    q: 'Domain Relational Calculus-এর variable কী নির্দেশ করে?',
    options: ['পুরো tuple', 'attribute-এর domain-এর একটি মান', 'টেবিল', 'index'],
    answer: 1,
    explain: 'DRC-তে variable প্রতিটি attribute-এর domain থেকে মান নেয়।',
  },
  {
    q: 'Calculus ও algebra-র সম্পর্ক কী?',
    options: [
      'Algebra procedural, Calculus declarative; নিরাপদ calculus ও algebra সমান ক্ষমতার (Codd-এর উপপাদ্য)',
      'Calculus শক্তিশালী',
      'কোনো সম্পর্ক নেই',
      'Algebra শুধু সংখ্যায়',
    ],
    answer: 0,
    explain:
      'Safe TRC/DRC ও relational algebra expressive power-এ সমতুল্য, "relationally complete"।',
  },
  {
    q: 'Unsafe expression-এর উদাহরণ কোনটি?',
    options: [
      '{ t | ¬(t ∈ Customer) }',
      '{ t | t ∈ Customer ∧ t.city = "ঢাকা" }',
      '{ t.name | t ∈ Product }',
      '{ t | t ∈ Order }',
    ],
    answer: 0,
    explain: 'যা সব tuple বাদে সব সম্ভাব্য tuple দেয় (অসীম ফলাফল) তা unsafe।',
  },
  {
    q: 'SQL কোন ভাষার কাছাকাছি?',
    options: ['শুধু algebra', 'Calculus (TRC) ও algebra-র মিশ্রণ', 'শুধু DRC', 'কোনোটি নয়'],
    answer: 1,
    explain: 'SQL-এর গঠন প্রধানত TRC-ভিত্তিক, আর কার্যকর plan হয় algebra-য়।',
  },
  {
    q: '∀ (for all) কোয়ান্টিফায়ার SQL-এ প্রকাশ করা হয়—',
    options: [
      'NOT EXISTS ... NOT EXISTS দিয়ে',
      'GROUP BY দিয়ে',
      'DISTINCT দিয়ে',
      'ORDER BY দিয়ে',
    ],
    answer: 0,
    explain: '∀x P ≡ ¬∃x ¬P, তাই ডাবল NOT EXISTS।',
  },
];
