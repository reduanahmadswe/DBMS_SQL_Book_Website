import { useMemo, useRef } from 'react';
import { tokenize, type TokenKind } from '@/lib/sql-highlight';

const color: Record<TokenKind, string> = {
  kw: 'text-brand font-semibold',
  str: 'text-[#0b7a43] dark:text-[#7ee0a8]',
  num: 'text-[#b4570a] dark:text-[#f3b36b]',
  cmt: 'text-ink-faint italic',
  fn: 'text-accent-text',
  plain: '',
};

interface Props {
  value: string;
  onChange: (v: string) => void;
  onRun: () => void;
  label: string;
  minRows?: number;
}

/** textarea-র উপর রঙিন ওভারলে, হালকা, কোনো বাইরের এডিটর লাগে না। */
export function SqlEditor({ value, onChange, onRun, label, minRows = 3 }: Props) {
  const pre = useRef<HTMLPreElement>(null);
  const tokens = useMemo(() => tokenize(value), [value]);
  const lines = Math.max(minRows, value.split('\n').length);
  const height = `${lines * 1.7 + 1.5}rem`;
  // নো-র‍্যাপ: ওভারলে আর textarea-র লাইন-ভাঙা কখনো আলাদা হবে না (স্ক্রলবার থাকলেও)
  const shared = 'font-mono text-[0.92rem] leading-[1.7] p-3 whitespace-pre';

  return (
    <div
      className="relative rounded-lg border border-line bg-surface focus-within:outline focus-within:outline-[3px] focus-within:outline-accent"
      style={{ minHeight: height }}
    >
      <pre
        ref={pre}
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 m-0 overflow-hidden ${shared}`}
      >
        {tokens.map((t, i) => (
          <span key={i} className={color[t.kind]}>
            {t.text}
          </span>
        ))}
        {'\n'}
      </pre>
      <textarea
        aria-label={label}
        value={value}
        spellCheck={false}
        autoCapitalize="off"
        autoCorrect="off"
        onChange={(e) => onChange(e.target.value)}
        onScroll={(e) => {
          if (pre.current) {
            pre.current.scrollTop = e.currentTarget.scrollTop;
            pre.current.scrollLeft = e.currentTarget.scrollLeft;
          }
        }}
        onKeyDown={(e) => {
          if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            onRun();
          }
        }}
        style={{ minHeight: height }}
        className={`relative block w-full resize-y overflow-auto border-0 bg-transparent text-transparent caret-[var(--ink)] outline-none ${shared}`}
      />
    </div>
  );
}
