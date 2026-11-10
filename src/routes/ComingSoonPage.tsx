import { Link } from 'react-router';
import { usePageMeta } from '@/lib/page-meta';

/** চিটশিট ও প্রশ্ন ব্যাংকের জায়গাধারক (Phase 6-এ পূর্ণাঙ্গ হবে) */
export default function ComingSoonPage({ title, path }: { title: string; path: string }) {
  usePageMeta(title, undefined, path);
  return (
    <main id="main" className="mx-auto max-w-xl px-5 py-20 text-center">
      <h1 className="font-display text-3xl">{title}</h1>
      <p className="mt-3 text-lg text-ink-soft">
        এই পাতা তৈরি হচ্ছে। অধ্যায়গুলো শেষ হলে এখানে সব একসাথে পাবে।
      </p>
      <Link to="/chapters/introduction" className="btn btn-primary mt-6">
        বইয়ের শুরুতে যাও
      </Link>
    </main>
  );
}
