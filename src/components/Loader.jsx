import React from 'react';
import { motion } from 'framer-motion';

function Loader() {
    const greeting = "git commit 'Transforming ideas into code' ";
    const words = greeting.split(" ");

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.3 }
        },
        exit: {
            opacity: 0,
            y: '-100vh',
            transition: { duration: 0.8, ease: "easeInOut" }
        }
    };

    const wordVariants = {
        hidden: { opacity: 0, y: 30 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.6, 0.01, -0.05, 0.9] }
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            exit="exit"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'var(--bg)',
                zIndex: 99999,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--sans)',
            }}
        >
            <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', justifyContent: 'center', padding: '0 2rem' }}>
                {words.map((word, index) => (
                    <motion.span
                        key={index}
                        variants={wordVariants}
                        style={{
                            fontSize: '3.5rem',
                            fontWeight: '700',
                            color: word.includes('git') ? 'var(--accent)' : 'var(--text-h)',
                            letterSpacing: '-1px'
                        }}
                    >
                        {word}
                    </motion.span>
                ))}
            </div>
        </motion.div>
    );
}

export default Loader;