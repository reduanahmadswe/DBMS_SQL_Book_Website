import { Link } from 'react-router';
import { siteConfig } from '../../site.config';
import { bnDigits, chapters, parts } from '@/content/meta';
import { usePageMeta } from '@/lib/page-meta';
import { useProgress } from '@/lib/storage';
import { Avatar } from '@/components/characters/Characters';
import { TeaStallScene } from '@/components/characters/Scenes';
import images from '@/generated/images.json';

export default function Home() {
  usePageMeta(null, siteConfig.description, '/');
  const { last } = useProgress();
  const lastMeta = chapters.find((c) => c.slug === last);
  const firstSlug = chapters[0]!.slug;

  return (
    <main id="main">
      <section aria-labelledby="hero-title" className="border-b border-line bg-accent-tint">
        <div className="mx-auto max-w-5xl px-4 pt-6 sm:px-6">
          <div className="overflow-hidden rounded-3xl border border-line shadow-[var(--shadow)]">
            {images.hero ? (
              <img
                src="/ledu-hero.webp"
                alt="লেদুর টং-এ চায়ের কেটলি হাতে লেদু"
                width={1600}
                height={720}
                className="h-auto w-full"
                fetchPriority="high"
              />
            ) : (
              <div role="img" aria-label="লেদুর টং-এর কাউন্টারে কেটলি হাতে হাসিমুখে লেদু">
                <TeaStallScene />
              </div>
            )}
          </div>
        </div>
        <div className="mx-auto max-w-3xl px-4 pb-14 pt-8 text-center sm:px-6">
          <h1
            id="hero-title"
            className="font-display text-[2.4rem] leading-tight text-ink sm:text-5xl"
          >
            {siteConfig.name}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl">
            {siteConfig.tagline}
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link to={`/chapters/${firstSlug}`} className="btn btn-primary text-lg">
              পড়া শুরু করুন
            </Link>
            <a
              href={siteConfig.links.follow}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost text-lg"
            >
              ফলো করুন
            </a>
          </div>
          {lastMeta && lastMeta.slug !== firstSlug && (
            <p className="mt-5 text-ink-soft">
              শেষবার পড়ছিলে:{' '}
              <Link to={`/chapters/${lastMeta.slug}`} className="font-semibold text-brand">
                {bnDigits(lastMeta.number)}. {lastMeta.title}
              </Link>
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6" aria-labelledby="contents-title">
        <h2 id="contents-title" className="font-display text-3xl">
          এই বইয়ে কী আছে
        </h2>
        <p className="mt-2 max-w-2xl text-ink-soft">
          {bnDigits(chapters.length)}টি অধ্যায়, {bnDigits(parts.length - 2)}টি পর্ব — গল্পের মোড়কে
          প্রতিটি জটিল বিষয়কে ধাপে ধাপে ভাঙা হয়েছে।
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {parts
            .filter((p) => p.id !== 'p0' && p.id !== 'p12')
            .map((p) => {
              const items = chapters.filter((c) => c.part === p.id);
              return (
                <li
                  key={p.id}
                  className="flex flex-col rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow)]"
                >
                  <h3 className="font-display text-xl leading-snug text-brand">{p.title}</h3>
                  <p className="mt-2 flex-1 text-[0.97rem] leading-relaxed text-ink-soft">
                    {p.blurb}
                  </p>
                  <Link
                    to={`/chapters/${items[0]!.slug}`}
                    className="mt-3 font-semibold text-accent-text"
                  >
                    অধ্যায় {bnDigits(items[0]!.number)}
                    {items.length > 1 ? `–${bnDigits(items[items.length - 1]!.number)}` : ''} →
                  </Link>
                </li>
              );
            })}
        </ul>
      </section>

      <section className="border-y border-line bg-surface-2" aria-labelledby="for-title">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 py-14 sm:px-6 md:grid-cols-[1fr_auto]">
          <div>
            <h2 id="for-title" className="font-display text-3xl">
              কার জন্য এই বই
            </h2>
            <ul className="mt-4 space-y-3 text-lg leading-relaxed">
              <li>
                <strong>বিশ্ববিদ্যালয়ের CSE/ICT শিক্ষার্থী</strong> — DBMS কোর্সের ফাইনাল ও ভাইভার
                জন্য।
              </li>
              <li>
                <strong>ব্যাংক ও সরকারি আইটি পরীক্ষার প্রার্থী</strong> — SQL, normalization,
                transaction-এর টার্গেটেড অনুশীলন।
              </li>
              <li>
                <strong>নতুন ডেভেলপার</strong> — কোড লেখা জানো, কিন্তু ডাটাবেস এখনো ধোঁয়াশা।
              </li>
              <li>
                <strong>শূন্য থেকে শুরু করতে চাওয়া যে কেউ</strong> — কোনো আগের জ্ঞান লাগবে না।
              </li>
            </ul>
          </div>
          <div className="flex items-end justify-center gap-1" aria-hidden="true">
            <Avatar who="ledu" size={84} title={false} />
            <Avatar who="kodom" size={84} title={false} />
            <Avatar who="fotka" size={84} title={false} />
            <Avatar who="minu" size={84} title={false} />
          </div>
        </div>
      </section>

      <section
        className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6"
        aria-labelledby="author-title"
      >
        <h2 id="author-title" className="font-display text-2xl">
          লেখক
        </h2>
        <p className="mt-2 text-lg text-ink-soft">
          <strong className="text-ink">{siteConfig.author.name}</strong> · {siteConfig.author.org}
        </p>
        <p className="mt-2 text-ink-soft">
          পুরো বইটা ফ্রি, বিজ্ঞাপনহীন, আর SQL চালানোর জন্য ইন্টারনেটও লাগে না — ব্রাউজারেই সব চলে।
        </p>
      </section>
    </main>
  );
}
