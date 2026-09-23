import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Project } from '../types';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface Projects3DStageProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const Projects3DStage: React.FC<Projects3DStageProps> = ({
  projects,
  onSelectProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  // Scroll tracking strictly inside this 3D projects pinned container (420vh for smooth glide)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Train travel: Scrolling DOWN (0 -> 1) pulls train from distant right into big left foreground
  // Starts with Project 1 in foreground left (48vw), slides leftwards to -80% so all 4 projects traverse the viewport
  const trackTranslateX = useTransform(
    scrollYProgress,
    [0.02, 0.98],
    ['48vw', '-80%']
  );

  // Synchronize active project index based on scroll position
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const total = projects.length;
    const step = 1 / total;
    const index = Math.min(total - 1, Math.max(0, Math.floor(latest / step)));
    setActiveProjectIndex(index);
  });

  return (
    /* 420vh scroll container that locks the screen while all 4 projects glide through */
    <div ref={containerRef} className="relative w-full h-[420vh] bg-[#a424c4]">
      
      {/* 100vh Sticky 3D Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-6 sm:py-8 select-none">
        
        {/* Top Header: Section Title & Live Project Indicator */}
        <div className="relative z-30 max-w-7xl mx-auto w-full px-6 sm:px-10 flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 backdrop-blur-md mb-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span className="text-[11px] font-black uppercase tracking-widest text-cyan-200">
                ИЗБРАНИ ПРОЕКТИ • 3D ПЕРСПЕКТИВА
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-md">
              Реализирани Платформи & Сайтове
            </h2>
          </div>

          {/* Project Counter Pill */}
          <div className="hidden sm:flex items-center gap-3 bg-slate-950/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15 text-white">
            <span className="font-mono font-black text-cyan-300 text-sm">
              0{activeProjectIndex + 1}
            </span>
            <span className="text-white/40">/</span>
            <span className="font-mono text-white/60 text-xs">
              0{projects.length}
            </span>
            <div className="flex items-center gap-1.5 ml-2">
              {projects.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeProjectIndex
                      ? 'w-6 bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.8)]'
                      : 'w-1.5 bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 3D Perspective Stage Area: Left side is BIG & close, Right side recedes into distance */}
        <div
          className="relative w-full flex-1 flex items-center overflow-visible"
          style={{
            perspective: '1200px',
            perspectiveOrigin: '28% 50%',
          }}
        >
          {/* 38-degree tilted 3D Plane: Left is foreground, Right is deep in the distance */}
          <div
            style={{
              transform: 'rotateY(38deg) rotateX(6deg) rotateZ(1.5deg)',
              transformStyle: 'preserve-3d',
            }}
            className="w-full h-full flex items-center"
          >
            {/* 3D Motion Track that glides leftwards on scroll down */}
            <motion.div
              style={{
                x: trackTranslateX,
                transformStyle: 'preserve-3d',
              }}
              className="flex items-center gap-12 sm:gap-20 px-8 origin-left"
            >
              {projects.map((project) => {
                const coverImage = project.images?.[0] || project.thumbnail;

                return (
                  <motion.div
                    key={project.id}
                    whileHover={{
                      scale: 1.04,
                      y: -12,
                      transition: { duration: 0.25 },
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectProject(project)}
                    style={{ transformStyle: 'preserve-3d' }}
                    className="group relative cursor-pointer shrink-0 w-[580px] sm:w-[780px] md:w-[900px] lg:w-[1020px] xl:w-[1120px] aspect-[16/5.4] rounded-2xl sm:rounded-3xl bg-slate-900 border-2 border-white/30 shadow-[30px_35px_80px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-300 hover:border-cyan-400 hover:shadow-[35px_40px_100px_rgba(0,168,255,0.5)]"
                  >
                    {/* Website Banner Screenshot */}
                    {coverImage ? (
                      <img
                        src={coverImage}
                        alt={project.title}
                        className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-950 flex items-center justify-center text-white font-bold">
                        {project.title}
                      </div>
                    )}

                    {/* Gradient Glare Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tl from-black/60 via-transparent to-white/20 pointer-events-none" />

                    {/* Bottom Meta Bar overlay */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent p-4 sm:p-6 flex items-end justify-between backdrop-blur-xs">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/40">
                            {project.category}
                          </span>
                          <span className="text-[10px] sm:text-xs text-white/70 font-mono font-bold">
                            {project.year}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-2xl font-black text-white group-hover:text-cyan-300 transition-colors drop-shadow">
                          {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 line-clamp-1 mt-0.5">
                          {project.subtitle}
                        </p>
                      </div>

                      {/* View Details Pill Button */}
                      <div className="bg-white text-slate-950 font-black text-xs sm:text-sm px-4 py-2 sm:px-5 sm:py-2.5 rounded-full shadow-lg flex items-center gap-2 group-hover:bg-cyan-300 group-hover:scale-105 transition-all duration-200 shrink-0">
                        <span>Преглед</span>
                        <ArrowUpRight className="w-4 h-4 text-slate-900" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Bottom Hint */}
        <div className="relative z-30 max-w-7xl mx-auto w-full px-6 sm:px-10 flex items-center justify-between text-xs font-mono text-purple-200">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
            <span>Скролвайте надолу за преминаване през проектите</span>
          </span>
          <span className="hidden sm:block text-white/60">
            Кликнете върху проект за детайли
          </span>
        </div>

      </div>

    </div>
  );
};
