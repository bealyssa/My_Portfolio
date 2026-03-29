import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';

const reactjsIcon = '/assets/icons/reactjsicon3d.png';
const typescriptIcon = '/assets/icons/typescripticon3d.png';
const nodejsIcon = '/assets/icons/nodejsicon3d.png';
const tailwindIcon = '/assets/icons/tailwindicon3d.png';
const geminiIcon = '/assets/icons/geminiicon3d.png';
const gptIcon = '/assets/icons/gpticon3d.png';

const techStack = [
    {
        id: 'react',
        name: 'React',
        icon: reactjsIcon,
        accent: 'rgba(70, 195, 255, 0.85)',
        uses: [
            'Composable UI architecture for fast iteration.',
            'Interactive sections, animations, and state-driven flows.',
            'Reusable components across portfolio and client products.'
        ]
    },
    {
        id: 'typescript',
        name: 'TypeScript',
        icon: typescriptIcon,
        accent: 'rgba(79, 143, 255, 0.85)',
        uses: [
            'Safer refactors with strict typing and contracts.',
            'Predictable API/data model integration.',
            'Long-term maintainability in production codebases.'
        ]
    },
    {
        id: 'node',
        name: 'Node.js',
        icon: nodejsIcon,
        accent: 'rgba(106, 197, 80, 0.85)',
        uses: [
            'Backend services for real-time and API workloads.',
            'Server-side tooling and workflow automation.',
            'Production-ready deployment pipelines.'
        ]
    },
    {
        id: 'tailwind',
        name: 'Tailwind',
        icon: tailwindIcon,
        accent: 'rgba(17, 176, 216, 0.85)',
        uses: [
            'Rapid UI composition with utility-first classes.',
            'Responsive polish across desktop and mobile.',
            'Visual consistency with minimal CSS bloat.'
        ]
    },
    {
        id: 'gemini',
        name: 'Gemini',
        icon: geminiIcon,
        accent: 'rgba(170, 112, 255, 0.85)',
        uses: [
            'Multimodal analysis for assistant workflows.',
            'Context-aware augmentation in intelligent features.',
            'AI-backed validation for complex scenarios.'
        ]
    },
    {
        id: 'gpt',
        name: 'GPT',
        icon: gptIcon,
        accent: 'rgba(255, 97, 120, 0.85)',
        uses: [
            'Language generation and summarization tasks.',
            'Content intelligence and automation flows.',
            'Conversational UX and knowledge tooling.'
        ]
    }
];

const slotPresets = {
    left: [
        { x: 210, y: -162, align: 'left' },
        { x: 255, y: -16, align: 'left' },
        { x: 190, y: 126, align: 'left' }
    ],
    center: [
        { x: -250, y: -154, align: 'right' },
        { x: 230, y: -164, align: 'left' },
        { x: 255, y: 38, align: 'left' }
    ],
    right: [
        { x: -264, y: -164, align: 'right' },
        { x: -284, y: -22, align: 'right' },
        { x: -232, y: 122, align: 'right' }
    ]
};

const DockEffect = () => {
    const stageRef = useRef(null);
    const dockRef = useRef(null);
    const iconRefs = useRef({});
    const [pointerX, setPointerX] = useState(null);
    const [selectedId, setSelectedId] = useState(techStack[2].id);
    const [anchor, setAnchor] = useState({ x: 0, y: 0 });

    const selectedIndex = useMemo(
        () => techStack.findIndex((item) => item.id === selectedId),
        [selectedId]
    );

    const selectedTech = useMemo(
        () => techStack.find((item) => item.id === selectedId) ?? techStack[0],
        [selectedId]
    );

    const activeSlots = useMemo(() => {
        if (selectedIndex <= 1) return slotPresets.left;
        if (selectedIndex >= techStack.length - 2) return slotPresets.right;
        return slotPresets.center;
    }, [selectedIndex]);

    const refreshAnchor = useCallback(() => {
        const stage = stageRef.current;
        const selectedIcon = iconRefs.current[selectedId];
        if (!stage || !selectedIcon) return;

        const stageRect = stage.getBoundingClientRect();
        const iconRect = selectedIcon.getBoundingClientRect();

        setAnchor({
            x: iconRect.left - stageRect.left + (iconRect.width / 2),
            y: iconRect.top - stageRect.top + (iconRect.height / 2)
        });
    }, [selectedId]);

    useEffect(() => {
        refreshAnchor();
        window.addEventListener('resize', refreshAnchor);
        return () => window.removeEventListener('resize', refreshAnchor);
    }, [refreshAnchor]);

    useEffect(() => {
        const callouts = stageRef.current?.querySelectorAll('.ts-callout');
        const lines = stageRef.current?.querySelectorAll('.ts-line');
        if (!callouts?.length || !lines?.length) return;

        gsap.fromTo(
            lines,
            { opacity: 0, scaleX: 0, transformOrigin: 'left center' },
            {
                opacity: 0.45,
                scaleX: 1,
                duration: 0.45,
                ease: 'power2.out',
                stagger: 0.06
            }
        );

        gsap.fromTo(
            callouts,
            { opacity: 0, y: 12, scale: 0.92 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.45,
                ease: 'power2.out',
                stagger: 0.08
            }
        );
    }, [selectedId]);

    const getMotionStyle = (id) => {
        const icon = iconRefs.current[id];
        const dock = dockRef.current;
        const isSelected = id === selectedId;

        if (!icon || !dock) {
            return {
                transform: isSelected ? 'translateY(-26px) scale(1.58)' : 'translateY(0px) scale(1)',
                zIndex: isSelected ? 30 : 10
            };
        }

        const dockRect = dock.getBoundingClientRect();
        const iconRect = icon.getBoundingClientRect();
        const iconCenter = iconRect.left - dockRect.left + iconRect.width / 2;
        const distance = pointerX == null ? 1000 : Math.abs(pointerX - iconCenter);

        const influence = Math.max(0, 1 - distance / 180);
        const hoverScale = 1 + influence * 0.5;
        const hoverLift = -influence * 10;

        const finalScale = isSelected ? Math.max(hoverScale, 1.58) : hoverScale;
        const finalLift = isSelected ? Math.min(hoverLift - 20, -24) : hoverLift;

        return {
            transform: `translateY(${finalLift}px) scale(${finalScale})`,
            zIndex: isSelected ? 30 : 10
        };
    };

    const onDockMove = (event) => {
        const dockRect = dockRef.current?.getBoundingClientRect();
        if (!dockRect) return;
        setPointerX(event.clientX - dockRect.left);
    };

    const onDockLeave = () => {
        setPointerX(null);
    };

    return (
        <section className="relative bg-white py-24" aria-label="Tech stack dock section">
            <div
                className="pointer-events-none absolute inset-x-0 top-0 h-[420px]"
                style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(35, 40, 48, 0.08), rgba(255, 255, 255, 0) 72%)'
                }}
            />

            <div ref={stageRef} className="relative max-w-[1200px] mx-auto px-6 lg:px-12">
                <div className="mb-12 text-center">
                    <p className="text-xs md:text-sm tracking-[0.32em] uppercase text-neutral-500 mb-3">
                        Core Tooling
                    </p>
                    <h3 className="text-4xl md:text-5xl font-semibold tracking-tight text-neutral-900">
                        Tech Stack Orbit
                    </h3>
                    <p className="mt-4 text-sm md:text-base text-neutral-600 max-w-[680px] mx-auto">
                        Click an icon to magnify it and reveal how I apply it in real projects.
                    </p>
                </div>

                <div className="relative flex justify-center pb-[220px] md:pb-[250px]">
                    <ul
                        ref={dockRef}
                        onMouseMove={onDockMove}
                        onMouseLeave={onDockLeave}
                        className="relative inline-flex items-end gap-2 md:gap-3 m-0 list-none px-5 md:px-7 py-4 rounded-[22px] border border-black/10"
                        style={{
                            background: 'linear-gradient(180deg, rgba(242, 244, 248, 0.96) 0%, rgba(230, 233, 239, 0.94) 100%)',
                            boxShadow: '0 25px 45px rgba(17, 24, 39, 0.14), inset 0 1px 0 rgba(255, 255, 255, 0.86)'
                        }}
                    >
                        {techStack.map((tech) => {
                            const motionStyle = getMotionStyle(tech.id);
                            const isSelected = tech.id === selectedId;

                            return (
                                <li
                                    key={tech.id}
                                    ref={(el) => {
                                        iconRefs.current[tech.id] = el;
                                    }}
                                    className="relative w-11 h-11 md:w-12 md:h-12"
                                    style={{
                                        transition: 'transform 260ms cubic-bezier(0.2, 0.7, 0.2, 1)',
                                        ...motionStyle
                                    }}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setSelectedId(tech.id)}
                                        className="relative w-full h-full rounded-[13px] border border-white/80 bg-white/95 p-[6px] md:p-[7px]"
                                        aria-label={`Select ${tech.name}`}
                                        style={{
                                            boxShadow: isSelected
                                                ? `0 10px 22px ${tech.accent}, 0 0 0 2px rgba(255,255,255,0.95)`
                                                : '0 6px 14px rgba(17, 24, 39, 0.14)'
                                        }}
                                    >
                                        <img
                                            className="block w-full h-full object-contain"
                                            src={tech.icon}
                                            alt={tech.name}
                                        />
                                    </button>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="hidden md:block absolute inset-0 pointer-events-none">
                        {selectedTech.uses.map((entry, index) => {
                            const slot = activeSlots[index];
                            const cardW = 228;
                            const cardH = 70;
                            const cardX = anchor.x + slot.x;
                            const cardY = anchor.y + slot.y;

                            const lineEndX = slot.align === 'left' ? cardX : cardX + cardW;
                            const lineEndY = cardY + cardH / 2;
                            const lineDx = lineEndX - anchor.x;
                            const lineDy = lineEndY - anchor.y;
                            const lineLength = Math.sqrt(lineDx * lineDx + lineDy * lineDy);
                            const lineAngle = Math.atan2(lineDy, lineDx) * (180 / Math.PI);

                            return (
                                <React.Fragment key={`${selectedTech.id}-callout-${index}`}>
                                    <span
                                        className="ts-line absolute h-[2px] bg-black/35"
                                        style={{
                                            left: `${anchor.x}px`,
                                            top: `${anchor.y}px`,
                                            width: `${lineLength}px`,
                                            transform: `rotate(${lineAngle}deg)`,
                                            transformOrigin: '0 50%'
                                        }}
                                    />

                                    <div
                                        className="ts-callout absolute rounded-xl px-4 py-3 border border-black/10 bg-white/95"
                                        style={{
                                            left: `${cardX}px`,
                                            top: `${cardY}px`,
                                            width: `${cardW}px`,
                                            minHeight: `${cardH}px`,
                                            boxShadow: '0 12px 28px rgba(17, 24, 39, 0.14)'
                                        }}
                                    >
                                        <p className="text-[11px] uppercase tracking-[0.18em] text-neutral-500 mb-1">
                                            {selectedTech.name}
                                        </p>
                                        <p className="text-[13px] leading-snug text-neutral-800">
                                            {entry}
                                        </p>
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </div>

                    <div className="md:hidden mt-8 w-full max-w-[540px] absolute left-1/2 -translate-x-1/2 top-[96px]">
                        <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-[0_18px_38px_rgba(17,24,39,0.14)]">
                            <p className="text-[11px] uppercase tracking-[0.22em] text-neutral-500 mb-2">
                                {selectedTech.name}
                            </p>
                            <ul className="space-y-2 list-disc pl-4 text-sm text-neutral-800">
                                {selectedTech.uses.map((entry) => (
                                    <li key={`${selectedTech.id}-${entry}`}>{entry}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DockEffect;
