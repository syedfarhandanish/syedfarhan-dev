export default function Skills() {
    return (
        <section id="skills" className="reveal">
            <h2 className="section-title">Technical Arsenal</h2>
            <div className="skills-grid">
                <div className="skill-card glass-card">
                    <h3>Engineering & Frameworks</h3>
                    <p>Next.js, React, HTML5, CSS3, Vanilla JavaScript, Responsive Architecture, Progressive Web Apps (PWA).</p>
                </div>
                <div className="skill-card glass-card">
                    <h3>DevOps & Productivity Tools</h3>
                    <p>Git, GitHub, Vercel CI/CD systems, VS Code, Zoho Mail custom DNS infrastructure.</p>
                </div>
                <div className="skill-card glass-card">
                    <h3>Design & UI/UX</h3>
                    <p>Canva Pro, Digital Wireframing, System Branding, Interface Prototyping, Graphic Design.</p>
                </div>
                <div className="skill-card glass-card">
                    <h3>Global Credentials</h3>
                    <p><strong>Certifications:</strong> Freelancing (TEA Accredited), IT for Business Success, Effective Leadership, Inventory Management.</p>
                </div>
            </div>

            <div className="skills-meta-grid">
                <div className="meta-card glass-card">
                    <h4>Languages</h4>
                    <div className="tags-container">
                        <span>English (Professional)</span><span>Urdu (Native)</span><span>Khowar (Native)</span><span>German (Elementary)</span>
                    </div>
                </div>
                <div className="meta-card glass-card">
                    <h4>Core Methodology</h4>
                    <div className="tags-container">
                        <span>Collaborative Leadership</span><span>Business Technology</span><span>Ethics</span><span>Problem Solving</span>
                    </div>
                </div>
            </div>
        </section>
    );
}