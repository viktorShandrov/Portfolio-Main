import React from 'react';
import { motion, MotionValue, useTransform, useMotionValue } from 'framer-motion';

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
  rightPosition: 'right-[-4%] sm:right-[2%] lg:right-[8%] xl:right-[5%]',
  bottomPosition: 'bottom-0 sm:bottom-2 lg:bottom-0',
  scale: 'scale-55 sm:scale-75 md:scale-90 lg:scale-110 xl:scale-120',
  lavender: { right: '0%',  top: '0%'   },
  orange:   { right: '6%', top: '12%'  },
  green:    { right: '12%', top: '24%'  },
};

interface ViktorStickyVisualProps {
  showArrows?: boolean;
  scrollYProgress?: MotionValue<number>;
}

export const ViktorStickyVisual: React.FC<ViktorStickyVisualProps> = ({
  scrollYProgress,
}) => {
  // Synchronize arrows/badges fade & scale with the hero intro scroll progression
  const fallbackScroll = useMotionValue(0);
  const effectiveScroll = scrollYProgress || fallbackScroll;
  
  // Portrait, arrows and emoji fade out as scroll progresses
  const elementsOpacity = useTransform(effectiveScroll, [0, 0.08, 0.16], [1, 1, 0]);
  const elementsScale = useTransform(effectiveScroll, [0, 0.08, 0.16], [1, 1, 0.94]);

  // The purple badge figure itself grows slower and smoother on scroll to cover the entire screen
  const purpleCircleScale = useTransform(
    effectiveScroll,
    [0, 0.05, 0.12, 0.22],
    [1, 2.2, 10, 85]
  );
  const purpleCircleRotate = useTransform(effectiveScroll, [0, 0.22], [0, 90]);

  return (
    <div className="relative w-full h-full min-h-[220px] sm:min-h-[340px] lg:min-h-[500px] lg:h-screen flex items-end justify-end select-none overflow-visible">
      
      {/* 3 Layered Overlapping Arrows & Floating Badges Container */}
      <div
        className={`absolute ${ARROWS_SETTINGS.rightPosition} ${ARROWS_SETTINGS.bottomPosition} ${ARROWS_SETTINGS.scale} origin-bottom-right pointer-events-none w-[240px] sm:w-[360px] lg:w-[480px] xl:w-[540px] aspect-square flex items-end justify-end`}
      >
        <motion.div
          key="arrows-cluster-inner"
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
          className="relative w-full h-full flex items-end justify-end"
        >
            {/* Top-Left: Expanding Purple Badge Figure (No extra circle around it) */}
            <motion.div
              style={{
                zIndex: 60,
                scale: purpleCircleScale,
                rotate: purpleCircleRotate,
                transformOrigin: 'center center',
              }}
              className="absolute top-[8%] left-[10%] sm:left-[-30%] lg:left-[-45%] w-11 h-11 sm:w-16 sm:h-16 lg:w-24 lg:h-24 pointer-events-auto"
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
                className="w-full h-full object-contain select-none"
              />
            </motion.div>

            {/* Other arrows & emoji that fade out on scroll */}
            <motion.div
              style={{
                opacity: elementsOpacity,
                scale: elementsScale,
              }}
              className="relative w-full h-full pointer-events-none"
            >
              {/* Bottom-Left: Yellow Smiling Emoji with Pop-Up Entrance & Continuous Spin */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 280,
                  damping: 14,
                  delay: 1.5,
                }}
                style={{ zIndex: ARROWS_SETTINGS.zIndex.emoji }}
                className="absolute bottom-[6%] left-[2%] sm:left-[10%] lg:left-[20%] w-9 h-9 sm:w-14 sm:h-14 lg:w-20 lg:h-20 pointer-events-auto"
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
        </motion.div>
      </div>

      {/* Viktor's Official Portrait (Bouncy Spring Pop-Up with Natural Overshoot & Smooth Scroll Fade) */}
      <motion.div
        style={{
          opacity: elementsOpacity,
          scale: elementsScale,
          zIndex: ARROWS_SETTINGS.zIndex.portrait,
          transformOrigin: 'bottom right',
        }}
        className="relative w-full h-full flex items-end justify-end pointer-events-none origin-bottom-right"
      >
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
          className="relative inline-flex items-end justify-end pointer-events-auto group w-full h-full"
        >
          {/* Base portrait image */}
          <img
            src="/assets/blue.png"
            alt="Виктор Шандров"
            className="w-auto h-auto max-h-[220px] sm:max-h-[360px] md:max-h-[480px] lg:max-h-[85vh] xl:max-h-[92vh] object-contain object-bottom drop-shadow-[0_15px_35px_rgba(0,0,0,0.15)] transition-transform duration-500"
          />

          {/* Luminous Light Sweep / Shine Overlay (Strictly alpha-masked to the person's silhouette) */}
          <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{
              WebkitMaskImage: 'url(/assets/blue.png)',
              maskImage: 'url(/assets/blue.png)',
              WebkitMaskSize: 'contain',
              maskSize: 'contain',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
              WebkitMaskPosition: 'bottom right',
              maskPosition: 'bottom right',
            }}
          >
            {/* Soft Ambient Light Glow Wave */}
            <motion.div
              className="absolute inset-0 w-[260%] h-[260%] -top-[80%] -left-[80%]"
              initial={{ transform: 'translateX(-120%) translateY(120%) rotate(-35deg)' }}
              animate={{ transform: 'translateX(120%) translateY(-120%) rotate(-35deg)' }}
              transition={{
                // repeat: Infinity,
                repeatDelay: 3.2,
                duration: 5,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0) 32%, rgba(255,255,255,0.2) 42%, rgba(255,255,255,0.7) 49%, rgba(255,255,255,0.95) 50%, rgba(255,255,255,0.7) 51%, rgba(255,255,255,0.2) 58%, rgba(255,255,255,0) 68%, transparent 100%)',
                mixBlendMode: 'screen',
              }}
            />

            {/* Sharp Specular Gleam Streak */}
            <motion.div
              className="absolute inset-0 w-[260%] h-[260%] -top-[80%] -left-[80%]"
              initial={{ transform: 'translateX(-120%) translateY(120%) rotate(-35deg)' }}
              animate={{ transform: 'translateX(120%) translateY(-120%) rotate(-35deg)' }}
              transition={{
                // repeat: Infinity,
                repeatDelay: 3.2,
                duration: 5,
                delay: 0.05,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              style={{
                background:
                  'linear-gradient(90deg, transparent 0%, rgba(186,230,253,0) 44%, rgba(255,255,255,0.6) 49.5%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.6) 50.5%, rgba(186,230,253,0) 56%, transparent 100%)',
                filter: 'blur(2px)',
                mixBlendMode: 'screen',
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
