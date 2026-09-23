import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { HeroIntroSection } from './HeroIntroSection';
import { ViktorStickyVisual } from './ViktorStickyVisual';
import { PurpleStatementSection } from './PurpleStatementSection';
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

  // Track scroll progress through the 6-stage container (Intro -> Philosophy -> Projects -> Prices -> Certificates -> Testimonials)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Dynamic background transition: starts clean white, blooms into solid rich purple as the purple figure expands
  const stageBg = useTransform(scrollYProgress, [0.12, 0.17], ['#ffffff', '#a424c4']);

  // 1. Stage 0: Intro (Name & Quote) - fades out smoothly as scroll advances
  const opacityIntro = useTransform(scrollYProgress, [0, 0.08, 0.16], [1, 1, 0]);
  const scaleIntro = useTransform(scrollYProgress, [0, 0.08, 0.16], [1, 1, 0.94]);

  // 2. Stage 1: Purple Statement Section (AI Philosophy & Viktor Suit Popup)
  const opacityPhilosophy = useTransform(scrollYProgress, [0.15, 0.18, 0.47, 0.51], [0, 1, 1, 0]);
  const scalePhilosophy = useTransform(scrollYProgress, [0.15, 0.18, 0.47, 0.51], [0.95, 1, 1, 0.95]);

  // 3. Stage 2: Projects
  const opacityProjects = useTransform(scrollYProgress, [0.50, 0.54, 0.64, 0.68], [0, 1, 1, 0]);
  const scaleProjects = useTransform(scrollYProgress, [0.50, 0.54, 0.64, 0.68], [0.95, 1, 1, 0.95]);

  // 4. Stage 3: Prices
  const opacityPrices = useTransform(scrollYProgress, [0.67, 0.71, 0.80, 0.84], [0, 1, 1, 0]);
  const scalePrices = useTransform(scrollYProgress, [0.67, 0.71, 0.80, 0.84], [0.95, 1, 1, 0.95]);

  // 5. Stage 4: Certificates (Timeline range: Jan -> May -> Jun -> Sep)
  const opacityCertificates = useTransform(scrollYProgress, [0.83, 0.86, 0.93, 0.96], [0, 1, 1, 0]);
  const scaleCertificates = useTransform(scrollYProgress, [0.83, 0.86, 0.93, 0.96], [0.95, 1, 1, 0.95]);

  // 6. Stage 5: Testimonials
  const opacityTestimonials = useTransform(scrollYProgress, [0.95, 0.98, 1], [0, 1, 1]);
  const scaleTestimonials = useTransform(scrollYProgress, [0.95, 0.98, 1], [0.95, 1, 1]);

  // Synchronize the active section for navigation indicator
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.17) {
      if (activeSection !== 'intro') setActiveSection('intro');
    } else if (latest < 0.50) {
      if (activeSection !== 'philosophy') setActiveSection('philosophy');
    } else if (latest < 0.67) {
      if (activeSection !== 'projects') setActiveSection('projects');
    } else if (latest < 0.83) {
      if (activeSection !== 'prices') setActiveSection('prices');
    } else if (latest < 0.95) {
      if (activeSection !== 'certificates') setActiveSection('certificates');
    } else {
      if (activeSection !== 'testimonials') setActiveSection('testimonials');
    }
  });

  const handleNavigateToCert = (index: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const totalScroll = containerRef.current.offsetHeight - window.innerHeight;
    const certRatios = [0.85, 0.88, 0.91, 0.94];
    const targetRatio = certRatios[index] || 0.85;

    window.scrollTo({
      top: containerTop + targetRatio * totalScroll,
      behavior: 'smooth',
    });
  };

  const isIntro = activeSection === 'intro';

  return (
    /* 1200vh scroll container that drives the in-place crossfade across all stages */
    <div ref={containerRef} className="relative w-full h-[1200vh]">
      
      {/* 100vh Sticky Viewport: Fixed on screen with dynamic background transition to purple! */}
      <motion.div
        style={{ backgroundColor: stageBg }}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between select-none transition-colors duration-200"
      >
        
        {/* Main Stage Container (Full edge-to-edge for purple stages & centered max-w for content) */}
        <div className="w-full h-full relative flex items-center justify-center transition-all duration-300">
          
          {/* Central Stage where all sections transition smoothly */}
          <div className="relative w-full h-full flex items-center justify-center">
            
            {/* Stage 0: Hero Intro (Text on top, photo with arrows underneath on mobile) */}
            <motion.div
              style={{
                opacity: opacityIntro,
                scale: scaleIntro,
                pointerEvents: activeSection === 'intro' ? 'auto' : 'none',
              }}
              className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex flex-col lg:flex-row justify-between items-start lg:items-center w-full h-full overflow-hidden"
            >
              <div className="w-full flex-1 flex items-center justify-start">
                <HeroIntroSection />
              </div>
              {/* Mobile & Tablet Portrait + Arrows + Shine (Underneath the text) */}
              <div className="lg:hidden w-full h-[200px] sm:h-[300px] flex items-end justify-end relative pointer-events-none mt-auto">
                <ViktorStickyVisual scrollYProgress={scrollYProgress} />
              </div>
            </motion.div>

            {/* Stage 1: Purple Statement (AI Philosophy & Viktor Suit Popup) */}
            <motion.div
              style={{
                opacity: opacityPhilosophy,
                scale: scalePhilosophy,
                pointerEvents: activeSection === 'philosophy' ? 'auto' : 'none',
              }}
              className="absolute inset-0 w-full h-full overflow-hidden"
            >
              <PurpleStatementSection
                scrollYProgress={scrollYProgress}
                scrollRange={[0.16, 0.50]}
              />
            </motion.div>

            {/* Stage 2: Projects Showcase */}
            <motion.div
              style={{
                opacity: opacityProjects,
                scale: scaleProjects,
                pointerEvents: activeSection === 'projects' ? 'auto' : 'none',
              }}
              className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-center w-full"
            >
              <div className="w-full">
                <ProjectsGrid
                  projects={projects}
                  onSelectProject={onSelectProject}
                />
              </div>
            </motion.div>

            {/* Stage 3: Prices */}
            <motion.div
              style={{
                opacity: opacityPrices,
                scale: scalePrices,
                pointerEvents: activeSection === 'prices' ? 'auto' : 'none',
              }}
              className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-center w-full"
            >
              <div className="w-full">
                <PricingSection
                  plans={plans}
                  onOpenContact={onOpenContact}
                />
              </div>
            </motion.div>

            {/* Stage 4: Certificates (Vertical Interactive Timeline) */}
            <motion.div
              style={{
                opacity: opacityCertificates,
                scale: scaleCertificates,
                pointerEvents: activeSection === 'certificates' ? 'auto' : 'none',
              }}
              className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-center w-full"
            >
              <div className="w-full">
                <CertificatesSection
                  certificates={certificates}
                  scrollYProgress={scrollYProgress}
                  onNavigateToCert={handleNavigateToCert}
                />
              </div>
            </motion.div>

            {/* Stage 5: Testimonials */}
            <motion.div
              style={{
                opacity: opacityTestimonials,
                scale: scaleTestimonials,
                pointerEvents: activeSection === 'testimonials' ? 'auto' : 'none',
              }}
              className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-center w-full"
            >
              <div className="w-full">
                <TestimonialsSection
                  testimonials={testimonials}
                  onOpenContact={onOpenContact}
                />
              </div>
            </motion.div>

          </div>

          {/* Right Column (Hero Intro Desktop Viktor Portrait) */}
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
  );
};
