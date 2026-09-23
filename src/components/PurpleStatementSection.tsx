import React from 'react';
import { motion, MotionValue, useTransform, useMotionValue } from 'framer-motion';

interface PurpleStatementSectionProps {
  scrollYProgress?: MotionValue<number>;
  // Range where this section is active in the master scroll container [start, end]
  scrollRange?: [number, number];
}

export const PurpleStatementSection: React.FC<PurpleStatementSectionProps> = ({
  scrollYProgress,
  scrollRange = [0.16, 0.50],
}) => {
  const fallbackScroll = useMotionValue(scrollRange[0]);
  const progress = scrollYProgress || fallbackScroll;
  const [start, end] = scrollRange;
  const duration = end - start;

  // Keyframes for entrance, full text scroll, and exit
  const enterStart = start;
  const enterEnd = start + duration * 0.12;
  const textScrollEnd = start + duration * 0.92; // Full text has completely finished scrolling past the left edge
  const exitEnd = end;

  // 1. Viktor Chest-Up Cutout Animation (Pops up from bottom-0 with smooth spring & scale)
  const portraitY = useTransform(
    progress,
    [enterStart, enterEnd, textScrollEnd, exitEnd],
    [260, 0, 0, 100]
  );
  const portraitScale = useTransform(
    progress,
    [enterStart, enterEnd, textScrollEnd, exitEnd],
    [0.85, 1, 1, 0.95]
  );
  const portraitOpacity = useTransform(
    progress,
    [enterStart, enterEnd, textScrollEnd, exitEnd],
    [0, 1, 1, 0]
  );

  // 2. Single-line Continuous Horizontal Text Scroll (Right to Left across the full screen)
  // Starts completely offscreen on the right (100vw) and only ends when the entire text has moved past the left screen edge (-100%)
  const textTranslateX = useTransform(
    progress,
    [enterStart, textScrollEnd],
    ['100vw', '-100%']
  );
  const textOpacity = useTransform(
    progress,
    [enterStart, enterEnd, textScrollEnd, exitEnd],
    [0, 1, 1, 0]
  );

  return (
    <div className="relative w-full h-full flex items-center overflow-hidden select-none">
      
      {/* Horizontal Single-Line Scrolling Text Stream (Z-Index 10: flows across the entire screen) */}
      <div className="absolute inset-0 flex items-center pointer-events-none z-10 overflow-visible">
        <motion.div
          style={{
            x: textTranslateX,
            opacity: textOpacity,
          }}
          className="whitespace-nowrap flex items-center font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white tracking-tight leading-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.3)]"
        >
          {/* Phrase 1 */}
          <span className="inline-flex items-center">
            Не е достатъчно&nbsp;
            <span className="text-cyan-300 underline decoration-cyan-400/40 decoration-wavy underline-offset-8">
              AI
            </span>
            &nbsp;да напише кода.
          </span>

          {/* Elegant Divider */}
          <span className="mx-8 sm:mx-16 lg:mx-24 text-white/35 font-light text-2xl sm:text-4xl lg:text-6xl select-none">
            ✦
          </span>

          {/* Phrase 2 */}
          <span className="inline-flex items-center">
            Трябва&nbsp;
            <span className="text-amber-300">
              внимание
            </span>
            &nbsp;към детайла и изискванията на клиента.
          </span>
        </motion.div>
      </div>

      {/* Viktor Half-Body Cutout Portrait (Strictly at the absolute maximum right edge: right-0 & bottom-0) */}
      <div className="absolute right-0 bottom-0 z-20 pointer-events-none flex items-end justify-end">
        <motion.div
          style={{
            y: portraitY,
            scale: portraitScale,
            opacity: portraitOpacity,
            transformOrigin: 'bottom right',
          }}
          className="relative flex items-end justify-end origin-bottom-right"
        >
          <img
            src="/assets/viktor_suit_half.png"
            alt="Виктор Шандров"
            className="w-auto h-auto max-h-[75vh] sm:max-h-[85vh] md:max-h-[92vh] lg:max-h-[96vh] xl:max-h-[98vh] object-contain object-bottom block select-none drop-shadow-[0_20px_45px_rgba(0,0,0,0.5)]"
          />
        </motion.div>
      </div>

    </div>
  );
};
