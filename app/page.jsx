"use client";
import { useEffect } from 'react';
import PreLoader from '../components/PreLoader';
import CustomCursor from '../components/CustomCursor';
import ScrollProgress from '../components/ScrollProgress';
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
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    const checkAndObserve = setInterval(() => {
        const revealElements = document.querySelectorAll('.reveal:not(.active)');
        if (revealElements.length > 0) {
            revealElements.forEach(el => observer.observe(el));
            clearInterval(checkAndObserve); 
        }
    }, 100);

    return () => {
        clearInterval(checkAndObserve);
        observer.disconnect();
    };
  }, []);

  return (
    <>
      <PreLoader />
      <CustomCursor />
      <ScrollProgress />
      <ParticleCanvas />
      
      <Navbar />
      <div style={{ position: 'relative', zIndex: 10 }}>
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </main>
      </div>
    </>
  );
}