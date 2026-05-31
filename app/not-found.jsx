"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import MagneticButton from '../components/MagneticButton';

export default function NotFound() {
    return (
        <div style={{ 
            minHeight: '100vh', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            textAlign: 'center',
            padding: '0 5%',
            position: 'relative',
            zIndex: 10
        }}>
            {/* Background Glow */}
            <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '300px',
                height: '300px',
                background: 'var(--accent-green)',
                filter: 'blur(150px)',
                opacity: 0.15,
                zIndex: -1,
                pointerEvents: 'none'
            }} />

            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ fontSize: 'clamp(5rem, 15vw, 10rem)', fontWeight: 900, color: '#fff', lineHeight: 1, marginBottom: '20px' }}
            >
                404<span style={{ color: 'var(--accent-green)' }}>.</span>
            </motion.h1>

            <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                style={{ fontSize: 'var(--text-2xl)', color: 'var(--text-main)', marginBottom: '15px' }}
            >
                Signal Lost in the Void
            </motion.h2>

            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                style={{ color: 'var(--text-muted)', fontSize: 'var(--text-base)', maxWidth: '500px', marginBottom: '40px', lineHeight: 1.6 }}
            >
                The architecture you are looking for doesn't exist or has been moved to a new route. Let's get you back to the main node.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
            >
                <MagneticButton>
                    <Link href="/" className="btn primary-btn">
                        Return to Dashboard
                    </Link>
                </MagneticButton>
            </motion.div>
        </div>
    );
}