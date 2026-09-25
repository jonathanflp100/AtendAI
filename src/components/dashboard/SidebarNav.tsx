import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  MessageSquare,
  Calendar,
  Users,
  Settings,
  Sparkles,
  LogOut,
  Globe,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Wand2
} from 'lucide-react';
import { User, ClinicSettings } from '../../types';

export type DashboardTab = 'dashboard' | 'conversations' | 'calendar' | 'patients' | 'settings' | 'onboarding';

interface SidebarNavProps {
  currentTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  user: User | null;
  settings: ClinicSettings | null;
  onLogout: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  currentTab,
  onSelectTab,
  user,
  settings,
  onLogout,
}) => {
  const { t, i18n } = useTranslation();
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const languages = [
    { code: 'pt-BR', label: 'Português', short: 'PT', flag: '🇧🇷' },
    { code: 'en', label: 'English', short: 'EN', flag: '🇺🇸' },
    { code: 'es', label: 'Español', short: 'ES', flag: '🇪🇸' },
  ];

  const currentLang = languages.find((l) => l.code === i18n.language) || languages[0];

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('atendai_lang', code);
    setLangMenuOpen(false);
  };

  const navItems = [
    { id: 'dashboard' as const, label: t('nav.dashboard'), icon: LayoutDashboard },
    { id: 'conversations' as const, label: t('nav.conversations'), icon: MessageSquare },
    { id: 'calendar' as const, label: t('nav.calendar'), icon: Calendar },
    { id: 'patients' as const, label: t('nav.patients'), icon: Users },
    { id: 'settings' as const, label: t('nav.settings'), icon: Settings },
    { id: 'onboarding' as const, label: t('nav.onboarding'), icon: Wand2 },
  ];

  const isConnected = settings?.whatsapp.status === 'connected';

  return (
    <>
      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200/90 h-screen sticky top-0 shrink-0 z-30 select-none">
        
        {/* Brand & Clinic Name */}
        <div className="p-5 border-b border-slate-200/80">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-9 h-9 rounded-xl bg-teal-700 flex items-center justify-center text-white shadow-sm">
              <MessageCircle className="w-5 h-5 fill-white/20 stroke-white" />
            </div>
            <div>
              <span className="text-xl font-black text-slate-900 tracking-tight">
                Atend<span className="text-teal-700">AI</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded ml-1.5 border border-teal-200/70">
                Painel
              </span>
            </div>
          </div>

          {/* Clinic status indicator */}
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70 text-xs">
            <div className="font-semibold text-slate-800 truncate mb-1" title={settings?.name}>
              {settings?.name || 'Clínica Lumina'}
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1.5 text-slate-500">
                <span className={`w-2 h-2 rounded-full ${isConnected ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                <span>{isConnected ? 'WhatsApp Ativo' : 'Desconectado'}</span>
              </span>
              <span className="font-semibold text-teal-800 text-[10px] bg-teal-100/60 px-1.5 py-0.2 rounded">
                IA 24h
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  active
                    ? 'bg-teal-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-teal-800 hover:bg-teal-50/70'
                }`}
              >
                <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-400 group-hover:text-teal-700'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Info & Global Actions */}
        <div className="p-3 border-t border-slate-200/80 space-y-2">
          
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200/80 transition-colors cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-teal-700" />
                <span>{t('nav.switchLang')}: {currentLang.short}</span>
              </span>
              <span className="text-xs">{currentLang.flag}</span>
            </button>

            {langMenuOpen && (
              <div className="absolute bottom-full left-0 mb-1.5 w-full bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
                {languages.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => handleLanguageChange(l.code)}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-teal-50 cursor-pointer ${
                      i18n.language === l.code ? 'font-bold text-teal-700 bg-slate-50' : 'text-slate-700'
                    }`}
                  >
                    <span>{l.label}</span>
                    <span>{l.flag}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* User Profile item */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-teal-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
                {user?.name ? user.name.slice(0, 2).toUpperCase() : 'DR'}
              </div>
              <div className="overflow-hidden text-xs">
                <p className="font-bold text-slate-900 truncate">{user?.name || 'Dra. Camila Santos'}</p>
                <p className="text-slate-500 text-[11px] truncate">{user?.email || 'admin@atendai.com'}</p>
              </div>
            </div>

            <button
              onClick={onLogout}
              title={t('auth.logout')}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>
      </aside>

      {/* ================= MOBILE BOTTOM NAVIGATION ================= */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-slate-200/90 z-40 px-2 py-1.5 flex items-center justify-around shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-semibold transition-colors cursor-pointer ${
                active ? 'text-teal-700 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className={`w-5 h-5 mb-0.5 ${active ? 'text-teal-700 stroke-[2.5]' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
};
