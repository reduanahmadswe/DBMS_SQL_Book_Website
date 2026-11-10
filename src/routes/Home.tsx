import { Link } from 'react-router';
import { siteConfig } from '../../site.config';
import { bnDigits, chapters, parts } from '@/content/meta';
import { usePageMeta } from '@/lib/page-meta';
import { useProgress } from '@/lib/storage';
import { useShell } from '@/components/layout/Shell';
import { Avatar, characterInfo, type CharacterId } from '@/components/characters/Characters';
import { HeroScene } from '@/components/characters/HeroScene';
import {
  BookIcon3D,
  BooksStack3D,
  ClipboardIcon3D,
  LaptopIcon3D,
  TargetIcon3D,
} from '@/components/Icons3D';
import images from '@/generated/images.json';
import stats from '@/generated/stats.json';
import { PartIcon } from '@/components/PartIcon';

const cast: CharacterId[] = ['ledu', 'kodom', 'fotka', 'minu'];
const castBlurb: Record<CharacterId, string> = {
  ledu: 'গল্পের নায়ক, প্রশ্নগুলো তারই',
  kodom: 'শান্ত, মজার, সবজান্তা মেন্টর',
  fotka: 'সব কাজ উল্টো করে, ভুল দেখে শেখো',
  minu: 'পরীক্ষার প্রশ্ন আর ট্র্যাপ ধরিয়ে দেয়',
};

const features = [
  {
    Icon: BookIcon3D,
    title: 'গল্পভিত্তিক পাঠ',
    text: 'লেদুর চায়ের দোকানের গল্পের মাধ্যমে DBMS ও SQL-এর ধারণা শিখুন।',
  },
  {
    Icon: LaptopIcon3D,
    title: 'ইন্টারঅ্যাক্টিভ SQL অনুশীলন',
    text: 'ব্রাউজারেই SQL লিখে অনুশীলন করুন এবং সাথে সাথে ফলাফল দেখুন।',
  },
  {
    Icon: ClipboardIcon3D,
    title: 'সহজ উদাহরণ ও কুইজ',
    text: 'বাস্তব উদাহরণে ধারণা পোক্ত করুন এবং কুইজ দিয়ে নিজের শেখা যাচাই করুন।',
  },
];

const path = [
  { label: 'ডাটাবেসের পরিচয়', slug: 'introduction' },
  { label: 'ER ও রিলেশনাল মডেল', slug: 'er-diagram' },
  { label: 'SQL-এর মূলকথা', slug: 'sql-porichoy' },
  { label: 'নরমালাইজেশন ও ইনডেক্স', slug: 'anomaly' },
  { label: 'ট্রানজ্যাকশন ও বড় সিস্টেম', slug: 'transaction-acid' },
];

export default function Home() {
  usePageMeta(null, siteConfig.description, '/');
  const { last, read, quiz } = useProgress();
  const { openSubscribe } = useShell();
  const lastMeta = chapters.find((c) => c.slug === last);
  const firstSlug = chapters[0]!.slug;
  const readyCount = chapters.filter((c) => c.ready).length;
  const readPct = Math.round((read.length / chapters.length) * 100);
  const bookPct = Math.round((readyCount / chapters.length) * 100);
  const unread = chapters.filter((c) => c.ready && !read.includes(c.slug));
  const suggested = (unread.length >= 3 ? unread : chapters.filter((c) => c.ready)).slice(0, 3);
  const who: CharacterId[] = ['ledu', 'minu', 'kodom', 'fotka'];
  const activity = [
    ...read
      .slice(-3)
      .reverse()
      .map((slug, i) => {
        const c = chapters.find((x) => x.slug === slug);
        return (
          c && {
            key: 'r' + slug,
            slug,
            who: who[i % 4]!,
            text: bnDigits(c.number) + '. ' + c.title,
            sub: 'পড়া শেষ করেছ',
          }
        );
      }),
    ...Object.entries(quiz)
      .slice(-2)
      .map(([slug, q], i) => {
        const c = chapters.find((x) => x.slug === slug);
        return (
          c && {
            key: 'q' + slug,
            slug,
            who: who[(i + 2) % 4]!,
            text: 'কুইজ: ' + c.title,
            sub: 'সেরা স্কোর ' + bnDigits(q.score) + '/' + bnDigits(q.total),
          }
        );
      }),
  ].filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <main id="main">
      {/* ───── হিরো ───── */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden">
        <div className="dots absolute inset-0 -z-10 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pb-10 pt-10 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:pt-14">
          <div>
            <p className="tag-pill">
              <span aria-hidden="true">✦</span> বাংলায়, গল্পে গল্পে
            </p>
            <h1 id="hero-title" className="mt-5 font-display leading-[1.2]">
              <span className="block text-[2.6rem] text-ink sm:text-6xl">গল্পে গল্পে শিখি</span>
              <span className="hero-title mt-1 flex flex-wrap items-center gap-3 text-[2.8rem] font-bold italic sm:text-7xl">
                <span className="swash">DBMS ও SQL</span>
                <span className="not-italic">
                  <BooksStack3D size={84} />
                </span>
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
              {siteConfig.tagline}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to={`/chapters/${firstSlug}`} className="btn btn-primary px-7 text-lg">
                পড়া শুরু করুন <span aria-hidden="true">→</span>
              </Link>
              <Link to="/playground" className="btn btn-ghost px-7 text-lg">
                <span aria-hidden="true" className="font-mono">
                  {'</>'}
                </span>{' '}
                SQL খেলুন
              </Link>
              <a
                href={siteConfig.links.follow}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost px-6 text-lg"
              >
                ফলো করুন
              </a>
            </div>
            <button type="button" className="btn btn-ghost btn-sm mt-4" onClick={openSubscribe}>
              নতুন অধ্যায়ের খবর ইমেইলে পেতে চাই
            </button>
            {lastMeta && lastMeta.slug !== firstSlug && (
              <p className="mt-5 text-ink-soft">
                শেষবার পড়ছিলে:{' '}
                <Link to={`/chapters/${lastMeta.slug}`} className="font-semibold text-brand">
                  {bnDigits(lastMeta.number)}. {lastMeta.title}
                </Link>
              </p>
            )}
          </div>
          <div className="float-slow">
            {images.hero ? (
              <img
                src="/ledu-hero.webp"
                alt="লেদুর টং-এ চায়ের কেটলি হাতে লেদু"
                width={1600}
                height={720}
                className="h-auto w-full rounded-3xl"
                fetchPriority="high"
              />
            ) : (
              <HeroScene />
            )}
          </div>
        </div>

        {/* ফিচার কার্ড */}
        <ul className="mx-auto grid max-w-6xl gap-5 px-4 pb-6 sm:px-6 md:grid-cols-3">
          {features.map(({ Icon, title, text }) => (
            <li key={title} className="card-3d flex items-center gap-4 p-5">
              <Icon size={64} />
              <div>
                <h2 className="font-display text-lg leading-snug text-brand">{title}</h2>
                <p className="mt-1 text-[0.95rem] leading-snug text-ink-soft">{text}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* শেখার পথ */}
        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
          <div className="card-3d flex flex-col gap-5 p-5 lg:flex-row lg:items-center">
            <div className="flex items-center gap-4 lg:w-72 lg:shrink-0 lg:border-r lg:border-line lg:pr-5">
              <TargetIcon3D size={60} />
              <div>
                <h2 className="font-display text-xl text-brand">আপনার শেখার পথ</h2>
                <p className="text-sm text-ink-soft">
                  পড়া হয়েছে {bnDigits(read.length)}/{bnDigits(readyCount)}টি চালু অধ্যায়
                </p>
              </div>
            </div>
            <ol className="relative grid flex-1 grid-cols-2 gap-4 sm:grid-cols-5">
              <div className="path-line" aria-hidden="true" />
              {path.map((s, i) => (
                <li key={s.slug} className="relative text-center">
                  <Link to={`/chapters/${s.slug}`} className="group block no-underline">
                    <span className={`step-dot ${i === 0 ? 'on' : ''}`}>{bnDigits(i + 1)}</span>
                    <span className="mt-2 block text-[0.9rem] leading-snug text-ink-soft group-hover:text-brand">
                      {s.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
          <ul className="mt-6 flex flex-wrap justify-center gap-2.5" aria-label="বইয়ের এক নজর">
            <li className="chip">
              <b>{bnDigits(chapters.length)}</b> অধ্যায়
            </li>
            <li className="chip">
              <b>{bnDigits(readyCount)}</b> অধ্যায় এখনই পড়া যায়
            </li>
            <li className="chip">
              ব্রাউজারেই <b>SQL</b> চালাও
            </li>
            <li className="chip">
              <b>১০০%</b> বাংলা, বিজ্ঞাপনহীন
            </li>
          </ul>
        </div>
      </section>

      {/* ───── পরিসংখ্যান (সব সংখ্যা কনটেন্ট/ব্রাউজার থেকে গোনা) ───── */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6" aria-label="বইয়ের পরিসংখ্যান">
        <ul className="card-3d grid grid-cols-2 gap-4 p-5 sm:grid-cols-3 lg:grid-cols-6">
          {[
            ['p5', 'মোট অধ্যায়', chapters.length],
            ['p9', 'চালু অধ্যায়', readyCount],
            ['p4', 'চালানোযোগ্য SQL', stats.sqlRunners],
            ['p2', 'কুইজ প্রশ্ন', stats.quizQuestions],
            ['p3', 'শব্দকোষের শব্দ', stats.glossaryTerms],
            ['p1', 'তোমার পড়া অধ্যায়', read.length],
          ].map(([icon, label, value], i) => (
            <li key={label as string} className="flex items-center gap-3">
              <span className={`num-badge !h-11 !w-11 shrink-0 ${i % 2 ? 'teal' : ''}`}>
                <PartIcon id={icon as string} size={22} />
              </span>
              <span>
                <span className="block text-sm text-ink-soft">{label}</span>
                <span className="block font-display text-2xl leading-tight text-ink">
                  {bnDigits(value as number)}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ───── বইয়ে কী আছে + পাশের প্যানেল ───── */}
      <div className="mx-auto mt-12 grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_20rem]">
        <section aria-labelledby="contents-title">
          <h2 id="contents-title" className="flex items-center gap-3 font-display text-3xl">
            <span className="text-brand">
              <BookIcon3D size={40} />
            </span>
            এই বইয়ে কী আছে?
          </h2>
          <p className="mt-2 text-ink-soft">
            {bnDigits(chapters.length)}টি অধ্যায়। প্রতিটা শুরু হয় লেদুর একটা সমস্যা দিয়ে, তারপর
            আসে ধারণা আর SQL।
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {parts
              .filter((p) => p.id !== 'p0' && p.id !== 'p12')
              .map((p) => {
                const items = chapters.filter((c) => c.part === p.id);
                const ready = items.filter((c) => c.ready).length;
                const title = p.title.replace(/^পর্ব [^\s]+, /, '');
                const num = p.title.match(/^পর্ব ([^\s]+)/)?.[1] ?? '';
                return (
                  <li key={p.id}>
                    <Link
                      to={`/chapters/${items[0]!.slug}`}
                      className="card-3d card-lift flex h-full flex-col p-4 no-underline"
                    >
                      <span className="flex items-start gap-3">
                        <span className="text-brand">
                          <PartIcon id={p.id} size={38} />
                        </span>
                        <span className="min-w-0">
                          <span className="inline-block rounded-md bg-brand px-2 py-0.5 text-xs font-semibold text-on-brand">
                            পর্ব {num}
                          </span>
                          <span className="mt-1 block font-display text-lg leading-snug text-ink">
                            {title}
                          </span>
                        </span>
                      </span>
                      <span className="mt-2 flex-1 text-[0.9rem] leading-snug text-ink-soft">
                        {p.blurb}
                      </span>
                      <span className="mt-3 flex items-center justify-between border-t border-line pt-2 text-sm text-ink-soft">
                        <span>
                          {bnDigits(items.length)}টি অধ্যায়
                          {ready > 0 && (
                            <b className="ml-2 font-semibold text-accent-text">
                              · {bnDigits(ready)}টি চালু
                            </b>
                          )}
                        </span>
                        <span
                          className="grid h-7 w-7 place-items-center rounded-full bg-brand-tint text-brand"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
          </ul>
        </section>

        <aside className="space-y-5" aria-label="তোমার পাশের প্যানেল">
          <div className="card-3d p-4">
            <p className="flex items-center gap-2 font-display text-lg">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--good-line)]" aria-hidden="true" />
              তোমার অগ্রগতি
            </p>
            <div
              className="mt-3 h-3 overflow-hidden rounded-full bg-brand-tint"
              role="progressbar"
              aria-valuenow={readPct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="পড়ার অগ্রগতি"
            >
              <div
                className="h-full rounded-full bg-[var(--hero-grad)]"
                style={{ width: `${Math.max(readPct, 3)}%` }}
              />
            </div>
            <p className="mt-2 text-sm text-ink-soft">
              {bnDigits(read.length)}/{bnDigits(chapters.length)} অধ্যায় পড়া হয়েছে
            </p>
            <div className="mt-3 flex -space-x-2" aria-hidden="true">
              {cast.map((c) => (
                <span key={c} className="rounded-full border-2 border-surface bg-surface">
                  <Avatar who={c} size={38} title={false} />
                </span>
              ))}
            </div>
          </div>

          <div className="card-3d p-4">
            <p className="font-display text-lg">শুরু করার সেরা অধ্যায়</p>
            <ol className="mt-3 space-y-2">
              {suggested.map((c, i) => (
                <li key={c.slug}>
                  <Link
                    to={`/chapters/${c.slug}`}
                    className="flex items-center gap-3 rounded-xl p-1.5 no-underline hover:bg-brand-tint"
                  >
                    <span className="num-badge !h-8 !w-8 shrink-0 !text-sm">{bnDigits(i + 1)}</span>
                    <span className="min-w-0 flex-1 text-[0.95rem] font-semibold leading-snug text-ink">
                      {c.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>

          <div className="card-3d p-4">
            <p className="font-display text-lg">তোমার সাম্প্রতিক কার্যক্রম</p>
            {activity.length === 0 ? (
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                এখনো কিছু পড়োনি। প্রথম অধ্যায় শেষ করলেই এখানে তোমার পড়া ও কুইজের স্কোর দেখা যাবে।
                (সব তথ্য শুধু তোমার ব্রাউজারেই থাকে।)
              </p>
            ) : (
              <ul className="mt-3 space-y-3">
                {activity.map((a) => (
                  <li key={a.key} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0">
                      <Avatar who={a.who} size={34} title={false} />
                    </span>
                    <span className="text-sm leading-snug">
                      <Link
                        to={`/chapters/${a.slug}`}
                        className="font-semibold text-ink no-underline hover:text-brand"
                      >
                        {a.text}
                      </Link>
                      <span className="block text-ink-faint">{a.sub}</span>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>

      {/* ───── চার্ট, ডোনাট, CTA ───── */}
      <div className="mx-auto mt-10 grid max-w-6xl gap-5 px-4 sm:px-6 lg:grid-cols-[1.3fr_1fr_1fr]">
        <section className="card-3d p-5" aria-labelledby="chart-title">
          <h2 id="chart-title" className="font-display text-lg text-brand">
            পর্ব অনুযায়ী অধ্যায়
          </h2>
          <PartBars />
        </section>

        <section className="card-3d p-5" aria-labelledby="donut-title">
          <h2 id="donut-title" className="font-display text-lg text-brand">
            বইয়ের অগ্রগতি
          </h2>
          <div className="mt-3 flex items-center gap-4">
            <Donut pct={bookPct} />
            <ul className="space-y-2 text-[0.95rem]">
              <li className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-brand" aria-hidden="true" />
                {bnDigits(readyCount)}টি চালু
              </li>
              <li className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full bg-brand-tint ring-1 ring-line"
                  aria-hidden="true"
                />
                {bnDigits(chapters.length - readyCount)}টি লেখা চলছে
              </li>
              <li className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-accent" aria-hidden="true" />
                {bnDigits(read.length)}টি তুমি পড়েছ
              </li>
            </ul>
          </div>
        </section>

        <section className="cta-card p-5" aria-labelledby="cta-title">
          <h2 id="cta-title" className="font-display text-xl text-[#5a3a00]">
            শেখা শুরু করুন আজই!
          </h2>
          <p className="mt-2 max-w-[16rem] text-[0.95rem] leading-snug text-[#6b4a10]">
            ডাটাবেস আর SQL শেখার মজার যাত্রায় লেদুর সাথে এখনই যুক্ত হও।
          </p>
          <div className="mt-4 flex items-end justify-between gap-2">
            <Link to={`/chapters/${lastMeta?.slug ?? firstSlug}`} className="btn btn-primary">
              {lastMeta ? 'যেখানে ছিলে সেখান থেকে' : 'প্রথম অধ্যায় পড়ুন'}{' '}
              <span aria-hidden="true">→</span>
            </Link>
            <BooksStack3D size={84} />
          </div>
        </section>
      </div>

      {/* ───── কার জন্য ───── */}
      <section className="section-alt mt-14" aria-labelledby="for-title">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 sm:px-6 md:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 id="for-title" className="flex items-center gap-3 font-display text-3xl">
              <TargetIcon3D size={44} />
              কার জন্য এই বই?
            </h2>
            <ul className="mt-5 space-y-3 text-lg leading-relaxed">
              {[
                ['বিশ্ববিদ্যালয়ের CSE/ICT শিক্ষার্থী', 'DBMS কোর্সের ফাইনাল ও ভাইভার জন্য।'],
                [
                  'ব্যাংক ও সরকারি আইটি পরীক্ষার প্রার্থী',
                  'SQL, normalization, transaction-এর টার্গেটেড অনুশীলন।',
                ],
                ['নতুন ডেভেলপার', 'কোড লেখা জানো, কিন্তু ডাটাবেস এখনো ধোঁয়াশা।'],
                ['শূন্য থেকে শুরু করতে চাওয়া যে কেউ', 'কোনো আগের জ্ঞান লাগবে না।'],
              ].map(([t, d]) => (
                <li key={t} className="flex gap-3">
                  <span
                    className="mt-1.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent text-on-accent"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span>
                    <strong className="text-ink">{t}</strong>
                    <span className="text-ink-soft">, {d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto flex items-end justify-center gap-2" aria-hidden="true">
            <span className="absolute -top-2 right-2 grid h-16 w-16 place-items-center rounded-full border-2 border-brand bg-surface text-brand shadow-[var(--shadow)]">
              <PartIcon id="p1" size={32} />
            </span>
            <span className="avatar-3d">
              <Avatar who="ledu" size={170} title={false} />
            </span>
            <BooksStack3D size={110} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6" aria-labelledby="cast-title">
        <h2 id="cast-title" className="font-display text-3xl">
          গল্পের চরিত্ররা
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-5 lg:grid-cols-4">
          {cast.map((c) => (
            <li key={c} className="card-3d card-lift flex flex-col items-center p-5 text-center">
              <span className="avatar-3d">
                <Avatar who={c} size={92} title={false} />
              </span>
              <p className="mt-3 font-display text-xl">{characterInfo[c].name}</p>
              <p className="text-sm text-ink-faint">{characterInfo[c].role}</p>
              <p className="mt-2 text-[0.93rem] leading-snug text-ink-soft">{castBlurb[c]}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

/* ───────── ছোট চার্ট-কম্পোনেন্ট (SVG, থিম-টোকেন নির্ভর) ───────── */
function PartBars() {
  const ps = parts.filter((p) => p.id !== 'p0' && p.id !== 'p12');
  const data = ps.map((p) => {
    const items = chapters.filter((c) => c.part === p.id);
    return {
      n: p.title.match(/^পর্ব ([^\s]+)/)?.[1] ?? '',
      total: items.length,
      ready: items.filter((c) => c.ready).length,
    };
  });
  const max = Math.max(...data.map((d) => d.total));
  const W = 440;
  const H = 190;
  const bw = 26;
  const gap = (W - 30 - bw * data.length) / (data.length - 1);
  const y = (v: number) => H - 28 - (v / max) * (H - 50);
  return (
    <>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-3 h-auto w-full"
        role="img"
        aria-label={`পর্ব অনুযায়ী অধ্যায়: ${data.map((d) => `পর্ব ${d.n}, ${d.total}টি, চালু ${d.ready}টি`).join('; ')}`}
      >
        <defs>
          <linearGradient id="barg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--accent)" />
            <stop offset="1" stopColor="var(--brand)" />
          </linearGradient>
        </defs>
        {[0, 0.5, 1].map((t) => (
          <line
            key={t}
            x1="24"
            x2={W}
            y1={y(max * t)}
            y2={y(max * t)}
            stroke="var(--line)"
            strokeDasharray="3 4"
          />
        ))}
        {[0, 0.5, 1].map((t) => (
          <text
            key={t}
            x="18"
            y={y(max * t) + 4}
            textAnchor="end"
            fontSize="11"
            className="dg-soft"
          >
            {bnDigits(Math.round(max * t))}
          </text>
        ))}
        {data.map((d, i) => {
          const x = 30 + i * (bw + gap);
          return (
            <g key={d.n}>
              <rect
                x={x}
                y={y(d.total)}
                width={bw}
                height={y(0) - y(d.total)}
                rx="6"
                fill="var(--brand-tint)"
                stroke="var(--line)"
              />
              {d.ready > 0 && (
                <rect
                  x={x}
                  y={y(d.ready)}
                  width={bw}
                  height={y(0) - y(d.ready)}
                  rx="6"
                  fill="url(#barg)"
                />
              )}
              <text x={x + bw / 2} y={H - 10} textAnchor="middle" fontSize="12" className="dg-soft">
                {d.n}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="text-sm text-ink-faint">
        গাঢ় অংশ = ইতিমধ্যে চালু অধ্যায়; হালকা = মোট অধ্যায়।
      </p>
    </>
  );
}

function Donut({ pct }: { pct: number }) {
  const r = 44;
  const c = 2 * Math.PI * r;
  return (
    <svg
      width="116"
      height="116"
      viewBox="0 0 116 116"
      role="img"
      aria-label={`বইয়ের ${bnDigits(pct)} শতাংশ চালু`}
    >
      <defs>
        <linearGradient id="donutg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--brand)" />
          <stop offset="1" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
      <circle cx="58" cy="58" r={r} fill="none" stroke="var(--brand-tint)" strokeWidth="13" />
      <circle
        cx="58"
        cy="58"
        r={r}
        fill="none"
        stroke="url(#donutg)"
        strokeWidth="13"
        strokeLinecap="round"
        strokeDasharray={`${(pct / 100) * c} ${c}`}
        transform="rotate(-90 58 58)"
      />
      <text x="58" y="66" textAnchor="middle" fontSize="24" fontWeight="700" className="dg-text">
        {bnDigits(pct)}%
      </text>
    </svg>
  );
}
