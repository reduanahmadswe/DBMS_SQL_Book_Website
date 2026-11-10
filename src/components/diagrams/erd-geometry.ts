export interface Pt {
  x: number;
  y: number;
}

export const textW = (s: string, size = 15): number => s.length * size * 0.56 + 6;

/** (cx,cy) থেকে (tx,ty)-র দিকে আয়তক্ষেত্রের সীমানার বিন্দু */
export function rectEdge(cx: number, cy: number, w: number, h: number, tx: number, ty: number): Pt {
  const dx = tx - cx;
  const dy = ty - cy;
  if (dx === 0 && dy === 0) return { x: cx, y: cy };
  const t = 1 / Math.max(Math.abs(dx) / (w / 2), Math.abs(dy) / (h / 2));
  return { x: cx + dx * t, y: cy + dy * t };
}

export function diamondEdge(
  cx: number,
  cy: number,
  w: number,
  h: number,
  tx: number,
  ty: number,
): Pt {
  const dx = tx - cx;
  const dy = ty - cy;
  if (dx === 0 && dy === 0) return { x: cx, y: cy };
  const t = 1 / (Math.abs(dx) / (w / 2) + Math.abs(dy) / (h / 2));
  return { x: cx + dx * t, y: cy + dy * t };
}

export function ellipseEdge(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  tx: number,
  ty: number,
): Pt {
  const dx = tx - cx;
  const dy = ty - cy;
  if (dx === 0 && dy === 0) return { x: cx, y: cy };
  const t = 1 / Math.sqrt((dx / rx) ** 2 + (dy / ry) ** 2);
  return { x: cx + dx * t, y: cy + dy * t };
}

const rad = (deg: number) => (deg * Math.PI) / 180;
const angDist = (a: number, b: number) => {
  const d = Math.abs(((a - b + 540) % 360) - 180);
  return d;
};

/** n সংখ্যক অ্যাট্রিবিউটের জন্য এমন কোণ বাছে যা "বাধা" কোণগুলো (সম্পর্কের লাইন) থেকে যথাসম্ভব দূরে */
export function pickAngles(n: number, blocked: number[]): number[] {
  const candidates = Array.from({ length: 24 }, (_, i) => i * 15);
  const chosen: number[] = [];
  for (let i = 0; i < n; i++) {
    let best = 0;
    let bestScore = -1;
    for (const c of candidates) {
      if (chosen.includes(c)) continue;
      const others = [...blocked, ...chosen];
      const score = others.length ? Math.min(...others.map((o) => angDist(c, o))) : 180;
      // একটু পছন্দ: ওপর/নিচ/পাশ, অনুভূমিক অবস্থা ঠিক রাখতে
      if (score > bestScore) {
        bestScore = score;
        best = c;
      }
    }
    chosen.push(best);
  }
  return chosen;
}

export const polar = (c: Pt, r: number, deg: number): Pt => ({
  x: c.x + r * Math.cos(rad(deg)),
  y: c.y + r * Math.sin(rad(deg)),
});

export const angleTo = (from: Pt, to: Pt): number => {
  const a = (Math.atan2(to.y - from.y, to.x - from.x) * 180) / Math.PI;
  return (a + 360) % 360;
};
