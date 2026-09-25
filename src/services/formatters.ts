/**
 * Internationalization formatting utilities for currency, dates, and times.
 */

export const formatCurrency = (amount: number, locale: string = 'pt-BR'): string => {
  try {
    let currencyCode = 'BRL';
    let lang = 'pt-BR';

    if (locale.startsWith('en')) {
      currencyCode = 'USD';
      lang = 'en-US';
    } else if (locale.startsWith('es')) {
      currencyCode = 'EUR';
      lang = 'es-ES';
    }

    return new Intl.NumberFormat(lang, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `R$ ${amount.toFixed(2)}`;
  }
};

export const formatDate = (
  dateInput: string | Date,
  locale: string = 'pt-BR',
  options?: Intl.DateTimeFormatOptions
): string => {
  try {
    const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
    if (isNaN(date.getTime())) return String(dateInput);

    const defaultOptions: Intl.DateTimeFormatOptions = options || {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    };

    const lang = locale.startsWith('en') ? 'en-US' : locale.startsWith('es') ? 'es-ES' : 'pt-BR';
    return new Intl.DateTimeFormat(lang, defaultOptions).format(date);
  } catch {
    return String(dateInput);
  }
};

export const formatTime = (time: string): string => {
  if (!time) return '';
  return time.slice(0, 5); // ensures HH:mm
};

export const formatRelativeTime = (isoString: string, locale: string = 'pt-BR'): string => {
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    const isEn = locale.startsWith('en');
    const isEs = locale.startsWith('es');

    if (diffMins < 1) return isEn ? 'Just now' : isEs ? 'Ahora' : 'Agora';
    if (diffMins < 60) return `${diffMins} min`;
    if (diffHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    if (diffDays === 1) return isEn ? 'Yesterday' : isEs ? 'Ayer' : 'Ontem';
    return formatDate(date, locale, { day: '2-digit', month: '2-digit' });
  } catch {
    return '';
  }
};
