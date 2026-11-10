import { describe, expect, it } from 'vitest';
import { diamondEdge, ellipseEdge, pickAngles, rectEdge } from '@/components/diagrams/erd-geometry';

describe('edge geometry', () => {
  it('rectEdge hits the right border', () => {
    const p = rectEdge(0, 0, 100, 40, 200, 0);
    expect(p.x).toBeCloseTo(50);
    expect(p.y).toBeCloseTo(0);
  });
  it('diamondEdge hits the vertex on an axis', () => {
    const p = diamondEdge(0, 0, 100, 60, 0, 90);
    expect(p.y).toBeCloseTo(30);
  });
  it('ellipseEdge hits rx on the x axis', () => {
    expect(ellipseEdge(0, 0, 40, 20, 10, 0).x).toBeCloseTo(40);
  });
});

describe('pickAngles', () => {
  it('returns n distinct angles away from blocked directions', () => {
    const a = pickAngles(3, [0]);
    expect(new Set(a).size).toBe(3);
    expect(a.every((x) => Math.min(x, 360 - x) >= 90)).toBe(true);
  });
});
