import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const IntroLoader = ({ onComplete }) => {
    const [currentGreeting, setCurrentGreeting] = useState(0);
    const loaderRef = useRef(null);
    const textRef = useRef(null);

    const greetings = [
        'Hello',
        'Bonjour',
        'Magandang araw',
        'Ciao',
        'Olá',
        'Привет',
        'Hallå',
        'Guten Tag',
        'Hallo'
    ];

    useEffect(() => {
        let intervalId;
        let firstGreetingTimeout;

        // Fade in first greeting
        gsap.fromTo(
            textRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.2, ease: 'power2.out' }
        );

        // Wait 700ms before starting to cycle
        firstGreetingTimeout = setTimeout(() => {
            // Cycle through remaining greetings
            intervalId = setInterval(() => {
                setCurrentGreeting((prev) => {
                    const next = prev + 1;

                    if (next >= greetings.length) {
                        clearInterval(intervalId);
                        // Final transition out immediately
                        gsap.to(textRef.current, {
                            opacity: 0,
                            duration: 0.2,
                            ease: 'power2.in'
                        });

                        gsap.to(loaderRef.current, {
                            y: '-100%',
                            duration: 0.8,
                            ease: 'power3.inOut',
                            onComplete: () => {
                                if (onComplete) onComplete();
                            }
                        });
                        return prev;
                    }

                    // No transition - instant change
                    return next;
                });
            }, 300);
        }, 700);

        return () => {
            if (intervalId) clearInterval(intervalId);
            if (firstGreetingTimeout) clearTimeout(firstGreetingTimeout);
        };
    }, [greetings.length, onComplete]);

    return (
        <div
            ref={loaderRef}
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ backgroundColor: '#1C1D20' }}
        >
            <h2
                ref={textRef}
                className="text-4xl md:text-5xl lg:text-4xl font-normal text-white tracking-tight flex items-center gap-4"
                style={{
                    fontFamily: 'Instrument Sans, sans-serif',
                    letterSpacing: '-0.02em'
                }}
            >
                <span
                    className="rounded-full bg-white"
                    style={{
                        width: '12px',
                        height: '12px',
                        display: 'inline-block'
                    }}
                ></span>
                <span>{greetings[currentGreeting]}</span>
            </h2>
        </div>
    );
};

export default IntroLoader;


