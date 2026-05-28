"use client";
import { useState } from 'react';

const caseStudies = {
    'xylem': {
        title: 'Xylem Innovation Challenge 2025',
        body: (
            <>
                <h4>Situation</h4>
                <p>The global 2025 Xylem Innovation Challenge required engineering teams to develop scalable software solutions for water usage governance to address critical, contemporary ecological challenges.</p>
                <h4>Task</h4>
                <p>As the primary UI/UX Designer inside a 5-member collaborative engineering team, my objective was to design an intuitive, highly accessible application interface that could translate complex ecological data streams into actionable user metrics.</p>
                <h4>Action</h4>
                <p>I architected the interface utilizing modern design principles and high-fidelity wireframing tools. I prioritized progressive disclosure to ensure average users wouldn&apos;t be overwhelmed by data density, focusing heavily on high-contrast visual hierarchies and logical mobile-first navigation flows.</p>
                <h4>Result</h4>
                <p>Delivered a comprehensive, production-ready UI prototype that streamlined user interaction with critical environmental data, directly contributing to the team&apos;s unified software solution and demonstrating the ethical application of technology.</p>
            </>
        )
    },
    'collabs-mail': {
        title: 'Collabs Mail Infrastructure',
        body: (
            <>
                <h4>Situation</h4>
                <p>Within the expanding Collabs EdTech ecosystem, students lacked a secure, specialized, and professional communication router for academic correspondence and team collaboration.</p>
                <h4>Task</h4>
                <p>I needed to independently build, configure, and deploy a custom enterprise-grade email infrastructure to serve as the backbone for the network&apos;s communication.</p>
                <h4>Action</h4>
                <p>I utilized the Zoho Mail API to establish the backend. I navigated domain registrar consoles to implement advanced DNS mapping—including MX, TXT, and CNAME records—on the domain <em>collabsmail.eu.org</em> to bypass spam filters and authenticate the network securely.</p>
                <h4>Result</h4>
                <p>Successfully established a secure, zero-downtime email routing system. This deployment ensured reliable, encrypted, and professional digital communication for the entire student network, validating my capabilities in DevOps and cloud configurations.</p>
            </>
        )
    }
};

export default function Projects() {
    const [activeCase, setActiveCase] = useState(null);

    const openModal = (caseId, e) => {
        e.preventDefault();
        setActiveCase(caseStudies[caseId]);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setActiveCase(null);
        document.body.style.overflow = 'auto';
    };

    return (
        <section id="projects" className="reveal">
            <h2 className="section-title">Featured Projects</h2>
            <div className="projects-grid">
                
                <div className="project-card glass-card">
                    <div className="project-content">
                        <h3>Collabs Drop</h3>
                        <p>A high-performance, web-based asset distribution and cloud storage tool built into the Next.js ecosystem to facilitate seamless peer-to-peer file sharing.</p>
                        <div className="tech-stack">
                            <span>Next.js</span><span>React</span><span>Web Infrastructure</span>
                        </div>
                        <a href="#" className="btn primary-btn btn-small">Live Demo</a>
                    </div>
                </div>

                <div className="project-card glass-card">
                    <div className="project-content">
                        <h3>QR Lab</h3>
                        <p>Engineered a Progressive Web App (PWA) resource-access system utilizing custom QR-code generation matrix logic for instant academic file retrieval and mobile performance optimization.</p>
                        <div className="tech-stack">
                            <span>PWA</span><span>JavaScript</span><span>Automation</span>
                        </div>
                        <a href="#" className="btn primary-btn btn-small">Live Demo</a>
                    </div>
                </div>

                <div className="project-card glass-card">
                    <div className="project-content">
                        <h3>Collabs Flow</h3>
                        <p>A specialized productivity hub designed for students, featuring an integrated Kanban planning module, customizable Pomodoro deep-focus timers, and reactive media channels.</p>
                        <div className="tech-stack">
                            <span>UI/UX Architecture</span><span>Productivity Suite</span>
                        </div>
                        <a href="#" className="btn primary-btn btn-small">Live Demo</a>
                    </div>
                </div>

                <div className="project-card glass-card">
                    <div className="project-content">
                        <h3>Xylem Innovation App</h3>
                        <p>Served as the core UI/UX Designer inside a 5-member collaborative engineering team to design an intuitive water-usage governance application to handle critical ecological data streams.</p>
                        <div className="tech-stack">
                            <span>UI/UX Design</span><span>System Prototyping</span><span>Eco-Tech</span>
                        </div>
                        <button onClick={(e) => openModal('xylem', e)} className="btn primary-btn btn-small">View Case Study</button>
                    </div>
                </div>

                <div className="project-card glass-card">
                    <div className="project-content">
                        <h3>Collabs Mail</h3>
                        <p>Prototyped a secure, specialized student communications router, using custom Zoho Mail deployment integrations alongside advanced MX, TXT, and CNAME DNS mapping.</p>
                        <div className="tech-stack">
                            <span>DNS Configuration</span><span>Zoho Mail API</span><span>DevOps</span>
                        </div>
                        <button onClick={(e) => openModal('collabs-mail', e)} className="btn secondary-btn btn-small">View Case Study</button>
                    </div>
                </div>

                <div className="project-card glass-card">
                    <div className="project-content">
                        <h3>Cosmopolitan Hostel</h3>
                        <p>Architected a client portfolio system with cross-device layout structures and custom brand-palette rules, establishing an interactive web footprint for local hospitality providers.</p>
                        <div className="tech-stack">
                            <span>Semantic HTML</span><span>CSS Variables</span><span>Responsive Engines</span>
                        </div>
                        <a href="#" className="btn secondary-btn btn-small">Live Demo</a>
                    </div>
                </div>
            </div>

            {/* React Native Modal Rendering */}
            <div className={`modal ${activeCase ? 'show' : ''}`} onClick={closeModal} aria-hidden={!activeCase} role="dialog">
                <div className="modal-content glass-card" onClick={(e) => e.stopPropagation()}>
                    <span className="close-btn" onClick={closeModal} aria-label="Close modal">&times;</span>
                    {activeCase && (
                        <>
                            <h2 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>{activeCase.title}</h2>
                            <div className="modal-body-text">{activeCase.body}</div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}