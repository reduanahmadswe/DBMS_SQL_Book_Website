import { useId } from 'react';
import { Ledu } from './Scenes';

/** ৩ডি-লুকের হিরো দৃশ্য: গ্রেডিয়েন্ট, হাইলাইট ও ছায়া দিয়ে গভীরতা। সম্পূর্ণ মৌলিক SVG। */
export function HeroScene() {
  const u = useId().replace(/[^a-zA-Z0-9]/g, '');
  const g = (n: string) => `url(#${u}${n})`;
  return (
    <svg
      viewBox="0 0 760 520"
      width="100%"
      role="img"
      aria-label="লেদুর টং, কেটলি হাতে হাসিমুখে লেদু, চারপাশে ভাসছে টেবিল, ডাটাবেস ও কোডের আইকন, কাউন্টারে খোলা খাতা"
      style={{ display: 'block', height: 'auto', overflow: 'visible' }}
    >
      <defs>
        <radialGradient id={`${u}sun`} cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#fffbd0" />
          <stop offset="0.35" stopColor="#ffd93d" />
          <stop offset="1" stopColor="#f29b0a" />
        </radialGradient>
        <radialGradient id={`${u}halo`}>
          <stop offset="0" stopColor="#ffd93d" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffd93d" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${u}roof`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a04ae0" />
          <stop offset="1" stopColor="#5a0f94" />
        </linearGradient>
        <linearGradient id={`${u}roofEdge`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#45097a" />
          <stop offset="1" stopColor="#2e0652" />
        </linearGradient>
        <linearGradient id={`${u}sign`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4fe0d3" />
          <stop offset="1" stopColor="#0c8c84" />
        </linearGradient>
        <linearGradient id={`${u}wall`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#ece0f9" />
        </linearGradient>
        <linearGradient id={`${u}post`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8a2fd0" />
          <stop offset="0.5" stopColor="#b266ee" />
          <stop offset="1" stopColor="#5a0f94" />
        </linearGradient>
        <linearGradient id={`${u}counterTop`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6ecff" />
          <stop offset="1" stopColor="#d6b9f2" />
        </linearGradient>
        <linearGradient id={`${u}counterFront`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f4eafc" />
          <stop offset="1" stopColor="#cdb0ec" />
        </linearGradient>
        <linearGradient id={`${u}steel`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8d8ca0" />
          <stop offset="0.35" stopColor="#f3f2fa" />
          <stop offset="0.65" stopColor="#c4c3d4" />
          <stop offset="1" stopColor="#6d6c82" />
        </linearGradient>
        <linearGradient id={`${u}screen`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8e2de2" />
          <stop offset="1" stopColor="#5a1396" />
        </linearGradient>
        <linearGradient id={`${u}db`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#7a1fc0" />
          <stop offset="0.5" stopColor="#c58bf5" />
          <stop offset="1" stopColor="#5a1396" />
        </linearGradient>
        <radialGradient id={`${u}bush`} cx="40%" cy="30%" r="80%">
          <stop offset="0" stopColor="#9be2a8" />
          <stop offset="1" stopColor="#4cae6b" />
        </radialGradient>
        <radialGradient id={`${u}ground`}>
          <stop offset="0" stopColor="#c9a8ee" stopOpacity="0.9" />
          <stop offset="1" stopColor="#c9a8ee" stopOpacity="0" />
        </radialGradient>
        <filter id={`${u}shadow`} x="-20%" y="-20%" width="140%" height="150%">
          <feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="#4c1d95" floodOpacity="0.28" />
        </filter>
        <filter id={`${u}soft`} x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#3b0764" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* ───── ৩ডি সূর্য ───── */}
      <circle cx="660" cy="86" r="96" fill={g('halo')} />
      <circle cx="660" cy="86" r="54" fill={g('sun')} filter={g('shadow')} />
      <ellipse
        cx="642"
        cy="64"
        rx="22"
        ry="13"
        fill="#fff"
        opacity="0.55"
        transform="rotate(-28 642 64)"
      />
      <g stroke="#ffd93d" strokeWidth="4" strokeLinecap="round" opacity="0.8">
        <path d="M660 10v-14M660 162v14M584 86h-14M750 86h14M606 32l-10-10M714 140l10 10M714 32l10-10M606 140l-10 10" />
      </g>

      {/* ───── ঝোপ ও মাটি ───── */}
      <ellipse cx="380" cy="478" rx="360" ry="34" fill={g('ground')} />
      <g filter={g('soft')}>
        <ellipse cx="86" cy="420" rx="70" ry="52" fill={g('bush')} />
        <ellipse cx="140" cy="440" rx="52" ry="38" fill={g('bush')} />
        <ellipse cx="690" cy="410" rx="64" ry="58" fill={g('bush')} />
        <ellipse cx="640" cy="440" rx="46" ry="34" fill={g('bush')} />
      </g>

      {/* ───── টং ঘর ───── */}
      <g filter={g('shadow')}>
        <rect x="160" y="158" width="26" height="320" rx="6" fill={g('post')} />
        <rect x="574" y="158" width="26" height="320" rx="6" fill={g('post')} />
        <rect x="186" y="170" width="388" height="270" fill={g('wall')} />
        <rect x="186" y="170" width="388" height="26" fill="#000" opacity="0.07" />
      </g>

      {/* ভেতরে ভাসমান আইকন */}
      <g filter={g('soft')}>
        {[
          [222, 214],
          [208, 296],
        ].map(([x, y]) => (
          <g key={`${x}${y}`} transform={`translate(${x} ${y})`}>
            <rect width="62" height="54" rx="8" fill="#fff" stroke="#8e2de2" strokeWidth="2.5" />
            <rect width="62" height="16" rx="8" fill={g('screen')} />
            <path d="M0 30h62M0 42h62M21 16v38M42 16v38" stroke="#b98ae6" strokeWidth="1.6" />
          </g>
        ))}
        <g transform="translate(330 232)">
          <ellipse cx="32" cy="56" rx="32" ry="11" fill={g('db')} />
          <rect x="0" y="12" width="64" height="44" fill={g('db')} />
          <ellipse cx="32" cy="56" rx="32" ry="11" fill="#5a1396" opacity="0.35" />
          <ellipse
            cx="32"
            cy="34"
            rx="32"
            ry="11"
            fill="none"
            stroke="#fff"
            strokeOpacity="0.5"
            strokeWidth="1.5"
          />
          <ellipse cx="32" cy="12" rx="32" ry="11" fill="#d9b3fa" />
          <ellipse cx="26" cy="9" rx="14" ry="4" fill="#fff" opacity="0.6" />
        </g>
        <g transform="translate(404 214)">
          <rect width="64" height="50" rx="8" fill="#fff" stroke="#8e2de2" strokeWidth="2.5" />
          <rect width="64" height="14" rx="8" fill={g('screen')} />
          <text
            x="32"
            y="38"
            textAnchor="middle"
            fontSize="18"
            fontWeight="700"
            fill="#6e14a9"
            fontFamily="var(--font-mono)"
          >
            {'</>'}
          </text>
        </g>
      </g>
      <g stroke="#8e2de2" strokeWidth="2" strokeDasharray="4 5" fill="none" opacity="0.7">
        <path d="M290 250c20-10 30-6 38 4M396 262c-10 14-24 18-38 12M330 300c14 6 24 20 28 32" />
      </g>
      <g stroke="#ffc53d" strokeWidth="3" strokeLinecap="round">
        <path d="M358 214v-12M386 220l8-10M334 224l-8-10" />
      </g>

      {/* ছাদ (৩ডি: সামনের মুখ + পুরু কিনারা) */}
      <g filter={g('shadow')}>
        <polygon points="118,176 380,66 642,176 642,196 118,196" fill={g('roofEdge')} />
        <polygon points="118,176 380,60 642,176" fill={g('roof')} />
        <polygon points="380,60 642,176 560,176 380,92" fill="#fff" opacity="0.12" />
        <path
          d="M118 196h524"
          stroke="#fff"
          strokeOpacity="0.35"
          strokeWidth="3"
          strokeDasharray="12 9"
        />
        {/* সাইনবোর্ড */}
        <rect x="214" y="104" width="332" height="52" rx="26" fill={g('sign')} />
        <rect x="222" y="108" width="316" height="18" rx="9" fill="#fff" opacity="0.3" />
        <text
          x="380"
          y="139"
          textAnchor="middle"
          fontSize="23"
          fontWeight="700"
          fill="#052a27"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          লেদুর ডাটাবেস অভিযান
        </text>
      </g>

      {/* লেদু */}
      <g filter={g('soft')}>
        <Ledu x={420} y={268} s={1.32} />
      </g>

      {/* কাউন্টার: উপরের তল + সামনের তল */}
      <g filter={g('shadow')}>
        <polygon points="150,384 610,384 636,410 124,410" fill={g('counterTop')} />
        <rect x="124" y="410" width="512" height="72" rx="6" fill={g('counterFront')} />
        <rect x="124" y="410" width="512" height="8" fill="#fff" opacity="0.4" />
        <rect
          x="124"
          y="410"
          width="512"
          height="72"
          rx="6"
          fill="none"
          stroke="#6e14a9"
          strokeWidth="3"
        />
      </g>

      {/* খোলা খাতা */}
      <g transform="translate(220 340) rotate(-5)" filter={g('soft')}>
        <path d="M0 40 L60 24 L60 64 L0 78Z" fill="#c0392b" />
        <path d="M0 36 L60 18 L60 58 L0 74Z" fill="#fff7ee" stroke="#d9c7ad" />
        <path d="M60 18 L120 34 L120 74 L60 58Z" fill="#fffaf2" stroke="#d9c7ad" />
        <path
          d="M8 44l44-13M8 54l44-13M8 64l36-10M68 34l44 12M68 44l44 12M68 54l36 10"
          stroke="#9db5da"
          strokeWidth="1.6"
        />
      </g>

      {/* চায়ের কাপ */}
      <g transform="translate(470 368)" filter={g('soft')}>
        <ellipse cx="22" cy="30" rx="30" ry="9" fill="#e9d9fa" />
        <path d="M2 4h40l-5 26H7Z" fill="#fff" stroke="#8e2de2" strokeWidth="2.5" />
        <ellipse cx="22" cy="5" rx="20" ry="5" fill="#c98a4b" />
        <path d="M42 8q14 2 10 12-3 6-12 5" fill="none" stroke="#8e2de2" strokeWidth="3" />
      </g>

      {/* কেটলি (ধাতব) */}
      <g transform="translate(548 322)" filter={g('soft')}>
        <path d="M0 60C-4 30 14 8 40 8s44 22 40 52Z" fill={g('steel')} />
        <ellipse cx="40" cy="60" rx="40" ry="10" fill="#6d6c82" opacity="0.5" />
        <path
          d="M18 18Q40-12 62 18"
          fill="none"
          stroke="#5b5a70"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path d="M0 38L-26 18" stroke="#5b5a70" strokeWidth="9" strokeLinecap="round" />
        <path
          d="M80 34c26-4 30-26 14-36"
          fill="none"
          stroke="#5b5a70"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <ellipse
          cx="28"
          cy="26"
          rx="8"
          ry="16"
          fill="#fff"
          opacity="0.5"
          transform="rotate(20 28 26)"
        />
        <g stroke="#9a96b3" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.7">
          <path d="M34 -4q-10-14 0-26q10-12 0-26" />
          <path d="M52 -2q-10-14 0-26q10-12 0-26" />
        </g>
      </g>

      {/* বেঞ্চ */}
      <g filter={g('soft')}>
        <polygon points="40,414 150,414 164,426 26,426" fill="#c68b5d" />
        <rect x="26" y="426" width="138" height="14" rx="3" fill="#8f5a35" />
        <rect x="40" y="440" width="12" height="44" rx="3" fill="#6e4325" />
        <rect x="138" y="440" width="12" height="44" rx="3" fill="#6e4325" />
      </g>

      {/* ৩ডি বইয়ের স্তূপ (ডান পাশে ঝোপের সামনে) */}
      <g transform="translate(630 380)" filter={g('soft')}>
        <rect x="0" y="44" width="92" height="22" rx="4" fill="#e8742a" />
        <rect x="6" y="46" width="80" height="4" fill="#fff" opacity="0.4" />
        <rect x="8" y="22" width="84" height="22" rx="4" fill="#12a39a" />
        <rect x="14" y="24" width="72" height="4" fill="#fff" opacity="0.4" />
        <rect x="2" y="0" width="86" height="22" rx="4" fill="#7a1fc0" />
        <rect x="8" y="2" width="74" height="4" fill="#fff" opacity="0.4" />
      </g>

      {/* ভাসমান কাগজ */}
      <g opacity="0.95" filter={g('soft')}>
        <rect
          x="170"
          y="352"
          width="30"
          height="38"
          rx="3"
          fill="#fffaf0"
          transform="rotate(-16 185 371)"
        />
        <rect
          x="500"
          y="300"
          width="28"
          height="34"
          rx="3"
          fill="#fffaf0"
          transform="rotate(14 514 317)"
        />
      </g>
    </svg>
  );
}
