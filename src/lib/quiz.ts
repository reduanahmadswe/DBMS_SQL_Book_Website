export interface QuizQuestion {
  q: string;
  options: string[];
  /** সঠিক অপশনের index (০ থেকে শুরু) */
  answer: number;
  explain: string;
}

export function scoreQuiz(questions: QuizQuestion[], picks: (number | null)[]): number {
  return questions.reduce((s, q, i) => s + (picks[i] === q.answer ? 1 : 0), 0);
}

export function validateQuestions(questions: QuizQuestion[]): string[] {
  const errs: string[] = [];
  questions.forEach((q, i) => {
    if (q.options.length < 2) errs.push(`প্রশ্ন ${i + 1}: অন্তত ২টি অপশন লাগবে`);
    if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length)
      errs.push(`প্রশ্ন ${i + 1}: answer index সীমার বাইরে`);
    if (!q.explain.trim()) errs.push(`প্রশ্ন ${i + 1}: ব্যাখ্যা নেই`);
  });
  return errs;
}

/** Fisher–Yates (সিড-যোগ্য rng দেওয়া যায়), practice mode-এর জন্য */
export function shuffled<T>(arr: readonly T[], rng: () => number = Math.random): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j]!, a[i]!];
  }
  return a;
}
