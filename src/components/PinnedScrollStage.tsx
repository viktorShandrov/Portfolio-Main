import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { HeroIntroSection } from './HeroIntroSection';
import { ViktorStickyVisual } from './ViktorStickyVisual';
import { PurpleStatementSection } from './PurpleStatementSection';
import { Projects3DStage } from './Projects3DStage';
import { CertificatesSection } from './CertificatesSection';
import { TestimonialsSection } from './TestimonialsSection';
import { Project, PricingPlan, Testimonial, Certificate } from '../types';

interface PinnedScrollStageProps {
  projects: Project[];
  plans: PricingPlan[];
  certificates: Certificate[];
  testimonials: Testimonial[];
  activeSection: string;
  setActiveSection: (section: string) => void;
  onSelectProject: (project: Project) => void;
  onOpenContact: () => void;
}

export const PinnedScrollStage: React.FC<PinnedScrollStageProps> = ({
  projects,
  plans,
  certificates,
  testimonials,
  activeSection,
  setActiveSection,
  onSelectProject,
  onOpenContact,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress strictly for the pinned intro phase (Hero -> Purple Circle -> Philosophy Text Scroll)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Dynamic background transition: starts clean white, blooms into solid rich purple as the purple figure expands
  const stageBg = useTransform(scrollYProgress, [0.18, 0.30], ['#ffffff', '#a424c4']);

  // 1. Stage 0: Intro (Name, quote, photo, arrows)
  const opacityIntro = useTransform(scrollYProgress, [0, 0.18, 0.28], [1, 1, 0]);
  const scaleIntro = useTransform(scrollYProgress, [0, 0.18, 0.28], [1, 1, 0.94]);

  // 2. Stage 1: Purple Statement Section (Viktor Suit Popup & Full-Width Single-Line Text Scroll)
  const opacityPhilosophy = useTransform(scrollYProgress, [0.26, 0.32, 0.95, 1.0], [0, 1, 1, 1]);

  // Update active section state for hash routing / indicators
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.28) {
      if (activeSection !== 'intro') setActiveSection('intro');
    } else {
      if (activeSection !== 'philosophy') setActiveSection('philosophy');
    }
  });

  const isIntro = activeSection === 'intro';

  return (
    <div className="w-full">
      
      {/* 1. Pinned Intro Sequence (Hero Intro -> Purple Circle Expansion -> Philosophy Horizontal Text Stream) */}
      <div ref={containerRef} className="relative w-full h-[300vh]">
        
        {/* 100vh Sticky Viewport */}
        <motion.div
          style={{ backgroundColor: stageBg }}
          className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between select-none"
        >
          {/* Main Container */}
          <div className="w-full h-full relative flex items-center justify-center">
            
            {/* Stage 0: Hero Intro (White background, name, quote, arrows, expanding purple circle) */}
            <motion.div
              style={{
                opacity: opacityIntro,
                scale: scaleIntro,
                pointerEvents: isIntro ? 'auto' : 'none',
              }}
              className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col lg:flex-row justify-between items-start lg:items-center w-full h-full overflow-hidden"
            >
              <div className="w-full flex-1 flex items-center justify-start">
                <HeroIntroSection />
              </div>
              {/* Mobile & Tablet Portrait + Arrows */}
              <div className="lg:hidden w-full h-[200px] sm:h-[300px] flex items-end justify-end relative pointer-events-none mt-auto">
                <ViktorStickyVisual scrollYProgress={scrollYProgress} />
              </div>
            </motion.div>

            {/* Stage 1: Purple Statement (AI Philosophy Single-Line Text & Viktor Suit Popup) */}
            <motion.div
              style={{
                opacity: opacityPhilosophy,
                pointerEvents: !isIntro ? 'auto' : 'none',
              }}
              className="absolute inset-0 w-full h-full overflow-hidden"
            >
              <PurpleStatementSection
                scrollYProgress={scrollYProgress}
                scrollRange={[0.28, 0.95]}
              />
            </motion.div>

            {/* Desktop Hero Visual on right side during Intro */}
            <div
              className={`hidden lg:flex h-full items-end justify-end absolute right-4 lg:right-12 bottom-0 z-20 pointer-events-none transition-all duration-500 ease-out ${
                isIntro
                  ? 'opacity-100'
                  : 'opacity-0 pointer-events-none overflow-hidden'
              }`}
            >
              <ViktorStickyVisual scrollYProgress={scrollYProgress} showArrows={isIntro} />
            </div>

          </div>
        </motion.div>
      </div>

      {/* 2. Pinned 3D Projects Showcase Section that Morphs into Prices */}
      <section id="projects-section" className="w-full">
        <Projects3DStage
          projects={projects}
          plans={plans}
          onSelectProject={onSelectProject}
          onOpenContact={onOpenContact}
        />
      </section>

      {/* 3. Real Vertical Scrolling Content Flow (Certificates, Testimonials, Footer) with matching dark background */}
      <div className="w-full bg-[#070714] text-slate-100 relative z-30">

        {/* Section 3: Certificates & SoftUni Timeline */}
        <motion.section
          id="certificates-section"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto flex items-center justify-center"
        >
          <div className="w-full">
            <CertificatesSection
              certificates={certificates}
            />
          </div>
        </motion.section>

        {/* Section 4: Testimonials */}
        <motion.section
          id="testimonials-section"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto flex items-center justify-center pb-28 sm:pb-36"
        >
          <div className="w-full">
            <TestimonialsSection
              testimonials={testimonials}
              onOpenContact={onOpenContact}
            />
          </div>
        </motion.section>

      </div>

    </div>
  );
};
