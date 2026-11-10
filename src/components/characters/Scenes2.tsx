import type { ReactNode } from 'react';
import { Avatar, type CharacterId } from './Characters';

/** বাকি অধ্যায়ের গল্পের দৃশ্য: দুই চরিত্র + কথার বাবল + সরল প্রপ। প্রতিটি দৃশ্য পরে .webp দিয়ে বদলানো যায়। */
interface Spec {
  alt: string;
  left: CharacterId;
  right?: CharacterId;
  leftSays: [string, string?];
  rightSays?: [string, string?];
  bg?: 'var(--accent-tint)' | 'var(--brand-tint)';
  deco?: ReactNode;
}

function Bubble({
  x,
  y,
  w,
  lines,
  tone,
}: {
  x: number;
  y: number;
  w: number;
  lines: [string, string?];
  tone: string;
}) {
  const h = lines[1] ? 64 : 44;
  return (
    <g>
      <rect x={x} y={y + 6} width={w} height={h} rx={14} fill={tone} opacity={0.4} />
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={14}
        fill="var(--surface)"
        stroke={tone}
        strokeWidth={3}
      />
      <text
        x={x + w / 2}
        y={y + (lines[1] ? 25 : 28)}
        textAnchor="middle"
        fontSize={17}
        fontWeight={600}
        className="dg-text"
      >
        {lines[0]}
      </text>
      {lines[1] && (
        <text
          x={x + w / 2}
          y={y + 49}
          textAnchor="middle"
          fontSize={17}
          fontWeight={600}
          className="dg-text"
        >
          {lines[1]}
        </text>
      )}
    </g>
  );
}

function make(spec: Spec) {
  return function Scene() {
    return (
      <svg
        viewBox="0 0 800 360"
        width="100%"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        style={{ display: 'block', height: 'auto' }}
      >
        <defs>
          <filter id="s2-depth" x="-10%" y="-10%" width="120%" height="125%">
            <feDropShadow dx="0" dy="6" stdDeviation="5" floodColor="#3b0764" floodOpacity="0.28" />
          </filter>
          <radialGradient id="s2-node" cx="35%" cy="30%" r="80%">
            <stop offset="0" stopColor="#f3e3ff" />
            <stop offset="1" stopColor="#a96be0" />
          </radialGradient>
          <linearGradient id="s2-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--surface-2)" />
            <stop offset="1" stopColor="var(--brand-tint)" />
          </linearGradient>
        </defs>
        <rect width="800" height="360" fill={spec.bg ?? 'var(--accent-tint)'} />
        <rect y="300" width="800" height="60" fill="url(#s2-floor)" />
        <g filter="url(#s2-depth)">
          {spec.deco}
          <ellipse cx={135} cy={318} rx={80} ry={12} fill="#4c1d95" opacity={0.22} />
          {spec.right && (
            <ellipse cx={665} cy={318} rx={80} ry={12} fill="#4c1d95" opacity={0.22} />
          )}
          <Avatarize who={spec.left} x={60} y={160} />
          {spec.right && <Avatarize who={spec.right} x={590} y={160} />}
        </g>
        <Bubble
          x={50}
          y={24}
          w={spec.right ? 330 : 500}
          lines={spec.leftSays}
          tone="var(--accent)"
        />
        {spec.right && spec.rightSays && (
          <Bubble x={420} y={24} w={340} lines={spec.rightSays} tone="var(--brand)" />
        )}
      </svg>
    );
  };
}

function Avatarize({ who, x, y }: { who: CharacterId; x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Avatar who={who} size={150} title={false} />
    </g>
  );
}

const treeDeco = (
  <g stroke="var(--ink-soft)" strokeWidth={3} fill="url(#s2-node)">
    <line x1={400} y1={150} x2={340} y2={230} />
    <line x1={400} y1={150} x2={460} y2={230} />
    <circle cx={400} cy={150} r={22} />
    <circle cx={340} cy={230} r={20} />
    <circle cx={460} cy={230} r={20} />
  </g>
);

const tableDeco = (
  <g transform="translate(300 170)">
    <rect width={200} height={110} rx={8} className="dg-box" />
    <rect width={200} height={28} rx={8} className="dg-box-brand" />
    <path d="M0 56 H200 M0 84 H200 M66 28 V110 M132 28 V110" stroke="var(--line)" strokeWidth={2} />
  </g>
);

const specs: Record<string, Spec> = {
  'schema-change': {
    alt: 'লেদু গুদামে নতুন তাক বসাচ্ছে আর ক্যাশিয়ার রুবেল হতবুদ্ধি হয়ে স্ক্রিনের দিকে তাকিয়ে আছে',
    left: 'ledu',
    right: 'kodom',
    leftSays: ['শুধু একটা কলাম যোগ করলাম,', 'ক্যাশিয়ারের অ্যাপ বন্ধ!'],
    rightSays: ['মাঝে একটা পর্দা (view)', 'রাখলে এটা হতো না।'],
    deco: tableDeco,
  },
  'model-tree': {
    alt: 'লেদু একটি গাছ আঁকা বোর্ডের সামনে, চা পাতা দুই ডালের সাথে জোড়া',
    left: 'ledu',
    right: 'kodom',
    leftSays: ['চা পাতা মুদি সামগ্রীও,', 'আবার পানীয়ও! গাছে কীভাবে?'],
    rightSays: ['গাছে হয় না বাপজান,', 'জাল বা টেবিল লাগবে।'],
    bg: 'var(--brand-tint)',
    deco: treeDeco,
  },
  'entity-hunt': {
    alt: 'লেদু আর মিনু খাতায় লেদু মার্টের জিনিসগুলোর তালিকা বানাচ্ছে',
    left: 'minu',
    right: 'ledu',
    leftSays: ['আগে বলো, তোমার ব্যবসায়', 'কী কী "জিনিস" আছে?'],
    rightSays: ['কাস্টমার, পণ্য, অর্ডার,', 'রাইডার… অনেক!'],
    deco: tableDeco,
  },
  'relationship-knots': {
    alt: 'কাস্টমার, অর্ডার ও পণ্যের মধ্যে সুতো জড়িয়ে লেদু অসহায়',
    left: 'ledu',
    right: 'minu',
    leftSays: ['একটা অর্ডারে অনেক পণ্য,', 'একটা পণ্য অনেক অর্ডারে!'],
    rightSays: ['এটাই M:N, সুতোর জট', 'খুলতে মাঝে আরেকটা টেবিল লাগে।'],
    bg: 'var(--brand-tint)',
    deco: treeDeco,
  },
  'employee-types': {
    alt: 'রাইডার, ম্যানেজার ও সাপোর্ট এজেন্ট, একই কর্মী-পরিবারের তিন রূপ',
    left: 'ledu',
    right: 'kodom',
    leftSays: ['সবাই কর্মী, কিন্তু রাইডারের', 'বাইক নম্বর লাগে, ম্যানেজারের না…'],
    rightSays: ['এজন্যই specialization —', 'সাধারণ থেকে বিশেষ।'],
    deco: treeDeco,
  },
  'er-to-table': {
    alt: 'কদম চাচা ER ডায়াগ্রাম থেকে টেবিল আঁকা শেখাচ্ছেন',
    left: 'kodom',
    right: 'ledu',
    leftSays: ['প্রতিটি এন্টিটি একটা টেবিল,', 'প্রতিটি M:N একটা সংযোগ-টেবিল।'],
    rightSays: ['তাহলে নকশা থেকে সরাসরি', 'টেবিল বানানো যায়!'],
    bg: 'var(--brand-tint)',
    deco: tableDeco,
  },
  'table-anatomy': {
    alt: 'মিনু একটি টেবিলের সারি, কলাম ও ঘর আঙুল দিয়ে দেখাচ্ছে',
    left: 'minu',
    right: 'ledu',
    leftSays: ['সারি = tuple, কলাম = attribute,', 'ঘরের মান = domain থেকে।'],
    rightSays: ['তাহলে টেবিলকে ওরা', '"relation" বলে কেন?'],
    deco: tableDeco,
  },
  'key-bunch': {
    alt: 'লেদুর হাতে চাবির গোছা, কদম চাচা বলছেন কোনটা কোন তালার',
    left: 'ledu',
    right: 'kodom',
    leftSays: ['এত চাবি! কোনটা দিয়ে', 'কাস্টমারকে ঠিকঠাক চিনব?'],
    rightSays: ['যেটা সবচেয়ে ছোট আর', 'কখনো রিপিট হয় না।'],
    bg: 'var(--brand-tint)',
  },
  fence: {
    alt: 'ফটকা ভুল ডাটা ঢোকাতে চাইছে আর কদম চাচা নিয়মের বেড়া দিয়ে আটকাচ্ছেন',
    left: 'fotka',
    right: 'kodom',
    leftSays: ['দাম মাইনাস দশ! কাস্টমার', 'নাই, তবু অর্ডার ঢোকাব!'],
    rightSays: ['এই বেড়া পেরোতে পারবে না —', 'constraint আছে।'],
    deco: tableDeco,
  },
  'algebra-class': {
    alt: 'মিনু বোর্ডে সিগমা ও পাই চিহ্ন এঁকে রিলেশনাল অ্যালজেব্রা বোঝাচ্ছে',
    left: 'minu',
    right: 'ledu',
    leftSays: ['σ সারি বাছে, π কলাম বাছে,', '⋈ টেবিল জোড়ে।'],
    rightSays: ['এ তো SQL-এর মা!', ''],
    bg: 'var(--brand-tint)',
    deco: tableDeco,
  },
  'wish-list': {
    alt: 'লেদু তার চাওয়ার তালিকা লিখছে, কীভাবে পাবে সেটা নয়',
    left: 'ledu',
    right: 'kodom',
    leftSays: ['আমি শুধু বলব কী চাই,', 'কীভাবে পাব, ডাটাবেস ভাবুক!'],
    rightSays: ['এটাই calculus —', 'চাওয়ার ভাষা।'],
    deco: tableDeco,
  },
};

export const scenes2: Record<string, { Component: () => ReactNode; alt: string }> =
  Object.fromEntries(
    Object.entries(specs).map(([k, s]) => [k, { Component: make(s), alt: s.alt }]),
  );
