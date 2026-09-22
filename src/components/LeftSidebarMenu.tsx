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
    <aside className="fixed top-0 left-0 h-screen w-36 sm:w-44 lg:w-48 bg-[#1cb3fe] z-40 flex flex-col items-center justify-center shadow-2xl select-none border-r border-[#009ee8]/40">
      
      {/* Decorative subtle ambient glows */}
      <div className="absolute top-1/4 left-0 w-32 h-32 bg-white/20 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-32 h-32 bg-[#0088cc]/30 rounded-full blur-2xl pointer-events-none" />

      {/* Vertical Navigation Stack */}
      <div className="relative w-full flex flex-col items-center justify-center space-y-3.5 sm:space-y-4 lg:space-y-5 py-4">
        {MENU_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === activeSection;

          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigateSection(`${item.id}-section`)}
              animate={{
                scale: isActive ? 1.05 : 0.92,
                opacity: isActive ? 1 : 0.65,
              }}
              whileHover={{ scale: isActive ? 1.07 : 0.98, opacity: 1 }}
              whileTap={{ scale: 0.94 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              className="flex flex-col items-center cursor-pointer group relative"
            >
              {/* Clean White Card */}
              <div
                className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-22 lg:h-22 rounded-2xl sm:rounded-3xl bg-white flex items-center justify-center p-2.5 sm:p-3.5 transition-all duration-200 ${
                  isActive
                    ? 'shadow-[0_12px_28px_rgba(0,0,0,0.18)] ring-3 ring-white'
                    : 'shadow-md group-hover:shadow-lg'
                }`}
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl ${item.iconBg} ${item.iconColor} flex items-center justify-center transition-transform group-hover:scale-105`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
              </div>

              {/* Label below the card */}
              <span
                className={`mt-1.5 font-bold text-xs sm:text-sm tracking-wide transition-colors ${
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
      <div className="absolute bottom-5 flex flex-col items-center text-white/75 text-[10px] font-mono tracking-widest uppercase">
        <span className="w-1 h-3 bg-white/50 rounded-full animate-bounce mb-1" />
        <span>SCROLL</span>
      </div>

    </aside>
  );
};
