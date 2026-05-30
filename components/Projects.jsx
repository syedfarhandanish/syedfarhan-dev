"use client";
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import MagneticButton from './MagneticButton';

const projectsData = [
    {
        id: "01",
        title: "Xylem Innovation App",
        description: "Served as the core UI/UX Designer inside a 5-member collaborative engineering team to design an intuitive water-usage governance application handling critical ecological data streams.",
        tech: ["UI/UX Design", "System Prototyping", "Eco-Tech"],
        caseStudy: "/projects/xylem",
        liveLink: null,
        status: "CASE STUDY",
    },
    {
        id: "02",
        title: "Collabs Mail Infrastructure",
        description: "Prototyped a secure, specialized student communications router, utilizing custom Zoho Mail deployment integrations alongside advanced MX, TXT, and CNAME DNS mapping.",
        tech: ["DNS Config", "Zoho API", "DevOps"],
        caseStudy: "/projects/collabs-mail",
        liveLink: "https://www.collabsmail.eu.org",
        status: "LIVE & STUDY",
    },
    {
        id: "03",
        title: "Collabs Drop",
        description: "A high-performance, web-based asset distribution and cloud storage tool built into the Next.js ecosystem to facilitate seamless peer-to-peer file sharing.",
        tech: ["Next.js", "React", "Cloud Storage"],
        caseStudy: null,
        liveLink: "https://collabsdrop.vercel.app/",
        status: "DEPLOYED",
    },
    {
        id: "04",
        title: "QR Lab",
        description: "Engineered a Progressive Web App (PWA) resource-access system utilizing custom QR-code generation matrix logic for instant academic file retrieval and mobile performance optimization.",
        tech: ["PWA", "JavaScript", "Automation"],
        caseStudy: null,
        liveLink: "https://www.qrlab.eu.org/",
        status: "DEPLOYED",
    },
    {
        id: "05",
        title: "Collabs Flow",
        description: "A specialized productivity hub designed for students, featuring an integrated Kanban planning module, customizable Pomodoro deep-focus timers, and reactive media channels.",
        tech: ["UI/UX Architecture", "Productivity"],
        caseStudy: null,
        liveLink: "https://collabsflow.vercel.app/",
        status: "DEPLOYED",
    },
    {
        id: "06",
        title: "Cosmopolitan Boys Hostel",
        description: "Architected a client portfolio system with cross-device layout structures and custom brand-palette rules, establishing an interactive web footprint for local hospitality providers.",
        tech: ["Semantic HTML", "CSS Variables", "Responsive Engines"],
        caseStudy: null,
        liveLink: "https://cosmopolitanhostel.vercel.app/",
        status: "CLIENT DEPLOYED",
    }
];

export default function Projects() {
    // State to track which project is currently expanded
    const [activeId, setActiveId] = useState(projectsData[0].id);

    return (
        <section id="projects" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
            
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 5%' }}>
                
                {/* Header Area */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <h2 className="section-title" style={{ margin: 0 }}>Engineering Ledger</h2>
                    </motion.div>
                    
                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                        style={{ color: 'var(--accent-green)', fontFamily: 'monospace', fontSize: '1.2rem', letterSpacing: '2px', fontWeight: 700 }}>
                        [ {projectsData.length} Projects ]
                    </motion.div>
                </div>

                {/* The Kinetic Accordion Container */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    {projectsData.map((project) => {
                        const isActive = activeId === project.id;

                        return (
                            <motion.div 
                                layout // This prop tells Framer Motion to smoothly animate height changes
                                key={project.id}
                                onClick={() => setActiveId(project.id)}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
                                style={{
                                    background: isActive ? 'rgba(16, 185, 129, 0.05)' : 'rgba(255, 255, 255, 0.01)',
                                    border: isActive ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(255, 255, 255, 0.05)',
                                    borderRadius: '16px',
                                    padding: '25px 30px',
                                    cursor: 'pointer',
                                    overflow: 'hidden',
                                }}
                            >
                                {/* Top Row: Always Visible */}
                                <motion.div layout style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                        <span style={{ fontFamily: 'monospace', fontSize: '1.2rem', color: isActive ? 'var(--accent-green)' : 'rgba(255,255,255,0.3)', fontWeight: 700, transition: 'color 0.3s ease' }}>
                                            {project.id}
                                        </span>
                                        <h3 style={{ margin: 0, fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', color: isActive ? '#fff' : 'var(--text-main)', transition: 'color 0.3s ease' }}>
                                            {project.title}
                                        </h3>
                                    </div>
                                    
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: isActive ? 'var(--accent-green)' : 'rgba(255,255,255,0.2)' }} />
                                        <span style={{ fontSize: '0.9rem', letterSpacing: '1px', color: isActive ? 'var(--accent-green)' : 'var(--text-muted)' }}>
                                            {project.status}
                                        </span>
                                    </div>
                                </motion.div>

                                {/* Expanded Content Body */}
                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                        >
                                            <div style={{ paddingTop: '25px', marginTop: '20px', borderTop: '1px solid rgba(16, 185, 129, 0.1)' }}>
                                                <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '25px', maxWidth: '850px' }}>
                                                    {project.description}
                                                </p>

                                                {/* Tech Stack Pills */}
                                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '30px' }}>
                                                    {project.tech.map((tech, i) => (
                                                        <span key={i} style={{ fontSize: '0.85rem', color: '#fff', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '6px 16px', borderRadius: '20px' }}>
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Action Buttons */}
                                                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                                                    {project.caseStudy && (
                                                        <MagneticButton>
                                                            <Link href={project.caseStudy} className="btn primary-btn" style={{ padding: '12px 25px', fontSize: '1rem', display: 'inline-block' }}>
                                                                View Case Study
                                                            </Link>
                                                        </MagneticButton>
                                                    )}
                                                    {project.liveLink && (
                                                        <MagneticButton>
                                                            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn secondary-btn" style={{ padding: '12px 25px', fontSize: '1rem', display: 'inline-block' }}>
                                                                Live Deployment &rarr;
                                                            </a>
                                                        </MagneticButton>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}