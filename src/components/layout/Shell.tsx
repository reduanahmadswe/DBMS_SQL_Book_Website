import { createContext, lazy, Suspense, useContext, useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import { siteConfig } from '../../../site.config';
import { currentTheme, setTheme, useTheme } from '@/lib/theme';
import {
  CloseIcon,
  FacebookIcon,
  GithubIcon,
  LinkedinIcon,
  MenuIcon,
  MoonIcon,
  SunIcon,
} from '../Icons';
import { Avatar } from '../characters/Characters';
import { safeGet, safeSet } from '@/lib/storage';

const SubscribeDialog = lazy(() => import('./SubscribeDialog'));

interface ShellCtx {
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
  hasSidebar: boolean;
  setHasSidebar: (v: boolean) => void;
  openSubscribe: () => void;
  toggleSidebar: () => void;
  /** বড় স্ক্রিনে সাইডবার লুকানো আছে কিনা */
  sidebarHidden: boolean;
}
const Ctx = createContext<ShellCtx>({
  drawerOpen: false,
  setDrawerOpen: () => {},
  hasSidebar: false,
  setHasSidebar: () => {},
  openSubscribe: () => {},
  toggleSidebar: () => {},
  sidebarHidden: false,
});
export const useShell = () => useContext(Ctx);

export function Shell() {
  const { pathname } = useLocation();
  // ড্রয়ার শুধু যে পাতায় খোলা হয়েছিল সেখানেই খোলা থাকে, পাতা বদলালে নিজে থেকেই বন্ধ
  const [drawer, setDrawer] = useState({ open: false, path: pathname });
  const drawerOpen = drawer.open && drawer.path === pathname;
  const setDrawerOpen = (open: boolean) => setDrawer({ open, path: pathname });
  const [hasSidebar, setHasSidebar] = useState(false);
  const [subOpen, setSubOpen] = useState(false);
  const [sidebarHidden, setSidebarHidden] = useState(() => safeGet('ledu:sidebar') === 'hidden');
  const toggleSidebar = () => {
    // বড় স্ক্রিনে লুকানো/দেখানো, ছোট স্ক্রিনে ড্রয়ার খোলা/বন্ধ
    if (window.matchMedia('(min-width: 1024px)').matches) {
      const next = !sidebarHidden;
      setSidebarHidden(next);
      safeSet('ledu:sidebar', next ? 'hidden' : 'shown');
    } else setDrawerOpen(!drawerOpen);
  };
  // প্রথমবার ঢুকলে ২০ সেকেন্ড পর একবার দেখাই; বন্ধ বা সাবস্ক্রাইব করলে আর না
  useEffect(() => {
    if (safeGet('ledu:subscribe')) return;
    const t = setTimeout(() => setSubOpen(true), 20000);
    return () => clearTimeout(t);
  }, []);

  return (
    <Ctx.Provider
      value={{
        drawerOpen,
        setDrawerOpen,
        hasSidebar,
        setHasSidebar,
        openSubscribe: () => setSubOpen(true),
        sidebarHidden,
        toggleSidebar,
      }}
    >
      <a href="#main" className="skip-link">
        মূল লেখায় যাও
      </a>
      <div className="flex min-h-screen flex-col">
        <TopBar />
        <div className="flex-1">
          <Outlet />
        </div>
        <Footer onSubscribe={() => setSubOpen(true)} />
      </div>
      {subOpen && (
        <Suspense fallback={null}>
          <SubscribeDialog onClose={() => setSubOpen(false)} />
        </Suspense>
      )}
    </Ctx.Provider>
  );
}

function ThemeToggle() {
  const theme = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <button
      type="button"
      className="icon-btn"
      onClick={() => setTheme(currentTheme() === 'dark' ? 'light' : 'dark')}
      aria-label={`${next === 'dark' ? 'ডার্ক' : 'লাইট'} থিমে যাও`}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

function isActiveLink(to: string, pathname: string): boolean {
  if (to === '/') return pathname === '/';
  if (to === '/chapters/introduction') return pathname.startsWith('/chapters');
  return pathname === to;
}

function TopBar() {
  const { drawerOpen, hasSidebar, sidebarHidden, toggleSidebar } = useShell();
  const { pathname } = useLocation();
  return (
    <header
      className={`topbar no-print sticky top-0 z-40 mx-auto w-full pt-2 max-w-6xl px-4 sm:px-6`}
      style={{ height: 'var(--topbar-h)' }}
    >
      <div className="nav-pill flex h-[3.25rem] w-full items-center gap-2 px-3 sm:px-5">
        {hasSidebar && (
          <button
            type="button"
            className="icon-btn"
            onClick={toggleSidebar}
            aria-label="অধ্যায়ের তালিকা"
            aria-expanded={drawerOpen || !sidebarHidden}
            aria-controls="sidebar"
          >
            {drawerOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        )}
        <Link
          to="/"
          className="flex min-w-0 items-center gap-2 font-display text-lg text-ink no-underline sm:text-xl"
        >
          <Avatar who="ledu" size={34} title={false} />
          <span className="truncate">{siteConfig.name}</span>
        </Link>
        <nav aria-label="প্রধান মেনু" className="ml-auto flex items-center gap-1">
          {[
            ['/', 'হোম'],
            ['/chapters/introduction', 'অধ্যায়সমূহ'],
            ['/playground', 'SQL খেলার মাঠ'],
            ['/glossary', 'শব্দকোষ'],
            ['/cheatsheet', 'চিটশিট'],
            ['/question-bank', 'প্রশ্ন ব্যাংক'],
          ].map(([to, label]) => (
            <Link
              key={to}
              to={to}
              aria-current={isActiveLink(to, pathname) ? 'page' : undefined}
              className={
                'hidden rounded-full px-3 py-1.5 text-[0.95rem] font-medium no-underline lg:inline-block ' +
                (isActiveLink(to, pathname)
                  ? 'btn-primary'
                  : 'text-ink-soft hover:bg-brand-tint hover:text-ink')
              }
            >
              {label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

function Footer({ onSubscribe }: { onSubscribe: () => void }) {
  const { links, author } = siteConfig;
  return (
    <footer className="footer-grad no-print mt-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 sm:px-6 text-center">
        <div className="flex items-center gap-3">
          {[
            { href: links.github, label: 'GitHub', Icon: GithubIcon },
            { href: links.linkedin, label: 'LinkedIn', Icon: LinkedinIcon },
            { href: links.facebook, label: 'Facebook', Icon: FacebookIcon },
          ].map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn border border-line bg-surface"
              aria-label={label}
            >
              <Icon />
            </a>
          ))}
        </div>
        <button type="button" className="btn btn-ghost btn-sm" onClick={onSubscribe}>
          নতুন অধ্যায়ের খবর ইমেইলে পেতে চাই
        </button>
        <p className="text-ink-soft">
          লেখক: <strong className="text-ink">{author.name}</strong> ·{' '}
          <a
            href={author.orgUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand hover:underline"
          >
            {author.org}
          </a>
        </p>
        <p className="text-sm text-ink-faint">
          গল্পের চরিত্র, ছবি ও লেখা মৌলিক। © {new Date().getFullYear()}{' '}
          <a
            href={author.orgUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand hover:underline"
          >
            {author.org}
          </a>
        </p>
      </div>
    </footer>
  );
}
