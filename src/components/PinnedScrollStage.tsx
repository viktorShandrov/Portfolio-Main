import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { LeftSidebarMenu } from './LeftSidebarMenu';
import { HeroIntroSection } from './HeroIntroSection';
import { ViktorStickyVisual } from './ViktorStickyVisual';
import { ProjectsGrid } from './ProjectsGrid';
import { PricingSection } from './PricingSection';
import { TestimonialsSection } from './TestimonialsSection';
import { Project, PricingPlan, Testimonial } from '../types';

interface PinnedScrollStageProps {
  projects: Project[];
  plans: PricingPlan[];
  testimonials: Testimonial[];
  activeSection: string;
  setActiveSection: (section: string) => void;
  onSelectProject: (project: Project) => void;
  onOpenContact: () => void;
}

export const PinnedScrollStage: React.FC<PinnedScrollStageProps> = ({
  projects,
  plans,
  testimonials,
  activeSection,
  setActiveSection,
  onSelectProject,
  onOpenContact,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the 4-stage container (Intro -> Projects -> Prices -> Testimonials)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 1. Stage 0: Intro (Name & Quote) - Visible at top, fades out
  const opacityIntro = useTransform(scrollYProgress, [0, 0.16, 0.26], [1, 1, 0]);
  const scaleIntro = useTransform(scrollYProgress, [0, 0.16, 0.26], [1, 1, 0.94]);

  // 2. Stage 1: Projects - Fades in, stays visible, fades out
  const opacityProjects = useTransform(scrollYProgress, [0.22, 0.30, 0.44, 0.52], [0, 1, 1, 0]);
  const scaleProjects = useTransform(scrollYProgress, [0.22, 0.30, 0.44, 0.52], [0.95, 1, 1, 0.95]);

  // 3. Stage 2: Prices - Fades in, stays visible, fades out
  const opacityPrices = useTransform(scrollYProgress, [0.48, 0.56, 0.70, 0.78], [0, 1, 1, 0]);
  const scalePrices = useTransform(scrollYProgress, [0.48, 0.56, 0.70, 0.78], [0.95, 1, 1, 0.95]);

  // 4. Stage 3: Testimonials - Fades in, stays visible to the end
  const opacityTestimonials = useTransform(scrollYProgress, [0.74, 0.82, 1], [0, 1, 1]);
  const scaleTestimonials = useTransform(scrollYProgress, [0.74, 0.82, 1], [0.95, 1, 1]);

  // Synchronize the active section for sidebar menu indicator
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.24) {
      if (activeSection !== 'intro') setActiveSection('intro');
    } else if (latest < 0.50) {
      if (activeSection !== 'projects') setActiveSection('projects');
    } else if (latest < 0.76) {
      if (activeSection !== 'prices') setActiveSection('prices');
    } else {
      if (activeSection !== 'testimonials') setActiveSection('testimonials');
    }
  });

  const handleNavigateSection = (sectionId: string) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const totalScroll = containerRef.current.offsetHeight - window.innerHeight;

    let targetRatio = 0.36;
    if (sectionId.includes('prices')) {
      targetRatio = 0.63;
    } else if (sectionId.includes('testimonials')) {
      targetRatio = 0.90;
    } else {
      targetRatio = 0.36;
    }

    window.scrollTo({
      top: containerTop + targetRatio * totalScroll,
      behavior: 'smooth',
    });
  };

  const isIntro = activeSection === 'intro';

  return (
    /* 420vh scroll container that drives the in-place crossfade across all 4 stages */
    <div ref={containerRef} className="relative w-full h-[420vh]">
      
      {/* 100vh Sticky Viewport: Everything stays fixed on screen while content fades in place! */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between select-none bg-white">
        
        {/* Left Vertical Docked Sidebar (Contains ONLY Projects, Prices, Testimonials) */}
        <LeftSidebarMenu
          activeSection={activeSection}
          onNavigateSection={handleNavigateSection}
        />

        {/* Main Stage Grid (Between Sidebar and Right Visual) */}
        <div className="w-full h-full pl-36 sm:pl-44 lg:pl-48 pr-0 flex items-center justify-between relative">
          
          {/* Middle Content Stage (In-Place Crossfading: Intro -> Projects -> Prices -> Testimonials) */}
          <div
            className={`h-full flex flex-col justify-between py-5 sm:py-7 px-4 sm:px-6 lg:px-8 z-10 transition-all duration-500 ease-out ${
              isIntro
                ? 'w-full lg:w-[58%] xl:w-[54%]'
                : 'w-full lg:w-[70%] xl:w-[66%]'
            }`}
          >
            
            {/* Central Stage where all 4 sections transition smoothly in the exact same place */}
            <div className="relative w-full flex-1 flex items-center justify-center my-auto min-h-[420px] sm:min-h-[480px]">
              
              {/* Stage 0: Hero Intro (Name, Megaphone, Quote, Binary) */}
              <motion.div
                style={{
                  opacity: opacityIntro,
                  scale: scaleIntro,
                  pointerEvents: activeSection === 'intro' ? 'auto' : 'none',
                }}
                className="absolute inset-0 flex items-center justify-start w-full"
              >
                <div className="w-full">
                  <HeroIntroSection />
                </div>
              </motion.div>

              {/* Stage 1: Projects Showcase */}
              <motion.div
                style={{
                  opacity: opacityProjects,
                  scale: scaleProjects,
                  pointerEvents: activeSection === 'projects' ? 'auto' : 'none',
                }}
                className="absolute inset-0 flex items-center justify-center w-full"
              >
                <div className="w-full">
                  <ProjectsGrid
                    projects={projects}
                    onSelectProject={onSelectProject}
                  />
                </div>
              </motion.div>

              {/* Stage 2: Prices & Packages */}
              <motion.div
                style={{
                  opacity: opacityPrices,
                  scale: scalePrices,
                  pointerEvents: activeSection === 'prices' ? 'auto' : 'none',
                }}
                className="absolute inset-0 flex items-center justify-center w-full"
              >
                <div className="w-full">
                  <PricingSection
                    plans={plans}
                    onOpenContact={onOpenContact}
                  />
                </div>
              </motion.div>

              {/* Stage 3: Testimonials & Reviews */}
              <motion.div
                style={{
                  opacity: opacityTestimonials,
                  scale: scaleTestimonials,
                  pointerEvents: activeSection === 'testimonials' ? 'auto' : 'none',
                }}
                className="absolute inset-0 flex items-center justify-center w-full"
              >
                <div className="w-full">
                  <TestimonialsSection
                    testimonials={testimonials}
                    onOpenContact={onOpenContact}
                  />
                </div>
              </motion.div>

            </div>

            {/* Bottom Status / Navigation hint */}
            <div className="shrink-0 pt-2 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span className="font-bold text-cyan-700 uppercase">
                {activeSection === 'intro' && 'НАЧАЛО • ВИКТОР ШАНДРОВ'}
                {activeSection === 'projects' && '1 / 3 • ПРОЕКТИ'}
                {activeSection === 'prices' && '2 / 3 • ЦЕНИ И ПАКЕТИ'}
                {activeSection === 'testimonials' && '3 / 3 • ОТЗИВИ'}
              </span>
              <span className="text-slate-400 flex items-center gap-1.5">
                <span>Скролвайте за следваща секция</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#00a8ff] animate-ping" />
              </span>
            </div>

          </div>

          {/* Right Column: Fixed Sticky Viktor Portrait & Pop-Out 3D Arrows */}
          <div
            className={`hidden lg:flex h-full items-end justify-end relative z-20 pointer-events-none transition-all duration-500 ease-out ${
              isIntro
                ? 'lg:w-[42%] xl:w-[46%]'
                : 'lg:w-[30%] xl:w-[34%]'
            }`}
          >
            <ViktorStickyVisual showArrows={isIntro} />
          </div>

        </div>

      </div>

    </div>
  );
};
