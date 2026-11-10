import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { glossary } from '@/content/glossary';
import { chapterBySlug, bnDigits } from '@/content/meta';
import { usePageMeta } from '@/lib/page-meta';

export default function GlossaryPage() {
  usePageMeta(
    'শব্দকোষ',
    'বইয়ের সব টেকনিক্যাল শব্দের বাংলা ↔ ইংরেজি তালিকা ও সংজ্ঞা।',
    '/glossary',
  );
  const [q, setQ] = useState('');
  const list = useMemo(() => {
    const n = q.trim().toLowerCase();
    return [...glossary]
      .sort((a, b) => a.en.localeCompare(b.en))
      .filter((g) => !n || `${g.en} ${g.bn} ${g.def}`.toLowerCase().includes(n));
  }, [q]);

  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl sm:text-4xl">শব্দকোষ</h1>
      <p className="mt-1 text-ink-soft">
        বাংলা ↔ English — প্রতিটি শব্দ কোন অধ্যায়ে প্রথম এসেছে, সেখানকার লিংকসহ। (অধ্যায় লেখার
        সাথে সাথে তালিকা বাড়ছে।)
      </p>
      <label className="mt-5 block">
        <span className="sr-only">শব্দ খুঁজুন</span>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="শব্দ খুঁজুন…"
          className="h-12 w-full rounded-xl border border-line bg-surface px-4 text-lg"
        />
      </label>
      <p className="mt-2 text-sm text-ink-soft" role="status">
        {bnDigits(list.length)}টি শব্দ
      </p>
      <dl className="mt-4 divide-y divide-line rounded-2xl border border-line bg-surface">
        {list.map((g) => {
          const ch = chapterBySlug.get(g.chapter);
          return (
            <div key={g.en} className="px-4 py-3">
              <dt className="font-semibold">
                <span className="text-brand">{g.en}</span>{' '}
                <span className="text-ink-soft">— {g.bn}</span>
              </dt>
              <dd className="mt-0.5 text-ink-soft">
                {g.def}{' '}
                {ch && (
                  <Link to={`/chapters/${ch.slug}`} className="whitespace-nowrap text-accent-text">
                    অধ্যায় {bnDigits(ch.number)} →
                  </Link>
                )}
              </dd>
            </div>
          );
        })}
      </dl>
    </main>
  );
}
