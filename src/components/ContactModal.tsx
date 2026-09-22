import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg bg-[#0a1624] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(6,182,212,0.3)] text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-cyan-400 text-xs uppercase tracking-wider mb-2">
          <MessageSquare className="w-4 h-4" />
          <span>Свържете се с Виктор</span>
        </div>

        <h3 className="font-serif text-2xl font-bold text-white mb-2">
          Нека обсъдим вашия проект
        </h3>
        <p className="text-xs text-slate-300 mb-6 leading-relaxed">
          Имате идея за уебсайт, мобилно приложение или цялостна софтуерна платформа? Изпратете ми съобщение и ще ви отговоря до 24 часа.
        </p>

        {submitted ? (
          <div className="py-8 flex flex-col items-center text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-300">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-white">Благодаря ви за съобщението!</h4>
            <p className="text-xs text-slate-300">Ще се свържа с вас възможно най-скоро.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs text-slate-300 mb-1">Вашето име</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Иван Иванов"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">Имейл адрес</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ivan@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-slate-500"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">Съобщение / Описание на проекта</label>
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Здравейте Виктор, бихме искали да изградим уеб платформа за..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/15 focus:border-cyan-400 focus:outline-none focus:ring-1 focus:ring-cyan-400 text-sm text-white placeholder-slate-500 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-slate-950 font-bold text-sm shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center justify-center gap-2 transition-all"
            >
              <span>Изпрати съобщение</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Quick Contact Links */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-cyan-400" />
            <span>viktor@shandrov.dev</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span>+359 88 123 4567</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            <span>София, България</span>
          </div>
        </div>
      </div>
    </div>
  );
};
