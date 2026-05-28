export default function About() {
    return (
        <section id="about" className="reveal">
            <h2 className="section-title">About Me</h2>
            <div className="about-grid">
                <div className="about-image-wrapper glass-card">
                    <img src="/images/profile.jpg" alt="Portrait of Syed Farhan Danish" className="profile-img" />
                </div>
                <div className="about-text glass-card">
                    <p>
                        Growing up surrounded by the mountainous terrain of Mastuj, my journey into technology was driven by a desire to bridge the gap between remote local talent and global opportunities. As a Computer Science major stepping into my senior year, I specialize in engineering web architectures, building user-centric interfaces, and organizing digital workflows.
                    </p>
                    <br />
                    <p>
                        A defining moment for me was shifting schools after matriculation. Witnessing a disconnect between brilliant students and digital global opportunities, I realized that complaining wasn't a solution. Instead, I used my technical skills to conceive and deploy <strong>Collabs</strong>—an EdTech ecosystem designed to democratize resource distribution and foster collaborative networks across regional campuses.
                    </p>
                    <br />
                    <p>
                        Beyond code, I am actively strengthening my foundation in advanced mathematics and physics to prepare for future explorations in Artificial Intelligence and Quantum Computing. When I am not behind a screen optimizing low-latency applications, you will find me trekking the mountains with friends—exploring &quot;nature’s algorithms&quot;—or preserving my cultural heritage by performing with my hostel&apos;s Music Club.
                    </p>
                </div>
            </div>
        </section>
    );
}