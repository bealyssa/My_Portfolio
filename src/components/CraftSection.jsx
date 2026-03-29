import React from 'react';
import MetaBalls from './MetaBalls';

const CraftSection = () => {
    return (
        <section
            className="w-full mb-24"
            style={{
                borderTop: '1.5px solid #b7b7bc'
            }}
        >
            <div className="w-full pt-20 md:pt-36  pb-8 md:pb-12">
                <div className="w-full px-12 md:px-56">
                    <div className="max-w-[645px]">
                        <p className="text-4xl md:text-[28px] font-medium tracking-tight"
                            style={{ color: '#1f1f1f' }}>
Precision-led design, rigorously engineered systems, and meticulous execution combine to create calm, high-performing digital experiences that feel effortless.                        </p>
                    </div>
                </div>

                <div className="relative mt-12 md:mt-16 h-[420px] md:h-[520px] w-full max-w-[1200px] mx-auto">
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
                        <p className="text-[28px] md:text-[44px] font-medium text-[#000000] tracking-tight">
                            Code, Design, Motion
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CraftSection;


