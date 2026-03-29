import React from 'react';
import MetaBalls from './MetaBalls';

const CraftSection = () => {
    return (
        <section
            className="w-full mb-16 sm:mb-20 lg:mb-24"
            style={{
                borderTop: '1.5px solid #b7b7bc'
            }}
        >
            <div className="w-full pt-12 sm:pt-20 lg:pt-36 pb-6 sm:pb-8 lg:pb-12">
                <div className="w-full px-4 sm:px-8 lg:px-56">
                    <div className="max-w-[645px]">
                        <p className="text-2xl sm:text-3xl lg:text-4xl lg:md:text-[28px] font-medium tracking-tight"
                            style={{ color: '#1f1f1f' }}>
Precision-led design, rigorously engineered systems, and meticulous execution combine to create calm, high-performing digital experiences that feel effortless.                        </p>
                    </div>
                </div>

                <div className="relative mt-8 sm:mt-12 lg:mt-16 h-[300px] sm:h-[420px] lg:h-[520px] w-full max-w-[1200px] mx-auto">
                    <MetaBalls
                        color="#111111"
                        cursorBallColor="#f2f2f2"
                        cursorBallSize={4}
                        ballCount={15}
                        animationSize={30}
                        enableMouseInteraction
                        enableTransparency={true}
                        hoverSmoothness={0.15}
                        clumpFactor={1}
                        speed={0.3}
                    />

                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                        <p className="text-xl sm:text-2xl lg:text-[44px] lg:md:text-[28px] font-medium text-[#000000] tracking-tight px-4">
                            Code, Design, Motion
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CraftSection;


