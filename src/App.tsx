import React, { useState, useEffect } from 'react';
import { HeaderHero } from './components/HeaderHero';
import { ProjectsGrid } from './components/ProjectsGrid';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { PricingSection } from './components/PricingSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactModal } from './components/ContactModal';
import { projectsData, pricingPlans, testimonialsData } from './data/portfolioData';
import { Project } from './types';
import { AnimatePresence } from 'framer-motion';

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState<string>('projects');
  const [isContactOpen, setIsContactOpen] = useState(false);

  // Sync with URL hash for direct project routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) {
        setSelectedProject(null);
        return;
      }
      if (['projects-section', 'prices-section', 'testimonials-section'].includes(hash)) {
        setSelectedProject(null);
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
      const project = projectsData.find(p => p.id === hash);
      if (project) {
        setSelectedProject(project);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    window.location.hash = project.id;
  };

  const handleBackToPortfolio = () => {
    setSelectedProject(null);
    window.history.pushState(null, '', window.location.pathname);
  };

  const handleNavigateSection = (sectionId: string) => {
    if (selectedProject) {
      setSelectedProject(null);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(sectionId.replace('-section', ''));
  };

  return (
    <div className="min-h-screen bg-[#00a8ff] flex flex-col justify-between selection:bg-white selection:text-[#00a8ff] font-sans antialiased text-slate-900">
      
      {/* Top Header Hero: Full-Width 100vw White Section (No blue borders on left/right) */}
      <HeaderHero
        onNavigateSection={handleNavigateSection}
        activeSection={activeSection}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Centered SPA Main Content Flow */}
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6">
        
        <main className="w-full my-8 transition-all duration-300">
          <AnimatePresence mode="wait">
            {selectedProject ? (
              <ProjectDetailPage
                key={`project-${selectedProject.id}`}
                project={selectedProject}
                allProjects={projectsData}
                onBack={handleBackToPortfolio}
                onSelectProject={handleSelectProject}
                onOpenContact={() => setIsContactOpen(true)}
              />
            ) : (
              <div className="space-y-12 sm:space-y-16">
                
                {/* 1. Projects Section */}
                <section id="projects-section" className="scroll-mt-6">
                  <ProjectsGrid
                    projects={projectsData}
                    onSelectProject={handleSelectProject}
                  />
                </section>

                {/* Divider Line */}
                <div className="w-full max-w-2xl mx-auto h-px bg-white/25" />

                {/* 2. Prices Section */}
                <section id="prices-section" className="scroll-mt-6">
                  <PricingSection
                    plans={pricingPlans}
                    onOpenContact={() => setIsContactOpen(true)}
                  />
                </section>

                {/* Divider Line */}
                <div className="w-full max-w-2xl mx-auto h-px bg-white/25" />

                {/* 3. Testimonials Section */}
                <section id="testimonials-section" className="scroll-mt-6">
                  <TestimonialsSection
                    testimonials={testimonialsData}
                    onOpenContact={() => setIsContactOpen(true)}
                  />
                </section>

              </div>
            )}
          </AnimatePresence>
        </main>

        {/* Centered Footer */}
        <footer className="w-full mx-auto py-8 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between text-white/90 text-xs gap-3">
          <div>
            © {new Date().getFullYear()} <strong>Виктор Шандров</strong> — Уеб Дизайнер и Разработчик
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsContactOpen(true)}
              className="hover:text-white underline underline-offset-4"
            >
              Контакти
            </button>
            <span>•</span>
            <a
              href="mailto:viktor@shandrov.dev"
              className="hover:text-white"
            >
              viktor@shandrov.dev
            </a>
          </div>
        </footer>

      </div>

      {/* Contact Form Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

    </div>
  );
};

export default App;
