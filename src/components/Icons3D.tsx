import { useId } from 'react';

/** গ্রেডিয়েন্ট ও ছায়ায় ৩ডি-লুকের আইকন (সজ্জামূলক, aria-hidden)। */
function Wrap({
  size,
  children,
  id,
}: {
  size: number;
  children: (g: (n: string) => string) => React.ReactNode;
  id: string;
}) {
  const g = (n: string) => `url(#${id}${n})`;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className="shrink-0">
      <defs>
        <linearGradient id={`${id}p`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#b266ee" />
          <stop offset="1" stopColor="#6e14a9" />
        </linearGradient>
        <linearGradient id={`${id}t`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#4fe0d3" />
          <stop offset="1" stopColor="#0e8f87" />
        </linearGradient>
        <linearGradient id={`${id}y`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe27a" />
          <stop offset="1" stopColor="#f5a60b" />
        </linearGradient>
        <filter id={`${id}s`} x="-30%" y="-30%" width="170%" height="170%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#4c1d95" floodOpacity="0.35" />
        </filter>
      </defs>
      {children(g)}
    </svg>
  );
}

export function BookIcon3D({ size = 56 }: { size?: number }) {
  const id = useId().replace(/\W/g, '');
  return (
    <Wrap size={size} id={id}>
      {(g) => (
        <g filter={g('s')}>
          <path d="M6 18 32 24 32 56 6 50Z" fill={g('p')} />
          <path d="M58 18 32 24 32 56 58 50Z" fill={g('t')} />
          <path d="M9 14 32 20 32 52 9 46Z" fill="#fff" />
          <path d="M55 14 32 20 32 52 55 46Z" fill="#f2fbfa" />
          <path
            d="M14 24l12 3M14 31l12 3M14 38l12 3M50 24l-12 3M50 31l-12 3M50 38l-12 3"
            stroke="#a78bd0"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="M32 20v32" stroke="#d8c6ef" strokeWidth="1.5" />
        </g>
      )}
    </Wrap>
  );
}

export function LaptopIcon3D({ size = 56 }: { size?: number }) {
  const id = useId().replace(/\W/g, '');
  return (
    <Wrap size={size} id={id}>
      {(g) => (
        <g filter={g('s')}>
          <rect x="11" y="10" width="42" height="30" rx="4" fill={g('t')} />
          <rect x="14" y="13" width="36" height="24" rx="2" fill="#0b4f4a" />
          <text
            x="32"
            y="31"
            textAnchor="middle"
            fontSize="13"
            fontWeight="700"
            fill="#7ff3e8"
            fontFamily="monospace"
          >
            {'</>'}
          </text>
          <path d="M5 44h54l-4 8H9Z" fill={g('p')} />
          <rect x="26" y="45" width="12" height="2.5" rx="1" fill="#fff" opacity="0.6" />
        </g>
      )}
    </Wrap>
  );
}

export function ClipboardIcon3D({ size = 56 }: { size?: number }) {
  const id = useId().replace(/\W/g, '');
  return (
    <Wrap size={size} id={id}>
      {(g) => (
        <g filter={g('s')}>
          <rect x="12" y="9" width="40" height="49" rx="6" fill={g('p')} />
          <rect x="17" y="15" width="30" height="38" rx="3" fill="#fff" />
          <rect x="23" y="5" width="18" height="10" rx="4" fill={g('y')} />
          <path
            d="M21 26l3 3 5-6M21 38l3 3 5-6"
            fill="none"
            stroke="#12a39a"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M34 27h9M34 39h9" stroke="#b9a5d6" strokeWidth="2.6" strokeLinecap="round" />
        </g>
      )}
    </Wrap>
  );
}

export function TargetIcon3D({ size = 56 }: { size?: number }) {
  const id = useId().replace(/\W/g, '');
  return (
    <Wrap size={size} id={id}>
      {(g) => (
        <g filter={g('s')}>
          <circle cx="30" cy="34" r="24" fill={g('p')} />
          <circle cx="30" cy="34" r="17" fill="#fff" />
          <circle cx="30" cy="34" r="11" fill={g('p')} />
          <circle cx="30" cy="34" r="5" fill="#fff" />
          <path d="M31 33 54 10" stroke="#f5a60b" strokeWidth="3.5" strokeLinecap="round" />
          <path
            d="M48 8l8 0-0 8"
            fill="none"
            stroke="#f5a60b"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}
    </Wrap>
  );
}

export function BooksStack3D({ size = 72 }: { size?: number }) {
  const id = useId().replace(/\W/g, '');
  return (
    <Wrap size={size} id={id}>
      {(g) => (
        <g filter={g('s')}>
          <path d="M6 44h50l-4 10H10Z" fill="#e8742a" />
          <rect x="6" y="38" width="50" height="9" rx="2" fill="#f59a52" />
          <path d="M10 30h46l-3 9H12Z" fill="#0e8f87" />
          <rect x="10" y="24" width="46" height="9" rx="2" fill={g('t')} />
          <path d="M8 16h44l-3 9H11Z" fill="#5a0f94" />
          <rect x="8" y="10" width="44" height="9" rx="2" fill={g('p')} />
        </g>
      )}
    </Wrap>
  );
}
