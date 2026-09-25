import React from 'react';
import { useTranslation } from 'react-i18next';
import { TrendingDown, Zap, CalendarPlus, Clock3, Quote, Star, CheckCircle } from 'lucide-react';

export const Results: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    {
      value: t('results.stat1.value'),
      prefix: t('results.stat1.prefix'),
      label: t('results.stat1.label'),
      desc: t('results.stat1.desc'),
      icon: TrendingDown,
      color: 'text-emerald-700',
      bgColor: 'bg-emerald-50',
    },
    {
      value: t('results.stat2.value'),
      prefix: t('results.stat2.prefix'),
      label: t('results.stat2.label'),
      desc: t('results.stat2.desc'),
      icon: Zap,
      color: 'text-teal-700',
      bgColor: 'bg-teal-50',
    },
    {
      value: t('results.stat3.value'),
      prefix: t('results.stat3.prefix'),
      label: t('results.stat3.label'),
      desc: t('results.stat3.desc'),
      icon: CalendarPlus,
      color: 'text-teal-700',
      bgColor: 'bg-teal-50',
    },
    {
      value: t('results.stat4.value'),
      prefix: t('results.stat4.prefix'),
      label: t('results.stat4.label'),
      desc: t('results.stat4.desc'),
      icon: Clock3,
      color: 'text-teal-700',
      bgColor: 'bg-teal-50',
    },
  ];

  const testimonials = [
    {
      name: t('results.testimonials.0.name'),
      role: t('results.testimonials.0.role'),
      clinic: t('results.testimonials.0.clinic'),
      quote: t('results.testimonials.0.quote'),
      initials: 'MR',
      tag: t('results.testimonials.0.tag')
    },
    {
      name: t('results.testimonials.1.name'),
      role: t('results.testimonials.1.role'),
      clinic: t('results.testimonials.1.clinic'),
      quote: t('results.testimonials.1.quote'),
      initials: 'BS',
      tag: t('results.testimonials.1.tag')
    },
    {
      name: t('results.testimonials.2.name'),
      role: t('results.testimonials.2.role'),
      clinic: t('results.testimonials.2.clinic'),
      quote: t('results.testimonials.2.quote'),
      initials: 'LM',
      tag: t('results.testimonials.2.tag')
    }
  ];

  return (
    <section id="resultados" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-700">
            {t('results.kicker')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance]">
            {t('results.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed [text-wrap:balance]">
            {t('results.subtitle')}
          </p>
        </div>

        {/* Quantified Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div 
                key={idx} 
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-teal-200 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-slate-400 font-medium lowercase">
                      {stat.prefix}
                    </span>
                    <div className={`w-9 h-9 rounded-lg ${stat.bgColor} ${stat.color} flex items-center justify-center`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight font-mono tabular-nums mb-2">
                    {stat.value}
                  </div>

                  <h3 className="text-base font-bold text-slate-800 mb-2 leading-tight">
                    {stat.label}
                  </h3>
                </div>

                <p className="text-xs text-slate-500 pt-4 border-t border-slate-100 font-normal leading-relaxed">
                  {stat.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Testimonials Title */}
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-slate-900">
            {t('results.testimonialsTitle')}
          </h3>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((tItem, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl p-7 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-teal-200 transition-colors"
            >
              <div>
                {/* Clean unboxed tag */}
                <div className="text-xs font-semibold text-teal-700 mb-4">
                  {tItem.tag}
                </div>

                <p className="text-sm text-slate-700 leading-relaxed font-normal italic mb-6">
                  "{tItem.quote}"
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-teal-800 text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-2xs">
                  {tItem.initials}
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-900 text-sm leading-tight">{tItem.name}</p>
                  <p className="text-slate-500 leading-tight">{tItem.role}</p>
                  <p className="text-teal-700 font-medium leading-tight mt-0.5">{tItem.clinic}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
