import i18n from './i18n';

export const timeZone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

const getCurrencyFromLocale = () => {
  return i18n.t('currency', { ns: 'common' }) as string;
};

export const formatCurrency = (
  amount: number,
  locale?: string,
  currency?: string,
) => {
  const currentLocale = locale || i18n.language || 'en-US';
  const currentCurrency = currency || getCurrencyFromLocale();
  return new Intl.NumberFormat(currentLocale, {
    style: 'currency',
    currency: currentCurrency,
  }).format(amount);
};

export const formatTime = (
  date: Date,
  locale?: string,
  options: Intl.DateTimeFormatOptions = {},
) => {
  const currentLocale = locale || i18n.language || 'en-US';
  return new Intl.DateTimeFormat(currentLocale, {
    timeZone: timeZone(),
    ...options,
  }).format(date);
};
