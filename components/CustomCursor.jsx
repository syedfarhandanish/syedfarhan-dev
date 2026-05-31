"use client";
import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
    const cursorDot = useRef(null);
    const cursorRing = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        let mouseX = 0;
        let mouseY = 0;
        let ringX = 0;
        let ringY = 0;
        let isMoving = false;

        // Raw DOM listener bypasses React synthetic events for ZERO latency
        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Instantly update the main dot
            if (cursorDot.current) {
                cursorDot.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
            }

            if (!isMoving) {
                isMoving = true;
                requestAnimationFrame(render);
            }
        };

        const render = () => {
            // Smoothly interpolate the ring to follow the dot
            ringX += (mouseX - ringX) * 0.2; 
            ringY += (mouseY - ringY) * 0.2;

            if (cursorRing.current) {
                cursorRing.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
            }

            // Keep rendering if the ring hasn't caught up
            if (Math.abs(mouseX - ringX) > 0.1 || Math.abs(mouseY - ringY) > 0.1) {
                requestAnimationFrame(render);
            } else {
                isMoving = false;
            }
        };

        // Add hover states for links and buttons
        const onMouseOver = (e) => {
            const target = e.target;
            if (target.tagName?.toLowerCase() === 'a' || 
                target.tagName?.toLowerCase() === 'button' || 
                target.closest('a') || 
                target.closest('button')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        // { passive: true } tells the browser not to wait for JS, making scrolling and moving much faster
        window.addEventListener('mousemove', onMouseMove, { passive: true });
        window.addEventListener('mouseover', onMouseOver, { passive: true });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', onMouseOver);
        };
    }, []);

    return (
        <>
            {/* The tiny, instant center dot */}
            <div 
                ref={cursorDot}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '6px',
                    height: '6px',
                    backgroundColor: 'var(--accent-green)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 999999, // FIX APPLIED: Massively high z-index to sit above popups
                    marginLeft: '-3px', // Center offset
                    marginTop: '-3px',
                    willChange: 'transform' // Forces GPU acceleration
                }}
            />
            {/* The smooth following ring */}
            <div 
                ref={cursorRing}
                className={isHovering ? 'cursor-hover' : ''}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '36px',
                    height: '36px',
                    border: '1px solid rgba(16, 185, 129, 0.6)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 999998, // FIX APPLIED: Sits right below the dot, but above everything else
                    marginLeft: '-18px',
                    marginTop: '-18px',
                    transition: 'width 0.2s, height 0.2s, margin 0.2s, background-color 0.2s',
                    willChange: 'transform'
                }}
            />

            <style dangerouslySetInnerHTML={{__html: `
                * {
                    cursor: none !important; /* Hides default cursor universally */
                }
                .cursor-hover {
                    width: 50px !important;
                    height: 50px !important;
                    margin-left: -25px !important;
                    margin-top: -25px !important;
                    background-color: rgba(16, 185, 129, 0.1);
                    border-color: rgba(16, 185, 129, 0.2) !important;
                }
            `}} />
        </>
    );
}