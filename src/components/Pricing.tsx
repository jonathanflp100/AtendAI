import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check, ShieldCheck, Zap, ArrowRight, HelpCircle } from 'lucide-react';

interface PricingProps {
  onOpenTrial: () => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenTrial }) => {
  const { t } = useTranslation();

  const features = [
    t('pricing.features.0'),
    t('pricing.features.1'),
    t('pricing.features.2'),
    t('pricing.features.3'),
    t('pricing.features.4'),
    t('pricing.features.5'),
    t('pricing.features.6'),
    t('pricing.features.7'),
    t('pricing.features.8'),
  ];

  return (
    <section id="plano" className="py-20 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-700">
            {t('pricing.kicker')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance]">
            {t('pricing.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed [text-wrap:balance]">
            {t('pricing.subtitle')}
          </p>
        </div>

        {/* Pricing Card (Clean, focused) */}
        <div className="max-w-xl mx-auto bg-gradient-to-b from-white to-slate-50/50 rounded-3xl border-2 border-teal-600/30 p-8 sm:p-10 shadow-lg relative">
          
          {/* Top highlight ribbon */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-teal-700 text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-xs">
            {t('pricing.trialBadge')}
          </div>

          <div className="text-center mb-8 pt-2">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
              {t('pricing.planName')}
            </h3>
            
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {t('pricing.fromText')}
            </p>

            <div className="flex items-baseline justify-center gap-1.5 my-3">
              <span className="text-xl font-bold text-slate-700">{t('pricing.currency')}</span>
              <span className="text-5xl sm:text-6xl font-black text-slate-900 font-mono tracking-tight tabular-nums">
                {t('pricing.price')}
              </span>
              <span className="text-sm sm:text-base font-semibold text-slate-500">
                {t('pricing.frequency')}
              </span>
            </div>

            {/* Trust tags with typographic separators */}
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-semibold text-teal-800 pt-1">
              <span>{t('pricing.noLock')}</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>{t('pricing.noSetup')}</span>
            </div>
          </div>

          {/* Features list */}
          <div className="pt-6 border-t border-slate-200/80 mb-8">
            <ul className="space-y-3.5">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span className="leading-snug">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Primary CTA */}
          <div className="space-y-3 text-center">
            <button
              onClick={onOpenTrial}
              className="w-full inline-flex items-center justify-center gap-2 py-4 px-6 text-base font-bold text-white bg-teal-700 hover:bg-teal-800 active:scale-[0.98] rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <span>{t('pricing.cta')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
            <p className="text-xs text-slate-500">
              {t('pricing.disclaimer')}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
