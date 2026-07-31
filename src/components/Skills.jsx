import React from 'react';
import { motion } from 'framer-motion';

// 🌟 Reusable Component for the Orbiting Skill Nodes
const OrbitNode = ({ skill, angle, radius, duration, color }) => {
    return (
        <motion.div
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 0,
                height: 0,
                zIndex: 2,
            }}
            // 1. Rotates the invisible wrapper in a massive circle
            animate={{ rotate: [angle, angle + 360] }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}
        >
            {/* 2. Pushes the item out to its specific orbit radius */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                transform: `translate(${radius}px, 0px)`
            }}>
                {/* 3. Counter-rotates the badge so the text stays perfectly horizontal */}
                <motion.div
                    animate={{ rotate: [-angle, -(angle + 360)] }}
                    transition={{ duration, repeat: Infinity, ease: "linear" }}
                    style={{
                        position: 'absolute',
                        x: '-50%',
                        y: '-50%',
                        transformOrigin: 'center center',
                    }}
                >
                    <div style={{
                        backgroundColor: 'rgba(18, 18, 26, 0.8)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(46, 48, 58, 0.6)',
                        color: 'var(--text-h)',
                        padding: '0.6rem 1.2rem',
                        borderRadius: '30px',
                        whiteSpace: 'nowrap',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
                        cursor: 'default'
                    }}>
                        {/* The glowing active-node indicator */}
                        <span style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            backgroundColor: color,
                            boxShadow: `0 0 10px ${color}`
                        }} />
                        {skill}
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

function Skills() {
    // Distributing your skills across 3 orbital rings
    const orbitalRings = [
        {
            radius: 150,
            duration: 35, // Inner ring spins fastest
            color: 'var(--accent)', // Vibrant Orange
            skills: ["MySQL", "PostgreSQL", "Docker", "C", "C++", "SQL Server"]
        },
        {
            radius: 270,
            duration: 50,
            color: 'var(--accent-secondary)', // Yellow-Orange
            skills: ["JavaScript", "HTML/CSS", "Python", "SQL", ".NET", "ShellScripting"]
        },
        {
            radius: 400,
            duration: 75, // Outer ring spins slowest
            color: '#9DA9CE', // Cool grey-blue
            skills: ["React.js", "Vite", "VS Code", "Git / GitHub", "BOOTSTRAP", "ARC GIS", "Remote Sensing", "Fast API", "Power BI", "Cisco", "Ubuntu"]
        }
    ];

    return (
        <section style={{ padding: '6rem 0', fontFamily: 'sans-serif', width: '100%', overflow: 'hidden', backgroundColor: 'var(--bg)', position: 'relative' }}>

            {/* The Header Area - Styled to match the Blockaid reference */}
            <div style={{ textAlign: 'center', marginBottom: '2rem', position: 'relative', zIndex: 10 }}>
                <p style={{ color: 'var(--accent)', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem' }}>
                    Integrations & Tooling
                </p>
                <h2 style={{ fontSize: '3rem', marginBottom: '1rem', letterSpacing: '-1px', color: 'var(--text-h)', maxWidth: '800px', margin: '0 auto' }}>
                    Built on a robust network of modern technologies
                </h2>
                <p style={{ color: 'var(--text)', fontSize: '1.1rem', maxWidth: '600px', margin: '1rem auto 0 auto', lineHeight: '1.6' }}>
                    Architecting scalable frontend interfaces, secure databases, and continuous delivery pipelines.
                </p>
            </div>

            {/* The Orbital System Wrapper */}
            <div style={{
                position: 'relative',
                width: '100%',
                height: '900px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '1rem'
            }}>
                <div style={{
                    position: 'relative',
                    width: '900px',
                    height: '900px',
                    flexShrink: 0
                }}>

                    {/* The Background Radial Glow (Matches the red/orange center glow) */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '700px',
                        height: '700px',
                        background: 'radial-gradient(circle, rgba(248, 109, 9, 0.12) 0%, rgba(248, 109, 9, 0) 60%)',
                        zIndex: 0,
                        pointerEvents: 'none'
                    }} />

                    {/* The Central CPU / Core Graphic */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 10
                    }}>
                        <div style={{
                            width: '90px',
                            height: '90px',
                            backgroundColor: '#08080D',
                            border: '2px solid var(--accent)',
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 0 40px rgba(248, 109, 9, 0.4), inset 0 0 20px rgba(248, 109, 9, 0.3)',
                            position: 'relative'
                        }}>
                            <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5">
                                <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                                <path d="M9 9h6v6H9z"></path>
                                <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"></path>
                            </svg>
                        </div>
                    </div>

                    {/* Drawing the dashed rings and mapping the orbiting nodes */}
                    {orbitalRings.map((ring, ringIdx) => (
                        <div key={`ring-container-${ringIdx}`}>

                            {/* The physical dashed circle */}
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: `${ring.radius * 2}px`,
                                height: `${ring.radius * 2}px`,
                                borderRadius: '50%',
                                border: '1px dashed var(--border)',
                                opacity: 0.6,
                                zIndex: 0
                            }} />

                            {/* The skills orbiting on this specific ring */}
                            {ring.skills.map((skill, skillIdx) => {
                                const angle = (360 / ring.skills.length) * skillIdx;
                                return (
                                    <OrbitNode
                                        key={skillIdx}
                                        skill={skill}
                                        angle={angle}
                                        radius={ring.radius}
                                        duration={ring.duration}
                                        color={ring.color}
                                    />
                                );
                            })}
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}

export default Skills;