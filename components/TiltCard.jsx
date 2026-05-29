"use client";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { useState } from "react";

export default function TiltCard({ children, className = "" }) {
    // 3D Tilt Values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Spotlight Pixel Coordinates
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    // Dynamic glowing background string
    const background = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, rgba(16, 185, 129, 0.12), transparent 40%)`;

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mX = e.clientX - rect.left;
        const mY = e.clientY - rect.top;
        
        // Update Tilt
        x.set(mX / width - 0.5);
        y.set(mY / height - 0.5);

        // Update Spotlight
        mouseX.set(mX);
        mouseY.set(mY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            style={{ 
                rotateX, 
                rotateY, 
                transformStyle: "preserve-3d", 
                position: "relative", 
                overflow: "hidden" 
            }}
            className={`glass-card ${className}`}
        >
            {/* The Invisible Flashlight Layer */}
            <motion.div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: background,
                    opacity: isHovered ? 1 : 0,
                    pointerEvents: "none",
                    zIndex: 1,
                    transition: "opacity 0.4s ease"
                }}
            />
            
            {/* The Content Layer (Pushed forward in 3D space) */}
            <div style={{ transform: "translateZ(30px)", position: "relative", zIndex: 2 }}>
                {children}
            </div>
        </motion.div>
    );
}