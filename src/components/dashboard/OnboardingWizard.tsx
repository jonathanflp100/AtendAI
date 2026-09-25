import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Building2,
  Scissors,
  Home,
  HeartPulse,
  Smartphone,
  QrCode,
  Loader2,
  Check
} from 'lucide-react';
import { NicheType, BotTone, OnboardingData } from '../../types';
import { apiService } from '../../services/apiService';

interface OnboardingWizardProps {
  onComplete: () => void;
  onCancel: () => void;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({
  onComplete,
  onCancel,
}) => {
  const { t } = useTranslation();
  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [qrScanning, setQrScanning] = useState(false);
  const [qrConnected, setQrConnected] = useState(false);

  // Step 1: Niche
  const [niche, setNiche] = useState<NicheType>('odontologia');

  // Step 2: Niche questions
  const [q1, setQ1] = useState('Aceitamos particular e convênio');
  const [q2, setQ2] = useState('Sem sinal antecipado');

  // Step 3: Clinic info, services & hours
  const [clinicName, setClinicName] = useState('Clínica Sorriso & Estética');
  const [clinicPhone, setClinicPhone] = useState('+55 11 98888-7777');
  const [service1Name, setService1Name] = useState('Consulta e Avaliação');
  const [service1Price, setService1Price] = useState(150);
  const [service2Name, setService2Name] = useState('Procedimento Principal');
  const [service2Price, setService2Price] = useState(450);

  const niches = [
    {
      id: 'odontologia' as const,
      title: t('onboarding.nicheOdonto'),
      desc: t('onboarding.nicheOdontoDesc'),
      icon: HeartPulse,
      color: 'teal',
    },
    {
      id: 'estetica' as const,
      title: t('onboarding.nicheEstetica'),
      desc: t('onboarding.nicheEsteticaDesc'),
      icon: Sparkles,
      color: 'indigo',
    },
    {
      id: 'barbearia' as const,
      title: t('onboarding.nicheBarbearia'),
      desc: t('onboarding.nicheBarbeariaDesc'),
      icon: Scissors,
      color: 'amber',
    },
    {
      id: 'imobiliaria' as const,
      title: t('onboarding.nicheImobiliaria'),
      desc: t('onboarding.nicheImobiliariaDesc'),
      icon: Home,
      color: 'emerald',
    },
  ];

  const handleSimulateQr = () => {
    setQrScanning(true);
    setTimeout(() => {
      setQrScanning(false);
      setQrConnected(true);
    }, 1800);
  };

  const handleFinish = async () => {
    setIsSubmitting(true);
    try {
      const data: OnboardingData = {
        niche,
        clinicName,
        clinicPhone,
        botTone: niche === 'barbearia' ? 'casual' : 'formal',
        nicheAnswers: { q1, q2 },
        services: [
          { name: service1Name, duration: 45, price: service1Price },
          { name: service2Name, duration: 60, price: service2Price },
        ],
        workingHours: [
          { dayOfWeek: 1, dayName: 'Segunda', isOpen: true, openTime: '08:00', closeTime: '18:00' },
          { dayOfWeek: 2, dayName: 'Terça', isOpen: true, openTime: '08:00', closeTime: '18:00' },
          { dayOfWeek: 3, dayName: 'Quarta', isOpen: true, openTime: '08:00', closeTime: '18:00' },
          { dayOfWeek: 4, dayName: 'Quinta', isOpen: true, openTime: '08:00', closeTime: '18:00' },
          { dayOfWeek: 5, dayName: 'Sexta', isOpen: true, openTime: '08:00', closeTime: '18:00' },
          { dayOfWeek: 6, dayName: 'Sábado', isOpen: true, openTime: '08:00', closeTime: '13:00' },
          { dayOfWeek: 0, dayName: 'Domingo', isOpen: false, openTime: '08:00', closeTime: '12:00' },
        ],
        whatsappConnected: qrConnected,
      };

      await apiService.completeOnboarding(data);
      onComplete();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Wizard Progress Stepper */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3 text-xs font-bold text-slate-500">
          <span>{t('onboarding.title')}</span>
          <span className="font-mono text-teal-700">Etapa {step} de 4</span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${
                s <= step ? 'bg-teal-700' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Wizard Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-10 space-y-8">
        
        {/* ================= STEP 1: CHOOSE NICHE ================= */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {t('onboarding.step1Title')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {t('onboarding.step1Desc')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {niches.map((n) => {
                const Icon = n.icon;
                const isSelected = niche === n.id;
                return (
                  <div
                    key={n.id}
                    onClick={() => {
                      setNiche(n.id);
                      if (n.id === 'odontologia') {
                        setService1Name('Limpeza & Profilaxia');
                        setService2Name('Clareamento Dental');
                      } else if (n.id === 'estetica') {
                        setService1Name('Aplicação de Botox');
                        setService2Name('Preenchimento Facial');
                      } else if (n.id === 'barbearia') {
                        setService1Name('Corte & Barba');
                        setService2Name('Corte Degrade');
                      } else if (n.id === 'imobiliaria') {
                        setService1Name('Visita a Imóvel para Locação');
                        setService2Name('Visita de Compra');
                      }
                    }}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-teal-700 bg-teal-50/60 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-teal-100/70 text-teal-800 flex items-center justify-center mb-3">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="font-bold text-slate-900 text-sm mb-1">{n.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-normal">{n.desc}</p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-end">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${isSelected ? 'border-teal-700 bg-teal-700 text-white' : 'border-slate-300'}`}>
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 2: NICHE SPECIFIC QUESTIONS ================= */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {t('onboarding.step2Title')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {t('onboarding.step2Desc')}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {niche === 'odontologia' && t('onboarding.questionOdonto1')}
                  {niche === 'estetica' && t('onboarding.questionEstetica1')}
                  {niche === 'barbearia' && t('onboarding.questionBarbearia1')}
                  {niche === 'imobiliaria' && t('onboarding.questionImobiliaria1')}
                </label>
                <input
                  type="text"
                  value={q1}
                  onChange={(e) => setQ1(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {niche === 'odontologia' && t('onboarding.questionOdonto2')}
                  {niche === 'estetica' && t('onboarding.questionEstetica2')}
                  {niche === 'barbearia' && t('onboarding.questionBarbearia2')}
                  {niche === 'imobiliaria' && t('onboarding.questionImobiliaria2')}
                </label>
                <input
                  type="text"
                  value={q2}
                  onChange={(e) => setQ2(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-600 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 3: SERVICES AND WORKING HOURS ================= */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {t('onboarding.step3Title')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {t('onboarding.step3Desc')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('onboarding.clinicName')}
                </label>
                <input
                  type="text"
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('onboarding.clinicPhone')}
                </label>
                <input
                  type="tel"
                  value={clinicPhone}
                  onChange={(e) => setClinicPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-600 focus:outline-none"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Procedimentos Iniciais para a IA Oferecer
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    value={service1Name}
                    onChange={(e) => setService1Name(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    value={service1Price}
                    onChange={(e) => setService1Price(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    value={service2Name}
                    onChange={(e) => setService2Name(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    value={service2Price}
                    onChange={(e) => setService2Price(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 4: CONNECT WHATSAPP ================= */}
        {step === 4 && (
          <div className="space-y-6 text-center">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                {t('onboarding.step4Title')}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-sm mx-auto">
                {t('onboarding.step4Desc')}
              </p>
            </div>

            {/* QR box */}
            <div className="inline-block p-5 bg-white rounded-3xl border-2 border-teal-700/30 shadow-md relative">
              <svg className="w-48 h-48 mx-auto" viewBox="0 0 100 100" fill="none">
                <rect width="100" height="100" fill="white" />
                <rect x="10" y="10" width="25" height="25" fill="#0f766e" />
                <rect x="15" y="15" width="15" height="15" fill="white" />
                <rect x="18" y="18" width="9" height="9" fill="#0f766e" />
                <rect x="65" y="10" width="25" height="25" fill="#0f766e" />
                <rect x="70" y="15" width="15" height="15" fill="white" />
                <rect x="73" y="18" width="9" height="9" fill="#0f766e" />
                <rect x="10" y="65" width="25" height="25" fill="#0f766e" />
                <rect x="15" y="70" width="15" height="15" fill="white" />
                <rect x="18" y="73" width="9" height="9" fill="#0f766e" />
                <rect x="42" y="15" width="15" height="5" fill="#0f766e" />
                <rect x="45" y="42" width="10" height="10" fill="#0f766e" />
                <rect x="65" y="42" width="10" height="10" fill="#0f766e" />
                <rect x="52" y="65" width="15" height="15" fill="#0f766e" />
              </svg>

              {qrScanning && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-2xs flex flex-col items-center justify-center p-4 rounded-3xl">
                  <Loader2 className="w-8 h-8 text-teal-700 animate-spin mb-2" />
                  <p className="text-xs font-bold text-teal-900">Conectando WhatsApp...</p>
                </div>
              )}

              {qrConnected && (
                <div className="absolute inset-0 bg-emerald-50/95 flex flex-col items-center justify-center p-4 rounded-3xl border border-emerald-300">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mb-2" />
                  <p className="text-sm font-bold text-emerald-900">WhatsApp Conectado!</p>
                </div>
              )}
            </div>

            <div>
              <button
                type="button"
                onClick={handleSimulateQr}
                disabled={qrScanning || qrConnected}
                className="inline-flex items-center gap-2 py-2.5 px-5 text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-xl border border-teal-200 transition-colors cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-teal-700" />
                <span>{qrConnected ? 'Aparelho Sincronizado' : t('onboarding.qrScanSimulate')}</span>
              </button>
            </div>
          </div>
        )}

        {/* Wizard Footer Navigation Controls */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('common.back')}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onCancel}
              className="text-xs font-medium text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              {t('common.cancel')}
            </button>
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <span>{t('common.next')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-md transition-colors cursor-pointer"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              <span>{t('common.finish')}</span>
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
