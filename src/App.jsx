import { useState, useRef, useEffect, useLayoutEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Lenis from 'lenis';

import Hero from './components/Hero';
import Loader from './components/Loader';

const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'));

// 🌟 Synchronous Layout-Effect Scroll Manager (No delays, zero visual flash)
function ScrollManager({ lenisRef }) {
  const location = useLocation();

  useLayoutEffect(() => {
    if (location.pathname.startsWith('/project/')) {
      window.scrollTo(0, 0);
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      }
    } else if (location.pathname === '/') {
      const savedScroll = sessionStorage.getItem('portfolioGalleryScroll');
      if (savedScroll) {
        const targetPos = parseInt(savedScroll, 10);

        // useLayoutEffect runs before paint, so restore synchronously here —
        // this paints the home page already at the project's position with no
        // flicker or snap.
        if (lenisRef.current) {
          // Lenis caches its scroll limit via a ResizeObserver that fires with
          // a 250ms debounce. Returning from the (shorter) project page leaves
          // that cache stale, so scrollTo() would clamp to the old page's
          // height and desync Lenis from the real scroll — snapping the page
          // back up on the next wheel input. Force a synchronous re-measure
          // first so the clamp and internal state match the full home page.
          lenisRef.current.resize();
          lenisRef.current.scrollTo(targetPos, { immediate: true });
        }
        window.scrollTo(0, targetPos);
        sessionStorage.removeItem('portfolioGalleryScroll');
      }
    }
  }, [location, lenisRef]);

  return null;
}

function App() {
  const projectsRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);
  const lenisRef = useRef(null);

  const scrollToProjects = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(projectsRef.current, { offset: -40 });
    } else {
      projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Phase 1 (1600ms): loader words finish their entrance, then trigger the
    // slide-up exit which is purely CSS (kept out of the framer-motion path).
    const exitTimer = setTimeout(() => setIsLeaving(true), 1600);
    // Phase 2 (800ms later): exit transition completes, reveal the page.
    const revealTimer = setTimeout(() => setIsLoading(false), 2400);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(revealTimer);
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;

    try {
      const lenis = new Lenis({
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        syncTouch: true,
        touchMultiplier: 1.5,
        wheelMultiplier: 1,
      });

      lenisRef.current = lenis;
      window.lenis = lenis;

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      return () => {
        lenis.destroy();
        lenisRef.current = null;
        window.lenis = null;
      };
    } catch (e) {
      console.warn("Lenis initialization skipped:", e);
    }
  }, [isLoading]);

  return (
    <Router>
      <ScrollManager lenisRef={lenisRef} />
      <div className="App" style={{ backgroundColor: 'var(--bg)', minHeight: '100vh', color: 'var(--text-h)', fontFamily: 'var(--sans)' }}>
        {isLoading ? (
          <Loader isLeaving={isLeaving} />
        ) : (
          <main style={{ display: 'flex', flexDirection: 'column' }}>
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={
                  <>
                    <Hero onButtonClick={scrollToProjects} />
                    <Skills />
                    <Projects sectionRef={projectsRef} />
                    <Contact />
                  </>
                } />
                <Route path="/project/:id" element={<ProjectDetail />} />
              </Routes>
            </Suspense>
          </main>
        )}
      </div>
    </Router>
  );
}

export default App;