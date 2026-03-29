import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import emailjs from '@emailjs/browser';

gsap.registerPlugin(ScrollTrigger);

const personFace = '/assets/personface.png';

const Hero = ({ cvLink = '/cv.pdf' }) => {
    const targetEmail = 'lugtubealyssa@gmail.com';
    const emailjsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const emailjsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const emailjsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    const heroContentRef = useRef(null);
    const personImageRef = useRef(null);
    const headlineRef = useRef(null);
    const descriptionRef = useRef(null);
    const buttonRef = useRef(null);
    const modalBackdropRef = useRef(null);
    const modalPanelRef = useRef(null);

    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSendingMessage, setIsSendingMessage] = useState(false);
    const [contactStatus, setContactStatus] = useState({
        type: '',
        message: '',
    });

    const openContactModal = () => {
        setContactStatus({ type: '', message: '' });
        setIsContactModalOpen(true);
    };

    const closeContactModal = () => {
        if (!modalBackdropRef.current || !modalPanelRef.current) {
            setIsContactModalOpen(false);
            return;
        }

        const modalItems = modalPanelRef.current.querySelectorAll('.contact-modal-item');
        const tl = gsap.timeline({
            onComplete: () => {
                setIsContactModalOpen(false);
            },
        });

        tl.to(modalItems, {
            y: 20,
            opacity: 0,
            duration: 0.2,
            stagger: 0.02,
            ease: 'power2.in',
        })
            .to(
                modalPanelRef.current,
                {
                    y: 24,
                    opacity: 0,
                    scale: 0.97,
                    duration: 0.24,
                    ease: 'power3.in',
                },
                0.04
            )
            .to(
                modalBackdropRef.current,
                {
                    opacity: 0,
                    duration: 0.22,
                    ease: 'power2.inOut',
                },
                0
            );
    };

    const handleContactChange = (event) => {
        const { name, value } = event.target;
        setContactForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleContactSubmit = async (event) => {
        event.preventDefault();

        if (isSendingMessage) return;

        const finalSubject = contactForm.subject?.trim()
            ? contactForm.subject.trim()
            : `Portfolio Inquiry from ${contactForm.name.trim()}`;

        if (!emailjsServiceId || !emailjsTemplateId || !emailjsPublicKey) {
            setContactStatus({
                type: 'error',
                message: 'Email sending is not configured yet. Add EmailJS keys in .env to enable instant send.',
            });
            return;
        }

        setIsSendingMessage(true);
        setContactStatus({ type: '', message: '' });

        try {
            await emailjs.send(
                emailjsServiceId,
                emailjsTemplateId,
                {
                    to_email: targetEmail,
                    from_name: contactForm.name.trim(),
                    from_email: contactForm.email.trim(),
                    reply_to: contactForm.email.trim(),
                    subject: finalSubject,
                    message: contactForm.message.trim(),
                    sent_at: new Date().toLocaleString(),
                    // Backward compatibility for templates still using older variable names.
                    name: contactForm.name.trim(),
                    email: contactForm.email.trim(),
                    title: finalSubject,
                    time: new Date().toLocaleString(),
                },
                {
                    publicKey: emailjsPublicKey,
                }
            );

            setContactStatus({
                type: 'success',
                message: 'Message sent successfully. Thank you for reaching out.',
            });

            setContactForm({
                name: '',
                email: '',
                subject: '',
                message: '',
            });
        } catch (error) {
            setContactStatus({
                type: 'error',
                message: 'Failed to send message. Please try again in a moment.',
            });
        } finally {
            setIsSendingMessage(false);
        }
    };

    useEffect(() => {
        const triggers = [];

        // Entrance animations - delay to wait for intro loader
        const entranceTimeline = gsap.timeline({ delay: 0.5 });

        // Animate person image sliding up
        if (personImageRef.current) {
            gsap.set(personImageRef.current, { y: 100, opacity: 0 });
            entranceTimeline.to(personImageRef.current, {
                y: 0,
                opacity: 1,
                duration: 1.2,
                ease: 'power3.out'
            }, 0);
        }

        // Animate headline sliding up
        if (headlineRef.current) {
            gsap.set(headlineRef.current, { y: 60, opacity: 0 });
            entranceTimeline.to(headlineRef.current, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out'
            }, 0.2);
        }

        // Animate description and button sliding up
        if (descriptionRef.current) {
            gsap.set(descriptionRef.current, { y: 60, opacity: 0 });
            entranceTimeline.to(descriptionRef.current, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out'
            }, 0.3);
        }

        if (buttonRef.current) {
            gsap.set(buttonRef.current, { y: 40, opacity: 0 });
            entranceTimeline.to(buttonRef.current, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power3.out'
            }, 0.4);
        }

        // Scroll-triggered scale animation for person image
        if (personImageRef.current) {
            const anim = gsap.fromTo(
                personImageRef.current,
                { scale: 1 },
                {
                    scale: 1.2,
                    scrollTrigger: {
                        trigger: personImageRef.current,
                        start: 'top top',
                        end: '+=150%',
                        scrub: 1.5,
                        toggleActions: 'play none none reverse'
                    }
                }
            );
            if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
        }

        return () => {
            triggers.forEach(t => t.kill());
            entranceTimeline.kill();
        };
    }, []);

    useEffect(() => {
        if (!isContactModalOpen || !modalBackdropRef.current || !modalPanelRef.current) {
            document.body.style.overflow = '';
            document.body.classList.remove('fw-modal-open');
            return;
        }

        document.body.style.overflow = 'hidden';
        document.body.classList.add('fw-modal-open');

        const modalItems = modalPanelRef.current.querySelectorAll('.contact-modal-item');
        gsap.set(modalBackdropRef.current, { opacity: 0 });
        gsap.set(modalPanelRef.current, { y: 36, opacity: 0, scale: 0.97 });
        gsap.set(modalItems, { y: 24, opacity: 0 });

        const tl = gsap.timeline();
        tl.to(modalBackdropRef.current, {
            opacity: 1,
            duration: 0.28,
            ease: 'power2.out',
        })
            .to(
                modalPanelRef.current,
                {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.36,
                    ease: 'power3.out',
                },
                0.04
            )
            .to(
                modalItems,
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.34,
                    stagger: 0.04,
                    ease: 'power2.out',
                },
                0.18
            );

        const onKeyDown = (event) => {
            if (event.key === 'Escape') closeContactModal();
        };

        document.addEventListener('keydown', onKeyDown);

        return () => {
            document.body.style.overflow = '';
            document.body.classList.remove('fw-modal-open');
            document.removeEventListener('keydown', onKeyDown);
        };
    }, [isContactModalOpen]);

    return (
        <section className="relative overflow-hidden" id="hero-section">
            {/* Mobile/Tablet Layout */}
            <div className="lg:hidden flex flex-col w-full h-auto pt-20" ref={heroContentRef}>
                {/* Mobile Image Container */}
                <div className="flex justify-center items-start pt-8 px-4">
                    <div className="relative w-full max-w-sm h-auto">
                        <img
                            ref={personImageRef}
                            src={personFace}
                            alt="Bea Lugtu"
                            className="w-full h-auto object-cover object-bottom rounded-lg"
                        />
                    </div>
                </div>

                {/* Mobile Badge + Headline */}
                <div className="px-4 pt-6 pb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-[7px] h-[7px] bg-green-500 rounded-full flex-shrink-0"></div>
                        <span className="text-[12px]" style={{ color: 'rgb(108, 113, 121)' }}>Available for new projects</span>
                    </div>
                    <h1 ref={headlineRef} className="text-2xl font-medium leading-[1.08] tracking-[-0.01em]" style={{ color: 'rgb(17, 17, 17)' }}>
                        Full-Stack Developer building web apps that don't just look good they run smooth                    </h1>
                </div>

                {/* Mobile Description + Buttons */}
                <div className="px-4 pb-8">
                    <p ref={descriptionRef} className="text-sm leading-[1.4] mb-4 font-light" style={{ color: 'rgb(31, 31, 31)' }}>
                        I build applications that sit between logic and experience, turning ideas into functional systems. Focused on creating things that not only work but also feel right, with clarity, structure, and real-world usability in mind.                    </p>
                    <div ref={buttonRef} className="flex flex-col items-stretch gap-3">
                        <a
                            href="#"
                            onClick={(event) => {
                                event.preventDefault();
                                openContactModal();
                            }}
                            className="text-center text-white px-4 py-2 rounded-2xl text-sm font-medium transition-colors duration-300 hover:bg-[#7333F2]"
                            style={{
                                backgroundColor: 'rgb(17, 17, 17)',
                                boxShadow: '0.47422285992186514px 0.47422285992186514px 0.6706524000888582px -0.2px rgba(0, 0, 0, 0.05), 1.2914347811369224px 1.2914347811369224px 1.8263645824041657px -0.4px rgba(0, 0, 0, 0.06), 2.8355233674636113px 2.8355233674636113px 4.010035602692868px -0.6px rgba(0, 0, 0, 0.08), 6.294214453822934px 6.294214453822934px 8.901363445081158px -0.8px rgba(0, 0, 0, 0.11), 16px 16px 22.627416997969522px -1px rgba(0, 0, 0, 0.2)',
                                textDecoration: 'none'
                            }}
                        >
                            Let's talk
                        </a>

                        {/* Get CV Button - Mobile Version */}
                        <a
                            href={cvLink}
                            target="_blank"
                            rel="noreferrer"
                            className="text-center px-4 py-2 rounded-2xl text-sm font-medium transition-colors duration-300"
                            style={{
                                backgroundColor: '#ffffff',
                                color: 'rgb(17, 17, 17)',
                                border: '1px solid rgba(17, 17, 17, 0.18)',
                                textDecoration: 'none'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#7236ED';
                                e.currentTarget.style.color = '#ffffff';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#ffffff';
                                e.currentTarget.style.color = 'rgb(17, 17, 17)';
                            }}
                        >
                            Get CV
                        </a>
                    </div>
                </div>
            </div>

            {/* Desktop Layout - Sticky with absolute positioned overlays */}
            <div className="hidden lg:block sticky top-0 h-screen overflow-hidden">
                <div ref={heroContentRef} className="relative h-full">
                    {/* Centered Portrait Image */}
                    <div className="absolute inset-0 flex justify-center items-end">
                        <div className="relative h-[88%] w-auto">
                            <img
                                ref={personImageRef}
                                src={personFace}
                                alt="Bea Lugtu"
                                className="h-full w-auto object-cover object-bottom"
                            />
                            {/* White fade at bottom - glassmorphism effect */}
                            <div
                                className="absolute bottom-0 left-[-50%] right-[-50%] h-[35%] pointer-events-none"
                                style={{
                                    backdropFilter: 'blur(4px)',
                                    WebkitBackdropFilter: 'blur(4px)',
                                    background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 15%, rgba(255,255,255,0.3) 30%, rgba(255,255,255,0.5) 45%, rgba(255,255,255,0.7) 60%, rgba(255,255,255,0.85) 75%, rgba(255,255,255,0.95) 88%, rgba(255,255,255,1) 100%)',
                                    maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)',
                                    WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)',
                                }}
                            ></div>
                        </div>
                    </div>

                    {/* Left Bottom - Badge + Headline */}
                    <div className="absolute left-52 z-10 w-auto max-w-[480px]" style={{ bottom: '5.5rem' }}>
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-[7px] h-[7px] bg-green-500 rounded-full flex-shrink-0"></div>
                            <span className="text-[16px]" style={{ color: 'rgb(108, 113, 121)' }}>Available for new projects</span>
                        </div>
                        <h1 ref={headlineRef} className="text-3xl xl:text-[40px] font-medium leading-[1.08] tracking-[-0.01em]" style={{ color: 'rgb(17, 17, 17)' }}>
                            Full-Stack Developer building web apps that don't just look good they run smooth                    </h1>
                    </div>

                    {/* Right Side - Description + Button */}
                    <div className="absolute right-[11%] z-10 w-auto max-w-[430px]" style={{ bottom: '20%' }}>
                        <p ref={descriptionRef} className="text-[16px] leading-[1.4] mb-5 font-light" style={{ color: 'rgb(31, 31, 31)' }}>
                            I build applications that sit between logic and experience, turning ideas into functional systems. Focused on creating things that not only work but also feel right, with clarity, structure, and real-world usability in mind.                    </p>
                        <div ref={buttonRef} className="flex flex-row items-center gap-3">
                            <a
                                href="#"
                                onClick={(event) => {
                                    event.preventDefault();
                                    openContactModal();
                                }}
                                className="text-center text-white px-6 py-3 rounded-2xl text-[15px] font-medium transition-colors duration-300 hover:bg-[#7333F2]"
                                style={{
                                    backgroundColor: 'rgb(17, 17, 17)',
                                    boxShadow: '0.47422285992186514px 0.47422285992186514px 0.6706524000888582px -0.2px rgba(0, 0, 0, 0.05), 1.2914347811369224px 1.2914347811369224px 1.8263645824041657px -0.4px rgba(0, 0, 0, 0.06), 2.8355233674636113px 2.8355233674636113px 4.010035602692868px -0.6px rgba(0, 0, 0, 0.08), 6.294214453822934px 6.294214453822934px 8.901363445081158px -0.8px rgba(0, 0, 0, 0.11), 16px 16px 22.627416997969522px -1px rgba(0, 0, 0, 0.2)',
                                    textDecoration: 'none'
                                }}
                            >
                                Let's talk
                            </a>
                            <a
                                href={cvLink}
                                target="_blank"
                                rel="noreferrer"
                                className="text-center px-6 py-3 rounded-2xl text-[15px] font-medium transition-colors duration-300"
                                style={{
                                    backgroundColor: '#ffffff',
                                    color: 'rgb(17, 17, 17)',
                                    border: '1px solid rgba(17, 17, 17, 0.18)',
                                    textDecoration: 'none'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#7236ED';
                                    e.currentTarget.style.color = '#ffffff';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#ffffff';
                                    e.currentTarget.style.color = 'rgb(17, 17, 17)';
                                }}
                            >
                                Get CV
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {isContactModalOpen && (
                <div
                    ref={modalBackdropRef}
                    onClick={closeContactModal}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 1200,
                        background: 'rgba(10, 10, 14, 0.7)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '24px',
                    }}
                >
                    <div
                        ref={modalPanelRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="contact-modal-title"
                        onClick={(event) => event.stopPropagation()}
                        style={{
                            width: 'min(1040px, 100%)',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            border: '1px solid rgba(255, 255, 255, 0.16)',
                            background: 'radial-gradient(circle at 12% 10%, rgba(115,51,242,0.25) 0%, rgba(11,12,17,0.9) 30%, rgba(10,10,14,0.98) 100%)',
                            boxShadow: '0 30px 110px rgba(0, 0, 0, 0.5)',
                            color: '#f5f7fa',
                        }}
                    >
                        <div
                            className="contact-modal-item"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '18px 22px',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span
                                    style={{
                                        width: '10px',
                                        height: '10px',
                                        borderRadius: '999px',
                                        background: '#22c55e',
                                        boxShadow: '0 0 0 4px rgba(34,197,94,0.2)',
                                    }}
                                />
                                <h2 id="contact-modal-title" style={{ fontSize: '28px', fontWeight: 600, letterSpacing: '-0.02em' }}>
                                    Let&apos;s Talk
                                </h2>
                            </div>
                            <button
                                type="button"
                                onClick={closeContactModal}
                                aria-label="Close contact form"
                                style={{
                                    width: '42px',
                                    height: '42px',
                                    borderRadius: '999px',
                                    border: '1px solid rgba(255,255,255,0.16)',
                                    color: '#f5f7fa',
                                    background: 'rgba(255,255,255,0.06)',
                                    cursor: 'pointer',
                                    fontSize: '18px',
                                }}
                            >
                                ✕
                            </button>
                        </div>

                        <div
                            className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]"
                        >
                            <aside
                                className="contact-modal-item"
                                style={{
                                    padding: '26px 24px 28px',
                                    borderRight: '1px solid rgba(255,255,255,0.08)',
                                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                                    background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
                                }}
                            >
                                <p style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(237, 241, 248, 0.65)', marginBottom: '16px' }}>
                                    Project Inquiry
                                </p>
                                <h3 style={{ fontSize: '40px', lineHeight: 1, letterSpacing: '-0.03em', fontWeight: 650, marginBottom: '14px' }}>
                                    Build something
                                    <br />
                                    remarkable.
                                </h3>
                                <p style={{ color: 'rgba(240,243,248,0.8)', lineHeight: 1.7, marginBottom: '20px' }}>
                                    Share your idea, timeline, and goals. The message will open in your email app prefilled and ready to send.
                                </p>

                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
                                    {['Web Apps', 'UI/UX', 'Full-Stack', 'Deployment'].map((chip) => (
                                        <span
                                            key={chip}
                                            style={{
                                                borderRadius: '999px',
                                                border: '1px solid rgba(255,255,255,0.2)',
                                                background: 'rgba(255,255,255,0.06)',
                                                padding: '8px 12px',
                                                fontSize: '12px',
                                                letterSpacing: '0.03em',
                                            }}
                                        >
                                            {chip}
                                        </span>
                                    ))}
                                </div>

                                <div style={{ display: 'grid', gap: '12px' }}>
                                    <a
                                        href={`mailto:${targetEmail}`}
                                        style={{
                                            textDecoration: 'none',
                                            color: '#f8fafc',
                                            border: '1px solid rgba(255,255,255,0.16)',
                                            background: 'rgba(255,255,255,0.04)',
                                            borderRadius: '12px',
                                            padding: '11px 12px',
                                            fontSize: '15px',
                                        }}
                                    >
                                        {targetEmail}
                                    </a>
                                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                        <a
                                            href="https://www.linkedin.com/in/bea-alyssa-lugtu"
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{
                                                textDecoration: 'none',
                                                color: '#f8fafc',
                                                border: '1px solid rgba(255,255,255,0.16)',
                                                background: 'rgba(255,255,255,0.04)',
                                                borderRadius: '12px',
                                                padding: '10px 12px',
                                                fontSize: '14px',
                                            }}
                                        >
                                            LinkedIn
                                        </a>
                                        <a
                                            href="https://github.com/bealyssa"
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{
                                                textDecoration: 'none',
                                                color: '#f8fafc',
                                                border: '1px solid rgba(255,255,255,0.16)',
                                                background: 'rgba(255,255,255,0.04)',
                                                borderRadius: '12px',
                                                padding: '10px 12px',
                                                fontSize: '14px',
                                            }}
                                        >
                                            GitHub
                                        </a>
                                    </div>
                                </div>
                            </aside>

                            <form
                                onSubmit={handleContactSubmit}
                                style={{
                                    padding: '26px 24px 28px',
                                    display: 'grid',
                                    gap: '12px',
                                }}
                            >
                                <div className="contact-modal-item" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                                    <input
                                        type="text"
                                        name="name"
                                        value={contactForm.name}
                                        onChange={handleContactChange}
                                        placeholder="Your name"
                                        required
                                        style={{
                                            width: '100%',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            background: 'rgba(255,255,255,0.03)',
                                            color: '#f8fafc',
                                            padding: '12px 14px',
                                            fontSize: '15px',
                                            outline: 'none',
                                        }}
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={contactForm.email}
                                        onChange={handleContactChange}
                                        placeholder="Your email"
                                        required
                                        style={{
                                            width: '100%',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            background: 'rgba(255,255,255,0.03)',
                                            color: '#f8fafc',
                                            padding: '12px 14px',
                                            fontSize: '15px',
                                            outline: 'none',
                                        }}
                                    />
                                </div>

                                <input
                                    className="contact-modal-item"
                                    type="text"
                                    name="subject"
                                    value={contactForm.subject}
                                    onChange={handleContactChange}
                                    placeholder="Subject"
                                    style={{
                                        width: '100%',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        background: 'rgba(255,255,255,0.03)',
                                        color: '#f8fafc',
                                        padding: '12px 14px',
                                        fontSize: '15px',
                                        outline: 'none',
                                    }}
                                />

                                <textarea
                                    className="contact-modal-item"
                                    name="message"
                                    value={contactForm.message}
                                    onChange={handleContactChange}
                                    placeholder="Tell me about your project"
                                    required
                                    rows={7}
                                    style={{
                                        width: '100%',
                                        resize: 'vertical',
                                        minHeight: '170px',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        background: 'rgba(255,255,255,0.03)',
                                        color: '#f8fafc',
                                        padding: '12px 14px',
                                        fontSize: '15px',
                                        outline: 'none',
                                    }}
                                />

                                <div className="contact-modal-item" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px' }}>
                                    <button
                                        type="submit"
                                        disabled={isSendingMessage}
                                        style={{
                                            flex: 1,
                                            borderRadius: '14px',
                                            border: 'none',
                                            cursor: 'pointer',
                                            padding: '13px 16px',
                                            fontSize: '16px',
                                            fontWeight: 600,
                                            color: '#fff',
                                            background: isSendingMessage
                                                ? 'linear-gradient(135deg, #606878 0%, #4a5468 100%)'
                                                : 'linear-gradient(135deg, #7333F2 0%, #4f46e5 100%)',
                                            boxShadow: '0 12px 24px rgba(115, 51, 242, 0.32)',
                                            opacity: isSendingMessage ? 0.9 : 1,
                                        }}
                                    >
                                        {isSendingMessage ? 'Sending...' : 'Send Message'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={closeContactModal}
                                        style={{
                                            borderRadius: '14px',
                                            border: '1px solid rgba(255,255,255,0.18)',
                                            cursor: 'pointer',
                                            padding: '13px 16px',
                                            fontSize: '15px',
                                            fontWeight: 500,
                                            color: '#f8fafc',
                                            background: 'rgba(255,255,255,0.05)',
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>

                                {contactStatus.message && (
                                    <p
                                        className="contact-modal-item"
                                        style={{
                                            marginTop: '4px',
                                            color: contactStatus.type === 'success' ? '#86efac' : '#fda4af',
                                            fontSize: '13px',
                                            lineHeight: 1.45,
                                        }}
                                    >
                                        {contactStatus.message}
                                    </p>
                                )}

                                <p
                                    style={{
                                        color: 'rgba(240,243,248,0.65)',
                                        fontSize: '12px',
                                        lineHeight: 1.5,
                                    }}
                                >
                                    By clicking Send Message, your message is sent directly and instantly.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            )}


        </section>
    );
};

export default Hero;

