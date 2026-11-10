import { useId, type ReactNode } from 'react';

/* ছোট্ট SVG বিল্ডিং ব্লক, সব রঙ থিম-টোকেন থেকে */
function Defs({ id }: { id: string }) {
  return (
    <defs>
      <marker
        id={`${id}-a`}
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="8"
        markerHeight="8"
        orient="auto-start-reverse"
      >
        <path d="M0 0 L10 5 L0 10Z" fill="var(--ink-soft)" />
      </marker>
      <marker
        id={`${id}-r`}
        viewBox="0 0 10 10"
        refX="9"
        refY="5"
        markerWidth="8"
        markerHeight="8"
        orient="auto-start-reverse"
      >
        <path d="M0 0 L10 5 L0 10Z" fill="var(--bad-line)" />
      </marker>
    </defs>
  );
}

export type Tone = 'brand' | 'teal' | 'bad' | 'good' | 'plain';
export const toneCls: Record<Tone, string> = {
  brand: 'dg-box-brand',
  teal: 'dg-box-teal',
  bad: 'dg-bad',
  good: 'dg-good',
  plain: 'dg-box',
};

export function Node({
  x,
  y,
  w,
  h,
  label,
  sub,
  tone = 'plain',
  size = 15,
  mono = false,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  tone?: Tone;
  size?: number;
  mono?: boolean;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} className={toneCls[tone]} />
      <text
        x={x + w / 2}
        y={y + h / 2 - (sub ? 8 : 0)}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={size}
        fontWeight={700}
        className="dg-text"
        fontFamily={mono ? 'var(--font-mono)' : undefined}
      >
        {label}
      </text>
      {sub && (
        <text
          x={x + w / 2}
          y={y + h / 2 + 12}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={size - 3}
          className="dg-soft"
        >
          {sub}
        </text>
      )}
    </g>
  );
}

export function Arrow({
  id,
  x1,
  y1,
  x2,
  y2,
  bad,
  dash,
  both,
}: {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  bad?: boolean;
  dash?: boolean;
  both?: boolean;
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={bad ? 'var(--bad-line)' : 'var(--ink-soft)'}
      strokeWidth={2}
      strokeDasharray={dash ? '6 5' : undefined}
      markerEnd={`url(#${id}-${bad ? 'r' : 'a'})`}
      markerStart={both ? `url(#${id}-${bad ? 'r' : 'a'})` : undefined}
    />
  );
}

export function Label({
  x,
  y,
  children,
  size = 14,
  anchor = 'middle',
  soft = true,
  weight = 500,
}: {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
  anchor?: 'middle' | 'start' | 'end';
  soft?: boolean;
  weight?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      fontWeight={weight}
      className={soft ? 'dg-soft' : 'dg-text'}
    >
      {children}
    </text>
  );
}

export function Svg({
  w,
  h,
  children,
  label,
}: {
  w: number;
  h: number;
  children: (id: string) => ReactNode;
  label: string;
}) {
  const id = useId().replace(/:/g, '');
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      style={{ minWidth: Math.min(w, 600), width: '100%', height: 'auto' }}
      role="img"
      aria-label={label}
    >
      <Defs id={id} />
      {children(id)}
    </svg>
  );
}

/* ───── ১. ফাইল সিস্টেম বনাম DBMS ───── */
export function FileVsDbms() {
  return (
    <Svg
      w={820}
      h={400}
      label="বাঁয়ে: প্রতিটি অ্যাপের নিজস্ব ফাইল, তথ্য ডুপ্লিকেট। ডানে: সব অ্যাপ একটি DBMS-এর মাধ্যমে একটি ডাটাবেস ব্যবহার করে।"
    >
      {(id) => (
        <>
          <Label x={190} y={26} size={17} soft={false} weight={700}>
            ফাইল সিস্টেম
          </Label>
          <Label x={630} y={26} size={17} soft={false} weight={700}>
            ডাটাবেস সিস্টেম (DBMS)
          </Label>
          <line
            x1={410}
            y1={40}
            x2={410}
            y2={380}
            stroke="var(--line)"
            strokeWidth={2}
            strokeDasharray="6 6"
          />
          {[
            ['বিক্রি অ্যাপ', 'customers.txt', 'orders.csv'],
            ['ডেলিভারি অ্যাপ', 'cust_list.xls', 'delivery.dat'],
            ['হিসাব অ্যাপ', 'customer_info.doc', 'dues.txt'],
          ].map(([app, f1, f2], i) => (
            <g key={app}>
              <Node x={20} y={56 + i * 108} w={120} h={46} label={app!} tone="brand" size={14} />
              <Node x={190} y={52 + i * 108} w={176} h={32} label={f1!} tone="bad" size={13} mono />
              <Node x={190} y={90 + i * 108} w={176} h={32} label={f2!} tone="bad" size={13} mono />
              <Arrow id={id} x1={140} y1={79 + i * 108} x2={188} y2={68 + i * 108} />
              <Arrow id={id} x1={140} y1={79 + i * 108} x2={188} y2={106 + i * 108} />
            </g>
          ))}
          <Label x={190} y={388} size={13}>
            একই কাস্টমারের তথ্য ৩ জায়গায়, মিলছে না!
          </Label>
          {['বিক্রি অ্যাপ', 'ডেলিভারি অ্যাপ', 'হিসাব অ্যাপ'].map((a, i) => (
            <g key={a}>
              <Node x={440} y={56 + i * 108} w={110} h={46} label={a} tone="brand" size={13} />
              <Arrow id={id} x1={550} y1={79 + i * 108} x2={600} y2={190} />
            </g>
          ))}
          <Node
            x={600}
            y={150}
            w={110}
            h={80}
            label="DBMS"
            sub="একজন ম্যানেজার"
            tone="teal"
            size={17}
          />
          <Arrow id={id} x1={710} y1={190} x2={738} y2={190} />
          <g>
            <ellipse cx={774} cy={160} rx={36} ry={12} className="dg-good" />
            <path d="M738 160 v60 a36 12 0 0 0 72 0 v-60" className="dg-good" />
            <ellipse cx={774} cy={160} rx={36} ry={12} className="dg-good" />
            <Label x={774} y={200} size={13} soft={false} weight={600}>
              একটাই
            </Label>
            <Label x={774} y={218} size={13} soft={false} weight={600}>
              ডাটাবেস
            </Label>
          </g>
        </>
      )}
    </Svg>
  );
}

/* ───── ২. ডাটা → ইনফরমেশন → সিদ্ধান্ত ───── */
export function DataToInfo() {
  return (
    <Svg
      w={820}
      h={250}
      label="কাঁচা ডাটা প্রসেস হয়ে ইনফরমেশন হয়, ইনফরমেশন থেকে সিদ্ধান্ত নেওয়া হয়।"
    >
      {(id) => (
        <>
          <Node
            x={14}
            y={50}
            w={190}
            h={110}
            label="ডাটা (Data)"
            sub="কাঁচা, অর্থহীন তথ্য"
            tone="bad"
            size={18}
          />
          <Label x={109} y={190} size={14} soft={false}>
            ৫০, ১২০, ৮০, ২০০, ৩৫০
          </Label>
          <Arrow id={id} x1={206} y1={105} x2={286} y2={105} />
          <Label x={246} y={90}>
            প্রসেস
          </Label>
          <Node
            x={290}
            y={50}
            w={240}
            h={110}
            label="ইনফরমেশন (Information)"
            sub="অর্থবহ, প্রসঙ্গসহ"
            tone="teal"
            size={18}
          />
          <Label x={410} y={190} size={14} soft={false}>
            রহিমের মোট বাকি ৳৮০০ (গত ৩০ দিনে)
          </Label>
          <Arrow id={id} x1={532} y1={105} x2={612} y2={105} />
          <Label x={572} y={90}>
            বিশ্লেষণ
          </Label>
          <Node
            x={616}
            y={50}
            w={190}
            h={110}
            label="সিদ্ধান্ত"
            sub="কাকে বাকি দেব, কাকে না"
            tone="brand"
            size={18}
          />
          <Label x={410} y={232} size={14}>
            ডাটা নিজে কিছুই বলে না, প্রসঙ্গ পেলে সে ইনফরমেশন হয়ে যায়।
          </Label>
        </>
      )}
    </Svg>
  );
}

/* ───── ৩. ফাইল সিস্টেমের ৭টি সমস্যা ───── */
export function FileProblems() {
  const items = [
    ['Redundancy', 'একই তথ্য বারবার'],
    ['Inconsistency', 'কপিগুলো মেলে না'],
    ['Isolation', 'ডাটা ছড়ানো, ফরম্যাট আলাদা'],
    ['Integrity', 'নিয়ম মানানো কঠিন'],
    ['Atomicity', 'কাজ অর্ধেক হয়ে থাকে'],
    ['Concurrent access', 'একসাথে বদলালে গোলমাল'],
    ['Security', 'সবাই সব দেখে ফেলে'],
  ];
  return (
    <Svg
      w={820}
      h={300}
      label="ফাইল-প্রসেসিং সিস্টেমের সাতটি সমস্যা: redundancy, inconsistency, isolation, integrity, atomicity, concurrent access, security"
    >
      {() => (
        <>
          <Node
            x={320}
            y={110}
            w={180}
            h={64}
            label="ফাইল-প্রসেসিং"
            sub="সিস্টেম"
            tone="bad"
            size={17}
          />
          {items.map(([en, bn], i) => {
            const col = i < 4 ? 0 : 1;
            const idx = col === 0 ? i : i - 4;
            const x = col === 0 ? 8 : 596;
            const y = col === 0 ? 8 + idx * 72 : 44 + idx * 80;
            return (
              <g key={en}>
                <line
                  x1={col === 0 ? x + 216 : x}
                  y1={y + 28}
                  x2={col === 0 ? 320 : 500}
                  y2={142}
                  stroke="var(--bad-line)"
                  strokeWidth={1.6}
                  strokeDasharray="4 4"
                />
                <Node x={x} y={y} w={216} h={56} label={en!} sub={bn} tone="plain" size={15} />
              </g>
            );
          })}
        </>
      )}
    </Svg>
  );
}

/* ───── ৪. DBMS ব্যবহারকারীরা ───── */
export function DbmsUsers() {
  return (
    <Svg
      w={820}
      h={360}
      label="ডাটাবেস ব্যবহারকারী: এন্ড ইউজার, অ্যাপ্লিকেশন প্রোগ্রামার, ডাটাবেস ডিজাইনার ও DBA, সবাই DBMS-এর মাধ্যমে ডাটাবেসে পৌঁছায়।"
    >
      {(id) => (
        <>
          {[
            ['এন্ড ইউজার', 'কাস্টমার, ক্যাশিয়ার', 'teal'],
            ['অ্যাপ প্রোগ্রামার', 'অ্যাপ/ওয়েব বানায়', 'brand'],
            ['ডাটাবেস ডিজাইনার', 'টেবিলের নকশা করে', 'brand'],
            ['DBA', 'নিরাপত্তা, ব্যাকআপ, পারফরম্যান্স', 'good'],
          ].map(([t, s, tone], i) => (
            <g key={t}>
              <Node
                x={12}
                y={14 + i * 86}
                w={236}
                h={64}
                label={t!}
                sub={s}
                tone={tone as Tone}
                size={16}
              />
              <Arrow id={id} x1={248} y1={46 + i * 86} x2={346} y2={178} />
            </g>
          ))}
          <Node
            x={350}
            y={110}
            w={170}
            h={136}
            label="DBMS"
            sub="Query Processor + Storage Manager"
            tone="teal"
            size={20}
          />
          <Arrow id={id} x1={520} y1={178} x2={612} y2={178} both />
          <g>
            <ellipse cx={700} cy={134} rx={74} ry={20} className="dg-good" />
            <path d="M626 134 v90 a74 20 0 0 0 148 0 v-90" className="dg-good" />
            <ellipse cx={700} cy={134} rx={74} ry={20} className="dg-good" />
            <Label x={700} y={186} size={16} soft={false} weight={700}>
              ledu_mart
            </Label>
            <Label x={700} y={208} size={13}>
              ডাটাবেস
            </Label>
          </g>
        </>
      )}
    </Svg>
  );
}

/* ───── ৫. DBMS ভাষা ───── */
export function DbmsLanguages() {
  const cols: [string, string, string, Tone][] = [
    ['DDL', 'কাঠামো বানায়', 'CREATE · ALTER · DROP', 'brand'],
    ['DML', 'ডাটা বদলায়', 'INSERT · UPDATE · DELETE', 'teal'],
    ['DQL', 'ডাটা খোঁজে', 'SELECT', 'good'],
    ['DCL', 'অধিকার দেয়', 'GRANT · REVOKE', 'bad'],
    ['TCL', 'লেনদেন সামলায়', 'COMMIT · ROLLBACK · SAVEPOINT', 'plain'],
  ];
  return (
    <Svg w={820} h={250} label="SQL-এর পাঁচ ভাগ: DDL, DML, DQL, DCL, TCL">
      {(id) => (
        <>
          <Node x={320} y={8} w={180} h={44} label="SQL" tone="brand" size={19} />
          {cols.map(([k, d, ex, tone], i) => {
            const x = 8 + i * 160;
            return (
              <g key={k}>
                <Arrow id={id} x1={410} y1={52} x2={x + 74} y2={100} />
                <Node x={x} y={102} w={148} h={64} label={k} sub={d} tone={tone} size={19} />
                <foreignObject x={x} y={172} width={148} height={64}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11.5,
                      lineHeight: 1.5,
                      textAlign: 'center',
                      color: 'var(--ink-soft)',
                    }}
                  >
                    {ex}
                  </div>
                </foreignObject>
              </g>
            );
          })}
        </>
      )}
    </Svg>
  );
}

/* ───── ৬. বইয়ের রোডম্যাপ ───── */
export function BookRoadmap() {
  const stops = [
    ['১', 'ডাটাবেসের ভিত্তি'],
    ['২', 'ER নকশা'],
    ['৩', 'রিলেশনাল মডেল'],
    ['৪', 'SQL'],
    ['৫', 'নরমালাইজেশন'],
    ['৬', 'ইনডেক্স ও অপটিমাইজার'],
    ['৭–৮', 'ট্রানজ্যাকশন ও কনকারেন্সি'],
    ['৯–১০', 'রিকভারি ও নিরাপত্তা'],
    ['১১', 'বড় হওয়া: NoSQL, DW'],
  ];
  return (
    <Svg w={820} h={310} label="বইয়ের রোডম্যাপ: পর্ব ১ থেকে ১১ পর্যন্ত ধাপে ধাপে">
      {() => (
        <>
          <path
            d="M40 60 H780 C812 60 812 150 780 150 H40 C8 150 8 240 40 240 H780"
            fill="none"
            stroke="var(--line)"
            strokeWidth={6}
            strokeLinecap="round"
          />
          {stops.map(([n, t], i) => {
            const row = Math.floor(i / 4);
            const idx = i % 4;
            const rowRev = row === 1;
            const col = rowRev ? 3 - idx : idx;
            const x = 90 + col * 200;
            const y = 60 + row * 90;
            const tone = i < 3 ? 'teal' : i < 6 ? 'brand' : 'plain';
            return (
              <g key={n}>
                <circle cx={x} cy={y} r={22} className={toneCls[tone as Tone]} />
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={n!.length > 2 ? 12 : 16}
                  fontWeight={700}
                  className="dg-text"
                >
                  {n}
                </text>
                <text
                  x={x}
                  y={y + 40}
                  textAnchor="middle"
                  fontSize={13.5}
                  fontWeight={500}
                  className="dg-text"
                >
                  {t}
                </text>
              </g>
            );
          })}
        </>
      )}
    </Svg>
  );
}

/* ───── ৭. DBMS-এর সুবিধা-অসুবিধা তুলনা (চ্যাপ্টার ২) ───── */
export function DbmsLayers() {
  return (
    <Svg w={820} h={330} label="DBMS-এর তিন স্তর: অ্যাপ্লিকেশন, DBMS, স্টোরেজ">
      {(id) => (
        <>
          <Node
            x={60}
            y={10}
            w={700}
            h={78}
            label="অ্যাপ্লিকেশন স্তর"
            sub="লেদু মার্ট অ্যাপ · ওয়েবসাইট · রাইডার অ্যাপ"
            tone="brand"
            size={18}
          />
          <Arrow id={id} x1={410} y1={88} x2={410} y2={118} both />
          <Label x={440} y={108} anchor="start">
            SQL কোয়েরি ↓ &nbsp; ↑ ফলাফল
          </Label>
          <Node x={60} y={120} w={700} h={98} label="DBMS" tone="teal" size={19} />
          {['Query Processor', 'Transaction Manager', 'Storage Manager'].map((t, i) => (
            <Node
              key={t}
              x={84 + i * 226}
              y={160}
              w={202}
              h={44}
              label={t}
              tone="plain"
              size={14}
            />
          ))}
          <Arrow id={id} x1={410} y1={218} x2={410} y2={248} both />
          <Node
            x={60}
            y={250}
            w={700}
            h={72}
            label="ডিস্কে সংরক্ষিত ডাটা"
            sub="ডাটা ফাইল · ইনডেক্স · লগ"
            tone="good"
            size={18}
          />
        </>
      )}
    </Svg>
  );
}
