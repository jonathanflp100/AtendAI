import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Send, 
  Phone, 
  Video, 
  MoreVertical, 
  CheckCheck, 
  Calendar, 
  Clock, 
  Sparkles,
  User,
  ShieldCheck,
  CheckCircle2,
  CalendarCheck
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'patient' | 'ai';
  text: string;
  time: string;
  buttons?: string[];
  card?: {
    procedure: string;
    doctor: string;
    date: string;
    time: string;
  };
}

export const Simulation: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeScenario, setActiveScenario] = useState<'dental' | 'aesthetic' | 'reminder'>('dental');
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState<number>(1);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Scenario scripts based on active language
  const getScenarioScripts = () => {
    const isEn = i18n.language.startsWith('en');
    const isEs = i18n.language.startsWith('es');

    if (activeScenario === 'dental') {
      return [
        {
          sender: 'patient' as const,
          text: isEn 
            ? "Hi! I'd like to know how much dental whitening costs and if you have appointments this week?"
            : isEs
            ? "¡Hola! Quisiera saber el valor del blanqueamiento dental y si tienen citas para esta semana."
            : "Olá! Gostaria de saber os valores do clareamento dental e se tem horário para esta semana?",
          time: '14:20'
        },
        {
          sender: 'ai' as const,
          text: isEn
            ? "Hello! Great to hear from you. 😊 We offer both in-office laser whitening and monitored take-home trays. An initial assessment with Dr. Lucas is required to determine the best option for your enamel."
            : isEs
            ? "¡Hola! Qué gusto saludarte. 😊 Realizamos blanqueamiento láser en clínica y ambulatorio con férulas. La evaluación inicial con el Dr. Lucas permite definir la técnica ideal para su esmalte."
            : "Olá! Que prazer falar com você. 😊 Aqui na clínica realizamos tanto o clareamento a laser em consultório quanto o caseiro supervisionado. Nossa avaliação inicial com o Dr. Lucas avalia a sensibilidade e o tom ideal.",
          time: '14:20'
        },
        {
          sender: 'ai' as const,
          text: isEn
            ? "We have two open slots for your assessment this week with Dr. Lucas:"
            : isEs
            ? "Tenemos dos cupos disponibles para su valoración esta semana con el Dr. Lucas:"
            : "Temos dois horários perfeitos com o Dr. Lucas esta semana:",
          time: '14:21',
          buttons: isEn 
            ? ["Thursday at 15:00", "Friday at 10:30"] 
            : isEs 
            ? ["Jueves 15:00", "Viernes 10:30"]
            : ["Quinta às 15:00", "Sexta às 10:30"]
        },
        {
          sender: 'patient' as const,
          text: isEn ? "Thursday at 15:00 works best for me!" : isEs ? "¡El jueves a las 15:00 me queda perfecto!" : "Quinta às 15:00 fica ótimo pra mim!",
          time: '14:22'
        },
        {
          sender: 'ai' as const,
          text: isEn
            ? "Perfect! What is your full name to log the booking?"
            : isEs
            ? "¡Excelente! ¿Cuál es su nombre completo para registrar la reserva?"
            : "Perfeito! Qual é o seu nome completo para registrarmos na agenda?",
          time: '14:22'
        },
        {
          sender: 'patient' as const,
          text: isEn ? "Mariana Silva Ribeiro" : isEs ? "Mariana Silva Ribeiro" : "Mariana Silva Ribeiro",
          time: '14:23'
        },
        {
          sender: 'ai' as const,
          text: isEn
            ? "Awesome, Mariana! Your appointment is officially scheduled in our system. You'll receive a reminder 24 hours prior to confirm."
            : isEs
            ? "¡Listo, Mariana! Su cita quedó confirmada en nuestro sistema. Le enviaremos un recordatorio 24 horas antes para confirmar."
            : "Excelente, Mariana! Sua consulta já está cadastrada na agenda do Dr. Lucas. Um dia antes enviaremos o lembrete de confirmação por aqui.",
          time: '14:23',
          card: {
            procedure: isEn ? "Dental Whitening Assessment" : isEs ? "Valoración de Blanqueamiento Dental" : "Avaliação Clareamento Dental",
            doctor: "Dr. Lucas Mendes",
            date: isEn ? "Thursday, Oct 1st" : isEs ? "Jueves, 1 de Octubre" : "Quinta-feira, 01/10",
            time: "15:00"
          }
        }
      ];
    } else if (activeScenario === 'aesthetic') {
      return [
        {
          sender: 'patient' as const,
          text: isEn
            ? "Good evening! How long does Botox take to show effect and how do I schedule with Dr. Camila?"
            : isEs
            ? "¡Buenas noches! ¿Cuánto tarda en hacer efecto el Botox y cómo agendo con la Dra. Camila?"
            : "Boa noite! Quanto tempo demora para o Botox fazer efeito e como faço para agendar com a Dra. Camila?",
          time: '21:15'
        },
        {
          sender: 'ai' as const,
          text: isEn
            ? "Good evening! Botox starts acting within 48 to 72 hours, reaching its full natural effect between day 14 and 15. ✨"
            : isEs
            ? "¡Buenas noches! El Botox comienza a notarse entre las 48 y 72 horas, alcanzando el resultado pleno y natural hacia el día 14. ✨"
            : "Boa noite! O efeito do Botox começa a aparecer entre 48h e 72h, atingindo o resultado pleno e natural em até 14 dias. ✨",
          time: '21:15'
        },
        {
          sender: 'ai' as const,
          text: isEn
            ? "Dr. Camila has openings this Friday at 16:30 or Saturday morning at 11:00. Would either suit you?"
            : isEs
            ? "La Dra. Camila tiene cupos este viernes a las 16:30 o el sábado a las 11:00. ¿Le acomoda alguno?"
            : "A Dra. Camila tem horário nesta sexta-feira às 16:30 ou no sábado pela manhã às 11:00. Qual prefere?",
          time: '21:16',
          buttons: isEn 
            ? ["Friday 16:30", "Saturday 11:00"] 
            : isEs 
            ? ["Viernes 16:30", "Sábado 11:00"]
            : ["Sexta às 16:30", "Sábado às 11:00"]
        },
        {
          sender: 'patient' as const,
          text: isEn ? "Saturday at 11:00 is wonderful!" : isEs ? "¡Sábado a las 11:00 me va genial!" : "Sábado às 11:00 fica maravilhoso!",
          time: '21:17'
        },
        {
          sender: 'ai' as const,
          text: isEn
            ? "Reserved! We have saved Saturday at 11:00 for your facial evaluation. Remember to avoid anti-inflammatories 24h before."
            : isEs
            ? "¡Apartado! Guardamos el sábado a las 11:00 para su valoración facial. Recuerde evitar antiinflamatorios 24h antes."
            : "Perfeito! Horário reservado para sábado às 11:00. Orientamos evitar anti-inflamatórios nas 24h que antecedem o procedimento.",
          time: '21:17',
          card: {
            procedure: isEn ? "Facial Aesthetics & Botox" : isEs ? "Armonización Facial & Botox" : "Avaliação Botox & Harmonização",
            doctor: "Dra. Camila Santos",
            date: isEn ? "Saturday, Oct 3rd" : isEs ? "Sábado, 3 de Octubre" : "Sábado, 03/10",
            time: "11:00"
          }
        }
      ];
    } else {
      // Reminder scenario
      return [
        {
          sender: 'ai' as const,
          text: isEn
            ? "Hello Juliana! 🌸 Just a friendly reminder from Lumina Clinic: you have an appointment tomorrow, Wednesday at 14:00 with Dr. Marcelo Ramos."
            : isEs
            ? "¡Hola Juliana! 🌸 Le recordamos desde Clínica Lumina que tiene cita mañana miércoles a las 14:00 con el Dr. Marcelo Ramos."
            : "Olá, Juliana! 🌸 Passando para lembrar que você tem consulta agendada amanhã, quarta-feira às 14:00 com o Dr. Marcelo Ramos aqui na Lumina Clinic.",
          time: '09:00'
        },
        {
          sender: 'ai' as const,
          text: isEn
            ? "Please confirm by tapping below so we can keep the doctor's room prepared for you:"
            : isEs
            ? "Por favor confirme presionando un botón para dejar todo listo:"
            : "Por gentileza, confirme sua presença clicando abaixo:",
          time: '09:00',
          buttons: isEn 
            ? ["Yes, I confirm my attendance", "Need to reschedule"]
            : isEs 
            ? ["Sí, confirmo mi asistencia", "Necesito reagendar"]
            : ["Sim, confirmo presença", "Preciso reagendar"]
        },
        {
          sender: 'patient' as const,
          text: isEn ? "Yes, I confirm my attendance! See you tomorrow." : isEs ? "¡Sí, confirmo mi asistencia! Nos vemos mañana." : "Sim, confirmo presença! Estarei aí pontualmente.",
          time: '09:04'
        },
        {
          sender: 'ai' as const,
          text: isEn
            ? "Thank you so much, Juliana! Your confirmation is registered. We have free parking in front of the clinic. See you tomorrow at 14:00! 😊"
            : isEs
            ? "¡Muchas gracias, Juliana! Presencia confirmada. Contamos con estacionamiento en la entrada. ¡Nos vemos mañana a las 14:00! 😊"
            : "Muito obrigado, Juliana! Presença confirmada no sistema. Lembramos que temos estacionamento gratuito na entrada. Até amanhã às 14:00! 😊",
          time: '09:05',
          card: {
            procedure: isEn ? "Checkup & Prevention" : isEs ? "Control y Prevención" : "Revisão & Prevenção",
            doctor: "Dr. Marcelo Ramos",
            date: isEn ? "Wednesday, Tomorrow" : isEs ? "Miércoles, Mañana" : "Quarta-feira, Amanhã",
            time: "14:00"
          }
        }
      ];
    }
  };

  const script = getScenarioScripts();

  // Reset conversation when scenario or language changes
  useEffect(() => {
    setCurrentStep(0);
    setMessages([]);
    setIsPlaying(true);
    setIsTyping(false);
  }, [activeScenario, i18n.language]);

  // Automated playback runner
  useEffect(() => {
    if (!isPlaying) return;

    if (currentStep < script.length) {
      const nextMsg = script[currentStep];
      const isAi = nextMsg.sender === 'ai';

      // Simulate typing delay
      const typingDelay = (isAi ? 1100 : 700) / speed;
      const stepDelay = (isAi ? 1800 : 1200) / speed;

      const timerTyping = setTimeout(() => {
        if (isAi) setIsTyping(true);
      }, 300 / speed);

      const timerAdd = setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now()}-${currentStep}`,
            ...nextMsg
          }
        ]);
        setCurrentStep((prev) => prev + 1);
      }, typingDelay + stepDelay);

      return () => {
        clearTimeout(timerTyping);
        clearTimeout(timerAdd);
      };
    } else {
      setIsPlaying(false);
    }
  }, [isPlaying, currentStep, script, speed]);

  // Auto scroll chat to bottom
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleRestart = () => {
    setMessages([]);
    setCurrentStep(0);
    setIsPlaying(true);
    setIsTyping(false);
  };

  const handleButtonClick = (btnText: string) => {
    // Add user message from button
    const userMsg: ChatMessage = {
      id: `custom-user-${Date.now()}`,
      sender: 'patient',
      text: btnText,
      time: 'Agora'
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const isEn = i18n.language.startsWith('en');
      const isEs = i18n.language.startsWith('es');

      const aiReply: ChatMessage = {
        id: `custom-ai-${Date.now()}`,
        sender: 'ai',
        text: isEn 
          ? `Noted "${btnText}"! I've updated the system and notified our clinic desk. We are excited to welcome you!` 
          : isEs
          ? `¡Registrado "${btnText}"! He actualizado el sistema de la clínica. ¡Nos vemos pronto!`
          : `Perfeito! Registrei "${btnText}" na agenda da clínica. Aguardo você no horário marcado!`,
        time: 'Agora'
      };
      setMessages((prev) => [...prev, aiReply]);
    }, 1200);
  };

  const handleCustomSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    const userText = customInput.trim();
    setCustomInput('');

    const userMsg: ChatMessage = {
      id: `custom-${Date.now()}`,
      sender: 'patient',
      text: userText,
      time: 'Agora'
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const isEn = i18n.language.startsWith('en');
      const isEs = i18n.language.startsWith('es');

      let reply = isEn
        ? "Thanks for your question! Our clinical AI is ready 24/7 to provide information, check practitioner availability, or hand over to our receptionist. Would you like to schedule an assessment?"
        : isEs
        ? "¡Gracias por su mensaje! Nuestra IA atiende las 24 horas para brindar información clínica, revisar la agenda o transferir con nuestra recepcionista. ¿Desea agendar una valoración?"
        : "Obrigado pela sua mensagem! Nossa IA da clínica está disponível 24 horas por dia para tirar dúvidas, consultar a agenda dos doutores ou transferir para a secretária. Deseja agendar sua avaliação?";

      const aiReply: ChatMessage = {
        id: `ai-custom-${Date.now()}`,
        sender: 'ai',
        text: reply,
        time: 'Agora',
        buttons: isEn ? ["Schedule appointment", "Speak with staff"] : isEs ? ["Agendar cita", "Hablar con recepcionista"] : ["Agendar horário", "Falar com recepcionista"]
      };
      setMessages((prev) => [...prev, aiReply]);
    }, 1400);
  };

  return (
    <section id="simulacao" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="text-xs sm:text-sm font-bold uppercase tracking-wider text-teal-700">
            {t('simulation.kicker')}
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance]">
            {t('simulation.title')}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed [text-wrap:balance]">
            {t('simulation.subtitle')}
          </p>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveScenario('dental')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              activeScenario === 'dental'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {t('simulation.controls.scenarioDental')}
          </button>
          <button
            onClick={() => setActiveScenario('aesthetic')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              activeScenario === 'aesthetic'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {t('simulation.controls.scenarioAesthetic')}
          </button>
          <button
            onClick={() => setActiveScenario('reminder')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
              activeScenario === 'reminder'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {t('simulation.controls.scenarioReminder')}
          </button>
        </div>

        {/* WhatsApp Device Mockup */}
        <div className="max-w-md mx-auto bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl border-4 border-slate-800">
          
          {/* Phone Inner Container */}
          <div className="bg-[#EFEAE2] rounded-[2rem] overflow-hidden flex flex-col h-[580px] relative border border-slate-300">
            
            {/* WhatsApp Top Header Bar */}
            <div className="bg-teal-800 text-white px-4 py-3 flex items-center justify-between shrink-0 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-sm border border-teal-400/40">
                    AI
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-teal-800" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-sm leading-tight text-white">AtendAI Clínica</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-300" />
                  </div>
                  <p className="text-[11px] text-teal-100 font-normal">
                    {isTyping ? 'digitando...' : t('simulation.chat.online')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-white/80">
                <Video className="w-4 h-4 cursor-pointer hover:text-white" />
                <Phone className="w-4 h-4 cursor-pointer hover:text-white" />
                <MoreVertical className="w-4 h-4 cursor-pointer hover:text-white" />
              </div>
            </div>

            {/* Chat Messages Body */}
            <div 
              ref={chatScrollRef}
              className="flex-1 p-3.5 space-y-3 overflow-y-auto whatsapp-chat-scroll"
            >
              {/* Security Banner */}
              <div className="text-center my-1">
                <span className="inline-block bg-amber-100/90 text-amber-900 text-[10px] px-3 py-1 rounded-md shadow-2xs font-medium">
                  🔒 Mensagens criptografadas de ponta a ponta e em conformidade LGPD.
                </span>
              </div>

              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'patient' ? 'items-end' : 'items-start'} animate-in fade-in duration-200`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg px-3 py-2 text-xs sm:text-[13px] shadow-xs ${
                      msg.sender === 'patient'
                        ? 'bg-[#E7FFDB] text-slate-800 rounded-tr-none border border-emerald-100'
                        : 'bg-white text-slate-800 rounded-tl-none border border-slate-200/70'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                    {/* Interactive quick reply buttons if included in message */}
                    {msg.buttons && msg.buttons.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                        {msg.buttons.map((btn, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleButtonClick(btn)}
                            className="px-2.5 py-1 text-xs font-semibold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-md border border-teal-200 transition-colors cursor-pointer text-left"
                          >
                            {btn}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Appointment Card */}
                    {msg.card && (
                      <div className="mt-2.5 pt-2 border-t border-slate-100 bg-teal-50/60 p-2.5 rounded-lg border border-teal-200/80">
                        <div className="flex items-center gap-1.5 text-teal-900 font-bold text-xs mb-1.5">
                          <CalendarCheck className="w-4 h-4 text-teal-700" />
                          <span>{t('simulation.chat.appointmentConfirmedBadge')}</span>
                        </div>
                        <div className="text-[11px] text-slate-700 space-y-0.5">
                          <p><span className="text-slate-500">{t('simulation.chat.procedureLabel')}:</span> <strong>{msg.card.procedure}</strong></p>
                          <p><span className="text-slate-500">{t('simulation.chat.doctorLabel')}:</span> <strong>{msg.card.doctor}</strong></p>
                          <p><span className="text-slate-500">{t('simulation.chat.dateLabel')}:</span> <strong>{msg.card.date}</strong> · {msg.card.time}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400 mt-1">
                      <span>{msg.time}</span>
                      {msg.sender === 'patient' && (
                        <CheckCheck className="w-3.5 h-3.5 text-blue-500 stroke-[2.5]" />
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Animated Typing Indicator */}
              {isTyping && (
                <div className="flex items-center gap-1 bg-white text-slate-500 px-3 py-2 rounded-lg rounded-tl-none w-16 shadow-xs border border-slate-200/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
                </div>
              )}
            </div>

            {/* Chat Input Field (Interactive!) */}
            <form onSubmit={handleCustomSend} className="bg-slate-100 p-2 border-t border-slate-200 flex items-center gap-2 shrink-0">
              <input
                type="text"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder={t('simulation.chat.typePlaceholder')}
                className="flex-1 bg-white border border-slate-300 rounded-full px-4 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-teal-600"
              />
              <button
                type="submit"
                className="w-8 h-8 rounded-full bg-teal-700 hover:bg-teal-800 text-white flex items-center justify-center shrink-0 cursor-pointer shadow-xs transition-colors"
                aria-label={t('simulation.controls.send')}
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>
        </div>

        {/* Player Controls Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-slate-600">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-teal-700" />
                <span>{t('simulation.controls.pause')}</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-teal-700" />
                <span>{t('simulation.controls.play')}</span>
              </>
            )}
          </button>

          <button
            onClick={handleRestart}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-teal-700" />
            <span>{t('simulation.controls.restart')}</span>
          </button>

          <button
            onClick={() => setSpeed(speed === 1 ? 2 : 1)}
            className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors cursor-pointer font-mono"
          >
            <span>Velocidade:</span>
            <span className="text-teal-700 font-bold">{speed}x</span>
          </button>
        </div>

      </div>
    </section>
  );
};
