"use client";
import { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        // Safety check: if React hasn't rendered the canvas yet, stop the script.
        if (!canvas) return; 

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        
        // Ensure we only grab window dimensions safely inside useEffect
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        let particlesArray = [];
        const particleColor = 'rgba(16, 185, 129, 0.4)';

        class Particle {
            constructor(x, y, directionX, directionY, size) {
                this.x = x; this.y = y;
                this.directionX = directionX; this.directionY = directionY;
                this.size = size;
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = particleColor;
                ctx.fill();
            }
            update() {
                if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
                if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function initParticles() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 12000;
            if(numberOfParticles > 100) numberOfParticles = 100;

            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1; 
                let x = (Math.random() * ((window.innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((window.innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * 1) - 0.5; 
                let directionY = (Math.random() * 1) - 0.5;
                particlesArray.push(new Particle(x, y, directionX, directionY, size));
            }
        }

        function connectParticles() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                    + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                    
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000); 
                        ctx.strokeStyle = `rgba(16, 185, 129, ${opacityValue * 0.2})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animateParticles() {
            animationFrameId = requestAnimationFrame(animateParticles);
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connectParticles();
        }

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        window.addEventListener('resize', handleResize);
        initParticles();
        animateParticles();

        // Cleanup on unmount
        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // zIndex ensures the canvas stays firmly in the background
    return <canvas ref={canvasRef} id="particle-canvas" aria-hidden="true" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }} />;
}