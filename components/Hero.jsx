export default function Hero() {
    return (
        <section id="hero">
            <div className="hero-content">
                <p className="greeting">Hi, my name is Syed Farhan Danish.</p>
                <h1 className="hero-title">Engineering tech solutions to bridge the <br /><span className="highlight">educational divide.</span></h1>
                <p className="hero-subtitle">Front-End Developer & UI Designer | Youth Advocate | Deputy President @ AKHSS Booni</p>
                
                <div className="hero-buttons">
                    <a href="#projects" className="btn primary-btn" aria-label="Explore my project portfolio">Explore My Work</a>
                    <a href="#contact" className="btn secondary-btn" aria-label="Scroll to contact section">Let's Talk</a>
                    <a href="/Syed_Farhan_Resume.pdf" download="Syed_Farhan_Resume.pdf" className="btn secondary-btn" aria-label="Download Syed Farhan Danish Resume">Download Resume</a>
                </div>
            </div>
        </section>
    );
}