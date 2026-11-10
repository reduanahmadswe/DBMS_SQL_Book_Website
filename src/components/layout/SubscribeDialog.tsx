import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '../../../site.config';
import { safeGet, safeSet } from '@/lib/storage';
import { CloseIcon } from '../Icons';

export const SUBSCRIBE_KEY = 'ledu:subscribe';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Google Form-এর formResponse-এ ইমেইল পাঠায় (no-cors, তাই উত্তর পড়া যায় না)। */
async function sendEmail(email: string): Promise<void> {
  const { formId, emailEntry } = siteConfig.subscribe;
  const body = new URLSearchParams({ [emailEntry]: email });
  await fetch(`https://docs.google.com/forms/d/e/${formId}/formResponse`, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
}

export default function SubscribeDialog({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [email, setEmail] = useState('');
  const [trap, setTrap] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
    // unmount-এ DOM থেকে সরে গেলে modal নিজেই বন্ধ হয়; এখানে close() ডাকলে StrictMode-এ উল্টো onClose চলে
  }, []);

  const dismiss = () => {
    if (safeGet(SUBSCRIBE_KEY) !== 'done') safeSet(SUBSCRIBE_KEY, 'dismissed');
    onClose();
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = email.trim();
    if (!EMAIL_RE.test(v)) {
      setMsg('ইমেইলটা ঠিকমতো লেখা হয়নি। যেমন: name@example.com');
      return;
    }
    if (trap) {
      // bot-এর ফাঁদ: সফল দেখাই, কিন্তু কিছু পাঠাই না
      setState('done');
      return;
    }
    setState('sending');
    setMsg('');
    try {
      await sendEmail(v);
      safeSet(SUBSCRIBE_KEY, 'done');
      setState('done');
    } catch {
      setState('error');
      setMsg('পাঠানো যায়নি। ইন্টারনেট ঠিক আছে কিনা দেখে আবার চেষ্টা করো।');
    }
  }

  return (
    <dialog
      ref={ref}
      aria-labelledby="sub-title"
      onClose={onClose}
      onCancel={dismiss}
      onClick={(e) => e.target === ref.current && dismiss()}
      className="card-3d m-auto w-[min(92vw,28rem)] p-0 text-ink backdrop:bg-black/55"
    >
      <div className="relative p-6">
        <button
          type="button"
          className="icon-btn absolute right-2 top-2"
          onClick={dismiss}
          aria-label="বন্ধ করো"
        >
          <CloseIcon width={20} height={20} />
        </button>
        <h2 id="sub-title" className="pr-8 font-display text-2xl">
          আপডেট পেতে সাবস্ক্রাইব করুন
        </h2>
        {state === 'done' ? (
          <div role="status" className="mt-3">
            <p className="text-lg text-ink">ধন্যবাদ, ইমেইলটা পেয়েছি।</p>
            <p className="mt-1 text-ink-soft">নতুন অধ্যায় এলে এই ঠিকানায় জানানো হবে।</p>
            <button type="button" className="btn btn-primary mt-4" onClick={onClose}>
              ঠিক আছে
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="mt-2">
            <p className="text-ink-soft">নতুন অধ্যায় এলে আপনার ইমেইলে জানিয়ে দেব।</p>
            <label htmlFor="sub-email" className="sr-only">
              ইমেইল
            </label>
            <input
              id="sub-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              aria-invalid={Boolean(msg)}
              aria-describedby="sub-msg"
              className="mt-4 h-12 w-full rounded-xl border-2 border-line bg-surface px-4 text-lg"
            />
            {/* bot-ফাঁদ: মানুষ দেখে না */}
            <input
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={trap}
              onChange={(e) => setTrap(e.target.value)}
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
              name="website"
            />
            <p id="sub-msg" role="alert" className="mt-2 min-h-5 text-sm text-[var(--bad-text)]">
              {msg}
            </p>
            <div className="mt-2 flex items-center gap-3">
              <button type="submit" className="btn btn-primary" disabled={state === 'sending'}>
                {state === 'sending' ? 'পাঠানো হচ্ছে…' : 'সাবস্ক্রাইব'}
              </button>
              <button type="button" className="btn btn-ghost" onClick={dismiss}>
                পরে
              </button>
            </div>
            <p className="mt-3 text-xs text-ink-faint">
              শুধু নতুন অধ্যায়ের খবর পাঠানো হবে। যেকোনো সময় বন্ধ করতে বললে বন্ধ করে দেওয়া হবে।
            </p>
          </form>
        )}
      </div>
    </dialog>
  );
}
