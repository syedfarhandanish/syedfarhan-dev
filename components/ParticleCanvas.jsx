"use client";
import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ParticleCanvas() {
    const mountRef = useRef(null);

    useEffect(() => {
        // 1. Setup Scene, Camera, and Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        
        // FIX APPLIED: alpha: true allows your CSS dark background to show through, high-performance utilizes GPU
        const renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true,
            powerPreference: "high-performance" 
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        
        // FIX APPLIED: Capped at 2 to keep it sharp but prevent extreme lag on Retina screens
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); 
        
        // Append the 3D canvas to our React div
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        // 2. Create the Core Geometry (A Tech/Quantum Wireframe Node)
        const geometry = new THREE.IcosahedronGeometry(2.5, 1);
        const material = new THREE.MeshBasicMaterial({
            color: 0x10b981, // Your custom accent green
            wireframe: true,
            transparent: true,
            opacity: 0.15
        });
        const coreNode = new THREE.Mesh(geometry, material);
        scene.add(coreNode);

        // 3. Create the Surrounding Particle Field
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 800; // Number of stars/particles
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            // Spread particles randomly across a 10x10x10 grid
            posArray[i] = (Math.random() - 0.5) * 12; 
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            color: 0x10b981,
            transparent: true,
            opacity: 0.4
        });
        const particleMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particleMesh);

        // Pull the camera back so we can see the objects
        camera.position.z = 5;

        // 4. Track Mouse Movement for Parallax Effect
        let mouseX = 0;
        let mouseY = 0;
        const handleMouseMove = (event) => {
            // Normalize mouse coordinates from -1 to +1
            mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener('mousemove', handleMouseMove);

        // 5. The Animation Loop (60 frames per second)
        let animationFrameId;
        const clock = new THREE.Clock();

        const animate = () => {
            const elapsedTime = clock.getElapsedTime();

            // Slowly rotate the core node
            coreNode.rotation.y = elapsedTime * 0.1;
            coreNode.rotation.x = elapsedTime * 0.15;

            // Slowly rotate the entire particle field
            particleMesh.rotation.y = elapsedTime * 0.05;

            // Smoothly move the camera based on mouse position (Parallax)
            camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
            camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;
            camera.lookAt(scene.position); // Keep camera pointed at the center

            renderer.render(scene, camera);
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        // 6. Handle Window Resizing
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        // 7. Cleanup (Crucial for React performance and fixing the WebGL Crash)
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
            
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            
            // Dispose of 3D assets to prevent memory leaks
            geometry.dispose();
            material.dispose();
            particlesGeometry.dispose();
            particlesMaterial.dispose();
            renderer.dispose();

            // FIX APPLIED: Force context loss to clear the browser's WebGL limit
            renderer.forceContextLoss();
        };
    }, []);

    return (
        <div 
            ref={mountRef} 
            style={{ 
                position: 'fixed', 
                top: 0, 
                left: 0, 
                width: '100vw', 
                height: '100vh', 
                zIndex: 0, 
                pointerEvents: 'none' 
            }} 
        />
    );
}