"use client";
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const pathname = usePathname();
    const isHome = pathname === '/';

    const [isScrolled, setIsScrolled] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [activeSection, setActiveSection] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { name: 'About', id: '#about' },
        { name: 'Skills', id: '#skills' },
        { name: 'Experience', id: '#experience' },
        { name: 'Projects', id: '#projects' },
    ];

    useEffect(() => {
        // 1. Handle shrinking the header padding on scroll
        const handleScroll = () => setIsScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll, { passive: true });

        // 2. SCROLL-SPY LOGIC (Tracks which section is currently in view)
        const observerOptions = {
            root: null,
            // Triggers when the section crosses the middle of the viewport
            rootMargin: '-30% 0px -50% 0px', 
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe all sections mapped in the navLinks
        navLinks.forEach((link) => {
            const sectionId = link.id.substring(1); // Removes the '#'
            const element = document.getElementById(sectionId);
            if (element) observer.observe(element);
        });

        // Clear active state if scrolled to the absolute top
        const topScrollCheck = () => {
            if (window.scrollY < 100) setActiveSection('');
        };
        window.addEventListener('scroll', topScrollCheck, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('scroll', topScrollCheck);
            observer.disconnect();
        };
    }, []);

    // Smooth scroll directly to sections
    const handleScrollTo = (e, id) => {
        if (isHome) {
            e.preventDefault();
            setIsMobileMenuOpen(false);
            const element = document.querySelector(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <motion.header 
            initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ 
                position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 100,
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                padding: isScrolled ? '20px 5%' : '40px 5%',
                transition: 'padding 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                pointerEvents: 'none' // Allows clicking elements behind the empty space of the header
            }}
        >
            {/* FAR LEFT: Brand Logo (Now links to Home / Top) */}
            <div style={{ position: 'absolute', left: '5%', pointerEvents: 'auto' }}>
                <Link 
                    href="/" 
                    onClick={(e) => {
                        if (isHome) {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                    }} 
                    className="brand-logo" 
                    style={{ color: '#fff', textDecoration: 'none', fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-0.5px' }}
                >
                    SFD<span style={{ color: 'var(--accent-green)' }}>.</span>
                </Link>
            </div>

            {/* DEAD CENTER: The Floating Glass Capsule */}
            <div className="desktop-capsule" style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                background: 'rgba(2, 6, 23, 0.6)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: '1px solid rgba(255,255,255,0.06)',
                padding: '6px',
                borderRadius: '100px',
                pointerEvents: 'auto',
                boxShadow: isScrolled ? '0 20px 40px rgba(0,0,0,0.4)' : 'none',
                transition: 'box-shadow 0.5s ease'
            }}>
                {navLinks.map((link, index) => {
                    const isActive = activeSection === link.id.substring(1);
                    const isHovered = hoveredIndex === index;

                    return (
                        <Link
                            key={link.name}
                            href={isHome ? link.id : `/${link.id}`}
                            onClick={(e) => handleScrollTo(e, link.id)}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            style={{
                                position: 'relative',
                                padding: '10px 24px',
                                // If active OR hovered, turn text white
                                color: isActive || isHovered ? '#fff' : 'var(--text-muted)',
                                fontSize: '0.9rem',
                                fontWeight: 500,
                                textDecoration: 'none',
                                transition: 'color 0.3s ease',
                                borderRadius: '50px',
                                zIndex: 2
                            }}
                        >
                            {/* The Permanent "Active" Pill */}
                            {isActive && (
                                <motion.div
                                    layoutId="capsule-active"
                                    style={{
                                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                        background: 'rgba(255, 255, 255, 0.12)',
                                        borderRadius: '50px',
                                        zIndex: -1
                                    }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                />
                            )}
                            
                            {/* The Subtler "Hover" Pill (Only shows if NOT active) */}
                            {isHovered && !isActive && (
                                <motion.div
                                    layoutId="capsule-hover"
                                    style={{
                                        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        borderRadius: '50px',
                                        zIndex: -1
                                    }}
                                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                />
                            )}
                            
                            {link.name}
                        </Link>
                    );
                })}
            </div>

            {/* FAR RIGHT: Call to Action / Mobile Toggle */}
            <div style={{ position: 'absolute', right: '5%', pointerEvents: 'auto', display: 'flex', alignItems: 'center' }}>
                <Link href={isHome ? '#contact' : '/#contact'} onClick={(e) => handleScrollTo(e, '#contact')} className="nav-contact-btn">
                    <div className="status-dot" /> Let's Talk
                </Link>
                
                {/* Hamburger Menu (Only visible on Mobile) */}
                <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        {isMobileMenuOpen ? <><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></> : <><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></>}
                    </svg>
                </button>
            </div>

            {/* FULL SCREEN MOBILE MENU */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, filter: 'blur(10px)' }} 
                        animate={{ opacity: 1, filter: 'blur(0px)' }} 
                        exit={{ opacity: 0, filter: 'blur(10px)' }}
                        style={{
                            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                            background: 'rgba(2, 6, 23, 0.98)', zIndex: 99,
                            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '30px', pointerEvents: 'auto'
                        }}
                    >
                        {navLinks.map((link) => (
                            <Link 
                                key={link.name} 
                                href={isHome ? link.id : `/${link.id}`} 
                                onClick={(e) => handleScrollTo(e, link.id)}
                                className="mobile-link"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link href={isHome ? '#contact' : '/#contact'} onClick={(e) => handleScrollTo(e, '#contact')} className="mobile-link" style={{ color: 'var(--accent-green)', marginTop: '20px' }}>Let's Talk</Link>
                    </motion.div>
                )}
            </AnimatePresence>

            <style dangerouslySetInnerHTML={{__html: `
                .nav-contact-btn {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 12px 24px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: #fff;
                    font-size: 0.9rem;
                    font-weight: 600;
                    text-decoration: none;
                    border-radius: 50px;
                    transition: all 0.3s ease;
                }
                .nav-contact-btn:hover {
                    background: #fff;
                    color: #020617;
                }
                .status-dot {
                    width: 6px; height: 6px; border-radius: 50%;
                    background: var(--accent-green);
                    box-shadow: 0 0 10px var(--accent-green);
                }
                .mobile-toggle { display: none; background: none; border: none; color: #fff; cursor: pointer; z-index: 101; position: relative; }
                .mobile-link { color: #fff; text-decoration: none; font-size: 2.5rem; font-weight: 800; letter-spacing: -1px; transition: color 0.3s ease; }
                .mobile-link:hover { color: var(--accent-green); }

                @media (max-width: 900px) {
                    .desktop-capsule { display: none !important; }
                    .nav-contact-btn { display: none !important; }
                    .mobile-toggle { display: block !important; }
                }
            `}} />
        </motion.header>
    );
}