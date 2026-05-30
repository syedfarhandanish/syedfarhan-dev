"use client";
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from '../../../components/Footer';

// The Project Database
const caseStudies = {
    'xylem': {
        title: 'Xylem Innovation',
        subtitle: 'Engineering a highly intuitive water-usage governance platform for modern researchers.',
        role: 'Lead UI/UX Designer',
        timeline: 'May — Aug 2025',
        services: ['Wireframing', 'Prototyping', 'User Research'],
        tech: ['Figma', 'React', 'Tailwind CSS'],
        challenge: 'Ecological data is inherently complex. Our team faced the hurdle of translating massive data streams into a format that local authorities and researchers could use for real-time decision making without feeling overwhelmed by raw numbers.',
        solution: 'I completely restructured the information architecture. By utilizing progressive disclosure, the dashboard now only shows top-level health metrics first. Users can then click into specific water streams to reveal detailed, interactive charts, removing the cognitive overload and making governance decisions much faster.',
        impact: [
            { metric: '40%', label: 'Faster Data Retrieval' },
            { metric: '12+', label: 'Custom UI Components' },
            { metric: '100%', label: 'Mobile Responsive' }
        ]
    },
    'collabs-mail': {
        title: 'Collabs Mail',
        subtitle: 'Architecting a secure, enterprise-grade communication router for the EdTech ecosystem.',
        role: 'DevOps & Infra',
        timeline: 'April 2026',
        services: ['DNS Mapping', 'API Integration', 'Cloud Security'],
        tech: ['Zoho Mail API', 'Vercel', 'Domain Admin'],
        challenge: 'Within the expanding Collabs EdTech ecosystem, students lacked a secure, specialized, and professional communication router. Using personal emails for academic collaboration was inefficient and created a barrier to effective network communication.',
        solution: 'I independently built and configured a custom enterprise-grade email infrastructure. I navigated domain registrar consoles to implement advanced DNS mapping—including MX, TXT, and CNAME records—to bypass spam filters and authenticate the network securely.',
        impact: [
            { metric: 'Zero', label: 'Downtime Logged' },
            { metric: '100%', label: 'Encrypted Routing' },
            { metric: 'Scalable', label: 'User Architecture' }
        ]
    }
};

export default function ProjectPage({ params }) {
    const { slug } = React.use(params);
    const project = caseStudies[slug];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!project) return <div style={{ padding: '200px', textAlign: 'center' }}><h1>Project not found</h1></div>;

    const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };
    const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

    return (
        <div style={{ backgroundColor: '#020617', minHeight: '100vh', color: '#fff', overflowX: 'hidden' }}>
            
            {/* NAVBAR PURPOSEFULLY REMOVED FOR IMMERSIVE READING MODE */}

            <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 5% 100px 5%' }}>
                
                {/* THE PREMIUM BACK BUTTON */}
                {/* Using a standard HTML link forces a fresh navigation to the home page anchors */}
                <a href="/#projects" className="premium-back-btn">
                    <span className="arrow-icon">&larr;</span>
                    Back to Portfolio
                </a>

                {/* THE EDITORIAL HERO */}
                <motion.div variants={staggerContainer} initial="hidden" animate="visible" style={{ marginBottom: '6rem' }}>
                    <motion.h1 variants={fadeUp} style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-2px', marginBottom: '2rem' }}>
                        {project.title}<span style={{ color: 'var(--accent-green)' }}>.</span>
                    </motion.h1>
                    <motion.p variants={fadeUp} style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', color: 'var(--text-muted)', maxWidth: '800px', lineHeight: 1.5 }}>
                        {project.subtitle}
                    </motion.p>
                </motion.div>

                {/* THE BENTO BOX GRID (Metadata) */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '8rem' }}
                >
                    <div className="bento-card">
                        <h5>Role</h5>
                        <p>{project.role}</p>
                    </div>
                    <div className="bento-card">
                        <h5>Timeline</h5>
                        <p>{project.timeline}</p>
                    </div>
                    <div className="bento-card">
                        <h5>Services</h5>
                        <p>{project.services.join(', ')}</p>
                    </div>
                    <div className="bento-card" style={{ background: 'rgba(16, 185, 129, 0.03)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                        <h5 style={{ color: 'var(--accent-green)' }}>Technologies</h5>
                        <p style={{ color: '#fff' }}>{project.tech.join(' / ')}</p>
                    </div>
                </motion.div>

                {/* ASYMMETRICAL STORYTELLING SECTION */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8rem', marginBottom: '8rem' }}>
                    
                    {/* Block 1: Challenge */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>
                        <h3 style={{ fontSize: '2.5rem', fontWeight: 300, color: 'var(--text-muted)' }}>The<br/><strong style={{ color: '#fff', fontWeight: 800 }}>Challenge</strong></h3>
                        <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--text-muted)' }}>{project.challenge}</p>
                    </div>

                    {/* Block 2: Visual Placeholder */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
                        style={{ width: '100%', height: '60vh', minHeight: '400px', background: 'rgba(255,255,255,0.02)', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', position: 'relative' }}
                    >
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '50%', height: '50%', background: 'var(--accent-green)', filter: 'blur(150px)', opacity: 0.1 }} />
                        <span style={{ color: 'rgba(255,255,255,0.2)', fontFamily: 'monospace', letterSpacing: '2px' }}>[ Interface Visual Placeholder ]</span>
                    </motion.div>

                    {/* Block 3: Solution */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>
                        <h3 style={{ fontSize: '2.5rem', fontWeight: 300, color: 'var(--text-muted)' }}>The<br/><strong style={{ color: 'var(--accent-green)', fontWeight: 800 }}>Solution</strong></h3>
                        <p style={{ fontSize: '1.2rem', lineHeight: 1.8, color: 'var(--text-muted)' }}>{project.solution}</p>
                    </div>

                </div>

                {/* IMPACT METRICS */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '6rem', marginBottom: '4rem' }}>
                    <h3 style={{ fontSize: '2rem', marginBottom: '3rem', textAlign: 'center', fontWeight: 600 }}>Project Impact</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                        {project.impact.map((item, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                                className="bento-card text-center"
                                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}
                            >
                                <h2 style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--accent-green)', marginBottom: '10px' }}>{item.metric}</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>{item.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </main>

            <Footer />

            <style dangerouslySetInnerHTML={{__html: `
                .premium-back-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    padding: 12px 24px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 50px;
                    color: var(--text-muted);
                    text-decoration: none;
                    font-size: 0.95rem;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                    margin-bottom: 4rem;
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .arrow-icon {
                    transition: transform 0.3s ease;
                }
                .premium-back-btn:hover {
                    background: #fff;
                    color: #020617;
                    border-color: #fff;
                    box-shadow: 0 10px 20px rgba(255,255,255,0.1);
                }
                .premium-back-btn:hover .arrow-icon {
                    transform: translateX(-4px);
                }

                .bento-card {
                    background: rgba(255,255,255,0.02);
                    border: 1px solid rgba(255,255,255,0.05);
                    border-radius: 20px;
                    padding: 2.5rem;
                    backdrop-filter: blur(10px);
                    transition: all 0.3s ease;
                }
                .bento-card:hover {
                    background: rgba(255,255,255,0.04);
                    border-color: rgba(255,255,255,0.1);
                    transform: translateY(-5px);
                }
                .bento-card h5 {
                    color: var(--text-muted);
                    font-size: 0.85rem;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    margin-bottom: 15px;
                }
                .bento-card p {
                    color: #fff;
                    font-size: 1.1rem;
                    font-weight: 500;
                    margin: 0;
                    line-height: 1.5;
                }
            `}} />
        </div>
    );
}