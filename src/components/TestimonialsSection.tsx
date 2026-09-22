import React from 'react';
import { Testimonial } from '../types';
import { Star, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  onOpenContact: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials, onOpenContact }) => {
  return (
    <div className="w-full max-w-[840px] mx-auto px-2 sm:px-4 py-2 sm:py-4">
      {/* Section Heading */}
      <div className="text-center mb-3 sm:mb-5">
        <h2 className="text-[#0077b6] font-black text-xl sm:text-2xl tracking-widest uppercase drop-shadow-xs">
          TESTIMONIALS
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm font-medium mt-0.5">
          Какво казват клиентите за съвместната ни работа
        </p>
      </div>

      {/* Grid of 3 Testimonials */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 items-stretch">
        {testimonials.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.08, duration: 0.4 }}
            whileHover={{ y: -4 }}
            className="bg-white rounded-2xl sm:rounded-3xl p-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)] border border-slate-200/80 hover:border-slate-300 flex flex-col justify-between transition-all duration-200"
          >
            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-0.5 mb-2">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote Content */}
              <p className="text-[11px] sm:text-xs text-slate-700 leading-relaxed italic mb-3 line-clamp-4">
                “{item.content}”
              </p>
            </div>

            {/* Author */}
            <div className="border-t border-slate-100 pt-2.5 flex items-center justify-between mt-auto">
              <div>
                <h4 className="font-extrabold text-xs text-slate-900">{item.name}</h4>
                <p className="text-[10px] text-slate-500">{item.role}</p>
                <p className="text-[10px] text-[#00a8ff] font-semibold">{item.company}</p>
              </div>
              <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle className="w-3.5 h-3.5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Compact CTA Banner */}
      <div className="mt-3.5 sm:mt-4 text-center bg-gradient-to-r from-[#006c99] to-[#0091ea] text-white rounded-2xl p-3.5 sm:p-4 border border-white/20 shadow-md flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-left">
          <h4 className="font-bold text-xs sm:text-sm text-white">Искате ли да сте следващата успешна история?</h4>
          <p className="text-[11px] text-cyan-100">Нека превърнем вашата идея в реален функционален уебсайт.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onOpenContact}
          className="px-4 py-2 rounded-xl bg-white text-[#006c99] font-bold text-xs hover:bg-cyan-50 transition-colors shadow-xs cursor-pointer shrink-0"
        >
          Свържете се с мен
        </motion.button>
      </div>
    </div>
  );
};
