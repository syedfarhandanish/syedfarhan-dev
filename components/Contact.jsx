"use client";
import { useState } from 'react';

export default function Contact() {
    const [statusText, setStatusText] = useState('');
    const [isError, setIsError] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setStatusText('');
        
        const form = event.target;
        const data = new FormData(form);
        
        try {
            const response = await fetch(form.action, {
                method: form.method,
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                setStatusText("Thanks for reaching out! I'll get back to you soon.");
                setIsError(false);
                form.reset();
            } else {
                const result = await response.json();
                if (Object.hasOwn(result, 'errors')) {
                    setStatusText(result["errors"].map(error => error["message"]).join(", "));
                } else {
                    setStatusText("Oops! There was a problem submitting your form.");
                }
                setIsError(true);
            }
        } catch (error) {
            setStatusText("Oops! There was a problem submitting your form.");
            setIsError(true);
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setStatusText(''), 5000);
        }
    };

    return (
        <section id="contact" className="reveal">
            <h2 className="section-title">Let's Connect</h2>
            <div className="contact-grid">
                <div className="contact-info glass-card">
                    <h3>Get In Touch</h3>
                    <p className="contact-text">Currently open to specialized projects, engineering collaborations, and conversations regarding technical solutions. Connect with my networks instantly:</p>
                    
                    <div className="social-links" style={{ marginBottom: '2rem' }}>
                        <a href="mailto:cyedfarhandanish@gmail.com" className="social-item">
                            <span className="social-label">Email:</span> cyedfarhandanish@gmail.com
                        </a>
                        <a href="https://wa.me/923465092108" target="_blank" rel="noopener noreferrer" className="social-item">
                            <span className="social-label">WhatsApp:</span> +92 346 5092108
                        </a>
                        <a href="tel:+923465092108" className="social-item">
                            <span className="social-label">Phone:</span> 0346-5092108
                        </a>
                    </div>

                    <div className="badge-base LI-profile-badge" data-locale="en_US" data-size="medium" data-theme="dark" data-type="VERTICAL" data-vanity="syedfarhandanish" data-version="v1">
                        <a className="badge-base__link LI-simple-link" href="https://pk.linkedin.com/in/syedfarhandanish?trk=profile-badge">Syed Farhan Danish</a>
                    </div>
                </div>

                <div className="contact-form-wrapper glass-card">
                    <form id="contact-form" action="https://formspree.io/f/mojbrvaj" method="POST" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input type="text" name="name" placeholder="Name" required />
                            <input type="email" name="email" placeholder="Email" required />
                        </div>
                        <input type="text" name="subject" placeholder="Subject" required />
                        <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
                        <button type="submit" className="btn primary-btn" disabled={isSubmitting}>
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </button>
                        
                        {statusText && (
                            <p style={{ marginTop: '15px', fontWeight: 500, textAlign: 'center', color: isError ? '#ff6b6b' : 'var(--accent-green)' }}>
                                {statusText}
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}