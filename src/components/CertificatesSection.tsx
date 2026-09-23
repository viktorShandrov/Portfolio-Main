import React, { useState } from 'react';
import { Certificate } from '../types';
import { ExternalLink, Sparkles, X, ZoomIn, Zap, ShieldCheck, Check, Calendar, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, MotionValue, useTransform, useMotionValueEvent, useMotionValue } from 'framer-motion';

interface CertificatesSectionProps {
  certificates: Certificate[];
  scrollYProgress?: MotionValue<number>;
  onNavigateToCert?: (index: number) => void;
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({
  certificates,
  scrollYProgress,
  onNavigateToCert,
}) => {
  const [activeCertIndex, setActiveCertIndex] = useState(0);
  const [activeCertModal, setActiveCertModal] = useState<Certificate | null>(null);
  const defaultProgress = useMotionValue(0.42);
  const activeProgress = scrollYProgress || defaultProgress;

  // Derive current active certificate from scroll progress (range [0.42, 0.82])
  useMotionValueEvent(activeProgress, 'change', (latest) => {
    if (latest < 0.52) {
      setActiveCertIndex(0);
    } else if (latest < 0.62) {
      setActiveCertIndex(1);
    } else if (latest < 0.72) {
      setActiveCertIndex(2);
    } else {
      setActiveCertIndex(3);
    }
  });

  // Calculate timeline track fill percentage (0% to 100% across the 4 certificates)
  const timelineProgress = useTransform(
    activeProgress,
    [0.45, 0.78],
    ['0%', '100%']
  );

  const currentCert = certificates[activeCertIndex] || certificates[0];

  const themeColors = [
    {
      accent: '#f59e0b',
      border: 'border-amber-400',
      bgGlow: 'from-amber-400/20 to-orange-500/20',
      badge: 'bg-amber-100 text-amber-900 border-amber-300',
      ring: 'ring-amber-400',
      stepIcon: '⚡',
    },
    {
      accent: '#10b981',
      border: 'border-emerald-400',
      bgGlow: 'from-emerald-400/20 to-teal-500/20',
      badge: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      ring: 'ring-emerald-400',
      stepIcon: '🚀',
    },
    {
      accent: '#6366f1',
      border: 'border-indigo-400',
      bgGlow: 'from-indigo-400/20 to-purple-500/20',
      badge: 'bg-indigo-100 text-indigo-900 border-indigo-300',
      ring: 'ring-indigo-400',
      stepIcon: '💎',
    },
    {
      accent: '#00a8ff',
      border: 'border-sky-400',
      bgGlow: 'from-sky-400/20 to-blue-500/20',
      badge: 'bg-sky-100 text-sky-900 border-sky-300',
      ring: 'ring-sky-400',
      stepIcon: '✨',
    },
  ][activeCertIndex % 4];

  return (
    <div className="w-full max-w-[920px] mx-auto px-2 sm:px-4 py-1">
      
      {/* Section Header */}
      <div className="text-center mb-3 sm:mb-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-linear-to-r from-amber-400/15 via-pink-500/15 to-purple-500/15 border border-amber-300/60 shadow-xs mb-1"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="text-[10px] font-black uppercase tracking-wider bg-linear-to-r from-amber-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
            SOFTUNI 2023 • TIMELINE НА ОБУЧЕНИЕТО
          </span>
          <Sparkles className="w-3 h-3 text-amber-500" />
        </motion.div>

        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-slate-900 flex items-center justify-center gap-2">
          <span>CERTIFICATES</span>
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00a8ff] via-[#6366f1] to-purple-600 underline decoration-[#00a8ff]/40 decoration-wavy decoration-2">
            TIMELINE
          </span>
          <span className="text-lg">📜</span>
        </h2>
      </div>

      {/* Main Timeline Stage: Left Vertical Rail + Right Spotlight Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6 items-center">
        
        {/* LEFT COLUMN: Vertical Interactive Timeline (40% width) */}
        <div className="md:col-span-5 relative py-2 pl-2">
          
          {/* Background Track Line */}
          <div className="absolute left-[24px] top-6 bottom-6 w-1 bg-slate-200/90 rounded-full" />
          
          {/* Animated Glowing Fill Progress Line */}
          <motion.div
            style={{ height: timelineProgress }}
            className="absolute left-[24px] top-6 w-1 bg-linear-to-b from-amber-400 via-indigo-500 to-[#00a8ff] rounded-full shadow-[0_0_12px_rgba(0,168,255,0.6)]"
          />

          {/* Timeline Step Nodes */}
          <div className="relative flex flex-col space-y-2.5 sm:space-y-3.5">
            {certificates.map((cert, index) => {
              const isActive = index === activeCertIndex;
              const isPast = index < activeCertIndex;

              return (
                <motion.button
                  key={cert.id}
                  onClick={() => onNavigateToCert && onNavigateToCert(index)}
                  animate={{
                    scale: isActive ? 1.02 : 0.98,
                    x: isActive ? 4 : 0,
                  }}
                  whileHover={{ scale: 1.03, x: 5 }}
                  className={`flex items-center gap-3 p-2 rounded-2xl text-left transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-white shadow-[0_8px_24px_rgba(0,0,0,0.08)] border-2 border-slate-900/10'
                      : 'bg-white/40 hover:bg-white/80 border border-transparent'
                  }`}
                >
                  {/* Node Circle */}
                  <div
                    className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center font-black text-xs transition-all duration-300 shrink-0 ${
                      isActive
                        ? 'bg-slate-900 text-white ring-3 ring-amber-400/40 shadow-md scale-110'
                        : isPast
                        ? 'bg-emerald-500 text-white shadow-xs'
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {isPast ? (
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>

                  {/* Node Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-wider ${
                        isActive ? 'text-amber-600' : 'text-slate-400'
                      }`}>
                        {cert.date}
                      </span>
                      <span className="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                        6.00
                      </span>
                    </div>
                    <div className={`font-black text-xs sm:text-sm truncate transition-colors ${
                      isActive ? 'text-slate-900' : 'text-slate-600'
                    }`}>
                      {cert.title}
                    </div>
                  </div>

                  {/* Active Indicator Arrow */}
                  {isActive && (
                    <ArrowRight className="w-4 h-4 text-[#00a8ff] shrink-0 animate-pulse hidden sm:block" />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Clean Minimal Spotlight Card (60% width) */}
        <div className="md:col-span-7 relative min-h-[320px] sm:min-h-[340px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCert.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -20 }}
              transition={{ type: 'spring', stiffness: 280, damping: 22 }}
              className={`w-full bg-white rounded-3xl p-4 sm:p-5 border-2 ${themeColors.border} shadow-[0_16px_40px_rgba(0,0,0,0.08)] relative overflow-hidden`}
            >
              {/* Background Ambient Glow */}
              <div className={`absolute -top-16 -right-16 w-40 h-40 rounded-full bg-linear-to-br ${themeColors.bgGlow} blur-2xl pointer-events-none`} />

              <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-center sm:items-stretch relative z-10">
                
                {/* Certificate Thumbnail with Click to Zoom */}
                <div
                  onClick={() => setActiveCertModal(currentCert)}
                  className="relative aspect-[1/1.35] w-32 sm:w-36 shrink-0 rounded-2xl overflow-hidden bg-slate-950 border-2 border-slate-200 shadow-md cursor-pointer group/thumb"
                >
                  <img
                    src={currentCert.image}
                    alt={currentCert.title}
                    className="w-full h-full object-cover object-top group-hover/thumb:scale-108 transition-transform duration-500 ease-out"
                  />

                  {/* Floating 6.00 Badge */}
                  <div className="absolute top-1.5 right-1.5 bg-slate-950/90 backdrop-blur-md text-amber-300 text-[9px] font-black px-1.5 py-0.5 rounded-full shadow-lg flex items-center gap-1 border border-amber-400/50">
                    <Zap className="w-2.5 h-2.5 text-amber-400 fill-amber-400 animate-pulse" />
                    <span>6.00 / 6.00</span>
                  </div>

                  {/* SoftUni Badge */}
                  <div className="absolute bottom-1.5 left-1.5 bg-white/95 backdrop-blur-xs text-slate-900 text-[8px] font-black px-1.5 py-0.5 rounded-md shadow-xs flex items-center gap-1 border border-slate-200">
                    <ShieldCheck className="w-2.5 h-2.5 text-blue-600" />
                    <span>SoftUni</span>
                  </div>

                  {/* Zoom Overlay */}
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs">
                    <span className="bg-white text-slate-900 font-extrabold text-[10px] px-2.5 py-1 rounded-full shadow-lg flex items-center gap-1">
                      <ZoomIn className="w-3 h-3 text-[#00a8ff]" />
                      <span>Преглед</span>
                    </span>
                  </div>
                </div>

                {/* Minimal Certificate Info & Direct Verify Button */}
                <div className="flex-1 text-left flex flex-col justify-between">
                  <div className="space-y-2">
                    {/* Month & Stage Pill */}
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                        <Calendar className="w-3 h-3 text-[#00a8ff]" />
                        {currentCert.date}
                      </span>
                      <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md border ${themeColors.badge}`}>
                        {activeCertIndex + 1} / 4
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-black text-lg sm:text-xl text-slate-900 leading-tight">
                      {currentCert.title}
                    </h3>
                    
                    {/* Grade & Issuer */}
                    <div className="text-xs text-slate-500 font-medium">
                      Оценка: <strong className="text-amber-600 font-black">Отличен {currentCert.grade}</strong>
                    </div>

                    {/* Minimal Skills Tags */}
                    {currentCert.skills && currentCert.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {currentCert.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/70"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Single Clean Verification Button */}
                  <div className="pt-3">
                    <a
                      href={currentCert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-[#00a8ff] text-white text-xs font-black flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-[0_6px_20px_rgba(0,168,255,0.35)] group/btn active:scale-95"
                    >
                      <span>Провери диплома в SoftUni</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-300 group-hover/btn:text-white group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Lightbox Modal for Certificate Preview */}
      <AnimatePresence>
        {activeCertModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCertModal(null)}
            className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-white rounded-3xl p-4 sm:p-5 shadow-2xl border-2 border-slate-900/10 cursor-default"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveCertModal(null)}
                className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="mb-3 text-left">
                <div className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 mb-1.5">
                  <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                  {activeCertModal.issuer} • Оценка {activeCertModal.grade}
                </div>
                <h3 className="font-black text-xl text-slate-900">{activeCertModal.title}</h3>
              </div>

              {/* Certificate Image Full Preview */}
              <div className="aspect-[1/1.4] max-h-[58vh] mx-auto rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md">
                <img
                  src={activeCertModal.image}
                  alt={activeCertModal.title}
                  className="w-full h-full object-contain bg-slate-950"
                />
              </div>

              {/* Modal Footer */}
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="text-xs text-slate-500 font-semibold font-mono">Издаден: {activeCertModal.date}</span>
                <a
                  href={activeCertModal.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#00a8ff] hover:bg-[#0092dd] text-white font-black text-xs flex items-center gap-1.5 shadow-[0_4px_12px_rgba(0,168,255,0.35)] transition-all hover:scale-105 active:scale-95"
                >
                  <span>Официална диплома SoftUni</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

