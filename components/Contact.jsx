"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';

export default function Contact() {
    // Live Clock State (Synced to Pakistan Standard Time)
    const [time, setTime] = useState("");
    
    // Form States
    const [focusedField, setFocusedField] = useState(null);
    const [formStatus, setFormStatus] = useState("idle"); // idle, sending, sent, error

    useEffect(() => {
        const updateClock = () => {
            const pktTime = new Date().toLocaleTimeString('en-US', {
                timeZone: 'Asia/Karachi',
                hour12: true,
                hour: 'numeric',
                minute: '2-digit',
                second: '2-digit'
            });
            setTime(`${pktTime} PKT`);
        };
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    // Actual Formspree Submission Logic
    const handleSubmit = async (event) => {
        event.preventDefault();
        setFormStatus("sending");
        
        const form = event.target;
        const data = new FormData(form);
        
        try {
            const response = await fetch("https://formspree.io/f/mojbrvaj", {
                method: "POST",
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                setFormStatus("sent");
                form.reset();
                setTimeout(() => setFormStatus("idle"), 5000);
            } else {
                setFormStatus("error");
                setTimeout(() => setFormStatus("idle"), 5000);
            }
        } catch (error) {
            setFormStatus("error");
            setTimeout(() => setFormStatus("idle"), 5000);
        }
    };

    return (
        <section id="contact" style={{ paddingTop: '150px', paddingBottom: '150px', position: 'relative' }}>
            
            {/* Background Grid Accent */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%', background: 'linear-gradient(to bottom, transparent, rgba(16, 185, 129, 0.02) 50%, transparent)', pointerEvents: 'none', zIndex: 0 }} />

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 5%', position: 'relative', zIndex: 2 }}>
                
                <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '6rem' }}>
                    
                    {/* LEFT PANEL: Identity & Live Data */}
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
                        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '2rem' }}>
                            <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}
                                style={{ width: '10px', height: '10px', background: 'var(--accent-green)', borderRadius: '50%', boxShadow: '0 0 15px var(--accent-green)' }}
                            />
                            <span style={{ fontFamily: 'monospace', color: 'var(--accent-green)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem' }}>
                                Open for Collaboration
                            </span>
                        </div>

                        <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: '2rem' }}>
                            Let&apos;s build <br />
                            <span style={{ color: 'rgba(255,255,255,0.2)', WebkitTextStroke: '1px var(--accent-green)' }}>the future.</span>
                        </h2>

                        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '3rem', maxWidth: '400px' }}>
                            Whether you have a complex web architecture in mind, a UI/UX challenge, or just want to connect—send me a message.
                        </p>

                        {/* Live Local Data Metrics */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', borderLeft: '2px solid rgba(16, 185, 129, 0.2)', paddingLeft: '2rem' }}>
                            <div>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 5px 0' }}>Local Time</p>
                                <p style={{ fontSize: '1.2rem', color: '#fff', fontFamily: 'monospace', margin: 0 }}>{time || "Loading..."}</p>
                            </div>
                            <div>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 5px 0' }}>Location</p>
                                <p style={{ fontSize: '1.2rem', color: '#fff', margin: 0 }}>Mastuj, Pakistan</p>
                            </div>
                            <div>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 5px 0' }}>Direct Email</p>
                                <a href="mailto:cyedfarhandanish@gmail.com" style={{ fontSize: '1.2rem', color: 'var(--accent-green)', textDecoration: 'none', position: 'relative', display: 'inline-block' }} className="hover-underline">
                                    cyedfarhandanish@gmail.com
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT PANEL: The Contact Form */}
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
                    >
                        {/* Connected directly to Formspree */}
                        <form onSubmit={handleSubmit} style={{ background: 'rgba(255,255,255,0.02)', padding: '4rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
                            
                            {/* Input 1: NAME */}
                            <div style={{ position: 'relative', marginBottom: '3rem' }}>
                                <label style={{ display: 'block', color: focusedField === 'name' ? 'var(--accent-green)' : 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px', transition: 'color 0.3s ease' }}>
                                    01. Full Name
                                </label>
                                <input 
                                    type="text" 
                                    name="name"
                                    required
                                    onFocus={() => setFocusedField('name')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="John Doe"
                                    style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '1.5rem', padding: '10px 0', outline: 'none' }}
                                />
                                <motion.div 
                                    initial={{ scaleX: 0 }} animate={{ scaleX: focusedField === 'name' ? 1 : 0 }} transition={{ duration: 0.4, ease: "circOut" }}
                                    style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', background: 'var(--accent-green)', originX: 0 }}
                                />
                            </div>

                            {/* Input 2: EMAIL */}
                            <div style={{ position: 'relative', marginBottom: '3rem' }}>
                                <label style={{ display: 'block', color: focusedField === 'email' ? 'var(--accent-green)' : 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px', transition: 'color 0.3s ease' }}>
                                    02. Email Address
                                </label>
                                <input 
                                    type="email" 
                                    name="email"
                                    required
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="john@example.com"
                                    style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '1.5rem', padding: '10px 0', outline: 'none' }}
                                />
                                <motion.div 
                                    initial={{ scaleX: 0 }} animate={{ scaleX: focusedField === 'email' ? 1 : 0 }} transition={{ duration: 0.4, ease: "circOut" }}
                                    style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', background: 'var(--accent-green)', originX: 0 }}
                                />
                            </div>

                            {/* Input 3: SUBJECT */}
                            <div style={{ position: 'relative', marginBottom: '3rem' }}>
                                <label style={{ display: 'block', color: focusedField === 'subject' ? 'var(--accent-green)' : 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px', transition: 'color 0.3s ease' }}>
                                    03. Subject
                                </label>
                                <input 
                                    type="text" 
                                    name="subject"
                                    required
                                    onFocus={() => setFocusedField('subject')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Project Inquiry"
                                    style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '1.5rem', padding: '10px 0', outline: 'none' }}
                                />
                                <motion.div 
                                    initial={{ scaleX: 0 }} animate={{ scaleX: focusedField === 'subject' ? 1 : 0 }} transition={{ duration: 0.4, ease: "circOut" }}
                                    style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', background: 'var(--accent-green)', originX: 0 }}
                                />
                            </div>

                            {/* Input 4: MESSAGE */}
                            <div style={{ position: 'relative', marginBottom: '4rem' }}>
                                <label style={{ display: 'block', color: focusedField === 'message' ? 'var(--accent-green)' : 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '1px', transition: 'color 0.3s ease' }}>
                                    04. Your Message
                                </label>
                                <textarea 
                                    name="message"
                                    required
                                    rows={4}
                                    onFocus={() => setFocusedField('message')}
                                    onBlur={() => setFocusedField(null)}
                                    placeholder="Tell me about your project..."
                                    style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '1.2rem', padding: '10px 0', outline: 'none', resize: 'none', lineHeight: 1.6 }}
                                />
                                <motion.div 
                                    initial={{ scaleX: 0 }} animate={{ scaleX: focusedField === 'message' ? 1 : 0 }} transition={{ duration: 0.4, ease: "circOut" }}
                                    style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '2px', background: 'var(--accent-green)', originX: 0 }}
                                />
                            </div>

                            {/* KINETIC SUBMIT BUTTON */}
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <MagneticButton>
                                    <button 
                                        type="submit" 
                                        disabled={formStatus !== "idle"}
                                        style={{ 
                                            background: formStatus === "sent" ? 'transparent' : formStatus === "error" ? 'transparent' : 'var(--accent-green)',
                                            color: formStatus === "sent" ? 'var(--accent-green)' : formStatus === "error" ? '#ff6b6b' : '#0b0f19',
                                            border: formStatus === "sent" ? '2px solid var(--accent-green)' : formStatus === "error" ? '2px solid #ff6b6b' : 'none',
                                            padding: '0',
                                            borderRadius: '50px',
                                            fontSize: '1.1rem',
                                            fontWeight: 700,
                                            cursor: formStatus === "idle" ? 'pointer' : 'default',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            position: 'relative',
                                            overflow: 'hidden',
                                            transition: 'all 0.3s ease'
                                        }}
                                    >
                                        <motion.div
                                            animate={{ 
                                                width: formStatus === "sending" ? 60 : formStatus === "sent" ? 230 : formStatus === "error" ? 200 : 200,
                                                height: 60
                                            }}
                                            transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}
                                        >
                                            <AnimatePresence mode="wait">
                                                {formStatus === "idle" && (
                                                    <motion.span key="idle" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                                                        Send Message &rarr;
                                                    </motion.span>
                                                )}
                                                {formStatus === "sending" && (
                                                    <motion.div key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                                        <div style={{ width: '24px', height: '24px', border: '3px solid rgba(11,15,25,0.3)', borderTop: '3px solid #0b0f19', borderRadius: '50%' }} className="animate-spin" />
                                                    </motion.div>
                                                )}
                                                {formStatus === "sent" && (
                                                    <motion.span key="sent" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                        Message Delivered
                                                    </motion.span>
                                                )}
                                                {formStatus === "error" && (
                                                    <motion.span key="error" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                                        Delivery Failed
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    </button>
                                </MagneticButton>
                            </div>

                        </form>
                    </motion.div>

                </div>
            </div>

            {/* Mobile Responsiveness & Utility CSS */}
            <style dangerouslySetInnerHTML={{__html: `
                @media (max-width: 968px) {
                    .contact-grid {
                        grid-template-columns: 1fr !important;
                        gap: 4rem !important;
                    }
                    form {
                        padding: 2.5rem !important;
                    }
                }
                
                input::selection, textarea::selection {
                    background: rgba(16, 185, 129, 0.3);
                }

                .hover-underline::after {
                    content: '';
                    position: absolute;
                    width: 100%;
                    transform: scaleX(0);
                    height: 1px;
                    bottom: 0;
                    left: 0;
                    background-color: var(--accent-green);
                    transform-origin: bottom right;
                    transition: transform 0.25s ease-out;
                }
                .hover-underline:hover::after {
                    transform: scaleX(1);
                    transform-origin: bottom left;
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin {
                    animation: spin 1s linear infinite;
                }
            `}} />
        </section>
    );
}