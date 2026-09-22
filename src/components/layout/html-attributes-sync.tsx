"use client";

import { useEffect } from "react";
import { useLocale } from "@/lib/i18n/locale-context";

export function HtmlAttributesSync() {
  const { locale, dir } = useLocale();

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  return null;
}
