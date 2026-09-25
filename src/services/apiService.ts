import {
  User,
  ClinicSettings,
  Appointment,
  Patient,
  Conversation,
  DashboardStats,
  AppointmentStatus,
  OnboardingData,
  ChatMessage,
  AttendantType,
} from '../types';
import {
  initialCurrentUser,
  initialClinicSettings,
  initialPatients,
  initialAppointments,
  initialConversations,
  initialDashboardStats,
} from './mockData';

// Storage keys for persisting state during demo session
const STORAGE_KEYS = {
  USER: 'atendai_user',
  SETTINGS: 'atendai_settings',
  PATIENTS: 'atendai_patients',
  APPOINTMENTS: 'atendai_appointments',
  CONVERSATIONS: 'atendai_conversations',
  STATS: 'atendai_stats',
  AUTH_TOKEN: 'atendai_auth_token',
};

// Helper to get or initialize from localStorage
function getStoredItem<T>(key: string, defaultVal: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch {
    return defaultVal;
  }
}

function setStoredItem<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error('Error saving to localStorage', e);
  }
}

/**
 * Service Layer for AtendAI Clinic Dashboard.
 * Ready for drop-in replacement with `@supabase/supabase-js` client.
 */
class ApiService {
  private user: User = getStoredItem(STORAGE_KEYS.USER, initialCurrentUser);
  private settings: ClinicSettings = getStoredItem(STORAGE_KEYS.SETTINGS, initialClinicSettings);
  private patients: Patient[] = getStoredItem(STORAGE_KEYS.PATIENTS, initialPatients);
  private appointments: Appointment[] = getStoredItem(STORAGE_KEYS.APPOINTMENTS, initialAppointments);
  private conversations: Conversation[] = getStoredItem(STORAGE_KEYS.CONVERSATIONS, initialConversations);
  private stats: DashboardStats = getStoredItem(STORAGE_KEYS.STATS, initialDashboardStats);

  // --- AUTHENTICATION ---
  async login(email: string, _password: string):Promise<User> {
    await this.delay(400);
    this.user = {
      ...this.user,
      email,
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
    };
    setStoredItem(STORAGE_KEYS.USER, this.user);
    setStoredItem(STORAGE_KEYS.AUTH_TOKEN, 'mock_token_' + Date.now());
    return this.user;
  }

  async logout(): Promise<void> {
    await this.delay(200);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  async getCurrentUser(): Promise<User | null> {
    const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    if (!token) return null;
    return this.user;
  }

  // --- DASHBOARD ---
  async getDashboardStats(): Promise<DashboardStats> {
    await this.delay(200);
    // Recalculate dynamic stats from current appointments
    const todayStr = new Date().toISOString().split('T')[0];
    const scheduledToday = this.appointments.filter((a) => a.date === todayStr).length;
    const confirmedToday = this.appointments.filter((a) => a.date === todayStr && a.status === 'confirmed').length;
    const noShowsThisWeek = this.appointments.filter((a) => a.status === 'no_show').length;

    this.stats = {
      ...this.stats,
      scheduledToday,
      confirmedToday,
      noShowsThisWeek,
    };
    setStoredItem(STORAGE_KEYS.STATS, this.stats);
    return this.stats;
  }

  // --- CONVERSATIONS ---
  async getConversations(): Promise<Conversation[]> {
    await this.delay(200);
    return [...this.conversations];
  }

  async getConversation(id: string): Promise<Conversation | undefined> {
    await this.delay(100);
    return this.conversations.find((c) => c.id === id);
  }

  async toggleAttendant(conversationId: string): Promise<Conversation> {
    await this.delay(300);
    const convIndex = this.conversations.findIndex((c) => c.id === conversationId);
    if (convIndex === -1) throw new Error('Conversation not found');

    const conv = this.conversations[convIndex];
    const newAttendant: AttendantType = conv.attendant === 'ai' ? 'human' : 'ai';
    
    // Add system notification message
    const sysMsg: ChatMessage = {
      id: `sys_${Date.now()}`,
      conversationId,
      sender: 'system',
      text: newAttendant === 'human' 
        ? 'Atendimento assumido por operador humano.' 
        : 'Conversa devolvida para o atendente de Inteligência Artificial.',
      timestamp: new Date().toISOString(),
    };

    const updatedConv: Conversation = {
      ...conv,
      attendant: newAttendant,
      messages: [...conv.messages, sysMsg],
      lastMessage: sysMsg.text,
      lastMessageTimestamp: sysMsg.timestamp,
    };

    this.conversations[convIndex] = updatedConv;
    setStoredItem(STORAGE_KEYS.CONVERSATIONS, this.conversations);
    return updatedConv;
  }

  async sendMessage(conversationId: string, text: string, sender: 'human' | 'patient'): Promise<ChatMessage> {
    await this.delay(250);
    const convIndex = this.conversations.findIndex((c) => c.id === conversationId);
    if (convIndex === -1) throw new Error('Conversation not found');

    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      conversationId,
      sender,
      text,
      timestamp: new Date().toISOString(),
      status: 'sent',
    };

    const conv = this.conversations[convIndex];
    conv.messages.push(newMsg);
    conv.lastMessage = text;
    conv.lastMessageTimestamp = newMsg.timestamp;

    this.conversations[convIndex] = { ...conv };
    setStoredItem(STORAGE_KEYS.CONVERSATIONS, this.conversations);
    return newMsg;
  }

  // --- APPOINTMENTS ---
  async getAppointments(filters?: { professionalId?: string; date?: string }): Promise<Appointment[]> {
    await this.delay(200);
    let list = [...this.appointments];

    if (filters?.professionalId && filters.professionalId !== 'all') {
      list = list.filter((a) => a.professionalId === filters.professionalId);
    }
    if (filters?.date) {
      list = list.filter((a) => a.date === filters.date);
    }

    return list.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  }

  async updateAppointmentStatus(id: string, status: AppointmentStatus): Promise<Appointment> {
    await this.delay(250);
    const index = this.appointments.findIndex((a) => a.id === id);
    if (index === -1) throw new Error('Appointment not found');

    const updated = { ...this.appointments[index], status };
    this.appointments[index] = updated;
    setStoredItem(STORAGE_KEYS.APPOINTMENTS, this.appointments);
    return updated;
  }

  async createAppointment(data: Omit<Appointment, 'id'>): Promise<Appointment> {
    await this.delay(300);
    const newApt: Appointment = {
      ...data,
      id: `apt_${Date.now()}`,
    };
    this.appointments.push(newApt);
    setStoredItem(STORAGE_KEYS.APPOINTMENTS, this.appointments);
    return newApt;
  }

  // --- PATIENTS ---
  async getPatients(searchQuery?: string): Promise<Patient[]> {
    await this.delay(200);
    if (!searchQuery) return [...this.patients];

    const q = searchQuery.toLowerCase();
    return this.patients.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.phone.includes(q) ||
        p.email.toLowerCase().includes(q) ||
        (p.document && p.document.includes(q))
    );
  }

  async getPatientDetails(id: string): Promise<{
    patient: Patient;
    appointments: Appointment[];
    conversation?: Conversation;
  }> {
    await this.delay(250);
    const patient = this.patients.find((p) => p.id === id);
    if (!patient) throw new Error('Patient not found');

    const patientAppointments = this.appointments.filter((a) => a.patientId === id);
    const conversation = this.conversations.find((c) => c.patientId === id);

    return {
      patient,
      appointments: patientAppointments,
      conversation,
    };
  }

  // --- SETTINGS ---
  async getSettings(): Promise<ClinicSettings> {
    await this.delay(200);
    return { ...this.settings };
  }

  async updateSettings(partial: Partial<ClinicSettings>): Promise<ClinicSettings> {
    await this.delay(300);
    this.settings = { ...this.settings, ...partial };
    setStoredItem(STORAGE_KEYS.SETTINGS, this.settings);
    return this.settings;
  }

  async toggleWhatsAppConnection(): Promise<ClinicSettings> {
    await this.delay(500);
    const newStatus = this.settings.whatsapp.status === 'connected' ? 'disconnected' : 'connected';
    this.settings.whatsapp = {
      ...this.settings.whatsapp,
      status: newStatus,
      lastSync: newStatus === 'connected' ? new Date().toISOString() : undefined,
    };
    setStoredItem(STORAGE_KEYS.SETTINGS, this.settings);
    return { ...this.settings };
  }

  // --- ONBOARDING WIZARD ---
  async completeOnboarding(data: OnboardingData): Promise<ClinicSettings> {
    await this.delay(600);
    this.settings = {
      ...this.settings,
      name: data.clinicName,
      niche: data.niche,
      phone: data.clinicPhone,
      botTone: data.botTone,
      workingHours: data.workingHours,
      services: data.services.map((s, idx) => ({
        id: `srv_onb_${idx}`,
        name: s.name,
        durationMinutes: s.duration,
        price: s.price,
        active: true,
      })),
      whatsapp: {
        status: data.whatsappConnected ? 'connected' : 'disconnected',
        phoneNumber: data.clinicPhone,
        deviceName: 'WhatsApp Business (Conectado via Setup)',
        lastSync: new Date().toISOString(),
      },
      nicheSpecificAnswers: data.nicheAnswers,
    };

    setStoredItem(STORAGE_KEYS.SETTINGS, this.settings);
    return this.settings;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export const apiService = new ApiService();
