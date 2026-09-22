import React from 'react';
import { ArrowRight, Layout, FileText, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import { PricingPlan } from '../types';

interface PricingSectionProps {
  plans?: PricingPlan[];
  onOpenContact: () => void;
}

const TIERS = [
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

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenContact }) => {
  return (
    <div className="w-full max-w-[680px] mx-auto px-3 sm:px-4 py-1 flex flex-col justify-center">
      {/* Header */}
      <div className="text-center mb-3 sm:mb-4">
        <h2 className="text-[#0077b6] font-black text-xl sm:text-2xl tracking-widest uppercase drop-shadow-xs">
          КАК СЕ ФОРМИРА ЦЕНАТА
        </h2>
        <p className="text-slate-500 text-xs sm:text-sm font-medium mt-0.5">
          Взимам между <span className="font-bold text-slate-800">75 € и 125 € на проект</span> според сложността:
        </p>
      </div>

      {/* Clean Informative Card List */}
      <div className="bg-white rounded-2xl p-2.5 sm:p-3 shadow-[0_8px_24px_rgba(0,0,0,0.06)] border border-slate-200/80 divide-y divide-slate-100 mb-3 sm:mb-4">
        {TIERS.map((tier, idx) => {
          const Icon = tier.icon;
          return (
            <motion.div
              key={tier.price}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 + idx * 0.06, duration: 0.3 }}
              className="flex items-center justify-between gap-3 p-2.5 sm:p-3 hover:bg-slate-50/70 rounded-xl transition-colors"
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
            </motion.div>
          );
        })}
      </div>

      {/* CTA Button */}
      <div className="flex justify-center">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onOpenContact}
          className="px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs bg-[#00a8ff] hover:bg-[#0091ea] text-white shadow-md shadow-[#00a8ff]/20 flex items-center gap-2 cursor-pointer transition-all"
        >
          <span>Обсъди твоя проект</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </div>
  );
};
