"use client";
import { useEffect } from 'react';
import ParticleCanvas from '../components/ParticleCanvas';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

export default function Home() {
  
  useEffect(() => {
    // 1. Set up the observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    // 2. Use an interval to safely wait for React to finish rendering the HTML
    const checkAndObserve = setInterval(() => {
        const revealElements = document.querySelectorAll('.reveal:not(.active)');
        
        // If we found the elements, observe them and stop the timer
        if (revealElements.length > 0) {
            revealElements.forEach(el => observer.observe(el));
            clearInterval(checkAndObserve); 
        }
    }, 100);

    // 3. Cleanup to prevent memory leaks
    return () => {
        clearInterval(checkAndObserve);
        observer.disconnect();
    };
  }, []);

  return (
    <>
      <ParticleCanvas />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>
  );
}