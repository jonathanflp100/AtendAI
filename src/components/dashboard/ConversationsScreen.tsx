import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MessageSquare,
  Search,
  Send,
  Phone,
  Video,
  MoreVertical,
  CheckCheck,
  Bot,
  UserCheck,
  RefreshCw,
  Sparkles,
  Smartphone,
  PhoneCall,
  Info
} from 'lucide-react';
import { Conversation, ChatMessage } from '../../types';
import { formatRelativeTime } from '../../services/formatters';

interface ConversationsScreenProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onToggleAttendant: (id: string) => Promise<void>;
  onSendMessage: (id: string, text: string) => Promise<void>;
}

export const ConversationsScreen: React.FC<ConversationsScreenProps> = ({
  conversations,
  selectedConversationId,
  onSelectConversation,
  onToggleAttendant,
  onSendMessage,
}) => {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'ai' | 'human'>('all');
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Filter conversations
  const filteredConversations = conversations.filter((c) => {
    const matchesSearch =
      c.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.patientPhone.includes(searchQuery);

    if (!matchesSearch) return false;
    if (filterType === 'ai') return c.attendant === 'ai';
    if (filterType === 'human') return c.attendant === 'human';
    return true;
  });

  const selectedConv =
    conversations.find((c) => c.id === selectedConversationId) ||
    filteredConversations[0] ||
    null;

  // Auto scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConv?.messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !selectedConv) return;
    const text = inputMessage.trim();
    setInputMessage('');
    setIsSending(true);

    try {
      await onSendMessage(selectedConv.id, text);
    } finally {
      setIsSending(false);
    }
  };

  const handleToggle = async () => {
    if (!selectedConv || isToggling) return;
    setIsToggling(true);
    try {
      await onToggleAttendant(selectedConv.id);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div className="h-[calc(100vh-6.5rem)] md:h-[calc(100vh-5rem)] flex flex-col pb-16 md:pb-2">
      
      {/* Container holding Left List & Right WhatsApp Chat */}
      <div className="flex-1 bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col md:flex-row">
        
        {/* ================= LEFT COLUMN: CONVERSATION LIST ================= */}
        <div className={`w-full md:w-80 lg:w-96 border-r border-slate-200 flex flex-col ${selectedConv && 'hidden md:flex'}`}>
          
          {/* List Header & Search */}
          <div className="p-3.5 border-b border-slate-200 bg-slate-50/70 space-y-2.5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-900">
                {t('conversations.title')}
              </h2>
              <span className="text-xs font-semibold text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded-full font-mono">
                {filteredConversations.length}
              </span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('conversations.searchPlaceholder')}
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-600 text-slate-800"
              />
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1.5 text-[11px] font-semibold">
              <button
                onClick={() => setFilterType('all')}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  filterType === 'all'
                    ? 'bg-teal-700 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {t('conversations.filterAll')}
              </button>
              <button
                onClick={() => setFilterType('ai')}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  filterType === 'ai'
                    ? 'bg-teal-700 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {t('conversations.filterAI')}
              </button>
              <button
                onClick={() => setFilterType('human')}
                className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                  filterType === 'human'
                    ? 'bg-teal-700 text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {t('conversations.filterHuman')}
              </button>
            </div>
          </div>

          {/* List items */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredConversations.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                Nenhuma conversa encontrada.
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const isSelected = selectedConv?.id === conv.id;
                const isAi = conv.attendant === 'ai';

                return (
                  <div
                    key={conv.id}
                    onClick={() => onSelectConversation(conv.id)}
                    className={`p-3.5 flex items-start gap-3 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-teal-50/70 border-l-4 border-l-teal-700'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    {/* Patient avatar */}
                    <div className="relative shrink-0">
                      <div className="w-10 h-10 rounded-full bg-teal-800 text-white flex items-center justify-center font-bold text-xs">
                        {conv.patientName.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-slate-900 text-xs truncate">
                          {conv.patientName}
                        </h3>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {formatRelativeTime(conv.lastMessageTimestamp, i18n.language)}
                        </span>
                      </div>

                      <p className="text-xs text-slate-500 truncate leading-snug mb-1.5">
                        {conv.lastMessage}
                      </p>

                      {/* Tags & Channel Icon */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          {/* Attendant badge */}
                          <span
                            className={`inline-flex items-center gap-1 px-1.5 py-0.2 rounded text-[10px] font-bold ${
                              isAi
                                ? 'bg-teal-100 text-teal-800 border border-teal-200'
                                : 'bg-amber-100 text-amber-800 border border-amber-200'
                            }`}
                          >
                            {isAi ? <Bot className="w-2.5 h-2.5" /> : <UserCheck className="w-2.5 h-2.5" />}
                            <span>{isAi ? t('common.aiAttendant') : t('common.humanAttendant')}</span>
                          </span>

                          {/* Channel indicator icon */}
                          <span
                            title="Canal: WhatsApp oficial da clínica"
                            className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200"
                          >
                            <Smartphone className="w-2.5 h-2.5" />
                            <span>WhatsApp</span>
                          </span>
                        </div>

                        {conv.unreadCount > 0 && (
                          <span className="w-4 h-4 rounded-full bg-teal-700 text-white font-bold text-[9px] flex items-center justify-center">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* ================= RIGHT COLUMN: WHATSAPP CHAT CANVAS ================= */}
        <div className={`flex-1 flex flex-col bg-[#EFEAE2] relative ${!selectedConv && 'hidden md:flex'}`}>
          {selectedConv ? (
            <>
              {/* WhatsApp Chat Top Header */}
              <div className="bg-teal-800 text-white px-4 py-3 flex items-center justify-between shadow-xs shrink-0 z-10">
                <div className="flex items-center gap-3">
                  {/* Mobile back button to list */}
                  <button
                    onClick={() => onSelectConversation('')}
                    className="md:hidden text-white/80 hover:text-white p-1"
                  >
                    ←
                  </button>

                  <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center font-bold text-sm text-white border border-teal-400/40">
                    {selectedConv.patientName.slice(0, 2).toUpperCase()}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-white">
                        {selectedConv.patientName}
                      </h3>
                      <span className="text-[10px] text-teal-200 font-mono">
                        {selectedConv.patientPhone}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-teal-100">
                      {/* Active attendant indicator */}
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>
                          {t('conversations.currentlyHandledBy')}{' '}
                          <strong className="text-white">
                            {selectedConv.attendant === 'ai' ? t('common.aiAttendant') : t('common.humanAttendant')}
                          </strong>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right controls: Channel & Takeover Button */}
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Channel indicator icon with future voice tooltip */}
                  <div
                    title="Canal: WhatsApp ativo. Canal de ligação telefônica disponível em breve."
                    className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-900/60 text-teal-200 text-xs font-semibold cursor-help"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp</span>
                  </div>

                  {/* Future voice icon preview */}
                  <div
                    title={t('conversations.channelVoiceNotice')}
                    className="hidden sm:flex items-center p-1.5 rounded-lg bg-teal-900/40 text-teal-300 opacity-60 hover:opacity-100 transition-opacity cursor-help"
                  >
                    <PhoneCall className="w-4 h-4" />
                  </div>

                  {/* Primary Action Button: "Assumir conversa" / "Devolver para IA" */}
                  <button
                    onClick={handleToggle}
                    disabled={isToggling}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer ${
                      selectedConv.attendant === 'ai'
                        ? 'bg-amber-400 hover:bg-amber-300 text-slate-900 active:scale-95'
                        : 'bg-teal-500 hover:bg-teal-400 text-white active:scale-95'
                    }`}
                  >
                    {selectedConv.attendant === 'ai' ? (
                      <>
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>{t('conversations.takeoverButton')}</span>
                      </>
                    ) : (
                      <>
                        <Bot className="w-3.5 h-3.5" />
                        <span>{t('conversations.returnToAIButton')}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Chat Message History Body */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 whatsapp-chat-scroll">
                {/* Security pill notice */}
                <div className="text-center my-2">
                  <span className="inline-block bg-amber-100/90 text-amber-900 text-[10px] px-3 py-1 rounded-md font-medium shadow-2xs">
                    🔒 Conversa sincronizada em tempo real via WhatsApp Oficial da Clínica.
                  </span>
                </div>

                {selectedConv.messages.map((msg) => {
                  const isPatient = msg.sender === 'patient';
                  const isSystem = msg.sender === 'system';

                  if (isSystem) {
                    return (
                      <div key={msg.id} className="text-center my-2">
                        <span className="inline-block bg-slate-200/90 text-slate-700 text-[11px] px-3 py-1 rounded-full font-medium">
                          {msg.text}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isPatient ? 'items-start' : 'items-end'}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[70%] rounded-lg px-3.5 py-2 text-xs sm:text-[13px] shadow-2xs ${
                          isPatient
                            ? 'bg-white text-slate-800 rounded-tl-none border border-slate-200/70'
                            : 'bg-[#E7FFDB] text-slate-800 rounded-tr-none border border-emerald-100'
                        }`}
                      >
                        {/* Sender subtitle */}
                        {!isPatient && (
                          <div className="text-[10px] font-bold text-teal-800 mb-0.5">
                            {msg.sender === 'ai' ? '🤖 AtendAI (IA)' : '👤 Operador Humano (Você)'}
                          </div>
                        )}

                        <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                        <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400 mt-1">
                          <span>
                            {new Date(msg.timestamp).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                          {!isPatient && (
                            <CheckCheck className="w-3.5 h-3.5 text-blue-500 stroke-[2.5]" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div ref={messagesEndRef} />
              </div>

              {/* Chat Send Input Box */}
              <form
                onSubmit={handleSend}
                className="bg-slate-100 p-2.5 border-t border-slate-200 flex items-center gap-2 shrink-0"
              >
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={
                    selectedConv.attendant === 'ai'
                      ? 'A IA está respondendo. Digite para enviar como operador humano...'
                      : t('conversations.typeMessagePlaceholder')
                  }
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-600"
                />

                <button
                  type="submit"
                  disabled={isSending || !inputMessage.trim()}
                  className="w-10 h-10 rounded-xl bg-teal-700 hover:bg-teal-800 disabled:opacity-40 text-white flex items-center justify-center shrink-0 cursor-pointer shadow-xs transition-colors"
                  aria-label={t('conversations.send')}
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-slate-400">
              <MessageSquare className="w-12 h-12 text-slate-300 mb-3" />
              <p className="text-sm font-medium">{t('conversations.selectConversation')}</p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
