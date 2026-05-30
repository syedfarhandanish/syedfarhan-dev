"use client";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function PreLoader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Holds the user exactly for 3 seconds (3000ms)
        const timer = setTimeout(() => setLoading(false), 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            animate={{ 
                // A cinematic "wipe up" effect revealing the hero section underneath
                clipPath: loading ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)',
                pointerEvents: loading ? "auto" : "none" 
            }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }} // Using your sleek custom easing curve
            style={{
                position: 'fixed', zIndex: 99999, top: 0, left: 0,
                width: '100vw', height: '100vh', backgroundColor: '#020617',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                overflow: 'hidden'
            }}
        >
            {/* Soft Ambient Background Glow */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: loading ? 1 : 0, scale: loading ? 1.2 : 0.8 }}
                transition={{ duration: 2.5, ease: 'easeOut' }}
                style={{
                    position: 'absolute',
                    width: '50vw', height: '50vw',
                    background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 60%)',
                    filter: 'blur(80px)',
                }}
            />

            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
                
                {/* The SFD Text Reveal */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: loading ? 1 : 0, y: loading ? 0 : -20 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    style={{ 
                        fontSize: 'clamp(4rem, 10vw, 7rem)', 
                        fontWeight: 900, 
                        color: '#fff', 
                        letterSpacing: '-2px',
                        lineHeight: 1, // Locks the vertical space
                        position: 'relative', // Acts as the anchor for the absolute dot
                        paddingRight: '0.25em', // Pre-allocates space so the dot doesn't overlap letters
                        margin: 0
                    }}
                >
                    SFD
                    {/* The Green Dot popping in - Now absolutely positioned to kill the layout glitch */}
                    <motion.span 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: loading ? 1 : 0, opacity: loading ? 1 : 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.8 }}
                        style={{ 
                            color: 'var(--accent-green)', 
                            position: 'absolute', // Takes it out of the flow, preventing the jump
                            bottom: '0.05em', 
                            right: 0 
                        }}
                    >
                        .
                    </motion.span>
                </motion.div>

                {/* The Cinematic Loading Line */}
                <div style={{ 
                    width: '120%', 
                    height: '2px', 
                    background: 'rgba(255,255,255,0.05)', 
                    marginTop: '25px', 
                    borderRadius: '50px', 
                    overflow: 'hidden' 
                }}>
                    <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2.8, ease: "easeInOut" }} // Finishes right before the 3 second mark
                        style={{ 
                            height: '100%', 
                            background: 'var(--accent-green)', 
                            boxShadow: '0 0 15px var(--accent-green)' 
                        }}
                    />
                </div>

            </div>
        </motion.div>
    );
}