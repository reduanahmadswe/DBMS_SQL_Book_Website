import { Suspense, lazy, useEffect, useMemo, useRef, useState, type ComponentType } from 'react';
import { Link, useLocation, useParams } from 'react-router';
import { bnDigits, chapterBySlug, neighbours, parts } from '@/content/meta';
import { progress } from '@/lib/storage';
import { usePageMeta } from '@/lib/page-meta';
import { Sidebar } from '@/components/layout/Sidebar';
import { useShell } from '@/components/layout/Shell';
import { ChapterContext } from '@/components/mdx/Figure';
import { mdxComponents } from '@/components/mdx/mdx-components';
import { ShareIcon } from '@/components/Icons';
import { TeaStallScene } from '@/components/characters/Scenes';
import NotFound from './NotFound';

type MdxModule = { default: ComponentType<{ components?: Record<string, ComponentType<never>> }> };
const loaders = import.meta.glob<MdxModule>('../content/chapters/*.mdx');
const loaderBySlug = new Map(
  Object.entries(loaders).map(([path, load]) => [
    path.replace(/^.*\/(?:\d+-)?([^/]+)\.mdx$/, '$1'),
    load,
  ]),
);
const lazyCache = new Map<
  string,
  ComponentType<{ components?: Record<string, ComponentType<never>> }>
>();
function getLazy(slug: string) {
  const load = loaderBySlug.get(slug);
  if (!load) return null;
  if (!lazyCache.has(slug)) lazyCache.set(slug, lazy(load));
  return lazyCache.get(slug)!;
}

interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

export default function ChapterPage() {
  const { slug = '' } = useParams();
  const meta = chapterBySlug.get(slug);
  const { setHasSidebar } = useShell();
  const location = useLocation();

  useEffect(() => {
    setHasSidebar(true);
    return () => setHasSidebar(false);
  }, [setHasSidebar]);

  usePageMeta(
    meta ? `${meta.number}. ${meta.title}` : 'পাওয়া যায়নি',
    meta?.subtitle,
    `/chapters/${slug}`,
  );

  useEffect(() => {
    if (!meta) return;
    progress.setLast(meta.slug);
    if (!location.hash) window.scrollTo({ top: 0 });
  }, [meta, location.hash]);

  if (!meta) return <NotFound />;
  const Content = meta.ready ? getLazy(slug) : null;
  const part = parts.find((p) => p.id === meta.part);
  const { prev, next } = neighbours(slug);

  return (
    <div className="mx-auto flex max-w-[96rem]">
      <Sidebar currentSlug={slug} />
      <main id="main" className="min-w-0 flex-1 px-4 pb-8 pt-8 sm:px-8 lg:px-10">
        <ReadingProgress />
        <ChapterBody
          key={slug}
          chapter={{ slug, number: meta.number }}
          header={
            <header className="mb-8 max-w-[42rem]">
              <p className="text-sm font-medium text-accent-text">{part?.title}</p>
              <h1 className="mt-1 font-display text-[2rem] leading-tight text-ink sm:text-[2.5rem]">
                <span className="mr-2 text-brand">{bnDigits(meta.number)}.</span>
                {meta.title}
              </h1>
              <p className="mt-2 text-lg text-ink-soft">{meta.subtitle}</p>
            </header>
          }
          Content={Content}
          footer={
            <nav
              aria-label="আগের-পরের অধ্যায়"
              className="no-print mt-12 grid max-w-[42rem] gap-3 sm:grid-cols-2"
            >
              {prev ? (
                <Link
                  to={`/chapters/${prev.slug}`}
                  className="rounded-xl border border-line bg-surface p-4 no-underline shadow-[var(--shadow)] hover:border-brand"
                >
                  <span className="text-sm text-ink-faint">← আগের অধ্যায়</span>
                  <span className="mt-1 block font-semibold text-ink">{prev.title}</span>
                </Link>
              ) : (
                <span />
              )}
              {next && (
                <Link
                  to={`/chapters/${next.slug}`}
                  className="rounded-xl border border-line bg-surface p-4 text-right no-underline shadow-[var(--shadow)] hover:border-brand sm:col-start-2"
                >
                  <span className="text-sm text-ink-faint">পরের অধ্যায় →</span>
                  <span className="mt-1 block font-semibold text-ink">{next.title}</span>
                </Link>
              )}
            </nav>
          }
        />
      </main>
    </div>
  );
}

function ChapterBody({
  chapter,
  header,
  Content,
  footer,
}: {
  chapter: { slug: string; number: number };
  header: React.ReactNode;
  Content: ReturnType<typeof getLazy>;
  footer: React.ReactNode;
}) {
  const articleRef = useRef<HTMLElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState('');
  const [toast, setToast] = useState('');
  const location = useLocation();

  // হেডিং থেকে TOC বানাই এবং স্থির id বসাই (সার্চ ইনডেক্সের h-N-এর সাথে মেলে)
  useEffect(() => {
    const art = articleRef.current;
    if (!art) return;
    let last = '';
    const scan = () => {
      const hs = [...art.querySelectorAll<HTMLElement>('h2, h3')];
      const list: Heading[] = hs.map((h, i) => {
        h.id = `h-${i + 1}`;
        return { id: h.id, text: h.textContent ?? '', level: h.tagName === 'H2' ? 2 : 3 };
      });
      const sig = list.map((h) => h.id + h.text).join('|');
      if (sig !== last) {
        last = sig;
        setHeadings(list);
        if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
      }
    };
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(art, { childList: true, subtree: true });
    return () => mo.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Content]);

  useEffect(() => {
    if (!headings.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (vis) setActive(vis.target.id);
      },
      { rootMargin: '-72px 0px -65% 0px' },
    );
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [headings]);

  // শেষ পর্যন্ত পড়লে "পড়া হয়েছে"
  useEffect(() => {
    const el = endRef.current;
    if (!el || !Content) return;
    const io = new IntersectionObserver(
      (es) => es.some((e) => e.isIntersecting) && progress.markRead(chapter.slug),
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [Content, chapter.slug]);

  const share = async () => {
    const url = window.location.href.split('#')[0]!;
    const title = document.title;
    try {
      if (typeof navigator.share === 'function') {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setToast('লিংক কপি হয়েছে');
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') return; // ব্যবহারকারী নিজেই বাতিল করেছে
      setToast('শেয়ার করা যায়নি — ঠিকানা বার থেকে কপি করো');
    }
    setTimeout(() => setToast(''), 2500);
  };

  const { slug: chSlug, number: chNumber } = chapter;
  const ctx = useMemo(() => ({ slug: chSlug, number: chNumber }), [chSlug, chNumber]);

  return (
    <ChapterContext.Provider value={ctx}>
      <div className="flex gap-10">
        <div className="min-w-0 flex-1">
          {header}
          <article ref={articleRef} className="prose-ledu">
            {Content ? (
              <Suspense
                fallback={
                  <p className="text-ink-soft" role="status">
                    অধ্যায় লোড হচ্ছে…
                  </p>
                }
              >
                <Content components={mdxComponents} />
              </Suspense>
            ) : (
              <ComingSoon />
            )}
          </article>
          <div ref={endRef} className="mt-10 h-px max-w-[42rem]" />
          <div className="no-print mt-4 flex max-w-[42rem] items-center gap-3">
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => void share()}>
              <ShareIcon width={18} height={18} /> শেয়ার করো
            </button>
            <span role="status" className="text-sm text-accent-text">
              {toast}
            </span>
          </div>
          {footer}
        </div>
        {headings.length > 0 && (
          <aside
            className="no-print sticky top-[calc(var(--topbar-h)+1.5rem)] hidden h-fit max-h-[calc(100vh-6rem)] w-60 shrink-0 overflow-y-auto xl:block"
            aria-label="এই অধ্যায়ে"
          >
            <p className="mb-2 font-display text-lg">এই অধ্যায়ে</p>
            <ul className="border-l border-line text-[0.92rem] leading-snug">
              {headings.map((h) => (
                <li key={h.id}>
                  <a
                    href={`#${h.id}`}
                    aria-current={active === h.id ? 'true' : undefined}
                    className={`block border-l-2 py-1 no-underline ${h.level === 3 ? 'pl-6' : 'pl-3'} ${active === h.id ? '-ml-px border-brand font-semibold text-brand' : '-ml-px border-transparent text-ink-soft hover:text-ink'}`}
                  >
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </ChapterContext.Provider>
  );
}

function ComingSoon() {
  return (
    <div className="max-w-[42rem]">
      <div className="overflow-hidden rounded-2xl border border-line" aria-hidden="true">
        <TeaStallScene />
      </div>
      <p className="mt-6 text-lg">
        এই অধ্যায়টা এখনো লেখা চলছে — লেদু আর কদম চাচা চা খেতে খেতে খসড়া করছেন! ততক্ষণ{' '}
        <Link to="/playground">SQL খেলার মাঠে</Link> হাত পাকিয়ে নাও, কিংবা আগের অধ্যায়গুলো আরেকবার
        পড়ে ফেলো।
      </p>
    </div>
  );
}

function ReadingProgress() {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const p = max > 0 ? Math.min(1, h.scrollTop / max) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      className="no-print fixed left-0 right-0 z-50 h-1 bg-transparent"
      style={{ top: 'var(--topbar-h)' }}
      role="progressbar"
      aria-label="পড়ার অগ্রগতি"
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div ref={bar} className="h-full origin-left bg-accent" style={{ transform: 'scaleX(0)' }} />
    </div>
  );
}
