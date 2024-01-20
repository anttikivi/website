import { getEntry } from "astro:content";
import type { Locale } from "../../types";
import locales, { defaultLocale, showDefaultLocale } from "./config";
import routes from "./routes";

export function getLocaleFromUrl(url: URL): Locale {
  const [, locale] = url.pathname.split("/");

  if (locale in locales) {
    return locale as Locale;
  }

  return defaultLocale;
}

export async function useTranslations(
  locale: Locale,
  collection: string,
): Promise<(key: string) => string> {
  const translations = await getEntry(
    "translations",
    `${locale}/${collection}`,
  );
  console.log("translations", translations);
  return function t(key: string): string {
    // return locales[locale][key] || locales[defaultLocale][key];
    return translations?.data[key] || key;
  };
}

export function useTranslatedPath(locale: Locale) {
  return function translatedPath(path: string, l: Locale = locale) {
    // Replace only the first slash as the rest of the slashes should be
    // include in the translation key.
    const pathName = path.replace("/", "");
    // TODO: This was the old variable. The check fof default locale was
    // removed from the new one.
    // const hasTranslation =
    //   defaultLocale !== l &&
    //   routes[l] !== undefined &&
    //   routes[l][pathName as keyof (typeof routes)[Locale]] !== undefined;
    const hasTranslation =
      routes[l] !== undefined &&
      routes[l][pathName as keyof (typeof routes)[Locale]] !== undefined;
    const translatedPath = hasTranslation
      ? `${routes[l][pathName as keyof (typeof routes)[Locale]]}`
      : path;
    const finalPath =
      !showDefaultLocale && l === defaultLocale
        ? translatedPath
        : `/${l}${translatedPath}`;

    return finalPath.endsWith("/") ? finalPath : `${finalPath}/`;
  };
}

function getLocalizedRouteFromPathname(pathname: string, locale: Locale) {
  const parts =
    locale === defaultLocale
      ? pathname.split("/").slice(1)
      : pathname.split("/").slice(2);
  const path = parts.join("/");

  return path.endsWith("/") ? path.slice(0, -1) : path;
}

function getRouteKeyByValue(
  obj: Record<string, string>,
  value: string,
): string | undefined {
  let normalizedValue = value.endsWith("/") ? value.slice(0, -1) : value;
  normalizedValue = normalizedValue.startsWith("/")
    ? normalizedValue
    : `/${normalizedValue}`;
  return Object.keys(obj).find((key) => obj[key] === normalizedValue);
}

export function getRouteFromUrl(url: URL): string | undefined {
  const pathname = new URL(url).pathname;
  const currentLocale = getLocaleFromUrl(url);
  const localizedRoute = getLocalizedRouteFromPathname(pathname, currentLocale);

  if (localizedRoute === undefined) {
    return undefined;
  }

  if (localizedRoute === "") {
    return "/";
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
