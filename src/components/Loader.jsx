function Loader({ isLeaving }) {
    const greeting = "git commit 'Transforming ideas into code' ";
    const words = greeting.split(" ");

    return (
        <div className={isLeaving ? 'loader is-leaving' : 'loader'} style={{
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
        }}>
            <div style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap', justifyContent: 'center', padding: '0 2rem' }}>
                {words.map((word, index) => (
                    <span
                        key={index}
                        className="loader-word"
                        style={{
                            fontSize: '3.5rem',
                            fontWeight: '700',
                            color: word.includes('git') ? 'var(--accent)' : 'var(--text-h)',
                            letterSpacing: '-1px',
                            animationDelay: `${(0.3 + index * 0.15) * 1000}ms`
                        }}
                    >
                        {word}
                    </span>
                ))}
            </div>
            <style>{`
                .loader-word {
                    display: inline-block;
                    opacity: 0;
                    animation: loaderWordUp 0.8s cubic-bezier(0.6, 0.01, -0.05, 0.9) forwards;
                }
                @keyframes loaderWordUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}

export default Loader;