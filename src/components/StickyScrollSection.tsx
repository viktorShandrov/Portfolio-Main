import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface StickyScrollSectionProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export const StickyScrollSection: React.FC<StickyScrollSectionProps> = ({
  id,
  children,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Smooth scroll interpolation for 3D rotation, opacity fade in/out, and subtle depth scaling
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [0, 1, 1, 1, 0]
  );

  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [8, 0, 0, 0, -8]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [0.95, 1, 1, 1, 0.95]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    [35, 0, 0, 0, -35]
  );

  return (
    <div
      id={id}
      ref={containerRef}
      className={`min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-center py-10 sm:py-16 scroll-mt-4 ${className}`}
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          opacity,
          rotateX,
          scale,
          y,
          transformStyle: 'preserve-3d',
          willChange: 'transform, opacity'
        }}
        className="w-full origin-center"
      >
        {children}
      </motion.div>
    </div>
  );
};
