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
  SearchIcon,
  SunIcon,
} from '../Icons';
import { Avatar } from '../characters/Characters';

const SearchDialog = lazy(() => import('./SearchDialog'));

interface ShellCtx {
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
  hasSidebar: boolean;
  setHasSidebar: (v: boolean) => void;
}
const Ctx = createContext<ShellCtx>({
  drawerOpen: false,
  setDrawerOpen: () => {},
  hasSidebar: false,
  setHasSidebar: () => {},
});
export const useShell = () => useContext(Ctx);

export function Shell() {
  const { pathname } = useLocation();
  // ড্রয়ার শুধু যে পাতায় খোলা হয়েছিল সেখানেই খোলা থাকে — পাতা বদলালে নিজে থেকেই বন্ধ
  const [drawer, setDrawer] = useState({ open: false, path: pathname });
  const drawerOpen = drawer.open && drawer.path === pathname;
  const setDrawerOpen = (open: boolean) => setDrawer({ open, path: pathname });
  const [hasSidebar, setHasSidebar] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <Ctx.Provider value={{ drawerOpen, setDrawerOpen, hasSidebar, setHasSidebar }}>
      <a href="#main" className="skip-link">
        মূল লেখায় যাও
      </a>
      <TopBar onSearch={() => setSearchOpen(true)} />
      <Outlet />
      <Footer />
      {searchOpen && (
        <Suspense fallback={null}>
          <SearchDialog onClose={() => setSearchOpen(false)} />
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

function TopBar({ onSearch }: { onSearch: () => void }) {
  const { drawerOpen, setDrawerOpen, hasSidebar } = useShell();
  return (
    <header
      className="no-print sticky top-0 z-40 border-b border-line bg-[color-mix(in_srgb,var(--bg)_92%,transparent)] backdrop-blur"
      style={{ height: 'var(--topbar-h)' }}
    >
      <div className="mx-auto flex h-full max-w-[96rem] items-center gap-2 px-3 sm:px-5">
        {hasSidebar && (
          <button
            type="button"
            className="icon-btn lg:hidden"
            onClick={() => setDrawerOpen(!drawerOpen)}
            aria-label="অধ্যায়ের তালিকা"
            aria-expanded={drawerOpen}
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
          <Link
            to="/playground"
            className="hidden rounded-full px-3 py-1.5 font-medium text-ink-soft no-underline hover:bg-brand-tint hover:text-ink md:inline-block"
          >
            SQL খেলার মাঠ
          </Link>
          <Link
            to="/glossary"
            className="hidden rounded-full px-3 py-1.5 font-medium text-ink-soft no-underline hover:bg-brand-tint hover:text-ink md:inline-block"
          >
            শব্দকোষ
          </Link>
          <button
            type="button"
            className="icon-btn"
            onClick={onSearch}
            aria-label="খুঁজুন (Ctrl+K)"
          >
            <SearchIcon />
          </button>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  const { links, author } = siteConfig;
  return (
    <footer className="no-print mt-16 border-t border-line bg-surface-2">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-5 py-8 text-center">
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
        <p className="text-ink-soft">
          লেখক: <strong className="text-ink">{author.name}</strong> · <span>{author.org}</span>
        </p>
        <p className="text-sm text-ink-faint">
          গল্পের চরিত্র, ছবি ও লেখা মৌলিক। © {new Date().getFullYear()} {author.org}
        </p>
      </div>
    </footer>
  );
}
