import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Menu, X, Sparkles, MessageCircle } from 'lucide-react';

interface NavbarProps {
  onOpenTrial: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTrial }) => {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const navLinks = [
    { href: '#como-funciona', label: t('nav.howItWorks') },
    { href: '#beneficios', label: t('nav.benefits') },
    { href: '#simulacao', label: t('nav.simulation') },
    { href: '#resultados', label: t('nav.results') },
    { href: '#plano', label: t('nav.pricing') },
    { href: '#faq', label: t('nav.faq') },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        
        {/* Zone 1: Single text element wordmark */}
        <a 
          href="#" 
          className="flex items-center gap-2 group text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded"
        >
          <div className="w-9 h-9 rounded-lg bg-teal-700 flex items-center justify-center text-white shadow-sm group-hover:bg-teal-800 transition-colors">
            <MessageCircle className="w-5 h-5 fill-white/20 stroke-white" />
          </div>
          <span>
            Atend<span className="text-teal-700">AI</span>
          </span>
        </a>

        {/* Zone 2: Clean 4-6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-teal-700 transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-teal-600 hover:after:w-full after:transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-teal-600 rounded"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Language Selector & Primary Action */}
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 cursor-pointer"
              aria-expanded={langMenuOpen}
              aria-label="Selecionar idioma"
            >
              <Globe className="w-3.5 h-3.5 text-teal-700" />
              <span>{currentLang.short}</span>
              <span className="text-xs opacity-75">{currentLang.flag}</span>
            </button>

            {langMenuOpen && (
              <div 
                className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150"
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full text-left px-3 py-1.5 text-xs font-medium flex items-center justify-between hover:bg-teal-50 hover:text-teal-800 transition-colors cursor-pointer ${
                      i18n.language === lang.code ? 'text-teal-700 font-bold bg-slate-50' : 'text-slate-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{lang.flag}</span>
                      <span>{lang.label}</span>
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Primary CTA */}
          <button
            onClick={onOpenTrial}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 active:scale-[0.98] rounded-lg shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 whitespace-nowrap cursor-pointer"
          >
            {t('nav.cta')}
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-teal-700 hover:bg-slate-100 rounded-md transition-colors cursor-pointer"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg">
          <nav className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-teal-700 hover:bg-teal-50 rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTrial();
              }}
              className="w-full py-2.5 px-4 text-center text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              {t('nav.cta')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
