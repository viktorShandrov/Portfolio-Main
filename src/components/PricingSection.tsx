import React from 'react';
import { ArrowDown, Check, X, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface PricingSectionProps {
  onOpenContact: () => void;
}

interface FeatureItem {
  id: string;
  name: string;
}

const FEATURES: FeatureItem[] = [
  { id: 'responsive', name: 'Мобилен адаптивен дизайн' },
  { id: 'seo', name: 'Google SEO & Домейн настройка' },
  { id: 'contact', name: 'Контактна форма & Соц. мрежи' },
  { id: 'catalog', name: 'Каталог за продукти / Блог' },
  { id: 'filters', name: 'Интерактивни филтри & Търсене' },
  { id: 'payments', name: 'Онлайн плащания (Stripe)' },
  { id: 'telegram', name: 'Telegram известия в реално време' },
  { id: 'support', name: 'Гаранция & Безплатни корекции' },
];

const PLANS = [
  {
    id: 'basic',
    name: 'Базов',
    subtitle: 'Инфо & Снимки',
    price: '75 €',
    badge: 'Базов',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200/60',
    popular: false,
    delivery: '2-4 дни',
    features: {
      responsive: true,
      seo: true,
      contact: true,
      catalog: false,
      filters: false,
      payments: false,
      telegram: false,
      support: '1 м.',
    },
  },
  {
    id: 'dynamic',
    name: 'Динамичен',
    subtitle: 'Продукти & Статии',
    price: '100 €',
    badge: 'Топ избор',
    badgeColor: 'bg-cyan-400/20 text-cyan-300 border-cyan-400/40',
    popular: true,
    delivery: '4-7 дни',
    features: {
      responsive: true,
      seo: true,
      contact: true,
      catalog: true,
      filters: true,
      payments: false,
      telegram: false,
      support: '3 м.',
    },
  },
  {
    id: 'full',
    name: 'Пълен',
    subtitle: 'Плащания & Системи',
    price: '125 €',
    badge: 'Всички екстри',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200/60',
    popular: false,
    delivery: '7-12 дни',
    features: {
      responsive: true,
      seo: true,
      contact: true,
      catalog: true,
      filters: true,
      payments: true,
      telegram: true,
      support: '6 м.',
    },
  },
];

export const PricingSection: React.FC<PricingSectionProps> = ({ onOpenContact }) => {
  return (
    <div className="w-full max-w-5xl mx-auto px-3 sm:px-4 py-1 flex flex-col justify-center">
      
      {/* Top Header: Title & Guarantee Toggle Pill (Compact matching screenshot) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 sm:mb-4">
        <div>
          <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight drop-shadow-md">
            Избери своя пакет
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm font-medium">
            Прозрачни еднократни цени за изработка • Без месечни такси
          </p>
        </div>

        {/* Pricing Guarantee Pill */}
        <div className="inline-flex items-center p-0.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md self-start sm:self-auto">
          <div className="px-3 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-[11px] shadow-sm flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-cyan-300" />
            <span>Еднократно плащане</span>
          </div>
          <div className="px-2.5 py-1 text-white/70 font-medium text-[11px]">
            Без абонаменти
          </div>
        </div>
      </div>

      {/* Comparison Table Grid: 4 Columns with Synchronized Row Heights */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2.5 sm:gap-3 items-stretch">
        
        {/* Column 1: Feature List Purple Card */}
        <div className="bg-[#5c46e5] text-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 shadow-xl flex flex-col justify-between border border-white/15">
          {/* Header block with exact matching height (h-[86px]) */}
          <div className="h-[86px] flex flex-col justify-center border-b border-white/20 pb-2 mb-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-cyan-300 shrink-0">
                <ArrowDown className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300">
                Детайли за услугите
              </span>
            </div>
            <span className="text-xs sm:text-sm font-black text-white mt-1">
              Включени функционалности
            </span>
          </div>

          {/* Feature rows: exact fixed height h-[34px] */}
          <div className="divide-y divide-white/15">
            {FEATURES.map((feat) => (
              <div
                key={feat.id}
                className="h-[34px] flex items-center"
              >
                <span className="text-[11px] sm:text-xs font-semibold tracking-tight text-white/95 truncate">
                  {feat.name}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom spacer block to match the button height (h-[46px]) */}
          <div className="h-[46px] mt-2 pt-2 border-t border-white/15 flex items-center justify-center text-[10px] font-mono text-cyan-300/80">
            <span>Всички пакети</span>
          </div>
        </div>

        {/* Columns 2, 3, 4: The 3 Plan Cards */}
        {PLANS.map((plan) => {
          return (
            <div
              key={plan.id}
              className={`relative bg-white text-slate-900 rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 shadow-xl flex flex-col justify-between transition-all duration-200 ${
                plan.popular
                  ? 'border-2 border-cyan-400 ring-2 ring-cyan-400/20'
                  : 'border border-slate-200/90'
              }`}
            >
              {/* Header block with exact matching height (h-[86px]) */}
              <div className="h-[86px] flex flex-col justify-between border-b border-slate-100 pb-2 mb-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                    {plan.subtitle}
                  </span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full border ${plan.badgeColor}`}>
                    {plan.badge}
                  </span>
                </div>

                <div className="flex items-baseline gap-1 my-0.5">
                  <span className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">
                    / за проекта
                  </span>
                </div>

                <div className="text-[10px] font-medium text-slate-500">
                  Срок: <span className="font-bold text-slate-800">{plan.delivery}</span>
                </div>
              </div>

              {/* Feature Checkmarks / Crosses Rows: exact fixed height h-[34px] */}
              <div className="divide-y divide-slate-100">
                {FEATURES.map((feat) => {
                  const val = plan.features[feat.id as keyof typeof plan.features];
                  const isChecked = typeof val === 'boolean' ? val : Boolean(val);

                  return (
                    <div
                      key={feat.id}
                      className="h-[34px] flex items-center justify-center"
                    >
                      {isChecked ? (
                        <div className="flex items-center gap-1 text-[#5c46e5]">
                          <div className="w-4 h-4 rounded-full bg-[#5c46e5]/10 flex items-center justify-center">
                            <Check className="w-3 h-3 text-[#5c46e5] stroke-[3]" />
                          </div>
                          {typeof val === 'string' && (
                            <span className="text-[10px] font-bold text-slate-700 ml-0.5">
                              {val}
                            </span>
                          )}
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                          <X className="w-2.5 h-2.5 text-slate-400 stroke-[2.5]" />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom Action Button: exact fixed height h-[46px] */}
              <div className="h-[46px] mt-2 pt-2 border-t border-slate-100 flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onOpenContact}
                  className={`w-full py-2 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all shadow-sm ${
                    plan.popular
                      ? 'bg-[#5c46e5] hover:bg-[#4f39db] text-white shadow-indigo-500/20'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>Избери план</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </div>
          );
        })}

      </div>

    </div>
  );
};
