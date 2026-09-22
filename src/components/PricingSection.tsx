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
    <div className="w-full max-w-[840px] mx-auto px-2 sm:px-4 py-2 sm:py-4">
      {/* Section Heading */}
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-[#0077b6] font-black text-xl sm:text-2xl tracking-widest uppercase drop-shadow-xs">
          PRICES & PACKAGES
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm font-medium mt-0.5">
          Прозрачни цени за уеб дизайн и разработка без скрити такси
        </p>
      </div>

      {/* Grid of 3 Pricing Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 items-stretch">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.08, duration: 0.4 }}
            whileHover={{ y: -4 }}
            className={`bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-4.5 shadow-[0_8px_24px_rgba(0,0,0,0.08)] border flex flex-col justify-between transition-all duration-200 ${
              plan.popular
                ? 'border-[#00a8ff] ring-2 ring-[#00a8ff]/40 shadow-[0_12px_30px_rgba(0,168,255,0.18)]'
                : 'border-slate-200/80 hover:border-slate-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-extrabold text-base text-slate-900 line-clamp-1">{plan.name}</h3>
                {plan.popular && (
                  <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-[#00a8ff] text-white shadow-xs shrink-0">
                    <Zap className="w-2.5 h-2.5 fill-white" />
                    Топ
                  </span>
                )}
              </div>

              <p className="text-[11px] text-slate-500 line-clamp-2 mb-3 leading-snug">
                {plan.description}
              </p>

              <div className="mb-3.5 pb-2.5 border-b border-slate-100">
                <div className="flex items-baseline">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900">{plan.price}</span>
                  <span className="text-[10px] text-slate-400 ml-1">/ еднократно</span>
                </div>
                <div className="text-[10px] text-cyan-700 font-semibold mt-0.5">
                  Срок: {plan.deliveryTime}
                </div>
              </div>

              {/* Key Features (Clean compact list) */}
              <div className="space-y-1.5 mb-4">
                {plan.features.slice(0, 4).map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-[11px] text-slate-700 leading-tight">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00a8ff] shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA Button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onOpenContact}
              className={`w-full py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                plan.popular
                  ? 'bg-[#00a8ff] hover:bg-[#0091ea] text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
            >
              <span>Избери план</span>
              <ArrowRight className="w-3 h-3" />
            </motion.button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
