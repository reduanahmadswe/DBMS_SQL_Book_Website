import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router';
import { Shell } from '@/components/layout/Shell';
import Home from '@/routes/Home';
import NotFound from '@/routes/NotFound';

// রুট-ভিত্তিক কোড স্প্লিটিং
const ChapterPage = lazy(() => import('@/routes/ChapterPage'));
const PlaygroundPage = lazy(() => import('@/routes/PlaygroundPage'));
const GlossaryPage = lazy(() => import('@/routes/GlossaryPage'));
const ComingSoonPage = lazy(() => import('@/routes/ComingSoonPage'));

const Loading = () => (
  <p className="mx-auto max-w-xl px-5 py-20 text-center text-ink-soft" role="status">
    লোড হচ্ছে…
  </p>
);

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<Shell />}>
          <Route index element={<Home />} />
          <Route path="chapters/:slug" element={<ChapterPage />} />
          <Route path="playground" element={<PlaygroundPage />} />
          <Route path="glossary" element={<GlossaryPage />} />
          <Route
            path="cheatsheet"
            element={<ComingSoonPage title="SQL চিটশিট" path="/cheatsheet" />}
          />
          <Route
            path="question-bank"
            element={<ComingSoonPage title="প্রশ্ন ব্যাংক" path="/question-bank" />}
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
