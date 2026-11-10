import { Arrow, Label, Node, Svg } from './ConceptDiagrams';

/* ───── অধ্যায় ৩: তিন-স্কিমা আর্কিটেকচার ───── */
export function ThreeSchema() {
  return (
    <Svg
      w={820}
      h={400}
      label="ANSI/SPARC তিন-স্কিমা আর্কিটেকচার: বাইরের স্তরে একাধিক view, মাঝে conceptual schema, নিচে internal schema ও ডিস্ক; মাঝের দুটি মাপিং logical ও physical data independence দেয়"
    >
      {(id) => (
        <>
          {['কাস্টমার-অ্যাপ view', 'ক্যাশিয়ার view', 'ম্যানেজার রিপোর্ট view'].map((t, i) => (
            <Node key={t} x={30 + i * 260} y={10} w={230} h={54} label={t} tone="teal" size={15} />
          ))}
          <Label x={410} y={84} soft={false} weight={700}>
            External level (View level)
          </Label>
          {[0, 1, 2].map((i) => (
            <Arrow key={i} id={id} x1={145 + i * 260} y1={64} x2={410} y2={120} />
          ))}
          <Node
            x={160}
            y={120}
            w={500}
            h={64}
            label="Conceptual schema"
            sub="সব টেবিল, সম্পর্ক, constraint, পুরো সংস্থার ডাটার নকশা"
            tone="brand"
            size={17}
          />
          <Label x={410} y={204} soft={false} weight={700}>
            Conceptual (Logical) level
          </Label>
          <Arrow id={id} x1={410} y1={184} x2={410} y2={238} />
          <Node
            x={160}
            y={240}
            w={500}
            h={64}
            label="Internal schema"
            sub="ফাইল, ইনডেক্স, পেজ, ডাটা ডিস্কে কীভাবে থাকে"
            tone="good"
            size={17}
          />
          <Label x={410} y={324} soft={false} weight={700}>
            Internal (Physical) level
          </Label>
          <Arrow id={id} x1={410} y1={304} x2={410} y2={338} />
          <Node x={300} y={340} w={220} h={50} label="ডিস্কে ডাটা" tone="plain" size={15} />
          <Label x={30} y={158} anchor="start" size={13}>
            External/Conceptual মাপিং
          </Label>
          <Label x={30} y={176} anchor="start" size={13}>
            → Logical data independence
          </Label>
          <Label x={680} y={268} anchor="start" size={13}>
            Conceptual/Internal মাপিং
          </Label>
          <Label x={680} y={286} anchor="start" size={13}>
            → Physical data independence
          </Label>
        </>
      )}
    </Svg>
  );
}

/* ───── অধ্যায় ৩: 1/2/3-tier ───── */
export function Tiers() {
  const col = (x: number, title: string, rows: [string, 'plain' | 'brand' | 'teal' | 'good'][]) => (
    <g>
      <Label x={x + 120} y={22} soft={false} weight={700} size={16}>
        {title}
      </Label>
      {rows.map(([t, tone], i) => (
        <Node key={t} x={x} y={36 + i * 74} w={240} h={56} label={t} tone={tone} size={14} />
      ))}
    </g>
  );
  return (
    <Svg
      w={820}
      h={330}
      label="১-টিয়ার (সবকিছু একই মেশিনে), ২-টিয়ার (ক্লায়েন্ট সরাসরি ডাটাবেস সার্ভারে), ৩-টিয়ার (ক্লায়েন্ট, অ্যাপ সার্ভার, ডাটাবেস সার্ভার)"
    >
      {() => (
        <>
          {col(8, '১-টিয়ার', [['অ্যাপ + DBMS + ডাটা (একই কম্পিউটার)', 'brand']])}
          {col(290, '২-টিয়ার', [
            ['ক্লায়েন্ট অ্যাপ', 'teal'],
            ['ডাটাবেস সার্ভার (DBMS)', 'good'],
          ])}
          {col(572, '৩-টিয়ার', [
            ['ক্লায়েন্ট (ব্রাউজার/মোবাইল)', 'teal'],
            ['অ্যাপ সার্ভার (বিজনেস লজিক)', 'brand'],
            ['ডাটাবেস সার্ভার', 'good'],
          ])}
        </>
      )}
    </Svg>
  );
}

/* ───── অধ্যায় ৩: DBMS উপাদান ───── */
export function DbmsComponents() {
  return (
    <Svg
      w={820}
      h={380}
      label="DBMS-এর উপাদান: DDL ও DML কম্পাইলার, query optimizer, execution engine, transaction ও buffer manager, file manager, ডিস্কের ডাটা ফাইল, ইনডেক্স ও ডাটা ডিকশনারি"
    >
      {(id) => (
        <>
          <Node
            x={20}
            y={8}
            w={780}
            h={44}
            label="ব্যবহারকারী / অ্যাপ্লিকেশন, SQL কোয়েরি"
            tone="brand"
            size={15}
          />
          <Arrow id={id} x1={410} y1={52} x2={410} y2={78} />
          <rect x={20} y={80} width={780} height={118} rx={10} className="dg-box-teal" />
          <Label x={410} y={100} soft={false} weight={700}>
            Query Processor
          </Label>
          {['DDL ইন্টারপ্রেটার', 'DML কম্পাইলার', 'Query Optimizer', 'Execution Engine'].map(
            (t, i) => (
              <Node
                key={t}
                x={36 + i * 190}
                y={116}
                w={172}
                h={66}
                label={t}
                tone="plain"
                size={14}
              />
            ),
          )}
          <Arrow id={id} x1={410} y1={198} x2={410} y2={224} />
          <rect x={20} y={226} width={780} height={92} rx={10} className="dg-box-brand" />
          <Label x={410} y={246} soft={false} weight={700}>
            Storage Manager
          </Label>
          {[
            'Authorization ও Integrity Manager',
            'Transaction Manager',
            'File Manager',
            'Buffer Manager',
          ].map((t, i) => (
            <Node
              key={t}
              x={36 + i * 190}
              y={258}
              w={172}
              h={50}
              label={t}
              tone="plain"
              size={12.5}
            />
          ))}
          <Arrow id={id} x1={410} y1={318} x2={410} y2={338} />
          <Node
            x={20}
            y={338}
            w={780}
            h={36}
            label="ডিস্ক: ডাটা ফাইল · ইনডেক্স · ডাটা ডিকশনারি (metadata) · লগ"
            tone="good"
            size={14}
          />
        </>
      )}
    </Svg>
  );
}

/* ───── অধ্যায় ৪: ডাটা মডেলের আকার ───── */
export function DataModelShapes() {
  const nodes = (cx: number, cy: number, r: number) => (
    <circle cx={cx} cy={cy} r={r} className="dg-box-brand" />
  );
  return (
    <Svg
      w={820}
      h={300}
      label="তিন ধরনের ডাটা মডেলের আকার: hierarchical মডেলে গাছ, network মডেলে জাল, relational মডেলে টেবিল"
    >
      {() => (
        <>
          <Label x={130} y={22} soft={false} weight={700} size={16}>
            Hierarchical (গাছ)
          </Label>
          <g stroke="var(--ink-soft)" strokeWidth={2}>
            <line x1={130} y1={70} x2={60} y2={150} />
            <line x1={130} y1={70} x2={200} y2={150} />
            <line x1={60} y1={150} x2={30} y2={230} />
            <line x1={60} y1={150} x2={90} y2={230} />
            <line x1={200} y1={150} x2={200} y2={230} />
          </g>
          {nodes(130, 70, 22)}
          {nodes(60, 150, 20)}
          {nodes(200, 150, 20)}
          {nodes(30, 230, 18)}
          {nodes(90, 230, 18)}
          {nodes(200, 230, 18)}
          <Label x={130} y={278} size={13}>
            প্রতিটি child-এর একটিই parent
          </Label>
          <Label x={410} y={22} soft={false} weight={700} size={16}>
            Network (জাল)
          </Label>
          <g stroke="var(--ink-soft)" strokeWidth={2}>
            <line x1={350} y1={80} x2={410} y2={150} />
            <line x1={470} y1={80} x2={410} y2={150} />
            <line x1={350} y1={80} x2={350} y2={230} />
            <line x1={470} y1={80} x2={470} y2={230} />
            <line x1={410} y1={150} x2={350} y2={230} />
            <line x1={410} y1={150} x2={470} y2={230} />
            <line x1={350} y1={80} x2={470} y2={230} />
          </g>
          {nodes(350, 80, 20)}
          {nodes(470, 80, 20)}
          {nodes(410, 150, 20)}
          {nodes(350, 230, 20)}
          {nodes(470, 230, 20)}
          <Label x={410} y={278} size={13}>
            একাধিক parent সম্ভব (M:N)
          </Label>
          <Label x={690} y={22} soft={false} weight={700} size={16}>
            Relational (টেবিল)
          </Label>
          {[0, 1].map((k) => (
            <g key={k} transform={`translate(${k ? 740 : 610} ${k ? 120 : 50})`}>
              <rect width={110} height={80} rx={6} className="dg-box" />
              <rect width={110} height={22} rx={6} className="dg-box-brand" />
              <path
                d="M0 44 H110 M0 62 H110 M36 22 V80 M72 22 V80"
                stroke="var(--line)"
                strokeWidth={1.5}
              />
            </g>
          ))}
          <line
            x1={720}
            y1={150}
            x2={740}
            y2={160}
            stroke="var(--accent-text)"
            strokeWidth={2}
            strokeDasharray="4 3"
          />
          <Label x={690} y={278} size={13}>
            সারি-কলাম + key দিয়ে সম্পর্ক
          </Label>
        </>
      )}
    </Svg>
  );
}

/* ───── অধ্যায় ১০: চাবির স্তরবিন্যাস (nested sets) ───── */
export function KeyHierarchy() {
  return (
    <Svg
      w={820}
      h={330}
      label="Super key সবচেয়ে বড় সেট; তার ভেতরে candidate key; candidate key-র একটি primary key, বাকিগুলো alternate key"
    >
      {() => (
        <>
          <rect x={10} y={10} width={800} height={310} rx={26} className="dg-box-teal" />
          <Label x={410} y={38} soft={false} weight={700} size={17}>
            Super Key, যেকোনো attribute-সেট যা সারিকে অনন্যভাবে চেনায়
          </Label>
          <rect x={60} y={60} width={700} height={240} rx={22} className="dg-box-brand" />
          <Label x={410} y={88} soft={false} weight={700} size={17}>
            Candidate Key, ন্যূনতম super key (এর কোনো অংশ আর super key নয়)
          </Label>
          <rect x={110} y={108} width={290} height={170} rx={18} className="dg-good" />
          <Label x={255} y={140} soft={false} weight={700} size={16}>
            Primary Key
          </Label>
          <Label x={255} y={166} size={13}>
            candidate-দের মধ্যে বেছে নেওয়া একটি
          </Label>
          <Label x={255} y={196} size={13} soft={false}>
            customer_id
          </Label>
          <rect x={430} y={108} width={290} height={170} rx={18} className="dg-box" />
          <Label x={575} y={140} soft={false} weight={700} size={16}>
            Alternate Key
          </Label>
          <Label x={575} y={166} size={13}>
            বাকি candidate key
          </Label>
          <Label x={575} y={196} size={13} soft={false}>
            phone (UNIQUE NOT NULL)
          </Label>
        </>
      )}
    </Svg>
  );
}

/* ───── অধ্যায় ১২: কোয়েরি ট্রি ───── */
export function QueryTree() {
  return (
    <Svg
      w={820}
      h={300}
      label="একটি relational algebra এক্সপ্রেশনের query tree: নিচে পাতায় রিলেশন, ওপরে join, selection ও projection"
    >
      {(id) => (
        <>
          <Node x={290} y={8} w={240} h={46} label="π name, price" tone="brand" size={16} />
          <Arrow id={id} x1={410} y1={54} x2={410} y2={80} />
          <Node x={250} y={82} w={320} h={46} label="σ category_id = 5" tone="teal" size={16} />
          <Arrow id={id} x1={410} y1={128} x2={410} y2={154} />
          <Node x={290} y={156} w={240} h={46} label="⋈ supplier_id" tone="good" size={16} />
          <Arrow id={id} x1={350} y1={202} x2={230} y2={236} />
          <Arrow id={id} x1={470} y1={202} x2={590} y2={236} />
          <Node x={150} y={238} w={160} h={46} label="products" mono tone="plain" size={15} />
          <Node x={510} y={238} w={160} h={46} label="suppliers" mono tone="plain" size={15} />
        </>
      )}
    </Svg>
  );
}
