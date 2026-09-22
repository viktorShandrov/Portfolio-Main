import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

interface LeftSidebarMenuProps {
  activeSection: string;
  onNavigateSection: (sectionId: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  iconType: 'projects' | 'prices' | 'certificates' | 'testimonials';
}

const MENU_ITEMS: MenuItem[] = [
  { id: 'projects', label: 'Projects', iconType: 'projects' },
  { id: 'prices', label: 'Prices', iconType: 'prices' },
  { id: 'certificates', label: 'Certificates', iconType: 'certificates' },
  { id: 'testimonials', label: 'Testimonials', iconType: 'testimonials' },
];

export const LeftSidebarMenu: React.FC<LeftSidebarMenuProps> = ({
  activeSection,
  onNavigateSection,
}) => {
  const activeIndex = Math.max(
    0,
    MENU_ITEMS.findIndex((item) => item.id === activeSection)
  );

  return (
    <aside className="fixed top-0 left-0 h-screen w-36 sm:w-44 lg:w-48 bg-[#1cb3fe] z-40 flex flex-col items-center justify-center shadow-2xl select-none border-r border-[#009ee8]/40">
      
      {/* Decorative subtle background lighting */}
      <div className="absolute top-1/4 left-0 w-32 h-32 bg-white/15 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-32 h-32 bg-[#0088cc]/30 rounded-full blur-2xl pointer-events-none" />

      {/* Vertical Track of Menu Cards */}
      <div className="relative w-full flex flex-col items-center justify-center space-y-3.5 sm:space-y-4 lg:space-y-5 py-4">
        {MENU_ITEMS.map((item, index) => {
          const isIntro = activeSection === 'intro';
          const distance = activeIndex >= 0 ? index - activeIndex : 0;
          const isActive = item.id === activeSection;

          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigateSection(`${item.id}-section`)}
              animate={{
                scale: isActive ? 1.05 : 0.9,
                opacity: isActive ? 1 : isIntro ? 0.75 : 0.45,
                y: isIntro ? 0 : distance * 4,
              }}
              whileHover={{ scale: isActive ? 1.08 : 0.98, opacity: 1 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className={`flex flex-col items-center cursor-pointer group relative transition-all duration-300 ${
                isActive ? 'z-20' : 'z-10'
              }`}
            >
              {/* Active Selection Frame / Bounding Box (Like Figma mockup) */}
              {isActive && (
                <motion.div
                  layoutId="sidebarActiveFrame"
                  className="absolute -inset-2 rounded-3xl border-2 border-white/90 bg-white/10 shadow-lg pointer-events-none"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                >
                  {/* Small 4 Corner Handles for Figma-style precision */}
                  <span className="absolute -top-1 -left-1 w-2 h-2 bg-white rounded-xs shadow-xs" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-xs shadow-xs" />
                  <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-white rounded-xs shadow-xs" />
                  <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-white rounded-xs shadow-xs" />
                </motion.div>
              )}

              {/* White Rounded Card with Icon */}
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-22 lg:h-22 rounded-2xl sm:rounded-3xl bg-white flex items-center justify-center p-2.5 sm:p-3.5 transition-all duration-300 ${
                  isActive
                    ? 'shadow-[0_12px_28px_rgba(0,0,0,0.18)] ring-2 ring-white'
                    : 'shadow-md group-hover:shadow-lg'
                }`}
              >
                {item.iconType === 'projects' && (
                  <img
                    src="/assets/icon_projects.png"
                    alt="Projects"
                    className="w-full h-full object-contain"
                  />
                )}

                {item.iconType === 'prices' && (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-200 border-2 border-yellow-100 flex items-center justify-center shadow-md">
                    <span className="font-black text-amber-900 text-base sm:text-lg drop-shadow-xs">$</span>
                  </div>
                )}

                {item.iconType === 'certificates' && (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 border-2 border-amber-100 flex items-center justify-center shadow-md text-amber-950">
                    <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                )}

                {item.iconType === 'testimonials' && (
                  <img
                    src="/assets/icon_testimonials.png"
                    alt="Testimonials"
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              {/* Label below the card */}
              <span
                className={`mt-1 sm:mt-1.5 font-bold text-[11px] sm:text-xs tracking-wide transition-colors ${
                  isActive
                    ? 'text-white font-black drop-shadow-sm'
                    : 'text-white/80 group-hover:text-white'
                }`}
              >
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Subtle Scroll Hint / Indicator at bottom */}
      <div className="absolute bottom-4 flex flex-col items-center text-white/70 text-[9px] font-mono tracking-widest uppercase">
        <span className="w-1 h-2.5 bg-white/40 rounded-full animate-bounce mb-1" />
        <span>SCROLL</span>
      </div>

    </aside>
  );
};
