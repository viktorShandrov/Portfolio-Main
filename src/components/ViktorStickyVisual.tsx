import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ARROWS_SETTINGS = {
  zIndex: {
    arrowsContainer: 10,
    greenArrow: 11,
    orangeArrow: 12,
    lavenderArrow: 13,
    portrait: 20,
    purpleBadge: 25,
    emoji: 25,
  },
  rightPosition: 'right-[6%] sm:right-[10%] lg:right-[8%] xl:right-[5%]',
  bottomPosition: 'bottom-0 sm:bottom-4 lg:bottom-0',
  scale: 'scale-90 sm:scale-100 lg:scale-110 xl:scale-120',
  lavender: { right: '0%',  top: '0%'   },
  orange:   { right: '6%', top: '12%'  },
  green:    { right: '12%', top: '24%'  },
};

interface ViktorStickyVisualProps {
  showArrows?: boolean;
}

export const ViktorStickyVisual: React.FC<ViktorStickyVisualProps> = ({
  showArrows = true,
}) => {
  return (
    <div className="relative w-full h-full min-h-[500px] lg:h-screen flex items-end justify-end select-none overflow-visible">
      
      {/* 3 Layered Overlapping Arrows & Floating Badges Container (With Pop-Out exit) */}
      <AnimatePresence>
        {showArrows && (
          <motion.div
            key="arrows-cluster"
            initial={{
              opacity: 0,
              scale: 0.3,
              x: 140,
              y: 140,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
              transition: {
                type: 'spring',
                stiffness: 280,
                damping: 24,
              },
            }}
            exit={{
              opacity: [1, 1, 0],
              scale: [1, 1.12, 0.05],
              x: [0, 20, 180],
              y: [0, -10, 180],
              transition: {
                duration: 0.45,
                times: [0, 0.25, 1],
                ease: [0.32, 0, 0.67, 0],
              },
            }}
            style={{ zIndex: ARROWS_SETTINGS.zIndex.arrowsContainer }}
            className={`absolute ${ARROWS_SETTINGS.rightPosition} ${ARROWS_SETTINGS.bottomPosition} ${ARROWS_SETTINGS.scale} pointer-events-none w-[340px] sm:w-[440px] lg:w-[480px] xl:w-[540px] aspect-square flex items-end justify-end`}
          >
            {/* Top-Left: Purple Badge with Pop-Up Entrance & Continuous Spin */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 14,
                delay: 0.3,
              }}
              style={{ zIndex: ARROWS_SETTINGS.zIndex.purpleBadge }}
              className="absolute top-[10%] left-[50%] sm:left-[-50%] w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 pointer-events-auto"
            >
              <motion.img
                src="/assets/purple_badge.png"
                alt="Purple Badge"
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 14,
                  ease: 'linear',
                }}
                className="w-full h-full object-contain drop-shadow-md select-none"
              />
            </motion.div>

            {/* Bottom-Left: Yellow Smiling Emoji with Pop-Up Entrance & Continuous Spin */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 14,
                delay: 0.4,
              }}
              style={{ zIndex: ARROWS_SETTINGS.zIndex.emoji }}
              className="absolute bottom-[10%] left-[0%] sm:left-[25%] w-12 h-12 sm:w-20 sm:h-20 lg:w-20 lg:h-20 pointer-events-auto"
            >
              <motion.img
                src="/assets/emoji_smile.png"
                alt="Smiling Emoji"
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 12,
                  ease: 'linear',
                }}
                className="w-full h-full object-contain drop-shadow-md select-none"
              />
            </motion.div>

            {/* Overlapping Arrows Box */}
            <div className="relative w-full h-full">
              {/* 1. Lavender Arrow (Backmost) */}
              <motion.div
                initial={{ opacity: 0, x: -60, y: 60 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                style={{
                  right: ARROWS_SETTINGS.lavender.right,
                  top: ARROWS_SETTINGS.lavender.top,
                  zIndex: ARROWS_SETTINGS.zIndex.lavenderArrow,
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
                initial={{ opacity: 0, x: -60, y: 60 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                style={{
                  right: ARROWS_SETTINGS.orange.right,
                  top: ARROWS_SETTINGS.orange.top,
                  zIndex: ARROWS_SETTINGS.zIndex.orangeArrow,
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
                initial={{ opacity: 0, x: -60, y: 60 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
                style={{
                  right: ARROWS_SETTINGS.green.right,
                  top: ARROWS_SETTINGS.green.top,
                  zIndex: ARROWS_SETTINGS.zIndex.greenArrow,
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Viktor's Official Portrait (Bouncy Spring Pop-Up with Natural Overshoot) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.25, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{
          type: 'spring',
          stiffness: 190,
          damping: 12,
          mass: 0.5,
          delay: 0.15,
        }}
        style={{
          zIndex: ARROWS_SETTINGS.zIndex.portrait,
          transformOrigin: 'bottom right',
        }}
        className="relative w-full h-full flex items-end justify-end pointer-events-none origin-bottom-right"
      >
        <img
          src="/assets/blue.png"
          alt="Виктор Шандров"
          className="w-auto h-auto max-h-[500px] sm:max-h-[600px] lg:max-h-[85vh] xl:max-h-[92vh] object-contain object-bottom drop-shadow-[0_15px_35px_rgba(0,0,0,0.15)] pointer-events-auto transition-transform duration-500"
        />
      </motion.div>
    </div>
  );
};
