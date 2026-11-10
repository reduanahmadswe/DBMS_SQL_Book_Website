import { useState } from 'react';
import { scoreQuiz, type QuizQuestion } from '@/lib/quiz';
import { progress, useProgress } from '@/lib/storage';
import { bnDigits } from '@/content/meta';
import { useChapter } from './Figure';

const letters = ['ক', 'খ', 'গ', 'ঘ', 'ঙ'];

export function Quiz({ questions, id }: { questions: QuizQuestion[]; id?: string }) {
  const { slug } = useChapter();
  const key = id ?? slug;
  const [picks, setPicks] = useState<(number | null)[]>(() => questions.map(() => null));
  const saved = useProgress().quiz[key];
  const answered = picks.filter((p) => p !== null).length;
  const done = answered === questions.length;
  const score = scoreQuiz(questions, picks);

  function pick(qi: number, oi: number) {
    if (picks[qi] !== null) return;
    const next = picks.map((p, i) => (i === qi ? oi : p));
    setPicks(next);
    if (next.every((p) => p !== null))
      progress.saveQuiz(key, scoreQuiz(questions, next), questions.length);
  }

  return (
    <section
      className="not-prose my-8 rounded-2xl border border-line bg-surface p-4 shadow-[var(--shadow)] sm:p-6"
      aria-label="কুইজ"
    >
      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm text-ink-soft">
          উত্তর দিয়েছ: {bnDigits(answered)}/{bnDigits(questions.length)}
        </p>
        {saved && (
          <p className="text-sm text-ink-soft">
            সেরা স্কোর:{' '}
            <strong className="text-accent-text">
              {bnDigits(saved.score)}/{bnDigits(saved.total)}
            </strong>
          </p>
        )}
      </div>
      <ol className="space-y-6">
        {questions.map((q, qi) => {
          const chosen = picks[qi];
          const revealed = chosen !== null;
          return (
            <li key={qi}>
              <p className="mb-2 font-semibold leading-relaxed">
                {bnDigits(qi + 1)}. {q.q}
              </p>
              <div
                role="group"
                aria-label={`প্রশ্ন ${bnDigits(qi + 1)}-এর অপশন`}
                className="grid gap-2"
              >
                {q.options.map((o, oi) => {
                  const isRight = oi === q.answer;
                  const isChosen = chosen === oi;
                  const state = !revealed
                    ? 'border-line hover:border-brand hover:bg-brand-tint'
                    : isRight
                      ? 'border-[var(--good-line)] bg-[var(--good-bg)]'
                      : isChosen
                        ? 'border-[var(--bad-line)] bg-[var(--bad-bg)]'
                        : 'border-line text-ink-soft';
                  return (
                    <button
                      key={oi}
                      type="button"
                      onClick={() => pick(qi, oi)}
                      aria-pressed={isChosen}
                      disabled={revealed}
                      className={`flex min-h-11 items-start gap-3 rounded-xl border-2 px-3 py-2 text-left leading-snug transition-colors disabled:cursor-default ${state}`}
                    >
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-surface-2 text-sm font-semibold">
                        {letters[oi]}
                      </span>
                      <span className="min-w-0 flex-1">{o}</span>
                      {revealed && isRight && <span className="sr-only">(সঠিক উত্তর)</span>}
                      {revealed && isChosen && !isRight && (
                        <span className="sr-only">(তোমার ভুল উত্তর)</span>
                      )}
                    </button>
                  );
                })}
              </div>
              <div aria-live="polite">
                {revealed && (
                  <p
                    className={`mt-2 rounded-lg px-3 py-2 text-[0.97rem] leading-relaxed ${chosen === q.answer ? 'bg-[var(--good-bg)] text-[var(--good-text)]' : 'bg-[var(--bad-bg)] text-[var(--bad-text)]'}`}
                  >
                    <strong>
                      {chosen === q.answer ? 'ঠিক! ' : `ভুল — সঠিক উত্তর (${letters[q.answer]})। `}
                    </strong>
                    {q.explain}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>
      {done && (
        <div
          className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-brand-tint p-4"
          aria-live="polite"
        >
          <p className="text-lg font-semibold">
            তোমার স্কোর: {bnDigits(score)}/{bnDigits(questions.length)}
            {score === questions.length ? ' — দারুণ!' : ''}
          </p>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => setPicks(questions.map(() => null))}
          >
            আবার চেষ্টা করো
          </button>
        </div>
      )}
    </section>
  );
}
