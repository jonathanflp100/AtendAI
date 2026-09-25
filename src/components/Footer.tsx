import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, ShieldCheck, Mail, Phone, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-14 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
                <MessageCircle className="w-4 h-4 fill-white/20 stroke-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Atend<span className="text-teal-400">AI</span>
              </span>
            </div>
            
            <p className="text-slate-400 max-w-sm leading-relaxed text-sm">
              {t('footer.tagline')}
            </p>

            <div className="flex items-center gap-2 text-[11px] text-teal-400 pt-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Conformidade com a LGPD e Sigilo Profissional</span>
            </div>
          </div>

          {/* Nav links mirror */}
          <div className="space-y-2.5">
            <h4 className="text-sm font-semibold text-white tracking-wide uppercase">
              {t('footer.linksTitle')}
            </h4>
            <ul className="space-y-1.5">
              <li>
                <a href="#como-funciona" className="hover:text-teal-400 transition-colors">
                  {t('nav.howItWorks')}
                </a>
              </li>
              <li>
                <a href="#beneficios" className="hover:text-teal-400 transition-colors">
                  {t('nav.benefits')}
                </a>
              </li>
              <li>
                <a href="#simulacao" className="hover:text-teal-400 transition-colors">
                  {t('nav.simulation')}
                </a>
              </li>
              <li>
                <a href="#resultados" className="hover:text-teal-400 transition-colors">
                  {t('nav.results')}
                </a>
              </li>
              <li>
                <a href="#plano" className="hover:text-teal-400 transition-colors">
                  {t('nav.pricing')}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-teal-400 transition-colors">
                  {t('nav.faq')}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal and Support */}
          <div className="space-y-2.5">
            <h4 className="text-sm font-semibold text-white tracking-wide uppercase">
              {t('footer.legalTitle')}
            </h4>
            <ul className="space-y-1.5">
              <li>
                <span className="hover:text-teal-400 cursor-pointer transition-colors">
                  {t('footer.privacy')}
                </span>
              </li>
              <li>
                <span className="hover:text-teal-400 cursor-pointer transition-colors">
                  {t('footer.terms')}
                </span>
              </li>
              <li>
                <span className="hover:text-teal-400 cursor-pointer transition-colors">
                  {t('footer.security')}
                </span>
              </li>
              <li className="pt-2">
                <a 
                  href="mailto:contato@atendai.com.br"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-teal-400" />
                  <span>contato@atendai.com.br</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© {new Date().getFullYear()} AtendAI Tecnologia. {t('footer.rights')}</p>
          <p className="text-[11px]">{t('footer.madeFor')}</p>
        </div>
      </div>
    </footer>
  );
};
