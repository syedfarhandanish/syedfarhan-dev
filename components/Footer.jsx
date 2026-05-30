"use client";
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import MagneticButton from './MagneticButton';

// Premium SVG Icons
const Icons = {
    LinkedIn: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle>
        </svg>
    ),
    WhatsApp: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
    ),
    Email: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>
        </svg>
    ),
    GitHub: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
        </svg>
    )
};

export default function Footer() {
    const footerRef = useRef(null);
    const currentYear = new Date().getFullYear();
    
    const marqueeSkills = [
        "NEXT.JS 15", "UI/UX DESIGN", "REACT", "TAILWIND CSS", 
        "FRAMER MOTION", "FRONT-END ARCHITECTURE", "THREE.JS"
    ];

    // High-Performance Hardware Accelerated Torch
    useEffect(() => {
        const footer = footerRef.current;
        if (!footer) return;

        let ticking = false;

        const handleNativeMouseMove = (e) => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const rect = footer.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    footer.style.setProperty('--mouse-x', `${x}px`);
                    footer.style.setProperty('--mouse-y', `${y}px`);
                    ticking = false;
                });
                ticking = true;
            }
        };

        footer.addEventListener('mousemove', handleNativeMouseMove, { passive: true });
        
        return () => {
            footer.removeEventListener('mousemove', handleNativeMouseMove);
        };
    }, []);

    return (
        <footer 
            ref={footerRef}
            className="footer-container"
            style={{ 
                position: 'relative', 
                backgroundColor: '#020617', 
                overflow: 'hidden', 
                borderTop: '1px solid rgba(16, 185, 129, 0.2)', 
                marginTop: '100px', 
                paddingTop: '6rem',
                willChange: 'transform'
            }}
        >
            {/* THE TORCH SPOTLIGHT */}
            <div className="torch-spotlight" />

            {/* BACKGROUND: Pure CSS GPU Accelerated Orbs */}
            <div 
                className="aurora-orb orb-1"
                style={{ position: 'absolute', top: '-20%', left: '-10%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} 
            />
            <div 
                className="aurora-orb orb-2"
                style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(14, 116, 144, 0.1) 0%, transparent 70%)', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} 
            />
            
            {/* Glassmorphic Grain Overlay */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.03%22/%3E%3C/svg%3E")', pointerEvents: 'none', zIndex: 1 }} />

            {/* SECTION 1: Clean, Human Call to Action */}
            <div style={{ maxWidth: '1200px', marginTop: 0, marginRight: 'auto', marginBottom: '6rem', marginLeft: 'auto', padding: '0 5%', textAlign: 'center', position: 'relative', zIndex: 2 }}>
                
                {/* Hardware Accelerated Floating Div */}
                <div className="smooth-float">
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '1.5rem' }}>
                            Have an idea? <br />
                            <span style={{ color: 'var(--accent-green)' }}>Let's build it together.</span>
                        </h2>
                        
                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8, maxWidth: '500px', margin: '0 auto' }}>
                            I am currently available for freelance work, collaborative projects, and full-time opportunities.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* SECTION 2: Flawless Smooth Tilted Marquee Layout */}
            <div style={{ position: 'relative', width: '100vw', transform: 'rotate(-2.5deg) scale(1.05)', background: 'rgba(255, 255, 255, 0.02)', borderTop: '1px solid rgba(255, 255, 255, 0.05)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', padding: '1.5rem 0', marginBottom: '6rem', zIndex: 2, display: 'flex', overflow: 'hidden', backdropFilter: 'blur(10px)' }}>
                
                {/* Pure CSS hardware-accelerated marquee track */}
                <div className="smooth-marquee" style={{ display: 'flex', width: 'max-content' }}>
                    
                    {/* SET 1 */}
                    <div style={{ display: 'flex', whiteSpace: 'nowrap', paddingRight: '3rem' }}>
                        {marqueeSkills.map((skill, index) => (
                            <div key={`set1-${index}`} style={{ display: 'flex', alignItems: 'center', marginRight: '3rem' }}>
                                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: index % 2 === 0 ? 'transparent' : 'var(--accent-green)', WebkitTextStroke: index % 2 === 0 ? '1px rgba(255,255,255,0.4)' : 'none', fontFamily: 'monospace', letterSpacing: '1px' }}>
                                    {skill}
                                </span>
                                <div style={{ width: '8px', height: '8px', background: 'var(--accent-green)', borderRadius: '50%', marginLeft: '3rem' }} />
                            </div>
                        ))}
                    </div>

                    {/* SET 2 (Duplicate for Seamless Loop) */}
                    <div style={{ display: 'flex', whiteSpace: 'nowrap', paddingRight: '3rem' }}>
                        {marqueeSkills.map((skill, index) => (
                            <div key={`set2-${index}`} style={{ display: 'flex', alignItems: 'center', marginRight: '3rem' }}>
                                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: index % 2 === 0 ? 'transparent' : 'var(--accent-green)', WebkitTextStroke: index % 2 === 0 ? '1px rgba(255,255,255,0.4)' : 'none', fontFamily: 'monospace', letterSpacing: '1px' }}>
                                    {skill}
                                </span>
                                <div style={{ width: '8px', height: '8px', background: 'var(--accent-green)', borderRadius: '50%', marginLeft: '3rem' }} />
                            </div>
                        ))}
                    </div>

                </div>
            </div>

            {/* SECTION 3: Simple Bottom Grid (Icons & Copyright) */}
            <div style={{ maxWidth: '1400px', marginTop: 0, marginRight: 'auto', marginBottom: '3rem', marginLeft: 'auto', padding: '0 5%', position: 'relative', zIndex: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '3rem' }}>
                
                {/* Left: The Social Icons */}
                <div>
                    <p style={{ color: '#fff', fontSize: '1rem', marginBottom: '1.5rem', fontWeight: 600 }}>Socials</p>
                    <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                        <MagneticButton>
                            <a href="https://pk.linkedin.com/in/syedfarhandanish" target="_blank" rel="noopener noreferrer" className="icon-link" aria-label="LinkedIn">
                                <Icons.LinkedIn />
                            </a>
                        </MagneticButton>

                        <MagneticButton>
                            <a href="https://wa.me/923465092108" target="_blank" rel="noopener noreferrer" className="icon-link" aria-label="WhatsApp">
                                <Icons.WhatsApp />
                            </a>
                        </MagneticButton>

                        <MagneticButton>
                            <a href="mailto:cyedfarhandanish@gmail.com" className="icon-link" aria-label="Email">
                                <Icons.Email />
                            </a>
                        </MagneticButton>

                        <MagneticButton>
                            <a href="https://github.com/syedfarhandanish" target="_blank" rel="noopener noreferrer" className="icon-link" aria-label="GitHub">
                                <Icons.GitHub />
                            </a>
                        </MagneticButton>
                    </div>
                </div>

                {/* Right: Simple Details */}
                <div style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px', marginBottom: '10px' }}>
                        <div style={{ width: '8px', height: '8px', background: 'var(--accent-green)', borderRadius: '50%', boxShadow: '0 0 10px var(--accent-green)' }} />
                        <p style={{ color: 'var(--text-main)', fontSize: '1rem', margin: 0 }}>Available for work</p>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: '0 0 5px 0' }}>
                        Based in Mastuj, Pakistan
                    </p>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>
                        &copy; {currentYear} Syed Farhan Danish.
                    </p>
                </div>
            </div>

            {/* CSS Logic for Hover States, Torch, and GPU Animations */}
            <style dangerouslySetInnerHTML={{__html: `
                /* 1. GPU ACCELERATED MARQUEE */
                .smooth-marquee {
                    animation: marqueeMove 30s linear infinite;
                    will-change: transform;
                }
                @keyframes marqueeMove {
                    0% { transform: translate3d(0, 0, 0); }
                    100% { transform: translate3d(-50%, 0, 0); }
                }

                /* 2. GPU ACCELERATED FLOATING TEXT */
                .smooth-float {
                    animation: floatMove 6s ease-in-out infinite;
                    will-change: transform;
                }
                @keyframes floatMove {
                    0%, 100% { transform: translate3d(0, 0, 0); }
                    50% { transform: translate3d(0, -12px, 0); }
                }

                /* 3. GPU ACCELERATED BACKGROUND ORBS */
                .orb-1 {
                    animation: orbMove1 15s ease-in-out infinite;
                    will-change: transform;
                }
                .orb-2 {
                    animation: orbMove2 20s ease-in-out infinite;
                    will-change: transform;
                }
                @keyframes orbMove1 {
                    0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
                    50% { transform: translate3d(100px, -50px, 0) scale(1.1); }
                }
                @keyframes orbMove2 {
                    0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
                    50% { transform: translate3d(-100px, 50px, 0) scale(1.2); }
                }

                /* THE TORCH SPOTLIGHT LOGIC */
                .torch-spotlight {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    background: radial-gradient(
                        circle 400px at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                        rgba(16, 185, 129, 0.08), 
                        transparent 80%
                    );
                    z-index: 1;
                    opacity: 0;
                    transition: opacity 0.5s ease;
                    will-change: background;
                }
                
                .footer-container:hover .torch-spotlight {
                    opacity: 1;
                }

                /* ICON HOVER LOGIC */
                .icon-link {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 55px;
                    height: 55px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    color: #fff;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    backdrop-filter: blur(10px);
                }
                .icon-link:hover {
                    background: var(--accent-green);
                    border-color: var(--accent-green);
                    color: #020617;
                    transform: scale(1.1);
                    box-shadow: 0 10px 20px rgba(16, 185, 129, 0.3);
                }

                @media (max-width: 768px) {
                    .icon-link {
                        width: 50px;
                        height: 50px;
                    }
                    div[style*="text-align: right"] {
                        text-align: left !important;
                    }
                    div[style*="justify-content: flex-end"] {
                        justify-content: flex-start !important;
                    }
                }
            `}} />
        </footer>
    );
}