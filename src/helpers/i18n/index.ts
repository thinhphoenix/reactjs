import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { namespaces, resources } from './i18n.gen';

type Lang = keyof typeof resources;
type Ns = keyof (typeof resources)[Lang];

const resolved: any = {};

for (const lang in resources) {
  const l = lang as Lang;
  resolved[l] = {};
  for (const ns in resources[l]) {
    const n = ns as Ns;
    resolved[l][n] = resources[l][n];
  }
}

i18n.use(initReactI18next).init({
  fallbackLng: 'en-US',
  ns: namespaces,
  defaultNS: 'common',
  resources: resolved,
  interpolation: { escapeValue: false },
});

export default i18n;
