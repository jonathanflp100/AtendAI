import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Users,
  Search,
  Calendar,
  MessageSquare,
  Clock,
  Phone,
  Mail,
  FileText,
  X,
  ExternalLink,
  ChevronRight,
  TrendingDown,
  CheckCircle2
} from 'lucide-react';
import { Patient, Appointment, Conversation } from '../../types';
import { formatDate, formatCurrency } from '../../services/formatters';

interface PatientsScreenProps {
  patients: Patient[];
  appointments: Appointment[];
  conversations: Conversation[];
  onOpenConversation: (convId: string) => void;
  onNavigateToTab: (tab: 'conversations' | 'calendar') => void;
}

export const PatientsScreen: React.FC<PatientsScreenProps> = ({
  patients,
  appointments,
  conversations,
  onOpenConversation,
  onNavigateToTab,
}) => {
  const { t, i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState<string | null>(null);

  const filteredPatients = patients.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.phone.includes(q) ||
      p.email.toLowerCase().includes(q) ||
      (p.document && p.document.includes(q))
    );
  });

  const selectedPatient = patients.find((p) => p.id === selectedPatientId) || null;
  const patientAppointments = selectedPatient
    ? appointments.filter((a) => a.patientId === selectedPatient.id)
    : [];
  const patientConversation = selectedPatient
    ? conversations.find((c) => c.patientId === selectedPatient.id)
    : null;

  return (
    <div className="space-y-6 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('patients.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {t('patients.subtitle')}
          </p>
        </div>

        <div className="text-xs font-semibold text-slate-500">
          <strong className="text-slate-900 font-mono text-sm">{filteredPatients.length}</strong> {t('patients.totalPatients')}
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('patients.searchPlaceholder')}
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-600 text-slate-800"
          />
        </div>
      </div>

      {/* Main Container: Patient List + Details Drawer/Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Table / Cards List */}
        <div className={`${selectedPatient ? 'lg:col-span-7' : 'lg:col-span-12'} bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3.5">{t('patients.tableHeaderName')}</th>
                  <th className="px-4 py-3.5">{t('patients.tableHeaderContact')}</th>
                  <th className="px-4 py-3.5 text-center">{t('patients.tableHeaderAppointments')}</th>
                  <th className="px-4 py-3.5 text-center">{t('patients.tableHeaderNoShows')}</th>
                  <th className="px-4 py-3.5">{t('patients.tableHeaderLastVisit')}</th>
                  <th className="px-5 py-3.5 text-right">{t('patients.tableHeaderActions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredPatients.map((patient) => {
                  const isSelected = selectedPatient?.id === patient.id;
                  return (
                    <tr
                      key={patient.id}
                      onClick={() => setSelectedPatientId(patient.id)}
                      className={`hover:bg-teal-50/50 transition-colors cursor-pointer ${
                        isSelected ? 'bg-teal-50/80 font-bold' : ''
                      }`}
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-teal-800 text-white flex items-center justify-center font-bold text-xs shrink-0">
                            {patient.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-xs sm:text-sm">{patient.name}</p>
                            <p className="text-slate-400 text-[11px] font-mono">{patient.document || 'Sem CPF'}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-3.5 text-slate-600">
                        <p className="font-mono text-xs">{patient.phone}</p>
                        <p className="text-slate-400 text-[11px]">{patient.email}</p>
                      </td>

                      <td className="px-4 py-3.5 text-center font-mono text-slate-800 font-bold">
                        {patient.totalAppointments}
                      </td>

                      <td className="px-4 py-3.5 text-center">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          patient.noShowCount > 0 ? 'bg-rose-100 text-rose-800' : 'bg-slate-100 text-slate-500'
                        }`}>
                          {patient.noShowCount}
                        </span>
                      </td>

                      <td className="px-4 py-3.5 text-slate-500 font-mono text-[11px]">
                        {patient.lastVisit ? formatDate(patient.lastVisit, i18n.language) : '-'}
                      </td>

                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPatientId(patient.id);
                          }}
                          className="px-2.5 py-1 text-[11px] font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-lg border border-teal-200 transition-colors cursor-pointer"
                        >
                          {t('patients.viewDetails')}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Details Sheet / Drawer for Selected Patient */}
        {selectedPatient && (
          <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-md p-6 space-y-6 sticky top-20 animate-in fade-in duration-200">
            
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-teal-800 text-white flex items-center justify-center font-bold text-base shadow-xs">
                  {selectedPatient.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 leading-tight">
                    {selectedPatient.name}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    Cadastrado em {formatDate(selectedPatient.createdAt, i18n.language)}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedPatientId(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Demographics / Contact */}
            <div className="space-y-2.5 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                <span className="font-mono">{selectedPatient.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-teal-700 shrink-0" />
                <span>{selectedPatient.email}</span>
              </div>
              {selectedPatient.notes && (
                <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-600">
                  <span className="font-bold text-slate-800">Observações clínicas:</span> {selectedPatient.notes}
                </div>
              )}
            </div>

            {/* Appointment History */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-teal-700" />
                <span>{t('patients.appointmentsHistory')}</span>
              </h4>

              {patientAppointments.length === 0 ? (
                <p className="text-xs text-slate-400">{t('patients.noAppointmentsYet')}</p>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {patientAppointments.map((apt) => (
                    <div
                      key={apt.id}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs flex items-center justify-between"
                    >
                      <div>
                        <p className="font-bold text-slate-800">{apt.serviceName}</p>
                        <p className="text-[11px] text-slate-500">
                          {formatDate(apt.date, i18n.language)} às {apt.time} · {apt.professionalName}
                        </p>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        apt.status === 'confirmed'
                          ? 'bg-emerald-100 text-emerald-800'
                          : apt.status === 'scheduled'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {t(`common.${apt.status}`)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* WhatsApp Conversation Transcript Preview & Action */}
            <div className="pt-2 border-t border-slate-100">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-teal-700" />
                <span>{t('patients.conversationHistory')}</span>
              </h4>

              {patientConversation ? (
                <div className="space-y-3">
                  <div className="p-3 bg-[#EFEAE2] rounded-xl border border-slate-200 text-xs space-y-2 max-h-40 overflow-y-auto">
                    {patientConversation.messages.slice(-3).map((m) => (
                      <div
                        key={m.id}
                        className={`p-2 rounded-lg text-[11px] ${
                          m.sender === 'patient'
                            ? 'bg-white text-slate-800 mr-4'
                            : 'bg-[#E7FFDB] text-slate-800 ml-4'
                        }`}
                      >
                        <p className="leading-snug">{m.text}</p>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      onOpenConversation(patientConversation.id);
                      onNavigateToTab('conversations');
                    }}
                    className="w-full py-2.5 px-4 text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-xl border border-teal-200 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>{t('patients.openChat')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <p className="text-xs text-slate-400">{t('patients.noConversationsYet')}</p>
              )}
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
