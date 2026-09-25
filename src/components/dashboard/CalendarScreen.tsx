import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Filter,
  Plus,
  Clock,
  User,
  CheckCircle2,
  XCircle,
  AlertCircle,
  HelpCircle,
  X
} from 'lucide-react';
import { Appointment, Professional, AppointmentStatus, ServiceItem } from '../../types';
import { formatCurrency, formatDate, formatTime } from '../../services/formatters';

interface CalendarScreenProps {
  appointments: Appointment[];
  professionals: Professional[];
  services: ServiceItem[];
  onUpdateStatus: (id: string, status: AppointmentStatus) => Promise<void>;
  onCreateAppointment: (data: Omit<Appointment, 'id'>) => Promise<void>;
}

export const CalendarScreen: React.FC<CalendarScreenProps> = ({
  appointments,
  professionals,
  services,
  onUpdateStatus,
  onCreateAppointment,
}) => {
  const { t, i18n } = useTranslation();
  const [viewMode, setViewMode] = useState<'week' | 'day'>('week');
  const [selectedProfessional, setSelectedProfessional] = useState<string>('all');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New appointment form state
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientPhone, setNewPatientPhone] = useState('');
  const [newServiceId, setNewServiceId] = useState(services[0]?.id || '');
  const [newProfessionalId, setNewProfessionalId] = useState(professionals[0]?.id || '');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newTime, setNewTime] = useState('10:00');

  // Navigate dates
  const handlePrev = () => {
    const d = new Date(currentDate);
    if (viewMode === 'day') {
      d.setDate(d.getDate() - 1);
    } else {
      d.setDate(d.getDate() - 7);
    }
    setCurrentDate(d);
  };

  const handleNext = () => {
    const d = new Date(currentDate);
    if (viewMode === 'day') {
      d.setDate(d.getDate() + 1);
    } else {
      d.setDate(d.getDate() + 7);
    }
    setCurrentDate(d);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  // Helper for generating week days around currentDate
  const getDaysOfWeek = (baseDate: Date): Date[] => {
    const d = new Date(baseDate);
    const day = d.getDay(); // 0 is Sunday
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust to start on Monday
    const monday = new Date(d.setDate(diff));

    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const nextDay = new Date(monday);
      nextDay.setDate(monday.getDate() + i);
      week.push(nextDay);
    }
    return week;
  };

  const weekDays = getDaysOfWeek(currentDate);

  // Filter appointments
  const filteredAppointments = appointments.filter((apt) => {
    if (selectedProfessional !== 'all' && apt.professionalId !== selectedProfessional) {
      return false;
    }
    return true;
  });

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'confirmed':
        return {
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          dot: 'bg-emerald-500',
          label: t('common.confirmed'),
        };
      case 'scheduled':
        return {
          bg: 'bg-blue-50 text-blue-800 border-blue-200',
          dot: 'bg-blue-500',
          label: t('common.scheduled'),
        };
      case 'cancelled':
        return {
          bg: 'bg-slate-100 text-slate-600 border-slate-200',
          dot: 'bg-slate-400',
          label: t('common.cancelled'),
        };
      case 'no_show':
        return {
          bg: 'bg-rose-50 text-rose-800 border-rose-200',
          dot: 'bg-rose-500',
          label: t('common.no_show'),
        };
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatientName || !newPatientPhone) return;

    const srv = services.find((s) => s.id === newServiceId) || services[0];
    const prof = professionals.find((p) => p.id === newProfessionalId) || professionals[0];

    await onCreateAppointment({
      patientId: `pat_${Date.now()}`,
      patientName: newPatientName,
      patientPhone: newPatientPhone,
      serviceId: srv?.id || 'srv_1',
      serviceName: srv?.name || 'Consulta',
      professionalId: prof?.id || 'prof_1',
      professionalName: prof?.name || 'Profissional',
      date: newDate,
      time: newTime,
      durationMinutes: srv?.durationMinutes || 45,
      status: 'scheduled',
      price: srv?.price || 150,
    });

    setIsModalOpen(false);
    setNewPatientName('');
    setNewPatientPhone('');
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Top Header: Title + View Switcher + New Appointment */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {t('calendar.title')}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {t('calendar.subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* View mode toggle */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center text-xs font-semibold">
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'week' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600'
              }`}
            >
              {t('common.viewWeek')}
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                viewMode === 'day' ? 'bg-white text-teal-800 shadow-xs' : 'text-slate-600'
              }`}
            >
              {t('common.viewDay')}
            </button>
          </div>

          {/* New Appointment button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{t('calendar.newAppointment')}</span>
          </button>
        </div>
      </div>

      {/* Control bar: Professional Filter + Date navigation */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        
        {/* Date Navigator */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleToday}
            className="px-2.5 py-1 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            {t('common.today')}
          </button>

          <button
            onClick={handleNext}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <span className="text-xs sm:text-sm font-bold text-slate-800 ml-2">
            {formatDate(currentDate, i18n.language, { month: 'long', year: 'numeric' })}
          </span>
        </div>

        {/* Filter by Professional */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedProfessional}
            onChange={(e) => setSelectedProfessional(e.target.value)}
            className="text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-teal-600"
          >
            <option value="all">{t('common.allProfessionals')}</option>
            {professionals.map((prof) => (
              <option key={prof.id} value={prof.id}>
                {prof.name} ({prof.role})
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* ================= CALENDAR VIEWS ================= */}
      {viewMode === 'week' ? (
        /* WEEK VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
          {weekDays.map((dayDate, idx) => {
            const dateStr = dayDate.toISOString().split('T')[0];
            const isToday = dateStr === new Date().toISOString().split('T')[0];
            const dayAppointments = filteredAppointments.filter((a) => a.date === dateStr);

            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl border flex flex-col min-h-[360px] p-3 transition-colors ${
                  isToday ? 'border-teal-400 ring-2 ring-teal-50 shadow-xs' : 'border-slate-200/90'
                }`}
              >
                {/* Day Header */}
                <div className="text-center pb-2.5 mb-2 border-b border-slate-100">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {formatDate(dayDate, i18n.language, { weekday: 'short' })}
                  </p>
                  <p className={`text-base font-extrabold font-mono mt-0.5 ${isToday ? 'text-teal-700' : 'text-slate-800'}`}>
                    {dayDate.getDate()}
                  </p>
                </div>

                {/* Day Appointments List */}
                <div className="space-y-2 flex-1 overflow-y-auto">
                  {dayAppointments.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-[11px] text-slate-300">
                      -
                    </div>
                  ) : (
                    dayAppointments.map((apt) => {
                      const badge = getStatusBadge(apt.status);
                      return (
                        <div
                          key={apt.id}
                          className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-teal-300 transition-all text-xs space-y-1.5 shadow-2xs group"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 font-mono text-[11px]">
                              {apt.time}
                            </span>
                            <span className={`inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.2 rounded border ${badge.bg}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                              <span>{badge.label}</span>
                            </span>
                          </div>

                          <div>
                            <p className="font-semibold text-slate-800 truncate" title={apt.patientName}>
                              {apt.patientName}
                            </p>
                            <p className="text-[10px] text-slate-500 truncate" title={apt.serviceName}>
                              {apt.serviceName}
                            </p>
                          </div>

                          {/* Quick status actions on hover/menu */}
                          <div className="pt-1.5 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500">
                            <span className="font-mono">{formatCurrency(apt.price, i18n.language)}</span>
                            
                            <select
                              value={apt.status}
                              onChange={(e) => onUpdateStatus(apt.id, e.target.value as AppointmentStatus)}
                              className="text-[10px] font-medium bg-white border border-slate-200 rounded px-1 py-0.5 cursor-pointer"
                            >
                              <option value="scheduled">{t('common.scheduled')}</option>
                              <option value="confirmed">{t('common.confirmed')}</option>
                              <option value="cancelled">{t('common.cancelled')}</option>
                              <option value="no_show">{t('common.no_show')}</option>
                            </select>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* DAY VIEW */
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {formatDate(currentDate, i18n.language, { weekday: 'long', day: 'numeric', month: 'long' })}
              </h3>
              <p className="text-xs text-slate-500">
                Total de {filteredAppointments.filter((a) => a.date === currentDate.toISOString().split('T')[0]).length} consultas
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {filteredAppointments
              .filter((a) => a.date === currentDate.toISOString().split('T')[0])
              .map((apt) => {
                const badge = getStatusBadge(apt.status);
                return (
                  <div
                    key={apt.id}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-teal-800 text-white font-mono font-bold flex flex-col items-center justify-center shrink-0">
                        <span className="text-sm">{apt.time}</span>
                        <span className="text-[10px] opacity-75">{apt.durationMinutes}m</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-sm text-slate-900">{apt.patientName}</h4>
                          <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${badge.bg}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`} />
                            <span>{badge.label}</span>
                          </span>
                        </div>
                        <p className="text-slate-600 font-medium">{apt.serviceName} · {apt.professionalName}</p>
                        <p className="text-slate-400 text-[11px] mt-0.5">{apt.patientPhone}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <span className="font-bold text-slate-900 text-sm font-mono">
                        {formatCurrency(apt.price, i18n.language)}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onUpdateStatus(apt.id, 'confirmed')}
                          className="px-2.5 py-1 text-xs font-semibold bg-emerald-100 hover:bg-emerald-200 text-emerald-800 rounded-lg transition-colors cursor-pointer"
                        >
                          Confirmar
                        </button>
                        <button
                          onClick={() => onUpdateStatus(apt.id, 'no_show')}
                          className="px-2.5 py-1 text-xs font-semibold bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-lg transition-colors cursor-pointer"
                        >
                          Faltou
                        </button>
                        <button
                          onClick={() => onUpdateStatus(apt.id, 'cancelled')}
                          className="px-2.5 py-1 text-xs font-semibold bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg transition-colors cursor-pointer"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* ================= NEW APPOINTMENT MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200">
            <div className="bg-teal-800 text-white p-5 flex items-center justify-between">
              <h3 className="font-bold text-lg">{t('calendar.newAppointment')}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nome do Paciente *
                </label>
                <input
                  type="text"
                  required
                  value={newPatientName}
                  onChange={(e) => setNewPatientName(e.target.value)}
                  placeholder="Ex: Ana Beatriz Silva"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  WhatsApp do Paciente *
                </label>
                <input
                  type="tel"
                  required
                  value={newPatientPhone}
                  onChange={(e) => setNewPatientPhone(e.target.value)}
                  placeholder="+55 11 99999-9999"
                  className="w-full px-3.5 py-2 text-xs sm:text-sm border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Procedimento
                  </label>
                  <select
                    value={newServiceId}
                    onChange={(e) => setNewServiceId(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-600 bg-white"
                  >
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Profissional
                  </label>
                  <select
                    value={newProfessionalId}
                    onChange={(e) => setNewProfessionalId(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-600 bg-white"
                  >
                    {professionals.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Data
                  </label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Horário
                  </label>
                  <input
                    type="time"
                    required
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-600"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  {t('common.cancel')}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-xl shadow-xs cursor-pointer"
                >
                  {t('common.save')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
