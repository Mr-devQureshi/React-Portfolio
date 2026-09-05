import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { myProjects } from '../data/projectsData';

const GALLERY_CONFIG = {
    cardWidth: 360,
    cardHeight: 500,
    gapX: 60,
};

const ScrubCard = ({ project, index, progress, total }) => {
    const { cardWidth, cardHeight, gapX } = GALLERY_CONFIG;

    const centerIndex = (total - 1) / 2;
    const messyAngle = (index - centerIndex) * 7;

    const stepDistance = cardWidth + gapX;
    const unpackedX = index * stepDistance;
    const maxScroll = (total - 1) * stepDistance;

    // 🌟 ELONGATED ANIMATION TIMELINE: 
    // Stretched from [0.05, 0.15, 1] to [0.05, 0.35, 1]. 
    // This triples the scroll distance required for the cards to unpack and flip open!
    const x = useTransform(
        progress,
        [0.05, 0.35, 1],
        [0, unpackedX, unpackedX - maxScroll]
    );

    const y = useTransform(progress, [0.05, 0.35, 1], [250, 0, 0]);
    const scale = useTransform(progress, [0.05, 0.35, 1], [0.4, 1, 1]);
    const rotateY = useTransform(progress, [0.05, 0.35, 1], [180, 0, 0]);
    const rotateZ = useTransform(progress, [0.05, 0.35, 1], [messyAngle, 0, 0]);

    const zIndex = 100 - index;

    return (
        <motion.div
            style={{
                position: 'absolute',
                scale,
                x,
                y,
                rotateZ,
                rotateY,
                zIndex,
                width: `${cardWidth}px`,
                height: `${cardHeight}px`,
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                backfaceVisibility: 'hidden',
            }}
        >
            <Link
                to={`/project/${project.id}`}
                onClick={() => {
                    const currentScroll = window.lenis ? window.lenis.scroll : window.scrollY;
                    sessionStorage.setItem('portfolioGalleryScroll', currentScroll.toString());
                }}
                style={{
                    textDecoration: 'none',
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden'
                }}
            >
                <div
                    style={{
                        backgroundColor: 'var(--code-bg)',
                        padding: '3rem 2rem',
                        borderRadius: '16px',
                        border: '1px solid var(--border)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        textAlign: 'center',
                        width: '100%',
                        height: '100%',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.borderColor = 'var(--accent-border)';
                        e.currentTarget.style.boxShadow = '0 0 30px rgba(248, 109, 9, 0.15)';
                        e.currentTarget.style.transform = 'translateY(-10px)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border)';
                        e.currentTarget.style.boxShadow = 'none';
                        e.currentTarget.style.transform = 'translateY(0)';
                    }}
                >
                    <div>
                        <h3 style={{ marginTop: 0, color: 'var(--text-h)', fontSize: '1.6rem', lineHeight: '1.4', marginBottom: '1.5rem', fontWeight: '600' }}>
                            {project.title}
                        </h3>
                        <p style={{ color: 'var(--text)', lineHeight: '1.8', fontSize: '0.95rem' }}>
                            {project.description}
                        </p>
                    </div>

                    <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '1rem' }}>
                        {project.tags.map((tag, tagIndex) => (
                            <span
                                key={tagIndex}
                                style={{
                                    backgroundColor: 'transparent',
                                    color: 'var(--accent)',
                                    padding: '0.5rem 1rem',
                                    borderRadius: '6px',
                                    fontSize: '0.8rem',
                                    fontWeight: '500',
                                    border: '1px solid var(--accent-border)'
                                }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </Link>

            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    backgroundColor: '#12121A',
                    border: '2px solid var(--accent-border)',
                    borderRadius: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'inset 0 0 50px rgba(248, 109, 9, 0.05)',
                }}
            >
                <span style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent)',
                    marginBottom: '1.5rem',
                    boxShadow: '0 0 25px var(--accent)'
                }} />
                <p style={{ color: 'var(--accent)', fontSize: '1rem', fontWeight: 'bold', letterSpacing: '3px' }}>
                    PROJECT DEPLOYMENT
                </p>
            </div>
        </motion.div>
    );
};

function Projects({ sectionRef }) {
    const trackRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: trackRef,
        offset: ["start start", "end end"]
    });

    // 🌟 Increased height multiplier from 60vh to 85vh per project to give the elongated animation plenty of breathing room
    const dynamicTrackHeight = Math.max(500, myProjects.length * 85);

    const headerOpacity = useTransform(scrollYProgress, [0, 0.03, 1], [1, 0, 0]);
    const headerY = useTransform(scrollYProgress, [0, 0.03, 1], [0, -50, -50]);
    const headerScale = useTransform(scrollYProgress, [0, 0.03, 1], [1, 0.9, 0.9]);

    return (
        <section ref={sectionRef} style={{ backgroundColor: 'var(--bg)', position: 'relative' }}>

            <div ref={trackRef} style={{ height: `${dynamicTrackHeight}vh`, position: 'relative', contain: 'paint' }}>

                <div style={{
                    position: 'sticky',
                    top: 0,
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                }}>

                    <motion.div style={{
                        position: 'absolute',
                        top: '15%',
                        textAlign: 'center',
                        zIndex: 10,
                        opacity: headerOpacity,
                        y: headerY,
                        scale: headerScale,
                        pointerEvents: 'none',
                        willChange: 'transform, opacity'
                    }}>
                        <h2 style={{ color: 'var(--accent)', fontSize: '3rem', marginBottom: '1rem', fontWeight: '500', letterSpacing: '-1px' }}>
                            Featured Projects
                        </h2>
                        <p style={{ color: 'var(--text)', fontSize: '1.15rem' }}>
                            Scroll to unpack infrastructure.
                        </p>
                    </motion.div>

                    <div style={{
                        position: 'relative',
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        perspective: '1400px'
                    }}>
                        {myProjects.map((project, index) => (
                            <ScrubCard
                                key={project.id}
                                project={project}
                                index={index}
                                progress={scrollYProgress}
                                total={myProjects.length}
                            />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Projects;