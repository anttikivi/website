import locales, {
  defaultLocale,
  routes,
  showDefaultLocale,
} from '../data/locales';
import type { Locale } from '../types';

export function getLocaleFromUrl(url: URL): Locale {
  const [, locale] = url.pathname.split('/');

  if (locale in locales) {
    return locale as Locale;
  }

  return defaultLocale;
}

export function useTranslations(locale: Locale) {
  return function t(key: keyof (typeof locales)[Locale]) {
    return locales[locale][key] || locales[defaultLocale][key];
  };
}

export function useTranslatedPath(locale: keyof typeof locales) {
  return function translatedPath(path: string, l: Locale = locale) {
    // Replace only the first slash as the rest of the slashes should be
    // include in the translation key.
    const pathName = path.replace('/', '');
    const hasTranslation =
      defaultLocale !== l &&
      routes[l] !== undefined &&
      routes[l][pathName as keyof (typeof routes)[Locale]] !== undefined;
    const translatedPath = hasTranslation
      ? // TODO: Remove this warning if I get to fix this.
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `/${routes[l][pathName as keyof (typeof routes)[Locale]]}`
      : path;
    const finalPath =
      !showDefaultLocale && l === defaultLocale
        ? translatedPath
        : `/${l}${translatedPath}`;

    return finalPath.endsWith('/') ? finalPath : `${finalPath}/`;
  };
}

function getLocalizedRouteFromPathname(pathname: string, locale: Locale) {
  const parts =
    locale === defaultLocale
      ? pathname.split('/').slice(1)
      : pathname.split('/').slice(2);
  const path = parts.join('/');

  return path.endsWith('/') ? path.slice(0, -1) : path;
}

function getRouteKeyByValue(
  obj: Record<string, string>,
  value: string,
): string | undefined {
  return Object.keys(obj).find((key) => obj[key] === value);
}

export function getRouteFromUrl(url: URL): string | undefined {
  const pathname = new URL(url).pathname;
  const currentLocale = getLocaleFromUrl(url);
  const localizedRoute = getLocalizedRouteFromPathname(pathname, currentLocale);

  if (localizedRoute === undefined) {
    return undefined;
  }

  if (localizedRoute === '') {
    return '/';
  }

  if (currentLocale === defaultLocale) {
    return localizedRoute;
  }

  const reversedKey = getRouteKeyByValue(routes[currentLocale], localizedRoute);

  if (reversedKey !== undefined) {
    return reversedKey;
  }

  return undefined;
}
