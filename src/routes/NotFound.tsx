import { Link } from 'react-router';
import { Avatar } from '@/components/characters/Characters';
import { usePageMeta } from '@/lib/page-meta';

export default function NotFound() {
  usePageMeta('৪০৪ — পেজ পাওয়া যায়নি');
  return (
    <main id="main" className="mx-auto flex max-w-xl flex-col items-center px-5 py-20 text-center">
      <div className="flex items-end gap-2">
        <Avatar who="ledu" size={96} title={false} />
        <Avatar who="kodom" size={96} title={false} />
      </div>
      <h1 className="mt-6 font-display text-4xl">৪০৪ — খাতার এই পাতাটা নাই!</h1>
      <p className="mt-3 text-lg text-ink-soft">
        লেদু পুরো খাতা উল্টে-পাল্টে দেখেছে, এই ঠিকানায় কিছু পায়নি। কদম চাচা বললেন, "লেদু বাপজান,
        ঠিকানা ভুল হলে ডাটাবেসও কিছু খুঁজে পায় না — এটাই NULL!"
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link to="/" className="btn btn-primary">
          হোমে ফিরো
        </Link>
        <Link to="/chapters/introduction" className="btn btn-ghost">
          বইয়ের শুরুতে যাও
        </Link>
      </div>
    </main>
  );
}
