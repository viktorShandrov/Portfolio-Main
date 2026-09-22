import React, { useState, useEffect } from 'react';
import { PinnedScrollStage } from './components/PinnedScrollStage';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { ContactModal } from './components/ContactModal';
import { projectsData, pricingPlans, testimonialsData } from './data/portfolioData';
import { Project } from './types';
import { AnimatePresence } from 'framer-motion';

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSection, setActiveSection] = useState<string>('intro');
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
        setActiveSection(hash.replace('-section', ''));
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToPortfolio = () => {
    setSelectedProject(null);
    window.history.pushState(null, '', window.location.pathname);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between selection:bg-[#00a8ff] selection:text-white font-sans antialiased text-slate-900">
      
      {/* Main Content Area */}
      <div className="w-full flex-1">
        <AnimatePresence mode="wait">
          {selectedProject ? (
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
              <ProjectDetailPage
                key={`project-${selectedProject.id}`}
                project={selectedProject}
                allProjects={projectsData}
                onBack={handleBackToPortfolio}
                onSelectProject={handleSelectProject}
                onOpenContact={() => setIsContactOpen(true)}
              />
            </div>
          ) : (
            /* Pinned In-Place Crossfade Stage (No visible page scrolling, pure opacity 0/1 transitions in place) */
            <PinnedScrollStage
              projects={projectsData}
              plans={pricingPlans}
              testimonials={testimonialsData}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              onSelectProject={handleSelectProject}
              onOpenContact={() => setIsContactOpen(true)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className={`w-full bg-slate-900 text-slate-400 py-8 border-t border-slate-800 text-xs z-30 relative ${!selectedProject ? 'pl-36 sm:pl-44 lg:pl-48' : ''}`}>
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left text-slate-300">
            © {new Date().getFullYear()} <strong className="text-white">Виктор Шандров</strong> — Уеб Дизайнер и Разработчик
          </div>
          <div className="flex items-center gap-4 text-slate-300">
            <button
              onClick={() => setIsContactOpen(true)}
              className="hover:text-white underline underline-offset-4 cursor-pointer"
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
        </div>
      </footer>

      {/* Contact Form Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

    </div>
  );
};

export default App;
