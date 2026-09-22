import React, { useState } from 'react';
import { Certificate } from '../types';
import { Award, ExternalLink, Sparkles, CheckCircle2, X, ZoomIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CertificatesSectionProps {
  certificates: Certificate[];
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({ certificates }) => {
  const [activeCertModal, setActiveCertModal] = useState<Certificate | null>(null);

  return (
    <div className="w-full max-w-[840px] mx-auto px-2 sm:px-4 py-1 sm:py-2">
      {/* Section Heading */}
      <div className="text-center mb-3 sm:mb-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/70 text-amber-900 text-[11px] font-bold tracking-wider uppercase mb-1 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          Software University • Отличен 6.00 / 6.00
        </div>
        <h2 className="text-[#0077b6] font-black text-xl sm:text-2xl tracking-widest uppercase drop-shadow-xs">
          CERTIFICATES & DIPLOMAS
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm font-medium mt-0.5">
          Официално сертифицирани знания и пълен отличен успех в съвременния уеб стек
        </p>
      </div>

      {/* Grid of 4 Certificates */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5">
        {certificates.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 + index * 0.06, duration: 0.35 }}
            whileHover={{ y: -4 }}
            className="group bg-white rounded-2xl p-2.5 sm:p-3 shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-amber-200/60 hover:border-amber-400 hover:shadow-[0_12px_28px_rgba(245,158,11,0.18)] transition-all flex flex-col justify-between"
          >
            <div>
              {/* Certificate Image Thumbnail Container */}
              <div
                onClick={() => setActiveCertModal(cert)}
                className="relative aspect-[1/1.4] w-full rounded-xl overflow-hidden bg-slate-900/90 border border-amber-100 shadow-inner cursor-pointer"
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />

                {/* Score Floating Badge */}
                <div className="absolute top-1.5 right-1.5 bg-amber-500/95 backdrop-blur-xs text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1 border border-white/20">
                  <Award className="w-2.5 h-2.5" />
                  <span>{cert.grade}</span>
                </div>

                {/* Hover overlay with zoom hint */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs">
                  <span className="bg-white/95 text-slate-900 font-bold text-[10px] px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <ZoomIn className="w-3 h-3 text-amber-600" />
                    <span>Преглед</span>
                  </span>
                </div>
              </div>

              {/* Certificate Title & Details */}
              <div className="mt-2 text-left">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-xs sm:text-sm text-slate-900 group-hover:text-[#0077b6] transition-colors truncate">
                    {cert.title}
                  </h3>
                  <span className="text-[9px] font-semibold text-slate-400 shrink-0 ml-1">
                    {cert.date}
                  </span>
                </div>
                <div className="text-[10px] text-amber-800 font-bold flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-2.5 h-2.5 text-amber-600 shrink-0" />
                  <span className="truncate">{cert.issuer}</span>
                </div>
              </div>
            </div>

            {/* Verification Link Button */}
            <a
              href={cert.verifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2.5 w-full py-1.5 px-2 rounded-lg bg-amber-50/80 hover:bg-amber-100 text-amber-900 text-[10px] font-bold flex items-center justify-center gap-1 transition-colors border border-amber-200/60"
            >
              <span>Провери диплома</span>
              <ExternalLink className="w-2.5 h-2.5 text-amber-700" />
            </a>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal for Certificate Preview */}
      <AnimatePresence>
        {activeCertModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveCertModal(null)}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-white rounded-3xl p-4 sm:p-5 shadow-2xl border border-amber-200/80 cursor-default"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveCertModal(null)}
                className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="mb-3 text-left">
                <div className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md mb-1">
                  <Award className="w-3 h-3" />
                  {activeCertModal.issuer} • {activeCertModal.grade}
                </div>
                <h3 className="font-black text-lg text-slate-900">{activeCertModal.title}</h3>
              </div>

              {/* Certificate Image Full Preview */}
              <div className="aspect-[1/1.4] max-h-[60vh] mx-auto rounded-2xl overflow-hidden border border-slate-200 shadow-md">
                <img
                  src={activeCertModal.image}
                  alt={activeCertModal.title}
                  className="w-full h-full object-contain bg-amber-950"
                />
              </div>

              {/* Modal Footer */}
              <div className="mt-4 flex items-center justify-between gap-3">
                <span className="text-xs text-slate-500 font-medium">Издаден: {activeCertModal.date}</span>
                <a
                  href={activeCertModal.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <span>Официална проверка в SoftUni</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
