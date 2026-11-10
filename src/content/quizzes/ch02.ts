import type { QuizQuestion } from '@/lib/quiz';

export const questions: QuizQuestion[] = [
  {
    q: 'ডাটাবেস (Database) ও DBMS-এর সঠিক সম্পর্ক কোনটি?',
    options: [
      'ডাটাবেস হলো সফটওয়্যার, DBMS হলো ডাটা',
      'ডাটাবেস হলো সম্পর্কিত ডাটার সংগ্রহ, DBMS হলো সেই ডাটাবেস তৈরি ও নিয়ন্ত্রণের সফটওয়্যার',
      'দুটো একই জিনিস',
      'DBMS শুধু ব্যাকআপ নেয়',
    ],
    answer: 1,
    explain:
      'ডাটাবেস = ডাটার সংগ্রহ (গুদামের জিনিসপত্র); DBMS = সেই গুদাম চালানোর ম্যানেজার (সফটওয়্যার)। DBMS + ডাটাবেস + অ্যাপ্লিকেশন মিলে হয় database system।',
  },
  {
    q: 'নিচের কোনটি DBMS নয়, বরং শুধু একটি অ্যাপ্লিকেশন?',
    options: ['PostgreSQL', 'SQLite', 'লেদু মার্ট মোবাইল অ্যাপ', 'Oracle Database'],
    answer: 2,
    explain:
      'লেদু মার্টের মোবাইল অ্যাপ হলো অ্যাপ্লিকেশন, যা DBMS-এর (যেমন PostgreSQL) মাধ্যমে ডাটাবেস ব্যবহার করে। বাকি তিনটি DBMS।',
  },
  {
    q: 'ডাটাবেসের নিরাপত্তা, ব্যাকআপ, পারফরম্যান্স টিউনিং ও ইউজারদের অ্যাক্সেস অধিকার ঠিক করার দায়িত্ব কার?',
    options: [
      'End user',
      'Application programmer',
      'Database Administrator (DBA)',
      'Database designer',
    ],
    answer: 2,
    explain:
      'এগুলো DBA-র কাজ। Designer টেবিলের নকশা করে, programmer অ্যাপ লেখে, end user অ্যাপ ব্যবহার করে।',
  },
  {
    q: 'কোনটি DDL (Data Definition Language)-এর কমান্ড?',
    options: ['INSERT', 'CREATE', 'GRANT', 'COMMIT'],
    answer: 1,
    explain: 'CREATE (সাথে ALTER, DROP) হলো DDL। INSERT = DML, GRANT = DCL, COMMIT = TCL।',
  },
  {
    q: 'COMMIT ও ROLLBACK কোন শ্রেণির কমান্ড?',
    options: ['DDL', 'DML', 'DCL', 'TCL (Transaction Control Language)'],
    answer: 3,
    explain: 'COMMIT, ROLLBACK ও SAVEPOINT ট্রানজ্যাকশন নিয়ন্ত্রণ করে — তাই TCL।',
  },
  {
    q: 'DBMS ব্যবহারের একটি অসুবিধা কোনটি?',
    options: [
      'Data redundancy বেড়ে যায়',
      'প্রাথমিক খরচ, জটিলতা ও প্রশিক্ষণের প্রয়োজন',
      'Data security কমে যায়',
      'একসাথে একাধিক ইউজার ডাটা ব্যবহার করতে পারে না',
    ],
    answer: 1,
    explain:
      'DBMS-এর হার্ডওয়্যার/সফটওয়্যার খরচ, জটিলতা এবং দক্ষ লোকের প্রয়োজন — এগুলো প্রধান অসুবিধা। বাকি তিনটি আসলে DBMS-এর সুবিধার উল্টো কথা।',
  },
  {
    q: 'SELECT কমান্ডকে কোন শ্রেণিতে ফেলা হয়?',
    options: ['শুধু DDL', 'বইভেদে DQL আলাদা শ্রেণি, আবার অনেক বইয়ে DML-এর অংশ', 'শুধু DCL', 'TCL'],
    answer: 1,
    explain:
      'Silberschatz-এর মতো বইয়ে query-ও DML-এর অংশ ধরা হয়; অনেক পাঠ্যক্রমে SELECT-এর জন্য আলাদা DQL শ্রেণি আছে। পরীক্ষায় বইয়ের শ্রেণিবিভাগ অনুসরণ করো।',
  },
  {
    q: 'যে ব্যবহারকারী পূর্বনির্ধারিত অ্যাপের ফর্ম/বোতাম ব্যবহার করে ডাটাবেস চালায় (যেমন ব্যাংক ক্যাশিয়ার), তাকে কী বলে?',
    options: ['Sophisticated user', 'Naive (parametric) end user', 'DBA', 'System analyst'],
    answer: 1,
    explain:
      'Naive বা parametric end user পূর্বলিখিত অ্যাপের মধ্য দিয়ে কাজ করে। Sophisticated user নিজে কোয়েরি লেখে (যেমন ডাটা অ্যানালিস্ট)।',
  },
];
