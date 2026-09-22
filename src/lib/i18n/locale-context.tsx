"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { dictionary, type Dictionary, type Locale } from "./dictionary";

interface LocaleContextValue {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: Dictionary;
  setLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      dir: locale === "fa" ? "rtl" : "ltr",
      t: dictionary[locale],
      setLocale,
    }),
    [locale],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
