import React from 'react';
import { Project } from '../types';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectsGridProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects, onSelectProject }) => {
  return (
    <div className="w-full max-w-[840px] mx-auto px-2 sm:px-4 py-2 sm:py-4">
      {/* "PROJECTS" Section Heading */}
      <div className="text-center mb-3 sm:mb-5">
        <h2 className="text-[#0077b6] font-black text-xl sm:text-2xl tracking-widest uppercase drop-shadow-xs">
          PROJECTS
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm font-medium mt-0.5">
          Подбрани реализирани проекти и клиентски платформи
        </p>
      </div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 justify-items-center">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.08, duration: 0.4 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectProject(project)}
            className="cursor-pointer group w-full max-w-[280px] transition-all duration-200"
          >
            {/* White Rounded Project Card */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-3 shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-slate-200/80 group-hover:border-[#00a8ff]/50 group-hover:shadow-[0_12px_28px_rgba(0,168,255,0.15)] transition-all overflow-hidden flex flex-col">
              
              {/* Project Mockup / Screenshot Container */}
              <div className="relative aspect-[16/10] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-inner">
                {project.id === 'yana-karlovska' ? (
                  <img
                    src="/assets/yana_website.png"
                    alt={project.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/project_yana_karlovska.png';
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-900 to-cyan-950 p-2.5 flex flex-col justify-between text-white">
                    <div className="flex items-center justify-between text-[9px] text-cyan-300">
                      <span className="font-bold">{project.category}</span>
                      <span className="bg-cyan-500/20 px-1.5 py-0.5 rounded-full border border-cyan-400/30 font-mono">{project.year}</span>
                    </div>
                    <div className="font-serif text-xs font-bold text-white line-clamp-1">{project.title}</div>
                    <div className="text-[9px] text-slate-300 line-clamp-1">{project.subtitle}</div>
                  </div>
                )}

                {/* Floating "Виж проект" Hover Pill */}
                <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center backdrop-blur-xs">
                  <span className="bg-white text-slate-900 font-bold text-[11px] px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                    <span>Преглед</span>
                    <ArrowUpRight className="w-3 h-3 text-cyan-600" />
                  </span>
                </div>
              </div>

              {/* Card Meta below image */}
              <div className="mt-2.5 px-0.5 flex items-center justify-between">
                <div className="min-w-0 pr-2">
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-[#00a8ff] transition-colors truncate">
                    {project.title}
                  </h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">
                    {project.subtitle}
                  </p>
                </div>
                <div className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-[#00a8ff] group-hover:text-white text-slate-400 flex items-center justify-center shrink-0 transition-colors">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
