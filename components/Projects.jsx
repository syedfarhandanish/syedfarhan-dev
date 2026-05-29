import Link from 'next/link';
import TiltCard from './TiltCard';

export default function Projects() {
    return (
        <section id="projects" className="reveal">
            <h2 className="section-title">Featured Projects</h2>
            <div className="projects-grid">
                
                <TiltCard className="project-card">
                    <div className="project-content">
                        <h3>Collabs Drop</h3>
                        <p>A high-performance, web-based asset distribution and cloud storage tool built into the Next.js ecosystem to facilitate seamless peer-to-peer file sharing.</p>
                        <div className="tech-stack">
                            <span>Next.js</span><span>React</span><span>Web Infrastructure</span>
                        </div>
                        <a href="https://collabsdrop.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn primary-btn btn-small">Live Demo</a>
                    </div>
                </TiltCard>

                <TiltCard className="project-card">
                    <div className="project-content">
                        <h3>QR Lab</h3>
                        <p>Engineered a Progressive Web App (PWA) resource-access system utilizing custom QR-code generation matrix logic for instant academic file retrieval and mobile performance optimization.</p>
                        <div className="tech-stack">
                            <span>PWA</span><span>JavaScript</span><span>Automation</span>
                        </div>
                        <a href="https://www.qrlab.eu.org/" target="_blank" rel="noopener noreferrer" className="btn primary-btn btn-small">Live Demo</a>
                    </div>
                </TiltCard>

                <TiltCard className="project-card">
                    <div className="project-content">
                        <h3>Collabs Flow</h3>
                        <p>A specialized productivity hub designed for students, featuring an integrated Kanban planning module, customizable Pomodoro deep-focus timers, and reactive media channels.</p>
                        <div className="tech-stack">
                            <span>UI/UX Architecture</span><span>Productivity Suite</span>
                        </div>
                        <a href="https://collabsflow.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn primary-btn btn-small">Live Demo</a>
                    </div>
                </TiltCard>

                <TiltCard className="project-card">
                    <div className="project-content">
                        <h3>Xylem Innovation App</h3>
                        <p>Served as the core UI/UX Designer inside a 5-member collaborative engineering team to design an intuitive water-usage governance application to handle critical ecological data streams.</p>
                        <div className="tech-stack">
                            <span>UI/UX Design</span><span>System Prototyping</span><span>Eco-Tech</span>
                        </div>
                        <Link href="/projects/xylem" className="btn primary-btn btn-small">View Case Study</Link>
                    </div>
                </TiltCard>

                <TiltCard className="project-card">
                    <div className="project-content">
                        <h3>Collabs Mail</h3>
                        <p>Prototyped a secure, specialized student communications router, using custom Zoho Mail deployment integrations alongside advanced MX, TXT, and CNAME DNS mapping.</p>
                        <div className="tech-stack">
                            <span>DNS Configuration</span><span>Zoho Mail API</span><span>DevOps</span>
                        </div>
                        <Link href="/projects/collabs-mail" className="btn primary-btn btn-small">View Case Study</Link>
                    </div>
                </TiltCard>

                <TiltCard className="project-card">
                    <div className="project-content">
                        <h3>Cosmopolitan Hostel</h3>
                        <p>Architected a client portfolio system with cross-device layout structures and custom brand-palette rules, establishing an interactive web footprint for local hospitality providers.</p>
                        <div className="tech-stack">
                            <span>Semantic HTML</span><span>CSS Variables</span><span>Responsive Engines</span>
                        </div>
                        <a href="https://cosmopolitanhostel.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn primary-btn btn-small">Live Demo</a>
                    </div>
                </TiltCard>
            </div>
        </section>
    );
}