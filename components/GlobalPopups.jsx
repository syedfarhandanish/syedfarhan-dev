"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MagneticButton from './MagneticButton';

export default function GlobalPopups() {
    const [showMobileWarning, setShowMobileWarning] = useState(false);
    const [showEngagementModal, setShowEngagementModal] = useState(false);

    useEffect(() => {
        // 1. MOBILE DEVICE CHECK
        if (window.innerWidth <= 768) {
            const showTimer = setTimeout(() => setShowMobileWarning(true), 1000);
            const hideTimer = setTimeout(() => setShowMobileWarning(false), 11000);

            return () => {
                clearTimeout(showTimer);
                clearTimeout(hideTimer);
            };
        }
    }, []);

    useEffect(() => {
        // 2. ENGAGEMENT TRACKER (150 Seconds)
        const hasSeenModal = sessionStorage.getItem('engagementModalSeen');

        if (!hasSeenModal) {
            // 150000 milliseconds = 150 seconds. 
            const engagementTimer = setTimeout(() => {
                setShowEngagementModal(true);
            }, 150000); 

            return () => clearTimeout(engagementTimer);
        }
    }, []);

    const dismissEngagementModal = () => {
        setShowEngagementModal(false);
        sessionStorage.setItem('engagementModalSeen', 'true');
    };

    return (
        <>
            {/* --- 1. MOBILE DESKTOP WARNING TOAST --- */}
            <AnimatePresence>
                {showMobileWarning && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        style={{
                            position: 'fixed',
                            bottom: '20px',
                            left: '5%',
                            right: '5%',
                            zIndex: 9999, 
                            background: 'rgba(11, 15, 25, 0.9)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(16, 185, 129, 0.3)',
                            borderLeft: '4px solid var(--accent-green)',
                            borderRadius: '12px',
                            padding: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
                        }}
                    >
                        <div style={{ color: 'var(--accent-green)' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
                        </div>
                        <div>
                            <h4 style={{ margin: 0, fontSize: '15px', color: '#fff' }}>Enable Desktop Site</h4>
                            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>For the ultimate visual experience, please view in desktop mode.</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- 2. 150-SECOND ENGAGEMENT MODAL --- */}
            <AnimatePresence>
                {showEngagementModal && (
                    <div style={{
                        position: 'fixed',
                        top: 0, left: 0, width: '100vw', height: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9999, 
                        padding: '0 5%'
                    }}>
                        {/* Dark Blur Backdrop */}
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            onClick={dismissEngagementModal}
                            style={{ position: 'absolute', width: '100%', height: '100%', background: 'rgba(2, 6, 23, 0.8)', backdropFilter: 'blur(8px)' }} 
                        />

                        {/* Modal Box */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="glass-card"
                            style={{
                                position: 'relative',
                                width: '100%',
                                maxWidth: '500px',
                                borderTop: '4px solid var(--accent-green)',
                                padding: 'var(--space-lg)',
                                textAlign: 'center',
                                zIndex: 1
                            }}
                        >
                            <div style={{ width: '50px', height: '50px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-md) auto', color: 'var(--accent-green)' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                            </div>
                            
                            <h3 style={{ fontSize: 'var(--text-xl)', color: '#fff', marginBottom: '10px' }}>Enjoying the view?</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: 'var(--text-base)', lineHeight: 1.6, marginBottom: 'var(--space-lg)' }}>
                                I noticed you've been exploring my portfolio for a bit! If my work grabbed your attention, I'd love to connect and discuss how we can build something amazing together.
                            </p>

                            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <MagneticButton>
                                    {/* FIX APPLIED: Changed href to #contact */}
                                    <a 
                                        href="#contact" 
                                        className="btn primary-btn"
                                        onClick={dismissEngagementModal}
                                    >
                                        Let's Talk
                                    </a>
                                </MagneticButton>
                                <button onClick={dismissEngagementModal} className="btn secondary-btn">
                                    No Thanks
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}