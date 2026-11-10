import { describe, expect, it } from 'vitest';
import { scoreQuiz, shuffled, validateQuestions, type QuizQuestion } from '@/lib/quiz';
import { questions as q0 } from '@/content/quizzes/ch00';
import { questions as q1 } from '@/content/quizzes/ch01';
import { questions as q2 } from '@/content/quizzes/ch02';
import * as a from '@/content/quizzes/phase2a';
import * as b from '@/content/quizzes/phase2b';
import * as c from '@/content/quizzes/phase2c';

const qs: QuizQuestion[] = [
  { q: 'a', options: ['x', 'y'], answer: 0, explain: 'e' },
  { q: 'b', options: ['x', 'y', 'z'], answer: 2, explain: 'e' },
];

describe('scoreQuiz', () => {
  it('counts only correct picks', () => {
    expect(scoreQuiz(qs, [0, 2])).toBe(2);
    expect(scoreQuiz(qs, [1, 2])).toBe(1);
    expect(scoreQuiz(qs, [null, null])).toBe(0);
  });
});

describe('validateQuestions', () => {
  it('flags bad answer index and missing explanation', () => {
    const bad: QuizQuestion[] = [{ q: 'a', options: ['x', 'y'], answer: 5, explain: ' ' }];
    expect(validateQuestions(bad).length).toBe(2);
  });
  it('all shipped quizzes are valid', () => {
    for (const set of [q0, q1, q2, ...Object.values(a), ...Object.values(b), ...Object.values(c)])
      expect(validateQuestions(set)).toEqual([]);
  });
});

describe('shuffled', () => {
  it('keeps the same elements and does not mutate input', () => {
    const src = [1, 2, 3, 4, 5];
    const out = shuffled(src, () => 0.3);
    expect([...out].sort()).toEqual(src);
    expect(src).toEqual([1, 2, 3, 4, 5]);
  });
});
