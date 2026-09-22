import React from 'react';
import { motion } from 'framer-motion';

export const ARROWS_SETTINGS = {
  zIndex: {
    portrait: 20,
    arrowsContainer: 10,
    greenArrow: 11,
    orangeArrow: 12,
    lavenderArrow: 13,
  },
  rightPosition: 'right-[6%] sm:right-[10%] lg:right-[8%] xl:right-[10%]',
  bottomPosition: 'bottom-0 sm:bottom-4 lg:bottom-12',
  scale: 'scale-90 sm:scale-100 lg:scale-110 xl:scale-120',
  lavender: { right: '0%',  top: '0%'   },
  orange:   { right: '6%', top: '12%'  },
  green:    { right: '12%', top: '24%'  },
  animation: {
    initialX: -140,
    initialY: 140,
    duration: 0.75,
    delayGreen: 0.75,
    delayOrange: 0.55,
    delayLavender: 0.35,
  }
};

export const ViktorStickyVisual: React.FC = () => {
  return (
    <div className="relative w-full h-full min-h-[500px] lg:h-screen flex items-end justify-end select-none overflow-visible">
      {/* 3 Layered Overlapping Arrows Container (Behind Viktor) */}
      <div
        style={{ zIndex: ARROWS_SETTINGS.zIndex.arrowsContainer }}
        className={`absolute ${ARROWS_SETTINGS.rightPosition} ${ARROWS_SETTINGS.bottomPosition} ${ARROWS_SETTINGS.scale} pointer-events-none w-[340px] sm:w-[440px] lg:w-[480px] xl:w-[540px] aspect-square flex items-end justify-end`}
      >
        {/* Subtle Lavender Code Pill Badge (`</>`) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="absolute bottom-6 left-[0%] sm:left-[5%] z-15 w-16 h-12 sm:w-20 sm:h-16 rounded-2xl sm:rounded-3xl bg-[#ede9fe] shadow-xs flex items-center justify-center border border-purple-100"
        >
          <span className="text-white font-black text-lg sm:text-2xl tracking-tight drop-shadow-xs select-none">
            &lt;/&gt;
          </span>
        </motion.div>

        {/* Relative Overlapping Arrows Box */}
        <div className="relative w-full h-full">
          {/* 1. Lavender Arrow (Backmost) */}
          <motion.div
            initial={{
              opacity: 0,
              x: ARROWS_SETTINGS.animation.initialX,
              y: ARROWS_SETTINGS.animation.initialY
            }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{
              delay: ARROWS_SETTINGS.animation.delayLavender,
              duration: ARROWS_SETTINGS.animation.duration,
              ease: [0.16, 1, 0.3, 1]
            }}
            style={{
              right: ARROWS_SETTINGS.lavender.right,
              top: ARROWS_SETTINGS.lavender.top,
              zIndex: ARROWS_SETTINGS.zIndex.lavenderArrow
            }}
            className="absolute w-[68%]"
          >
            <img
              src="/assets/arrow_lavender_tight.png"
              alt="Lavender Arrow"
              className="w-full h-auto object-contain drop-shadow-lg"
            />
          </motion.div>

          {/* 2. Orange Arrow (Middle) */}
          <motion.div
            initial={{
              opacity: 0,
              x: ARROWS_SETTINGS.animation.initialX,
              y: ARROWS_SETTINGS.animation.initialY
            }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{
              delay: ARROWS_SETTINGS.animation.delayOrange,
              duration: ARROWS_SETTINGS.animation.duration,
              ease: [0.16, 1, 0.3, 1]
            }}
            style={{
              right: ARROWS_SETTINGS.orange.right,
              top: ARROWS_SETTINGS.orange.top,
              zIndex: ARROWS_SETTINGS.zIndex.orangeArrow
            }}
            className="absolute w-[68%]"
          >
            <img
              src="/assets/arrow_orange_tight.png"
              alt="Orange Arrow"
              className="w-full h-auto object-contain drop-shadow-lg"
            />
          </motion.div>

          {/* 3. Green Arrow (Front) */}
          <motion.div
            initial={{
              opacity: 0,
              x: ARROWS_SETTINGS.animation.initialX,
              y: ARROWS_SETTINGS.animation.initialY
            }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{
              delay: ARROWS_SETTINGS.animation.delayGreen,
              duration: ARROWS_SETTINGS.animation.duration,
              ease: [0.16, 1, 0.3, 1]
            }}
            style={{
              right: ARROWS_SETTINGS.green.right,
              top: ARROWS_SETTINGS.green.top,
              zIndex: ARROWS_SETTINGS.zIndex.greenArrow
            }}
            className="absolute w-[68%]"
          >
            <img
              src="/assets/arrow_green_tight.png"
              alt="Green Arrow"
              className="w-full h-auto object-contain drop-shadow-lg"
            />
          </motion.div>
        </div>
      </div>

      {/* Viktor's Official Portrait (Pinned in foreground) */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.85,
          ease: [0.22, 1, 0.36, 1]
        }}
        style={{ zIndex: ARROWS_SETTINGS.zIndex.portrait }}
        className="relative w-full h-full flex items-end justify-end pointer-events-none"
      >
        <img
          src="/assets/viktor_exact_transparent.png"
          alt="Виктор Шандров"
          className="w-auto h-auto max-h-[500px] sm:max-h-[600px] lg:max-h-[85vh] xl:max-h-[92vh] object-contain object-bottom drop-shadow-[0_15px_35px_rgba(0,0,0,0.15)] pointer-events-auto"
        />
      </motion.div>
    </div>
  );
};
