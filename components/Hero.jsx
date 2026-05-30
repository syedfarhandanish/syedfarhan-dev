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
                delayChildren: 3.4 
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
        <section 
            id="hero" 
            style={{ 
                position: 'relative', 
                minHeight: '100vh', 
                height: 'auto', // THE FIX: Overrides the strict 100vh from globals.css so content isn't squeezed
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                paddingTop: '150px', // THE FIX: A 150px physical barrier preventing text from sliding under the nav
                paddingBottom: '80px'
            }}
        >
            
            {/* Added margin: 'auto 0' so it safely centers without overflowing the top padding */}
            <div style={{ width: '100%', maxWidth: '1000px', margin: 'auto 0' }}>
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3.0, duration: 0.8 }} 
                    style={{ 
                        color: 'var(--accent-green)', 
                        letterSpacing: '2px', 
                        textTransform: 'uppercase', 
                        marginBottom: 'var(--space-sm)', 
                        fontWeight: 600,
                        fontSize: 'var(--text-sm)' 
                    }}
                >
                    Hi, my name is Syed Farhan Danish.
                </motion.p>

                {/* The Staggered Word Reveal for the Main Title */}
                <motion.h1 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="hero-title"
                    style={{ 
                        fontSize: 'var(--text-hero)', 
                        fontWeight: 800, 
                        color: 'var(--text-main)', 
                        margin: '0 0 var(--space-md) 0', 
                        lineHeight: 1.1 
                    }}
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
                    transition={{ delay: 4.4, duration: 0.8 }} 
                    style={{ 
                        fontSize: 'var(--text-lg)', 
                        color: 'var(--text-muted)', 
                        maxWidth: '650px', 
                        marginBottom: 'var(--space-lg)', 
                        lineHeight: 1.6 
                    }}
                >
                    Front-End Developer & UI Designer | Youth Advocate | Deputy President @ AKHSS Booni
                </motion.p>

                {/* The Solo Magnetic Call to Action Button */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 4.7, duration: 0.5 }} 
                    style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'center', flexWrap: 'wrap' }}
                >
                    <MagneticButton>
                        <a href="#projects" className="btn primary-btn">
                            Explore My Work
                        </a>
                    </MagneticButton>
                </motion.div>
            </div>
        </section>
    );
}