import en from "@/content/dictionaries/en.json";
import fr from "@/content/dictionaries/fr.json";

export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

const dictionaries = { en, fr };

export type Dictionary = typeof en;

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "fr" : "en";
}

export function resolveLocale(raw: string): Locale {
  return (locales as readonly string[]).includes(raw) ? (raw as Locale) : defaultLocale;
}
