import React from 'react';
import { motion } from 'framer-motion';

interface HeaderHeroProps {
  onNavigateSection: (sectionId: string) => void;
  activeSection?: string;
  onOpenContact?: () => void;
}

/**
 * =========================================================================
 * ⚙️ КОНФИГУРАЦИЯ НА СТРЕЛКИТЕ И Z-INDEX (Лесна промяна оттук):
 * =========================================================================
 */
export const ARROWS_SETTINGS = {
  // 1️⃣ Z-INDEX КОНТРОЛ (Кой елемент да е отпред и кой отзад):
  // По-голямо число = по-отпред; По-малко число = по-отзад.
  // Например: ако сложите portraitZIndex: 5, човекът ще мине ЗАД стрелките!
  zIndex: {
    portrait: 20,       // Човекът (по подразбиране е най-отпред)
    content: 20,        // Името, цитатът и менюто с бутони
    arrowsContainer: 10,// Общ контейнер на стрелките
    greenArrow: 11,     // Зелена стрелка (най-отпред сред стрелките)
    orangeArrow: 12,    // Оранжева стрелка (по средата)
    lavenderArrow: 13,  // Лилава стрелка (най-отзад сред стрелките)
  },

  // 2️⃣ ОБЩА ПОЗИЦИЯ НА СТРЕЛКИТЕ НА ЕКРАНА:
  rightPosition: 'right-[22%] sm:right-[26%] lg:right-[29%] xl:right-[5%]',
  bottomPosition: 'bottom-2 sm:bottom-6 lg:bottom-25',
  scale: 'scale-90 sm:scale-100 lg:scale-110',

  // 3️⃣ РАЗСТОЯНИЕ / ЗАСТЪПВАНЕ МЕЖДУ САМИТЕ СТРЕЛКИ (в проценти):
  lavender: { right: '0%',  top: '0%'   }, // Лилава (най-отзад/най-вдясно)
  orange:   { right: '6%', top: '12%'  }, // Оранжева (по средата)
  green:    { right: '12%', top: '24%'  }, // Зелена (най-отпред/най-вляво)

  // 4️⃣ ПОСОКА И СИЛА НА АНИМАЦИЯТА НА СТРЕЛКИТЕ:
  animation: {
    initialX: -140,       // Начално отместване по хоризонтала (минус = отляво)
    initialY: 140,        // Начално отместване по вертикала (плюс = отдолу)
    duration: 0.75,       // Време на анимацията в секунди
    delayGreen: 0.75,     // Забавяне за зелената стрелка
    delayOrange: 0.55,    // Забавяне за оранжевата стрелка
    delayLavender: 0.35,  // Забавяне за лилавата стрелка
  }
};

export const HeaderHero: React.FC<HeaderHeroProps> = ({ onNavigateSection, activeSection = 'projects' }) => {
  return (
    /* 100% Full-Width White Section without side borders */
    <div className="w-full bg-white relative overflow-hidden select-none border-b border-slate-100 shadow-sm">
      
      {/* Container: Edge-to-edge on right for margin:0 portrait */}
      <div className="w-full flex flex-col lg:flex-row items-center justify-between min-h-[500px] sm:min-h-[560px] lg:min-h-[620px] relative">
        
        {/* Left Content Column (Shifted toward center) */}
        <div 
          style={{ zIndex: ARROWS_SETTINGS.zIndex.content }}
          className="relative w-full lg:w-[48%] flex flex-col justify-between py-6 px-6 sm:px-10 lg:pl-14 xl:pl-20"
        >
          
          {/* Top Header Name & Megaphone */}
          <motion.div 
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative"
          >
            <div className="flex items-start justify-between max-w-[420px]">
              <div className="space-y-1">
                <h1 className="text-[#20b5fe] font-black text-3xl sm:text-4xl lg:text-[48px] tracking-tight leading-[1.05]">
                  Viktor
                </h1>
                <h2 className="text-[#20b5fe] font-black text-3xl sm:text-4xl lg:text-[48px] tracking-tight leading-[1.05] sm:pl-10">
                  Shandrov
                </h2>
              </div>

              {/* Megaphone Illustration Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: -12 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="relative -mt-2 mr-2 sm:mr-4 w-14 h-14 sm:w-18 sm:h-18 flex items-center justify-center cursor-pointer"
              >
                <img
                  src="/assets/icon_megaphone.png"
                  alt="Megaphone"
                  className="w-full h-full object-contain drop-shadow-md"
                />
              </motion.div>
            </div>

            {/* Quote Box with Yellow Quotation Marks */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.5 }}
              className="relative mt-5 mb-6 inline-block"
            >
              {/* Top-Left Yellow Quote */}
              <img
                src="/assets/icon_quote.png"
                alt="Quote"
                className="absolute -top-3.5 left-2 w-5 h-5 sm:w-6 sm:h-6 z-20 object-contain drop-shadow"
              />

              {/* Quote Bubble */}
              <div className="bg-[#9fe3fc] text-[#005273] font-bold text-xs sm:text-sm lg:text-[15px] px-5 py-2.5 rounded-2xl shadow-xs border border-[#7ed6f8]">
                <span>“It always seems impossible until it's done.”</span>
              </div>

              {/* Bottom-Right Yellow Quote */}
              <img
                src="/assets/icon_quote.png"
                alt="Quote"
                className="absolute -bottom-3.5 right-4 w-5 h-5 sm:w-6 sm:h-6 z-20 object-contain drop-shadow transform rotate-180"
              />
            </motion.div>
          </motion.div>

          {/* Action Area with Binary code and Dark Teal Card */}
          <div className="relative flex items-center gap-3 sm:gap-6 mt-2">
            
            {/* Binary Code Block on Left */}
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="flex flex-col font-mono text-sm sm:text-base font-black text-slate-300 select-none tracking-widest leading-snug"
            >
              <span>0 1 1 0</span>
              <span>1 0 0 1</span>
              <span>1 0 1 0</span>
            </motion.div>

            {/* Dark Teal Action Box */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
              className="relative flex-1 max-w-[340px]"
            >
              
              {/* Background Peeking Gold Coin at Bottom */}
              <div className="absolute -bottom-5 left-1/3 w-28 h-10 bg-amber-200/40 rounded-full blur-md -z-10" />

              {/* Main Dark Teal Card */}
              <div className="relative z-10 bg-[#006c99] rounded-3xl p-4 sm:p-5 shadow-[0_12px_28px_rgba(0,108,153,0.35)] border border-[#005c82]">
                
                {/* Top Row: Projects & Prices */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  
                  {/* Button 1: Projects */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigateSection('projects-section')}
                    className={`flex flex-col items-center justify-center p-1.5 rounded-2xl transition-all duration-200 group ${
                      activeSection === 'projects'
                        ? 'bg-white/20 ring-2 ring-white/60 scale-[1.03]'
                        : 'hover:bg-white/10'
                    }`}
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#24b4f8] flex items-center justify-center p-2 shadow-sm mb-1 group-hover:scale-105 transition-transform border border-white/20">
                      <img
                        src="/assets/icon_projects.png"
                        alt="Projects"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-white text-xs sm:text-sm font-bold tracking-wide">
                      Projects
                    </span>
                  </motion.button>

                  {/* Button 2: Prices */}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigateSection('prices-section')}
                    className={`flex flex-col items-center justify-center p-1.5 rounded-2xl transition-all duration-200 group ${
                      activeSection === 'prices'
                        ? 'bg-white/20 ring-2 ring-white/60 scale-[1.03]'
                        : 'hover:bg-white/10'
                    }`}
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#24b4f8] flex items-center justify-center p-2 shadow-sm mb-1 group-hover:scale-105 transition-transform border border-white/20">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-200 border-2 border-yellow-100 flex items-center justify-center shadow-md">
                        <span className="font-extrabold text-amber-900 text-base drop-shadow-xs">$</span>
                      </div>
                    </div>
                    <span className="text-white text-xs sm:text-sm font-bold tracking-wide">
                      Prices
                    </span>
                  </motion.button>

                </div>

                {/* Bottom Row: Testimonials */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onNavigateSection('testimonials-section')}
                    className={`flex flex-col items-center justify-center p-1.5 rounded-2xl transition-all duration-200 group ${
                      activeSection === 'testimonials'
                        ? 'bg-white/20 ring-2 ring-white/60 scale-[1.03]'
                        : 'hover:bg-white/10'
                    }`}
                  >
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#24b4f8] flex items-center justify-center p-2 shadow-sm mb-1 group-hover:scale-105 transition-transform border border-white/20">
                      <img
                        src="/assets/icon_testimonials.png"
                        alt="Testimonials"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <span className="text-white text-xs sm:text-sm font-bold tracking-wide">
                      Testimonials
                    </span>
                  </motion.button>

                  <div />
                </div>

              </div>
            </motion.div>

          </div>

        </div>

        {/* 3 Layered Overlapping Arrows Container (Behind Viktor) */}
        <div 
          style={{ zIndex: ARROWS_SETTINGS.zIndex.arrowsContainer }}
          className={`absolute ${ARROWS_SETTINGS.rightPosition} ${ARROWS_SETTINGS.bottomPosition} ${ARROWS_SETTINGS.scale} pointer-events-none w-[380px] sm:w-[460px] lg:w-[520px] aspect-square flex items-end justify-end`}
        >
          
          {/* Subtle Lavender Code Pill Badge (`</>`) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="absolute bottom-4 left-[2%] sm:left-[8%] z-15 w-16 h-12 sm:w-20 sm:h-16 rounded-2xl sm:rounded-3xl bg-[#ede9fe] shadow-xs flex items-center justify-center border border-purple-100"
          >
            <span className="text-white font-black text-lg sm:text-2xl tracking-tight drop-shadow-xs select-none">
              &lt;/&gt;
            </span>
          </motion.div>

          {/* Relative Overlapping Arrows Box */}
          <div className="relative w-full h-full">
            
            {/* 1. Lavender Arrow (Backmost) */}
            <motion.div
              initial={{ 
                opacity: 0, 
                x: ARROWS_SETTINGS.animation.initialX, 
                y: ARROWS_SETTINGS.animation.initialY 
              }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ 
                delay: ARROWS_SETTINGS.animation.delayLavender, 
                duration: ARROWS_SETTINGS.animation.duration,
                ease: [0.16, 1, 0.3, 1]
              }}
              style={{
                right: ARROWS_SETTINGS.lavender.right,
                top: ARROWS_SETTINGS.lavender.top,
                zIndex: ARROWS_SETTINGS.zIndex.lavenderArrow
              }}
              className="absolute w-[68%]"
            >
              <img
                src="/assets/arrow_lavender_tight.png"
                alt="Lavender Arrow"
                className="w-full h-auto object-contain"
              />
            </motion.div>

            {/* 2. Orange Arrow (Middle) */}
            <motion.div
              initial={{ 
                opacity: 0, 
                x: ARROWS_SETTINGS.animation.initialX, 
                y: ARROWS_SETTINGS.animation.initialY 
              }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ 
                delay: ARROWS_SETTINGS.animation.delayOrange, 
                duration: ARROWS_SETTINGS.animation.duration,
                ease: [0.16, 1, 0.3, 1]
              }}
              style={{
                right: ARROWS_SETTINGS.orange.right,
                top: ARROWS_SETTINGS.orange.top,
                zIndex: ARROWS_SETTINGS.zIndex.orangeArrow
              }}
              className="absolute w-[68%]"
            >
              <img
                src="/assets/arrow_orange_tight.png"
                alt="Orange Arrow"
                className="w-full h-auto object-contain"
              />
            </motion.div>

            {/* 3. Green Arrow (Front) */}
            <motion.div
              initial={{ 
                opacity: 0, 
                x: ARROWS_SETTINGS.animation.initialX, 
                y: ARROWS_SETTINGS.animation.initialY 
              }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ 
                delay: ARROWS_SETTINGS.animation.delayGreen, 
                duration: ARROWS_SETTINGS.animation.duration,
                ease: [0.16, 1, 0.3, 1]
              }}
              style={{
                right: ARROWS_SETTINGS.green.right,
                top: ARROWS_SETTINGS.green.top,
                zIndex: ARROWS_SETTINGS.zIndex.greenArrow
              }}
              className="absolute w-[68%]"
            >
              <img
                src="/assets/arrow_green_tight.png"
                alt="Green Arrow"
                className="w-full h-auto object-contain"
              />
            </motion.div>

          </div>

        </div>

        {/* Right Column: Viktor's Official Portrait */}
        <motion.div 
          initial={{ opacity: 0, x: 120 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            delay: 0.4, 
            duration: 0.85, 
            ease: [0.22, 1, 0.36, 1] 
          }}
          style={{ zIndex: ARROWS_SETTINGS.zIndex.portrait }}
          className="w-full lg:w-[48%] relative flex items-end justify-end m-0 p-0 self-end"
        >
          <div className="relative w-full flex items-end justify-end m-0 p-0">
            <img
              src="/assets/blue.jpeg"
              alt="Виктор Шандров"
              className="w-auto h-auto max-h-[500px] sm:max-h-[560px] lg:max-h-[620px] object-contain object-bottom drop-shadow-[0_10px_25px_rgba(0,0,0,0.12)] m-0 p-0"
            />
          </div>
        </motion.div>

      </div>

    </div>
  );
};
