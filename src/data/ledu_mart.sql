-- লেদু মার্ট ডাটাবেস (ledu_mart) — SQLite সামঞ্জস্যপূর্ণ
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

INSERT INTO categories (category_id, name, parent_id) VALUES
  (1, 'মুদি সামগ্রী', NULL),
  (2, 'চাল-ডাল', 1),
  (3, 'তেল-মসলা', 1),
  (4, 'পানীয়', NULL),
  (5, 'চা-কফি', 4),
  (6, 'দুগ্ধজাত', NULL),
  (7, 'শাকসবজি', NULL),
  (8, 'স্ন্যাকস', NULL);

INSERT INTO suppliers (supplier_id, name, phone, city) VALUES
  (1, 'বরেন্দ্র এগ্রো', '01711-100001', 'রাজশাহী'),
  (2, 'সাভার ট্রেডার্স', '01711-100002', 'সাভার'),
  (3, 'পদ্মা অয়েল ডিস্ট্রিবিউটর', '01711-100003', 'ঢাকা'),
  (4, 'সিলেট টি হাউস', '01711-100004', 'সিলেট'),
  (5, 'মীম ডেইরি', '01711-100005', 'সিরাজগঞ্জ'),
  (6, 'কৃষি বাজার লিমিটেড', '01711-100006', 'যশোর');

INSERT INTO products (product_id, name, category_id, supplier_id, price, stock, unit) VALUES
  (1, 'মিনিকেট চাল', 2, 1, 72, 500, 'কেজি'),
  (2, 'নাজিরশাইল চাল', 2, 1, 80, 300, 'কেজি'),
  (3, 'মসুর ডাল', 2, 2, 135, 200, 'কেজি'),
  (4, 'মুগ ডাল', 2, 2, 150, 120, 'কেজি'),
  (5, 'ছোলা', 2, 2, 110, 90, 'কেজি'),
  (6, 'সয়াবিন তেল (৫ লিটার)', 3, 3, 880, 60, 'বোতল'),
  (7, 'সরিষার তেল (১ লিটার)', 3, 3, 240, 80, 'বোতল'),
  (8, 'হলুদ গুঁড়া', 3, 2, 45, 150, 'প্যাকেট'),
  (9, 'মরিচ গুঁড়া', 3, 2, 55, 140, 'প্যাকেট'),
  (10, 'জিরা', 3, 2, 70, 100, 'প্যাকেট'),
  (11, 'লবণ', 3, 2, 40, 400, 'কেজি'),
  (12, 'চিনি', 1, 2, 125, 250, 'কেজি'),
  (13, 'সিলেটি চা পাতা', 5, 4, 180, 110, 'প্যাকেট'),
  (14, 'ইনস্ট্যান্ট কফি', 5, 4, 320, 40, 'বোতল'),
  (15, 'দানাদার চা', 5, 4, 95, 130, 'প্যাকেট'),
  (16, 'কোমল পানীয় (২ লিটার)', 4, 2, 95, 180, 'বোতল'),
  (17, 'আমের জুস', 4, 5, 35, 220, 'প্যাকেট'),
  (18, 'মিনারেল ওয়াটার', 4, 2, 20, 600, 'বোতল'),
  (19, 'তরল দুধ (১ লিটার)', 6, 5, 90, 150, 'প্যাকেট'),
  (20, 'গুঁড়া দুধ', 6, 5, 650, 45, 'প্যাকেট'),
  (21, 'দই (৫০০ গ্রাম)', 6, 5, 110, 70, 'কাপ'),
  (22, 'ঘি', 6, 5, 780, 25, 'কৌটা'),
  (23, 'আলু', 7, 6, 38, 800, 'কেজি'),
  (24, 'পেঁয়াজ', 7, 6, 70, 700, 'কেজি'),
  (25, 'টমেটো', 7, 6, 60, 200, 'কেজি'),
  (26, 'কাঁচা মরিচ', 7, 6, 120, 50, 'কেজি'),
  (27, 'ঝালমুড়ি মিক্স', 8, 2, 30, 300, 'প্যাকেট'),
  (28, 'চানাচুর', 8, 2, 25, 350, 'প্যাকেট'),
  (29, 'নুডলস', 8, 2, 25, 500, 'প্যাকেট'),
  (30, 'বিস্কুট', 8, 2, 20, 450, 'প্যাকেট');

INSERT INTO customers (customer_id, name, phone, city, area, joined_on, email) VALUES
  (1, 'রহিম উদ্দিন', '01710000000', 'সাভার', 'বাজার রোড', '2023-01-01', 'user1@example.com'),
  (2, 'করিম মিয়া', '01810137531', 'সাভার', 'জিরাবো', '2024-06-08', 'user2@example.com'),
  (3, 'সালমা বেগম', '01910275062', 'সাভার', 'আমিনবাজার', '2023-11-15', 'user3@example.com'),
  (4, 'জরিনা খাতুন', '01510412593', 'ঢাকা', 'মিরপুর', '2024-04-22', NULL),
  (5, 'আব্দুল হালিম', '01710550124', 'ঢাকা', 'মোহাম্মদপুর', '2023-09-01', 'user5@example.com'),
  (6, 'নাসির আহমেদ', '01810687655', 'আশুলিয়া', 'বাইপাইল', '2024-02-08', 'user6@example.com'),
  (7, 'ফাতেমা আক্তার', '01910825186', 'গাজীপুর', 'টঙ্গী', '2023-07-15', 'user7@example.com'),
  (8, 'মোতালেব হোসেন', '01510962717', 'সাভার', 'বাজার রোড', '2024-12-22', 'user8@example.com'),
  (9, 'রুমানা পারভীন', '01711100248', 'সাভার', 'জিরাবো', '2023-05-01', NULL),
  (10, 'শফিকুল ইসলাম', '01811237779', 'সাভার', 'আমিনবাজার', '2024-10-08', 'user10@example.com'),
  (11, 'তানজিনা ইয়াসমিন', '01911375310', 'ঢাকা', 'মিরপুর', '2023-03-15', 'user11@example.com'),
  (12, 'আলমগীর কবির', '01511512841', 'ঢাকা', 'মোহাম্মদপুর', '2024-08-22', 'user12@example.com'),
  (13, 'পারভীন সুলতানা', '01711650372', 'আশুলিয়া', 'বাইপাইল', '2023-01-01', 'user13@example.com'),
  (14, 'মাসুদ রানা', '01811787903', 'গাজীপুর', 'টঙ্গী', '2024-06-08', NULL),
  (15, 'নাজমা আক্তার', '01911925434', 'সাভার', 'বাজার রোড', '2023-11-15', 'user15@example.com'),
  (16, 'সোহেল রানা', '01512062965', 'সাভার', 'জিরাবো', '2024-04-22', 'user16@example.com'),
  (17, 'লিপি আক্তার', '01712200496', 'সাভার', 'আমিনবাজার', '2023-09-01', 'user17@example.com'),
  (18, 'জাহাঙ্গীর আলম', '01812338027', 'ঢাকা', 'মিরপুর', '2024-02-08', 'user18@example.com'),
  (19, 'শিউলি বেগম', '01912475558', 'ঢাকা', 'মোহাম্মদপুর', '2023-07-15', NULL),
  (20, 'বাবুল হোসেন', '01512613089', 'আশুলিয়া', 'বাইপাইল', '2024-12-22', 'user20@example.com');

INSERT INTO stores (store_id, name, city, opened_on) VALUES
  (1, 'লেদু মার্ট সাভার', 'সাভার', '2022-03-01'),
  (2, 'লেদু মার্ট মিরপুর', 'ঢাকা', '2023-01-15'),
  (3, 'লেদু মার্ট আশুলিয়া', 'আশুলিয়া', '2023-09-10');

INSERT INTO employees (employee_id, name, role, manager_id, store_id, salary, hired_on) VALUES
  (1, 'লেদু মিয়া', 'প্রতিষ্ঠাতা', NULL, 1, 90000, '2022-03-01'),
  (2, 'কদম আলী', 'পরামর্শক', 1, 1, 60000, '2022-03-05'),
  (3, 'সুমি আক্তার', 'স্টোর ম্যানেজার', 1, 1, 45000, '2022-04-01'),
  (4, 'রাকিব হাসান', 'স্টোর ম্যানেজার', 1, 2, 44000, '2023-01-20'),
  (5, 'মেহেদী হাসান', 'স্টোর ম্যানেজার', 1, 3, 42000, '2023-09-15'),
  (6, 'নুসরাত জাহান', 'সাপোর্ট এজেন্ট', 3, 1, 25000, '2022-06-10'),
  (7, 'তৌহিদ ইসলাম', 'সাপোর্ট এজেন্ট', 3, 1, 24000, '2022-08-01'),
  (8, 'ইমরান হোসেন', 'গুদামকর্মী', 3, 1, 20000, '2022-05-12'),
  (9, 'শাহিন আলম', 'গুদামকর্মী', 4, 2, 21000, '2023-02-01'),
  (10, 'পলাশ দাস', 'ক্যাশিয়ার', 4, 2, 22000, '2023-02-10'),
  (11, 'রুবেল মিয়া', 'ক্যাশিয়ার', 5, 3, 22000, '2023-10-01'),
  (12, 'আরিফ চৌধুরী', 'সাপোর্ট এজেন্ট', 5, 3, 24500, '2023-11-05');

INSERT INTO riders (rider_id, name, phone, bike_no, store_id) VALUES
  (1, 'জামাল', '01811-200001', 'ঢাকা মেট্রো-হ ১২-৩৪৫৬', 1),
  (2, 'কামাল', '01811-200002', 'ঢাকা মেট্রো-হ ১২-৭৮৯০', 1),
  (3, 'বাবু', '01811-200003', 'ঢাকা মেট্রো-ল ১১-১১১১', 2),
  (4, 'সজীব', '01811-200004', 'ঢাকা মেট্রো-ল ১১-২২২২', 2),
  (5, 'হাসান', '01811-200005', 'গাজীপুর মেট্রো-হ ১৩-৩৩৩৩', 3),
  (6, 'টিটু', '01811-200006', 'ঢাকা মেট্রো-হ ১২-৯৯৯৯', 1);

INSERT INTO orders (order_id, customer_id, store_id, order_date, status) VALUES
  (1, 14, 1, '2024-01-05', 'DELIVERED'),
  (2, 17, 1, '2024-01-20', 'DELIVERED'),
  (3, 20, 3, '2024-01-20', 'DELIVERED'),
  (4, 12, 2, '2024-02-21', 'DELIVERED'),
  (5, 16, 1, '2024-02-17', 'DELIVERED'),
  (6, 10, 3, '2024-02-14', 'DELIVERED'),
  (7, 17, 1, '2024-03-20', 'DELIVERED'),
  (8, 14, 1, '2024-03-03', 'DELIVERED'),
  (9, 3, 2, '2024-03-25', 'DELIVERED'),
  (10, 3, 2, '2024-04-06', 'DELIVERED'),
  (11, 12, 2, '2024-04-10', 'DELIVERED'),
  (12, 10, 3, '2024-04-03', 'DELIVERED'),
  (13, 10, 3, '2024-05-07', 'DELIVERED'),
  (14, 10, 3, '2024-05-02', 'DELIVERED'),
  (15, 12, 2, '2024-05-11', 'DELIVERED'),
  (16, 3, 2, '2024-06-24', 'DELIVERED'),
  (17, 5, 3, '2024-06-21', 'DELIVERED'),
  (18, 2, 1, '2024-06-05', 'DELIVERED'),
  (19, 2, 1, '2024-07-14', 'DELIVERED'),
  (20, 18, 2, '2024-07-19', 'DELIVERED'),
  (21, 3, 2, '2024-07-14', 'DELIVERED'),
  (22, 12, 2, '2024-08-07', 'DELIVERED'),
  (23, 17, 1, '2024-08-17', 'DELIVERED'),
  (24, 2, 1, '2024-08-01', 'DELIVERED'),
  (25, 1, 1, '2024-09-10', 'SHIPPED'),
  (26, 17, 1, '2024-09-19', 'SHIPPED'),
  (27, 2, 1, '2024-09-18', 'SHIPPED'),
  (28, 8, 1, '2024-10-26', 'PENDING'),
  (29, 16, 1, '2024-10-14', 'CANCELLED'),
  (30, 15, 2, '2024-10-24', 'CANCELLED');

INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES
  (1, 9, 4, 55),
  (1, 1, 3, 72),
  (1, 13, 4, 180),
  (2, 16, 4, 95),
  (2, 8, 4, 45),
  (3, 14, 4, 320),
  (3, 30, 1, 20),
  (3, 20, 3, 650),
  (4, 18, 3, 20),
  (5, 22, 3, 780),
  (5, 6, 3, 880),
  (5, 30, 4, 20),
  (6, 26, 2, 120),
  (6, 23, 2, 38),
  (7, 13, 3, 180),
  (8, 11, 4, 40),
  (8, 19, 1, 90),
  (9, 22, 2, 780),
  (9, 1, 2, 72),
  (10, 29, 3, 25),
  (11, 23, 4, 38),
  (11, 30, 3, 20),
  (11, 11, 1, 40),
  (12, 17, 1, 35),
  (13, 24, 3, 70),
  (13, 11, 3, 40),
  (13, 19, 4, 90),
  (13, 5, 3, 110),
  (14, 28, 1, 25),
  (14, 18, 1, 20),
  (15, 13, 3, 180),
  (15, 22, 2, 780),
  (15, 10, 3, 70),
  (15, 1, 3, 72),
  (16, 10, 4, 70),
  (16, 4, 2, 150),
  (17, 18, 2, 20),
  (17, 8, 4, 45),
  (17, 24, 4, 70),
  (17, 16, 1, 95),
  (18, 13, 2, 180),
  (18, 29, 2, 25),
  (18, 15, 2, 95),
  (19, 9, 2, 55),
  (19, 18, 1, 20),
  (20, 28, 3, 25),
  (21, 10, 1, 70),
  (22, 2, 3, 80),
  (22, 24, 2, 70),
  (22, 12, 2, 125),
  (23, 28, 3, 25),
  (24, 25, 1, 60),
  (24, 17, 1, 35),
  (24, 6, 3, 880),
  (24, 19, 4, 90),
  (25, 11, 2, 40),
  (26, 13, 4, 180),
  (27, 21, 2, 110),
  (27, 20, 3, 650),
  (28, 25, 3, 60),
  (28, 30, 3, 20),
  (29, 9, 2, 55),
  (29, 25, 4, 60),
  (29, 6, 1, 880),
  (30, 13, 4, 180),
  (30, 10, 4, 70),
  (30, 4, 1, 150),
  (30, 12, 1, 125);

INSERT INTO payments (payment_id, order_id, method, amount, paid_on, status) VALUES
  (1, 1, 'Card', 1156, '2024-01-05', 'PAID'),
  (2, 2, 'Nagad', 560, '2024-01-20', 'PAID'),
  (3, 3, 'Card', 3250, '2024-01-20', 'PAID'),
  (4, 4, 'Card', 60, '2024-02-21', 'PAID'),
  (5, 5, 'bKash', 5060, '2024-02-17', 'PAID'),
  (6, 6, 'Cash', 316, '2024-02-14', 'PAID'),
  (7, 7, 'Nagad', 540, '2024-03-20', 'PAID'),
  (8, 8, 'Cash', 250, '2024-03-03', 'PAID'),
  (9, 9, 'Cash', 1704, '2024-03-25', 'PAID'),
  (10, 10, 'Card', 75, '2024-04-06', 'PAID'),
  (11, 11, 'Cash', 252, '2024-04-10', 'PAID'),
  (12, 12, 'bKash', 35, '2024-04-03', 'PAID'),
  (13, 13, 'bKash', 1020, '2024-05-07', 'PAID'),
  (14, 14, 'Cash', 45, '2024-05-02', 'PAID'),
  (15, 15, 'Nagad', 2526, '2024-05-11', 'PAID'),
  (16, 16, 'Card', 580, '2024-06-24', 'PAID'),
  (17, 17, 'Nagad', 595, '2024-06-21', 'PAID'),
  (18, 18, 'Cash', 600, '2024-06-05', 'PAID'),
  (19, 19, 'Cash', 130, '2024-07-14', 'PAID'),
  (20, 20, 'Card', 75, '2024-07-19', 'PAID'),
  (21, 21, 'bKash', 70, '2024-07-14', 'PAID'),
  (22, 22, 'Card', 630, '2024-08-07', 'PAID'),
  (23, 23, 'Nagad', 75, '2024-08-17', 'PAID'),
  (24, 24, 'bKash', 3095, '2024-08-01', 'PAID'),
  (25, 25, 'bKash', 80, '2024-09-10', 'PAID'),
  (26, 26, 'Card', 720, '2024-09-19', 'PAID'),
  (27, 27, 'Card', 2170, '2024-09-18', 'PAID');

INSERT INTO deliveries (delivery_id, order_id, rider_id, delivered_on, status) VALUES
  (1, 1, 1, '2024-01-05', 'DELIVERED'),
  (2, 2, 2, '2024-01-20', 'DELIVERED'),
  (3, 3, 5, '2024-01-20', 'DELIVERED'),
  (4, 4, 4, '2024-02-21', 'DELIVERED'),
  (5, 5, 2, '2024-02-17', 'DELIVERED'),
  (6, 6, 5, '2024-02-14', 'DELIVERED'),
  (7, 7, 1, '2024-03-20', 'DELIVERED'),
  (8, 8, 2, '2024-03-03', 'DELIVERED'),
  (9, 9, 3, '2024-03-25', 'DELIVERED'),
  (10, 10, 3, '2024-04-06', 'DELIVERED'),
  (11, 11, 4, '2024-04-10', 'DELIVERED'),
  (12, 12, 5, '2024-04-03', 'DELIVERED'),
  (13, 13, 5, '2024-05-07', 'DELIVERED'),
  (14, 14, 5, '2024-05-02', 'DELIVERED'),
  (15, 15, 3, '2024-05-11', 'DELIVERED'),
  (16, 16, 4, '2024-06-24', 'DELIVERED'),
  (17, 17, 5, '2024-06-21', 'DELIVERED'),
  (18, 18, 2, '2024-06-05', 'DELIVERED'),
  (19, 19, 2, '2024-07-14', 'DELIVERED'),
  (20, 20, 3, '2024-07-19', 'DELIVERED'),
  (21, 21, 3, '2024-07-14', 'DELIVERED'),
  (22, 22, 3, '2024-08-07', 'DELIVERED'),
  (23, 23, 1, '2024-08-17', 'DELIVERED'),
  (24, 24, 2, '2024-08-01', 'DELIVERED'),
  (25, 25, 1, NULL, 'ON_THE_WAY'),
  (26, 26, 2, NULL, 'ON_THE_WAY'),
  (27, 27, 1, NULL, 'ON_THE_WAY');
