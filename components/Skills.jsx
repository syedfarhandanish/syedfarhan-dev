"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// The Database of your Capabilities
const skillCategories = [
    {
        id: "architecture",
        title: "System Architecture",
        description: "Building scalable, high-performance web applications and Progressive Web Apps (PWAs) utilizing modern JavaScript frameworks and server-side rendering.",
        skills: [
            { name: "Next.js 15", level: 90 },
            { name: "React Ecosystem", level: 85 },
            { name: "Progressive Web Apps", level: 80 },
            { name: "JavaScript (ES6+)", level: 85 }
        ]
    },
    {
        id: "interface",
        title: "UI/UX Engineering",
        description: "Architecting interactive, accessible user interfaces utilizing custom glassmorphism, responsive engines, and kinematic physics animations.",
        skills: [
            { name: "Tailwind CSS", level: 95 },
            { name: "Framer Motion", level: 85 },
            { name: "Figma Prototyping", level: 75 },
            { name: "CSS Architecture", level: 90 }
        ]
    },
    {
        id: "infrastructure",
        title: "Cloud & Infrastructure",
        description: "Configuring continuous deployment pipelines, managing advanced DNS mapping (MX/TXT), and establishing secure enterprise-grade communication networks.",
        skills: [
            { name: "Vercel Deployment", level: 95 },
            { name: "DNS Routing", level: 85 },
            { name: "Zoho API Integration", level: 80 },
            { name: "Git Version Control", level: 85 }
        ]
    },
    {
        id: "foundations",
        title: "Core Foundations",
        description: "Strengthening analytical capabilities and problem-solving logic to prepare for future explorations in Quantum Computing and Artificial Intelligence.",
        skills: [
            { name: "Advanced Mathematics", level: 75 },
            { name: "Theoretical Physics", level: 70 },
            { name: "Algorithmic Logic", level: 80 },
            { name: "System Research", level: 85 }
        ]
    }
];

// The Cyber-Punk Data Server Bar Component
const StatusBar = ({ level }) => {
    const blocks = 10; // 10 segments per bar
    const filledBlocks = Math.round(level / 10);

    return (
        <div style={{ display: 'flex', gap: '6px', marginTop: '12px' }}>
            {[...Array(blocks)].map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ delay: i * 0.05, type: "spring", stiffness: 300, damping: 20 }}
                    style={{
                        height: '10px',
                        flex: 1,
                        backgroundColor: i < filledBlocks ? 'var(--accent-green)' : 'rgba(255,255,255,0.05)',
                        borderRadius: '2px',
                        boxShadow: i < filledBlocks ? '0 0 8px rgba(16, 185, 129, 0.4)' : 'none',
                        border: i < filledBlocks ? 'none' : '1px solid rgba(255,255,255,0.1)'
                    }}
                />
            ))}
        </div>
    );
};

export default function Skills() {
    const [activeTab, setActiveTab] = useState(skillCategories[0].id);

    // Find the currently active category data
    const activeData = skillCategories.find(cat => cat.id === activeTab);

    return (
        <section id="skills" style={{ paddingTop: '100px', paddingBottom: '100px', position: 'relative' }}>
            
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                style={{ marginBottom: '4rem' }}
            >
                <h2 className="section-title">Capability Matrix</h2>
            </motion.div>

            {/* The Command Center Layout */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
                
                {/* LEFT: Interactive Navigation Tabs */}
                <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {skillCategories.map((category) => {
                        const isActive = activeTab === category.id;
                        return (
                            <button
                                key={category.id}
                                onClick={() => setActiveTab(category.id)}
                                style={{
                                    textAlign: 'left',
                                    padding: '1.5rem',
                                    background: isActive ? 'rgba(16, 185, 129, 0.05)' : 'transparent',
                                    border: 'none',
                                    borderLeft: isActive ? '4px solid var(--accent-green)' : '4px solid rgba(255,255,255,0.05)',
                                    color: isActive ? '#ffffff' : 'var(--text-muted)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <span style={{ fontSize: '1.1rem', fontWeight: isActive ? 700 : 500, letterSpacing: '1px' }}>
                                    {category.title}
                                </span>
                                {isActive && (
                                    <motion.span 
                                        layoutId="activeTabIndicator"
                                        style={{ fontSize: '0.8rem', color: 'var(--accent-green)', fontFamily: 'monospace' }}
                                    >
                                        [ACTIVE]
                                    </motion.span>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* RIGHT: The Glassmorphic Data Display Panel */}
                <div style={{ flex: '2 1 600px', position: 'relative' }}>
                    <div className="glass-card" style={{ padding: '3rem', minHeight: '400px', borderTop: '4px solid var(--accent-green)' }}>
                        
                        {/* Blinking "Online" indicator */}
                        <div style={{ position: 'absolute', top: '1.5rem', right: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <motion.div 
                                animate={{ opacity: [1, 0.3, 1] }} 
                                transition={{ repeat: Infinity, duration: 2 }}
                                style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-green)', boxShadow: '0 0 10px var(--accent-green)' }}
                            />
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', fontFamily: 'monospace' }}>SYS_ONLINE</span>
                        </div>

                        {/* Crossfade Animation Container */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab} // Changing the key triggers the unmount/mount animation
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <h3 style={{ fontSize: '2rem', color: 'var(--text-main)', marginBottom: '1rem', fontWeight: 800 }}>
                                    {activeData.title}
                                </h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '3rem', maxWidth: '90%' }}>
                                    {activeData.description}
                                </p>

                                {/* The Skill Server Racks */}
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                                    {activeData.skills.map((skill, index) => (
                                        <div key={index}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                                <span style={{ color: '#ffffff', fontWeight: 600, letterSpacing: '0.5px' }}>{skill.name}</span>
                                                <span style={{ color: 'var(--accent-green)', fontFamily: 'monospace', fontSize: '0.9rem' }}>{skill.level}%</span>
                                            </div>
                                            <StatusBar level={skill.level} />
                                        </div>
                                    ))}
                                </div>

                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
}