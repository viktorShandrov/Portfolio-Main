import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface HeroLeftMenuProps {
  activeSection: string;
  onNavigateSection: (sectionId: string) => void;
  onOpenContact?: () => void;
}

export const HeroLeftMenu: React.FC<HeroLeftMenuProps> = ({
  activeSection,
  onNavigateSection
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Calculate live global page scroll progress (0% - 100%)
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'projects':
        return '1 / 3 • ПРОЕКТИ';
      case 'prices':
        return '2 / 3 • ЦЕНИ И ПАКЕТИ';
      case 'testimonials':
        return '3 / 3 • ОТЗИВИ';
      default:
        return 'ПОРТФОЛИО';
    }
  };

  return (
    <div className="w-full flex flex-col justify-between py-2 select-none">
      {/* Top Header Name & Megaphone */}
      <div className="relative mb-3">
        <div className="flex items-start justify-between max-w-[400px]">
          <div className="space-y-0.5">
            <h1 className="text-[#20b5fe] font-black text-3xl sm:text-4xl lg:text-[44px] tracking-tight leading-[1.02]">
              Viktor
            </h1>
            <h2 className="text-[#20b5fe] font-black text-3xl sm:text-4xl lg:text-[44px] tracking-tight leading-[1.02] sm:pl-6">
              Shandrov
            </h2>
          </div>

          {/* Megaphone Illustration Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: -12 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.1, rotate: -5 }}
            className="relative -mt-1 mr-1 sm:mr-2 w-13 h-13 sm:w-16 sm:h-16 flex items-center justify-center cursor-pointer"
          >
            <img
              src="/assets/icon_megaphone.png"
              alt="Megaphone"
              className="w-full h-full object-contain drop-shadow-md"
            />
          </motion.div>
        </div>

        {/* Quote Box with Yellow Quotation Marks */}
        <div className="relative mt-3 mb-3 inline-block">
          {/* Top-Left Yellow Quote */}
          <img
            src="/assets/icon_quote.png"
            alt="Quote"
            className="absolute -top-3.5 left-2 w-5 h-5 sm:w-6 sm:h-6 z-20 object-contain drop-shadow"
          />

          {/* Quote Bubble */}
          <div className="bg-[#9fe3fc] text-[#005273] font-bold text-xs sm:text-sm px-4.5 py-1.5 rounded-2xl shadow-xs border border-[#7ed6f8]">
            <span>“It always seems impossible until it's done.”</span>
          </div>

          {/* Bottom-Right Yellow Quote */}
          <img
            src="/assets/icon_quote.png"
            alt="Quote"
            className="absolute -bottom-3.5 right-4 w-5 h-5 sm:w-6 sm:h-6 z-20 object-contain drop-shadow transform rotate-180"
          />
        </div>
      </div>

      {/* Action Area with Binary code and Dark Teal Card */}
      <div className="relative flex items-center gap-3 sm:gap-4 mt-1">
        {/* Binary Code Block on Left */}
        <div className="flex flex-col font-mono text-xs sm:text-sm font-black text-slate-300 select-none tracking-widest leading-snug">
          <span>0 1 1 0</span>
          <span>1 0 0 1</span>
          <span>1 0 1 0</span>
        </div>

        {/* Dark Teal Action Box with Live Progress */}
        <div className="relative flex-1 max-w-[320px]">
          {/* Background Peeking Gold Coin at Bottom */}
          <div className="absolute -bottom-4 left-1/3 w-28 h-8 bg-amber-200/40 rounded-full blur-md -z-10" />

          {/* Main Dark Teal Card */}
          <div className="relative z-10 bg-[#006c99] rounded-3xl p-3.5 sm:p-4 shadow-[0_12px_28px_rgba(0,108,153,0.35)] border border-[#005c82]">
            
            {/* Live Section Header & Progress Badge */}
            <div className="flex items-center justify-between mb-3 px-1 border-b border-white/15 pb-2 text-[11px] font-bold text-cyan-100">
              <span className="tracking-wider">{getSectionTitle()}</span>
              <span className="font-mono text-[10px] bg-white/15 px-2 py-0.5 rounded-full text-white">
                {Math.round(scrollProgress)}%
              </span>
            </div>

            {/* Top Row: Projects & Prices */}
            <div className="grid grid-cols-2 gap-2.5 mb-2.5">
              {/* Button 1: Projects */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigateSection('projects-section')}
                className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-300 group cursor-pointer ${
                  activeSection === 'projects'
                    ? 'bg-white/25 ring-2 ring-white shadow-md scale-[1.03]'
                    : 'hover:bg-white/10 opacity-75 hover:opacity-100'
                }`}
              >
                <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-[#24b4f8] flex items-center justify-center p-2 shadow-sm mb-1 group-hover:scale-105 transition-transform border border-white/20">
                  <img
                    src="/assets/icon_projects.png"
                    alt="Projects"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-white text-xs font-bold tracking-wide flex items-center gap-1">
                  Projects
                  {activeSection === 'projects' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                </span>
              </motion.button>

              {/* Button 2: Prices */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigateSection('prices-section')}
                className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-300 group cursor-pointer ${
                  activeSection === 'prices'
                    ? 'bg-white/25 ring-2 ring-white shadow-md scale-[1.03]'
                    : 'hover:bg-white/10 opacity-75 hover:opacity-100'
                }`}
              >
                <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-[#24b4f8] flex items-center justify-center p-2 shadow-sm mb-1 group-hover:scale-105 transition-transform border border-white/20">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-200 border-2 border-yellow-100 flex items-center justify-center shadow-md">
                    <span className="font-extrabold text-amber-900 text-sm drop-shadow-xs">$</span>
                  </div>
                </div>
                <span className="text-white text-xs font-bold tracking-wide flex items-center gap-1">
                  Prices
                  {activeSection === 'prices' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  )}
                </span>
              </motion.button>
            </div>

            {/* Bottom Row: Testimonials */}
            <div className="grid grid-cols-2 gap-2.5 mb-3">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigateSection('testimonials-section')}
                className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-300 group cursor-pointer ${
                  activeSection === 'testimonials'
                    ? 'bg-white/25 ring-2 ring-white shadow-md scale-[1.03]'
                    : 'hover:bg-white/10 opacity-75 hover:opacity-100'
                }`}
              >
                <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-[#24b4f8] flex items-center justify-center p-2 shadow-sm mb-1 group-hover:scale-105 transition-transform border border-white/20">
                  <img
                    src="/assets/icon_testimonials.png"
                    alt="Testimonials"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-white text-xs font-bold tracking-wide flex items-center gap-1">
                  Testimonials
                  {activeSection === 'testimonials' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse" />
                  )}
                </span>
              </motion.button>

              <div />
            </div>

            {/* Live Progress Bar Track */}
            <div className="w-full bg-black/20 h-1.5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-300 via-yellow-300 to-emerald-400 rounded-full"
                style={{ width: `${scrollProgress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
