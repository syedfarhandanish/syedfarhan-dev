import Link from 'next/link';

// Your Database of Case Studies
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
                
                <div style={{ marginTop: '2rem' }}>
                    <a href="https://www.collabsmail.eu.org" target="_blank" rel="noopener noreferrer" className="btn primary-btn" style={{ display: 'inline-block' }}>
                        Visit Live Infrastructure &rarr;
                    </a>
                </div>
            </>
        )
    }
};

// Next.js 15 requires this function to be async to await the params
export default async function ProjectPage({ params }) {
    const resolvedParams = await params; // Wait for the URL to be readable
    const project = caseStudies[resolvedParams.slug];

    if (!project) {
        return (
            <div style={{ padding: '150px 5%', textAlign: 'center', minHeight: '100vh' }}>
                <h1 className="hero-title">Project Not Found</h1>
                <Link href="/" className="btn primary-btn" style={{ marginTop: '2rem' }}>Return Home</Link>
            </div>
        );
    }

    return (
        <main style={{ padding: '120px 5%', maxWidth: '800px', margin: '0 auto', minHeight: '100vh' }}>
            <Link href="/#projects" style={{ color: 'var(--accent-green)', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem', fontWeight: '500' }}>
                &larr; Back to Portfolio
            </Link>
            
            <article className="glass-card">
                <h1 style={{ color: 'var(--text-main)', fontSize: '2.2rem', marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
                    {project.title}
                </h1>
                <div className="modal-body-text">
                    {project.body}
                </div>
            </article>
        </main>
    );
}