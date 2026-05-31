"use client";
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const experiences = [
    {
        id: "01",
        role: "Front-End Developer & UI Architect",
        company: "Independent Projects & Ecosystems",
        period: "2024 — Present",
        description: "Engineered and deployed multiple high-performance platforms including the Collabs EdTech ecosystem and the Cosmopolitan Hostel portfolio. Specializing in Next.js, dynamic routing, 3D WebGL integrations, and glassmorphic UI architecture.",
        skills: ["Next.js", "Three.js", "Vercel", "Framer Motion"]
    },
    {
        id: "02",
        role: "Deputy President",
        company: "Aga Khan Higher Secondary School (AKHSS), Booni",
        period: "2025 — 2026",
        description: "Leading student council initiatives, organizing technical and cultural events, and acting as the primary liaison between the student body and administration. Advocating for digital literacy and educational resource accessibility.",
        skills: ["Leadership", "Event Management", "Public Speaking"]
    },
    {
        id: "03",
        role: "Youth Ambassador",
        company: "Mera Sawera",
        period: "2025 — Present",
        description: "Representing the organization to empower local youth, driving community-focused initiatives, and promoting educational outreach programs to bridge the opportunity gap in remote, mountainous regions.",
        skills: ["Youth Advocacy", "Community Outreach", "Networking"]
    }
];

export default function Experience() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const lineScale = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section id="experience" ref={containerRef} style={{ position: 'relative', overflow: 'hidden' }}>
            
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.03, backgroundImage: 'radial-gradient(circle at 50% 50%, #10b981 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />

            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                style={{ textAlign: 'center', marginBottom: 'var(--space-section)' }}
            >
                <h2 className="section-title" style={{ display: 'inline-block' }}>Experience</h2>
            </motion.div>

            <div style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto' }}>
                
                <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'rgba(255,255,255,0.05)', transform: 'translateX(-50%)' }}>
                    <motion.div 
                        style={{ width: '100%', height: lineScale, background: 'var(--accent-green)', boxShadow: '0 0 20px 2px var(--accent-green)' }} 
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-section)' }}>
                    {experiences.map((exp, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <div key={exp.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: isEven ? 'row' : 'row-reverse', width: '100%' }}>
                                
                                <motion.div 
                                    initial={{ opacity: 0, x: isEven ? -50 : 50, filter: "blur(10px)" }}
                                    whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
                                    style={{ width: '45%', position: 'relative' }}
                                    className="experience-card-wrapper"
                                >
                                    <div style={{ position: 'absolute', top: -5, left: -5, width: 20, height: 20, borderTop: '2px solid var(--accent-green)', borderLeft: '2px solid var(--accent-green)', zIndex: 10 }} />
                                    <div style={{ position: 'absolute', bottom: -5, right: -5, width: 20, height: 20, borderBottom: '2px solid var(--accent-green)', borderRight: '2px solid var(--accent-green)', zIndex: 10 }} />

                                    <div className="glass-card" style={{ position: 'relative', zIndex: 1, border: '1px solid rgba(16, 185, 129, 0.1)', transition: 'border-color 0.3s ease, box-shadow 0.3s ease' }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.5)';
                                            e.currentTarget.style.boxShadow = '0 0 30px rgba(16, 185, 129, 0.1)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = 'rgba(16, 185, 129, 0.1)';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >
                                        {/* THE FIX APPLIED HERE: Added gap: '15px' and flexWrap: 'wrap' */}
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '15px', flexWrap: 'wrap', marginBottom: 'var(--space-sm)' }}>
                                            <h3 style={{ color: 'var(--text-main)', fontSize: 'var(--text-xl)', fontWeight: 700, margin: 0 }}>{exp.role}</h3>
                                            
                                            {/* THE FIX APPLIED HERE: Added whiteSpace: 'nowrap' so the badge doesn't break into two lines */}
                                            <span style={{ color: 'var(--accent-green)', fontFamily: 'monospace', fontSize: 'var(--text-xs)', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '5px 10px', borderRadius: '4px', whiteSpace: 'nowrap' }}>
                                                {exp.period}
                                            </span>
                                        </div>
                                        
                                        <h4 style={{ color: '#ffffff', fontSize: 'var(--text-lg)', marginBottom: 'var(--space-md)', opacity: 0.9 }}>{exp.company}</h4>
                                        <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: 'var(--space-lg)', fontSize: 'var(--text-base)' }}>{exp.description}</p>
                                        
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                            {exp.skills.map((skill, i) => (
                                                <span key={i} style={{ color: 'var(--text-muted)', fontSize: 'var(--text-xs)', padding: '4px 12px', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', background: 'rgba(0,0,0,0.2)' }}>
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>

                                <div style={{ width: '10%', display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
                                    <motion.div 
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        viewport={{ once: true, margin: "-150px" }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        style={{ width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#0b0f19', border: '4px solid var(--accent-green)', boxShadow: '0 0 15px var(--accent-green)' }}
                                    />
                                </div>

                                <div style={{ width: '45%' }}>
                                    <motion.div 
                                        initial={{ opacity: 0, x: isEven ? 20 : -20 }}
                                        whileInView={{ opacity: 0.05, x: 0 }}
                                        viewport={{ once: true }}
                                        className="watermark-number"
                                        style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', fontWeight: 900, color: '#fff', textAlign: isEven ? 'left' : 'right', lineHeight: 1, userSelect: 'none' }}
                                    >
                                        {exp.id}
                                    </motion.div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style jsx>{`
                @media (max-width: 768px) {
                    .experience-card-wrapper {
                        width: 100% !important;
                    }
                    div[style*="width: 10%"] {
                        display: none !important;
                    }
                    div[style*="width: 45%"]:empty, .watermark-number {
                        display: none !important;
                    }
                    div[style*="left: 50%"] {
                        left: 0 !important;
                    }
                }
            `}</style>
        </section>
    );
}