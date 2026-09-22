export type Locale = "en" | "fa";

export interface Dictionary {
  nav: {
    dashboard: string;
    projects: string;
    proposals: string;
    analytics: string;
    assistant: string;
    settings: string;
  };
  topbar: {
    search: string;
    demoBadge: string;
  };
  common: {
    viewAll: string;
    viewDetails: string;
    loading: string;
    retry: string;
    approve: string;
    submitted: string;
    draft: string;
    original: string;
    translated: string;
    showTranslation: string;
    showOriginal: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
  };
}

export const dictionary: Record<Locale, Dictionary> = {
  en: {
    nav: {
      dashboard: "Dashboard",
      projects: "Projects",
      proposals: "Proposals",
      analytics: "Analytics",
      assistant: "AI Assistant",
      settings: "Settings",
    },
    topbar: {
      search: "Search projects, proposals…",
      demoBadge: "Demo workspace",
    },
    common: {
      viewAll: "View all",
      viewDetails: "View details",
      loading: "Loading…",
      retry: "Retry",
      approve: "Approve & submit",
      submitted: "Submitted",
      draft: "Draft",
      original: "Original (English)",
      translated: "Persian translation",
      showTranslation: "Show Persian translation",
      showOriginal: "Show original",
    },
    dashboard: {
      title: "Welcome back, Sara",
      subtitle: "Here's what your assistant found while you were away.",
    },
  },
  fa: {
    nav: {
      dashboard: "داشبورد",
      projects: "پروژه‌ها",
      proposals: "پیشنهادها",
      analytics: "تحلیل‌ها",
      assistant: "دستیار هوش مصنوعی",
      settings: "تنظیمات",
    },
    topbar: {
      search: "جستجوی پروژه‌ها، پیشنهادها…",
      demoBadge: "فضای کاری نمایشی",
    },
    common: {
      viewAll: "مشاهده همه",
      viewDetails: "مشاهده جزئیات",
      loading: "در حال بارگذاری…",
      retry: "تلاش مجدد",
      approve: "تأیید و ارسال",
      submitted: "ارسال شد",
      draft: "پیش‌نویس",
      original: "متن اصلی (انگلیسی)",
      translated: "ترجمه فارسی",
      showTranslation: "نمایش ترجمه فارسی",
      showOriginal: "نمایش متن اصلی",
    },
    dashboard: {
      title: "خوش برگشتی، سارا",
      subtitle: "این‌هاست چیزهایی که دستیارت در نبودت پیدا کرده.",
    },
  },
};
