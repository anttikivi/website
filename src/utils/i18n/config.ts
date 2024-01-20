import type { Locale } from "../../types";

export const defaultLocale: Locale = "fi" as const;

export const showDefaultLocale = false;

export const fullLocales = {
  en: "en_GB", // "en_US",
  fi: "fi_FI",
} as const;

const locales: Locale[] = ["en", "fi"] as const;

export default locales;
