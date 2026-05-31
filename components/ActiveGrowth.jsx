"use client";
import { motion } from 'framer-motion';

export default function ActiveGrowth() {
    // Updated modules to reflect your new focus areas
    const modules = [
        "Full-Stack Web Architecture", 
        "Applied Mathematics", 
        "Community Leadership", 
        "Backend Database Management"
    ];

    return (
        <section id="growth" style={{ paddingTop: '100px', paddingBottom: '100px', position: 'relative' }}>
            
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 5%' }}>
                
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    style={{ marginBottom: 'var(--space-lg)' }}
                >
                    {/* THE FIX: Changed the section title */}
                    <h2 className="section-title">Currently Learning</h2>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
                    className="glass-card"
                    style={{
                        position: 'relative',
                        padding: 'var(--space-lg)',
                        borderTop: '4px solid var(--accent-green)',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--space-md)'
                    }}
                >
                    {/* Pulsing Background Radar Effect */}
                    <motion.div 
                        animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0, 0.1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                            position: 'absolute',
                            top: '-20%',
                            right: '-10%',
                            width: '300px',
                            height: '300px',
                            borderRadius: '50%',
                            background: 'radial-gradient(circle, var(--accent-green) 0%, transparent 70%)',
                            pointerEvents: 'none',
                            zIndex: 0
                        }}
                    />

                    <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '20px' }}>
                        <div style={{ flex: '1 1 500px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
                                <div style={{ width: '10px', height: '10px', backgroundColor: 'var(--accent-green)', borderRadius: '50%', boxShadow: '0 0 10px var(--accent-green)' }} />
                                <span style={{ fontFamily: 'monospace', color: 'var(--accent-green)', fontSize: 'var(--text-sm)', letterSpacing: '1px' }}>
                                    STATUS: MULTI-DISCIPLINARY EXPANSION
                                </span>
                            </div>
                            
                            {/* THE FIX: Updated the Main Heading */}
                            <h3 style={{ fontSize: 'var(--text-2xl)', color: '#fff', marginBottom: '15px', fontWeight: 800 }}>
                                Full-Stack, Mathematics & Leadership
                            </h3>
                            
                            {/* THE FIX: Updated the Description */}
                            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-base)', lineHeight: 1.7, marginBottom: '25px', maxWidth: '700px' }}>
                                To build highly impactful digital ecosystems, I am currently expanding my expertise across the entire tech stack while reinforcing my analytical foundation. My current focus spans mastering back-end architectures, advancing my knowledge in applied mathematics, and actively cultivating community leadership skills to drive youth development initiatives.
                            </p>
                        </div>

                        {/* Animated Tech/Math Modules Grid */}
                        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <h4 style={{ color: '#fff', fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '5px' }}>Current Focus Modules</h4>
                            {modules.map((mod, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 + 0.3 }}
                                    style={{
                                        background: 'rgba(255,255,255,0.02)',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        padding: '12px 20px',
                                        borderRadius: '8px',
                                        color: 'var(--text-muted)',
                                        fontSize: 'var(--text-sm)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px'
                                    }}
                                >
                                    <span style={{ color: 'var(--accent-green)', fontSize: '10px' }}>▶</span>
                                    {mod}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}