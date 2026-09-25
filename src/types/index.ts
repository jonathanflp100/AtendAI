export type UserRole = 'admin' | 'doctor' | 'receptionist';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
  clinicId: string;
}

export type NicheType = 'odontologia' | 'estetica' | 'barbearia' | 'imobiliaria';

export type BotTone = 'formal' | 'casual';

export interface WorkingHour {
  dayOfWeek: number; // 0 = Domingo, 1 = Segunda, etc.
  dayName: string;
  isOpen: boolean;
  openTime: string;
  closeTime: string;
  breakStart?: string;
  breakEnd?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  category?: string;
  durationMinutes: number;
  price: number;
  description?: string;
  active: boolean;
}

export interface Professional {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  color: string;
  active: boolean;
}

export type AppointmentStatus = 'scheduled' | 'confirmed' | 'cancelled' | 'no_show';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  patientAvatar?: string;
  serviceId: string;
  serviceName: string;
  professionalId: string;
  professionalName: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  durationMinutes: number;
  status: AppointmentStatus;
  price: number;
  notes?: string;
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
  document?: string;
  avatar?: string;
  createdAt: string;
  totalAppointments: number;
  noShowCount: number;
  lastVisit?: string;
  notes?: string;
}

export type ChannelType = 'whatsapp' | 'voice_call';

export type AttendantType = 'ai' | 'human';

export interface ChatMessage {
  id: string;
  conversationId: string;
  sender: 'patient' | 'system' | 'ai' | 'human';
  text: string;
  timestamp: string; // ISO string
  status?: 'sent' | 'delivered' | 'read';
}

export interface Conversation {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  patientAvatar?: string;
  channel: ChannelType;
  attendant: AttendantType;
  unreadCount: number;
  lastMessage: string;
  lastMessageTimestamp: string;
  messages: ChatMessage[];
}

export interface WeeklyNoShowData {
  weekLabel: string;
  scheduled: number;
  noShows: number;
  confirmed: number;
  rate: number; // %
}

export interface DashboardStats {
  conversationsToday: number;
  scheduledToday: number;
  confirmedToday: number;
  noShowsThisWeek: number;
  noShowReductionRate: number; // e.g. 78%
  weeklyNoShows: WeeklyNoShowData[];
}

export interface WhatsAppConnectionState {
  status: 'connected' | 'disconnected' | 'connecting';
  phoneNumber?: string;
  qrCode?: string;
  lastSync?: string;
  deviceName?: string;
}

export interface ClinicSettings {
  id: string;
  name: string;
  niche: NicheType;
  phone: string;
  email: string;
  address: string;
  botTone: BotTone;
  language: 'pt-BR' | 'en' | 'es';
  whatsapp: WhatsAppConnectionState;
  workingHours: WorkingHour[];
  services: ServiceItem[];
  professionals: Professional[];
  nicheSpecificAnswers?: Record<string, string>;
}

export interface OnboardingData {
  niche: NicheType;
  clinicName: string;
  clinicPhone: string;
  nicheAnswers: Record<string, string>;
  services: Array<{ name: string; duration: number; price: number }>;
  workingHours: WorkingHour[];
  botTone: BotTone;
  whatsappConnected: boolean;
}
