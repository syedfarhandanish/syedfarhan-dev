"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`glass-nav ${scrolled ? 'scrolled' : ''}`} id="navbar">
            <nav aria-label="Main Navigation">
                <div className="logo">Farhan.</div>
                <ul className="nav-links">
                    <li><Link href="#about">About</Link></li>
                    <li><Link href="#skills">Skills</Link></li>
                    <li><Link href="#experience">Experience</Link></li>
                    <li><Link href="#projects">Projects</Link></li>
                    <li><Link href="#contact">Contact</Link></li>
                </ul>
            </nav>
        </header>
    );
}