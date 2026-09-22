import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import { 
  ArrowLeft, 
  ExternalLink, 
  Github, 
  Layers, 
  CheckCircle2, 
  Calendar, 
  UserCheck, 
  Building2, 
  ChevronRight, 
  ChevronLeft,
  Sparkles,
  Send
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectDetailPageProps {
  project: Project;
  allProjects: Project[];
  onBack: () => void;
  onSelectProject: (project: Project) => void;
  onOpenContact: () => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  allProjects,
  onBack,
  onSelectProject,
  onOpenContact
}) => {
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveGalleryIndex(0);
  }, [project]);

  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-6 pb-20 text-slate-900"
    >
      
      {/* Top Floating Bar */}
      <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 sm:p-4 mb-6 shadow-[0_8px_25px_rgba(0,0,0,0.08)] border border-white flex items-center justify-between">
        <motion.button
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.97 }}
          onClick={onBack}
          className="flex items-center gap-2 text-[#0088cc] hover:text-[#005580] font-bold text-xs sm:text-sm px-3.5 py-2 rounded-xl hover:bg-slate-100 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Назад към портфолиото</span>
        </motion.button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#e1f5fe] text-[#0288d1]">
            {project.category}
          </span>
          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
            {project.year}
          </span>
        </div>
      </div>

      {/* Main Project Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-white mb-8">
        
        {/* Title & Metadata */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mb-2 leading-tight">
            {project.title}
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-normal">
            {project.subtitle}
          </p>

          {/* Meta Badges */}
          <div className="flex flex-wrap gap-3 mt-4 text-xs">
            {project.client && (
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-slate-700">
                <Building2 className="w-3.5 h-3.5 text-[#00a8ff]" />
                <span>Клиент: <strong>{project.client}</strong></span>
              </div>
            )}
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-slate-700">
              <UserCheck className="w-3.5 h-3.5 text-[#00a8ff]" />
              <span>Роля: <strong>{project.role}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg text-slate-700">
              <Calendar className="w-3.5 h-3.5 text-[#00a8ff]" />
              <span>Година: <strong>{project.year}</strong></span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-3 mt-6">
            {project.liveUrl && (
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00a8ff] hover:bg-[#0091ea] text-white font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                <span>Виж сайта на живо (Live Demo)</span>
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            )}

            {project.githubUrl && (
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm border border-slate-300 transition-all"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Репозиторий</span>
              </motion.a>
            )}
          </div>
        </div>

        {/* Screenshot / Gallery Hero View */}
        <div className="mb-10 bg-slate-100 rounded-2xl p-3 sm:p-4 border border-slate-200 shadow-inner">
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-md bg-white border border-slate-200">
            {project.id === 'yana-karlovska' ? (
              <img
                src={project.gallery[activeGalleryIndex]?.image || project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-cyan-950 text-white p-6 text-center">
                <Sparkles className="w-10 h-10 text-cyan-400 mb-2" />
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="text-xs text-slate-300 max-w-md mt-1">{project.shortDescription}</p>
              </div>
            )}
          </div>

          {/* Gallery Thumbnails / Tabs */}
          {project.gallery && project.gallery.length > 1 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
              {project.gallery.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveGalleryIndex(idx)}
                  className={`text-left p-2.5 rounded-xl border transition-all ${
                    activeGalleryIndex === idx
                      ? 'bg-white border-[#00a8ff] shadow-sm ring-1 ring-[#00a8ff]'
                      : 'bg-white/60 border-slate-200 hover:bg-white text-slate-600'
                  }`}
                >
                  <div className="font-bold text-xs text-slate-900 mb-0.5">{item.title}</div>
                  <div className="text-[11px] text-slate-500 line-clamp-1">{item.description}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Section: Overview, Problem & Solution, Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-6">
            
            {/* Overview */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00a8ff]" />
                За проекта
              </h3>
              <p className="text-slate-700 leading-relaxed text-sm">
                {project.fullDescription}
              </p>
            </div>

            {/* Problem vs Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <h4 className="text-amber-800 font-bold text-xs uppercase tracking-wider mb-1">
                  Предизвикателство
                </h4>
                <p className="text-slate-700 text-xs leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-cyan-50 border border-cyan-200">
                <h4 className="text-cyan-800 font-bold text-xs uppercase tracking-wider mb-1">
                  Решение
                </h4>
                <p className="text-slate-700 text-xs leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Ключови функционалности
              </h3>
              <ul className="space-y-2.5">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-slate-700 text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Right Column: Tech Stack & CTA */}
          <div className="space-y-6">
            
            {/* Tech Stack */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-[#00a8ff]" />
                <span>Технологичен стек</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 shadow-2xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Box */}
            <div className="bg-gradient-to-br from-[#006494] to-[#004e75] rounded-2xl p-5 text-white shadow-md">
              <h4 className="font-bold text-sm mb-1.5">Искате подобен уебсайт?</h4>
              <p className="text-xs text-cyan-100 leading-relaxed mb-4">
                Свържете се с мен за безплатна консултация и изготвяне на индивидуална оферта.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenContact}
                className="w-full py-2.5 rounded-xl bg-white hover:bg-cyan-50 text-[#006494] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <span>Започнете проект</span>
                <Send className="w-3.5 h-3.5" />
              </motion.button>
            </div>

          </div>

        </div>

        {/* Previous / Next Project Navigation */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex items-center justify-between">
          <motion.button
            whileHover={{ x: -4 }}
            onClick={() => onSelectProject(prevProject)}
            className="flex items-center gap-2 text-left p-2 rounded-xl hover:bg-slate-50 transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-[#00a8ff] group-hover:text-white transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Предишен</span>
              <span className="text-xs font-bold text-slate-800 group-hover:text-[#00a8ff] transition-colors">
                {prevProject.title}
              </span>
            </div>
          </motion.button>

          <motion.button
            whileHover={{ x: 4 }}
            onClick={() => onSelectProject(nextProject)}
            className="flex items-center gap-2 text-right p-2 rounded-xl hover:bg-slate-50 transition-colors group"
          >
            <div>
              <span className="text-[10px] text-slate-400 block font-semibold uppercase">Следващ</span>
              <span className="text-xs font-bold text-slate-800 group-hover:text-[#00a8ff] transition-colors">
                {nextProject.title}
              </span>
            </div>
            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-[#00a8ff] group-hover:text-white transition-colors">
              <ChevronRight className="w-4 h-4" />
            </div>
          </motion.button>
        </div>

      </div>

    </motion.div>
  );
};
