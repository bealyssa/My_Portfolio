import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Philosophy = () => {
    const sectionRef = useRef(null);
    const textContainerRef = useRef(null);
    const triggersRef = useRef([]);

    useEffect(() => {
        const textContainer = textContainerRef.current;
        if (!textContainer) return;

        const lines = textContainer.querySelectorAll('.philosophy-line');
        if (!lines.length) return;

        // Give layout time to settle, then create scroll animations
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();

            const newTriggers = [];
            lines.forEach((line) => {
                gsap.set(line, { opacity: 0, y: 40 });

                const tween = gsap.to(line, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power2.out',
                    paused: true,
                });

                const st = ScrollTrigger.create({
                    trigger: line,
                    start: 'top 90%',
                    end: 'top 40%',
                    scrub: 1.2,
                    animation: tween,
                    onLeaveBack: () => {
                        gsap.set(line, { opacity: 0, y: 40 });
                    },
                });
                newTriggers.push(st);
            });

            triggersRef.current = newTriggers;
        }, 300);

        return () => {
            clearTimeout(timer);
            triggersRef.current.forEach(t => t.kill());
            triggersRef.current = [];
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            id="philosophy-section"
            className="relative bg-white"
            style={{
                paddingTop: '500px',
                paddingBottom: '500px',
                minHeight: '100vh',
            }}
        >
            <div className="max-w-[900px] mx-auto px-6 lg:px-12">
                <div ref={textContainerRef} className="space-y-8">
                    <p
                        className="philosophy-line text-4xl lg:text-5xl font-light leading-[1.2] tracking-tight"
                        style={{ color: 'rgb(17, 17, 17)' }}
                    >
                        Great interfaces are invisible.
                    </p>

                    <p
                        className="philosophy-line text-4xl lg:text-5xl font-light leading-[1.2] tracking-tight"
                        style={{ color: 'rgb(17, 17, 17)' }}
                    >
                        They guide, they breathe, they work everywhere without asking permission.
                    </p>

                    <p
                        className="philosophy-line text-4xl lg:text-5xl font-light leading-[1.2] tracking-tight"
                        style={{ color: 'rgb(17, 17, 17)' }}
                    >
                        I don't chase trends—I master fundamentals.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Philosophy;


