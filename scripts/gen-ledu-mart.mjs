// Generates src/data/ledu_mart.sql deterministically. Run: node scripts/gen-ledu-mart.mjs
import { writeFileSync } from 'node:fs';

let seed = 20240607;
const rnd = (n) => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return Math.floor(seed / 65536) % n;
};
const q = (s) =>
  s === null ? 'NULL' : typeof s === 'number' ? String(s) : `'${String(s).replace(/'/g, "''")}'`;
const ins = (t, cols, rows) =>
  `INSERT INTO ${t} (${cols}) VALUES\n` +
  rows.map((r) => '  (' + r.map(q).join(', ') + ')').join(',\n') +
  ';\n';

const categories = [
  [1, 'মুদি সামগ্রী', null],
  [2, 'চাল-ডাল', 1],
  [3, 'তেল-মসলা', 1],
  [4, 'পানীয়', null],
  [5, 'চা-কফি', 4],
  [6, 'দুগ্ধজাত', null],
  [7, 'শাকসবজি', null],
  [8, 'স্ন্যাকস', null],
];
const suppliers = [
  [1, 'বরেন্দ্র এগ্রো', '01711-100001', 'রাজশাহী'],
  [2, 'সাভার ট্রেডার্স', '01711-100002', 'সাভার'],
  [3, 'পদ্মা অয়েল ডিস্ট্রিবিউটর', '01711-100003', 'ঢাকা'],
  [4, 'সিলেট টি হাউস', '01711-100004', 'সিলেট'],
  [5, 'মীম ডেইরি', '01711-100005', 'সিরাজগঞ্জ'],
  [6, 'কৃষি বাজার লিমিটেড', '01711-100006', 'যশোর'],
];
// name, category, supplier, price, stock, unit
const products = [
  ['মিনিকেট চাল', 2, 1, 72, 500, 'কেজি'],
  ['নাজিরশাইল চাল', 2, 1, 80, 300, 'কেজি'],
  ['মসুর ডাল', 2, 2, 135, 200, 'কেজি'],
  ['মুগ ডাল', 2, 2, 150, 120, 'কেজি'],
  ['ছোলা', 2, 2, 110, 90, 'কেজি'],
  ['সয়াবিন তেল (৫ লিটার)', 3, 3, 880, 60, 'বোতল'],
  ['সরিষার তেল (১ লিটার)', 3, 3, 240, 80, 'বোতল'],
  ['হলুদ গুঁড়া', 3, 2, 45, 150, 'প্যাকেট'],
  ['মরিচ গুঁড়া', 3, 2, 55, 140, 'প্যাকেট'],
  ['জিরা', 3, 2, 70, 100, 'প্যাকেট'],
  ['লবণ', 3, 2, 40, 400, 'কেজি'],
  ['চিনি', 1, 2, 125, 250, 'কেজি'],
  ['সিলেটি চা পাতা', 5, 4, 180, 110, 'প্যাকেট'],
  ['ইনস্ট্যান্ট কফি', 5, 4, 320, 40, 'বোতল'],
  ['দানাদার চা', 5, 4, 95, 130, 'প্যাকেট'],
  ['কোমল পানীয় (২ লিটার)', 4, 2, 95, 180, 'বোতল'],
  ['আমের জুস', 4, 5, 35, 220, 'প্যাকেট'],
  ['মিনারেল ওয়াটার', 4, 2, 20, 600, 'বোতল'],
  ['তরল দুধ (১ লিটার)', 6, 5, 90, 150, 'প্যাকেট'],
  ['গুঁড়া দুধ', 6, 5, 650, 45, 'প্যাকেট'],
  ['দই (৫০০ গ্রাম)', 6, 5, 110, 70, 'কাপ'],
  ['ঘি', 6, 5, 780, 25, 'কৌটা'],
  ['আলু', 7, 6, 38, 800, 'কেজি'],
  ['পেঁয়াজ', 7, 6, 70, 700, 'কেজি'],
  ['টমেটো', 7, 6, 60, 200, 'কেজি'],
  ['কাঁচা মরিচ', 7, 6, 120, 50, 'কেজি'],
  ['ঝালমুড়ি মিক্স', 8, 2, 30, 300, 'প্যাকেট'],
  ['চানাচুর', 8, 2, 25, 350, 'প্যাকেট'],
  ['নুডলস', 8, 2, 25, 500, 'প্যাকেট'],
  ['বিস্কুট', 8, 2, 20, 450, 'প্যাকেট'],
];
const custNames = [
  'রহিম উদ্দিন',
  'করিম মিয়া',
  'সালমা বেগম',
  'জরিনা খাতুন',
  'আব্দুল হালিম',
  'নাসির আহমেদ',
  'ফাতেমা আক্তার',
  'মোতালেব হোসেন',
  'রুমানা পারভীন',
  'শফিকুল ইসলাম',
  'তানজিনা ইয়াসমিন',
  'আলমগীর কবির',
  'পারভীন সুলতানা',
  'মাসুদ রানা',
  'নাজমা আক্তার',
  'সোহেল রানা',
  'লিপি আক্তার',
  'জাহাঙ্গীর আলম',
  'শিউলি বেগম',
  'বাবুল হোসেন',
];
const areas = [
  ['সাভার', 'বাজার রোড'],
  ['সাভার', 'জিরাবো'],
  ['সাভার', 'আমিনবাজার'],
  ['ঢাকা', 'মিরপুর'],
  ['ঢাকা', 'মোহাম্মদপুর'],
  ['আশুলিয়া', 'বাইপাইল'],
  ['গাজীপুর', 'টঙ্গী'],
];
const pad = (n) => String(n).padStart(2, '0');
const customers = custNames.map((n, i) => {
  const a = areas[i % areas.length];
  const d = `202${3 + (i % 2)}-${pad(1 + ((i * 5) % 12))}-${pad(1 + ((i * 7) % 28))}`;
  const phone = `01${['7', '8', '9', '5'][i % 4]}${String(10000000 + i * 137531).slice(0, 8)}`;
  return [i + 1, n, phone, a[0], a[1], d, i % 5 === 3 ? null : `user${i + 1}@example.com`];
});
const stores = [
  [1, 'লেদু মার্ট সাভার', 'সাভার', '2022-03-01'],
  [2, 'লেদু মার্ট মিরপুর', 'ঢাকা', '2023-01-15'],
  [3, 'লেদু মার্ট আশুলিয়া', 'আশুলিয়া', '2023-09-10'],
];
// id, name, role, manager, store, salary, hired
const employees = [
  [1, 'লেদু মিয়া', 'প্রতিষ্ঠাতা', null, 1, 90000, '2022-03-01'],
  [2, 'কদম আলী', 'পরামর্শক', 1, 1, 60000, '2022-03-05'],
  [3, 'সুমি আক্তার', 'স্টোর ম্যানেজার', 1, 1, 45000, '2022-04-01'],
  [4, 'রাকিব হাসান', 'স্টোর ম্যানেজার', 1, 2, 44000, '2023-01-20'],
  [5, 'মেহেদী হাসান', 'স্টোর ম্যানেজার', 1, 3, 42000, '2023-09-15'],
  [6, 'নুসরাত জাহান', 'সাপোর্ট এজেন্ট', 3, 1, 25000, '2022-06-10'],
  [7, 'তৌহিদ ইসলাম', 'সাপোর্ট এজেন্ট', 3, 1, 24000, '2022-08-01'],
  [8, 'ইমরান হোসেন', 'গুদামকর্মী', 3, 1, 20000, '2022-05-12'],
  [9, 'শাহিন আলম', 'গুদামকর্মী', 4, 2, 21000, '2023-02-01'],
  [10, 'পলাশ দাস', 'ক্যাশিয়ার', 4, 2, 22000, '2023-02-10'],
  [11, 'রুবেল মিয়া', 'ক্যাশিয়ার', 5, 3, 22000, '2023-10-01'],
  [12, 'আরিফ চৌধুরী', 'সাপোর্ট এজেন্ট', 5, 3, 24500, '2023-11-05'],
];
const riders = [
  [1, 'জামাল', '01811-200001', 'ঢাকা মেট্রো-হ ১২-৩৪৫৬', 1],
  [2, 'কামাল', '01811-200002', 'ঢাকা মেট্রো-হ ১২-৭৮৯০', 1],
  [3, 'বাবু', '01811-200003', 'ঢাকা মেট্রো-ল ১১-১১১১', 2],
  [4, 'সজীব', '01811-200004', 'ঢাকা মেট্রো-ল ১১-২২২২', 2],
  [5, 'হাসান', '01811-200005', 'গাজীপুর মেট্রো-হ ১৩-৩৩৩৩', 3],
  [6, 'টিটু', '01811-200006', 'ঢাকা মেট্রো-হ ১২-৯৯৯৯', 1],
];
const orders = [];
const items = [];
const payments = [];
const deliveries = [];
const methods = ['bKash', 'Nagad', 'Cash', 'Card'];
let pid = 1;
let did = 1;
for (let o = 1; o <= 30; o++) {
  const cust = 1 + rnd(20);
  const store = 1 + (cust % 3 === 0 ? 1 : cust % 5 === 0 ? 2 : 0);
  const month = 1 + (Math.floor((o - 1) / 3) % 10);
  const day = 1 + rnd(27);
  const date = `2024-${pad(month)}-${pad(day)}`;
  const status = o <= 24 ? 'DELIVERED' : o <= 27 ? 'SHIPPED' : o === 28 ? 'PENDING' : 'CANCELLED';
  orders.push([o, cust, store, date, status]);
  const n = 1 + rnd(4);
  const used = new Set();
  for (let k = 0; k < n; k++) {
    let p;
    do {
      p = 1 + rnd(products.length);
    } while (used.has(p));
    used.add(p);
    items.push([o, p, 1 + rnd(4), products[p - 1][3]]);
  }
}
const total = (o) => items.filter((i) => i[0] === o).reduce((s, i) => s + i[2] * i[3], 0);
for (const o of orders) {
  if (o[4] === 'CANCELLED' || o[4] === 'PENDING') continue;
  const m = methods[rnd(4)];
  const delivered = o[4] === 'DELIVERED';
  payments.push([
    pid++,
    o[0],
    m,
    total(o[0]),
    o[3],
    m === 'Cash' && !delivered ? 'PENDING' : 'PAID',
  ]);
  const r = o[2] === 1 ? 1 + rnd(2) : o[2] === 2 ? 3 + rnd(2) : 5;
  deliveries.push([
    did++,
    o[0],
    r,
    delivered ? o[3] : null,
    delivered ? 'DELIVERED' : 'ON_THE_WAY',
  ]);
}

const header = `-- লেদু মার্ট ডাটাবেস (ledu_mart) — SQLite সামঞ্জস্যপূর্ণ
-- এই ফাইলটি scripts/gen-ledu-mart.mjs দিয়ে তৈরি। সব উদাহরণ এই একটাই ডাটাবেস ব্যবহার করে।
PRAGMA foreign_keys = ON;

CREATE TABLE categories (
  category_id INTEGER PRIMARY KEY,
  name        TEXT NOT NULL,
  parent_id   INTEGER REFERENCES categories(category_id)
);
CREATE TABLE suppliers (
  supplier_id INTEGER PRIMARY KEY,
  name        TEXT NOT NULL,
  phone       TEXT,
  city        TEXT
);
CREATE TABLE products (
  product_id  INTEGER PRIMARY KEY,
  name        TEXT NOT NULL,
  category_id INTEGER NOT NULL REFERENCES categories(category_id),
  supplier_id INTEGER NOT NULL REFERENCES suppliers(supplier_id),
  price       INTEGER NOT NULL CHECK (price > 0),
  stock       INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  unit        TEXT NOT NULL
);
CREATE TABLE customers (
  customer_id INTEGER PRIMARY KEY,
  name        TEXT NOT NULL,
  phone       TEXT NOT NULL UNIQUE,
  city        TEXT NOT NULL,
  area        TEXT,
  joined_on   TEXT NOT NULL,
  email       TEXT
);
CREATE TABLE stores (
  store_id  INTEGER PRIMARY KEY,
  name      TEXT NOT NULL,
  city      TEXT NOT NULL,
  opened_on TEXT NOT NULL
);
CREATE TABLE employees (
  employee_id INTEGER PRIMARY KEY,
  name        TEXT NOT NULL,
  role        TEXT NOT NULL,
  manager_id  INTEGER REFERENCES employees(employee_id),
  store_id    INTEGER NOT NULL REFERENCES stores(store_id),
  salary      INTEGER NOT NULL CHECK (salary > 0),
  hired_on    TEXT NOT NULL
);
CREATE TABLE riders (
  rider_id INTEGER PRIMARY KEY,
  name     TEXT NOT NULL,
  phone    TEXT NOT NULL,
  bike_no  TEXT NOT NULL UNIQUE,
  store_id INTEGER NOT NULL REFERENCES stores(store_id)
);
CREATE TABLE orders (
  order_id    INTEGER PRIMARY KEY,
  customer_id INTEGER NOT NULL REFERENCES customers(customer_id),
  store_id    INTEGER NOT NULL REFERENCES stores(store_id),
  order_date  TEXT NOT NULL,
  status      TEXT NOT NULL CHECK (status IN ('PENDING','SHIPPED','DELIVERED','CANCELLED'))
);
CREATE TABLE order_items (
  order_id   INTEGER NOT NULL REFERENCES orders(order_id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(product_id),
  quantity   INTEGER NOT NULL CHECK (quantity > 0),
  unit_price INTEGER NOT NULL,
  PRIMARY KEY (order_id, product_id)
);
CREATE TABLE payments (
  payment_id INTEGER PRIMARY KEY,
  order_id   INTEGER NOT NULL REFERENCES orders(order_id),
  method     TEXT NOT NULL CHECK (method IN ('bKash','Nagad','Cash','Card')),
  amount     INTEGER NOT NULL,
  paid_on    TEXT NOT NULL,
  status     TEXT NOT NULL CHECK (status IN ('PAID','PENDING','FAILED'))
);
CREATE TABLE deliveries (
  delivery_id  INTEGER PRIMARY KEY,
  order_id     INTEGER NOT NULL UNIQUE REFERENCES orders(order_id),
  rider_id     INTEGER NOT NULL REFERENCES riders(rider_id),
  delivered_on TEXT,
  status       TEXT NOT NULL CHECK (status IN ('ON_THE_WAY','DELIVERED','FAILED'))
);

`;
const body = [
  ins('categories', 'category_id, name, parent_id', categories),
  ins('suppliers', 'supplier_id, name, phone, city', suppliers),
  ins(
    'products',
    'product_id, name, category_id, supplier_id, price, stock, unit',
    products.map((p, i) => [i + 1, ...p]),
  ),
  ins('customers', 'customer_id, name, phone, city, area, joined_on, email', customers),
  ins('stores', 'store_id, name, city, opened_on', stores),
  ins('employees', 'employee_id, name, role, manager_id, store_id, salary, hired_on', employees),
  ins('riders', 'rider_id, name, phone, bike_no, store_id', riders),
  ins('orders', 'order_id, customer_id, store_id, order_date, status', orders),
  ins('order_items', 'order_id, product_id, quantity, unit_price', items),
  ins('payments', 'payment_id, order_id, method, amount, paid_on, status', payments),
  ins('deliveries', 'delivery_id, order_id, rider_id, delivered_on, status', deliveries),
].join('\n');
writeFileSync(new URL('../src/data/ledu_mart.sql', import.meta.url), header + body);
console.log(
  'orders',
  orders.length,
  'items',
  items.length,
  'payments',
  payments.length,
  'deliveries',
  deliveries.length,
);
