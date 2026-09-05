import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// 🌟 THE MASTER POOL (Updated with your exact stack)
const ALL_TOOLS = [
    // Languages
    { name: "JavaScript", color: "#F86D09" },
    { name: "Java", color: "#6366f1" },
    { name: "HTML5/CSS3", color: "#F86D09" },
    { name: "SQL", color: "#6366f1" },
    { name: "C/C++", color: "#F86D09" },
    { name: "Python", color: "#6366f1" },
    { name: ".NET MVC", color: "#F86D09" },
    { name: "Shell Scripting", color: "#6366f1" },

    // Frameworks & Libraries
    { name: "React.js", color: "#F86D09" },
    { name: "Bootstrap", color: "#6366f1" },
    { name: "FastAPI", color: "#F86D09" },
    { name: "Power BI", color: "#6366f1" },
    { name: "Cisco", color: "#F86D09" },
    { name: "Ubuntu", color: "#6366f1" },

    // DevOps & Automation
    { name: "Docker", color: "#F86D09" },
    { name: "Jenkins", color: "#6366f1" },
    { name: "Git", color: "#F86D09" },
    { name: "GitHub", color: "#6366f1" },
    { name: "Playwright", color: "#F86D09" },
    { name: "WSL", color: "#6366f1" },

    // Developer Tools
    { name: "VS Code", color: "#F86D09" },
    { name: "SSMS", color: "#6366f1" },
    { name: "IntelliJ", color: "#F86D09" },
    { name: "Jupyter", color: "#6366f1" },
    { name: "ArcGIS", color: "#F86D09" }
];

const ORBIT_CONFIG = [
    { id: 1, size: 320, duration: 35, direction: 1, slots: 3 },
    { id: 2, size: 520, duration: 45, direction: -1, slots: 4 },
    { id: 3, size: 720, duration: 60, direction: 1, slots: 5 }
];

function getInitialState() {
    let toolIndex = 0;
    const activeSlots = [];

    ORBIT_CONFIG.forEach(orbit => {
        for (let i = 0; i < orbit.slots; i++) {
            activeSlots.push({
                orbitId: orbit.id,
                slotIndex: i,
                angle: (360 / orbit.slots) * i,
                tool: ALL_TOOLS[toolIndex++]
            });
        }
    });

    const reservePool = ALL_TOOLS.slice(toolIndex);
    return { activeSlots, reservePool };
}

function Skills() {
    const [state, setState] = useState(getInitialState);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    // Pause all orbit/hot-swap work when the section scrolls off-screen
    useEffect(() => {
        const node = sectionRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.1 }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    // HOT-SWAP ENGINE (only while visible)
    useEffect(() => {
        if (!isVisible) return;

        const swapInterval = setInterval(() => {
            setState(prev => {
                if (prev.reservePool.length === 0) return prev;

                const newSlots = [...prev.activeSlots];
                const newPool = [...prev.reservePool];

                const slotToSwapIdx = Math.floor(Math.random() * newSlots.length);
                const toolFromPoolIdx = Math.floor(Math.random() * newPool.length);

                const oldTool = newSlots[slotToSwapIdx].tool;
                const newTool = newPool[toolFromPoolIdx];

                newSlots[slotToSwapIdx] = { ...newSlots[slotToSwapIdx], tool: newTool };
                newPool[toolFromPoolIdx] = oldTool;

                return { activeSlots: newSlots, reservePool: newPool };
            });
        }, 2500);

        return () => clearInterval(swapInterval);
    }, [isVisible]);

    const orbitStyle = (isVisible ? '' : 'paused') + ' gpu-accelerated';

    return (
        <section ref={sectionRef} style={{ backgroundColor: 'var(--bg)', position: 'relative', overflow: 'hidden', padding: '6rem 0', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <style>
                {`
          @keyframes spinCw {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes spinCcw {
            0% { transform: rotate(360deg); }
            100% { transform: rotate(0deg); }
          }
          .gpu-accelerated {
            backface-visibility: hidden;
            transform: translateZ(0);
            will-change: transform;
          }
          .gpu-accelerated.paused,
          .gpu-accelerated.paused * {
            animation-play-state: paused !important;
            transition: none;
          }
        `}
            </style>

            {/* HEADER SECTION */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                style={{ textAlign: 'center', zIndex: 10, position: 'relative', marginBottom: '4rem' }}
            >
                <p style={{ color: 'var(--accent)', fontWeight: 'bold', letterSpacing: '2px', fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '1rem' }}>
                    Integrations & Tooling
                </p>
                <h2 style={{ color: 'var(--text-h)', fontSize: '3.5rem', fontWeight: '600', lineHeight: '1.2', marginBottom: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
                    Built on a robust network of modern technologies
                </h2>
                <p style={{ color: 'var(--text)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                    Architecting scalable frontend interfaces, secure databases, and continuous delivery pipelines.
                </p>
            </motion.div>

            {/* SOLAR SYSTEM CONTAINER */}
            <div style={{ position: 'relative', width: '100%', height: '800px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                {/* THE CORE */}
                <div style={{
                    position: 'absolute',
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#12121A',
                    border: '2px solid var(--accent)',
                    borderRadius: '16px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 50,
                    boxShadow: '0 0 40px rgba(248, 109, 9, 0.2)'
                }}>
                    <span style={{ color: 'var(--accent)', fontSize: '1.5rem', fontWeight: 'bold' }}>&lt;/&gt;</span>
                </div>

                {/* ORBITS RENDERER */}
                {ORBIT_CONFIG.map((orbit) => {
                    const spinAnimation = orbit.direction === 1 ? 'spinCw' : 'spinCcw';
                    const counterSpinAnimation = orbit.direction === 1 ? 'spinCcw' : 'spinCw';

                    const activeOrbitSlots = state.activeSlots.filter(s => s.orbitId === orbit.id);

                    return (
                        <div
                            key={orbit.id}
                            className={orbitStyle}
                            style={{
                                position: 'absolute',
                                width: `${orbit.size}px`,
                                height: `${orbit.size}px`,
                                border: '1px dashed rgba(255, 255, 255, 0.1)',
                                borderRadius: '50%',
                                animation: `${spinAnimation} ${orbit.duration}s linear infinite`,
                            }}
                        >
                            {activeOrbitSlots.map((slot) => (
                                <div
                                    key={slot.slotIndex}
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: `translate(-50%, -50%) rotate(${slot.angle}deg) translateY(-${orbit.size / 2}px)`,
                                    }}
                                >
                                    <div className="gpu-accelerated" style={{ animation: `${counterSpinAnimation} ${orbit.duration}s linear infinite` }}>
                                        <div style={{ transform: `rotate(-${slot.angle}deg)` }}>

                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={slot.tool.name}
                                                    initial={{ opacity: 0, scale: 0.5 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.5 }}
                                                    transition={{ duration: 0.4 }}
                                                    style={{
                                                        backgroundColor: '#1a1a24',
                                                        border: '1px solid #2a2a35',
                                                        borderRadius: '9999px',
                                                        padding: '0.6rem 1.2rem',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        gap: '0.6rem',
                                                        whiteSpace: 'nowrap',
                                                        boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
                                                        transition: 'border-color 0.3s ease',
                                                        cursor: 'default'
                                                    }}
                                                    onMouseOver={(e) => e.currentTarget.style.borderColor = slot.tool.color}
                                                    onMouseOut={(e) => e.currentTarget.style.borderColor = '#2a2a35'}
                                                >
                                                    <span style={{
                                                        width: '8px',
                                                        height: '8px',
                                                        borderRadius: '50%',
                                                        backgroundColor: slot.tool.color,
                                                        boxShadow: `0 0 10px ${slot.tool.color}`
                                                    }} />
                                                    <span style={{ color: '#e2e8f0', fontSize: '0.9rem', fontWeight: '500' }}>
                                                        {slot.tool.name}
                                                    </span>
                                                </motion.div>
                                            </AnimatePresence>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default Skills;