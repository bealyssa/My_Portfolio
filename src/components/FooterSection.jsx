import React from 'react';

const FooterSection = () => {
    return (
        <footer
            id="contact"
            className="w-full"
            style={{
                borderTop: '1.5px solid #b7b7bc'
            }}
        >
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-20 py-12 sm:py-16 lg:py-20">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 sm:gap-10 lg:gap-12 md:gap-8 items-start">

                    <div className="md:pl-0 lg:md:pl-20">
                        <h2
                            className="text-3xl sm:text-4xl lg:text-3xl font-medium tracking-tight"
                            style={{ color: '#1f1f1f' }}
                        >
                            Get in touch
                        </h2>

                        <div className="mt-6 sm:mt-8 lg:mt-10 text-base sm:text-[17px] font-medium leading-tight" style={{ color: '#1f1f1f' }}>
                            <p>lugtubealyssa@gmail.com</p>
                            <p>Caloocan, Philippines</p>
                        </div>
                    </div>

                    <div className="md:justify-self-end md:pr-0 lg:md:pr-4">
                        <nav className="flex flex-col text-base sm:text-[17px] font-medium leading-tight gap-2" style={{ color: '#1f1f1f' }}>
                            <a href="mailto:lugtubealyssa@gmail.com" className="transition-colors duration-200 hover:text-[#7333F2]">
                                Gmail
                            </a>
                            <a href="https://www.linkedin.com/in/bea-alyssa-lugtu" target="_blank" rel="noreferrer" className="transition-colors duration-200 hover:text-[#7333F2]">
                                Linkedin
                            </a>
                            <a href="https://github.com/bealyssa" target="_blank" rel="noreferrer" className="transition-colors duration-200 hover:text-[#7333F2]">
                                GitHub
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default FooterSection;


