import React, { useState, useEffect } from 'react';

function Hero({ onButtonClick }) {
    const words = [
        "Building clean frontend interfaces.",
        "Designing reliable database structures.",
        "Solving complex engineering problems.",
        "Scalability of a Software.",
        ""
    ];

    const [currentWordIdx, setCurrentWordIdx] = useState(0);
    const [subText, setSubText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(100);

    useEffect(() => {
        const activePhrase = words[currentWordIdx];

        const handleTyping = () => {
            if (!isDeleting) {

                setSubText(activePhrase.substring(0, subText.length + 1));
                setTypingSpeed(70);

                if (subText === activePhrase) {

                    setTypingSpeed(2000);
                    setIsDeleting(true);
                }
            } else {

                setSubText(activePhrase.substring(0, subText.length - 1));
                setTypingSpeed(40);

                if (subText === "") {
                    setIsDeleting(false);
                    setCurrentWordIdx((prev) => (prev + 1) % words.length);
                    setTypingSpeed(500);
                }
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [subText, isDeleting, currentWordIdx]);

    return (
        <section className="animate-fade-in" style={{
            padding: '6rem 2rem',
            textAlign: 'center',
            backgroundColor: 'rgba(26, 26, 26, 0.4)',
            backdropFilter: 'blur(16px)',
            color: '#ffffff',
            borderRadius: '12px',
            margin: '2rem',
            fontFamily: 'sans-serif',
            border: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
            <h1 style={{
                fontSize: '3rem',
                marginBottom: '1.5rem',
                fontWeight: '800',
                color: '#ffffff',
                lineHeight: '1.4'
            }}>
                <span className="gradient-text">Hello! My name is Yousuf, a Junior Software Engineer</span>
                <span className="waving-hand" style={{ display: 'inline-block', marginLeft: '12px' }}>👋</span>
            </h1>

            <p style={{ fontSize: '1.3rem', color: '#cccccc', minHeight: '40px', maxWidth: '650px', margin: '0 auto 2.5rem auto', lineHeight: '1.6' }}>
                I'm learning to specialize in <br />
                <span style={{ color: '#646cff', fontWeight: 'bold' }}>{subText}</span>
                <span className="cursor">|</span>
            </p>

            <button onClick={onButtonClick} className="glow-button" style={{
                padding: '0.9rem 2rem', fontSize: '1.05rem', backgroundColor: '#646cff', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold'
            }}>
                View My Projects
            </button>
        </section>
    );
}

export default Hero;