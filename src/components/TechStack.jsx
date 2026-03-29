import React, { useState } from 'react';

const reactjsIcon = '/assets/icons/reactjsicon3d.png';
const typescriptIcon = '/assets/icons/typescripticon3d.png';
const nodejsIcon = '/assets/icons/nodejsicon3d.png';
const tailwindIcon = '/assets/icons/tailwindicon3d.png';
const geminiIcon = '/assets/icons/geminiicon3d.png';
const gptIcon = '/assets/icons/gpticon3d.png';

const TechStack = () => {
    const [selectedTech, setSelectedTech] = useState(null);

    const techStack = [
        {
            name: 'React',
            icon: reactjsIcon,
            description: 'A JavaScript library for building user interfaces',
            usage: 'Built interactive UIs for J5 Pharmacy POS, ResQWave emergency dashboard, and Duel-Learn gamified platform',
            experience: '2+ years of hands-on experience building production apps'
        },
        {
            name: 'TypeScript',
            icon: typescriptIcon,
            description: 'JavaScript with syntax for types',
            usage: 'Type-safe development across all major projects, ensuring robust and maintainable code',
            experience: '2 years of professional TypeScript development'
        },
        {
            name: 'Node.js',
            icon: nodejsIcon,
            description: "JavaScript runtime built on Chrome's V8 engine",
            usage: 'Backend APIs for e-commerce, POS systems, and real-time emergency response applications',
            experience: '2+ years building scalable server-side applications'
        },
        {
            name: 'Tailwind CSS',
            icon: tailwindIcon,
            description: 'A utility-first CSS framework',
            usage: 'Crafted responsive, modern designs for all client projects with rapid prototyping',
            experience: '2 years creating pixel-perfect interfaces'
        },
        {
            name: 'Gemini AI',
            icon: geminiIcon,
            description: "Google's multimodal AI model",
            usage: 'Integrated into ResQWave for emergency validation and decision support with RAG framework',
            experience: '1 year building AI-powered features'
        },
        {
            name: 'GPT',
            icon: gptIcon,
            description: "OpenAI's language models",
            usage: "Powered Duel-Learn's automatic question generation from study materials using OCR + AI",
            experience: '1+ year implementing LLM-based solutions'
        }
    ];

    const handleClick = (tech) => {
        console.log('Tech clicked:', tech.name);
        setSelectedTech(tech);
    };

    const closeModal = () => {
        setSelectedTech(null);
    };

    return (
        <section className="relative bg-white py-20">
            {/* Modal */}
            {selectedTech && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        backdropFilter: 'blur(8px)',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        paddingTop: '80px',
                        paddingLeft: '24px',
                        paddingRight: '24px'
                    }}
                    onClick={closeModal}
                >
                    <div
                        style={{
                            backgroundColor: 'white',
                            borderRadius: '24px',
                            padding: '32px',
                            maxWidth: '640px',
                            width: '100%',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '24px' }}>
                            <img
                                src={selectedTech.icon}
                                alt={selectedTech.name}
                                style={{ width: '96px', height: '96px', objectFit: 'contain' }}
                            />
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontSize: '30px', fontWeight: 600, marginBottom: '8px', color: 'rgb(17, 17, 17)' }}>
                                    {selectedTech.name}
                                </h3>
                                <p style={{ fontSize: '16px', color: 'rgb(107, 114, 128)', marginBottom: '24px' }}>
                                    {selectedTech.description}
                                </p>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div>
                                        <h4 style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgb(156, 163, 175)', marginBottom: '8px' }}>
                                            What I Built With It
                                        </h4>
                                        <p style={{ fontSize: '16px', color: 'rgb(31, 31, 31)' }}>
                                            {selectedTech.usage}
                                        </p>
                                    </div>

                                    <div>
                                        <h4 style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgb(156, 163, 175)', marginBottom: '8px' }}>
                                            Experience
                                        </h4>
                                        <p style={{ fontSize: '16px', color: 'rgb(31, 31, 31)' }}>
                                            {selectedTech.experience}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={closeModal}
                            style={{
                                marginTop: '24px',
                                fontSize: '14px',
                                color: 'rgb(107, 114, 128)',
                                cursor: 'pointer',
                                background: 'none',
                                border: 'none',
                                padding: 0
                            }}
                        >
                            Click anywhere to close
                        </button>
                    </div>
                </div>
            )}

            <div className="max-w-[1200px] mx-auto px-6 lg:px-12">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '48px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: '36px', fontWeight: 500, marginBottom: '12px', color: 'rgb(17, 17, 17)' }}>
                            Tech Stack
                        </h3>
                        <p style={{ fontSize: '16px', color: 'rgb(107, 114, 128)' }}>
                            Click on any technology to learn more
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '24px',
                        width: '100%',
                        maxWidth: '768px'
                    }}>
                        {techStack.map((tech, index) => (
                            <button
                                key={index}
                                onClick={() => handleClick(tech)}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    gap: '12px',
                                    cursor: 'pointer',
                                    background: 'none',
                                    border: 'none',
                                    padding: 0,
                                    transition: 'transform 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                }}
                            >
                                <div style={{
                                    width: '96px',
                                    height: '96px',
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'rgba(255, 255, 255, 1)',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
                                    border: '1px solid rgba(0, 0, 0, 0.05)'
                                }}>
                                    <img
                                        src={tech.icon}
                                        alt={tech.name}
                                        style={{
                                            width: '64px',
                                            height: '64px',
                                            objectFit: 'contain'
                                        }}
                                    />
                                </div>
                                <span style={{
                                    fontSize: '14px',
                                    fontWeight: 500,
                                    color: 'rgb(55, 65, 81)'
                                }}>
                                    {tech.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechStack;


