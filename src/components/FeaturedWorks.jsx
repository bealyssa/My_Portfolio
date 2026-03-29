import React, { useCallback, useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const resqMain = '/assets/resqwavepics/mainThumbnail.png';
const resq1 = '/assets/resqwavepics/slideshow1.jpg';
const resq2 = '/assets/resqwavepics/slideshow2.jpg';
const resq3 = '/assets/resqwavepics/slideshow3.jpg';

const j5Main = '/assets/J5pics/mainThumbnail.png';
const j51 = '/assets/J5pics/slideshow1.jpg';
const j52 = '/assets/J5pics/slideshow2.jpg';
const j53 = '/assets/J5pics/slideshow3.jpg';

const duelMain = '/assets/duellearnpics/mainThumbnail.png';
const duel1 = '/assets/duellearnpics/slideshow1.jpg';
const duel2 = '/assets/duellearnpics/slideshow2.jpg';
const duel3 = '/assets/duellearnpics/slideshow3.jpg';
const duel4 = '/assets/duellearnpics/slideshow4.jpg';
const duel5 = '/assets/duellearnpics/slideshow5.jpg';

const bridgeMain = '/assets/bridgesimpics/mainThumbnail.png';
const bridge1 = '/assets/bridgesimpics/slideshow1.jpg';
const bridge2 = '/assets/bridgesimpics/slideshow2.jpg';
const bridge3 = '/assets/bridgesimpics/slideshow3.jpg';

const vamosMain = '/assets/vamospics/mainThumbnail.png';
const vamos1 = '/assets/vamospics/slideshow1.jpg';
const vamos2 = '/assets/vamospics/slideshow2.jpg';
const vamos3 = '/assets/vamospics/slideshow3.jpg';

const studyMain = '/assets/studyconnect/mainThumbnail.png';
const study1 = '/assets/studyconnect/slideshow1.jpg';
const study2 = '/assets/studyconnect/slideshow2.jpg';
const study3 = '/assets/studyconnect/slideshow3.jpg';
const study4 = '/assets/studyconnect/slideshow4.jpg';
const study5 = '/assets/studyconnect/slideshow5.jpg';

const routeMain = '/assets/RouteMeInPics/mainThumbnail.png';
const route1 = '/assets/RouteMeInPics/slideshow1.jpg';
const route2 = '/assets/RouteMeInPics/slideshow2.jpg';
const route3 = '/assets/RouteMeInPics/slideshow3.jpg';

const smartGlowMain = '/assets/smartglow/mainThumbnail.png';
const smartGlow1 = '/assets/smartglow/slideshow1.jpg';
const smartGlow2 = '/assets/smartglow/slideshow2.jpg';

const examMain = '/assets/examiopics/mainThumbnail.png';
const exam1 = '/assets/examiopics/slideshow1.jpg';
const exam2 = '/assets/examiopics/slideshow2.jpg';
const exam3 = '/assets/examiopics/slideshow3.jpg';
const exam4 = '/assets/examiopics/slideshow4.jpg';
const exam5 = '/assets/examiopics/slideshow5.jpg';
const exam6 = '/assets/examiopics/slideshow6.jpg.png';
const exam7 = '/assets/examiopics/slideshow7.jpg';

const FeaturedWorks = () => {
    const imageRefs = useRef([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [showMoreGallery, setShowMoreGallery] = useState(false);
    const [hoverImageIndex, setHoverImageIndex] = useState({});
    const hoverTimerRefs = useRef({});
    const backdropRef = useRef(null);
    const layerOneRef = useRef(null);
    const layerTwoRef = useRef(null);
    const panelRef = useRef(null);
    const morePanelRef = useRef(null);
    const closingRef = useRef(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [isTablet, setIsTablet] = useState(window.innerWidth < 1024);

    const getCurrentGalleryImages = () => {
        if (!selectedProject) return [];
        return selectedProject.galleryImages || [];
    };

    useEffect(() => {
        const triggers = [];
        imageRefs.current.forEach((img) => {
            if (!img) return;

            const anim = gsap.fromTo(
                img,
                { scale: 1 },
                {
                    scale: 1.08,
                    scrollTrigger: {
                        trigger: img,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1,
                        toggleActions: 'play none none reverse'
                    }
                }
            );
            if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
        });

        return () => {
            triggers.forEach(t => t.kill());
        };
    }, []);

    const projectDetails = {
        1: {
            title: 'ResQWave',
            subtitle: 'LoRa-Powered Emergency Response System',
            period: 'Sep 2025 - Mar 2026',
            description: 'A community emergency response system deployed in Barangay 175, Caloocan City, serving multiple flood-prone households with real-time distress signaling and rescue coordination.',
            highlights: [
                'Built an AI-assisted decision support dashboard using Gemini and RAG framework',
                'Analyzes incoming distress alerts with real-time weather data for emergency validation',
                'Designed IoT terminals with automatic flood detection and SOS signaling',
                'Operational even during power and internet outages',
                'Collaborated with Packetworx for LoRa gateway integration'
            ],
            tech: ['TypeScript', 'React', 'Node.js', 'Gemini AI', 'LoRa', 'IoT', 'MapBox', 'RAG Framework'],
            image: 'https://picsum.photos/800/600?random=10'
        },
        2: {
            title: 'J5 Pharmacy',
            subtitle: 'POS, E-Commerce & Inventory System',
            period: 'Nov 2024 - Dec 2025',
            description: 'A complete Point-of-Sale, e-commerce, and inventory management platform for J5 Pharmacy in Caloocan City, enabling seamless transaction management and online sales.',
            highlights: [
                'Supporting 3+ staff managing daily transactions and online orders',
                'Powered by Sanity.io CMS for non-technical content management',
                'Responsive admin dashboards for product, customer, and sales management',
                'Automated inventory tracking reducing manual workload by 50%',
                'Collaborated with 5+ developers, reducing post-release bugs by 30%'
            ],
            tech: ['React', 'TypeScript', 'Node.js', 'Sanity.io', 'Tailwind CSS', 'E-Commerce', 'REST API'],
            image: 'https://picsum.photos/800/600?random=20'
        },
        3: {
            title: 'Duel-Learn',
            subtitle: 'Gamified Learning Platform',
            period: 'Nov 2024 - Apr 2025',
            description: 'An OCR AI-powered gamified learning platform supporting 50+ users with automatic question generation from study materials.',
            highlights: [
                'Integrated AI-driven question generation to enhance learning efficiency',
                'Built dynamic features: user profiles, flashcards, and quiz modes',
                'Increased user engagement by 20% through gamification',
                'Designed backend APIs for authentication and data management',
                'Boosted user retention by 15% with leaderboards and multiplayer quizzes'
            ],
            tech: ['React.js', 'Node.js', 'OpenAI API', 'OCR', 'MongoDB', 'Express', 'Gamification'],
            image: 'https://picsum.photos/800/600?random=30'
        },
        4: {
            title: 'Bridge Studio',
            subtitle: 'Interactive Structural Simulation Suite',
            period: 'Mar 2025 - Present',
            description: 'A web-based finite element analysis (FEA) tool for designing and evaluating truss and arch bridge structures in real time.',
            highlights: [
                '3D model builder for truss/arch configurations with parametric geometry inputs',
                'Real-time FEA solver displaying stress, deflection, and load path visualizations',
                'Modal analysis for natural frequencies and mode shapes',
                'Load case library (dead, live, wind, seismic) and combination manager',
                'Export results in CSV, PDF reports, and CAD-compatible data formats',
                'Collaborative design mode with multi-user annotation and version history'
            ],
            tech: ['Three.js', 'WebGL', 'JavaScript', 'Finite Element Method', 'D3.js', 'Node.js'],
            image: 'https://picsum.photos/800/600?random=40'
        },
        5: {
            title: 'VAMOS: Virtual Machine Monitoring System',
            subtitle: 'Lightweight Real-Time VM Performance and Security Monitoring',
            period: '2026',
            description: 'VAMOS is an efficient and lightweight Virtual Machine Monitoring System that provides real-time visibility into CPU, memory, disk, network, and process activity for multi-OS environments. It helps administrators optimize workloads, diagnose issues faster, and improve VM reliability without modifying the guest operating system.',
            highlights: [
                'Real-time CPU monitoring with per-core utilization and overall processing load tracking',
                'Memory usage tracking for used and available RAM to prevent slowdowns',
                'Disk monitoring for total, used, and free storage to avoid capacity issues',
                'Network activity monitoring for upload/download throughput and connectivity diagnostics',
                'Process management with CPU and memory usage visibility for active processes',
                'System information retrieval: OS name, kernel version, uptime, and hardware details',
                'Proactive anomaly detection and security monitoring for suspicious VM behaviors',
                'Live dashboard with automated alerts, diagnostics, and continuous status updates'
            ],
            tech: ['React', 'Node.js', 'System Metrics', 'Machine Learning', 'Security Monitoring', 'Dashboard Analytics'],
            image: vamosMain
        },
        6: {
            title: 'StudyConnect',
            subtitle: 'Collaborative Study Platform for Students',
            period: '2026',
            description: 'StudyConnect is a centralized academic collaboration platform where students can connect, communicate, and manage study activities in one place. It combines group collaboration, chat, scheduling, file sharing, and virtual sessions to make studying more interactive, organized, and accessible.',
            highlights: [
                'Secure user registration and login with encrypted authentication',
                'Study group creation and member management with role-based collaboration',
                'Real-time group chat for instant communication and active discussions',
                'PDF-only file sharing for notes, reviewers, and learning materials',
                'Shared calendar for scheduling sessions, deadlines, and group plans',
                'Integrated video calls for virtual study sessions and live collaboration',
                'Real-time notifications and reminders for messages, events, and schedules',
                'Admin dashboard for managing users, groups, content, and platform activity'
            ],
            tech: ['Firebase Auth', 'Firestore', 'Firebase Storage', 'Cloud Messaging', 'Agora', 'React', 'Real-Time Collaboration'],
            image: studyMain
        },
        8: {
            title: 'MapNavigator+',
            subtitle: 'Beacon-Assisted Indoor Room Detection and Guidance Gadget for Campus Use',
            period: '2026',
            description: 'MapNavigator+ is a beacon-assisted indoor guidance system for schools that confirms room arrival without requiring full 3D map rendering. The mobile app detects Bluetooth/Wi-Fi beacon proximity, notifies users when they reach the correct room, and can trigger IoT feedback devices such as speakers, buzzers, or LEDs.',
            highlights: [
                'Beacon-assisted indoor room detection for campus buildings',
                'Mobile app destination selection with arrival confirmation notifications',
                'IoT room feedback via speaker message, buzzer alert, or LED indicator',
                'Attendance and occupancy logging for analytics and crowd management',
                'Designed to reduce navigation complexity compared to full map-rendered systems',
                'Improves accessibility for students, faculty, and campus visitors',
                'Built for real-world campus usability, accuracy, and convenience testing'
            ],
            tech: ['Flutter/React Native', 'Bluetooth/Wi-Fi Beacons', 'IoT (Speaker/Buzzer/LED)', 'Firebase', 'Indoor Positioning'],
            image: routeMain
        },
        7: {
            title: 'IoT SmartGlow Lamp',
            subtitle: 'Customizable Time-Aware Smart Lighting with Web and IoT Control',
            period: '2026',
            description: 'SmartGlow is an IoT-enabled lamp system that combines automatic time-based lighting behavior with manual controls for color, brightness, and mode selection. It is designed for comfort, focus, and ambient customization through a web app connected to Wi-Fi microcontrollers.',
            highlights: [
                'Web app UI for color picker, brightness controls, and manual/automatic mode switching',
                'Time-based sleep and wake lighting schedules for personalized routines',
                'Real-time communication using HTTP/WebSocket between app and microcontroller',
                'Hardware support for Arduino/ESP8266/ESP32 with RGB LEDs or WS2812B strips',
                'Cloud-ready deployment on Vercel with lightweight backend handling device commands',
                'Prototype-to-production path from breadboard setup to enclosed final lamp build',
                'Smooth light transitions using PWM for brightness and color effects',
                'No required database for core workflow, with temporary settings stored on app/device'
            ],
            tech: ['HTML', 'CSS', 'JavaScript', 'React/Vue', 'Node.js/PHP', 'ESP32/ESP8266', 'Arduino', 'WebSocket', 'Vercel'],
            image: smartGlowMain
        },
        9: {
            title: 'Exam.io',
            subtitle: 'Online Examination Platform for Creation, Delivery, and Evaluation',
            period: '2026',
            description: 'Exam.io is an online examination platform built to streamline exam creation, secure test execution, and performance evaluation for schools and training programs. It provides a complete workflow from form creation to analytics and reporting.',
            highlights: [
                'User-friendly exam creation with support for multiple question types',
                'Secure exam environment with anti-cheating safeguards',
                'Automated grading and performance analysis for faster evaluation',
                'Customizable exam templates and scheduling controls',
                'Administrator-focused reports, statistics, and completion tracking',
                'Teacher and student account flows for organized role-based access'
            ],
            tech: ['React', 'Node.js/PHP', 'Authentication', 'Exam Security', 'Reporting Dashboard'],
            image: examMain
        }
    };

    const projects = [
        {
            id: 1,
            title: 'ResQWave',
            description: 'Real-time disaster signal monitoring and response coordination for Barangay 175.',
            tags: ['IoT', 'AI Dashboard', 'Emergency Tech'],
            stack: ['LoRa', 'Mapbox', 'React'],
            image: resqMain,
            hoverImages: [resq1, resq2, resq3],
            galleryImages: [resqMain, resq1, resq2, resq3],
            imageFit: 'contain',
            imagePosition: 'center',
            imageBg: '#f3f4f6',
            galleryImageFit: 'contain',
            sourceCodeUrl: '',
            livePreviewUrl: '',
            bgColor: '#FF6B6B'
        },
        {
            id: 2,
            title: 'J5 Pharmacy',
            description: 'Retail & inventory ecosystem supporting seamless POS operations online and offline.',
            tags: ['E-Commerce', 'POS', 'Sanity CMS'],
            stack: ['React', 'Node.js', 'Tailwind'],
            image: j5Main,
            hoverImages: [
                j51,
                j52,
                j53
            ],
            galleryImages: [j5Main, j51, j52, j53],
            imageFit: 'contain',
            imagePosition: 'center',
            imageBg: '#f3f4f6',
            galleryImageFit: 'contain',
            sourceCodeUrl: '',
            livePreviewUrl: '',
            bgColor: '#4ECDC4'
        },
        {
            id: 3,
            title: 'Duel-Learn',
            tags: ['AI OCR', 'Gamification', 'EdTech'],
            image: duelMain,
            hoverImages: [
                duel1,
                duel2,
                duel3,
                duel4,
                duel5
            ],
            galleryImages: [duelMain, duel1, duel2, duel3, duel4, duel5],
            imageFit: 'contain',
            imagePosition: 'center',
            imageBg: '#f3f4f6',
            galleryImageFit: 'contain',
            sourceCodeUrl: '',
            livePreviewUrl: '',
            bgColor: '#95E1D3'
        },
        {
            id: 4,
            title: 'Bridge Studio',
            description: 'A Web-Based Finite Element Analysis Simulator for Truss and Arch Bridge Structures.',
            tags: ['FEA', 'Structural', 'Simulation'],
            stack: ['Three.js', 'WebGL', 'Finite Elements'],
            image: bridgeMain,
            hoverImages: [bridge1, bridge2, bridge3],
            galleryImages: [bridgeMain, bridge1, bridge2, bridge3],
            imageFit: 'contain',
            imagePosition: 'center',
            imageBg: '#f3f4f6',
            galleryImageFit: 'contain',
            sourceCodeUrl: '',
            livePreviewUrl: '',
            bgColor: '#4b5563'
        },
        {
            id: 5,
            title: 'VAMOS: Virtual Machine Monitoring System',
            description: 'Real-time VM monitoring for CPU, memory, disk, network, process activity, and security diagnostics.',
            tags: ['Virtualization', 'Monitoring', 'Security'],
            stack: ['React', 'Node.js', 'System Metrics'],
            image: vamosMain,
            hoverImages: [vamos1, vamos2, vamos3],
            galleryImages: [vamosMain, vamos1, vamos2, vamos3],
            imageFit: 'contain',
            imagePosition: 'center',
            imageBg: '#f3f4f6',
            galleryImageFit: 'contain',
            sourceCodeUrl: '',
            livePreviewUrl: '',
            bgColor: '#1f2937'
        },
        {
            id: 6,
            isSplit: true,
            splitItems: [
                {
                    id: 6,
                    title: 'StudyConnect',
                    description: 'A collaborative student platform for study groups, chat, scheduling, file sharing, and video sessions.',
                    tags: ['EdTech', 'Collaboration', 'Real-Time'],
                    stack: ['Firebase', 'Agora', 'React'],
                    image: studyMain,
                    hoverImages: [study1, study2, study3],
                    galleryImages: [studyMain, study1, study2, study3, study4, study5],
                    imageFit: 'contain',
                    imagePosition: 'center',
                    imageBg: '#e5f3fb',
                    galleryImageFit: 'contain',
                    sourceCodeUrl: '',
                    livePreviewUrl: '',
                    bgColor: '#312e81'
                },
                {
                    id: 8,
                    title: 'MapNavigator+',
                    description: 'Beacon-assisted indoor room detection and guidance for campus navigation.',
                    tags: ['Indoor Navigation', 'Beacon', 'IoT'],
                    stack: ['Mobile App', 'Bluetooth', 'Firebase'],
                    image: routeMain,
                    hoverImages: [route1, route2, route3],
                    galleryImages: [routeMain, route1, route2, route3],
                    imageFit: 'contain',
                    imagePosition: 'center',
                    imageBg: '#edf2f7',
                    galleryImageFit: 'contain',
                    sourceCodeUrl: '',
                    livePreviewUrl: '',
                    bgColor: '#0b4f9c'
                }
            ]
        },
        {
            id: 7,
            title: 'IoT SmartGlow Lamp',
            description: 'An IoT smart lamp with scheduling, real-time control, and customizable lighting ambiance.',
            tags: ['IoT', 'Smart Lighting', 'Embedded'],
            stack: ['ESP32', 'Web App', 'WebSocket'],
            image: smartGlowMain,
            hoverImages: [smartGlow1, smartGlow2],
            galleryImages: [smartGlowMain, smartGlow1, smartGlow2],
            imageFit: 'contain',
            imagePosition: 'center',
            imageBg: '#f3f4f6',
            galleryImageFit: 'contain',
            sourceCodeUrl: '',
            livePreviewUrl: '',
            bgColor: '#334155'
        },
        {
            id: 9,
            title: 'Exam.io',
            description: 'An online examination platform for secure exam management, automated grading, and detailed analytics.',
            tags: ['EdTech', 'Examination', 'Analytics'],
            stack: ['Web Platform', 'Reporting', 'Secure Exams'],
            image: examMain,
            hoverImages: [exam1, exam2, exam3],
            galleryImages: [examMain, exam1, exam2, exam3, exam4, exam5, exam6, exam7],
            imageFit: 'contain',
            imagePosition: 'center',
            imageBg: '#f3f4f6',
            galleryImageFit: 'contain',
            sourceCodeUrl: '',
            livePreviewUrl: '',
            bgColor: '#4b5563'
        }
    ];

    const getProjectById = (projectId) => {
        for (const project of projects) {
            if (project.isSplit && project.splitItems) {
                const splitMatch = project.splitItems.find((item) => item.id === projectId);
                if (splitMatch) return splitMatch;
            }
            if (!project.isSplit && project.id === projectId) return project;
        }
        return null;
    };

    const handleProjectClick = (projectId) => {
        const details = projectDetails[projectId];
        const project = getProjectById(projectId);

        if (!details || !project) return;

        setSelectedProject({
            ...details,
            id: projectId,
            image: project.image,
            galleryImages: project.galleryImages || [project.image],
            imageFit: project.imageFit || 'contain',
            imagePosition: project.imagePosition || 'center',
            imageBg: project.imageBg || '#f3f4f6',
            galleryImageFit: project.galleryImageFit || 'contain',
            sourceCodeUrl: project.sourceCodeUrl || '',
            livePreviewUrl: project.livePreviewUrl || ''
        });
    };

    const openExternalLink = (url) => {
        if (!url) return;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const shouldUseContainInPanels = (projectId) => projectId === 6 || projectId === 8;

    const closeModal = useCallback(() => {
        if (!selectedProject || closingRef.current) return;

        closingRef.current = true;
        setShowMoreGallery(false);

        gsap.set([layerOneRef.current, layerTwoRef.current], { autoAlpha: 1 });

        if (!panelRef.current) {
            setSelectedProject(null);
            closingRef.current = false;
            return;
        }

        gsap.to('.fw-modal-item', {
            y: 12,
            opacity: 0,
            duration: 0.18,
            ease: 'power1.in'
        });
        gsap.to(panelRef.current, { xPercent: 100, duration: 0.32, ease: 'power3.in' });
        gsap.to(layerTwoRef.current, { xPercent: 100, duration: 0.28, ease: 'power3.in', delay: 0.04 });
        gsap.to(layerOneRef.current, { xPercent: 100, duration: 0.22, ease: 'power3.in', delay: 0.08 });
        gsap.to(backdropRef.current, {
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in',
            onComplete: () => {
                setSelectedProject(null);
                closingRef.current = false;
            }
        });
    }, [selectedProject]);

    const startHoverSlideshow = (projectId, imageCount) => {
        stopHoverSlideshow(projectId);
        if (imageCount <= 1) return;

        // start at next image immediately to show slideshow on hover
        setHoverImageIndex((prev) => ({
            ...prev,
            [projectId]: 1
        }));

        hoverTimerRefs.current[projectId] = setInterval(() => {
            setHoverImageIndex((prev) => {
                const current = prev[projectId] ?? 0;
                return {
                    ...prev,
                    [projectId]: (current + 1) % imageCount
                };
            });
        }, 1500); // 1.5 seconds per slide
    };

    const stopHoverSlideshow = (projectId) => {
        if (hoverTimerRefs.current[projectId]) {
            clearInterval(hoverTimerRefs.current[projectId]);
            delete hoverTimerRefs.current[projectId];
        }
        setHoverImageIndex((prev) => {
            const next = { ...prev };
            delete next[projectId];
            return next;
        });
    };

    const toggleMoreGallery = () => {
        setShowMoreGallery((prev) => !prev);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            setIsTablet(window.innerWidth < 1024);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (!selectedProject) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        document.body.classList.add('fw-modal-open');
        closingRef.current = false;

        gsap.set(backdropRef.current, { opacity: 0 });
        gsap.set([layerOneRef.current, layerTwoRef.current, panelRef.current], { xPercent: 100 });
        gsap.set([layerOneRef.current, layerTwoRef.current], { autoAlpha: 1 });
        gsap.set('.fw-modal-item', { y: 20, opacity: 0 });

        const tl = gsap.timeline();
        tl.to(backdropRef.current, { opacity: 1, duration: 0.2, ease: 'power2.out' })
            .to(layerOneRef.current, { xPercent: 0, duration: 0.35, ease: 'power3.out' }, 0)
            .to(layerTwoRef.current, { xPercent: 0, duration: 0.45, ease: 'power3.out' }, 0.05)
            .to(panelRef.current, { xPercent: 0, duration: 0.55, ease: 'power4.out' }, 0.08)
            .to('.fw-modal-item', { y: 0, opacity: 1, duration: 0.45, stagger: 0.06, ease: 'power2.out' }, 0.26)
            .to([layerOneRef.current, layerTwoRef.current], { autoAlpha: 0, duration: 0.18, ease: 'power2.out' }, 0.52);

        const onEscape = (event) => {
            if (event.key === 'Escape') closeModal();
        };
        window.addEventListener('keydown', onEscape);

        return () => {
            tl.kill();
            window.removeEventListener('keydown', onEscape);
            document.body.style.overflow = previousOverflow;
            document.body.classList.remove('fw-modal-open');
            setShowMoreGallery(false);
        };
    }, [selectedProject, closeModal]);

    useEffect(() => {
        if (!selectedProject || !morePanelRef.current) return;

        if (showMoreGallery) {
            gsap.set(morePanelRef.current, { display: 'block' });
            gsap.fromTo(
                morePanelRef.current,
                { x: 60, opacity: 0, scale: 0.96 },
                { x: 0, opacity: 1, scale: 1, duration: 0.42, ease: 'power3.out' }
            );
            return;
        }

        gsap.to(morePanelRef.current, {
            x: 50,
            opacity: 0,
            scale: 0.96,
            duration: 0.28,
            ease: 'power2.in',
            onComplete: () => {
                if (morePanelRef.current) {
                    gsap.set(morePanelRef.current, { display: 'none' });
                }
            }
        });
    }, [showMoreGallery, selectedProject]);

    useEffect(() => {
        return () => {
            Object.values(hoverTimerRefs.current).forEach((timerId) => clearInterval(timerId));
            hoverTimerRefs.current = {};
        };
    }, []);

    return (
        <section id="work" className="relative z-[80] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white">
            {selectedProject && (
                <div
                    ref={panelRef}
                    style={{
                        position: 'fixed',
                        top: '0',
                        right: '0',
                        bottom: '0',
                        width: isMobile ? '100%' : '100%',
                        maxWidth: isMobile ? 'none' : '600px',
                        backgroundColor: '#ffffff',
                        zIndex: 9999,
                        transform: 'translateX(0)',
                        overflowY: 'auto',
                        boxShadow: isMobile ? '-10px 0 30px rgba(0, 0, 0, 0.15)' : '-10px 0 50px rgba(0, 0, 0, 0.2)'
                    }}
                >
                    <button
                        onClick={closeModal}
                        style={{
                            position: 'absolute',
                            top: '16px',
                            right: '16px',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            border: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 10,
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#7333F2';
                            e.currentTarget.style.transform = 'rotate(90deg)';
                            e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                            e.currentTarget.style.transform = 'rotate(0deg)';
                            e.currentTarget.style.color = '#111111';
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>

                    <div style={{ padding: isMobile ? '60px 20px 40px' : '80px 40px 40px' }}>
                        <div style={{
                            width: '100%',
                            height: isMobile ? '220px' : '300px',
                            borderRadius: '16px',
                            overflow: 'hidden',
                            marginBottom: '24px'
                        }} className="fw-modal-item">
                            <img
                                src={selectedProject.image}
                                alt={selectedProject.title}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: shouldUseContainInPanels(selectedProject.id)
                                        ? (selectedProject.imageFit || 'contain')
                                        : 'cover',
                                    objectPosition: selectedProject.imagePosition || 'center',
                                    backgroundColor: shouldUseContainInPanels(selectedProject.id)
                                        ? (selectedProject.imageBg || '#f3f4f6')
                                        : 'transparent'
                                }}
                            />
                        </div>

                        <div style={{ marginBottom: '8px' }} className="fw-modal-item">
                            <span style={{
                                fontSize: isMobile ? '11px' : '13px',
                                fontWeight: 500,
                                color: '#7333F2',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em'
                            }}>
                                {selectedProject.period}
                            </span>
                        </div>

                        <h2 className="fw-modal-item" style={{
                            fontSize: isMobile ? '28px' : '36px',
                            fontWeight: 600,
                            color: 'rgb(17, 17, 17)',
                            marginBottom: '8px',
                            lineHeight: 1.2
                        }}>
                            {selectedProject.title}
                        </h2>

                        <h3 className="fw-modal-item" style={{
                            fontSize: isMobile ? '14px' : '18px',
                            fontWeight: 500,
                            color: 'rgb(107, 114, 128)',
                            marginBottom: '20px'
                        }}>
                            {selectedProject.subtitle}
                        </h3>

                        <p className="fw-modal-item" style={{
                            fontSize: isMobile ? '14px' : '16px',
                            lineHeight: 1.6,
                            color: 'rgb(31, 31, 31)',
                            marginBottom: '24px'
                        }}>
                            {selectedProject.description}
                        </p>
                        <div className="fw-modal-item" style={{ marginBottom: '24px' }}>
                            <h4 style={{
                                fontSize: '12px',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                color: 'rgb(107, 114, 128)',
                                marginBottom: '12px'
                            }}>
                                Key Highlights
                            </h4>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {selectedProject.highlights && selectedProject.highlights.map((highlight, index) => (
                                    <li key={index} style={{
                                        fontSize: isMobile ? '13px' : '15px',
                                        lineHeight: 1.6,
                                        color: 'rgb(31, 31, 31)',
                                        marginBottom: '10px',
                                        paddingLeft: '24px',
                                        position: 'relative'
                                    }}>
                                        <span style={{
                                            position: 'absolute',
                                            left: 0,
                                            top: '8px',
                                            width: '6px',
                                            height: '6px',
                                            borderRadius: '50%',
                                            backgroundColor: '#7333F2'
                                        }} />
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="fw-modal-item">
                            <h4 style={{
                                fontSize: '12px',
                                fontWeight: 600,
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                color: 'rgb(107, 114, 128)',
                                marginBottom: '12px'
                            }}>
                                Technologies Used
                            </h4>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {selectedProject.tech && selectedProject.tech.map((tech, index) => (
                                    <span
                                        key={index}
                                        style={{
                                            padding: isMobile ? '6px 12px' : '8px 16px',
                                            borderRadius: '20px',
                                            fontSize: isMobile ? '11px' : '13px',
                                            fontWeight: 500,
                                            backgroundColor: '#f8f7f6',
                                            color: 'rgb(17, 17, 17)',
                                            border: '1px solid rgba(0, 0, 0, 0.12)'
                                        }}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="fw-modal-item" style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            <button
                                type="button"
                                onClick={toggleMoreGallery}
                                style={{
                                    padding: isMobile ? '10px 14px' : '12px 18px',
                                    borderRadius: '999px',
                                    border: '1px solid #111111',
                                    background: showMoreGallery ? '#111111' : '#ffffff',
                                    color: showMoreGallery ? '#ffffff' : '#111111',
                                    fontWeight: 600,
                                    fontSize: isMobile ? '13px' : '14px',
                                    cursor: 'pointer',
                                    transition: 'all 0.25s ease'
                                }}
                            >
                                {showMoreGallery ? 'Hide Gallery' : 'View More'}
                            </button>
                            <button
                                type="button"
                                disabled={!selectedProject.sourceCodeUrl}
                                onClick={() => openExternalLink(selectedProject.sourceCodeUrl)}
                                style={{
                                    padding: '12px 18px',
                                    borderRadius: '999px',
                                    border: '1px solid #111111',
                                    background: '#ffffff',
                                    color: '#111111',
                                    fontWeight: 600,
                                    cursor: selectedProject.sourceCodeUrl ? 'pointer' : 'not-allowed',
                                    opacity: selectedProject.sourceCodeUrl ? 1 : 0.45,
                                    transition: 'all 0.25s ease'
                                }}
                                title={selectedProject.sourceCodeUrl ? 'Open source code' : 'Add sourceCodeUrl in project data'}
                            >
                                Source Code
                            </button>
                            <button
                                type="button"
                                disabled={!selectedProject.livePreviewUrl}
                                onClick={() => openExternalLink(selectedProject.livePreviewUrl)}
                                style={{
                                    padding: '12px 18px',
                                    borderRadius: '999px',
                                    border: '1px solid #111111',
                                    background: '#ffffff',
                                    color: '#111111',
                                    fontWeight: 600,
                                    cursor: selectedProject.livePreviewUrl ? 'pointer' : 'not-allowed',
                                    opacity: selectedProject.livePreviewUrl ? 1 : 0.45,
                                    transition: 'all 0.25s ease'
                                }}
                                title={selectedProject.livePreviewUrl ? 'Open live preview' : 'Add livePreviewUrl in project data'}
                            >
                                Preview
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {selectedProject && (
                <div
                    ref={morePanelRef}
                    style={{
                        position: 'fixed',
                        top: isMobile ? 'auto' : '50%',
                        left: isMobile ? '20px' : 'calc((100vw - min(100vw, 600px) - min(42vw, 480px)) / 2)',
                        bottom: isMobile ? '20px' : 'auto',
                        right: isMobile ? '20px' : 'auto',
                        transform: isMobile ? 'none' : 'translateY(-50%)',
                        width: isMobile ? 'calc(100% - 40px)' : 'min(50vw, 640px)',
                        maxHeight: isMobile ? '60vh' : '78vh',
                        overflowY: 'auto',
                        background: 'transparent',
                        border: 'none',
                        borderRadius: 0,
                        boxShadow: 'none',
                        padding: 0,
                        zIndex: 9999,
                        display: 'none'
                    }}
                >
                    <div style={{ marginBottom: '12px', padding: '0 4px' }}>
                        <p style={{ margin: 0, fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6b7280' }}>
                            Project Gallery
                        </p>
                    </div>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: isMobile ? 'repeat(auto-fit, minmax(100px, 1fr))' : 'repeat(2, minmax(0, 1fr))',
                            gap: '12px'
                        }}
                    >
                        {getCurrentGalleryImages().map((image, index) => (
                            <div
                                key={`gallery-${index}`}
                                style={{
                                    width: '100%',
                                    aspectRatio: '16 / 10',
                                    borderRadius: '14px',
                                    overflow: 'hidden',
                                    background: '#f3f4f6',
                                    border: '1px solid rgba(255,255,255,0.35)',
                                    boxShadow: '0 12px 30px rgba(0,0,0,0.22)'
                                }}
                            >
                                <img
                                    src={image}
                                    alt={`Gallery ${index + 1}`}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: shouldUseContainInPanels(selectedProject.id)
                                            ? (selectedProject.galleryImageFit || 'contain')
                                            : 'cover',
                                        objectPosition: selectedProject.imagePosition || 'center',
                                        backgroundColor: shouldUseContainInPanels(selectedProject.id)
                                            ? (selectedProject.imageBg || '#f3f4f6')
                                            : 'transparent'
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {selectedProject && (
                <>
                    <div
                        ref={layerOneRef}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            maxWidth: isMobile ? 'none' : '600px',
                            backgroundColor: '#f5f5f5',
                            zIndex: 9997
                        }}
                    />
                    <div
                        ref={layerTwoRef}
                        style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            bottom: 0,
                            width: '100%',
                            maxWidth: isMobile ? 'none' : '600px',
                            backgroundColor: '#e0e0e0',
                            zIndex: 9998
                        }}
                    />
                </>
            )}

            {selectedProject && (
                <div
                    ref={backdropRef}
                    onClick={closeModal}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 9996,
                        backdropFilter: 'blur(4px)'
                    }}
                />
            )}

            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative mb-8 sm:mb-12">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <h2
                            className="text-4xl sm:text-5xl font-medium tracking-tight"
                            style={{ color: 'rgb(17, 17, 17)' }}
                        >
                            Featured works
                        </h2>
                        <a
                            href="#"
                            className="flex items-center gap-2 text-base sm:text-lg font-medium hover:gap-3 transition-all duration-300"
                            style={{ color: 'rgb(17, 17, 17)' }}
                        >
                            All Works
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M7 3L14 10L7 17"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </a>
                    </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
                    {projects.map((project, index) => {
                        if (project.isSplit && project.splitItems) {
                            return (
                                <div key={project.id} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {project.splitItems.map((splitItem, splitIndex) => (
                                        <div
                                            key={splitItem.id}
                                            className="group relative overflow-hidden block w-full text-left"
                                            style={{ borderRadius: 0 }}
                                        >
                                            <button
                                                type="button"
                                                onClick={() => handleProjectClick(splitItem.id)}
                                                className="block w-full text-left cursor-pointer border-none bg-transparent p-0"
                                            >
                                                <div className="relative h-[240px] sm:h-[360px] overflow-hidden">
                                                    <img
                                                        src={splitItem.image}
                                                        alt={splitItem.title}
                                                        className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                                                        style={{
                                                            objectFit: splitItem.imageFit || 'cover',
                                                            objectPosition: splitItem.imagePosition || 'center',
                                                            backgroundColor: splitItem.imageBg || '#f3f4f6'
                                                        }}
                                                    />
                                                    <div className="absolute inset-0 bg-transparent" />
                                                </div>
                                            </button>
                                            <div className="px-3 sm:px-5 py-3 sm:py-4 bg-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
                                                <h3 className="text-lg sm:text-2xl font-bold text-gray-900 flex-1">{splitItem.title}</h3>
                                                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                                                    <button
                                                        type="button"
                                                        disabled={!splitItem.sourceCodeUrl}
                                                        onClick={() => openExternalLink(splitItem.sourceCodeUrl)}
                                                        style={{
                                                            padding: '6px 10px',
                                                            borderRadius: '999px',
                                                            border: '1px solid #111111',
                                                            background: '#ffffff',
                                                            color: '#111111',
                                                            fontWeight: 600,
                                                            fontSize: '11px',
                                                            cursor: splitItem.sourceCodeUrl ? 'pointer' : 'not-allowed',
                                                            opacity: splitItem.sourceCodeUrl ? 1 : 0.45,
                                                            transition: 'all 0.25s ease',
                                                            whiteSpace: 'nowrap'
                                                        }}
                                                        title={splitItem.sourceCodeUrl ? 'Open source code' : 'Add sourceCodeUrl in project data'}
                                                    >
                                                        Code
                                                    </button>
                                                    <button
                                                        type="button"
                                                        disabled={!splitItem.livePreviewUrl}
                                                        onClick={() => openExternalLink(splitItem.livePreviewUrl)}
                                                        style={{
                                                            padding: '6px 10px',
                                                            borderRadius: '999px',
                                                            border: '1px solid #111111',
                                                            background: '#111111',
                                                            color: '#ffffff',
                                                            fontWeight: 600,
                                                            fontSize: '11px',
                                                            cursor: splitItem.livePreviewUrl ? 'pointer' : 'not-allowed',
                                                            opacity: splitItem.livePreviewUrl ? 1 : 0.45,
                                                            transition: 'all 0.25s ease',
                                                            whiteSpace: 'nowrap'
                                                        }}
                                                        title={splitItem.livePreviewUrl ? 'Open live preview' : 'Add livePreviewUrl in project data'}
                                                    >
                                                        Preview
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            );
                        }

                        // Only show the thumbnail, no slideshow, and scale up on hover
                        return (
                            <div
                                key={project.id}
                                className="group relative overflow-hidden block w-full text-left"
                                style={{ borderRadius: 0 }}
                            >
                                <button
                                    type="button"
                                    onClick={() => handleProjectClick(project.id)}
                                    className="block w-full text-left cursor-pointer border-none bg-transparent p-0"
                                >
                                    <div className="relative h-[240px] sm:h-[360px] overflow-hidden">
                                        <img
                                            ref={(el) => (imageRefs.current[index] = el)}
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                                            style={{
                                                objectFit: project.imageFit || 'contain',
                                                objectPosition: project.imagePosition || 'center',
                                                backgroundColor: project.imageBg || '#f3f4f6'
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-transparent" />
                                    </div>
                                </button>
                                <div className="px-5 py-4 bg-white flex items-center justify-between gap-3">
                                    <h3 className="text-2xl font-bold text-gray-900">{project.title}</h3>
                                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                                        <button
                                            type="button"
                                            disabled={!project.sourceCodeUrl}
                                            onClick={() => openExternalLink(project.sourceCodeUrl)}
                                            style={{
                                                padding: '8px 12px',
                                                borderRadius: '999px',
                                                border: '1px solid #111111',
                                                background: '#ffffff',
                                                color: '#111111',
                                                fontWeight: 600,
                                                fontSize: '12px',
                                                cursor: project.sourceCodeUrl ? 'pointer' : 'not-allowed',
                                                opacity: project.sourceCodeUrl ? 1 : 0.45,
                                                transition: 'all 0.25s ease'
                                            }}
                                            title={project.sourceCodeUrl ? 'Open source code' : 'Add sourceCodeUrl in project data'}
                                        >
                                            Source Code
                                        </button>
                                        <button
                                            type="button"
                                            disabled={!project.livePreviewUrl}
                                            onClick={() => openExternalLink(project.livePreviewUrl)}
                                            style={{
                                                padding: '8px 12px',
                                                borderRadius: '999px',
                                                border: '1px solid #111111',
                                                background: '#111111',
                                                color: '#ffffff',
                                                fontWeight: 600,
                                                fontSize: '12px',
                                                cursor: project.livePreviewUrl ? 'pointer' : 'not-allowed',
                                                opacity: project.livePreviewUrl ? 1 : 0.45,
                                                transition: 'all 0.25s ease'
                                            }}
                                            title={project.livePreviewUrl ? 'Open live preview' : 'Add livePreviewUrl in project data'}
                                        >
                                            Preview
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeaturedWorks;
