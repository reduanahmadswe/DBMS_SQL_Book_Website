import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import MiniSearch from 'minisearch';
import { SearchIcon } from '../Icons';

interface Doc {
  id: number;
  kind: 'chapter' | 'heading' | 'term';
  slug: string;
  title: string;
  text: string;
  heading: string;
}

const kindLabel: Record<Doc['kind'], string> = { chapter: 'অধ্যায়', heading: 'অংশ', term: 'শব্দ' };

export default function SearchDialog({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nav = useNavigate();
  const [q, setQ] = useState('');
  const [docs, setDocs] = useState<Doc[] | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
    inputRef.current?.focus();
    let live = true;
    import('@/generated/search-index.json').then((m) => live && setDocs(m.default as Doc[]));
    return () => {
      live = false;
      d?.close();
    };
  }, []);

  const engine = useMemo(() => {
    if (!docs) return null;
    const ms = new MiniSearch<Doc>({
      fields: ['title', 'text'],
      storeFields: ['kind', 'slug', 'title', 'text', 'heading'],
      searchOptions: { prefix: true, fuzzy: 0.15, boost: { title: 3 } },
      // বাংলা শব্দ ঠিকমতো ভাঙতে স্পেস, বিরামচিহ্ন ও ড্যাশে ভাঙি
      tokenize: (s) => s.split(/[\s\-–—.,;:!?()[\]{}"'/।|]+/u).filter(Boolean),
      processTerm: (t) => t.toLowerCase(),
    });
    ms.addAll(docs);
    return ms;
  }, [docs]);

  const results = useMemo(
    () => (engine && q.trim() ? engine.search(q.trim()).slice(0, 12) : []),
    [engine, q],
  );

  const go = (r: (typeof results)[number]) => {
    onClose();
    nav(`/chapters/${r.slug}${r.heading ? `#${r.heading}` : ''}`);
  };

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-label="সার্চ"
      className="mx-auto mt-[10vh] w-[min(94vw,40rem)] rounded-2xl border border-line bg-surface p-0 text-ink shadow-2xl backdrop:bg-black/55"
    >
      <div className="flex items-center gap-2 border-b border-line px-4">
        <SearchIcon className="shrink-0 text-ink-faint" />
        <input
          ref={inputRef}
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setActive(0);
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setActive((a) => Math.min(a + 1, results.length - 1));
            } else if (e.key === 'ArrowUp') {
              e.preventDefault();
              setActive((a) => Math.max(a - 1, 0));
            } else if (e.key === 'Enter' && results[active]) go(results[active]);
          }}
          placeholder="অধ্যায়, শিরোনাম বা শব্দ খুঁজুন…"
          aria-label="খুঁজুন"
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls="search-results"
          className="h-14 w-full bg-transparent text-lg outline-none"
        />
        <kbd className="hidden rounded border border-line px-1.5 text-xs text-ink-faint sm:block">
          Esc
        </kbd>
      </div>
      <ul id="search-results" role="listbox" className="max-h-[55vh] overflow-auto p-2">
        {!docs && <li className="p-4 text-ink-soft">লোড হচ্ছে…</li>}
        {docs && q.trim() && results.length === 0 && (
          <li className="p-4 text-ink-soft">কিছু পাওয়া যায়নি। অন্য শব্দে চেষ্টা করো।</li>
        )}
        {results.map((r, i) => (
          <li key={r.id} role="option" aria-selected={i === active}>
            <button
              type="button"
              onClick={() => go(r)}
              onMouseEnter={() => setActive(i)}
              className={`flex w-full items-start gap-3 rounded-lg px-3 py-2 text-left ${i === active ? 'bg-brand-tint' : ''}`}
            >
              <span className="mt-1 shrink-0 rounded-full bg-accent-tint px-2 text-xs font-semibold text-accent-text">
                {kindLabel[r.kind as Doc['kind']]}
              </span>
              <span className="min-w-0">
                <span className="block font-semibold leading-snug">{r.title}</span>
                {r.text && <span className="block truncate text-sm text-ink-soft">{r.text}</span>}
              </span>
            </button>
          </li>
        ))}
        {docs && !q.trim() && (
          <li className="p-4 text-ink-soft">
            কিছু লিখলেই খোঁজা শুরু হবে। (Ctrl+K দিয়ে যেকোনো পেজ থেকে খুলতে পারো)
          </li>
        )}
      </ul>
    </dialog>
  );
}
