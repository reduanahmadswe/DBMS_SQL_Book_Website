import type { QuizQuestion } from '@/lib/quiz';

export const questions: QuizQuestion[] = [
  {
    q: 'লেদু মার্ট ডাটাবেসে প্রতিটি কাস্টমারকে আলাদা করে চেনার জন্য কোন কলামটি ব্যবহার হয়?',
    options: ['name', 'city', 'customer_id', 'email'],
    answer: 2,
    explain:
      'customer_id হলো customers টেবিলের Primary Key, নাম বা শহর একাধিক কাস্টমারের এক হতে পারে, কিন্তু customer_id কখনো রিপিট হয় না।',
  },
  {
    q: 'SQL-এর পূর্ণরূপ কোনটি?',
    options: [
      'Simple Query Language',
      'Structured Query Language',
      'Standard Question Logic',
      'Sequential Query Link',
    ],
    answer: 1,
    explain: 'SQL = Structured Query Language। এটি রিলেশনাল ডাটাবেসের সাথে কথা বলার মান-ভাষা।',
  },
  {
    q: 'এই বইয়ে SQL চালানোর প্লেগ্রাউন্ডে কোন ডাটাবেস ইঞ্জিন চলে?',
    options: [
      'MySQL সার্ভার',
      'PostgreSQL সার্ভার',
      'SQLite (ব্রাউজারে, WebAssembly দিয়ে)',
      'Oracle',
    ],
    answer: 2,
    explain:
      'প্লেগ্রাউন্ড sql.js ব্যবহার করে, যা SQLite-কে WebAssembly-তে কম্পাইল করা সংস্করণ। তাই MySQL/PostgreSQL-এর বিশেষ সিনট্যাক্স এখানে চলে না।',
  },
  {
    q: 'ডাটাবেসের টেবিলে একটি "সারি" (row) কী নির্দেশ করে?',
    options: [
      'একটি বৈশিষ্ট্য (attribute)',
      'একটি রেকর্ড / tuple',
      'টেবিলের নাম',
      'একটি constraint',
    ],
    answer: 1,
    explain:
      'সারি = রেকর্ড = tuple। যেমন customers টেবিলের একটি সারি মানে একজন কাস্টমারের সব তথ্য।',
  },
  {
    q: 'orders টেবিলের customer_id কলামটি customers টেবিলের customer_id-কে রেফার করে। orders.customer_id কী ধরনের চাবি?',
    options: ['Primary Key', 'Foreign Key', 'Candidate Key', 'Super Key'],
    answer: 1,
    explain: 'যে কলাম অন্য টেবিলের Primary Key-কে রেফার করে, সেটি Foreign Key।',
  },
];
