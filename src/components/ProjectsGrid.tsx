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
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8"
    >
      
      {/* "PROJECTS" Section Heading */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="text-center mb-6 sm:mb-8"
      >
        <h2 className="text-white font-black text-xl sm:text-2xl lg:text-3xl tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]">
          PROJECTS
        </h2>
      </motion.div>

      {/* Grid of Projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + index * 0.1, duration: 0.45, ease: 'easeOut' }}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectProject(project)}
            className="cursor-pointer group w-full max-w-[320px] transition-all duration-300"
          >
            {/* White Rounded Project Card */}
            <div className="bg-white rounded-3xl p-3 sm:p-3.5 shadow-[0_12px_30px_rgba(0,0,0,0.12)] border border-white/80 group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.2)] transition-all overflow-hidden flex flex-col">
              
              {/* Project Mockup / Screenshot Container */}
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-inner">
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
                  <div className="w-full h-full bg-gradient-to-br from-slate-900 to-cyan-950 p-3 flex flex-col justify-between text-white">
                    <div className="flex items-center justify-between text-[10px] text-cyan-300">
                      <span className="font-bold">{project.category}</span>
                      <span className="bg-cyan-500/20 px-2 py-0.5 rounded-full border border-cyan-400/30 font-mono">{project.year}</span>
                    </div>
                    <div className="font-serif text-sm font-bold text-white">{project.title}</div>
                    <div className="text-[10px] text-slate-300 line-clamp-1">{project.subtitle}</div>
                  </div>
                )}

                {/* Floating "Виж проект" Hover Pill */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-xs">
                  <span className="bg-white text-slate-900 font-bold text-xs px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <span>Преглед на проекта</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-cyan-600" />
                  </span>
                </div>
              </div>

              {/* Card Meta below image */}
              <div className="mt-3 px-1 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 group-hover:text-[#00a8ff] transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-1">
                    {project.subtitle}
                  </p>
                </div>
                <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-[#00a8ff] group-hover:text-white text-slate-400 flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

            </div>
          </motion.div>
        ))}
      </div>

    </motion.div>
  );
};
