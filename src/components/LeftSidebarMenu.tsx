import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, Tag, Award, MessageSquareQuote } from 'lucide-react';

interface LeftSidebarMenuProps {
  activeSection: string;
  onNavigateSection: (sectionId: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'projects',
    label: 'Projects',
    icon: LayoutGrid,
    iconBg: 'bg-blue-50',
    iconColor: 'text-[#0077b6]',
  },
  {
    id: 'prices',
    label: 'Prices',
    icon: Tag,
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    id: 'certificates',
    label: 'Certificates',
    icon: Award,
    iconBg: 'bg-yellow-50',
    iconColor: 'text-amber-700',
  },
  {
    id: 'testimonials',
    label: 'Testimonials',
    icon: MessageSquareQuote,
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
  },
];

export const LeftSidebarMenu: React.FC<LeftSidebarMenuProps> = ({
  activeSection,
  onNavigateSection,
}) => {
  return (
    <aside className="fixed top-0 left-0 h-screen w-16 sm:w-28 lg:w-48 bg-[#1cb3fe] z-40 flex flex-col items-center justify-center shadow-2xl select-none border-r border-[#009ee8]/40 transition-all duration-300">
      
      {/* Decorative subtle ambient glows */}
      <div className="absolute top-1/4 left-0 w-20 sm:w-32 h-20 sm:h-32 bg-white/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-20 sm:w-32 h-20 sm:h-32 bg-[#0088cc]/30 rounded-full blur-2xl pointer-events-none" />

      {/* Vertical Navigation Stack */}
      <div className="relative w-full flex flex-col items-center justify-center space-y-2.5 sm:space-y-4 lg:space-y-5 py-2 sm:py-4">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activeSection;

          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigateSection(`${item.id}-section`)}
              animate={{
                scale: isActive ? 1.05 : 0.92,
                opacity: isActive ? 1 : 0.7,
              }}
              whileHover={{ scale: isActive ? 1.07 : 0.98, opacity: 1 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="flex flex-col items-center cursor-pointer group relative"
            >
              {/* Clean White Card */}
              <div
                className={`w-11 h-11 sm:w-16 sm:h-16 lg:w-22 lg:h-22 rounded-xl sm:rounded-2xl lg:rounded-3xl bg-white flex items-center justify-center p-1.5 sm:p-2.5 lg:p-3.5 transition-all duration-200 ${
                  isActive
                    ? 'shadow-[0_8px_20px_rgba(0,0,0,0.18)] sm:shadow-[0_12px_28px_rgba(0,0,0,0.18)] ring-2 sm:ring-3 ring-white'
                    : 'shadow-sm sm:shadow-md group-hover:shadow-lg'
                }`}
              >
                <div className={`w-8 h-8 sm:w-11 sm:h-11 lg:w-14 lg:h-14 rounded-lg sm:rounded-xl lg:rounded-2xl ${item.iconBg} ${item.iconColor} flex items-center justify-center transition-transform group-hover:scale-105`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                </div>
              </div>

              {/* Label below the card */}
              <span
                className={`mt-1 sm:mt-1.5 font-bold text-[9px] sm:text-xs lg:text-sm tracking-tight sm:tracking-wide transition-colors ${
                  isActive
                    ? 'text-white font-black drop-shadow-xs'
                    : 'text-white/80 group-hover:text-white'
                }`}
              >
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Subtle Scroll Hint */}
      <div className="absolute bottom-2 sm:bottom-5 flex flex-col items-center text-white/75 text-[8px] sm:text-[10px] font-mono tracking-widest uppercase">
        <span className="w-0.5 sm:w-1 h-2 sm:h-3 bg-white/50 rounded-full animate-bounce mb-0.5 sm:mb-1" />
        <span className="hidden sm:inline">SCROLL</span>
      </div>

    </aside>
  );
};
