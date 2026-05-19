import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { myProjects } from '../data/projectsData';

function Projects({ sectionRef }) {
    const [isVisible, setIsVisible] = useState(false);
    const internalRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.1 }
        );
        if (internalRef.current) observer.observe(internalRef.current);
        return () => observer.disconnect();
    }, []);

    const setRefs = (node) => {
        internalRef.current = node;
        if (sectionRef) sectionRef.current = node;
    };

    return (
        <section ref={setRefs} className={`reveal-section ${isVisible ? 'visible' : ''}`} style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ color: '#ffffff', borderBottom: '2px solid #333', paddingBottom: '0.5rem', marginBottom: '2rem' }}>
                Featured Projects
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                {myProjects.map((project) => (
                    /* The Link wrapper makes the whole card clickable! */
                    <Link to={`/project/${project.id}`} key={project.id} style={{ textDecoration: 'none' }}>
                        <div className="project-card" style={{ backgroundColor: '#1a1a1a', color: '#ffffff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #333', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                            <div>
                                <h3 style={{ marginTop: 0, color: '#646cff' }}>{project.title}</h3>
                                <p style={{ color: '#cccccc', lineHeight: '1.5', fontSize: '0.95rem' }}>{project.description}</p>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                                {project.tags.map((tag, index) => (
                                    <span key={index} style={{ backgroundColor: '#2a2a2a', color: '#646cff', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>{tag}</span>
                                ))}
                            </div>
                        </div>
                    </Link>
                ))}

            </div>
        </section>
    );
}

export default Projects;