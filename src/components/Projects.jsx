import React, { useEffect, useRef, useState } from 'react';

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

    // Merge scroll-to pointer and reveal pointer using a callback ref
    const setRefs = (node) => {
        internalRef.current = node;
        if (sectionRef) sectionRef.current = node;
    };

    const myProjects = [
        { id: 1, title: "Network Topology & Router Configuration", description: "Designed and implemented a resilient ring network topology, configuring Cisco router CLI settings for optimized packet routing.", tags: ["Networking", "CLI", "Cisco"] },
        { id: 2, title: "Relational Database Management System", description: "Designed a secure relational database schema utilizing SQL Server and SSMS, focusing on advanced query optimization and normalization.", tags: ["SQL Server", "SSMS", "Databases"] },
        { id: 3, title: "Hospital Management System", description: "This Project was inspired due to the lack of facilities in Hospitals that are in Pakistan that have huge communication gaps between Doctors, patient,administration and Pharmacy causing alot of mishaps and waste of time.", tags: ["Interconnection", "Java"] },
        { id: 4, title: "Grocery Shopping", description: "A small Grocery Billing project that is inspired from the POS systems of Imtiaz and Chase Up.", tags: ["FileHandling", "C"] },
        { id: 5, title: "ATM", description: "A Snippets of code that stimulate real ATM environment and its conditions.", tags: ["Database", "MYSQL"] },
        { id: 6, title: "Blogging", description: "A fun Blogging website made in 1st Semester.", tags: ["CSS", "HTML"] },
        { id: 7, title: "Website Promoting WFH", description: "Due to Covid Remote work was getting common and almost every workplace was left stranded.", tags: ["CSS", "HTML"] },
        { id: 8, title: "Remote Sensing & ML", description: "Used in porjects interlinked with Remote Sensing and Satellites using multiple bands to recognize required data.", tags: ["ML", "Python", "GIS"] },
    ];

    return (
        /*Blended target reveals */
        <section
            ref={setRefs}
            className={`reveal-section ${isVisible ? 'visible' : ''}`}
            style={{ padding: '2rem', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}
        >
            <h2 style={{ color: '#ffffff', borderBottom: '2px solid #333', paddingBottom: '0.5rem', marginBottom: '2rem' }}>
                Featured Projects
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {myProjects.map((project) => (
                    <div key={project.id} className="project-card" style={{ backgroundColor: '#1a1a1a', color: '#ffffff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #333', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <h3 style={{ marginTop: 0, color: '#646cff' }}>{project.title}</h3>
                            <p style={{ color: '#cccccc', lineHeight: '1.5', fontSize: '0.95rem' }}>{project.description}</p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '1rem' }}>
                            {project.tags.map((tag, index) => (
                                <span key={index} style={{ backgroundColor: '#2a2a2a', color: '#646cff', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Projects;