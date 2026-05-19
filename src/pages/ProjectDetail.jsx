import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { myProjects } from '../data/projectsData';

function ProjectDetail() {
    const { id } = useParams();
    const project = myProjects.find(p => p.id === parseInt(id));
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) return <h2 style={{ color: 'white', textAlign: 'center', marginTop: '5rem' }}>Project not found!</h2>;

    // 🌟 The Array Split: Grab the first image for the Hero, and the rest for the Grid
    const heroImage = project.images && project.images.length > 0 ? project.images[0] : null;
    const galleryImages = project.images && project.images.length > 1 ? project.images.slice(1) : [];

    return (
        <div className="animate-fade-in" style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto', color: '#fff', fontFamily: 'sans-serif', minHeight: '100vh' }}>

            <div style={{ marginBottom: '2rem' }}>
                <Link to="/" style={{ color: '#646cff', textDecoration: 'none', fontWeight: 'bold' }}>
                    ← Back to Portfolio
                </Link>
            </div>


            {/* 🌟 THE NEW HERO BANNER (Top Image) 🌟 */}
            {heroImage && (
                <div style={{
                    width: '100%',
                    height: '540px', /* 🌟 The Frame: Dictates the exact height safely */
                    marginBottom: '2.5rem',
                    borderRadius: '12px',
                    border: '1px solid #333',
                    backgroundColor: '#1e1e1e',
                    overflow: 'hidden' /* 🌟 The Magic: Chops off anything that spills out of the frame */
                }}>
                    <img
                        src={heroImage}
                        alt={`${project.title} Hero Banner`}
                        onClick={() => setSelectedImage(heroImage)}
                        style={{
                            display: 'block',
                            width: '100%',
                            height: '100%', /* 🌟 Tells the image to fill the frame perfectly */
                            objectFit: 'cover', /* 🌟 Now this is guaranteed to crop instead of squish! */
                            objectPosition: 'center',
                            cursor: 'zoom-in',
                            transition: 'transform 0.2s ease-in-out'
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                </div>
            )}

            <h1 className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.3' }}>
                {project.title}
            </h1>

            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                {project.tags.map((tag, index) => (
                    <span key={index} style={{ backgroundColor: '#2a2a2a', color: '#646cff', padding: '0.4rem 0.8rem', borderRadius: '4px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                        {tag}
                    </span>
                ))}
            </div>

            {/* 🌟 THE GALLERY GRID (Only remaining images) 🌟 */}
            {galleryImages.length > 0 && (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '1rem',
                    marginBottom: '3rem'
                }}>
                    {galleryImages.map((imgSrc, index) => (
                        <img
                            key={index}
                            src={imgSrc}
                            alt={`${project.title} gallery screenshot ${index + 1}`}
                            onClick={() => setSelectedImage(imgSrc)}
                            style={{
                                display: 'block',
                                width: '100%',
                                height: '300px',
                                objectFit: 'contain',
                                borderRadius: '12px',
                                border: '1px solid #333',
                                backgroundColor: '#1e1e1e',
                                cursor: 'zoom-in',
                                transition: 'transform 0.2s ease-in-out'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                    ))}
                </div>
            )}

            <h3 style={{ borderBottom: '1px solid #333', paddingBottom: '0.5rem', color: '#ccc' }}>Project Overview</h3>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#bbb', marginTop: '1.5rem', whiteSpace: 'pre-line' }}>
                {project.details}
            </p>

            {/* 🌟 THE LIGHTBOX PORTAL 🌟 */}
            {selectedImage && createPortal(
                <div
                    onClick={() => setSelectedImage(null)}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0, 0, 0, 0.95)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 99999,
                        cursor: 'zoom-out',
                        padding: '2rem',
                        boxSizing: 'border-box'
                    }}
                >
                    <span style={{ position: 'absolute', top: '20px', right: '30px', color: '#fff', fontSize: '3rem', fontWeight: 'bold', cursor: 'pointer' }}>
                        &times;
                    </span>

                    <img
                        src={selectedImage}
                        alt="Enlarged view"
                        style={{
                            maxWidth: '95vw',
                            maxHeight: '95vh',
                            objectFit: 'contain',
                            borderRadius: '8px',
                            boxShadow: '0 0 50px rgba(0,0,0,1)',
                            display: 'block'
                        }}
                    />
                </div>,
                document.body
            )}

        </div>
    );
}

export default ProjectDetail;