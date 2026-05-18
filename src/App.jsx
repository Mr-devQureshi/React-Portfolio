import React, { useRef, useState, useEffect } from 'react';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  const projectsRef = useRef(null);

  // State to track mouse position
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Update coordinates on mouse move
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{
      backgroundColor: '#0f0f0f',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Mouse-Tracking Interactive Glow Orb */}
      <div style={{
        position: 'fixed',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(100,108,255,0.15) 0%, rgba(255,100,180,0.05) 50%, transparent 100%)',
        filter: 'blur(60px)',
        transform: `translate(${mousePos.x - 250}px, ${mousePos.y - 250}px)`,
        pointerEvents: 'none',
        zIndex: 0,
        transition: 'transform 0.1s ease-out' /* Creates a smooth lagging trace effect */
      }}></div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Hero onButtonClick={scrollToProjects} />
        <Skills />
        <Projects sectionRef={projectsRef} />
        <Contact />
      </div>
    </div>
  );
}

export default App;