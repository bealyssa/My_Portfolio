import React, { useRef, useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const barangay175UserAcceptance = '/assets/gallerypics/Barangay-175-UserAccpetnce.jpg';
const brgyMeetingCdrm = '/assets/gallerypics/Brgy-MeetingCDRM.jpg';
const codingSessionThesis = '/assets/gallerypics/Coding-Session-THesis.jpg';
const internshipSollertia = '/assets/gallerypics/Internship-Sollertia.jpg';
const meetingWithPacketworxInc = '/assets/gallerypics/Meeting-with-PacketworxInc.jpg';
const packetworxGatewayDistribute = '/assets/gallerypics/Packetworx-Gateway-Distribute.jpg';
const sollertiaCodingSession = '/assets/gallerypics/Sollertia-Coding-Session.jpg';
const thesisBestStudyAwardee = '/assets/gallerypics/Thesis-BestStudyAwardee.png';
const thesisCodingScrum = '/assets/gallerypics/Thesis-Coding-Scrum.jpg';
const thesisInitial = '/assets/gallerypics/Thesis-Initial.jpg';

// Gallery tiles from local assets with titles based on file names.

const tiles = [
    {
        id: 1,
        title: 'Barangay 175 User Acceptance',
        subtitle: 'On-Site Demonstration',
        image: barangay175UserAcceptance,
        heightRatio: 1.25,
        link: '#',
    },
    {
        id: 2,
        title: 'CDRRM Council Coordination Meeting',
        subtitle: 'Stakeholder Alignment Session',
        image: brgyMeetingCdrm,
        heightRatio: 0.75,
        link: '#',
    },
    {
        id: 3,
        title: 'Thesis Development Session',
        subtitle: 'Focused Engineering Sprint',
        image: codingSessionThesis,
        heightRatio: 1.35,
        link: '#',
    },
    {
        id: 4,
        title: 'Sollertia Internship Experience',
        subtitle: 'Hands-On Product Development',
        image: internshipSollertia,
        heightRatio: 0.7,
        link: '#',
    },
    {
        id: 5,
        title: 'Meeting with Packetworx Inc.',
        subtitle: 'Technical Collaboration Review',
        image: meetingWithPacketworxInc,
        heightRatio: 1.15,
        link: '#',
    },
    {
        id: 6,
        type: 'text-break',
        heading: 'The work speaks.',
        subheading: 'Real projects. Zero fluff.',
        heightRatio: 0.85,
    },
    {
        id: 7,
        title: 'Packetworx Gateway Distribution',
        subtitle: 'Deployment and Handover',
        image: packetworxGatewayDistribute,
        heightRatio: 1.45,
        link: '#',
    },
    {
        id: 8,
        title: 'Sollertia Coding Session',
        subtitle: 'Implementation and Review',
        image: sollertiaCodingSession,
        heightRatio: 0.8,
        link: '#',
    },
    {
        id: 9,
        title: 'Thesis Best Study Award',
        subtitle: 'Recognition Ceremony',
        image: thesisBestStudyAwardee,
        heightRatio: 1.2,
        link: '#',
    },
    {
        id: 10,
        title: 'Thesis Coding Scrum',
        subtitle: 'Team Planning Session',
        image: thesisCodingScrum,
        heightRatio: 0.75,
        link: '#',
    },
    {
        id: 11,
        title: 'Initial Thesis Presentation',
        subtitle: 'Proposal Defense Session',
        image: thesisInitial,
        heightRatio: 1.3,
        link: '#',
    },
    {
        id: 12,
        title: 'Barangay 175 User Acceptance',
        subtitle: 'Community Validation Activity',
        image: barangay175UserAcceptance,
        heightRatio: 0.72,
        link: '#',
    },
    {
        id: 13,
        title: 'CDRRM Council Coordination Meeting',
        subtitle: 'Official Group Documentation',
        image: brgyMeetingCdrm,
        heightRatio: 1.2,
        link: '#',
    },
    {
        id: 14,
        title: 'Thesis Development Session',
        subtitle: 'Product Build Cycle',
        image: codingSessionThesis,
        heightRatio: 0.68,
        link: '#',
    },
    {
        id: 15,
        title: 'Sollertia Internship Experience',
        subtitle: 'Project Collaboration Day',
        image: internshipSollertia,
        heightRatio: 1.0,
        link: '#',
    },
];

// Masonry layout engine (single-column span, natural height ratios).

function computeMasonry(tiles, columns, gap, colWidth) {
    const colHeights = new Array(columns).fill(0);
    const positioned = [];

    tiles.forEach((tile) => {
        const tileHeight = colWidth * tile.heightRatio;

        // Place in shortest column
        let bestCol = 0;
        let bestHeight = Infinity;
        for (let c = 0; c < columns; c++) {
            if (colHeights[c] < bestHeight) {
                bestHeight = colHeights[c];
                bestCol = c;
            }
        }

        const x = bestCol * (colWidth + gap);
        const y = bestHeight;

        positioned.push({ ...tile, x, y, w: colWidth, h: tileHeight });
        colHeights[bestCol] = y + tileHeight + gap;
    });

    const totalHeight = Math.max(...colHeights);
    return { positioned, totalHeight };
}

// Main component.

const MasonryGallery = () => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);
    const tileRefs = useRef([]);
    const [layout, setLayout] = useState({ positioned: [], totalHeight: 0 });

    const GAP = 10;

    const recalcLayout = useCallback(() => {
        if (!containerRef.current) return;
        const containerWidth = containerRef.current.offsetWidth;
        let columns;
        if (containerWidth >= 1024) columns = 5;
        else if (containerWidth >= 768) columns = 4;
        else if (containerWidth >= 480) columns = 3;
        else columns = 2;

        const colWidth = (containerWidth - GAP * (columns - 1)) / columns;
        const result = computeMasonry(tiles, columns, GAP, colWidth);
        setLayout(result);
    }, []);

    useEffect(() => {
        recalcLayout();
        const ro = new ResizeObserver(() => recalcLayout());
        if (containerRef.current) ro.observe(containerRef.current);
        return () => ro.disconnect();
    }, [recalcLayout]);

    // Scroll-triggered fade-in for tiles
    useEffect(() => {
        if (layout.positioned.length === 0) return;

        const triggers = [];
        tileRefs.current.forEach((el) => {
            if (!el) return;
            const anim = gsap.fromTo(
                el,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 92%',
                        toggleActions: 'play reverse play reverse',
                    },
                }
            );
            if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
        });

        return () => triggers.forEach((t) => t.kill());
    }, [layout]);

    return (
        <section
            ref={sectionRef}
            className="py-24 px-4 md:px-8"
            style={{ backgroundColor: '#0a0a0a' }}
        >
            <div className="max-w-[1400px] mx-auto">
                {/* Section heading */}
                <div className="mb-16 flex justify-between items-end">
                    <h2 className="text-5xl md:text-6xl font-normal text-white tracking-tight leading-[1.1]">
                        Gallery
                    </h2>
                </div>

                {/* Masonry container */}
                <div
                    ref={containerRef}
                    className="relative w-full"
                    style={{ height: layout.totalHeight || 'auto' }}
                >
                    {layout.positioned.map((tile, i) => (
                        <div
                            key={tile.id}
                            ref={(el) => (tileRefs.current[i] = el)}
                            className="absolute"
                            style={{
                                left: tile.x,
                                top: tile.y,
                                width: tile.w,
                                height: tile.h,
                                opacity: 0,
                            }}
                        >
                            {tile.type === 'text-break' ? (
                                <div
                                    className="w-full h-full rounded-xl flex flex-col items-center justify-center px-6"
                                    style={{ backgroundColor: '#0d0d0d' }}
                                >
                                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center leading-tight tracking-tight">
                                        {tile.heading}
                                    </h3>
                                    <p className="text-white/40 text-sm md:text-base mt-3 text-center font-light tracking-wide">
                                        {tile.subheading}
                                    </p>
                                </div>
                            ) : (
                                <a
                                    href={tile.link || '#'}
                                    className="group block w-full h-full rounded-xl overflow-hidden relative"
                                >
                                    <img
                                        src={tile.image}
                                        alt={tile.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        style={{ filter: 'grayscale(100%)' }}
                                        loading="lazy"
                                    />
                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-end p-4 opacity-0 group-hover:opacity-100">
                                        <div>
                                            <h3 className="text-white text-sm font-semibold leading-tight">{tile.title}</h3>
                                            <p className="text-white/60 text-xs mt-0.5">{tile.subtitle}</p>
                                        </div>
                                    </div>
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MasonryGallery;


