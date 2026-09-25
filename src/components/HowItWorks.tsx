import React from 'react';
import { useTranslation } from 'react-i18next';
import { QrCode, Sliders, CalendarCheck, Check, Sparkles, Smartphone, ShieldCheck, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onOpenTrial: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenTrial }) => {
  const { t } = useTranslation();

  return (
    <section id="como-funciona" className="py-20 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-700">
            {t('howItWorks.kicker')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance]">
            {t('howItWorks.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed [text-wrap:balance]">
            {t('howItWorks.subtitle')}
          </p>
        </div>

        {/* 3 Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {/* Step 1 */}
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/90 flex flex-col justify-between hover:border-teal-300 transition-colors shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-2xl font-black text-teal-800/80 font-mono tracking-tighter">
                  01
                </span>
                <div className="w-12 h-12 rounded-xl bg-teal-100/70 text-teal-800 flex items-center justify-center">
                  <QrCode className="w-6 h-6" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
                {t('howItWorks.step1.title')}
              </h3>
              
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {t('howItWorks.step1.desc')}
              </p>
            </div>

            {/* Illustrative micro-card */}
            <div className="mt-6 pt-4 border-t border-slate-200/80 bg-white rounded-xl p-3 border">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700 shrink-0">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-slate-800">Sem troca de número</p>
                  <p className="text-slate-500 text-[11px]">Compatível com WhatsApp Business</p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/90 flex flex-col justify-between hover:border-teal-300 transition-colors shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-2xl font-black text-teal-800/80 font-mono tracking-tighter">
                  02
                </span>
                <div className="w-12 h-12 rounded-xl bg-teal-100/70 text-teal-800 flex items-center justify-center">
                  <Sliders className="w-6 h-6" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
                {t('howItWorks.step2.title')}
              </h3>
              
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {t('howItWorks.step2.desc')}
              </p>
            </div>

            {/* Illustrative micro-card */}
            <div className="mt-6 pt-4 border-t border-slate-200/80 bg-white rounded-xl p-3 border space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600 font-medium">Odontologia & Estética</span>
                <span className="text-teal-700 font-semibold">Tabela Pronta</span>
              </div>
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                <div className="bg-teal-600 h-full w-[85%] rounded-full" />
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/90 flex flex-col justify-between hover:border-teal-300 transition-colors shadow-xs">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-2xl font-black text-teal-800/80 font-mono tracking-tighter">
                  03
                </span>
                <div className="w-12 h-12 rounded-xl bg-teal-100/70 text-teal-800 flex items-center justify-center">
                  <CalendarCheck className="w-6 h-6" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
                {t('howItWorks.step3.title')}
              </h3>
              
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {t('howItWorks.step3.desc')}
              </p>
            </div>

            {/* Illustrative micro-card */}
            <div className="mt-6 pt-4 border-t border-slate-200/80 bg-white rounded-xl p-3 border">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-teal-800 flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-teal-600 stroke-[3]" />
                  Lembrete na Véspera Ativo
                </span>
                <span className="text-[11px] text-slate-500 font-mono">24h antes</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 text-center">
          <button
            onClick={onOpenTrial}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl transition-all shadow-sm cursor-pointer"
          >
            <span>{t('hero.ctaPrimary')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
