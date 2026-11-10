export interface Part {
  id: string;
  title: string;
  blurb: string;
}

export interface ChapterMeta {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  part: string;
  /** true হলে .mdx ফাইল লেখা হয়েছে */
  ready: boolean;
}

export const parts: Part[] = [
  { id: 'p0', title: 'পর্ব ০, শুরু', blurb: 'লেদুর টং থেকে লেদু মার্ট: গল্পের শুরু।' },
  {
    id: 'p1',
    title: 'পর্ব ১, ডাটাবেসের দুনিয়ায় প্রথম পা',
    blurb: 'খাতার যন্ত্রণা থেকে DBMS, আর্কিটেকচার ও ডাটা মডেল।',
  },
  { id: 'p2', title: 'পর্ব ২, নকশা আঁকা (ER Model)', blurb: 'ER, EER আর ER থেকে টেবিল।' },
  {
    id: 'p3',
    title: 'পর্ব ৩, রিলেশনাল মডেল',
    blurb: 'টেবিল, চাবি, constraint, অ্যালজেব্রা ও ক্যালকুলাস।',
  },
  { id: 'p4', title: 'পর্ব ৪, SQL শেখা', blurb: 'CREATE থেকে Window ফাংশন, Trigger ও DCL/TCL।' },
  {
    id: 'p5',
    title: 'পর্ব ৫, ভালো নকশা (Normalization)',
    blurb: 'Anomaly, FD, 1NF–5NF ও decomposition।',
  },
  {
    id: 'p6',
    title: 'পর্ব ৬, স্টোরেজ, ইনডেক্সিং ও কোয়েরি অপটিমাইজেশন',
    blurb: 'B+ Tree, Hashing, query plan।',
  },
  { id: 'p7', title: 'পর্ব ৭, ট্রানজ্যাকশন', blurb: 'ACID, schedule ও serializability।' },
  {
    id: 'p8',
    title: 'পর্ব ৮, কনকারেন্সি কন্ট্রোল',
    blurb: 'Lock, deadlock, MVCC, isolation level।',
  },
  { id: 'p9', title: 'পর্ব ৯, রিকভারি', blurb: 'Log, WAL, checkpoint, ARIES, backup।' },
  {
    id: 'p10',
    title: 'পর্ব ১০, নিরাপত্তা',
    blurb: 'Authentication, SQL injection প্রতিরোধ, encryption।',
  },
  {
    id: 'p11',
    title: 'পর্ব ১১, বড় হওয়ার পালা',
    blurb: 'Distributed DB, sharding, NoSQL, Data Warehouse।',
  },
  { id: 'p12', title: 'শেষ অংশ', blurb: 'নতুন বিপত্তি আর লেখকের কথা।' },
];

type Row = [number, string, string, string, string];

const rows: Row[] = [
  [0, 'ভূমিকা: লেদুর টং থেকে লেদু মার্ট', 'গল্পের শুরু, বই কীভাবে পড়বেন', 'p0', 'introduction'],
  [1, 'খাতার যন্ত্রণা', 'ফাইল সিস্টেমের গোলমাল থেকে ডাটাবেসের জন্ম', 'p1', 'khatar-jontrona'],
  [2, 'ডাটাবেস আর DBMS আসলে কী', 'ম্যানেজার ছাড়া গুদাম চলে না', 'p1', 'database-ar-dbms'],
  [
    3,
    'ডাটাবেসের তিন তলা',
    'Schema, ANSI/SPARC আর DBMS-এর ভেতরের কারখানা',
    'p1',
    'database-er-tin-tola',
  ],
  [4, 'ডাটা মডেলের নানা রূপ', 'গাছ, জাল, টেবিল আর তার পরের কথা', 'p1', 'data-model'],
  [5, 'ER ডায়াগ্রাম', 'ছবি এঁকে ডাটা ভাবার শুরু', 'p2', 'er-diagram'],
  [6, 'সম্পর্কের খেলা', 'Relationship, cardinality আর participation', 'p2', 'sompokker-khela'],
  [7, 'EER', 'Specialization, generalization আর aggregation', 'p2', 'eer'],
  [8, 'ER থেকে টেবিল', 'নকশা থেকে আসল স্কিমা', 'p2', 'er-theke-table'],
  [9, 'টেবিলের ভাষা', 'Relation, tuple, attribute, domain', 'p3', 'table-er-bhasha'],
  [10, 'চাবির গোছা', 'Super key থেকে surrogate key', 'p3', 'chabir-gocha'],
  [11, 'নিয়মের বেড়া', 'Integrity constraint-এর পাহারা', 'p3', 'niyomer-bera'],
  [12, 'রিলেশনাল অ্যালজেব্রা', 'σ, π, ⋈, ÷, কোয়েরির গণিত', 'p3', 'relational-algebra'],
  [13, 'রিলেশনাল ক্যালকুলাস', 'কী চাই, কীভাবে নয়', 'p3', 'relational-calculus'],
  [14, 'SQL-এর সাথে পরিচয়', 'ইতিহাস, DDL/DML/DCL/TCL আর data type', 'p4', 'sql-porichoy'],
  [15, 'টেবিল বানানো আর ভাঙা', 'CREATE, ALTER, DROP, TRUNCATE', 'p4', 'table-banano'],
  [16, 'ডাটা ঢোকানো, বদলানো, মোছা', 'INSERT, UPDATE, DELETE, upsert', 'p4', 'insert-update-delete'],
  [17, 'SELECT-এর জাদু', 'WHERE, ORDER BY, NULL আর execution order', 'p4', 'select-er-jadu'],
  [18, 'হিসাবনিকাশ', 'Aggregate, GROUP BY, HAVING', 'p4', 'hisabnikash'],
  [19, 'টেবিলে টেবিলে জোড়া', 'সব ধরনের JOIN', 'p4', 'join'],
  [20, 'প্রশ্নের ভেতরে প্রশ্ন', 'Subquery, correlated subquery, EXISTS', 'p4', 'subquery'],
  [21, 'সেট অপারেশন আর CASE', 'UNION, INTERSECT, EXCEPT, CASE', 'p4', 'set-operation-case'],
  [22, 'বিল্ট-ইন ফাংশন', 'String, number, date, COALESCE', 'p4', 'builtin-function'],
  [23, 'View', 'ভার্চুয়াল টেবিলের গল্প', 'p4', 'view'],
  [24, 'CTE', 'WITH, recursive CTE', 'p4', 'cte'],
  [25, 'Window ফাংশন', 'OVER, PARTITION BY, RANK, LAG', 'p4', 'window-function'],
  [
    26,
    'Stored Procedure, Function, Trigger, Cursor',
    'ডাটাবেসের ভেতরে প্রোগ্রাম',
    'p4',
    'procedure-trigger',
  ],
  [27, 'কে কী পারবে', 'GRANT, REVOKE, COMMIT, ROLLBACK, SAVEPOINT', 'p4', 'dcl-tcl'],
  [28, 'এক তথ্য তিন জায়গায়', 'Insertion, update ও deletion anomaly', 'p5', 'anomaly'],
  [
    29,
    'Functional Dependency',
    'Armstrong, closure, minimal cover, candidate key',
    'p5',
    'functional-dependency',
  ],
  [30, '1NF, 2NF, 3NF', 'ধাপে ধাপে নরমালাইজেশন', 'p5', '1nf-2nf-3nf'],
  [31, 'BCNF, 4NF, 5NF', 'আরও কড়া নিয়ম', 'p5', 'bcnf-4nf-5nf'],
  [
    32,
    'ভাঙার নিয়ম',
    'Lossless join, dependency preservation, denormalization',
    'p5',
    'decomposition',
  ],
  [33, 'ডাটা কোথায় থাকে', 'Storage hierarchy, page, file organization, RAID', 'p6', 'storage'],
  [34, 'Indexing', 'Dense, sparse, composite, covering index', 'p6', 'indexing'],
  [35, 'B-Tree আর B+ Tree', 'Search, split, merge, ধাপে ধাপে', 'p6', 'b-plus-tree'],
  [36, 'Hashing', 'Static, extendible ও linear hashing', 'p6', 'hashing'],
  [
    37,
    'কোয়েরি কীভাবে চলে',
    'Parsing থেকে join algorithm ও execution plan',
    'p6',
    'query-processing',
  ],
  [38, 'টাকা গেল, মাল এলো না', 'Transaction আর ACID', 'p7', 'transaction-acid'],
  [39, 'Schedule আর Serializability', 'Precedence graph ও recoverability', 'p7', 'schedule'],
  [
    40,
    'সবাই একসাথে অর্ডার দিলে',
    'Concurrency সমস্যা: lost update থেকে phantom',
    'p8',
    'concurrency-problem',
  ],
  [41, 'Lock', 'Shared/exclusive, 2PL, intention lock', 'p8', 'lock'],
  [42, 'Deadlock', 'Wait-for graph, wait-die, wound-wait', 'p8', 'deadlock'],
  [43, 'Lock ছাড়াও উপায়', 'Timestamp, optimistic, MVCC', 'p8', 'timestamp-mvcc'],
  [44, 'Isolation Levels', 'চার স্তর, কোনটায় কী ঘটে', 'p8', 'isolation-level'],
  [45, 'সার্ভার পুড়ে গেলে', 'Log, WAL, checkpoint, ARIES, backup', 'p9', 'recovery'],
  [46, 'চোর ঢুকলে কী হবে', 'Authentication, SQL injection, encryption', 'p10', 'security'],
  [47, 'এক সার্ভারে আর কুলায় না', 'Distributed DB, replication, 2PC', 'p11', 'distributed-db'],
  [48, 'Partitioning আর Sharding', 'CAP, BASE, eventual consistency', 'p11', 'sharding-cap'],
  [49, 'NoSQL', 'Key-value, document, column, graph', 'p11', 'nosql'],
  [50, 'Data Warehouse', 'OLTP vs OLAP, star schema, ETL', 'p11', 'data-warehouse'],
  [51, 'নতুন বিপত্তি!', 'পরের বইয়ের হাতছানি', 'p12', 'notun-bipotti'],
  [52, 'লেদুর কারিগর', 'লেখকের কথা, Reduan Ahmad · BornoSoft', 'p12', 'author'],
];

/** যে অধ্যায়গুলোর .mdx ফাইল লেখা হয়েছে (PROGRESS.md-এর সাথে মেলান) */
const readySlugs = new Set([
  'introduction',
  'khatar-jontrona',
  'database-ar-dbms',
  'database-er-tin-tola',
  'data-model',
  'er-diagram',
  'sompokker-khela',
  'eer',
  'er-theke-table',
  'table-er-bhasha',
  'chabir-gocha',
  'niyomer-bera',
  'relational-algebra',
  'relational-calculus',
]);

export const chapters: ChapterMeta[] = rows.map(([number, title, subtitle, part, slug]) => ({
  slug,
  number,
  title,
  subtitle,
  part,
  ready: readySlugs.has(slug),
}));

export const chapterBySlug = new Map(chapters.map((c) => [c.slug, c]));

export function neighbours(slug: string): { prev?: ChapterMeta; next?: ChapterMeta } {
  const i = chapters.findIndex((c) => c.slug === slug);
  return { prev: chapters[i - 1], next: chapters[i + 1] };
}

export const bnDigits = (n: number | string): string =>
  String(n).replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[Number(d)]);
