import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  MessageSquare,
  CalendarCheck2,
  CheckCircle,
  TrendingDown,
  ArrowRight,
  Clock,
  User,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  Check
} from 'lucide-react';
import { DashboardStats, Appointment, Conversation } from '../../types';
import { formatTime, formatDate, formatCurrency } from '../../services/formatters';

interface DashboardOverviewProps {
  stats: DashboardStats;
  appointments: Appointment[];
  conversations: Conversation[];
  onNavigateToTab: (tab: 'conversations' | 'calendar') => void;
  onOpenConversation: (convId: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  stats,
  appointments,
  conversations,
  onNavigateToTab,
  onOpenConversation,
}) => {
  const { t, i18n } = useTranslation();

  // Filter today's appointments
  const todayStr = new Date().toISOString().split('T')[0];
  const todayAppointments = appointments.filter((a) => a.date === todayStr);

  return (
    <div className="space-y-8 pb-12">
      
      {/* Page Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('dashboard.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-0.5">
            {t('dashboard.subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>IA Ativa no WhatsApp</span>
          </div>
        </div>
      </div>

      {/* 4 Primary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Card 1: Conversas Hoje */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-teal-200 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {t('dashboard.conversationsToday')}
              </span>
              <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight tabular-nums">
              {stats.conversationsToday}
            </div>
          </div>
          <p className="text-xs text-slate-500 font-normal mt-3 pt-3 border-t border-slate-100">
            {t('dashboard.conversationsTodayDesc')}
          </p>
        </div>

        {/* Card 2: Consultas Agendadas */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-teal-200 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {t('dashboard.scheduledToday')}
              </span>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <CalendarCheck2 className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight tabular-nums">
              {stats.scheduledToday}
            </div>
          </div>
          <p className="text-xs text-slate-500 font-normal mt-3 pt-3 border-t border-slate-100">
            {t('dashboard.scheduledTodayDesc')}
          </p>
        </div>

        {/* Card 3: Confirmadas */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-teal-200 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {t('dashboard.confirmedToday')}
              </span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <CheckCircle className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight tabular-nums">
              {stats.confirmedToday}
            </div>
          </div>
          <p className="text-xs text-slate-500 font-normal mt-3 pt-3 border-t border-slate-100">
            {t('dashboard.confirmedTodayDesc')}
          </p>
        </div>

        {/* Card 4: Faltas da semana (com queda no-show) */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:border-teal-200 transition-colors">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {t('dashboard.noShowsWeek')}
              </span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <TrendingDown className="w-5 h-5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-slate-900 font-mono tracking-tight tabular-nums">
                {stats.noShowsThisWeek}
              </span>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                -78% no-show
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-500 font-normal mt-3 pt-3 border-t border-slate-100">
            {t('dashboard.noShowsWeekDesc')}
          </p>
        </div>

      </div>

      {/* Gráfico Simples de Faltas por Semana */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {t('dashboard.chartTitle')}
            </h2>
            <p className="text-xs text-slate-500 font-normal">
              {t('dashboard.chartSubtitle')}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-teal-600" />
              <span>{t('dashboard.chartScheduled')}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-rose-400" />
              <span>{t('dashboard.chartNoShows')}</span>
            </span>
          </div>
        </div>

        {/* Clean visual bar chart representation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
          {stats.weeklyNoShows.map((week, idx) => {
            const isLatest = idx === stats.weeklyNoShows.length - 1;
            return (
              <div 
                key={idx} 
                className={`p-4 rounded-xl border flex flex-col justify-between transition-colors ${
                  isLatest ? 'bg-teal-50/50 border-teal-300' : 'bg-slate-50 border-slate-200/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-2">
                    <span>{week.weekLabel}</span>
                    <span className={`px-2 py-0.5 rounded text-[11px] font-mono ${isLatest ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}>
                      {week.rate}% falta
                    </span>
                  </div>

                  {/* Relative height bar visual */}
                  <div className="space-y-1.5 my-3">
                    <div className="text-[11px] text-slate-500 flex justify-between">
                      <span>Total agendado:</span>
                      <strong className="font-mono text-slate-800">{week.scheduled}</strong>
                    </div>
                    <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden flex">
                      <div 
                        className="bg-teal-600 h-full transition-all"
                        style={{ width: `${(week.confirmed / week.scheduled) * 100}%` }}
                        title={`Confirmadas: ${week.confirmed}`}
                      />
                      <div 
                        className="bg-rose-400 h-full transition-all"
                        style={{ width: `${(week.noShows / week.scheduled) * 100}%` }}
                        title={`Faltas: ${week.noShows}`}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Compareceram:</span>
                  <span className="font-bold text-slate-800 font-mono">{week.confirmed}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Columns: Próximas Consultas de Hoje + Conversas no WhatsApp */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Próximas Consultas de Hoje */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">
                {t('dashboard.recentAppointments')}
              </h3>
              <button
                onClick={() => onNavigateToTab('calendar')}
                className="text-xs font-semibold text-teal-700 hover:text-teal-800 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>{t('common.seeAll')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {todayAppointments.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-500">
                {t('dashboard.noAppointmentsToday')}
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {todayAppointments.slice(0, 5).map((apt) => (
                  <div key={apt.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 font-bold flex items-center justify-center shrink-0">
                        {apt.time}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-sm">{apt.patientName}</p>
                        <p className="text-slate-500 text-[11px]">{apt.serviceName} · {apt.professionalName}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        apt.status === 'confirmed'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : apt.status === 'scheduled'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}>
                        {t(`common.${apt.status}`)}
                      </span>
                      <p className="text-slate-400 text-[10px] mt-0.5 font-mono">
                        {formatCurrency(apt.price, i18n.language)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Conversas Recentes no WhatsApp */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900">
                {t('dashboard.liveConversations')}
              </h3>
              <button
                onClick={() => onNavigateToTab('conversations')}
                className="text-xs font-semibold text-teal-700 hover:text-teal-800 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>{t('common.seeAll')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="divide-y divide-slate-100">
              {conversations.slice(0, 4).map((c) => (
                <div
                  key={c.id}
                  onClick={() => {
                    onOpenConversation(c.id);
                    onNavigateToTab('conversations');
                  }}
                  className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50 p-2 rounded-xl transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div className="w-9 h-9 rounded-full bg-teal-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {c.patientName.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="overflow-hidden text-xs">
                      <div className="flex items-center gap-1.5">
                        <p className="font-bold text-slate-900 truncate">{c.patientName}</p>
                        <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                          c.attendant === 'ai' ? 'bg-teal-100 text-teal-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {c.attendant === 'ai' ? 'IA' : 'Humano'}
                        </span>
                      </div>
                      <p className="text-slate-500 truncate text-[11px] mt-0.5">
                        {c.lastMessage}
                      </p>
                    </div>
                  </div>

                  <span className="text-[11px] text-teal-700 font-semibold shrink-0">
                    {t('dashboard.takeoverAction')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
