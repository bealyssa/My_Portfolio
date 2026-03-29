import React from 'react';

const Header = ({ isIntroFinished = false }) => {
    const handleNavClick = (event, href) => {
        if (!href || !href.startsWith('#')) return;

        const target = document.querySelector(href);
        if (!target) return;

        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <header 
            className="absolute top-0 left-0 right-0 z-50 bg-transparent transition-opacity duration-500"
            style={{ opacity: isIntroFinished ? 1 : 0, pointerEvents: isIntroFinished ? 'auto' : 'none' }}
        >
            <div className="mx-auto px-4 sm:px-6 lg:px-28 py-4 sm:py-6">
                <div className="flex items-center justify-between">
                    {/* Logo/Name */}
                    <div className="text-[18px] sm:text-[20px] font-medium text-[#111111]">
                        © Bea Lugtu
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-[45px] font-medium text-[#111111]">
                        <a href="#work" onClick={(event) => handleNavClick(event, '#work')} className="hover:text-gray-900 transition-colors text-[15px]">
                            Work
                        </a>
                        <a href="#about-section" onClick={(event) => handleNavClick(event, '#about-section')} className="hover:text-gray-900 transition-colors text-[15px]">
                            About
                        </a>
                        <a href="#about-section" onClick={(event) => handleNavClick(event, '#about-section')} className="hover:text-gray-900 transition-colors text-[15px]">
                            Services
                        </a>
                        <a href="#contact" onClick={(event) => handleNavClick(event, '#contact')} className="hover:text-gray-900 transition-colors text-[15px]">
                            Contact
                        </a>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;


