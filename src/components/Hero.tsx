import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  ArrowRight, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  MessageSquare,
  Sparkles,
  Zap,
  Check
} from 'lucide-react';

interface HeroProps {
  onOpenTrial: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTrial }) => {
  const { t } = useTranslation();

  return (
    <section className="relative pt-12 pb-20 md:pt-16 md:pb-28 overflow-hidden bg-gradient-to-b from-teal-50/40 via-white to-[#F8FAFC]">
      {/* Subtle background ambient mesh */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-200/25 via-transparent to-transparent pointer-events-none -z-10" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Proposition and Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Clean unboxed kicker with dot separator */}
            <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-teal-800 tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
              <span>{t('hero.kicker')}</span>
            </div>

            {/* Main Headline - Balanced typography */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-slate-900 leading-[1.15] tracking-tight [text-wrap:balance]">
              {t('hero.title')}
            </h1>

            {/* Subtitle - Refined legibility */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0 [text-wrap:balance]">
              {t('hero.subtitle')}
            </p>

            {/* Actions & Proof */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={onOpenTrial}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-bold text-white bg-teal-700 hover:bg-teal-800 active:scale-[0.98] rounded-xl shadow-md hover:shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 cursor-pointer"
              >
                <span>{t('hero.ctaPrimary')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#simulacao"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300/80 rounded-xl transition-colors shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
              >
                <span>{t('hero.ctaSecondary')}</span>
              </a>
            </div>

            {/* Clean metadata trust notes with typographic separators (anti-pill) */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1.5 text-xs text-slate-500 font-medium">
              <span className="inline-flex items-center gap-1.5 text-slate-600">
                <Check className="w-3.5 h-3.5 text-teal-600 stroke-[3]" />
                {t('hero.noCard')}
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="inline-flex items-center gap-1.5 text-slate-600">
                <Check className="w-3.5 h-3.5 text-teal-600 stroke-[3]" />
                {t('hero.noLock')}
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="inline-flex items-center gap-1.5 text-slate-600">
                <Check className="w-3.5 h-3.5 text-teal-600 stroke-[3]" />
                {t('hero.quickSetup')}
              </span>
            </div>

            {/* Real social proof ticker */}
            <div className="pt-4 border-t border-slate-200/70 flex items-center justify-center lg:justify-start gap-3">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-teal-800 text-white flex items-center justify-center text-xs font-bold ring-2 ring-white">
                  DR
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-700 text-white flex items-center justify-center text-xs font-bold ring-2 ring-white">
                  CL
                </div>
                <div className="w-8 h-8 rounded-full bg-teal-600 text-white flex items-center justify-center text-xs font-bold ring-2 ring-white">
                  ES
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                <strong className="text-slate-900 font-semibold">{t('hero.activePatients')}</strong>
              </p>
            </div>

          </div>

          {/* Right Column: Visual Anchor - Interactive Realistic WhatsApp Live Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden">
              
              {/* Card Header: Clinic & WhatsApp Info */}
              <div className="bg-teal-800 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-sm border border-white/20">
                    AI
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-semibold text-sm leading-tight text-white">{t('hero.clinicName')}</h3>
                      <ShieldCheck className="w-4 h-4 text-teal-300" />
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-teal-100 font-normal">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{t('hero.statusOnline')} · 23:42</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block text-[11px] font-semibold text-teal-200 bg-teal-900/60 px-2 py-0.5 rounded">
                    {t('hero.badgeLive')}
                  </span>
                </div>
              </div>

              {/* Chat Canvas */}
              <div className="p-4 bg-[#EFEAE2] space-y-3 text-xs sm:text-sm">
                
                {/* Patient Inbound message late night */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] bg-[#E7FFDB] text-slate-800 rounded-lg rounded-tr-none px-3.5 py-2.5 shadow-xs border border-emerald-100">
                    <p className="font-medium text-[11px] text-emerald-800 mb-0.5">{t('hero.patientName')}</p>
                    <p className="leading-snug">
                      Boa noite! Gostaria de saber os horários para avaliação de clareamento ou botox com a Dra. Camila essa semana?
                    </p>
                    <div className="text-[10px] text-slate-400 text-right mt-1">23:42</div>
                  </div>
                </div>

                {/* AI Instant Reply (3 seconds later) */}
                <div className="flex justify-start">
                  <div className="max-w-[88%] bg-white text-slate-800 rounded-lg rounded-tl-none px-3.5 py-2.5 shadow-xs border border-slate-200/60">
                    <div className="flex items-center justify-between text-[11px] text-teal-700 font-semibold mb-1">
                      <span>AtendAI · Recepção Inteligente</span>
                      <span className="text-[10px] text-slate-400 font-normal">23:42 (1s)</span>
                    </div>
                    <p className="leading-snug text-slate-700">
                      Olá, Juliana! Tudo bem? Que ótimo ter seu contato. 😊
                    </p>
                    <p className="leading-snug text-slate-700 mt-1.5">
                      A Dra. Camila tem duas opções perfeitas para sua avaliação esta semana:
                    </p>

                    {/* Slot options */}
                    <div className="mt-2.5 space-y-1.5">
                      <div className="p-2 bg-slate-50 hover:bg-teal-50 border border-slate-200 rounded-md flex items-center justify-between text-xs text-slate-700">
                        <span className="font-medium">📅 Quinta-feira, 14:30</span>
                        <span className="text-teal-700 font-bold">Disponível</span>
                      </div>
                      <div className="p-2 bg-slate-50 hover:bg-teal-50 border border-slate-200 rounded-md flex items-center justify-between text-xs text-slate-700">
                        <span className="font-medium">📅 Sexta-feira, 10:00</span>
                        <span className="text-teal-700 font-bold">Disponível</span>
                      </div>
                    </div>

                    <p className="leading-snug text-slate-600 mt-2 text-[11px]">
                      Qual desses dois horários fica mais confortável para você?
                    </p>
                  </div>
                </div>

                {/* Patient picks slot */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] bg-[#E7FFDB] text-slate-800 rounded-lg rounded-tr-none px-3 py-2 shadow-xs border border-emerald-100">
                    <p className="leading-snug">Quinta-feira às 14:30 fica perfeito pra mim!</p>
                    <div className="text-[10px] text-slate-400 text-right mt-0.5">23:43</div>
                  </div>
                </div>

                {/* Instant Confirmation Card */}
                <div className="flex justify-start">
                  <div className="w-full bg-white text-slate-800 rounded-lg px-3.5 py-3 shadow-xs border-l-4 border-l-teal-600 border border-slate-200/70">
                    <div className="flex items-center gap-1.5 text-teal-800 font-bold text-xs mb-1">
                      <CheckCircle2 className="w-4 h-4 text-teal-600" />
                      <span>Agendado com sucesso na clínica!</span>
                    </div>
                    <div className="text-[11px] text-slate-600 space-y-0.5 mt-1 font-normal">
                      <p><strong className="text-slate-800">Paciente:</strong> Juliana Ferreira</p>
                      <p><strong className="text-slate-800">Procedimento:</strong> Avaliação Odonto/Estética</p>
                      <p><strong className="text-slate-800">Horário:</strong> Quinta-feira · 14:30</p>
                      <p className="text-teal-700 font-medium pt-1">
                        ✓ Lembrete automático agendado para a véspera às 10h.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom bar of preview */}
              <div className="bg-slate-50 px-4 py-2.5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-teal-600" />
                  <span>Resposta imediata · 24/7</span>
                </span>
                <span className="font-semibold text-teal-800">0% faltas</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
