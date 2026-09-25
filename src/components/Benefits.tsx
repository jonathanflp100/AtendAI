import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Clock, 
  CalendarDays, 
  BellRing, 
  TrendingDown, 
  UserCheck, 
  Check, 
  Sparkles,
  Zap,
  ShieldAlert
} from 'lucide-react';

export const Benefits: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="beneficios" className="py-20 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-700">
            {t('benefits.kicker')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance]">
            {t('benefits.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed [text-wrap:balance]">
            {t('benefits.subtitle')}
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Benefit 1: Atendimento 24h (Wide / Feature 1) */}
          <div className="md:col-span-2 lg:col-span-2 bg-white rounded-2xl p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-teal-200 transition-colors">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-teal-100/70 text-teal-800 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 leading-snug">
                    {t('benefits.item1.title')}
                  </h3>
                  <div className="text-xs text-teal-700 font-semibold flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Madrugadas, noites, domingos e feriados</span>
                  </div>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
                {t('benefits.item1.desc')}
              </p>
            </div>

            {/* Micro visual representation: nocturnal inquiry */}
            <div className="mt-6 pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/60">
                <span className="font-semibold text-slate-800 block mb-1">Sem AtendAI</span>
                <p className="text-slate-500">Paciente manda mensagem às 22h, ninguém responde, no dia seguinte já buscou outra clínica no Google.</p>
              </div>
              <div className="p-3 bg-teal-50/70 rounded-xl border border-teal-200/60">
                <span className="font-semibold text-teal-900 block mb-1">Com AtendAI</span>
                <p className="text-teal-800">Paciente manda mensagem às 22h, tira dúvidas e dorme com a consulta já confirmada para a semana.</p>
              </div>
            </div>
          </div>

          {/* Benefit 2: Agendamento Automático */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-teal-200 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-100/70 text-teal-800 flex items-center justify-center mb-4">
                <CalendarDays className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 leading-snug">
                {t('benefits.item2.title')}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {t('benefits.item2.desc')}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Sincronização em tempo real</span>
              <span className="font-semibold text-teal-700">Zero conflitos</span>
            </div>
          </div>

          {/* Benefit 3: Lembrete na Véspera */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-teal-200 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-100/70 text-teal-800 flex items-center justify-center mb-4">
                <BellRing className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 leading-snug">
                {t('benefits.item3.title')}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {t('benefits.item3.desc')}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
              <div className="flex gap-2">
                <span className="px-2.5 py-1 text-[11px] font-semibold bg-emerald-50 text-emerald-700 rounded-md border border-emerald-200">
                  [Sim, confirmo]
                </span>
                <span className="px-2.5 py-1 text-[11px] font-semibold bg-amber-50 text-amber-700 rounded-md border border-amber-200">
                  [Reagendar]
                </span>
              </div>
            </div>
          </div>

          {/* Benefit 4: Menos Faltas (No-Show) */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-teal-200 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center mb-4">
                <TrendingDown className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 leading-snug">
                {t('benefits.item4.title')}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {t('benefits.item4.desc')}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Média em clínicas ativas</span>
              <span className="font-bold text-emerald-700 text-sm">-78% no-show</span>
            </div>
          </div>

          {/* Benefit 5: Transferência para Humano */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-teal-200 transition-colors">
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-100/70 text-teal-800 flex items-center justify-center mb-4">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2 leading-snug">
                {t('benefits.item5.title')}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {t('benefits.item5.desc')}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Transbordo sem atrito</span>
              <span className="font-semibold text-teal-700">Controle 100% seu</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
