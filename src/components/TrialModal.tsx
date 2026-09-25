import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X, QrCode, CheckCircle2, Smartphone, ShieldCheck, ArrowRight, Loader2, Sparkles } from 'lucide-react';

interface TrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrialModal: React.FC<TrialModalProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState<'form' | 'qr' | 'success'>('form');
  const [clinicName, setClinicName] = useState('');
  const [specialty, setSpecialty] = useState('both');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [professionals, setProfessionals] = useState('1');
  const [isScanning, setIsScanning] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clinicName || !whatsapp) return;
    setStep('qr');
  };

  const handleSimulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setStep('success');
    }, 1800);
  };

  const handleResetAndClose = () => {
    setStep('form');
    setClinicName('');
    setWhatsapp('');
    setEmail('');
    setIsScanning(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150"
      onClick={handleResetAndClose}
    >
      <div 
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-teal-800 text-white p-6 relative">
          <button
            onClick={handleResetAndClose}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label={t('modal.close')}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-teal-900/60 text-teal-200 text-xs font-semibold mb-2">
            <span>7 Dias Grátis · Sem Cartão</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold leading-tight">
            {t('modal.title')}
          </h3>
          <p className="text-xs sm:text-sm text-teal-100 font-normal mt-1">
            {t('modal.subtitle')}
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          
          {/* STEP 1: Clinic Data Form */}
          {step === 'form' && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('modal.clinicNameLabel')} *
                </label>
                <input
                  type="text"
                  required
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                  placeholder={t('modal.clinicNamePlaceholder')}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('modal.specialtyLabel')}
                </label>
                <select
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent bg-white"
                >
                  <option value="odonto">{t('modal.specialtyOdonto')}</option>
                  <option value="estetica">{t('modal.specialtyEstetica')}</option>
                  <option value="both">{t('modal.specialtyBoth')}</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('modal.whatsappLabel')} *
                  </label>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder={t('modal.whatsappPlaceholder')}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {t('modal.professionalsLabel')}
                  </label>
                  <select
                    value={professionals}
                    onChange={(e) => setProfessionals(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent bg-white"
                  >
                    <option value="1">1 profissional (1 agenda)</option>
                    <option value="2-3">2 a 3 profissionais</option>
                    <option value="4+">4 ou mais profissionais</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('modal.emailLabel')}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('modal.emailPlaceholder')}
                  className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  <span>{t('modal.submit')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-500 pt-1">
                Ao continuar você concorda com nossos termos em conformidade com a LGPD.
              </p>
            </form>
          )}

          {/* STEP 2: QR Code Connection Simulation */}
          {step === 'qr' && (
            <div className="text-center space-y-4">
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-slate-900">{t('modal.qrTitle')}</h4>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  {t('modal.qrInstruction')}
                </p>
              </div>

              {/* Realistic SVG QR Code */}
              <div className="relative inline-block p-4 bg-white rounded-2xl border-2 border-teal-700/30 shadow-md">
                <svg
                  className="w-48 h-48 mx-auto"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="100" height="100" fill="white" />
                  {/* Outer corner 1 */}
                  <rect x="10" y="10" width="25" height="25" fill="#0f766e" />
                  <rect x="15" y="15" width="15" height="15" fill="white" />
                  <rect x="18" y="18" width="9" height="9" fill="#0f766e" />

                  {/* Outer corner 2 */}
                  <rect x="65" y="10" width="25" height="25" fill="#0f766e" />
                  <rect x="70" y="15" width="15" height="15" fill="white" />
                  <rect x="73" y="18" width="9" height="9" fill="#0f766e" />

                  {/* Outer corner 3 */}
                  <rect x="10" y="65" width="25" height="25" fill="#0f766e" />
                  <rect x="15" y="70" width="15" height="15" fill="white" />
                  <rect x="18" y="73" width="9" height="9" fill="#0f766e" />

                  {/* QR Pattern matrix simulation */}
                  <rect x="42" y="10" width="5" height="5" fill="#0f766e" />
                  <rect x="52" y="10" width="5" height="5" fill="#0f766e" />
                  <rect x="42" y="20" width="5" height="10" fill="#0f766e" />
                  <rect x="52" y="25" width="5" height="5" fill="#0f766e" />
                  <rect x="10" y="42" width="10" height="5" fill="#0f766e" />
                  <rect x="25" y="42" width="15" height="5" fill="#0f766e" />
                  <rect x="45" y="42" width="10" height="10" fill="#0f766e" />
                  <rect x="65" y="42" width="10" height="5" fill="#0f766e" />
                  <rect x="80" y="42" width="10" height="5" fill="#0f766e" />
                  <rect x="10" y="52" width="5" height="5" fill="#0f766e" />
                  <rect x="30" y="52" width="10" height="5" fill="#0f766e" />
                  <rect x="60" y="52" width="15" height="5" fill="#0f766e" />
                  <rect x="80" y="52" width="10" height="5" fill="#0f766e" />
                  <rect x="42" y="65" width="5" height="15" fill="#0f766e" />
                  <rect x="52" y="70" width="15" height="5" fill="#0f766e" />
                  <rect x="75" y="65" width="15" height="5" fill="#0f766e" />
                  <rect x="70" y="75" width="5" height="15" fill="#0f766e" />
                  <rect x="80" y="80" width="10" height="10" fill="#0f766e" />
                </svg>

                {isScanning && (
                  <div className="absolute inset-0 bg-white/90 backdrop-blur-2xs flex flex-col items-center justify-center p-4 rounded-xl">
                    <Loader2 className="w-8 h-8 text-teal-700 animate-spin mb-2" />
                    <p className="text-xs font-bold text-teal-900">{t('modal.simulatingConnection')}</p>
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={handleSimulateScan}
                  disabled={isScanning}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-white bg-teal-700 hover:bg-teal-800 disabled:opacity-50 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Simular Leitura do QR Code</span>
                </button>
              </div>

              <div className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-600" />
                <span>Conexão direta ponta a ponta sem intermediários</span>
              </div>
            </div>
          )}

          {/* STEP 3: Connection Success */}
          {step === 'success' && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1.5">
                <h4 className="text-xl font-extrabold text-slate-900">
                  {t('modal.connectedSuccess')}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                  {t('modal.connectedDesc')}
                </p>
              </div>

              {/* Clinic summary pill-less card */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-left max-w-sm mx-auto space-y-1">
                <p><span className="text-slate-500">Clínica:</span> <strong className="text-slate-900">{clinicName || 'Clínica Odonto & Estética'}</strong></p>
                <p><span className="text-slate-500">Número:</span> <strong className="text-slate-900">{whatsapp || '(11) 99999-9999'}</strong></p>
                <p><span className="text-slate-500">Status:</span> <span className="text-emerald-700 font-bold">Ativação de 7 dias grátis confirmada</span></p>
              </div>

              <div className="pt-2 space-y-2">
                <a
                  href={`https://wa.me/5511999999999?text=${encodeURIComponent('Olá! Acabei de ativar o teste de 7 dias da minha clínica ' + clinicName)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  <span>{t('modal.testNow')}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <button
                  onClick={handleResetAndClose}
                  className="w-full py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  {t('modal.close')}
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
