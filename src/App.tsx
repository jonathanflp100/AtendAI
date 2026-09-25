/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { apiService } from './services/apiService';
import {
  User,
  ClinicSettings,
  Appointment,
  Patient,
  Conversation,
  DashboardStats,
  AppointmentStatus,
} from './types';
import { SidebarNav, DashboardTab } from './components/dashboard/SidebarNav';
import { LoginScreen } from './components/dashboard/LoginScreen';
import { DashboardOverview } from './components/dashboard/DashboardOverview';
import { ConversationsScreen } from './components/dashboard/ConversationsScreen';
import { CalendarScreen } from './components/dashboard/CalendarScreen';
import { PatientsScreen } from './components/dashboard/PatientsScreen';
import { SettingsScreen } from './components/dashboard/SettingsScreen';
import { OnboardingWizard } from './components/dashboard/OnboardingWizard';
import { MessageCircle, Globe, LogOut } from 'lucide-react';

export default function App() {
  const { t, i18n } = useTranslation();

  // Authentication State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [isOnboardingMode, setIsOnboardingMode] = useState(false);

  // Active Screen / Tab
  const [currentTab, setCurrentTab] = useState<DashboardTab>('dashboard');

  // Application Data States
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [settings, setSettings] = useState<ClinicSettings | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

  // Initialize data on mount
  useEffect(() => {
    const initApp = async () => {
      try {
        const user = await apiService.getCurrentUser();
        // Default to demo logged-in user so the user can immediately experience the dashboard
        if (!user) {
          const demoUser = await apiService.login('camila@clinicalumina.com.br', 'demo');
          setCurrentUser(demoUser);
        } else {
          setCurrentUser(user);
        }

        await refreshAllData();
      } catch (err) {
        console.error('Failed to initialize app data', err);
      } finally {
        setIsAuthChecking(false);
      }
    };

    initApp();
  }, []);

  const refreshAllData = async () => {
    const [fetchedStats, fetchedSettings, fetchedAppointments, fetchedPatients, fetchedConversations] =
      await Promise.all([
        apiService.getDashboardStats(),
        apiService.getSettings(),
        apiService.getAppointments(),
        apiService.getPatients(),
        apiService.getConversations(),
      ]);

    setStats(fetchedStats);
    setSettings(fetchedSettings);
    setAppointments(fetchedAppointments);
    setPatients(fetchedPatients);
    setConversations(fetchedConversations);

    if (fetchedConversations.length > 0 && !selectedConversationId) {
      setSelectedConversationId(fetchedConversations[0].id);
    }
  };

  // Handlers
  const handleLoginSuccess = async (user: User) => {
    setCurrentUser(user);
    setIsOnboardingMode(false);
    await refreshAllData();
    setCurrentTab('dashboard');
  };

  const handleLogout = async () => {
    await apiService.logout();
    setCurrentUser(null);
  };

  const handleToggleAttendant = async (convId: string) => {
    const updated = await apiService.toggleAttendant(convId);
    setConversations((prev) =>
      prev.map((c) => (c.id === convId ? updated : c))
    );
  };

  const handleSendMessage = async (convId: string, text: string) => {
    await apiService.sendMessage(convId, text, 'human');
    const updatedConversations = await apiService.getConversations();
    setConversations(updatedConversations);
  };

  const handleUpdateAppointmentStatus = async (id: string, status: AppointmentStatus) => {
    await apiService.updateAppointmentStatus(id, status);
    const updatedAppointments = await apiService.getAppointments();
    setAppointments(updatedAppointments);
    const updatedStats = await apiService.getDashboardStats();
    setStats(updatedStats);
  };

  const handleCreateAppointment = async (data: Omit<Appointment, 'id'>) => {
    await apiService.createAppointment(data);
    const updatedAppointments = await apiService.getAppointments();
    setAppointments(updatedAppointments);
    const updatedStats = await apiService.getDashboardStats();
    setStats(updatedStats);
  };

  const handleUpdateSettings = async (partial: Partial<ClinicSettings>) => {
    const updated = await apiService.updateSettings(partial);
    setSettings(updated);
  };

  const handleToggleWhatsApp = async () => {
    const updated = await apiService.toggleWhatsAppConnection();
    setSettings(updated);
  };

  const handleOnboardingComplete = async () => {
    setIsOnboardingMode(false);
    await refreshAllData();
    setCurrentTab('dashboard');
  };

  // Loading state
  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-slate-500 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 border-2 border-teal-700 border-t-transparent rounded-full animate-spin" />
          <span>{t('common.loading')}</span>
        </div>
      </div>
    );
  }

  // Not logged in or Onboarding Mode
  if (!currentUser) {
    if (isOnboardingMode) {
      return (
        <div className="min-h-screen bg-[#F8FAFC]">
          <OnboardingWizard
            onComplete={handleOnboardingComplete}
            onCancel={() => setIsOnboardingMode(false)}
          />
        </div>
      );
    }
    return (
      <LoginScreen
        onLoginSuccess={handleLoginSuccess}
        onGoToOnboarding={() => setIsOnboardingMode(true)}
      />
    );
  }

  // Logged-in Dashboard Layout
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col md:flex-row antialiased selection:bg-teal-600 selection:text-white">
      
      {/* Sidebar for Desktop & Bottom Bar for Mobile */}
      <SidebarNav
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          if (tab !== 'onboarding') setIsOnboardingMode(false);
        }}
        user={currentUser}
        settings={settings}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Mobile Top Header (compact) */}
        <header className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center font-bold text-xs">
              AI
            </div>
            <div>
              <span className="font-extrabold text-sm text-slate-900 leading-tight">AtendAI</span>
              <p className="text-[10px] text-slate-400 leading-none truncate max-w-[150px]">
                {settings?.name || 'Clínica Lumina'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick language toggle */}
            <button
              onClick={() => {
                const nextLang = i18n.language === 'pt-BR' ? 'en' : i18n.language.startsWith('en') ? 'es' : 'pt-BR';
                i18n.changeLanguage(nextLang);
                localStorage.setItem('atendai_lang', nextLang);
              }}
              className="text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded-md"
            >
              {i18n.language.slice(0, 2).toUpperCase()}
            </button>

            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Dynamic View Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {currentTab === 'dashboard' && stats && (
            <DashboardOverview
              stats={stats}
              appointments={appointments}
              conversations={conversations}
              onNavigateToTab={(tab) => setCurrentTab(tab)}
              onOpenConversation={(convId) => {
                setSelectedConversationId(convId);
                setCurrentTab('conversations');
              }}
            />
          )}

          {currentTab === 'conversations' && (
            <ConversationsScreen
              conversations={conversations}
              selectedConversationId={selectedConversationId}
              onSelectConversation={(id) => setSelectedConversationId(id)}
              onToggleAttendant={handleToggleAttendant}
              onSendMessage={handleSendMessage}
            />
          )}

          {currentTab === 'calendar' && (
            <CalendarScreen
              appointments={appointments}
              professionals={settings?.professionals || []}
              services={settings?.services || []}
              onUpdateStatus={handleUpdateAppointmentStatus}
              onCreateAppointment={handleCreateAppointment}
            />
          )}

          {currentTab === 'patients' && (
            <PatientsScreen
              patients={patients}
              appointments={appointments}
              conversations={conversations}
              onOpenConversation={(convId) => {
                setSelectedConversationId(convId);
                setCurrentTab('conversations');
              }}
              onNavigateToTab={(tab) => setCurrentTab(tab)}
            />
          )}

          {currentTab === 'settings' && settings && (
            <SettingsScreen
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
              onToggleWhatsApp={handleToggleWhatsApp}
            />
          )}

          {currentTab === 'onboarding' && (
            <OnboardingWizard
              onComplete={handleOnboardingComplete}
              onCancel={() => setCurrentTab('dashboard')}
            />
          )}
        </main>

      </div>

    </div>
  );
}
