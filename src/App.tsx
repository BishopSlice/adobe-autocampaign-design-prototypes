import { useEffect, useRef, useState } from 'react';
import { PageToggle, type Page } from './components/PageToggle';
import { AnnouncementPage } from './components/AnnouncementPage';
import { PrototypePage } from './components/PrototypePage';

const FADE_MS = 220;

export default function App() {
  const [page, setPage] = useState<Page>('announcement');
  const [displayPage, setDisplayPage] = useState<Page>('announcement');
  const [fading, setFading] = useState(false);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  function changePage(next: Page) {
    if (next === page) return;
    setPage(next);
    window.scrollTo({ top: 0, behavior: reducedMotionRef.current ? 'auto' : 'smooth' });

    if (reducedMotionRef.current) {
      setDisplayPage(next);
      return;
    }
    setFading(true);
    setTimeout(() => {
      setDisplayPage(next);
      setFading(false);
    }, FADE_MS);
  }

  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-30 flex h-14 items-center justify-center border-b border-border bg-surface px-5">
        <PageToggle page={page} onChange={changePage} />
      </header>

      <main
        className="transition-opacity ease-out"
        style={{ opacity: fading ? 0 : 1, transitionDuration: `${FADE_MS}ms` }}
      >
        {displayPage === 'announcement' ? (
          <AnnouncementPage onSeePrototype={() => changePage('prototype')} />
        ) : (
          <PrototypePage />
        )}
      </main>
    </div>
  );
}
