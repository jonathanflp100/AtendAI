import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Settings,
  Building,
  Sparkles,
  Clock,
  Users,
  Smartphone,
  CheckCircle2,
  XCircle,
  Plus,
  Trash2,
  QrCode,
  Globe,
  Save,
  Loader2,
  Bot
} from 'lucide-react';
import { ClinicSettings, ServiceItem, Professional, WorkingHour, BotTone } from '../../types';
import { formatCurrency } from '../../services/formatters';

interface SettingsScreenProps {
  settings: ClinicSettings;
  onUpdateSettings: (partial: Partial<ClinicSettings>) => Promise<void>;
  onToggleWhatsApp: () => Promise<void>;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  settings,
  onUpdateSettings,
  onToggleWhatsApp,
}) => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<'clinic' | 'services' | 'hours' | 'professionals' | 'bot' | 'whatsapp'>('clinic');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Clinic Profile State
  const [name, setName] = useState(settings.name);
  const [phone, setPhone] = useState(settings.phone);
  const [email, setEmail] = useState(settings.email);
  const [address, setAddress] = useState(settings.address);
  const [botTone, setBotTone] = useState<BotTone>(settings.botTone);

  // Services State
  const [services, setServices] = useState<ServiceItem[]>(settings.services);
  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceDuration, setNewServiceDuration] = useState(45);
  const [newServicePrice, setNewServicePrice] = useState(200);

  // Working Hours State
  const [workingHours, setWorkingHours] = useState<WorkingHour[]>(settings.workingHours);

  // Professionals State
  const [professionals, setProfessionals] = useState<Professional[]>(settings.professionals);
  const [newProfName, setNewProfName] = useState('');
  const [newProfRole, setNewProfRole] = useState('');

  const handleSaveAll = async () => {
    setIsSaving(true);
    try {
      await onUpdateSettings({
        name,
        phone,
        email,
        address,
        botTone,
        services,
        workingHours,
        professionals,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceName) return;

    const newSrv: ServiceItem = {
      id: `srv_${Date.now()}`,
      name: newServiceName,
      durationMinutes: Number(newServiceDuration),
      price: Number(newServicePrice),
      active: true,
    };
    setServices([...services, newSrv]);
    setNewServiceName('');
  };

  const handleRemoveService = (id: string) => {
    setServices(services.filter((s) => s.id !== id));
  };

  const handleAddProfessional = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProfName) return;

    const newProf: Professional = {
      id: `prof_${Date.now()}`,
      name: newProfName,
      role: newProfRole || 'Especialista',
      color: '#0d9488',
      active: true,
    };
    setProfessionals([...professionals, newProf]);
    setNewProfName('');
    setNewProfRole('');
  };

  const handleToggleWorkingDay = (dayIndex: number) => {
    const updated = workingHours.map((wh) =>
      wh.dayOfWeek === dayIndex ? { ...wh, isOpen: !wh.isOpen } : wh
    );
    setWorkingHours(updated);
  };

  const isConnected = settings.whatsapp.status === 'connected';

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header with Save Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('settings.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {t('settings.subtitle')}
          </p>
        </div>

        <button
          onClick={handleSaveAll}
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 disabled:opacity-50 rounded-xl shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          {isSaving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>{saveSuccess ? t('common.saved') : t('common.save')}</span>
        </button>
      </div>

      {/* Tabs navigation */}
      <div className="bg-white p-1.5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-wrap gap-1 text-xs font-bold">
        {[
          { id: 'clinic' as const, label: t('settings.tabClinic'), icon: Building },
          { id: 'services' as const, label: t('settings.tabServices'), icon: Sparkles },
          { id: 'hours' as const, label: t('settings.tabHours'), icon: Clock },
          { id: 'professionals' as const, label: t('settings.tabProfessionals'), icon: Users },
          { id: 'bot' as const, label: t('settings.tabBot'), icon: Bot },
          { id: 'whatsapp' as const, label: t('settings.tabWhatsApp'), icon: Smartphone },
        ].map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                active
                  ? 'bg-teal-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-teal-800 hover:bg-teal-50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-6 sm:p-8">
        
        {/* TAB 1: CLINIC PROFILE */}
        {activeTab === 'clinic' && (
          <div className="max-w-2xl space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t('settings.clinicName')}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-600 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('settings.clinicPhone')}
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('settings.clinicEmail')}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t('settings.clinicAddress')}
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-600 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* TAB 2: SERVICES & PRICING */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            {/* Add service form */}
            <form onSubmit={handleAddService} className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('settings.serviceName')}
                </label>
                <input
                  type="text"
                  required
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  placeholder="Ex: Harmonização Mandibular"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('settings.serviceDuration')}
                </label>
                <input
                  type="number"
                  min="15"
                  step="15"
                  value={newServiceDuration}
                  onChange={(e) => setNewServiceDuration(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {t('settings.servicePrice')} (R$)
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    step="10"
                    value={newServicePrice}
                    onChange={(e) => setNewServicePrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-xs cursor-pointer shrink-0"
                  >
                    +
                  </button>
                </div>
              </div>
            </form>

            {/* Services list table */}
            <div className="divide-y divide-slate-100 text-xs">
              {services.map((srv) => (
                <div key={srv.id} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-bold text-slate-900 text-sm">{srv.name}</p>
                    <p className="text-slate-500 text-[11px]">
                      {srv.durationMinutes} minutos · {srv.category || 'Geral'}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-mono font-bold text-slate-800 text-sm">
                      {formatCurrency(srv.price, i18n.language)}
                    </span>
                    <button
                      onClick={() => handleRemoveService(srv.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: WORKING HOURS */}
        {activeTab === 'hours' && (
          <div className="space-y-3 max-w-xl">
            {workingHours.map((wh) => (
              <div
                key={wh.dayOfWeek}
                className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center justify-between text-xs"
              >
                <div className="w-32 font-bold text-slate-800">
                  {wh.dayName}
                </div>

                <div className="flex items-center gap-2">
                  <label className="inline-flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={wh.isOpen}
                      onChange={() => handleToggleWorkingDay(wh.dayOfWeek)}
                      className="rounded text-teal-700 focus:ring-teal-600"
                    />
                    <span className={wh.isOpen ? 'text-emerald-700 font-semibold' : 'text-slate-400'}>
                      {wh.isOpen ? 'Aberto' : 'Fechado'}
                    </span>
                  </label>
                </div>

                {wh.isOpen ? (
                  <div className="flex items-center gap-1 font-mono text-[11px] text-slate-600">
                    <span>{wh.openTime}</span>
                    <span>-</span>
                    <span>{wh.closeTime}</span>
                  </div>
                ) : (
                  <span className="text-slate-400 text-[11px] italic">Sem atendimento</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB 4: PROFESSIONALS */}
        {activeTab === 'professionals' && (
          <div className="space-y-6 max-w-2xl">
            {/* Add professional form */}
            <form onSubmit={handleAddProfessional} className="p-4 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nome do Profissional
                </label>
                <input
                  type="text"
                  required
                  value={newProfName}
                  onChange={(e) => setNewProfName(e.target.value)}
                  placeholder="Ex: Dra. Mariana Costa"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Especialidade / Cargo
                </label>
                <input
                  type="text"
                  value={newProfRole}
                  onChange={(e) => setNewProfRole(e.target.value)}
                  placeholder="Ex: Endodontista"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <button
                type="submit"
                className="py-2 px-4 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-xs cursor-pointer shadow-xs"
              >
                Adicionar Profissional
              </button>
            </form>

            <div className="divide-y divide-slate-100 text-xs">
              {professionals.map((prof) => (
                <div key={prof.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-800 text-white flex items-center justify-center font-bold text-xs">
                      {prof.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{prof.name}</p>
                      <p className="text-slate-500 text-[11px]">{prof.role}</p>
                    </div>
                  </div>
                  <span className="text-emerald-700 font-bold text-[11px]">Agenda Ativa</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: BOT PERSONALITY & TONE */}
        {activeTab === 'bot' && (
          <div className="max-w-2xl space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                {t('settings.botToneLabel')}
              </label>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                {t('settings.botToneDesc')}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setBotTone('formal')}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    botTone === 'formal'
                      ? 'border-teal-700 bg-teal-50/50 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-900 text-sm">Formal & Clínico</span>
                    {botTone === 'formal' && <CheckCircle2 className="w-4 h-4 text-teal-700" />}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {t('settings.botToneFormal')}
                  </p>
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-[11px] text-slate-500 italic">
                    "Olá, Sra. Mariana. Tudo bem? Para o procedimento de clareamento, dispomos de dois horários nesta semana..."
                  </div>
                </div>

                <div
                  onClick={() => setBotTone('casual')}
                  className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                    botTone === 'casual'
                      ? 'border-teal-700 bg-teal-50/50 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-900 text-sm">Descontraído & Amigável</span>
                    {botTone === 'casual' && <CheckCircle2 className="w-4 h-4 text-teal-700" />}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {t('settings.botToneCasual')}
                  </p>
                  <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-[11px] text-slate-500 italic">
                    "Fala, Mariana! Beleza? 😊 Se liga, temos vaga pra cuidar do seu sorriso nesta quinta ou sexta! Bora agendar?"
                  </div>
                </div>
              </div>
            </div>

            {/* Language Switch inside settings */}
            <div className="pt-4 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 mb-2">
                {t('settings.languageLabel')}
              </label>
              <div className="flex gap-2 text-xs font-bold">
                {[
                  { code: 'pt-BR', label: 'Português (Brasil)', flag: '🇧🇷' },
                  { code: 'en', label: 'English (US)', flag: '🇺🇸' },
                  { code: 'es', label: 'Español (ES)', flag: '🇪🇸' },
                ].map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      i18n.changeLanguage(l.code);
                      localStorage.setItem('atendai_lang', l.code);
                    }}
                    className={`px-3 py-2 rounded-xl border transition-colors cursor-pointer flex items-center gap-1.5 ${
                      i18n.language === l.code
                        ? 'border-teal-700 bg-teal-50 text-teal-900 font-extrabold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>{l.flag}</span>
                    <span>{l.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: WHATSAPP CONNECTION */}
        {activeTab === 'whatsapp' && (
          <div className="max-w-xl space-y-6">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  isConnected ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">
                    {isConnected ? t('settings.whatsappStatusConnected') : t('settings.whatsappStatusDisconnected')}
                  </h4>
                  <p className="text-xs text-slate-500 font-mono">
                    {settings.whatsapp.phoneNumber || '+55 11 98765-4321'}
                  </p>
                </div>
              </div>

              <button
                onClick={onToggleWhatsApp}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                  isConnected
                    ? 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200'
                    : 'bg-teal-700 text-white hover:bg-teal-800'
                }`}
              >
                {isConnected ? t('settings.whatsappDisconnect') : t('settings.whatsappReconnect')}
              </button>
            </div>

            {/* QR Code presentation box */}
            <div className="text-center p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
              <h5 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                {t('settings.whatsappInstructions')}
              </h5>

              <div className="inline-block p-4 bg-white rounded-2xl border border-slate-300 shadow-xs">
                {/* SVG QR Code */}
                <svg className="w-40 h-40 mx-auto" viewBox="0 0 100 100" fill="none">
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
                  <rect x="42" y="10" width="5" height="5" fill="#0f766e" />
                  <rect x="52" y="10" width="5" height="5" fill="#0f766e" />
                  <rect x="42" y="25" width="15" height="5" fill="#0f766e" />
                  <rect x="45" y="45" width="10" height="10" fill="#0f766e" />
                  <rect x="65" y="45" width="15" height="5" fill="#0f766e" />
                  <rect x="50" y="65" width="15" height="10" fill="#0f766e" />
                  <rect x="75" y="65" width="10" height="15" fill="#0f766e" />
                </svg>
              </div>

              <p className="text-xs text-slate-500">
                {t('settings.whatsappDevice')}: <strong>{settings.whatsapp.deviceName || 'WhatsApp Web iPhone'}</strong>
              </p>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
