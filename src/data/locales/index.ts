import type { Locale } from '../../types';

export const defaultLocale: Locale = 'fi' as const;

export const showDefaultLocale = false;

export const fullLocales = {
  fi: 'fi_FI',
} as const;

export const routes = {
  fi: {
    minusta: 'minusta',
    saavutettavuusseloste: 'saavutettavuusseloste',
    tietosuoja: 'tietosuoja',
  },
} as const;

const locales = {
  fi: {
    'about.title': 'Minusta',
    'footer.copyright': '&copy; 2023 Antti Kivi',
    'footer.navigation.terms.accessibilityStatement': 'Saavutettavuusseloste',
    'footer.navigation.terms.dataProtection': 'Tietosuoja',
    'footer.navigation.terms.label': 'Ehdot ja selosteet',
    'home.imageAlt':
      'Antti Kivi. Viestintäasiantuntija, yrittäjä ja ylioppilas.',
    'home.title': 'Etusivu',
    'layout.main': 'sisalto',
    'layout.skipToContent': 'Siirry sisältöön',
    'logo.alt': 'Kirjaimet A ja K hymyilevien kasvojen silminä.',
    'navigation.global.label': 'Yleinen',
    'navigation.global.title': 'Antti Kivi',
    'site.description': 'Viestintäasiantuntija, yrittäjä ja ylioppilas.',
    'site.imageAlt':
      'Antti Kivi. Viestintäasiantuntija, yrittäjä ja ylioppilas.',
    'site.slogan': 'Viestintäasiantuntija',
    'site.title': 'Antti Kivi',
  },
} as const;

export default locales;
