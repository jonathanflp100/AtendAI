import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

interface FloatingWhatsAppProps {
  onOpenTrial: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ onOpenTrial }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const samplePrompt = t('floating.samplePrompt');
  const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(samplePrompt)}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      
      {/* Popover Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="bg-teal-800 text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center font-bold text-xs">
                  AI
                </div>
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-teal-800" />
              </div>
              <div>
                <p className="font-bold text-xs leading-tight">AtendAI Suporte & Demonstração</p>
                <p className="text-[10px] text-teal-200 font-normal">Online agora para atender</p>
              </div>
            </div>

            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-3.5 bg-slate-50 space-y-2.5 text-xs">
            <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs text-slate-700 leading-relaxed">
              <p className="font-medium text-slate-900 mb-1">{t('floating.quickChatTitle')}</p>
              <p className="text-slate-600 text-[11px]">{t('floating.quickChatDesc')}</p>
            </div>

            <div className="pt-1 space-y-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>{t('floating.buttonLabel')}</span>
              </a>

              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenTrial();
                }}
                className="w-full inline-flex items-center justify-center py-2 px-3 bg-white hover:bg-slate-100 text-teal-800 text-xs font-semibold rounded-xl border border-slate-200 transition-colors cursor-pointer"
              >
                {t('nav.cta')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-white shadow-xl hover:shadow-2xl transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
        aria-label="Abrir conversa no WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
        </span>
        <MessageCircle className="w-7 h-7 fill-white/20 stroke-white" />
      </button>

    </div>
  );
};
