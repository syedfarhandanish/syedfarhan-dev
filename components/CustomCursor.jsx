"use client";
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
    // Exact mouse position
    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    // Spring physics for the trailing circle
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorXSpring = useSpring(mouseX, springConfig);
    const cursorYSpring = useSpring(mouseY, springConfig);

    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName.toLowerCase() === 'a' || e.target.tagName.toLowerCase() === 'button' || e.target.closest('a') || e.target.closest('button')) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, [mouseX, mouseY]);

    if (typeof window !== 'undefined' && window.innerWidth < 768) return null;

    return (
        <>
            {/* The precise, tiny dot (No lag) */}
            <motion.div
                style={{
                    position: 'fixed', left: 0, top: 0,
                    x: mouseX, y: mouseY,
                    translateX: '-50%', translateY: '-50%',
                    width: 6, height: 6,
                    backgroundColor: 'var(--accent-green)',
                    borderRadius: '50%',
                    pointerEvents: 'none', zIndex: 99999
                }}
            />
            
            {/* The trailing, spring-physics circle */}
            <motion.div
                style={{
                    position: 'fixed', left: 0, top: 0,
                    x: cursorXSpring, y: cursorYSpring,
                    translateX: '-50%', translateY: '-50%',
                    width: isHovered ? 50 : 30, 
                    height: isHovered ? 50 : 30,
                    border: '1px solid rgba(16, 185, 129, 0.5)',
                    backgroundColor: isHovered ? 'rgba(16, 185, 129, 0.1)' : 'transparent',
                    borderRadius: '50%',
                    pointerEvents: 'none', zIndex: 99998,
                    transition: 'width 0.2s, height 0.2s, background-color 0.2s'
                }}
            />
        </>
    );
}