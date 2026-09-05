import { useState, useEffect } from 'react';

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

    /* Your original typewriter logic - untouched! */
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


    /* 🌟 2. The Cinematic Entrance — now plain CSS (no framer-motion in the
       critical path). Nesting matches the old staggerChildren 0.3s /
       delayChildren 0.2s timing exactly. */

    return (
        /* 🌟 3. The Animated Section Wrapper */
        <section
            className="hero-enter"
            style={{
                padding: '10rem 2rem 8rem 2rem',
                textAlign: 'center',
                fontFamily: 'sans-serif',
                maxWidth: '900px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '75vh'
            }}
        >
            <h1 className="hero-enter-item" style={{
                fontSize: '3.5rem',
                marginBottom: '1.5rem',
                fontWeight: '800',
                lineHeight: '1.2'
            }}>
                <span className="gradient-text">Hello! My name is Yousuf,</span>
                <br /> {/* Breaking the title onto two lines feels more editorial and premium */}
                <span style={{ color: 'var(--text-primary)' }}>a Junior Software Engineer</span>
                <span className="waving-hand" style={{ display: 'inline-block', marginLeft: '12px' }}>👋</span>
            </h1>

            <p className="hero-enter-item" style={{
                fontSize: '1.3rem',
                color: 'var(--text-secondary)',
                minHeight: '60px',
                maxWidth: '650px',
                margin: '0 auto 2.5rem auto',
                lineHeight: '1.6'
            }}>
                I'm learning to specialize in <br />
                <span style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>{subText}</span>
                <span className="cursor" style={{ opacity: isDeleting ? 0.4 : 1 }}>|</span>
            </p>

            <div className="hero-enter-item">
                <button onClick={onButtonClick} style={{
                    padding: '1rem 2.5rem',
                    fontSize: '1.1rem',
                    backgroundColor: 'var(--accent-color)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                    boxShadow: '0 4px 14px 0 rgba(100, 108, 255, 0.39)' /* Premium glowing drop shadow */
                }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(100, 108, 255, 0.6)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 14px 0 rgba(100, 108, 255, 0.39)';
                    }}>
                    View My Projects
                </button>
            </div>
        </section>
    );
}

export default Hero;