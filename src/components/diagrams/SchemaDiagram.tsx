import { useId } from 'react';
import type { Pt } from './erd-geometry';

export interface SchemaColumn {
  name: string;
  pk?: boolean;
  /** "টেবিল.কলাম", FK যেখানে রেফার করে */
  fk?: string;
}
export interface SchemaTable {
  name: string;
  x: number;
  y: number;
  columns: SchemaColumn[];
}

const W = 196;
const HEAD = 30;
const ROW = 21;
const height = (t: SchemaTable) => HEAD + t.columns.length * ROW + 8;

/** রিলেশনাল স্কিমা বাক্স: PK আন্ডারলাইনসহ, FK তীর দিয়ে। */
export function SchemaDiagram({ tables, title }: { tables: SchemaTable[]; title: string }) {
  const id = useId().replace(/:/g, '');
  const byName = new Map(tables.map((t) => [t.name, t]));
  const maxX = Math.max(...tables.map((t) => t.x + W)) + 16;
  const maxY = Math.max(...tables.map((t) => t.y + height(t))) + 16;

  const arrows: { d: string; key: string }[] = [];
  tables.forEach((t) => {
    t.columns.forEach((c, ci) => {
      if (!c.fk) return;
      const [tn, cn] = c.fk.split('.');
      const target = byName.get(tn!);
      if (!target) return;
      const ti = Math.max(
        0,
        target.columns.findIndex((x) => x.name === cn),
      );
      const sy = t.y + HEAD + ci * ROW + ROW / 2;
      const ty = target.y + HEAD + ti * ROW + ROW / 2;
      let s: Pt;
      let e: Pt;
      let d: string;
      if (target === t) {
        s = { x: t.x + W, y: sy };
        e = { x: t.x + W, y: ty };
        d = `M${s.x} ${s.y} C${s.x + 46} ${s.y} ${e.x + 46} ${e.y} ${e.x + 2} ${e.y}`;
      } else if (target.x + W <= t.x - 10 || target.x >= t.x + W + 10) {
        const right = target.x > t.x;
        s = { x: right ? t.x + W : t.x, y: sy };
        e = { x: right ? target.x : target.x + W, y: ty };
        const mx = (s.x + e.x) / 2;
        d = `M${s.x} ${s.y} C${mx} ${s.y} ${mx} ${e.y} ${e.x} ${e.y}`;
      } else {
        const below = target.y > t.y;
        s = { x: t.x + W / 2 + (ci % 2 ? 24 : -24), y: below ? t.y + height(t) : t.y };
        e = {
          x: target.x + W / 2 + (ci % 2 ? 24 : -24),
          y: below ? target.y : target.y + height(target),
        };
        const my = (s.y + e.y) / 2;
        d = `M${s.x} ${s.y} C${s.x} ${my} ${e.x} ${my} ${e.x} ${e.y}`;
      }
      arrows.push({ d, key: `${t.name}.${c.name}` });
    });
  });

  return (
    <svg
      viewBox={`0 0 ${maxX} ${maxY}`}
      style={{ minWidth: 640, width: '100%', height: 'auto' }}
      role="img"
      aria-label={title}
    >
      <defs>
        <marker
          id={`${id}-ah`}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10Z" fill="var(--accent-text)" />
        </marker>
      </defs>
      {arrows.map((a) => (
        <path
          key={a.key}
          d={a.d}
          fill="none"
          stroke="var(--accent-text)"
          strokeWidth={1.8}
          markerEnd={`url(#${id}-ah)`}
        />
      ))}
      {tables.map((t) => (
        <g key={t.name}>
          <rect x={t.x} y={t.y} width={W} height={height(t)} rx={8} className="dg-box" />
          <path
            d={`M${t.x} ${t.y + 8} a8 8 0 0 1 8 -8 h${W - 16} a8 8 0 0 1 8 8 v${HEAD - 8} h-${W}z`}
            fill="var(--brand)"
          />
          <text
            x={t.x + W / 2}
            y={t.y + HEAD / 2 + 1}
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={15}
            fontWeight={700}
            fill="var(--on-brand)"
            fontFamily="var(--font-mono)"
          >
            {t.name}
          </text>
          {t.columns.map((c, i) => (
            <g key={c.name}>
              <text
                x={t.x + 10}
                y={t.y + HEAD + i * ROW + ROW / 2 + 1}
                dominantBaseline="central"
                fontSize={13}
                fontWeight={700}
                className="dg-soft"
              >
                {c.pk ? 'PK' : c.fk ? 'FK' : ''}
              </text>
              <text
                x={t.x + 36}
                y={t.y + HEAD + i * ROW + ROW / 2 + 1}
                dominantBaseline="central"
                fontSize={13.5}
                className="dg-text"
                fontFamily="var(--font-mono)"
                textDecoration={c.pk ? 'underline' : undefined}
              >
                {c.name}
              </text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  );
}

/** পুরো লেদু মার্ট স্কিমা */
export const leduMartSchema: SchemaTable[] = [
  {
    name: 'categories',
    x: 8,
    y: 8,
    columns: [
      { name: 'category_id', pk: true },
      { name: 'name' },
      { name: 'parent_id', fk: 'categories.category_id' },
    ],
  },
  {
    name: 'products',
    x: 258,
    y: 8,
    columns: [
      { name: 'product_id', pk: true },
      { name: 'name' },
      { name: 'category_id', fk: 'categories.category_id' },
      { name: 'supplier_id', fk: 'suppliers.supplier_id' },
      { name: 'price' },
      { name: 'stock' },
      { name: 'unit' },
    ],
  },
  {
    name: 'suppliers',
    x: 508,
    y: 8,
    columns: [
      { name: 'supplier_id', pk: true },
      { name: 'name' },
      { name: 'phone' },
      { name: 'city' },
    ],
  },
  {
    name: 'customers',
    x: 758,
    y: 8,
    columns: [
      { name: 'customer_id', pk: true },
      { name: 'name' },
      { name: 'phone' },
      { name: 'city' },
      { name: 'area' },
      { name: 'joined_on' },
      { name: 'email' },
    ],
  },
  {
    name: 'order_items',
    x: 258,
    y: 248,
    columns: [
      { name: 'order_id', pk: true, fk: 'orders.order_id' },
      { name: 'product_id', pk: true, fk: 'products.product_id' },
      { name: 'quantity' },
      { name: 'unit_price' },
    ],
  },
  {
    name: 'orders',
    x: 508,
    y: 248,
    columns: [
      { name: 'order_id', pk: true },
      { name: 'customer_id', fk: 'customers.customer_id' },
      { name: 'store_id', fk: 'stores.store_id' },
      { name: 'order_date' },
      { name: 'status' },
    ],
  },
  {
    name: 'stores',
    x: 758,
    y: 248,
    columns: [
      { name: 'store_id', pk: true },
      { name: 'name' },
      { name: 'city' },
      { name: 'opened_on' },
    ],
  },
  {
    name: 'employees',
    x: 1008,
    y: 248,
    columns: [
      { name: 'employee_id', pk: true },
      { name: 'name' },
      { name: 'role' },
      { name: 'manager_id', fk: 'employees.employee_id' },
      { name: 'store_id', fk: 'stores.store_id' },
      { name: 'salary' },
      { name: 'hired_on' },
    ],
  },
  {
    name: 'payments',
    x: 258,
    y: 458,
    columns: [
      { name: 'payment_id', pk: true },
      { name: 'order_id', fk: 'orders.order_id' },
      { name: 'method' },
      { name: 'amount' },
      { name: 'paid_on' },
      { name: 'status' },
    ],
  },
  {
    name: 'deliveries',
    x: 508,
    y: 458,
    columns: [
      { name: 'delivery_id', pk: true },
      { name: 'order_id', fk: 'orders.order_id' },
      { name: 'rider_id', fk: 'riders.rider_id' },
      { name: 'delivered_on' },
      { name: 'status' },
    ],
  },
  {
    name: 'riders',
    x: 758,
    y: 458,
    columns: [
      { name: 'rider_id', pk: true },
      { name: 'name' },
      { name: 'phone' },
      { name: 'bike_no' },
      { name: 'store_id', fk: 'stores.store_id' },
    ],
  },
];
