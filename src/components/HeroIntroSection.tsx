import React from 'react';
import { motion } from 'framer-motion';

export const HeroIntroSection: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-start justify-center select-none py-6 sm:py-10 max-w-[620px]">
      
      {/* Top Header Name & Megaphone */}
      <div className="relative mb-6">
        <div className="flex items-start justify-between max-w-[480px] gap-6">
          <div className="space-y-1">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[#20b5fe] font-black text-5xl sm:text-6xl lg:text-[72px] tracking-tight leading-[0.98]"
            >
              Viktor
            </motion.h1>
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-[#20b5fe] font-black text-5xl sm:text-6xl lg:text-[72px] tracking-tight leading-[0.98] sm:pl-8"
            >
              Shandrov
            </motion.h2>
          </div>

          {/* Megaphone Illustration Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -25 }}
            animate={{ opacity: 1, scale: 1, rotate: -12 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            whileHover={{ scale: 1.12, rotate: -4 }}
            className="relative -mt-2 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center cursor-pointer shrink-0"
          >
            <img
              src="/assets/icon_megaphone.png"
              alt="Megaphone"
              className="w-full h-full object-contain drop-shadow-xl"
            />
          </motion.div>
        </div>

        {/* Quote Box with Yellow Quotation Marks */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="relative mt-6 mb-4 inline-block"
        >
          {/* Top-Left Yellow Quote */}
          <img
            src="/assets/icon_quote.png"
            alt="Quote"
            className="absolute -top-4 left-2 w-6 h-6 sm:w-7 sm:h-7 z-20 object-contain drop-shadow"
          />

          {/* Quote Bubble */}
          <div className="bg-[#9fe3fc] text-[#005273] font-bold text-sm sm:text-base lg:text-lg px-6 py-2.5 rounded-2xl shadow-sm border border-[#7ed6f8]">
            <span>“It always seems impossible until it's done.”</span>
          </div>

          {/* Bottom-Right Yellow Quote */}
          <img
            src="/assets/icon_quote.png"
            alt="Quote"
            className="absolute -bottom-4 right-4 w-6 h-6 sm:w-7 sm:h-7 z-20 object-contain drop-shadow transform rotate-180"
          />
        </motion.div>
      </div>

      {/* Binary Matrix & Subtitle */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        className="flex items-center gap-6 mt-2"
      >
        <div className="flex flex-col font-mono text-xs sm:text-sm font-black text-slate-300 select-none tracking-widest leading-snug">
          <span>0 1 1 0</span>
          <span>1 0 0 1</span>
          <span>1 0 1 0</span>
        </div>

        <div className="border-l-2 border-[#20b5fe]/30 pl-4 text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">
          <p className="font-bold text-slate-800 text-sm sm:text-base">Уеб Дизайнер & Frontend Разработчик</p>
          <p className="text-slate-400 text-xs mt-0.5">Скролвайте надолу за разглеждане на проектите и офертите ↓</p>
        </div>
      </motion.div>

    </div>
  );
};
