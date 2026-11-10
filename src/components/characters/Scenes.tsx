import type { ReactNode } from 'react';

/** গল্পের দৃশ্য — মৌলিক SVG। /public/images/chapters/<slug>/<name>.webp থাকলে StoryImage সেটাই দেখায়। */
const SKIN = '#d9a273';
const HAIR = '#1b1424';

function Ledu({
  x,
  y,
  s = 1,
  mood = 'happy',
}: {
  x: number;
  y: number;
  s?: number;
  mood?: 'happy' | 'panic';
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* শরীর */}
      <path d="M-34 90 C-32 56 -18 44 0 44 C18 44 32 56 34 90Z" fill="#11a39a" />
      <path d="M-14 46 C-6 56 6 56 14 46 L10 40 C4 46 -4 46 -10 40Z" fill="#6e14a9" />
      <rect x="-8" y="30" width="16" height="16" rx="6" fill="#c58b5c" />
      <ellipse cx="0" cy="8" rx="23" ry="26" fill={SKIN} />
      <circle cx="-23" cy="10" r="5" fill="#c58b5c" />
      <circle cx="23" cy="10" r="5" fill="#c58b5c" />
      <path
        d="M-24 6 C-27 -16 -10 -23 2 -21 C16 -22 27 -12 24 8 C20 -2 13 -6 2 -5 C-8 -6 -18 -3 -24 6Z"
        fill={HAIR}
      />
      <path d="M2 -21 L6 -30 L11 -21Z M-10 -19 L-13 -28 L-3 -21Z" fill={HAIR} />
      {mood === 'happy' ? (
        <>
          <circle cx="-9" cy="8" r="2.8" fill={HAIR} />
          <circle cx="9" cy="8" r="2.8" fill={HAIR} />
          <path
            d="M-11 18 Q0 30 11 18Z"
            fill="#fff"
            stroke={HAIR}
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </>
      ) : (
        <>
          <circle cx="-9" cy="8" r="4.4" fill="#fff" stroke={HAIR} strokeWidth="1.6" />
          <circle cx="9" cy="8" r="4.4" fill="#fff" stroke={HAIR} strokeWidth="1.6" />
          <circle cx="-9" cy="9" r="1.8" fill={HAIR} />
          <circle cx="9" cy="9" r="1.8" fill={HAIR} />
          <path d="M-13 0 L-5 -3 M13 0 L5 -3" stroke={HAIR} strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="0" cy="24" rx="5" ry="6" fill="#7a2a3a" stroke={HAIR} strokeWidth="1.8" />
        </>
      )}
    </g>
  );
}

function Steam({ x, y }: { x: number; y: number }) {
  return (
    <g stroke="var(--ink-faint)" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".7">
      <path d={`M${x} ${y} q-8 -10 0 -20 q8 -10 0 -20`} />
      <path d={`M${x + 14} ${y + 4} q-8 -10 0 -20 q8 -10 0 -20`} />
    </g>
  );
}

function Svg({ children, h = 360 }: { children: ReactNode; h?: number }) {
  return (
    <svg
      viewBox={`0 0 800 ${h}`}
      width="100%"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ display: 'block', height: 'auto' }}
    >
      {children}
    </svg>
  );
}

/** হিরো: লেদুর টং */
export function TeaStallScene() {
  return (
    <Svg>
      <rect width="800" height="360" fill="var(--accent-tint)" />
      <circle cx="660" cy="70" r="38" fill="#f6c453" opacity=".9" />
      <path d="M0 300 H800 V360 H0Z" fill="var(--surface-2)" />
      <path
        d="M0 300 C120 270 220 290 320 280 C440 268 560 296 800 270 V300Z"
        fill="var(--brand-tint)"
      />
      {/* টং ঘর */}
      <rect
        x="150"
        y="120"
        width="500"
        height="190"
        rx="8"
        fill="var(--surface)"
        stroke="var(--brand)"
        strokeWidth="4"
      />
      <path d="M120 130 L400 60 L680 130Z" fill="var(--brand)" />
      <path
        d="M120 130 H680"
        stroke="var(--on-brand)"
        strokeWidth="3"
        strokeDasharray="14 10"
        opacity=".6"
      />
      <rect x="260" y="82" width="280" height="44" rx="10" fill="var(--accent)" />
      <text
        x="400"
        y="113"
        textAnchor="middle"
        fontSize="28"
        fontWeight="700"
        fill="var(--on-accent)"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        লেদুর টং
      </text>
      {/* কাউন্টার */}
      <rect
        x="150"
        y="240"
        width="500"
        height="70"
        fill="var(--brand-tint)"
        stroke="var(--brand)"
        strokeWidth="4"
      />
      {/* কেটলি */}
      <g transform="translate(560 190)">
        <ellipse cx="0" cy="40" rx="34" ry="10" fill="var(--ink)" opacity=".15" />
        <path
          d="M-30 34 C-34 4 -20 -10 0 -10 C20 -10 34 4 30 34Z"
          fill="#b9b3c4"
          stroke="var(--ink-soft)"
          strokeWidth="3"
        />
        <path
          d="M30 14 C48 8 54 -8 44 -16"
          stroke="var(--ink-soft)"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        <path d="M-30 20 L-50 6" stroke="var(--ink-soft)" strokeWidth="6" strokeLinecap="round" />
        <path d="M-16 -10 Q0 -34 16 -10" stroke="var(--ink-soft)" strokeWidth="4" fill="none" />
      </g>
      <Steam x={560} y={150} />
      {/* কাপ */}
      <g transform="translate(450 214)">
        <path d="M0 0 H28 L24 24 H4Z" fill="var(--surface)" stroke="var(--brand)" strokeWidth="3" />
        <path
          d="M28 6 Q38 8 36 16 Q34 20 26 18"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="3"
        />
      </g>
      {/* বাকির খাতা */}
      <g transform="translate(190 206) rotate(-6)">
        <rect width="80" height="52" rx="4" fill="#c0392b" />
        <rect x="6" y="-4" width="72" height="52" rx="3" fill="#fdf7ee" stroke="#c9b9a0" />
        <path d="M14 8 H68 M14 18 H68 M14 28 H68 M14 38 H52" stroke="#9bb0d1" strokeWidth="1.5" />
        <text x="16" y="24" fontSize="11" fill="#b02a37" style={{ fontFamily: 'var(--font-body)' }}>
          বাকি: ৳৩৫০
        </text>
      </g>
      <Ledu x={400} y={176} s={1.25} />
      {/* বেঞ্চ */}
      <rect x="40" y="262" width="110" height="12" rx="4" fill="#8a5a3c" />
      <rect x="52" y="274" width="8" height="30" fill="#6e4730" />
      <rect x="130" y="274" width="8" height="30" fill="#6e4730" />
    </Svg>
  );
}

/** ১ম অধ্যায়: খাতার বন্যা */
export function KhataFloodScene() {
  const pages = [
    [60, 40, -14],
    [140, 90, 10],
    [220, 30, -6],
    [560, 50, 12],
    [650, 110, -10],
    [700, 40, 8],
    [90, 190, 16],
    [610, 210, -14],
    [260, 250, 6],
    [520, 255, -8],
  ];
  return (
    <Svg>
      <rect width="800" height="360" fill="var(--brand-tint)" />
      <rect y="300" width="800" height="60" fill="var(--surface-2)" />
      {pages.map(([x, y, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
          <rect width="78" height="96" rx="3" fill="#fdf7ee" stroke="#c9b9a0" strokeWidth="2" />
          <path
            d="M10 18 H66 M10 32 H66 M10 46 H58 M10 60 H66 M10 74 H44"
            stroke="#9bb0d1"
            strokeWidth="2"
          />
          <text
            x="10"
            y="28"
            fontSize="12"
            fill="#b02a37"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {['১৫০', '৮০', '২২০', '৯০', '৪০০', '৬০', '১২০', '৩০', '৭৫', '২০০'][i]}
          </text>
        </g>
      ))}
      {/* খাতার স্তূপ */}
      <g transform="translate(300 200)">
        <rect x="0" y="70" width="200" height="30" rx="4" fill="#c0392b" />
        <rect x="14" y="44" width="180" height="28" rx="4" fill="#2f6fb2" />
        <rect x="6" y="18" width="190" height="28" rx="4" fill="#d1a23a" />
      </g>
      <Ledu x={400} y={170} s={1.3} mood="panic" />
      {/* কথার বাবল */}
      <g>
        <rect
          x="40"
          y="260"
          width="240"
          height="56"
          rx="14"
          fill="var(--surface)"
          stroke="var(--bad-line)"
          strokeWidth="3"
        />
        <text
          x="160"
          y="284"
          textAnchor="middle"
          fontSize="17"
          fill="var(--bad-text)"
          style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
        >
          রহিম: আমি তো পরশুই শোধ করেছি!
        </text>
        <text
          x="160"
          y="304"
          textAnchor="middle"
          fontSize="15"
          fill="var(--ink-soft)"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          খাতায় তো লেখা নাই…
        </text>
      </g>
      <g>
        <rect
          x="520"
          y="14"
          width="250"
          height="44"
          rx="14"
          fill="var(--surface)"
          stroke="var(--brand)"
          strokeWidth="3"
        />
        <text
          x="645"
          y="42"
          textAnchor="middle"
          fontSize="17"
          fill="var(--ink)"
          style={{ fontFamily: 'var(--font-body)', fontWeight: 600 }}
        >
          লেদু: কোন পাতায় ছিল রে বাবা!
        </text>
      </g>
    </Svg>
  );
}

/** ২য় অধ্যায়: কদম চাচার সাজানো গুদাম */
export function DbmsStoreroomScene() {
  const shelves = [0, 1, 2];
  return (
    <Svg>
      <rect width="800" height="360" fill="var(--accent-tint)" />
      <rect y="310" width="800" height="50" fill="var(--surface-2)" />
      {shelves.map((s) => (
        <g key={s} transform={`translate(${60 + s * 150} 40)`}>
          <rect
            width="130"
            height="260"
            rx="6"
            fill="var(--surface)"
            stroke="var(--brand)"
            strokeWidth="3"
          />
          {[0, 1, 2, 3].map((r) => (
            <g key={r} transform={`translate(10 ${12 + r * 62})`}>
              <rect
                width="110"
                height="50"
                rx="4"
                fill={['var(--brand-tint)', 'var(--accent-tint)'][(r + s) % 2]}
                stroke="var(--ink-faint)"
              />
              <text
                x="55"
                y="21"
                textAnchor="middle"
                fontSize="13"
                fontWeight="600"
                fill="var(--ink)"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {
                  [
                    'customers',
                    'products',
                    'orders',
                    'payments',
                    'riders',
                    'suppliers',
                    'stores',
                    'employees',
                    'categories',
                    'deliveries',
                    'order_items',
                    'dues',
                  ][s * 4 + r]
                }
              </text>
              <path d="M12 32 H98 M12 40 H80" stroke="var(--ink-faint)" strokeWidth="2" />
            </g>
          ))}
        </g>
      ))}
      <Ledu x={560} y={190} s={1.1} />
      {/* কদম চাচা */}
      <g transform="translate(690 190) scale(1.25)">
        <path d="M-34 90 C-32 56 -18 44 0 44 C18 44 32 56 34 90Z" fill="#8f3fc4" />
        <rect x="-8" y="30" width="16" height="16" rx="6" fill="#c58b5c" />
        <ellipse cx="0" cy="8" rx="23" ry="26" fill={SKIN} />
        <path
          d="M-23 14 C-22 40 -10 46 0 46 C10 46 22 40 23 14 C18 26 10 28 0 28 C-10 28 -18 26 -23 14Z"
          fill="#f4f0f8"
        />
        <path
          d="M-24 -6 C-24 -26 24 -26 24 -6 C14 -12 -14 -12 -24 -6Z"
          fill="#f4f0f8"
          stroke="#bfb2d0"
          strokeWidth="1.5"
        />
        <circle cx="-9" cy="6" r="7" fill="#fff" fillOpacity=".4" stroke={HAIR} strokeWidth="2" />
        <circle cx="9" cy="6" r="7" fill="#fff" fillOpacity=".4" stroke={HAIR} strokeWidth="2" />
        <circle cx="-9" cy="6" r="2" fill={HAIR} />
        <circle cx="9" cy="6" r="2" fill={HAIR} />
        <path d="M-5 24 Q0 28 5 24" stroke={HAIR} strokeWidth="2" fill="none" />
      </g>
      {/* বাবল */}
      <rect
        x="470"
        y="18"
        width="300"
        height="52"
        rx="14"
        fill="var(--surface)"
        stroke="var(--accent)"
        strokeWidth="3"
      />
      <text
        x="620"
        y="42"
        textAnchor="middle"
        fontSize="16"
        fontWeight="600"
        fill="var(--ink)"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        লেদু বাপজান, সব জিনিসের একটা জায়গা,
      </text>
      <text
        x="620"
        y="61"
        textAnchor="middle"
        fontSize="16"
        fontWeight="600"
        fill="var(--ink)"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        আর একজন ম্যানেজার — এটাই DBMS।
      </text>
    </Svg>
  );
}

export const scenes: Record<string, { Component: () => ReactNode; alt: string }> = {
  'tea-stall': {
    Component: TeaStallScene,
    alt: 'লেদুর টং-এর কাউন্টারে কেটলি হাতে হাসিমুখে লেদু, পাশে বাকির খাতা আর গরম চায়ের ধোঁয়া',
  },
  'khata-flood': {
    Component: KhataFloodScene,
    alt: 'খাতার পাতার স্তূপে ঘেরা লেদু ঘাবড়ে গেছে, কাস্টমার বলছে টাকা শোধ করেছে কিন্তু খাতায় লেখা নেই',
  },
  'dbms-storeroom': {
    Component: DbmsStoreroomScene,
    alt: 'গোছানো তাকে লেবেল-লাগানো টেবিলের নাম, লেদু আর কদম চাচা পাশাপাশি দাঁড়িয়ে',
  },
};
