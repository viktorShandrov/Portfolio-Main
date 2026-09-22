import React from 'react';
import { PricingPlan } from '../types';
import { CheckCircle2, Zap, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface PricingSectionProps {
  plans: PricingPlan[];
  onOpenContact: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ plans, onOpenContact }) => {
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
          PRICES & PACKAGES
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm font-medium mt-1">
          Прозрачни цени за уеб дизайн и разработка без скрити такси
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + index * 0.1, duration: 0.45, ease: 'easeOut' }}
            whileHover={{ y: -6 }}
            className={`bg-white rounded-3xl p-6 shadow-[0_12px_30px_rgba(0,0,0,0.12)] border flex flex-col justify-between transition-all duration-300 ${
              plan.popular ? 'border-[#00a8ff] ring-2 ring-[#00a8ff]/50' : 'border-white'
            }`}
          >
            <div>
              {plan.popular && (
                <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full bg-[#00a8ff] text-white mb-3 shadow-xs">
                  <Zap className="w-3 h-3 fill-white" />
                  Най-популярен
                </span>
              )}

              <h3 className="font-extrabold text-lg text-slate-900 mb-1">{plan.name}</h3>
              <p className="text-xs text-slate-500 mb-4">{plan.description}</p>

              <div className="mb-6">
                <span className="text-3xl font-black text-slate-900">{plan.price}</span>
                <span className="text-xs text-slate-400 ml-1">/ еднократно</span>
                <div className="text-[11px] text-cyan-600 font-semibold mt-0.5">Срок: {plan.deliveryTime}</div>
              </div>

              <div className="space-y-2.5 border-t border-slate-100 pt-4 mb-6">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#00a8ff] shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onOpenContact}
              className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                plan.popular
                  ? 'bg-[#00a8ff] hover:bg-[#0091ea] text-white shadow-md'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
            >
              <span>Избери план</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </motion.div>
        ))}
      </div>

    </motion.div>
  );
};
