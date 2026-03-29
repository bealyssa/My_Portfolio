import { useState, useRef, useEffect } from 'react'
import Header from './components/Header'
import StaggeredMenu from './components/StaggeredMenu'
import Hero from './components/Hero'
import Philosophy from './components/Philosophy'
import SplitText from './components/SplitText'
import FeaturedWorks from './components/FeaturedWorks'
import MasonryGallery from './components/MasonryGallery'
import CraftSection from './components/CraftSection'
import FooterSection from './components/FooterSection'
import IntroLoader from './components/IntroLoader'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import './App.css'

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin)

const cvFile = '/assets/cv/BEALUGTU-CV.pdf'

const menuItems = [
  {
    image: 'https://picsum.photos/400/400?random=1',
    link: 'https://google.com/',
    title: 'Design',
    description: 'Creative UI/UX solutions'
  },
  {
    image: 'https://picsum.photos/400/400?random=2',
    link: 'https://google.com/',
    title: 'Development',
    description: 'Full-stack web apps'
  },
  {
    image: 'https://picsum.photos/400/400?random=3',
    link: 'https://google.com/',
    title: 'Branding',
    description: 'Visual identity design'
  },
  {
    image: 'https://picsum.photos/400/400?random=4',
    link: 'https://google.com/',
    title: 'Strategy',
    description: 'Digital transformation'
  },
  {
    image: 'https://picsum.photos/400/400?random=5',
    link: 'https://google.com/',
    title: 'Marketing',
    description: 'Growth & engagement'
  }
];

const staggeredMenuItems = [
  { label: 'Work', ariaLabel: 'View our work', link: '#work' },
  { label: 'About', ariaLabel: 'Learn about us', link: '#about-section' },
  { label: 'Services', ariaLabel: 'Our services', link: '#about-section' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' }
];

const socialItems = [
  { label: 'GitHub', link: 'https://github.com/bealyssa' },
  { label: 'LinkedIn', link: 'https://www.linkedin.com/in/bea-alyssa-lugtu' },
  { label: 'Gmail', link: 'mailto:lugtubealyssa@gmail.com' }
];

function AboutMeInlineSection() {
  const techSkills = [
    'React.js',
    'Tailwind CSS',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Express',
    'Sanity.io',
    'Full-Stack Development',
    'React Native',
    'Flutter & Dart',
    'UI/UX',
    'REST APIs',
    'MySQL',
    'PostgreSQL',
    'Firebase',
    'Supabase',
    'n8n',
    'Git & GitHub',
    'CI/CD',
    'Java',
    'C#',
    'Python',
    'Gemini',
    'OpenAI',
  ];

  return (
    <section
      id="about-section"
      className="relative bg-white"
      style={{
        paddingTop: '140px',
        paddingBottom: '460px',
      }}
    >
      <div className="max-w-[1100px] mx-auto px-6 lg:px-12">
        <SplitText
          text="About Me"
          className="mb-4"
          delay={22}
          duration={0.8}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 20 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.15}
          rootMargin="-80px"
          tag="p"
          textAlign="left"
          showCallback
          onLetterAnimationComplete={() => {
            // Callback hook kept for future section-level tracking.
          }}
          style={{
            fontSize: '12px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgb(107, 114, 128)',
          }}
        />

        <SplitText
          text="What about me and what I do?"
          className="mb-8"
          delay={45}
          duration={1.15}
          ease="power3.out"
          splitType="words, chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.15}
          rootMargin="-100px"
          tag="h2"
          textAlign="left"
          style={{
            fontSize: 'clamp(2.2rem, 5.6vw, 4.8rem)',
            lineHeight: 1.05,
            color: 'rgb(17, 17, 17)',
            fontWeight: 600,
            letterSpacing: '-0.02em',
          }}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <SplitText
            text="I design and ship frontend-first full-stack products that are scalable, reliable, and easy to use. Using React, TypeScript, Node.js, and Express, I turn raw ideas into production-ready web applications with clean architecture and polished user experience."
            className="w-full"
            delay={20}
            duration={1.05}
            ease="power2.out"
            splitType="words"
            from={{ opacity: 0, y: 28 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.2}
            rootMargin="-80px"
            tag="p"
            textAlign="left"
            style={{
              fontSize: '18px',
              lineHeight: 1.8,
              color: 'rgb(31, 31, 31)',
            }}
          />

          <SplitText
            text="I have delivered real client solutions, including a CMS and an e-commerce platform, and I also build LLM-powered AI agents with OpenAI and Gemini APIs. I focus on context-aware features that solve real problems, not just demos, so every build has practical value."
            className="w-full"
            delay={20}
            duration={1.05}
            ease="power2.out"
            splitType="words"
            from={{ opacity: 0, y: 28 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.2}
            rootMargin="-80px"
            tag="p"
            textAlign="left"
            style={{
              fontSize: '18px',
              lineHeight: 1.8,
              color: 'rgb(55, 65, 81)',
            }}
          />
        </div>

        <div style={{ marginTop: '44px' }}>
          <SplitText
            text="Tech Stack & Skills"
            className="mb-5"
            delay={26}
            duration={0.9}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 20 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.2}
            rootMargin="-80px"
            tag="h3"
            textAlign="left"
            style={{
              fontSize: '24px',
              lineHeight: 1.2,
              color: 'rgb(17, 17, 17)',
              fontWeight: 600,
              letterSpacing: '-0.015em',
            }}
          />

          <div className="flex flex-wrap gap-2.5">
            {techSkills.map((skill) => (
              <span
                key={skill}
                style={{
                  border: '1px solid rgba(17,17,17,0.16)',
                  borderRadius: '999px',
                  padding: '8px 12px',
                  fontSize: '13px',
                  fontWeight: 500,
                  color: 'rgb(31, 31, 31)',
                  backgroundColor: 'rgba(255,255,255,0.8)',
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [isIntroFinished, setIsIntroFinished] = useState(false);
  const [isHeroImageReady, setIsHeroImageReady] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const contentRef = useRef(null);
  const floatingPersonRef = useRef(null);

  const showIntro = !isIntroFinished || !isHeroImageReady;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const body = document.body;

    if (showIntro) {
      body.style.overflow = 'hidden';
      return;
    }

    body.style.overflow = '';

    return () => {
      body.style.overflow = '';
    };
  }, [showIntro]);

  useEffect(() => {
    if (!showIntro && contentRef.current) {
      // Fade in content once intro is done without introducing layout overflow.
      gsap.fromTo(
        contentRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.45, ease: 'power2.out' }
      );
    }
  }, [showIntro]);

  /*
  // MotionPath Waypoints animation for floating person image (DISABLED)
  useEffect(() => {
    if (!showIntro && floatingPersonRef.current) {
      // Wait for DOM to be ready
      const timer = setTimeout(() => {
        const vh = window.innerHeight;

        gsap.set(floatingPersonRef.current, { opacity: 0, scale: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: '#hero-section',
            start: 'bottom bottom',
            endTrigger: '#philosophy-section',
            end: 'bottom center',
            scrub: 1.5,
          }
        });

        // Fade in
        tl.to(floatingPersonRef.current, {
          opacity: 1,
          duration: 0.05,
        })
        // Fly along curved MotionPath waypoints to Philosophy section
        .to(floatingPersonRef.current, {
          motionPath: {
            path: [
              { x: vh * -0.28, y: vh * 0.35 },
              { x: vh * 0.22,  y: vh * 0.85 },
              { x: vh * -0.15, y: vh * 1.35 },
              { x: 0,          y: vh * 0.88 + 900 }
            ],
            curviness: 1.25,
            autoRotate: false,
          },
          scale: 0.38,
          ease: 'none',
          duration: 1,
        });
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [showIntro]);
  */

  return (
    <>
      {showIntro && <IntroLoader onComplete={() => setIsIntroFinished(true)} />}

      <Header isIntroFinished={isIntroFinished} />
      <StaggeredMenu
        position="right"
        items={staggeredMenuItems}
        socialItems={socialItems}
        cvLink={cvFile}
        displaySocials
        displayItemNumbering={false}
        menuButtonColor="#111111"
        openMenuButtonColor="#111111"
        changeMenuColorOnOpen={false}
        colors={['#f5f5f5', '#e0e0e0']}
        logoUrl=""
        accentColor="#7333F2"
        isFixed={true}
        isScrolled={isScrolled}
      />
      <div
        ref={contentRef}
        className="relative min-h-screen bg-white"
        style={{
          opacity: showIntro ? 0 : 1,
          pointerEvents: showIntro ? 'none' : 'auto'
        }}
      >
        {/*
        <img
          ref={floatingPersonRef}
          src={personFaceForScroll}
          alt=""
          style={{
            position: 'absolute',
            top: '12vh',
            left: '50%',
            transform: 'translateX(-50%)',
            height: '88vh',
            width: 'auto',
            zIndex: 40,
            opacity: 0,
            pointerEvents: 'none',
            objectFit: 'cover',
            objectPosition: 'bottom',
          }}
        />
        */}
        <Hero cvLink={cvFile} />
        <Philosophy />
        <AboutMeInlineSection />
        <MasonryGallery />
        <FeaturedWorks />
        <CraftSection />
        <FooterSection />
      </div>
    </>
  )
}

export default App



