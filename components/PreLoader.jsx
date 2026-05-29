"use client";
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function PreLoader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Wait 2 seconds for 3D canvas to mount, then trigger animation
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <motion.div
            initial={{ y: 0 }}
            animate={{ y: loading ? 0 : "-100vh" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            style={{
                position: 'fixed', zIndex: 99999, top: 0, left: 0,
                width: '100vw', height: '100vh', backgroundColor: '#0b0f19',
                display: 'flex', justifyContent: 'center', alignItems: 'center'
            }}
        >
            <motion.div
                animate={{ opacity: loading ? 1 : 0, scale: loading ? 1 : 0.8 }}
                transition={{ duration: 0.5 }}
                style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-main)' }}
            >
                Farhan<span style={{ color: 'var(--accent-green)' }}>.</span>
            </motion.div>
        </motion.div>
    );
}