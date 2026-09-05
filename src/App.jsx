import React, { useState, useRef, useEffect, useLayoutEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';

import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Loader from './components/Loader';

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

        console.log('[scroll-restore] targetPos =', targetPos, 'docHeight =', document.documentElement.scrollHeight, 'bodyHeight =', document.body.scrollHeight);

        // useLayoutEffect runs before paint, so restore synchronously here —
        // this paints the home page already at the project's position with no
        // flicker or snap. The sticky track height is %vh (fixed immediately),
        // so the document height is stable at this point.
        if (lenisRef.current) {
          lenisRef.current.scrollTo(targetPos, { immediate: true });
        }
        window.scrollTo(0, targetPos);
        console.log('[scroll-restore] after restore, scrollY =', window.scrollY, 'lenis =', lenisRef.current?.scroll);
        sessionStorage.removeItem('portfolioGalleryScroll');
      }
    }
  }, [location, lenisRef]);

  return null;
}

function App() {
  const projectsRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef(null);

  const scrollToProjects = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(projectsRef.current, { offset: -40 });
    } else {
      projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const masterTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);

    return () => clearTimeout(masterTimer);
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
        <AnimatePresence mode="wait">
          {isLoading ? (
            <Loader key="loader" />
          ) : (
            <motion.main
              key="main"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
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
            </motion.main>
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;