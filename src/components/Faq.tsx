import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';

export const Faq: React.FC = () => {
  const { t } = useTranslation();
  // Open first item by default
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const faqItems = [
    {
      q: t('faq.items.0.question'),
      a: t('faq.items.0.answer'),
    },
    {
      q: t('faq.items.1.question'),
      a: t('faq.items.1.answer'),
    },
    {
      q: t('faq.items.2.question'),
      a: t('faq.items.2.answer'),
    },
    {
      q: t('faq.items.3.question'),
      a: t('faq.items.3.answer'),
    },
    {
      q: t('faq.items.4.question'),
      a: t('faq.items.4.answer'),
    },
  ];

  return (
    <section id="faq" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-700">
            {t('faq.kicker')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance]">
            {t('faq.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed [text-wrap:balance]">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-slate-200/90 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-slate-900 text-base sm:text-lg leading-snug">
                    {item.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full bg-slate-50 text-slate-600 flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-teal-50 text-teal-800' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 animate-in fade-in duration-150">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Help Banner */}
        <div className="mt-12 text-center p-6 bg-white rounded-2xl border border-slate-200/80 max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Ainda tem alguma dúvida?</p>
              <p className="text-xs text-slate-500">Nosso time responde em menos de 5 minutos no WhatsApp.</p>
            </div>
          </div>
          <a
            href="https://wa.me/5511999999999?text=Ol%C3%A1!%20Gostaria%20de%20tirar%20uma%20d%C3%BAvida%20sobre%20o%20AtendAI."
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-lg transition-colors whitespace-nowrap"
          >
            Falar no WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
};
