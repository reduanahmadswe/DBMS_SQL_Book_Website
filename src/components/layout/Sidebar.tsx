import { useEffect, useMemo, useState } from 'react';
import { NavLink } from 'react-router';
import { bnDigits, chapters, parts } from '@/content/meta';
import { useProgress } from '@/lib/storage';
import { CheckIcon, ChevronIcon } from '../Icons';
import { useShell } from './Shell';

export function Sidebar({ currentSlug }: { currentSlug: string }) {
  const { drawerOpen, setDrawerOpen } = useShell();
  const { read } = useProgress();
  const currentPart = chapters.find((c) => c.slug === currentSlug)?.part;
  // ব্যবহারকারী নিজে যেগুলো খুলেছে/বন্ধ করেছে; না করলে শুধু বর্তমান পর্ব খোলা
  const [manual, setManual] = useState<Record<string, boolean>>({});
  const grouped = useMemo(
    () => parts.map((p) => ({ p, items: chapters.filter((c) => c.part === p.id) })),
    [],
  );

  useEffect(() => {
    // শুধু সাইডবারের নিজস্ব স্ক্রল ঠিক করি; পুরো পাতা যেন না নড়ে
    const nav = document.getElementById('sidebar');
    const cur = nav?.querySelector<HTMLElement>('[aria-current="page"]');
    if (nav && cur)
      nav.scrollTop +=
        cur.getBoundingClientRect().top - nav.getBoundingClientRect().top - nav.clientHeight / 2;
  }, [currentSlug, drawerOpen]);

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setDrawerOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [drawerOpen, setDrawerOpen]);

  const isPartOpen = (id: string) => manual[id] ?? id === currentPart;
  const toggle = (id: string) => setManual((m) => ({ ...m, [id]: !isPartOpen(id) }));

  return (
    <>
      {drawerOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />
      )}
      <nav
        id="sidebar"
        aria-label="অধ্যায়ের তালিকা"
        className={`no-print fixed bottom-0 left-0 z-40 w-[min(86vw,var(--sidebar-w))] overflow-y-auto border-r border-line bg-bg px-3 pb-10 pt-3 transition-transform duration-200 lg:sticky lg:top-[var(--topbar-h)] lg:z-10 lg:block lg:h-[calc(100vh-var(--topbar-h))] lg:w-[var(--sidebar-w)] lg:shrink-0 lg:translate-x-0 ${drawerOpen ? 'translate-x-0' : 'invisible -translate-x-full lg:visible'}`}
        style={{ top: 'var(--topbar-h)' }}
      >
        <p className="mb-2 px-2 text-sm text-ink-faint">
          পড়া হয়েছে: {bnDigits(read.length)}/{bnDigits(chapters.length)}
        </p>
        {grouped.map(({ p, items }) => {
          const isOpen = isPartOpen(p.id);
          return (
            <div key={p.id} className="mb-1">
              <button
                type="button"
                onClick={() => toggle(p.id)}
                aria-expanded={isOpen}
                className="flex w-full items-start gap-1.5 rounded-lg px-2 py-2 text-left text-[0.95rem] font-semibold leading-snug text-ink hover:bg-brand-tint"
              >
                <ChevronIcon
                  className={`mt-1 shrink-0 transition-transform ${isOpen ? 'rotate-90' : ''}`}
                  width={16}
                  height={16}
                />
                <span>{p.title}</span>
              </button>
              {isOpen && (
                <ul className="mb-2 ml-3 border-l border-line pl-2">
                  {items.map((c) => {
                    const done = read.includes(c.slug);
                    return (
                      <li key={c.slug}>
                        <NavLink
                          to={`/chapters/${c.slug}`}
                          className={({ isActive }) =>
                            `flex items-start gap-2 rounded-lg px-2 py-1.5 text-[0.93rem] leading-snug no-underline ${isActive ? 'bg-brand font-semibold text-on-brand' : 'text-ink-soft hover:bg-brand-tint hover:text-ink'}`
                          }
                        >
                          <span className="mt-0.5 w-6 shrink-0 text-right tabular-nums opacity-70">
                            {bnDigits(c.number)}.
                          </span>
                          <span className="min-w-0 flex-1">{c.title}</span>
                          {done && (
                            <CheckIcon
                              className="mt-0.5 shrink-0 text-accent"
                              width={16}
                              height={16}
                              aria-label="পড়া হয়েছে"
                              role="img"
                            />
                          )}
                          {!c.ready && (
                            <span className="mt-0.5 shrink-0 rounded-full bg-surface-2 px-1.5 text-[0.7rem] text-ink-faint">
                              শীঘ্রই
                            </span>
                          )}
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
        <div className="mt-4 border-t border-line pt-3">
          {[
            ['/playground', 'SQL খেলার মাঠ'],
            ['/cheatsheet', 'SQL চিটশিট'],
            ['/glossary', 'শব্দকোষ'],
            ['/question-bank', 'প্রশ্ন ব্যাংক'],
          ].map(([to, label]) => (
            <NavLink
              key={to}
              to={to!}
              className="block rounded-lg px-2 py-1.5 text-[0.93rem] text-ink-soft no-underline hover:bg-brand-tint hover:text-ink"
            >
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}
