import fs from 'fs';
import path from 'path';

const LOCALES_DIR = path.resolve('src/locales');
const OUTPUT = path.resolve('src/helpers/i18n/i18n.gen.ts');

const resources: Record<string, Record<string, string>> = {};
const namespaces = new Set<string>();

for (const ns of fs.readdirSync(LOCALES_DIR)) {
  const nsPath = path.join(LOCALES_DIR, ns);
  if (!fs.statSync(nsPath).isDirectory()) continue;

  namespaces.add(ns);

  for (const file of fs.readdirSync(nsPath)) {
    if (!file.endsWith('.ts')) continue;

    const lang = file.replace('.ts', '');
    resources[lang] ??= {};
    resources[lang][ns] = `() => import('../../locales/${ns}/${lang}')`;
  }
}

const content = `
/* AUTO-GENERATED — DO NOT EDIT */
export const namespaces = ${JSON.stringify([...namespaces])}

export const resources = {
${Object.entries(resources)
  .map(
    ([lang, nss]) => `
  '${lang}': {
${Object.entries(nss)
  .map(([ns, loader]) => `    ${ns}: ${loader},`)
  .join('\n')}
  },`,
  )
  .join('\n')}
}
`;

fs.writeFileSync(OUTPUT, content.trim());