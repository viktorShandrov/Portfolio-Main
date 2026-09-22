import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { LeftSidebarMenu } from './LeftSidebarMenu';
import { HeroCenterBrand } from './HeroCenterBrand';
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

  // Track scroll progress within the 300vh pinned container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Calculate opacity crossfade for each section in place:
  // 1. Projects: [0 -> 0.25 -> 0.36] (Visible at start, fades to 0)
  const opacityProjects = useTransform(scrollYProgress, [0, 0.22, 0.35], [1, 1, 0]);
  const scaleProjects = useTransform(scrollYProgress, [0, 0.22, 0.35], [1, 1, 0.95]);

  // 2. Prices: [0.32 -> 0.44 -> 0.58 -> 0.70] (Fades in, stays visible, fades to 0)
  const opacityPrices = useTransform(scrollYProgress, [0.32, 0.42, 0.58, 0.70], [0, 1, 1, 0]);
  const scalePrices = useTransform(scrollYProgress, [0.32, 0.42, 0.58, 0.70], [0.95, 1, 1, 0.95]);

  // 3. Testimonials: [0.67 -> 0.78 -> 1] (Fades in, stays visible to end)
  const opacityTestimonials = useTransform(scrollYProgress, [0.67, 0.78, 1], [0, 1, 1]);
  const scaleTestimonials = useTransform(scrollYProgress, [0.67, 0.78, 1], [0.95, 1, 1]);

  // Sync the active section for sidebar menu indicator
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.33) {
      if (activeSection !== 'projects') setActiveSection('projects');
    } else if (latest < 0.67) {
      if (activeSection !== 'prices') setActiveSection('prices');
    } else {
      if (activeSection !== 'testimonials') setActiveSection('testimonials');
    }
  });

  const handleNavigateSection = (sectionId: string) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const totalScroll = containerRef.current.offsetHeight - window.innerHeight;

    let targetRatio = 0.05;
    if (sectionId.includes('prices')) {
      targetRatio = 0.5;
    } else if (sectionId.includes('testimonials')) {
      targetRatio = 0.92;
    } else {
      targetRatio = 0.05;
    }

    window.scrollTo({
      top: containerTop + targetRatio * totalScroll,
      behavior: 'smooth',
    });
  };

  return (
    /* 300vh scroll container that drives the in-place crossfade */
    <div ref={containerRef} className="relative w-full h-[320vh]">
      
      {/* 100vh Sticky Viewport: Everything stays fixed in place on screen! */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between select-none bg-white">
        
        {/* Left Vertical Docked Sidebar */}
        <LeftSidebarMenu
          activeSection={activeSection}
          onNavigateSection={handleNavigateSection}
        />

        {/* Main Stage Grid (Between Sidebar and Right Visual) */}
        <div className="w-full h-full pl-36 sm:pl-44 lg:pl-48 pr-0 flex items-center justify-between relative">
          
          {/* Middle Content Stage (Branding + In-Place Crossfading Sections) */}
          <div className="w-full lg:w-[58%] xl:w-[54%] h-full flex flex-col justify-between py-4 sm:py-6 px-4 sm:px-8 z-10">
            
            {/* Top Fixed Brand: Viktor Shandrov, Megaphone, Quote */}
            <div className="shrink-0">
              <HeroCenterBrand />
            </div>

            {/* Central In-Place Crossfade Stage for Sections */}
            <div className="relative w-full flex-1 flex items-center justify-center my-auto min-h-[360px] sm:min-h-[420px]">
              
              {/* Section 1: Projects Showcase */}
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

              {/* Section 2: Prices & Packages */}
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

              {/* Section 3: Testimonials */}
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

          {/* Right Column: Fixed Sticky Viktor Portrait & 3D Arrows */}
          <div className="hidden lg:flex lg:w-[42%] xl:w-[46%] h-full items-end justify-end relative z-20 pointer-events-none">
            <ViktorStickyVisual />
          </div>

        </div>

      </div>

    </div>
  );
};
