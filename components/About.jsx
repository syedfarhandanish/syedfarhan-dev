"use client";
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import TiltCard from './TiltCard';
import MagneticButton from './MagneticButton';

export default function About() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Animate the tracking line based on scroll
    const lineHeight = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

    const slideUp = {
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
    };

    const skillsList = [
        "Next.js", "React Architecture", "Three.js", "Tailwind CSS", 
        "Figma Prototyping", "UI/UX Dynamics", "Node.js", "Vercel Deployment", "DNS Config"
    ];
    const infiniteSkills = [...skillsList, ...skillsList];

    return (
        // Removed hardcoded padding. Globals.css now auto-applies var(--space-section) to <section>
        <section id="about" ref={containerRef} style={{ position: 'relative' }}>
            
            {/* Background Decorative Elements */}
            <div style={{ position: 'absolute', top: '10%', right: '5%', opacity: 0.1, pointerEvents: 'none' }}>
                <svg width="200" height="200" viewBox="0 0 100 100" className="animate-spin-slow">
                    <circle cx="50" cy="50" r="49" fill="none" stroke="#10b981" strokeWidth="0.5" strokeDasharray="5 5" />
                    <rect x="25" y="25" width="50" height="50" fill="none" stroke="#10b981" strokeWidth="0.5" transform="rotate(45 50 50)" />
                </svg>
            </div>

            <motion.div 
                initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={slideUp}
                style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: 'var(--space-lg)' }}
            >
                <h2 className="section-title" style={{ margin: 0 }}>Profile</h2>
                <div style={{ height: '1px', flex: 1, background: 'linear-gradient(90deg, rgba(16, 185, 129, 0.5), transparent)' }} />
            </motion.div>

            {/* FLUID AUTO-FIT GRID: Automatically drops to 1 column on mobile phones */}
            <div className="about-grid">
                
                {/* LEFT: The Biometric Scanner Photo & Perspective Skills */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, type: "spring", damping: 20 }}
                    style={{ width: '100%', position: 'relative' }}
                >
                    <TiltCard className="about-image-wrapper" style={{ padding: '0', borderRadius: '0px', border: '1px solid rgba(16, 185, 129, 0.4)', position: 'relative', overflow: 'hidden' }}>
                        
                        {/* 1. Base Image with Duotone Filter effect */}
                        <div style={{ position: 'relative', filter: 'contrast(1.1) saturate(1.2)' }}>
                            <Image 
                                src="/images/profilepic.png" 
                                alt="Syed Farhan Danish" 
                                width={500} height={600} priority
                                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
                            />
                        </div>
                        
                        {/* 2. Biometric Scanner Laser Line */}
                        <motion.div 
                            animate={{ top: ["-10%", "110%"] }} 
                            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                            style={{ position: 'absolute', left: 0, width: '100%', height: '3px', background: 'rgba(16, 185, 129, 0.8)', boxShadow: '0 0 20px 5px rgba(16, 185, 129, 0.5)', zIndex: 2 }}
                        />

                        {/* 3. Dark Fade Overlay */}
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(11, 15, 25, 0.95), rgba(11, 15, 25, 0.2))', zIndex: 3, pointerEvents: 'none' }} />

                        {/* 4. Creative Typography Skills Scroll */}
                        <div style={{
                            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 4, pointerEvents: 'none',
                            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 10%, black 30%, transparent 50%)',
                            maskImage: 'linear-gradient(to top, transparent 0%, black 10%, black 30%, transparent 50%)',
                            transform: 'perspective(600px) rotateX(15deg) scale(1.1)',
                            transformOrigin: 'bottom center'
                        }}>
                            <motion.div
                                animate={{ y: [0, "-50%"] }} 
                                transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
                                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-md)', paddingTop: 'var(--space-lg)' }}
                            >
                                {infiniteSkills.map((skill, index) => {
                                    let textStyle = {};
                                    if (index % 3 === 0) {
                                        textStyle = { color: 'transparent', WebkitTextStroke: '1px rgba(16, 185, 129, 0.9)' }; 
                                    } else if (index % 2 === 0) {
                                        textStyle = { color: '#ffffff', textShadow: '0 0 15px rgba(255, 255, 255, 0.5)' }; 
                                    } else {
                                        textStyle = { color: 'rgba(16, 185, 129, 0.5)', textShadow: '0 0 10px rgba(16, 185, 129, 0.8)' }; 
                                    }

                                    return (
                                        <span key={index} style={{
                                            ...textStyle,
                                            fontSize: 'var(--text-3xl)', // Fluid typography
                                            fontWeight: 900,
                                            textTransform: 'uppercase',
                                            letterSpacing: '3px',
                                            whiteSpace: 'nowrap',
                                            fontFamily: 'monospace' 
                                        }}>
                                            {skill}
                                        </span>
                                    );
                                })}
                            </motion.div>
                        </div>
                    </TiltCard>
                </motion.div>

                {/* RIGHT: The Data Nodes Bio Timeline */}
                {/* Cleaned up left padding to be fluid and prevent mobile horizontal scrollbars */}
                <div style={{ width: '100%', position: 'relative', paddingLeft: 'clamp(30px, 4vw, 50px)' }}>
                    
                    {/* The Animated Glowing Timeline Track */}
                    <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', background: 'rgba(255,255,255,0.05)' }}>
                        <motion.div style={{ width: '100%', height: lineHeight, background: 'var(--accent-green)', boxShadow: '0 0 15px var(--accent-green)' }} />
                    </div>

                    {/* Node 1 */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideUp} style={{ position: 'relative', marginBottom: 'var(--space-section)' }}>
                        <div style={{ position: 'absolute', left: 'calc(-1 * clamp(30px, 4vw, 50px) - 6px)', top: '8px', width: '14px', height: '14px', borderRadius: '50%', background: '#0b0f19', border: '2px solid var(--accent-green)' }} />
                        <h3 style={{ color: 'var(--text-main)', fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-sm)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--accent-green)', fontFamily: 'monospace', fontWeight: 400 }}>// 01</span> 
                            My Mission
                        </h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: 'var(--text-base)', background: 'rgba(255,255,255,0.02)', padding: 'var(--space-md)', borderLeft: '1px solid rgba(16,185,129,0.2)' }}>
                            Growing up surrounded by the mountainous terrain of Mastuj, my journey into technology was driven by a desire to bridge the gap between remote local talent and global opportunities. Witnessing a disconnect between brilliant students and digital access, I used my technical skills to deploy <strong style={{ color: '#fff' }}>Collabs</strong>—an EdTech ecosystem designed to democratize resource distribution.
                        </p>
                    </motion.div>

                    {/* Node 2 */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideUp} style={{ position: 'relative', marginBottom: 'var(--space-section)' }}>
                        <div style={{ position: 'absolute', left: 'calc(-1 * clamp(30px, 4vw, 50px) - 6px)', top: '8px', width: '14px', height: '14px', borderRadius: '50%', background: '#0b0f19', border: '2px solid var(--accent-green)' }} />
                        <h3 style={{ color: 'var(--text-main)', fontSize: 'var(--text-2xl)', fontWeight: 700, marginBottom: 'var(--space-sm)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--accent-green)', fontFamily: 'monospace', fontWeight: 400 }}>// 02</span> 
                            My Vision
                        </h3>
                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: 'var(--text-base)', background: 'rgba(255,255,255,0.02)', padding: 'var(--space-md)', borderLeft: '1px solid rgba(16,185,129,0.2)' }}>
                            Beyond code, I am actively strengthening my foundation in advanced mathematics and physics to prepare for future explorations in <strong style={{ color: '#fff' }}>Artificial Intelligence</strong> and <strong style={{ color: '#fff' }}>Quantum Computing</strong>. When I am not optimizing web architectures, you will find me trekking the mountains with friends or preserving my cultural heritage with my hostel&apos;s Music Club.
                        </p>
                    </motion.div>

                    {/* Node 3 (Resume Download) */}
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={slideUp} style={{ position: 'relative' }}>
                        <div style={{ position: 'absolute', left: 'calc(-1 * clamp(30px, 4vw, 50px) - 6px)', top: '15px', width: '14px', height: '14px', borderRadius: '50%', background: 'var(--accent-green)', boxShadow: '0 0 10px var(--accent-green)' }} />
                        <div className="glass-card" style={{ borderLeft: '3px solid var(--accent-green)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--space-md)' }}>
                            <div>
                                <h4 style={{ color: 'var(--text-main)', fontSize: 'var(--text-xl)', marginBottom: '5px' }}>My Resume</h4>
                                <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: 'var(--text-sm)' }}>Extract the complete academic and project data logs.</p>
                            </div>
                            <MagneticButton>
                                {/* Removed inline padding to utilize the fluid .btn class */}
                                <a 
                                    href="/Syed_Farhan_Resume.pdf" 
                                    download="Syed_Farhan_Resume.pdf" 
                                    className="btn primary-btn" 
                                    aria-label="Download Syed Farhan Danish Resume"
                                >
                                    Download Resume 
                                    <span style={{ marginLeft: '10px' }}>&darr;</span>
                                </a>
                            </MagneticButton>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}