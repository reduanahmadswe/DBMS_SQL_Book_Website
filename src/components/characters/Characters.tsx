import { useId, type ReactNode } from 'react';

/**
 * লেদু, কদম চাচা, ফটকা ও মিনু, মৌলিক flat-style SVG অবতার (বুক-সমান)।
 * সব রঙ CSS variable বা নির্দিষ্ট স্কিন-টোন; আলো/অন্ধকার দুই থিমেই পড়া যায়।
 */
export type CharacterId = 'ledu' | 'kodom' | 'fotka' | 'minu';

export const characterInfo: Record<CharacterId, { name: string; role: string }> = {
  ledu: { name: 'লেদু', role: 'লেদু মার্টের মালিক' },
  kodom: { name: 'কদম চাচা', role: 'অবসরপ্রাপ্ত ব্যাংক DBA' },
  fotka: { name: 'ফটকা', role: 'প্রতিদ্বন্দ্বী দোকানদার' },
  minu: { name: 'মিনু', role: 'CSE-র ছাত্রী, লেদুর কাজিন' },
};

const SKIN = '#d9a273';
const SKIN_SHADE = '#c58b5c';
const HAIR = '#1b1424';

function Frame({ children, bg = 'var(--brand-tint)' }: { children: ReactNode; bg?: string }) {
  const id = `av${useId().replace(/[^a-zA-Z0-9]/g, '')}`; // প্রতিটি অবতারের নিজস্ব clipPath id
  return (
    <>
      <defs>
        <radialGradient id={`${id}s`} cx="50%" cy="35%" r="70%">
          <stop offset="0.6" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#2a0b4a" stopOpacity="0.28" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill={bg} />
      <clipPath id={id}>
        <circle cx="50" cy="50" r="48" />
      </clipPath>
      <g clipPath={`url(#${id})`}>
        {children}
        <ellipse
          cx="34"
          cy="26"
          rx="20"
          ry="11"
          fill="#fff"
          opacity="0.16"
          transform="rotate(-28 34 26)"
        />
        <circle cx="50" cy="50" r="48" fill={`url(#${id}s)`} />
      </g>
      <circle
        cx="50"
        cy="50"
        r="47"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.55"
        strokeWidth="2"
      />
    </>
  );
}

function LeduAvatar() {
  return (
    <Frame bg="var(--accent-tint)">
      {/* শরীর: টি-শার্ট */}
      <path d="M8 100 C10 74 28 68 50 68 C72 68 90 74 92 100Z" fill="#11a39a" />
      {/* গামছা */}
      <path d="M30 70 C40 80 60 80 70 70 L66 64 C58 72 42 72 34 64Z" fill="#6e14a9" />
      <path d="M44 76 L40 92 L48 90Z" fill="#6e14a9" />
      <rect x="43" y="56" width="14" height="14" rx="5" fill={SKIN_SHADE} />
      {/* কান */}
      <circle cx="29" cy="45" r="4.5" fill={SKIN_SHADE} />
      <circle cx="71" cy="45" r="4.5" fill={SKIN_SHADE} />
      {/* মাথা */}
      <ellipse cx="50" cy="42" rx="21" ry="24" fill={SKIN} />
      {/* এলোমেলো চুল */}
      <path
        d="M28 40 C26 22 40 15 52 17 C66 16 76 26 72 42 C68 34 62 30 52 31 C42 30 33 33 28 40Z"
        fill={HAIR}
      />
      <path d="M52 17 L56 9 L60 18Z M40 19 L38 11 L47 17Z" fill={HAIR} />
      {/* চোখ ও ভুরু */}
      <circle cx="42" cy="43" r="2.6" fill={HAIR} />
      <circle cx="58" cy="43" r="2.6" fill={HAIR} />
      <path
        d="M37 37 Q42 34 46 37 M54 37 Q58 34 63 37"
        stroke={HAIR}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* হাসি */}
      <path
        d="M40 52 Q50 63 60 52Z"
        fill="#fff"
        stroke={HAIR}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M49 47 Q50 50 52 48"
        stroke={SKIN_SHADE}
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
    </Frame>
  );
}

function KodomAvatar() {
  return (
    <Frame bg="var(--brand-tint)">
      <path d="M6 100 C8 74 26 68 50 68 C74 68 92 74 94 100Z" fill="#8f3fc4" />
      <path d="M50 68 L50 100" stroke="#6e14a9" strokeWidth="2" />
      <circle cx="50" cy="76" r="1.6" fill="#f3e6fb" />
      <circle cx="50" cy="86" r="1.6" fill="#f3e6fb" />
      <rect x="43" y="56" width="14" height="14" rx="5" fill={SKIN_SHADE} />
      <circle cx="29" cy="46" r="4.5" fill={SKIN_SHADE} />
      <circle cx="71" cy="46" r="4.5" fill={SKIN_SHADE} />
      <ellipse cx="50" cy="43" rx="21" ry="24" fill={SKIN} />
      {/* সাদা দাড়ি */}
      <path
        d="M29 48 C30 70 40 74 50 74 C60 74 70 70 71 48 C66 58 60 60 50 60 C40 60 34 58 29 48Z"
        fill="#f4f0f8"
      />
      <path d="M41 56 Q50 52 59 56 Q50 60 41 56Z" fill="#fff" />
      {/* টুপি */}
      <path
        d="M28 30 C28 14 72 14 72 30 C64 25 36 25 28 30Z"
        fill="#f4f0f8"
        stroke="#bfb2d0"
        strokeWidth="1.5"
      />
      <rect x="28" y="28" width="44" height="5" rx="2.5" fill="#11a39a" />
      {/* গোল চশমা */}
      <circle cx="41" cy="43" r="7" fill="#fff" fillOpacity=".35" stroke={HAIR} strokeWidth="2" />
      <circle cx="59" cy="43" r="7" fill="#fff" fillOpacity=".35" stroke={HAIR} strokeWidth="2" />
      <path d="M48 43 H52" stroke={HAIR} strokeWidth="2" />
      <circle cx="41" cy="43" r="2" fill={HAIR} />
      <circle cx="59" cy="43" r="2" fill={HAIR} />
      <path
        d="M33 34 Q41 31 47 34 M53 34 Q59 31 67 34"
        stroke="#cfc6dc"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M44 63 Q50 67 56 63"
        stroke={HAIR}
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
      />
    </Frame>
  );
}

function FotkaAvatar() {
  return (
    <Frame bg="#ffe3cf">
      <path d="M8 100 C10 74 28 68 50 68 C72 68 90 74 92 100Z" fill="#e8743b" />
      <path d="M36 68 L50 84 L64 68 L58 66 L50 74 L42 66Z" fill="#fff4e8" />
      <path
        d="M38 74 Q50 92 62 74"
        stroke="#f2c230"
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="50" cy="88" r="3" fill="#f2c230" />
      <rect x="43" y="56" width="14" height="14" rx="5" fill={SKIN_SHADE} />
      <circle cx="29" cy="45" r="4.5" fill={SKIN_SHADE} />
      <circle cx="71" cy="45" r="4.5" fill={SKIN_SHADE} />
      <ellipse cx="50" cy="42" rx="21" ry="24" fill={SKIN} />
      {/* জেল দেওয়া চুল */}
      <path
        d="M28 40 C24 18 44 8 60 12 C74 16 78 30 72 41 C70 30 60 24 48 25 C38 26 31 31 28 40Z"
        fill={HAIR}
      />
      <path d="M40 14 C48 6 62 8 66 14" stroke="#4a3b66" strokeWidth="2" fill="none" />
      {/* সানগ্লাস */}
      <rect x="31" y="38" width="17" height="10" rx="4" fill="#0f0a18" />
      <rect x="52" y="38" width="17" height="10" rx="4" fill="#0f0a18" />
      <path d="M48 42 H52" stroke="#0f0a18" strokeWidth="2.5" />
      <path
        d="M34 40 L38 40 M55 40 L59 40"
        stroke="#fff"
        strokeOpacity=".5"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* বাঁকা হাসি */}
      <path
        d="M41 56 Q52 62 62 52"
        stroke={HAIR}
        strokeWidth="2.2"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M59 52 L62 50" stroke={HAIR} strokeWidth="2" strokeLinecap="round" />
    </Frame>
  );
}

function MinuAvatar() {
  return (
    <Frame bg="#fbe3f1">
      <path d="M8 100 C10 74 28 68 50 68 C72 68 90 74 92 100Z" fill="#6e14a9" />
      <path d="M38 68 Q50 80 62 68" stroke="#efe3f8" strokeWidth="3" fill="none" />
      <rect x="43" y="56" width="14" height="14" rx="5" fill={SKIN_SHADE} />
      {/* পেছনের চুল ও বেণী */}
      <path
        d="M26 44 C22 20 38 12 50 12 C62 12 78 20 74 44 C74 56 70 62 66 64 L34 64 C30 62 26 56 26 44Z"
        fill={HAIR}
      />
      <path
        d="M72 52 C80 58 80 74 74 84"
        stroke={HAIR}
        strokeWidth="7"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="74" cy="84" r="3.4" fill="#11a39a" />
      <ellipse cx="50" cy="44" rx="19" ry="22" fill={SKIN} />
      {/* সামনের চুল */}
      <path
        d="M31 40 C33 24 46 20 52 22 C60 22 68 28 69 40 C62 32 56 30 50 31 C42 31 35 33 31 40Z"
        fill={HAIR}
      />
      {/* চশমা */}
      <rect
        x="35"
        y="40"
        width="13"
        height="11"
        rx="4"
        fill="#fff"
        fillOpacity=".4"
        stroke="#11a39a"
        strokeWidth="2.2"
      />
      <rect
        x="52"
        y="40"
        width="13"
        height="11"
        rx="4"
        fill="#fff"
        fillOpacity=".4"
        stroke="#11a39a"
        strokeWidth="2.2"
      />
      <path d="M48 45 H52" stroke="#11a39a" strokeWidth="2.2" />
      <circle cx="41.5" cy="45.5" r="2" fill={HAIR} />
      <circle cx="58.5" cy="45.5" r="2" fill={HAIR} />
      <path
        d="M43 57 Q50 62 57 57"
        stroke={HAIR}
        strokeWidth="1.9"
        fill="none"
        strokeLinecap="round"
      />
    </Frame>
  );
}

const avatars: Record<CharacterId, () => ReactNode> = {
  ledu: LeduAvatar,
  kodom: KodomAvatar,
  fotka: FotkaAvatar,
  minu: MinuAvatar,
};

export function Avatar({
  who,
  size = 56,
  title,
}: {
  who: CharacterId;
  size?: number;
  title?: boolean;
}) {
  const A = avatars[who];
  const label = `${characterInfo[who].name}, ${characterInfo[who].role}`;
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label={title === false ? undefined : label}
      aria-hidden={title === false ? true : undefined}
      className="shrink-0 drop-shadow-[0_5px_4px_rgb(76_29_149/0.28)]"
    >
      <A />
    </svg>
  );
}
