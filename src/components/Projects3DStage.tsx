import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Project, PricingPlan } from '../types';
import { ArrowUpRight, Sparkles, Layout, FileText, CreditCard, ArrowRight } from 'lucide-react';

interface Projects3DStageProps {
  projects: Project[];
  plans?: PricingPlan[];
  onSelectProject: (project: Project) => void;
  onOpenContact: () => void;
}

const PRICING_TIERS = [
  {
    price: '75 €',
    title: 'Инфо & Снимки',
    badge: 'Базов сайт',
    description: 'Презентация на дейността, снимкова галерия, контактна форма и мобилен дизайн.',
    icon: Layout,
    iconColor: 'text-blue-500 bg-blue-50',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200/60',
  },
  {
    price: '100 €',
    title: 'Продукти & Статии',
    badge: '+ Съдържание',
    description: 'Добавяне на каталог за продукти, блог система за статии и филтри.',
    icon: FileText,
    iconColor: 'text-[#00a8ff] bg-sky-50',
    badgeColor: 'bg-sky-50 text-[#0077b6] border-sky-200/60',
  },
  {
    price: '125 €',
    title: 'Плащания & Системи',
    badge: '+ Интеграции',
    description: 'Онлайн плащания (Stripe), автоматични резервации и Telegram известия.',
    icon: CreditCard,
    iconColor: 'text-indigo-600 bg-indigo-50',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200/60',
  },
];

export const Projects3DStage: React.FC<Projects3DStageProps> = ({
  projects,
  onSelectProject,
  onOpenContact,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  // 500vh runway for smooth gliding of 4 projects + the morphing finale into Prices
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Track translation X:
  // 0.0 -> 0.76: glides projects across the screen until the 5th card (Pricing) reaches center
  // 0.76 -> 1.0: locks the 5th card in center while perspective straightens to 90 degrees
  const trackTranslateX = useTransform(
    scrollYProgress,
    [0.02, 0.76, 1.0],
    ['48vw', '-80.2%', '-80.2%']
  );

  // Dynamic 3D rotation angles: 38deg angled during project gallery, flattens to 0deg (90° flat view) for Pricing
  const rotateY = useTransform(scrollYProgress, [0.74, 0.92], [38, 0]);
  const rotateX = useTransform(scrollYProgress, [0.74, 0.92], [6, 0]);
  const rotateZ = useTransform(scrollYProgress, [0.74, 0.92], [1.5, 0]);

  // Card boundary expansion to full screen:
  // As it straightens, borders expand, rounded corners flatten to 0, and container scales to cover the entire viewport
  const cardScale = useTransform(scrollYProgress, [0.75, 0.94], [1, 1.34]);
  const contentCounterScale = useTransform(scrollYProgress, [0.75, 0.94], [1, 0.82]);
  const cardBorderRadius = useTransform(scrollYProgress, [0.76, 0.92], ['24px', '0px']);
  const cardBorderWidth = useTransform(scrollYProgress, [0.76, 0.92], ['2px', '0px']);
  const cardShadow = useTransform(
    scrollYProgress,
    [0.76, 0.92],
    ['30px 35px 80px rgba(0,0,0,0.6)', '0px 0px 0px rgba(0,0,0,0)']
  );

  // Background color transitions from rich purple to sleek dark theme (#070714) for Pricing and subsequent sections
  const stageBg = useTransform(scrollYProgress, [0.72, 0.86], ['#a424c4', '#070714']);

  // Gallery top bar and bottom hint fade out as we transition into the Pricing section
  const galleryHeaderOpacity = useTransform(scrollYProgress, [0.70, 0.84], [1, 0]);

  // Pricing details are immediately bright and clear as soon as the card arrives in center
  const pricingDetailOpacity = useTransform(scrollYProgress, [0.74, 0.84], [0, 1]);
  const pricingPreviewOpacity = useTransform(scrollYProgress, [0.72, 0.80], [1, 0]);

  // Synchronize active indicator based on scroll position
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const step = 0.78 / projects.length;
    if (latest >= 0.74) {
      setActiveProjectIndex(projects.length);
    } else {
      const index = Math.min(projects.length - 1, Math.max(0, Math.floor(latest / step)));
      setActiveProjectIndex(index);
    }
  });

  return (
    <motion.div
      ref={containerRef}
      style={{ backgroundColor: stageBg }}
      className="relative w-full h-[500vh]"
    >
      
      {/* 100vh Sticky Viewport with dynamic background */}
      <motion.div
        style={{ backgroundColor: stageBg }}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-6 sm:py-8 select-none"
      >
        
        {/* Top Header: Section Title & Live Project Indicator (Fades out when morphing to Pricing) */}
        <motion.div
          style={{ opacity: galleryHeaderOpacity }}
          className="relative z-30 max-w-7xl mx-auto w-full px-6 sm:px-10 flex items-center justify-between pointer-events-none"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 backdrop-blur-md mb-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span className="text-[11px] font-black uppercase tracking-widest text-cyan-200">
                ИЗБРАНИ ПРОЕКТИ • 3D ПЕРСПЕКТИВА
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-md">
              Реализирани Платформи & Сайтове
            </h2>
          </div>

          {/* Project Counter Pill */}
          <div className="hidden sm:flex items-center gap-3 bg-slate-950/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15 text-white">
            <span className="font-mono font-black text-cyan-300 text-sm">
              {activeProjectIndex < projects.length
                ? `0${activeProjectIndex + 1}`
                : 'ЦЕНИ'}
            </span>
            <span className="text-white/40">/</span>
            <span className="font-mono text-white/60 text-xs">
              0{projects.length}
            </span>
            <div className="flex items-center gap-1.5 ml-2">
              {projects.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeProjectIndex
                      ? 'w-6 bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.8)]'
                      : 'w-1.5 bg-white/30'
                  }`}
                />
              ))}
              <span
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeProjectIndex === projects.length
                    ? 'w-6 bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.8)]'
                    : 'w-1.5 bg-white/30'
                }`}
              />
            </div>
          </div>
        </motion.div>

        {/* 3D Perspective Stage Area */}
        <div
          className="relative w-full flex-1 flex items-center overflow-visible"
          style={{
            perspective: '1200px',
            perspectiveOrigin: '28% 50%',
          }}
        >
          {/* Dynamic 3D Plane: Flattens from 38° to 0° (90° flat view) when the Pricing Card reaches center */}
          <motion.div
            style={{
              rotateY,
              rotateX,
              rotateZ,
              transformStyle: 'preserve-3d',
            }}
            className="w-full h-full flex items-center"
          >
            {/* 3D Motion Track that glides along the rail */}
            <motion.div
              style={{
                x: trackTranslateX,
                transformStyle: 'preserve-3d',
              }}
              className="flex items-center gap-12 sm:gap-20 px-8 origin-left"
            >
              {/* 1. The 4 Real Project Cards */}
              {projects.map((project) => {
                const coverImage = project.images?.[0] || project.thumbnail;

                return (
                  <motion.div
                    key={project.id}
                    whileHover={{
                      scale: 1.04,
                      y: -12,
                      transition: { duration: 0.25 },
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onSelectProject(project)}
                    style={{ transformStyle: 'preserve-3d' }}
                    className="group relative cursor-pointer shrink-0 w-[580px] sm:w-[780px] md:w-[900px] lg:w-[1020px] xl:w-[1120px] aspect-[16/5.4] rounded-2xl sm:rounded-3xl bg-slate-900 border-2 border-white/30 shadow-[30px_35px_80px_rgba(0,0,0,0.6)] overflow-hidden transition-all duration-300 hover:border-cyan-400 hover:shadow-[35px_40px_100px_rgba(0,168,255,0.5)]"
                  >
                    {/* Website Banner Screenshot */}
                    {coverImage ? (
                      <img
                        src={coverImage}
                        alt={project.title}
                        className="w-full h-full object-cover object-top group-hover:scale-103 transition-transform duration-500 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-950 flex items-center justify-center text-white font-bold">
                        {project.title}
                      </div>
                    )}

                    {/* Gradient Glare Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tl from-black/60 via-transparent to-white/20 pointer-events-none" />

                    {/* Bottom Meta Bar overlay */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-transparent p-4 sm:p-6 flex items-end justify-between backdrop-blur-xs">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/40">
                            {project.category}
                          </span>
                          <span className="text-[10px] sm:text-xs text-white/70 font-mono font-bold">
                            {project.year}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-2xl font-black text-white group-hover:text-cyan-300 transition-colors drop-shadow">
                          {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-300 line-clamp-1 mt-0.5">
                          {project.subtitle}
                        </p>
                      </div>

                      {/* View Details Pill Button */}
                      <div className="bg-white text-slate-950 font-black text-xs sm:text-sm px-4 py-2 sm:px-5 sm:py-2.5 rounded-full shadow-lg flex items-center gap-2 group-hover:bg-cyan-300 group-hover:scale-105 transition-all duration-200 shrink-0">
                        <span>Преглед</span>
                        <ArrowUpRight className="w-4 h-4 text-slate-900" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* 2. The 5th Final Card: Pricing & Packages that Morphs into the Full Screen Section */}
              <motion.div
                id="prices-section"
                style={{
                  transformStyle: 'preserve-3d',
                  scale: cardScale,
                  borderRadius: cardBorderRadius,
                  borderWidth: cardBorderWidth,
                  boxShadow: cardShadow,
                }}
                className="relative shrink-0 w-[580px] sm:w-[780px] md:w-[900px] lg:w-[1020px] xl:w-[1120px] aspect-[16/6] sm:aspect-[16/5.4] overflow-hidden border-cyan-400/80 bg-gradient-to-br from-slate-900 via-slate-950 to-purple-950 flex items-center justify-center p-4 sm:p-8"
              >
                {/* 3D Preview State (Visible when entering from distance) */}
                <motion.div
                  style={{ opacity: pricingPreviewOpacity }}
                  className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between z-10 pointer-events-none"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-black uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-400/20 text-cyan-300 border border-cyan-400/40">
                      ЦЕНИ & ПАКЕТИ
                    </span>
                    <span className="text-xs text-white/70 font-mono font-bold">
                      75 € — 125 €
                    </span>
                  </div>

                  <div className="text-center my-auto">
                    <h3 className="text-2xl sm:text-4xl font-black text-white drop-shadow-md">
                      Как се формира цената
                    </h3>
                    <p className="text-sm sm:text-base text-slate-300 mt-1 max-w-lg mx-auto">
                      Прозрачни пакетни цени за изработка на модерни уебсайтове и платформи
                    </p>
                    <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4">
                      <span className="px-3 py-1 rounded-xl bg-white/10 text-cyan-300 text-xs font-mono font-bold border border-white/15">
                        Базов: 75 €
                      </span>
                      <span className="px-3 py-1 rounded-xl bg-white/10 text-cyan-300 text-xs font-mono font-bold border border-white/15">
                        Каталог: 100 €
                      </span>
                      <span className="px-3 py-1 rounded-xl bg-white/10 text-cyan-300 text-xs font-mono font-bold border border-white/15">
                        Системи: 125 €
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-cyan-300/80">
                    <span>Скролнете за пълния списък и детайли</span>
                    <div className="bg-cyan-300 text-slate-950 font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5">
                      <span>Виж Пакети</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </motion.div>

                {/* Full Flattened 90-degree Interactive Pricing View (Unfolds in Center) */}
                <motion.div
                  style={{
                    opacity: pricingDetailOpacity,
                    scale: contentCounterScale,
                  }}
                  className="relative z-20 w-full max-w-3xl mx-auto flex flex-col justify-center"
                >
                  {/* Header */}
                  <div className="text-center mb-3 sm:mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-cyan-400/20 border border-cyan-400/40 text-cyan-300 text-[11px] font-mono font-black uppercase tracking-widest mb-1.5">
                      ПАКЕТНИ ЦЕНИ & УСЛУГИ
                    </div>
                    <h2 className="text-white font-black text-xl sm:text-3xl tracking-tight drop-shadow-md">
                      Как се формира цената
                    </h2>
                    <p className="text-purple-100/80 text-xs sm:text-sm font-medium mt-0.5">
                      Взимам между <span className="font-bold text-cyan-300">75 € и 125 € на проект</span> според сложността:
                    </p>
                  </div>

                  {/* Clean Informative Card List */}
                  <div className="bg-white rounded-2xl p-2.5 sm:p-3.5 shadow-2xl border border-white/20 divide-y divide-slate-100 mb-3 sm:mb-4 text-slate-900">
                    {PRICING_TIERS.map((tier) => {
                      const Icon = tier.icon;
                      return (
                        <div
                          key={tier.price}
                          className="flex items-center justify-between gap-3 p-2.5 sm:p-3 hover:bg-slate-50/80 rounded-xl transition-colors"
                        >
                          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                            <div className={`w-9 h-9 rounded-xl ${tier.iconColor} flex items-center justify-center shrink-0`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-extrabold text-slate-900 text-xs sm:text-sm">{tier.title}</span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${tier.badgeColor}`}>
                                  {tier.badge}
                                </span>
                              </div>
                              <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug truncate sm:whitespace-normal">
                                {tier.description}
                              </p>
                            </div>
                          </div>

                          <div className="text-right shrink-0 pl-2">
                            <span className="text-base sm:text-xl font-black text-[#0077b6]">{tier.price}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* CTA Button */}
                  <div className="flex justify-center">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={onOpenContact}
                      className="px-6 py-2.5 sm:py-3 rounded-xl font-black text-xs sm:text-sm bg-cyan-300 hover:bg-cyan-200 text-slate-950 shadow-lg shadow-cyan-300/30 flex items-center gap-2 cursor-pointer transition-all"
                    >
                      <span>Обсъди твоя проект</span>
                      <ArrowRight className="w-4 h-4 text-slate-950" />
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>

            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Hint (Fades out when morphing to Pricing) */}
        <motion.div
          style={{ opacity: galleryHeaderOpacity }}
          className="relative z-30 max-w-7xl mx-auto w-full px-6 sm:px-10 flex items-center justify-between text-xs font-mono text-purple-200 pointer-events-none"
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-300 animate-ping" />
            <span>Скролвайте надолу за преминаване през проектите</span>
          </span>
          <span className="hidden sm:block text-white/60">
            Кликнете върху проект за детайли
          </span>
        </motion.div>

      </motion.div>

    </motion.div>
  );
};
