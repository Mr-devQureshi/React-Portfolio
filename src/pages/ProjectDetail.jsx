import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { myProjects } from '../data/projectsData';

function ProjectDetail() {
    const { id } = useParams();
    const project = myProjects.find(p => p.id === parseInt(id));
    const [selectedImage, setSelectedImage] = useState(null);

    if (!project) return <h2 style={{ color: 'var(--text-primary)', textAlign: 'center', marginTop: '5rem' }}>Project not found!</h2>;

    const heroImage = project.images && project.images.length > 0 ? project.images[0] : null;
    const galleryImages = project.images && project.images.length > 1 ? project.images.slice(1) : [];

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            style={{ padding: '4rem 2rem', maxWidth: '900px', margin: '0 auto', color: 'var(--text-primary)', fontFamily: 'sans-serif', minHeight: '100vh' }}
        >
            <motion.div variants={itemVariants} style={{ marginBottom: '2rem' }}>
                <Link to="/" style={{ color: 'var(--accent-color)', textDecoration: 'none', fontWeight: 'bold' }}>
                    ← Back to Portfolio
                </Link>
            </motion.div>

            {heroImage && (
                <motion.div variants={itemVariants} style={{
                    width: '100%',
                    height: '540px',
                    marginBottom: '2.5rem',
                    borderRadius: '12px',
                    border: '1px solid #222',
                    backgroundColor: 'var(--bg-secondary)',
                    overflow: 'hidden'
                }}>
                    <motion.img
                        src={heroImage}
                        alt={`${project.title} Hero Banner`}
                        onClick={() => setSelectedImage(heroImage)}
                        whileHover={{ scale: 1.02 }}
                        style={{
                            display: 'block',
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                            cursor: 'zoom-in',
                        }}
                    />
                </motion.div>
            )}

            <motion.h1 variants={itemVariants} className="gradient-text" style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: '1.3' }}>
                {project.title}
            </motion.h1>

            <motion.div variants={itemVariants} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
                {project.tags.map((tag, index) => (
                    <span key={index} style={{ backgroundColor: '#1a1a1a', color: 'var(--accent-color)', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                        {tag}
                    </span>
                ))}
            </motion.div>

            {galleryImages.length > 0 && (
                <motion.div variants={itemVariants} style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '1rem',
                    marginBottom: '3rem'
                }}>
                    {galleryImages.map((imgSrc, index) => (
                        <motion.img
                            key={index}
                            src={imgSrc}
                            alt={`${project.title} gallery screenshot ${index + 1}`}
                            onClick={() => setSelectedImage(imgSrc)}
                            whileHover={{ scale: 1.03 }}
                            style={{
                                display: 'block',
                                width: '100%',
                                height: '300px',
                                objectFit: 'contain',
                                borderRadius: '12px',
                                border: '1px solid #222',
                                backgroundColor: 'var(--bg-secondary)',
                                cursor: 'zoom-in',
                            }}
                        />
                    ))}
                </motion.div>
            )}

            <motion.h3 variants={itemVariants} style={{ borderBottom: '1px solid #222', paddingBottom: '0.5rem', color: 'var(--text-primary)' }}>
                Project Overview
            </motion.h3>

            <motion.p variants={itemVariants} style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)', marginTop: '1.5rem', whiteSpace: 'pre-line' }}>
                {project.details}
            </motion.p>

            <AnimatePresence>
                {selectedImage && createPortal(
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
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

                        <motion.img
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
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
                    </motion.div>,
                    document.body
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default ProjectDetail;