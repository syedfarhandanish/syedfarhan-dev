"use client";
import { motion } from 'framer-motion';
import MagneticButton from './MagneticButton';

export default function Hero() {
    // The text we want to animate word-by-word
    const headingText = "Engineering tech solutions to bridge the educational divide.";
    const words = headingText.split(" ");

    // Framer Motion staggered animation rules
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { 
                staggerChildren: 0.12, 
                delayChildren: 2.2 // Waits for the PreLoader to finish
            },
        },
    };

    const wordVariants = {
        hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { type: "spring", damping: 12, stiffness: 100 },
        },
    };

    return (
        <section id="hero" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.8 }}
                style={{ color: 'var(--accent-green)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}
            >
                Hi, my name is Syed Farhan Danish.
            </motion.p>

            {/* The Staggered Word Reveal for the Main Title */}
            <motion.h1 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="hero-title"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 1rem 0', lineHeight: 1.1, maxWidth: '900px' }}
            >
                {words.map((word, index) => (
                    <motion.span key={index} variants={wordVariants} style={{ display: 'inline-block', marginRight: '0.25em' }}>
                        {word === "educational" || word === "divide." ? (
                            <span style={{ color: 'var(--accent-green)' }}>{word}</span>
                        ) : (
                            word
                        )}
                    </motion.span>
                ))}
            </motion.h1>

            <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.2, duration: 0.8 }}
                style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '3rem', lineHeight: 1.6 }}
            >
                Front-End Developer & UI Designer | Youth Advocate | Deputy President @ AKHSS Booni
            </motion.p>

            {/* The Solo Magnetic Call to Action Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.5, duration: 0.5 }}
                style={{ display: 'flex', gap: '20px', alignItems: 'center' }}
            >
                <MagneticButton>
                    <a href="#projects" className="btn primary-btn" style={{ fontSize: '1.1rem', padding: '15px 30px', display: 'inline-block' }}>
                        Explore My Work
                    </a>
                </MagneticButton>
            </motion.div>
        </section>
    );
}