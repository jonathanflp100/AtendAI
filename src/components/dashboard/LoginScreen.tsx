import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, ShieldCheck, ArrowRight, Lock, Mail, Sparkles, Globe } from 'lucide-react';
import { apiService } from '../../services/apiService';
import { User } from '../../types';

interface LoginScreenProps {
  onLoginSuccess: (user: User) => void;
  onGoToOnboarding: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onLoginSuccess,
  onGoToOnboarding,
}) => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('camila@clinicalumina.com.br');
  const [password, setPassword] = useState('••••••••');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setError('');

    try {
      const user = await apiService.login(email, password);
      onLoginSuccess(user);
    } catch {
      setError('Credenciais inválidas. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUseDemo = async () => {
    setIsLoading(true);
    try {
      const user = await apiService.login('camila@clinicalumina.com.br', 'demo123');
      onLoginSuccess(user);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleLanguage = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('atendai_lang', code);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50/40 via-white to-slate-100 flex flex-col justify-center items-center px-4 py-12 relative">
      
      {/* Language Switcher in corner */}
      <div className="absolute top-6 right-6 flex items-center gap-1.5 text-xs font-semibold bg-white px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-xs">
        <Globe className="w-3.5 h-3.5 text-teal-700" />
        <button
          onClick={() => toggleLanguage('pt-BR')}
          className={`px-1.5 py-0.5 rounded cursor-pointer ${i18n.language === 'pt-BR' ? 'text-teal-700 font-bold bg-teal-50' : 'text-slate-500'}`}
        >
          PT
        </button>
        <span className="text-slate-300">·</span>
        <button
          onClick={() => toggleLanguage('en')}
          className={`px-1.5 py-0.5 rounded cursor-pointer ${i18n.language.startsWith('en') ? 'text-teal-700 font-bold bg-teal-50' : 'text-slate-500'}`}
        >
          EN
        </button>
        <span className="text-slate-300">·</span>
        <button
          onClick={() => toggleLanguage('es')}
          className={`px-1.5 py-0.5 rounded cursor-pointer ${i18n.language.startsWith('es') ? 'text-teal-700 font-bold bg-teal-50' : 'text-slate-500'}`}
        >
          ES
        </button>
      </div>

      <div className="w-full max-w-md">
        
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-700 text-white shadow-md mb-3">
            <MessageCircle className="w-7 h-7 fill-white/20 stroke-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Atend<span className="text-teal-700">AI</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            {t('auth.loginSubtitle')}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {t('auth.loginTitle')}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Conecte sua clínica ao atendente inteligente do WhatsApp.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {t('auth.emailLabel')}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('auth.emailPlaceholder')}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300/80 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-800"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  {t('auth.passwordLabel')}
                </label>
                <a href="#forgot" className="text-xs font-semibold text-teal-700 hover:text-teal-800">
                  {t('auth.forgotPassword')}
                </a>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('auth.passwordPlaceholder')}
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300/80 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent text-slate-800"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-white bg-teal-700 hover:bg-teal-800 active:scale-[0.99] rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              <span>{isLoading ? t('common.loading') : t('auth.loginButton')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Access Button */}
          <div className="pt-2 border-t border-slate-100 space-y-3 text-center">
            <button
              onClick={handleUseDemo}
              disabled={isLoading}
              className="w-full py-2.5 px-4 text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100/80 border border-teal-200/80 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span>{t('auth.demoAccount')}</span>
            </button>

            <button
              onClick={onGoToOnboarding}
              className="text-xs font-semibold text-slate-600 hover:text-teal-700 transition-colors cursor-pointer"
            >
              {t('auth.needOnboarding')} →
            </button>
          </div>
        </div>

        {/* Security badge */}
        <div className="mt-6 text-center flex items-center justify-center gap-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span>Camada de segurança criptografada · Compatível com Supabase & LGPD</span>
        </div>

      </div>
    </div>
  );
};
