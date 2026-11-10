import type { QuizQuestion } from '@/lib/quiz';

export const ch03: QuizQuestion[] = [
  {
    q: 'Schema আর Instance-এর সঠিক পার্থক্য কোনটি?',
    options: [
      'Schema সময়ের সাথে বদলায়, Instance বদলায় না',
      'Schema হলো ডাটাবেসের কাঠামোর বর্ণনা (কমই বদলায়); Instance হলো কোনো এক মুহূর্তের আসল ডাটা (বারবার বদলায়)',
      'দুটো একই',
      'Instance শুধু ইনডেক্সকে বলে',
    ],
    answer: 1,
    explain:
      'Schema = intension (নকশা); Instance/database state = extension (নির্দিষ্ট সময়ের ডাটার স্ন্যাপশট)।',
  },
  {
    q: 'ANSI/SPARC আর্কিটেকচারে স্তর কয়টি এবং কী কী?',
    options: [
      '২টি: client ও server',
      '৩টি: external, conceptual, internal',
      '৪টি: input, process, output, storage',
      '৩টি: DDL, DML, DCL',
    ],
    answer: 1,
    explain: 'External (view) level, Conceptual (logical) level ও Internal (physical) level।',
  },
  {
    q: 'Conceptual schema বদলালেও যদি External schema ও অ্যাপ্লিকেশন প্রোগ্রাম না বদলাতে হয়, তাকে কী বলে?',
    options: [
      'Physical data independence',
      'Logical data independence',
      'Data redundancy',
      'Data integrity',
    ],
    answer: 1,
    explain:
      'Logical data independence = conceptual schema-র পরিবর্তন external schema-কে প্রভাবিত করে না। এটি অর্জন করা তুলনামূলক কঠিন।',
  },
  {
    q: 'ডিস্কে ফাইল সংগঠন বা ইনডেক্স বদলালেও conceptual schema অপরিবর্তিত থাকে, এটি কোন ধরনের independence?',
    options: ['Logical', 'Physical', 'Network', 'Semantic'],
    answer: 1,
    explain:
      'Internal schema-র পরিবর্তন conceptual schema-কে প্রভাবিত না করাই Physical data independence।',
  },
  {
    q: 'ওয়েব ব্রাউজার → অ্যাপ সার্ভার → ডাটাবেস সার্ভার, এটি কোন আর্কিটেকচার?',
    options: ['1-tier', '2-tier', '3-tier', 'Peer-to-peer'],
    answer: 2,
    explain:
      'ক্লায়েন্ট, মধ্যবর্তী অ্যাপ সার্ভার (business logic) ও ডাটাবেস সার্ভার, এই তিন স্তর = 3-tier।',
  },
  {
    q: 'কোন উপাদান SQL কোয়েরির সবচেয়ে কম খরচের execution plan বাছাই করে?',
    options: ['Buffer manager', 'Query optimizer', 'File manager', 'Authorization manager'],
    answer: 1,
    explain: 'Query optimizer বিভিন্ন plan-এর খরচ আন্দাজ করে সেরাটি বেছে নেয়।',
  },
  {
    q: 'ডিস্ক থেকে পড়া পেজ মেমোরিতে ক্যাশ করে রাখার দায়িত্ব কার?',
    options: ['Buffer manager', 'DDL compiler', 'Authorization manager', 'Transaction manager'],
    answer: 0,
    explain:
      'Buffer manager ডিস্ক-পেজ মেইন মেমোরির বাফারে আনে ও রাখে, যাতে বারবার ডিস্ক-অ্যাক্সেস না লাগে।',
  },
];

export const ch04: QuizQuestion[] = [
  {
    q: 'কোন ডাটা মডেলে প্রতিটি child রেকর্ডের ঠিক একটি parent থাকে?',
    options: ['Network', 'Hierarchical', 'Relational', 'Object-oriented'],
    answer: 1,
    explain:
      'Hierarchical মডেল গাছের মতো, প্রতিটি child-এর একটিই parent, তাই M:N সম্পর্ক সরাসরি দেখানো যায় না।',
  },
  {
    q: 'Relational মডেলের প্রস্তাবক কে এবং কত সালে?',
    options: [
      'Peter Chen, ১৯৭৬',
      'E. F. Codd, ১৯৭০',
      'Charles Bachman, ১৯৬৪',
      'Larry Ellison, ১৯৭৭',
    ],
    answer: 1,
    explain:
      'E. F. Codd ১৯৭০ সালে "A Relational Model of Data for Large Shared Data Banks" প্রকাশ করেন। Peter Chen ER মডেলের (১৯৭৬)।',
  },
  {
    q: 'Network মডেল কোন সীমাবদ্ধতা দূর করে?',
    options: [
      'এক child-এর একাধিক parent রাখা যায়',
      'ডাটা সংরক্ষণ করা যায় না',
      'SQL ব্যবহার করা যায়',
      'ডাটা এনক্রিপ্ট হয়',
    ],
    answer: 0,
    explain: 'Network মডেলে এক রেকর্ডের একাধিক parent থাকতে পারে, তাই M:N সম্পর্ক মডেল করা যায়।',
  },
  {
    q: 'ER মডেল মূলত কী কাজে ব্যবহৃত হয়?',
    options: [
      'ডাটা ডিস্কে সংরক্ষণে',
      'conceptual (ধারণাগত) নকশা তৈরিতে',
      'ব্যাকআপ নিতে',
      'কোয়েরি অপটিমাইজেশনে',
    ],
    answer: 1,
    explain: 'ER মডেল একটি high-level conceptual data model, বাস্তবায়নের আগে নকশা করার জন্য।',
  },
  {
    q: 'MongoDB কোন ধরনের ডাটাবেস?',
    options: ['Relational', 'Document-oriented NoSQL', 'Hierarchical', 'Graph'],
    answer: 1,
    explain: 'MongoDB JSON-সদৃশ (BSON) ডকুমেন্ট সংরক্ষণ করে, Document NoSQL।',
  },
  {
    q: 'Object-relational ডাটাবেসের বৈশিষ্ট্য কোনটি?',
    options: [
      'কোনো টেবিল থাকে না',
      'রিলেশনাল মডেলের সাথে user-defined type, inheritance ইত্যাদি অবজেক্ট ফিচার যুক্ত',
      'শুধু গাছ আকারে ডাটা রাখে',
      'SQL সমর্থন করে না',
    ],
    answer: 1,
    explain:
      'PostgreSQL ও Oracle-এর মতো সিস্টেমে রিলেশনাল মডেলের উপর অবজেক্ট ধারণা যোগ করা হয়েছে।',
  },
];

export const ch05: QuizQuestion[] = [
  {
    q: 'Customer-এর address যদি area ও city-তে ভাগ করা যায়, তবে address কোন ধরনের অ্যাট্রিবিউট?',
    options: ['Simple', 'Composite', 'Derived', 'Key'],
    answer: 1,
    explain: 'যে অ্যাট্রিবিউট ছোট ছোট অর্থবহ উপাদানে ভাগ হয় সে Composite attribute।',
  },
  {
    q: 'একজন কাস্টমারের একাধিক ফোন নম্বর থাকতে পারে। phone অ্যাট্রিবিউটটি কী?',
    options: ['Single-valued', 'Multi-valued', 'Derived', 'Weak'],
    answer: 1,
    explain: 'একাধিক মান ধারণ করতে পারলে Multi-valued attribute (Chen-এ দ্বিগুণ ellipse)।',
  },
  {
    q: 'joined_on থেকে হিসাব করা tenure_days কোন ধরনের অ্যাট্রিবিউট?',
    options: ['Stored', 'Derived', 'Composite', 'Multi-valued'],
    answer: 1,
    explain:
      'অন্য অ্যাট্রিবিউট থেকে হিসাব করে পাওয়া মান Derived attribute (Chen-এ ড্যাশ-করা ellipse)।',
  },
  {
    q: 'Chen নোটেশনে key attribute কীভাবে দেখানো হয়?',
    options: ['দ্বিগুণ ellipse', 'ড্যাশ-করা ellipse', 'নামের নিচে আন্ডারলাইন', 'ডবল আয়তক্ষেত্র'],
    answer: 2,
    explain: 'Key attribute-এর নামের নিচে সরল আন্ডারলাইন। Partial key-তে ড্যাশ-আন্ডারলাইন।',
  },
  {
    q: 'Entity set বলতে বোঝায়—',
    options: [
      'একটি নির্দিষ্ট কাস্টমার',
      'একই ধরনের সব entity-র সংগ্রহ',
      'একটি অ্যাট্রিবিউট',
      'একটি টেবিলের কলাম',
    ],
    answer: 1,
    explain: 'একই ধরনের (একই অ্যাট্রিবিউটযুক্ত) entity-গুলোর সংগ্রহই entity set; যেমন সব কাস্টমার।',
  },
  {
    q: 'কোনো কাস্টমারের ইমেইল নেই। ডাটাবেসে সেটি কী হিসেবে রাখা হয়?',
    options: ['০', 'ফাঁকা স্ট্রিং', 'NULL', 'কাস্টমারটি মুছে ফেলা হয়'],
    answer: 2,
    explain:
      'অজানা বা প্রযোজ্য নয় এমন মানের জন্য NULL ব্যবহার হয়; এটি ০ বা ফাঁকা স্ট্রিং থেকে আলাদা।',
  },
  {
    q: "Crow's Foot নোটেশনে এন্টিটিকে কী হিসেবে দেখানো হয়?",
    options: ['ডিম্বাকৃতি', 'অ্যাট্রিবিউটের তালিকাসহ বাক্স', 'হীরা', 'ত্রিভুজ'],
    answer: 1,
    explain: "Crow's Foot-এ এন্টিটি একটি বাক্স, ভেতরে PK/FK চিহ্নসহ অ্যাট্রিবিউটের তালিকা থাকে।",
  },
];

export const ch06: QuizQuestion[] = [
  {
    q: 'Customer–Order সম্পর্কে একজন কাস্টমার অনেক অর্ডার দিতে পারে, কিন্তু একটি অর্ডার একজনেরই। কার্ডিনালিটি কত?',
    options: ['1:1', '1:N (Customer : Order)', 'M:N', 'N:1 (Customer : Order)'],
    answer: 1,
    explain: 'Customer-এর দিকে ১, Order-এর দিকে N, অর্থাৎ Customer : Order = 1:N।',
  },
  {
    q: 'Order–Product সম্পর্ক কোন কার্ডিনালিটির?',
    options: ['1:1', '1:N', 'M:N', 'কোনোটিই নয়'],
    answer: 2,
    explain:
      'একটি অর্ডারে অনেক পণ্য, একটি পণ্য অনেক অর্ডারে, M:N। এটি রিলেশনাল মডেলে আলাদা সংযোগ-টেবিল (order_items) চায়।',
  },
  {
    q: 'Total participation কীভাবে দেখানো হয় (Chen)?',
    options: ['একক লাইন', 'ডবল লাইন', 'ড্যাশ লাইন', 'তীরচিহ্ন'],
    answer: 1,
    explain:
      'Total participation = এন্টিটি সেটের প্রতিটি সদস্য সম্পর্কে অংশ নেয়, Chen-এ ডবল লাইন।',
  },
  {
    q: 'Weak entity-র ক্ষেত্রে কোনটি সত্য?',
    options: [
      'এর নিজস্ব primary key থাকে',
      'owner entity ও identifying relationship ছাড়া একে চেনা যায় না; partial key থাকে',
      'এর কোনো অ্যাট্রিবিউট থাকে না',
      'এটি সবসময় 1:1 হয়',
    ],
    answer: 1,
    explain:
      'Weak entity-র পূর্ণ key নেই; owner-এর key + নিজের partial key (discriminator) মিলে চেনা যায়। Identifying relationship-এ এর participation total।',
  },
  {
    q: 'Employee supervises Employee, এটি কোন degree-র সম্পর্ক?',
    options: ['Unary (recursive)', 'Binary', 'Ternary', 'Quaternary'],
    answer: 0,
    explain: 'একই entity set একাধিক role-এ অংশ নিলে unary বা recursive সম্পর্ক।',
  },
  {
    q: 'Supplier–Product–Store এর "supplies" সম্পর্কের degree কত?',
    options: ['১', '২', '৩', '৪'],
    answer: 2,
    explain: 'তিনটি entity set জড়িত, degree ৩, অর্থাৎ ternary।',
  },
  {
    q: '(min,max) নোটেশনে (1,N) এর অর্থ কী?',
    options: ['অংশগ্রহণ ঐচ্ছিক, সর্বোচ্চ ১', 'অন্তত ১টি, সর্বোচ্চ অনেক', 'ঠিক ০টি', 'ঠিক ১টি'],
    answer: 1,
    explain: 'min = ১ মানে total participation (বাধ্যতামূলক), max = N মানে অনেক হতে পারে।',
  },
  {
    q: 'M:N সম্পর্কের attribute (যেমন quantity) রিলেশনাল স্কিমায় কোথায় যায়?',
    options: [
      'যেকোনো একটি entity-র টেবিলে',
      'সংযোগ-টেবিলে (junction table)',
      'আলাদা ডাটাবেসে',
      'ফেলে দেওয়া হয়',
    ],
    answer: 1,
    explain:
      'M:N সম্পর্কের attribute কোনো একপক্ষের নয়, সম্পর্কেরই, তাই সংযোগ-টেবিলে (order_items.quantity)।',
  },
];
