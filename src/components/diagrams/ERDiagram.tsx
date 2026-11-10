import { useId, useMemo, useState, type ReactNode } from 'react';
import type { ErAttr, ErDiagramDef, ErEntity, ErLink, ErRel } from './erd-types';
import {
  angleTo,
  diamondEdge,
  ellipseEdge,
  pickAngles,
  polar,
  rectEdge,
  textW,
  type Pt,
} from './erd-geometry';

type Notation = 'chen' | 'crow';
const STROKE = 'var(--ink-soft)';
const BRAND = 'var(--brand)';
const ACCENT = 'var(--accent)';

/* ───────────────────────── public component ───────────────────────── */
export function ERDiagram({
  def,
  notation: initial = 'chen',
  toggle = true,
  minmax: minmaxInitial = false,
}: {
  def: ErDiagramDef;
  notation?: Notation;
  toggle?: boolean;
  minmax?: boolean;
}) {
  const [notation, setNotation] = useState<Notation>(initial);
  const [minmax, setMinmax] = useState(minmaxInitial);
  const gid = useId();
  const view = useMemo(
    () => (notation === 'chen' ? renderChen(def, minmax) : renderCrow(def)),
    [def, notation, minmax],
  );

  return (
    <div>
      {toggle && (
        <div className="no-print mb-2 flex flex-wrap items-center gap-3 text-sm">
          <div
            role="radiogroup"
            aria-label="ERD নোটেশন"
            className="inline-flex overflow-hidden rounded-full border border-brand"
          >
            {(['chen', 'crow'] as const).map((n) => (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={notation === n}
                onClick={() => setNotation(n)}
                className={`min-h-9 px-4 font-semibold ${notation === n ? 'bg-brand text-on-brand' : 'text-brand hover:bg-brand-tint'}`}
              >
                {n === 'chen' ? 'Chen' : "Crow's Foot"}
              </button>
            ))}
          </div>
          {notation === 'chen' && (
            <label
              htmlFor={`${gid}-mm`}
              className="inline-flex cursor-pointer items-center gap-2 text-ink-soft"
            >
              <input
                id={`${gid}-mm`}
                type="checkbox"
                checked={minmax}
                onChange={(e) => setMinmax(e.target.checked)}
                className="h-4 w-4 accent-[var(--brand)]"
              />
              (min,max) নোটেশন
            </label>
          )}
        </div>
      )}
      <svg
        viewBox={`${view.box.x} ${view.box.y} ${view.box.w} ${view.box.h}`}
        style={{ minWidth: Math.min(view.box.w, 560), width: '100%', height: 'auto' }}
        role="img"
        aria-label={`${def.title} — ${notation === 'chen' ? 'Chen' : "Crow's Foot"} নোটেশন`}
      >
        {view.node}
      </svg>
    </div>
  );
}

/* ───────────────────────── helpers ───────────────────────── */
interface View {
  node: ReactNode;
  box: { x: number; y: number; w: number; h: number };
}

class Bounds {
  minX = Infinity;
  minY = Infinity;
  maxX = -Infinity;
  maxY = -Infinity;
  grow(x: number, y: number, rx = 0, ry = rx): void {
    this.minX = Math.min(this.minX, x - rx);
    this.maxX = Math.max(this.maxX, x + rx);
    this.minY = Math.min(this.minY, y - ry);
    this.maxY = Math.max(this.maxY, y + ry);
  }
  box(pad = 22) {
    return {
      x: this.minX - pad,
      y: this.minY - pad,
      w: this.maxX - this.minX + pad * 2,
      h: this.maxY - this.minY + pad * 2,
    };
  }
}

const entityDims = (e: ErEntity) => ({ w: Math.max(110, textW(e.name, 17) + 34), h: 46 });
const relDims = (r: ErRel) => ({ w: Math.max(124, textW(r.name, 15) + 56), h: 66 });
const attrDims = (a: ErAttr) => ({ rx: Math.max(34, textW(a.name, 14) / 2 + 12), ry: 19 });

const T = ({
  x,
  y,
  children,
  size = 15,
  weight = 500,
  anchor = 'middle',
  soft = false,
}: {
  x: number;
  y: number;
  children: ReactNode;
  size?: number;
  weight?: number;
  anchor?: 'middle' | 'start' | 'end';
  soft?: boolean;
}) => (
  <text
    x={x}
    y={y}
    textAnchor={anchor}
    dominantBaseline="central"
    fontSize={size}
    fontWeight={weight}
    className={soft ? 'dg-soft' : 'dg-text'}
  >
    {children}
  </text>
);

function Line({
  a,
  b,
  double = false,
  dash,
  color = STROKE,
  width = 1.8,
}: {
  a: Pt;
  b: Pt;
  double?: boolean;
  dash?: string;
  color?: string;
  width?: number;
}) {
  if (!double)
    return (
      <line
        x1={a.x}
        y1={a.y}
        x2={b.x}
        y2={b.y}
        stroke={color}
        strokeWidth={width}
        strokeDasharray={dash}
      />
    );
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const len = Math.hypot(dx, dy) || 1;
  const nx = (-dy / len) * 2.6;
  const ny = (dx / len) * 2.6;
  return (
    <>
      <line
        x1={a.x + nx}
        y1={a.y + ny}
        x2={b.x + nx}
        y2={b.y + ny}
        stroke={color}
        strokeWidth={width}
      />
      <line
        x1={a.x - nx}
        y1={a.y - ny}
        x2={b.x - nx}
        y2={b.y - ny}
        stroke={color}
        strokeWidth={width}
      />
    </>
  );
}

/** (min,max) = এই entity সম্পর্কে কতবার অংশ নেয়; max নির্ভর করে বাকি দিকের কার্ডিনালিটির উপর (Elmasri/Silberschatz)। */
const cardLabel = (l: ErLink, others: ErLink[], minmax: boolean) =>
  minmax ? `(${l.total ? 1 : 0},${others.every((o) => o.card === '1') ? '1' : 'N'})` : l.card;

/* ───────────────────────── Chen ───────────────────────── */
function renderChen(def: ErDiagramDef, minmax: boolean): View {
  const b = new Bounds();
  const lines: ReactNode[] = [];
  const shapes: ReactNode[] = [];
  const ent = new Map(def.entities.map((e) => [e.id, e]));
  const centers = new Map<string, Pt>();
  def.entities.forEach((e) => centers.set(e.id, { x: e.x, y: e.y }));
  def.rels.forEach((r) => centers.set(r.id, { x: r.x, y: r.y }));
  (def.isas ?? []).forEach((i) => centers.set(i.id, { x: i.x, y: i.y }));

  /* অ্যাট্রিবিউট (ellipse) আঁকা — composite হলে উপাদানসহ */
  /* দখলকৃত জায়গা: এন্টিটি, সম্পর্ক, ISA আর আগে বসানো অ্যাট্রিবিউট — নতুন অ্যাট্রিবিউট এগুলোর উপর পড়বে না */
  const occ: { x: number; y: number; rx: number; ry: number }[] = [];
  def.entities.forEach((e) => {
    const { w, h } = entityDims(e);
    occ.push({ x: e.x, y: e.y, rx: w / 2 + 6, ry: h / 2 + 6 });
  });
  def.rels.forEach((r) => {
    const { w, h } = relDims(r);
    occ.push({ x: r.x, y: r.y, rx: w / 2 + 4, ry: h / 2 + 4 });
  });
  (def.isas ?? []).forEach((i) => occ.push({ x: i.x, y: i.y, rx: 20, ry: 20 }));

  const drawAttr = (
    a: ErAttr,
    from: Pt,
    fromEdge: (t: Pt) => Pt,
    deg0: number,
    dist: (deg: number) => number,
    key: string,
    depth = 0,
  ): void => {
    const { rx, ry } = attrDims(a);
    const at = (d: number, extra: number): Pt => {
      const rIn = ellipseEdge(
        0,
        0,
        rx,
        ry,
        Math.cos((d * Math.PI) / 180),
        Math.sin((d * Math.PI) / 180),
      );
      return polar(from, dist(d) + Math.hypot(rIn.x, rIn.y) + (depth ? 14 : 22) + extra, d);
    };
    const free = (p: Pt) =>
      !occ.some((o) => Math.abs(o.x - p.x) < o.rx + rx + 4 && Math.abs(o.y - p.y) < o.ry + ry + 4);
    let deg = deg0;
    let c = at(deg0, 0);
    search: for (const extra of [0, 18, 40]) {
      for (let k = 0; k <= 12; k++) {
        for (const sgn of k ? [1, -1] : [1]) {
          const d = deg0 + sgn * k * 15;
          const p = at(d, extra);
          if (free(p)) {
            deg = d;
            c = p;
            break search;
          }
        }
      }
    }
    occ.push({ x: c.x, y: c.y, rx, ry });
    const kind = a.kind ?? 'simple';
    b.grow(c.x, c.y, rx + 6, ry + 6);
    const start = fromEdge(c);
    const end = ellipseEdge(c.x, c.y, rx, ry, from.x, from.y);
    lines.push(<Line key={`${key}-l`} a={start} b={end} />);
    shapes.push(
      <g key={key}>
        {kind === 'multi' && (
          <ellipse cx={c.x} cy={c.y} rx={rx + 5} ry={ry + 5} className="dg-box" strokeWidth={1.6} />
        )}
        <ellipse
          cx={c.x}
          cy={c.y}
          rx={rx}
          ry={ry}
          className="dg-box"
          strokeDasharray={kind === 'derived' ? '5 4' : undefined}
          strokeWidth={1.8}
        />
        <T x={c.x} y={c.y} size={14}>
          {a.name}
        </T>
        {kind === 'key' && (
          <line
            x1={c.x - textW(a.name, 14) / 2 + 3}
            x2={c.x + textW(a.name, 14) / 2 - 3}
            y1={c.y + 9}
            y2={c.y + 9}
            stroke="var(--ink)"
            strokeWidth={1.6}
          />
        )}
        {kind === 'partial' && (
          <line
            x1={c.x - textW(a.name, 14) / 2 + 3}
            x2={c.x + textW(a.name, 14) / 2 - 3}
            y1={c.y + 9}
            y2={c.y + 9}
            stroke="var(--ink)"
            strokeWidth={1.6}
            strokeDasharray="4 3"
          />
        )}
      </g>,
    );
    if (a.children?.length) {
      const n = a.children.length;
      a.children.forEach((ch, i) => {
        const d = deg + (n === 1 ? 0 : -50 + (100 / (n - 1)) * i);
        drawAttr(
          ch,
          c,
          (t) => ellipseEdge(c.x, c.y, rx, ry, t.x, t.y),
          d,
          (dd) => {
            const q = ellipseEdge(
              0,
              0,
              rx,
              ry,
              Math.cos((dd * Math.PI) / 180),
              Math.sin((dd * Math.PI) / 180),
            );
            return Math.hypot(q.x, q.y);
          },
          `${key}-c${i}`,
          depth + 1,
        );
      });
    }
  };

  /* সংযুক্ত সম্পর্ক থেকে "বাধা" কোণ */
  const blockedFor = (id: string): number[] => {
    const me = centers.get(id)!;
    const out: number[] = [];
    def.rels.forEach((r) => {
      if (r.links.some((l) => l.entity === id)) out.push(angleTo(me, centers.get(r.id)!));
    });
    (def.isas ?? []).forEach((i) => {
      if (i.parent === id || i.children.includes(id)) out.push(angleTo(me, centers.get(i.id)!));
    });
    return out;
  };

  const placeAttrs = (
    id: string,
    attrs: ErAttr[],
    edge: (deg: number) => number,
    from: Pt,
    fromEdge: (t: Pt) => Pt,
    blocked: number[],
  ) => {
    const fixed = attrs.filter((a) => a.angle !== undefined).map((a) => a.angle!);
    const auto = pickAngles(attrs.filter((a) => a.angle === undefined).length, [
      ...blocked,
      ...fixed,
    ]);
    let k = 0;
    attrs.forEach((a, i) => {
      const deg = a.angle ?? auto[k++]!;
      drawAttr(a, from, fromEdge, deg, edge, `${id}-a${i}`);
    });
  };

  /* এন্টিটি */
  def.entities.forEach((e) => {
    const { w, h } = entityDims(e);
    const c = { x: e.x, y: e.y };
    b.grow(e.x, e.y, w / 2 + 4, h / 2 + 4);
    const edge = (deg: number) => {
      const p = rectEdge(
        0,
        0,
        w,
        h,
        Math.cos((deg * Math.PI) / 180),
        Math.sin((deg * Math.PI) / 180),
      );
      return Math.hypot(p.x, p.y);
    };
    shapes.push(
      <g key={e.id}>
        <rect
          x={e.x - w / 2}
          y={e.y - h / 2}
          width={w}
          height={h}
          className="dg-box-brand"
          rx={3}
        />
        {e.weak && (
          <rect
            x={e.x - w / 2 + 5}
            y={e.y - h / 2 + 5}
            width={w - 10}
            height={h - 10}
            fill="none"
            stroke={BRAND}
            strokeWidth={1.8}
          />
        )}
        <T x={e.x} y={e.y} size={17} weight={700}>
          {e.name}
        </T>
      </g>,
    );
    placeAttrs(e.id, e.attrs, edge, c, (t) => rectEdge(e.x, e.y, w, h, t.x, t.y), blockedFor(e.id));
  });

  /* সম্পর্ক */
  def.rels.forEach((r) => {
    const { w, h } = relDims(r);
    const c = { x: r.x, y: r.y };
    b.grow(r.x, r.y, w / 2 + 4, h / 2 + 4);
    const pts = (ww: number, hh: number) =>
      `${r.x},${r.y - hh / 2} ${r.x + ww / 2},${r.y} ${r.x},${r.y + hh / 2} ${r.x - ww / 2},${r.y}`;
    shapes.push(
      <g key={r.id}>
        <polygon points={pts(w, h)} className="dg-box-teal" />
        {r.identifying && (
          <polygon points={pts(w - 16, h - 12)} fill="none" stroke={ACCENT} strokeWidth={1.8} />
        )}
        <T x={r.x} y={r.y} size={15} weight={600}>
          {r.name}
        </T>
      </g>,
    );
    const seen = new Map<string, number>();
    r.links.forEach((l, i) => {
      const e = ent.get(l.entity);
      if (!e) return;
      const { w: ew, h: eh } = entityDims(e);
      const k = seen.get(l.entity) ?? 0;
      seen.set(l.entity, k + 1);
      const dupes = r.links.filter((x) => x.entity === l.entity).length;
      const off = dupes > 1 ? (k - (dupes - 1) / 2) * 44 : 0;
      const target: Pt = { x: e.x + off, y: e.y };
      const p2 = rectEdge(e.x, e.y, ew, eh, r.x + (off ? off * 0.2 : 0), r.y);
      const pEnt = off ? { x: target.x, y: p2.y } : p2;
      const p1 = diamondEdge(r.x, r.y, w, h, pEnt.x, pEnt.y);
      lines.push(<Line key={`${r.id}-lk${i}`} a={p1} b={pEnt} double={l.total} />);
      // কার্ডিনালিটি লেবেল (এন্টিটির কাছে)
      const dx = p1.x - pEnt.x;
      const dy = p1.y - pEnt.y;
      const len = Math.hypot(dx, dy) || 1;
      const lab = {
        x: pEnt.x + (dx / len) * 20 - (dy / len) * 13,
        y: pEnt.y + (dy / len) * 20 + (dx / len) * 13,
      };
      shapes.push(
        <T key={`${r.id}-cl${i}`} x={lab.x} y={lab.y} size={15} weight={700}>
          {cardLabel(
            l,
            r.links.filter((x) => x !== l),
            minmax,
          )}
        </T>,
      );
      if (l.role) {
        const mid = {
          x: (p1.x + pEnt.x) / 2 + (dy / len) * 14,
          y: (p1.y + pEnt.y) / 2 - (dx / len) * 14,
        };
        shapes.push(
          <T key={`${r.id}-rl${i}`} x={mid.x} y={mid.y} size={12.5} weight={400} soft>
            {l.role}
          </T>,
        );
      }
    });
    if (r.attrs?.length) {
      const blocked = r.links.map((l) => angleTo(c, centers.get(l.entity)!));
      const edge = (deg: number) => {
        const p = diamondEdge(
          0,
          0,
          w,
          h,
          Math.cos((deg * Math.PI) / 180),
          Math.sin((deg * Math.PI) / 180),
        );
        return Math.hypot(p.x, p.y);
      };
      placeAttrs(r.id, r.attrs, edge, c, (t) => diamondEdge(r.x, r.y, w, h, t.x, t.y), blocked);
    }
  });

  /* ISA */
  (def.isas ?? []).forEach((s) => {
    const p = ent.get(s.parent);
    if (!p) return;
    const pd = entityDims(p);
    const c = { x: s.x, y: s.y };
    b.grow(s.x, s.y, 16);
    lines.push(
      <Line
        key={`${s.id}-p`}
        a={rectEdge(p.x, p.y, pd.w, pd.h, s.x, s.y)}
        b={ellipseEdge(s.x, s.y, 15, 15, p.x, p.y)}
        double={s.total}
      />,
    );
    s.children.forEach((cid, i) => {
      const ch = ent.get(cid);
      if (!ch) return;
      const cd = entityDims(ch);
      lines.push(
        <Line
          key={`${s.id}-c${i}`}
          a={ellipseEdge(s.x, s.y, 15, 15, ch.x, ch.y)}
          b={rectEdge(ch.x, ch.y, cd.w, cd.h, s.x, s.y)}
        />,
      );
    });
    shapes.push(
      <g key={s.id}>
        {s.shape === 'triangle' ? (
          <>
            <polygon
              points={`${c.x - 20},${c.y - 13} ${c.x + 20},${c.y - 13} ${c.x},${c.y + 15}`}
              className="dg-box"
            />
            <T x={c.x} y={c.y - 4} size={12} weight={700}>
              ISA
            </T>
          </>
        ) : (
          <>
            <circle cx={c.x} cy={c.y} r={15} className="dg-box" />
            <T x={c.x} y={c.y} size={15} weight={700}>
              {s.kind === 'u' ? 'U' : s.kind}
            </T>
          </>
        )}
      </g>,
    );
  });

  /* Aggregation বাক্স */
  (def.aggs ?? []).forEach((a) => {
    const r = def.rels.find((x) => x.id === a.rel);
    if (!r) return;
    const dims = relDims(r);
    let x0 = r.x - dims.w / 2;
    let x1 = r.x + dims.w / 2;
    let y0 = r.y - dims.h / 2;
    let y1 = r.y + dims.h / 2;
    a.entities.forEach((id) => {
      const e = ent.get(id);
      if (!e) return;
      const d = entityDims(e);
      x0 = Math.min(x0, e.x - d.w / 2);
      x1 = Math.max(x1, e.x + d.w / 2);
      y0 = Math.min(y0, e.y - d.h / 2);
      y1 = Math.max(y1, e.y + d.h / 2);
    });
    const pad = 22;
    b.grow((x0 + x1) / 2, (y0 + y1) / 2, (x1 - x0) / 2 + pad + 4, (y1 - y0) / 2 + pad + 4);
    lines.unshift(
      <g key={a.id}>
        <rect
          x={x0 - pad}
          y={y0 - pad}
          width={x1 - x0 + pad * 2}
          height={y1 - y0 + pad * 2}
          rx={12}
          fill="none"
          stroke={BRAND}
          strokeWidth={2}
          strokeDasharray="8 5"
        />
        {a.label && (
          <T x={x0 - pad + 8} y={y0 - pad - 10} size={13} anchor="start" soft>
            {a.label}
          </T>
        )}
      </g>,
    );
  });

  return {
    node: (
      <>
        {lines}
        {shapes}
      </>
    ),
    box: b.box(),
  };
}

/* ───────────────────────── Crow's Foot ───────────────────────── */
interface Box {
  cx: number;
  cy: number;
  w: number;
  h: number;
}

function attrRows(attrs: ErAttr[]): { tag: string; text: string }[] {
  const rows: { tag: string; text: string }[] = [];
  attrs.forEach((a) => {
    const kind = a.kind ?? 'simple';
    if (kind === 'composite' && a.children?.length) {
      a.children.forEach((c) =>
        rows.push({
          tag: c.fk ? 'FK' : '',
          text: `${a.name}_${c.name}${c.nullable ? ' (null)' : ''}`,
        }),
      );
      return;
    }
    const tag = kind === 'key' ? 'PK' : kind === 'partial' ? 'PK' : a.fk ? 'FK' : '';
    let text = a.name;
    if (kind === 'derived') text = `/${text}`;
    if (kind === 'multi') text = `${text} {অনেক মান}`;
    if (kind === 'partial') text += ' (partial)';
    if (a.nullable) text += ' (null)';
    rows.push({ tag, text });
  });
  return rows;
}

function boxFor(name: string, x: number, y: number, rows: { tag: string; text: string }[]): Box {
  const w = Math.max(textW(name, 16) + 36, ...rows.map((r) => textW(r.text, 14) + 58), 130);
  const h = 32 + Math.max(1, rows.length) * 22 + 6;
  return { cx: x, cy: y, w, h };
}

/** Crow's Foot-এর প্রান্ত-চিহ্ন: p = সীমানার বিন্দু, u = লাইন বরাবর (এন্টিটি থেকে বাইরের দিকে) একক ভেক্টর */
function CrowEnd({ p, u, max, min }: { p: Pt; u: Pt; max: '1' | 'N'; min: 0 | 1 }) {
  const n = { x: -u.y, y: u.x };
  const at = (d: number, s = 0): Pt => ({ x: p.x + u.x * d + n.x * s, y: p.y + u.y * d + n.y * s });
  const bar = (d: number) => {
    const a = at(d, -8);
    const bb = at(d, 8);
    return (
      <line key={`b${d}`} x1={a.x} y1={a.y} x2={bb.x} y2={bb.y} stroke={STROKE} strokeWidth={2} />
    );
  };
  const els: ReactNode[] = [];
  if (max === 'N') {
    const tip = at(15);
    [-9, 0, 9].forEach((s) => {
      const q = at(0, s);
      els.push(
        <line
          key={`f${s}`}
          x1={tip.x}
          y1={tip.y}
          x2={q.x}
          y2={q.y}
          stroke={STROKE}
          strokeWidth={2}
        />,
      );
    });
    if (min === 1) els.push(bar(20));
    else {
      const c = at(24);
      els.push(
        <circle
          key="o"
          cx={c.x}
          cy={c.y}
          r={5}
          fill="var(--surface)"
          stroke={STROKE}
          strokeWidth={2}
        />,
      );
    }
  } else if (min === 1) {
    els.push(bar(10), bar(18));
  } else {
    els.push(bar(10));
    const c = at(21);
    els.push(
      <circle
        key="o"
        cx={c.x}
        cy={c.y}
        r={5}
        fill="var(--surface)"
        stroke={STROKE}
        strokeWidth={2}
      />,
    );
  }
  return <>{els}</>;
}

function renderCrow(def: ErDiagramDef): View {
  const b = new Bounds();
  const lines: ReactNode[] = [];
  const shapes: ReactNode[] = [];
  const boxes = new Map<string, Box>();

  const drawBox = (
    id: string,
    name: string,
    x: number,
    y: number,
    attrs: ErAttr[],
    style: 'entity' | 'assoc',
    weak = false,
  ) => {
    const rows = attrRows(attrs);
    const bx = boxFor(name, x, y, rows);
    boxes.set(id, bx);
    b.grow(bx.cx, bx.cy, bx.w / 2, bx.h / 2);
    const top = bx.cy - bx.h / 2;
    shapes.push(
      <g key={id}>
        <rect
          x={bx.cx - bx.w / 2}
          y={top}
          width={bx.w}
          height={bx.h}
          rx={6}
          className={style === 'entity' ? 'dg-box' : 'dg-box-teal'}
          strokeDasharray={style === 'assoc' ? '6 4' : undefined}
        />
        {weak && (
          <rect
            x={bx.cx - bx.w / 2 + 4}
            y={top + 4}
            width={bx.w - 8}
            height={bx.h - 8}
            rx={4}
            fill="none"
            stroke={BRAND}
            strokeWidth={1.4}
          />
        )}
        <rect
          x={bx.cx - bx.w / 2}
          y={top}
          width={bx.w}
          height={30}
          rx={6}
          fill={style === 'entity' ? 'var(--brand-tint)' : 'var(--accent-tint)'}
          stroke="none"
        />
        <line
          x1={bx.cx - bx.w / 2}
          x2={bx.cx + bx.w / 2}
          y1={top + 30}
          y2={top + 30}
          stroke={style === 'entity' ? BRAND : ACCENT}
          strokeWidth={1.6}
        />
        <T x={bx.cx} y={top + 15} size={16} weight={700}>
          {name}
        </T>
        {rows.map((r, i) => (
          <g key={i}>
            <T
              x={bx.cx - bx.w / 2 + 10}
              y={top + 30 + 18 + i * 22}
              size={12}
              weight={700}
              anchor="start"
              soft
            >
              {r.tag}
            </T>
            <T
              x={bx.cx - bx.w / 2 + 38}
              y={top + 30 + 18 + i * 22}
              size={14}
              weight={400}
              anchor="start"
            >
              {r.text}
            </T>
          </g>
        ))}
      </g>,
    );
  };

  def.entities.forEach((e) =>
    drawBox(e.id, e.name, e.cf?.x ?? e.x, e.cf?.y ?? e.y, e.attrs, 'entity', e.weak),
  );

  const edgeOf = (bx: Box, t: Pt): Pt => rectEdge(bx.cx, bx.cy, bx.w, bx.h, t.x, t.y);

  def.rels.forEach((r) => {
    const x = r.cf?.x ?? r.x;
    const y = r.cf?.y ?? r.y;
    const unary = r.links.length === 2 && r.links[0]!.entity === r.links[1]!.entity;
    const simple = r.links.length === 2 && !r.attrs?.length && !unary;

    if (unary) {
      const bx = boxes.get(r.links[0]!.entity);
      if (!bx) return;
      const rx = bx.cx + bx.w / 2;
      const top = { x: rx, y: bx.cy - 14 };
      const bot = { x: rx, y: bx.cy + 14 };
      const out = 70;
      lines.push(
        <path
          key={`${r.id}-loop`}
          d={`M${top.x} ${top.y} C${top.x + out} ${top.y - 20} ${bot.x + out} ${bot.y + 20} ${bot.x} ${bot.y}`}
          fill="none"
          stroke={r.identifying ? BRAND : STROKE}
          strokeWidth={r.identifying ? 3 : 1.8}
        />,
      );
      const [l0, l1] = r.links as [ErLink, ErLink];
      shapes.push(
        <CrowEnd
          key={`${r.id}-e0`}
          p={top}
          u={{ x: 1, y: 0 }}
          max={l0.card === '1' ? '1' : 'N'}
          min={l1.total ? 1 : 0}
        />,
        <CrowEnd
          key={`${r.id}-e1`}
          p={bot}
          u={{ x: 1, y: 0 }}
          max={l1.card === '1' ? '1' : 'N'}
          min={l0.total ? 1 : 0}
        />,
        <T key={`${r.id}-t`} x={rx + out * 0.75 + 4} y={bx.cy} size={13} anchor="start" soft>
          {r.name}
        </T>,
      );
      b.grow(rx + out + 90, bx.cy, 0, 40);
      return;
    }

    if (simple) {
      const [l0, l1] = r.links as [ErLink, ErLink];
      const A = boxes.get(l0.entity);
      const B = boxes.get(l1.entity);
      if (!A || !B) return;
      const pA = edgeOf(A, { x: B.cx, y: B.cy });
      const pB = edgeOf(B, { x: A.cx, y: A.cy });
      const len = Math.hypot(pB.x - pA.x, pB.y - pA.y) || 1;
      const u = { x: (pB.x - pA.x) / len, y: (pB.y - pA.y) / len };
      lines.push(
        <Line
          key={`${r.id}-ln`}
          a={pA}
          b={pB}
          color={r.identifying ? BRAND : STROKE}
          width={r.identifying ? 3.2 : 1.8}
        />,
      );
      shapes.push(
        <CrowEnd
          key={`${r.id}-a`}
          p={pA}
          u={u}
          max={l0.card === '1' ? '1' : 'N'}
          min={l1.total ? 1 : 0}
        />,
        <CrowEnd
          key={`${r.id}-b`}
          p={pB}
          u={{ x: -u.x, y: -u.y }}
          max={l1.card === '1' ? '1' : 'N'}
          min={l0.total ? 1 : 0}
        />,
      );
      const mx = (pA.x + pB.x) / 2;
      const my = (pA.y + pB.y) / 2;
      const label = r.identifying ? `${r.name} (identifying)` : r.name;
      shapes.push(
        <g key={`${r.id}-lb`}>
          <rect
            x={mx - textW(label, 13) / 2 - 4}
            y={my - 10}
            width={textW(label, 13) + 8}
            height={20}
            rx={4}
            fill="var(--surface)"
            opacity={0.92}
          />
          <T x={mx} y={my} size={13} soft>
            {label}
          </T>
        </g>,
      );
      return;
    }

    // সংযোগ-টেবিল (associative) বাক্স: ternary বা অ্যাট্রিবিউটসহ সম্পর্ক
    drawBox(r.id, r.name, x, y, r.attrs ?? [], 'assoc');
    const rb = boxes.get(r.id)!;
    r.links.forEach((l, i) => {
      const E = boxes.get(l.entity);
      if (!E) return;
      const pE = edgeOf(E, { x: rb.cx, y: rb.cy });
      const pR = edgeOf(rb, { x: E.cx, y: E.cy });
      const len = Math.hypot(pR.x - pE.x, pR.y - pE.y) || 1;
      const u = { x: (pR.x - pE.x) / len, y: (pR.y - pE.y) / len };
      lines.push(<Line key={`${r.id}-${i}`} a={pE} b={pR} />);
      shapes.push(
        <CrowEnd key={`${r.id}-ee${i}`} p={pE} u={u} max="1" min={1} />,
        <CrowEnd
          key={`${r.id}-er${i}`}
          p={pR}
          u={{ x: -u.x, y: -u.y }}
          max="N"
          min={l.total ? 1 : 0}
        />,
      );
    });
  });

  /* Specialization/Generalization: সাব-ক্লাস থেকে সুপার-ক্লাসের দিকে লাইন; মাঝে d/o/U চিহ্ন */
  (def.isas ?? []).forEach((s) => {
    const P = boxes.get(s.parent);
    if (!P) return;
    s.children.forEach((cid, i) => {
      const C = boxes.get(cid);
      if (!C) return;
      const a = edgeOf(P, { x: C.cx, y: C.cy });
      const c2 = edgeOf(C, { x: P.cx, y: P.cy });
      lines.push(<Line key={`${s.id}-${i}`} a={a} b={c2} double={s.total} />);
      const mx = (a.x + c2.x) / 2;
      const my = (a.y + c2.y) / 2;
      shapes.push(
        <g key={`${s.id}-m${i}`}>
          <circle cx={mx} cy={my} r={11} className="dg-box" />
          <T x={mx} y={my} size={12} weight={700}>
            {s.kind === 'u' ? 'U' : s.kind === 'isa' ? '▲' : s.kind}
          </T>
        </g>,
      );
    });
  });

  return {
    node: (
      <>
        {lines}
        {shapes}
      </>
    ),
    box: b.box(26),
  };
}
