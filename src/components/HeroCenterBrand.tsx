import React from 'react';
import { motion } from 'framer-motion';

export const HeroCenterBrand: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-start justify-center select-none py-4">
      {/* Top Header Name & Megaphone */}
      <div className="relative mb-2">
        <div className="flex items-start justify-between max-w-[420px] gap-4">
          <div className="space-y-0.5">
            <h1 className="text-[#20b5fe] font-black text-4xl sm:text-5xl lg:text-[56px] tracking-tight leading-[1.02]">
              Viktor
            </h1>
            <h2 className="text-[#20b5fe] font-black text-4xl sm:text-5xl lg:text-[56px] tracking-tight leading-[1.02] sm:pl-8">
              Shandrov
            </h2>
          </div>

          {/* Megaphone Illustration Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: -12 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.1, rotate: -5 }}
            className="relative -mt-1 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center cursor-pointer shrink-0"
          >
            <img
              src="/assets/icon_megaphone.png"
              alt="Megaphone"
              className="w-full h-full object-contain drop-shadow-md"
            />
          </motion.div>
        </div>

        {/* Quote Box with Yellow Quotation Marks */}
        <div className="relative mt-4 mb-2 inline-block">
          {/* Top-Left Yellow Quote */}
          <img
            src="/assets/icon_quote.png"
            alt="Quote"
            className="absolute -top-3.5 left-2 w-5 h-5 sm:w-6 sm:h-6 z-20 object-contain drop-shadow"
          />

          {/* Quote Bubble */}
          <div className="bg-[#9fe3fc] text-[#005273] font-bold text-xs sm:text-sm lg:text-[15px] px-5 py-2 rounded-2xl shadow-xs border border-[#7ed6f8]">
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
    </div>
  );
};
