import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { LeftSidebarMenu } from './LeftSidebarMenu';
import { HeroIntroSection } from './HeroIntroSection';
import { ViktorStickyVisual } from './ViktorStickyVisual';
import { ProjectsGrid } from './ProjectsGrid';
import { PricingSection } from './PricingSection';
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

  // Track scroll progress through the 5-stage container (Intro -> Projects -> Prices -> Certificates -> Testimonials)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 1. Stage 0: Intro (Name & Quote)
  const opacityIntro = useTransform(scrollYProgress, [0, 0.12, 0.20], [1, 1, 0]);
  const scaleIntro = useTransform(scrollYProgress, [0, 0.12, 0.20], [1, 1, 0.94]);

  // 2. Stage 1: Projects
  const opacityProjects = useTransform(scrollYProgress, [0.16, 0.24, 0.36, 0.44], [0, 1, 1, 0]);
  const scaleProjects = useTransform(scrollYProgress, [0.16, 0.24, 0.36, 0.44], [0.95, 1, 1, 0.95]);

  // 3. Stage 2: Prices
  const opacityPrices = useTransform(scrollYProgress, [0.40, 0.48, 0.58, 0.66], [0, 1, 1, 0]);
  const scalePrices = useTransform(scrollYProgress, [0.40, 0.48, 0.58, 0.66], [0.95, 1, 1, 0.95]);

  // 4. Stage 3: Certificates
  const opacityCertificates = useTransform(scrollYProgress, [0.62, 0.70, 0.80, 0.88], [0, 1, 1, 0]);
  const scaleCertificates = useTransform(scrollYProgress, [0.62, 0.70, 0.80, 0.88], [0.95, 1, 1, 0.95]);

  // 5. Stage 4: Testimonials
  const opacityTestimonials = useTransform(scrollYProgress, [0.84, 0.91, 1], [0, 1, 1]);
  const scaleTestimonials = useTransform(scrollYProgress, [0.84, 0.91, 1], [0.95, 1, 1]);

  // Synchronize the active section for sidebar menu indicator
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.20) {
      if (activeSection !== 'intro') setActiveSection('intro');
    } else if (latest < 0.44) {
      if (activeSection !== 'projects') setActiveSection('projects');
    } else if (latest < 0.66) {
      if (activeSection !== 'prices') setActiveSection('prices');
    } else if (latest < 0.88) {
      if (activeSection !== 'certificates') setActiveSection('certificates');
    } else {
      if (activeSection !== 'testimonials') setActiveSection('testimonials');
    }
  });

  const handleNavigateSection = (sectionId: string) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const totalScroll = containerRef.current.offsetHeight - window.innerHeight;

    let targetRatio = 0.30;
    if (sectionId.includes('prices')) {
      targetRatio = 0.53;
    } else if (sectionId.includes('certificates')) {
      targetRatio = 0.75;
    } else if (sectionId.includes('testimonials')) {
      targetRatio = 0.96;
    } else {
      targetRatio = 0.30;
    }

    window.scrollTo({
      top: containerTop + targetRatio * totalScroll,
      behavior: 'smooth',
    });
  };

  const isIntro = activeSection === 'intro';

  return (
    /* 520vh scroll container that drives the in-place crossfade across all 5 stages */
    <div ref={containerRef} className="relative w-full h-[520vh]">
      
      {/* 100vh Sticky Viewport: Everything stays fixed on screen while content fades in place! */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between select-none bg-white">
        
        {/* Left Vertical Docked Sidebar (Projects, Prices, Certificates, Testimonials) */}
        <LeftSidebarMenu
          activeSection={activeSection}
          onNavigateSection={handleNavigateSection}
        />

        {/* Main Stage Grid (Between Sidebar and Right Visual) */}
        <div className="w-full h-full pl-36 sm:pl-44 lg:pl-48 pr-0 flex items-center justify-between relative">
          
          {/* Middle Content Stage */}
          <div
            className={`h-full flex flex-col justify-between py-5 sm:py-7 px-4 sm:px-6 lg:px-8 z-10 transition-all duration-500 ease-out ${
              isIntro
                ? 'w-full lg:w-[58%] xl:w-[54%]'
                : 'w-full lg:w-[70%] xl:w-[66%]'
            }`}
          >
            
            {/* Central Stage where all 5 sections transition smoothly in the exact same place */}
            <div className="relative w-full flex-1 flex items-center justify-center my-auto min-h-[420px] sm:min-h-[480px]">
              
              {/* Stage 0: Hero Intro */}
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

              {/* Stage 2: Prices */}
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

              {/* Stage 3: Certificates */}
              <motion.div
                style={{
                  opacity: opacityCertificates,
                  scale: scaleCertificates,
                  pointerEvents: activeSection === 'certificates' ? 'auto' : 'none',
                }}
                className="absolute inset-0 flex items-center justify-center w-full"
              >
                <div className="w-full">
                  <CertificatesSection
                    certificates={certificates}
                  />
                </div>
              </motion.div>

              {/* Stage 4: Testimonials */}
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
                {activeSection === 'projects' && '1 / 4 • ПРОЕКТИ'}
                {activeSection === 'prices' && '2 / 4 • ЦЕНИ И ПАКЕТИ'}
                {activeSection === 'certificates' && '3 / 4 • СЕРТИФИКАТИ'}
                {activeSection === 'testimonials' && '4 / 4 • ОТЗИВИ'}
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
