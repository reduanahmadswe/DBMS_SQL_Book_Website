import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { bnDigits } from '@/content/meta';

export interface ChapterCtx {
  slug: string;
  number: number;
}
export const ChapterContext = createContext<ChapterCtx>({ slug: '', number: 0 });
export const useChapter = () => useContext(ChapterContext);

interface FigureProps {
  /** অধ্যায়ের ভেতরে চিত্রের ক্রমিক নম্বর */
  n: number;
  caption: string;
  /** স্ক্রিন-রিডারের জন্য বাংলা alt text */
  alt: string;
  children: ReactNode;
  /** লাইটবক্স বন্ধ করতে চাইলে false */
  zoomable?: boolean;
  /** আগে চওড়া ছবির জন্য ছিল; এখন লেখার সাথে একই কলাম, তাই কিছু করে না */
  wide?: boolean;
}

export function Figure({ n, caption, alt, children, zoomable = true }: FigureProps) {
  const { number } = useChapter();
  const label = `চিত্র ${bnDigits(number)}.${bnDigits(n)}`;
  const [open, setOpen] = useState(false);

  return (
    <figure className={`not-prose my-8`}>
      <div className="relative overflow-hidden rounded-2xl border border-line bg-surface card-3d">
        <p className="sr-only">{alt}</p>
        <div className="overflow-x-auto p-2 sm:p-4">{children}</div>
        {zoomable && (
          <button
            type="button"
            className="no-print absolute bottom-2 right-2 inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line bg-surface/95 px-3 text-sm font-medium text-ink hover:bg-brand-tint"
            onClick={() => setOpen(true)}
            aria-label={`${label} বড় করে দেখো`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3M11 8v6M8 11h6" />
            </svg>
            বড় করো
          </button>
        )}
      </div>
      <figcaption className="mt-2 text-center text-[0.95rem] leading-relaxed text-ink-soft">
        <strong className="font-semibold text-brand">{label}:</strong> {caption}
      </figcaption>
      {open && (
        <Lightbox label={`${label}: ${caption}`} onClose={() => setOpen(false)}>
          {children}
        </Lightbox>
      )}
    </figure>
  );
}

function Lightbox({
  children,
  label,
  onClose,
}: {
  children: ReactNode;
  label: string;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
    // unmount-এ DOM থেকে সরে গেলে modal নিজেই বন্ধ হয়; এখানে close() ডাকলে StrictMode-এ উল্টো onClose চলে
  }, []);

  const clamp = (z: number) => Math.min(4, Math.max(0.5, Math.round(z * 100) / 100));

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
      className="m-auto h-[92vh] w-[min(96vw,1200px)] rounded-2xl border border-line bg-surface p-0 text-ink backdrop:bg-black/60"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between gap-2 border-b border-line px-3 py-2">
          <p className="min-w-0 truncate text-sm text-ink-soft">{label}</p>
          <div className="flex shrink-0 items-center gap-1">
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setZoom((z) => clamp(z - 0.25))}
              aria-label="ছোট করো"
            >
              −
            </button>
            <span className="w-14 text-center text-sm tabular-nums" aria-live="polite">
              {bnDigits(Math.round(zoom * 100))}%
            </span>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => setZoom((z) => clamp(z + 0.25))}
              aria-label="বড় করো"
            >
              +
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setZoom(1)}>
              রিসেট
            </button>
            <button type="button" className="btn btn-primary btn-sm" onClick={onClose}>
              বন্ধ
            </button>
          </div>
        </div>
        <div className="min-h-0 flex-1 overflow-auto p-4" tabIndex={0}>
          <div style={{ width: `${zoom * 100}%`, minWidth: 'min-content' }}>{children}</div>
        </div>
      </div>
    </dialog>
  );
}
