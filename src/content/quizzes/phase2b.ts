import type { QuizQuestion } from '@/lib/quiz';

export const ch07: QuizQuestion[] = [
  {
    q: 'সাধারণ এন্টিটি (Employee) থেকে বিশেষায়িত উপ-শ্রেণি (Rider, Manager) তৈরি করার প্রক্রিয়াকে কী বলে?',
    options: ['Generalization', 'Specialization', 'Aggregation', 'Normalization'],
    answer: 1,
    explain:
      'Top-down: সুপারক্লাস থেকে সাবক্লাস তৈরি = Specialization। উল্টো (bottom-up, সাধারণ বৈশিষ্ট্য টেনে সুপারক্লাস বানানো) = Generalization।',
  },
  {
    q: 'Subclass সুপারক্লাসের attribute ও relationship পায়, এই বৈশিষ্ট্যকে বলে—',
    options: ['Aggregation', 'Attribute inheritance', 'Encapsulation', 'Union'],
    answer: 1,
    explain: 'Subclass সুপারক্লাসের সব attribute ও সম্পর্ক উত্তরাধিকারসূত্রে পায়।',
  },
  {
    q: 'Disjoint constraint বলতে কী বোঝায়?',
    options: [
      'একটি entity একাধিক subclass-এর সদস্য হতে পারে',
      'একটি entity সর্বোচ্চ একটি subclass-এর সদস্য হতে পারে',
      'প্রতিটি superclass entity কোনো না কোনো subclass-এ থাকতেই হবে',
      'subclass-এর নিজস্ব key থাকে',
    ],
    answer: 1,
    explain:
      'Disjoint (d) = subclass-গুলো পরস্পর বিচ্ছিন্ন; overlapping (o) হলে একাধিক subclass-এ থাকা সম্ভব।',
  },
  {
    q: 'Total specialization-এর অর্থ—',
    options: [
      'প্রতিটি superclass entity অন্তত একটি subclass-এর সদস্য',
      'কিছু entity subclass-এ নাও থাকতে পারে',
      'একটি entity সব subclass-এর সদস্য',
      'subclass থেকে superclass বাদ',
    ],
    answer: 0,
    explain:
      'Total = superclass-এর প্রতিটি entity কোনো না কোনো subclass-এ থাকবে (ডবল লাইন)। Partial হলে কেউ কেউ বাইরে থাকতে পারে।',
  },
  {
    q: 'Aggregation কেন ব্যবহার করা হয়?',
    options: [
      'attribute মোছার জন্য',
      'একটি সম্পর্ককে (সংশ্লিষ্ট entity-সহ) একটি একক entity ধরে অন্য সম্পর্কে অংশ নিতে',
      'ডাটা কম্প্রেস করতে',
      'সম্পর্ক বাদ দিতে',
    ],
    answer: 1,
    explain:
      'ER-এ সম্পর্ক-সম্পর্ক সরাসরি হয় না; aggregation দিয়ে একটি সম্পর্ককে abstract entity বানিয়ে তার উপর আরেকটি সম্পর্ক বসানো হয়।',
  },
  {
    q: 'Category (Union type) কী?',
    options: [
      'একটি subclass-এর একাধিক superclass থেকে সদস্য নেওয়া, যেখানে সদস্য কেবল একটি superclass থেকে আসে',
      'দুটি টেবিলকে UNION করা',
      'একটি entity-র সব attribute একত্র করা',
      'weak entity-র আরেক নাম',
    ],
    answer: 0,
    explain:
      'Category হলো বিভিন্ন entity set-এর union-এর উপ-সেট; Payer হতে পারে Customer অথবা Corporate_Client।',
  },
  {
    q: 'Generalization কোন পদ্ধতির নাম?',
    options: ['Top-down', 'Bottom-up', 'Lateral', 'Random'],
    answer: 1,
    explain:
      'Generalization = নিচের (আলাদা) entity-গুলোর সাধারণ বৈশিষ্ট্য টেনে উপরে সুপারক্লাস তৈরি, bottom-up।',
  },
];

export const ch08: QuizQuestion[] = [
  {
    q: 'ER থেকে রিলেশনাল মডেলে একটি regular strong entity কীভাবে রূপান্তরিত হয়?',
    options: [
      'একটি কলাম',
      'একটি টেবিল, যার primary key = entity-র key',
      'একটি foreign key',
      'একটি view',
    ],
    answer: 1,
    explain:
      'প্রতিটি regular entity সেট একটি টেবিল; simple attribute কলাম; key attribute primary key।',
  },
  {
    q: 'Binary 1:N সম্পর্ক (Customer–Order) কীভাবে ম্যাপ হয়?',
    options: [
      'আলাদা সংযোগ-টেবিল',
      'N-দিকের টেবিলে (orders) 1-দিকের primary key-কে foreign key হিসেবে যোগ করে',
      '1-দিকের টেবিলে N-দিকের key যোগ করে',
      'দুটো টেবিল এক করে',
    ],
    answer: 1,
    explain: 'N-দিকের টেবিলে (orders) foreign key (customer_id) রাখা হয়।',
  },
  {
    q: 'M:N সম্পর্কের জন্য কী করতে হয়?',
    options: [
      'আলাদা সংযোগ-টেবিল, যার key = উভয় entity-র key-এর সমন্বয়',
      'কোনো একটি টেবিলে অতিরিক্ত কলাম',
      'কিছুই না',
      'দুটো foreign key দুই টেবিলেই',
    ],
    answer: 0,
    explain:
      'M:N-এ নতুন টেবিল (যেমন order_items) যার foreign key দুটি মিলে composite primary key; সম্পর্কের attribute (quantity) এখানেই।',
  },
  {
    q: 'Multi-valued attribute কীভাবে ম্যাপ হয়?',
    options: [
      'কমা-বিভক্ত কলাম',
      'আলাদা টেবিল: entity-র key + attribute; উভয় মিলে primary key',
      'ফেলে দেওয়া হয়',
      'JSON কলাম (সবসময়)',
    ],
    answer: 1,
    explain: 'যেমন supplier_phones(supplier_id, phone), দুই কলাম মিলে primary key।',
  },
  {
    q: 'Weak entity-র টেবিলের primary key কী?',
    options: [
      'শুধু partial key',
      'owner-এর primary key + partial key',
      'শুধু owner-এর key',
      'কোনো key নেই',
    ],
    answer: 1,
    explain: 'Owner-এর key foreign key হিসেবে আসে, partial key-র সাথে মিলে primary key গড়ে।',
  },
  {
    q: 'Derived attribute ম্যাপিংয়ে কী হয়?',
    options: [
      'আলাদা টেবিল',
      'সাধারণত কলাম হয় না; কোয়েরিতে হিসাব করা হয়',
      'primary key হয়',
      'foreign key হয়',
    ],
    answer: 1,
    explain: 'Derived মান সংরক্ষণ না করাই ভালো (inconsistency এড়াতে)।',
  },
  {
    q: 'Composite attribute (address → area, city) কীভাবে ম্যাপ হয়?',
    options: ['একটি কলাম', 'উপাদানগুলো আলাদা কলাম', 'আলাদা টেবিল', 'বাদ'],
    answer: 1,
    explain: 'Composite attribute-এর simple উপাদানগুলো আলাদা কলাম হয়।',
  },
  {
    q: 'Binary 1:1 সম্পর্কে সাধারণ ম্যাপিং-পদ্ধতি কোনটি?',
    options: [
      'যেকোনো একদিকে (বিশেষত total participation-এর দিকে) foreign key রেখে তাকে UNIQUE করা',
      'সংযোগ-টেবিল বাধ্যতামূলক',
      'দুটো foreign key দুই দিকে',
      'ম্যাপ করা যায় না',
    ],
    answer: 0,
    explain:
      'Foreign key পদ্ধতি সবচেয়ে প্রচলিত; তাতে UNIQUE দিয়ে ১:১ নিশ্চিত করা হয়। বিকল্প: দুটো টেবিল মিলিয়ে এক করা, বা সংযোগ-টেবিল।',
  },
];

export const ch09: QuizQuestion[] = [
  {
    q: 'রিলেশনাল মডেলে "relation" বলতে বোঝায়—',
    options: ['দুই টেবিলের সম্পর্ক', 'টেবিল (tuple-এর সেট)', 'foreign key', 'ডাটাবেস'],
    answer: 1,
    explain: 'Relation = টেবিল। সম্পর্ক বোঝাতে relationship বা foreign key শব্দ ব্যবহার হয়।',
  },
  {
    q: 'একটি relation-এর tuple-সংখ্যাকে বলে—',
    options: ['Degree', 'Cardinality', 'Domain', 'Arity'],
    answer: 1,
    explain: 'Cardinality = tuple (সারি) সংখ্যা। Degree (arity) = attribute (কলাম) সংখ্যা।',
  },
  {
    q: 'নিচের কোনটি relation-এর বৈশিষ্ট্য?',
    options: [
      'Tuple-এর ক্রম গুরুত্বপূর্ণ',
      'Duplicate tuple থাকতে পারে',
      'প্রতিটি attribute-এর মান atomic',
      'attribute-নাম ডুপ্লিকেট হতে পারে',
    ],
    answer: 2,
    explain:
      'Relation-এ tuple-ক্রম অপ্রাসঙ্গিক, duplicate tuple নেই (সেট), attribute-নাম অনন্য, মান atomic (1NF)।',
  },
  {
    q: 'Attribute-এর সম্ভাব্য বৈধ মানের সেটকে বলে—',
    options: ['Schema', 'Domain', 'Tuple', 'Instance'],
    answer: 1,
    explain:
      'Domain = attribute যে মানগুলো নিতে পারে তার সেট; যেমন status ∈ {PENDING, SHIPPED, DELIVERED, CANCELLED}।',
  },
  {
    q: 'R(A, B, C) relation-এ ৫টি tuple আছে। Degree ও cardinality কত?',
    options: ['Degree ৩, cardinality ৫', 'Degree ৫, cardinality ৩', 'দুটোই ৫', 'দুটোই ৩'],
    answer: 0,
    explain: 'Degree = কলাম = ৩; cardinality = সারি = ৫।',
  },
  {
    q: 'Relation schema বলতে বোঝায়—',
    options: [
      'টেবিলের বর্তমান ডাটা',
      'নাম + attribute-তালিকা (+ domain)',
      'টেবিলের ইনডেক্স',
      'view',
    ],
    answer: 1,
    explain: 'R(A1, A2, …, An), relation schema; তার কোনো মুহূর্তের মানগুলোই relation instance।',
  },
];
