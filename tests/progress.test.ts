import { beforeEach, describe, expect, it } from 'vitest';
import { parseProgress, progress, safeGet } from '@/lib/storage';

beforeEach(() => {
  localStorage.clear();
  progress.reset();
});

describe('parseProgress', () => {
  it('returns empty state for null, garbage or wrong types', () => {
    expect(parseProgress(null).read).toEqual([]);
    expect(parseProgress('{not json').read).toEqual([]);
    expect(parseProgress(JSON.stringify({ read: [1, 'a'], last: 5, quiz: 3 })).read).toEqual(['a']);
  });
});

describe('progress store', () => {
  it('marks chapters read only once and persists', () => {
    progress.markRead('a');
    progress.markRead('a');
    expect(progress.get().read).toEqual(['a']);
    expect(JSON.parse(safeGet('ledu:progress:v1')!).read).toEqual(['a']);
  });
  it('keeps the best quiz score', () => {
    progress.saveQuiz('c1', 3, 5);
    progress.saveQuiz('c1', 2, 5);
    expect(progress.get().quiz['c1']!.score).toBe(3);
    progress.saveQuiz('c1', 5, 5);
    expect(progress.get().quiz['c1']!.score).toBe(5);
  });
  it('notifies subscribers', () => {
    let n = 0;
    const off = progress.subscribe(() => n++);
    progress.setLast('x');
    off();
    progress.setLast('y');
    expect(n).toBe(1);
  });
  it('does not throw if localStorage is blocked', () => {
    const orig = Storage.prototype.setItem;
    Storage.prototype.setItem = () => {
      throw new Error('blocked');
    };
    expect(() => progress.markRead('z')).not.toThrow();
    Storage.prototype.setItem = orig;
  });
});
