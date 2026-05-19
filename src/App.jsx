import React, { useRef, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import our sections
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

// Import our new page
import ProjectDetail from './pages/ProjectDetail';

// We bundle the main page into a single component so the router can render it cleanly
function HomePage() {
  const projectsRef = useRef(null);

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <Hero onButtonClick={scrollToProjects} />
      <Skills />
      <Projects sectionRef={projectsRef} />
      <Contact />
    </div>
  );
}

// The Main App Engine
function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => setMousePos({ x: event.clientX, y: event.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <BrowserRouter>
      <div style={{ backgroundColor: '#0f0f0f', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>

        {/* The Mouse Tracking Glow Orb lives outside the routes so it works everywhere! */}
        <div style={{
          position: 'fixed',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(100,108,255,0.15) 0%, rgba(255,100,180,0.05) 50%, transparent 100%)',
          filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0, transition: 'transform 0.1s ease-out',
          transform: `translate(${mousePos.x - 250}px, ${mousePos.y - 250}px)`
        }}></div>

        {/* 🌟 The Routing Engine Traffic Cop 🌟 */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
          </Routes>
        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;