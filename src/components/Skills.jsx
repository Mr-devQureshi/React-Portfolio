import React, { useEffect, useRef, useState } from 'react';

function Skills() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
            { threshold: 0.15 } /* Triggers when 15% of the element shows */
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const skillCategories = [
        { title: "Languages", skills: ["JavaScript", "HTML/CSS", "Python", "SQL", "C", "C++", ".NET", "BOOTSTRAP", "ShellScripting"] },
        { title: "Frameworks & Tools", skills: ["React.js", "Vite", "VS Code", "Git / GitHub", "ARC GIS", "Remote Sensing", "Fast API", "Power BI", "Cisco", "Ubuntu"] },
        { title: "Databases & Systems", skills: ["MySQL", "PostgreSQL", "SQL Server / SSMS", "Docker"] }
    ];

    return (
        /*Combined layout classes for reveal */
        <section
            ref={sectionRef}
            className={`reveal-section ${isVisible ? 'visible' : ''}`}
            style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}
        >
            <h2 style={{ color: '#ffffff', borderBottom: '2px solid #333', paddingBottom: '0.5rem', marginBottom: '2rem' }}>
                Skills & Technologies
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                {skillCategories.map((category, index) => (
                    <div key={index} style={{ backgroundColor: '#1a1a1a', padding: '1.5rem', borderRadius: '8px', border: '1px solid #333' }}>
                        <h3 style={{ color: '#646cff', marginTop: 0, marginBottom: '1rem' }}>{category.title}</h3>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {category.skills.map((skill, idx) => (
                                <span key={idx} style={{ backgroundColor: '#2a2a2a', color: '#ffffff', padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem' }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Skills;