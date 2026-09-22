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
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8"
    >
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="text-center mb-6 sm:mb-8"
      >
        <h2 className="text-[#0077b6] font-black text-xl sm:text-2xl lg:text-3xl tracking-widest uppercase drop-shadow-xs">
          TESTIMONIALS
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm font-medium mt-1">
          Какво казват клиентите за съвместната ни работа
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {testimonials.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + index * 0.1, duration: 0.45, ease: 'easeOut' }}
            whileHover={{ y: -6 }}
            className="bg-white rounded-3xl p-6 shadow-[0_12px_30px_rgba(0,0,0,0.12)] border border-white flex flex-col justify-between transition-all duration-300"
          >
            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Quote Content */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                “{item.content}”
              </p>
            </div>

            {/* Author */}
            <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-xs text-slate-900">{item.name}</h4>
                <p className="text-[11px] text-slate-500">{item.role}</p>
                <p className="text-[10px] text-[#00a8ff] font-semibold">{item.company}</p>
              </div>
              <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Box */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.4 }}
        className="mt-8 text-center bg-gradient-to-r from-[#006c99] to-[#0091ea] text-white rounded-3xl p-6 border border-white/20 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="text-left">
          <h4 className="font-bold text-base text-white">Искате ли да сте следващата успешна история?</h4>
          <p className="text-xs text-cyan-100 mt-0.5">Нека превърнем вашата идея в реален функционален уебсайт.</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onOpenContact}
          className="px-5 py-2.5 rounded-xl bg-white text-[#006c99] font-bold text-xs hover:bg-cyan-50 transition-colors shadow-sm cursor-pointer shrink-0"
        >
          Свържете се с мен
        </motion.button>
      </motion.div>

    </motion.div>
  );
};
