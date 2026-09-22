import type { Project } from "./types";
import { DEMO_NOW } from "./demo-now";

// DEMO DATA: fabricated for portfolio/demo purposes only. Not real marketplace listings.
export const projects: Project[] = [
  {
    id: "prj_001",
    platform: "upwork",
    title: "Shopify store redesign for skincare brand",
    descriptionEn:
      "We are relaunching our skincare brand and need a Shopify expert to rebuild our store with a custom theme, improved checkout flow, and mobile-first design. Must have experience with Liquid and app integrations.",
    descriptionFa:
      "ما در حال راه‌اندازی مجدد برند مراقبت از پوست خود هستیم و به یک متخصص Shopify نیاز داریم تا فروشگاه ما را با قالب اختصاصی، فرآیند پرداخت بهتر و طراحی موبایل‌محور بازسازی کند. تجربه با Liquid و اتصال اپلیکیشن‌ها الزامی است.",
    budgetMin: 1500,
    budgetMax: 3000,
    currency: "USD",
    skills: ["Shopify", "Liquid", "UI Design", "JavaScript"],
    clientCountry: "United States",
    clientRating: 4.8,
    matchScore: 92,
    discoveredAt: new Date(DEMO_NOW - 1000 * 60 * 22).toISOString(),
    status: "new",
    url: "https://www.upwork.com/jobs/example-001",
  },
  {
    id: "prj_002",
    platform: "freelancer",
    title: "React Native app for local delivery service",
    descriptionEn:
      "Looking for a React Native developer to build an MVP delivery tracking app with live map, push notifications, and driver/customer roles. Backend API already exists (REST).",
    descriptionFa:
      "به دنبال یک توسعه‌دهنده React Native برای ساخت نسخه اولیه یک اپلیکیشن ردیابی تحویل کالا با نقشه زنده، اعلان‌های فوری و نقش‌های راننده و مشتری هستیم. بک‌اند (REST) از قبل آماده است.",
    budgetMin: 2000,
    budgetMax: 4500,
    currency: "USD",
    skills: ["React Native", "TypeScript", "Maps API"],
    clientCountry: "Canada",
    clientRating: 4.6,
    matchScore: 87,
    discoveredAt: new Date(DEMO_NOW - 1000 * 60 * 58).toISOString(),
    status: "reviewing",
    url: "https://www.freelancer.com/projects/example-002",
  },
  {
    id: "prj_003",
    platform: "upwork",
    title: "Technical blog writer — DevOps & Kubernetes topics",
    descriptionEn:
      "We publish 4 technical articles per month on DevOps practices. Seeking a writer with hands-on Kubernetes and CI/CD experience who can explain concepts clearly to intermediate engineers.",
    descriptionFa:
      "ما ماهانه ۴ مقاله فنی درباره DevOps منتشر می‌کنیم. به دنبال نویسنده‌ای با تجربه عملی در Kubernetes و CI/CD هستیم که بتواند مفاهیم را برای مهندسان سطح متوسط به‌روشنی توضیح دهد.",
    budgetMin: 400,
    budgetMax: 800,
    currency: "USD",
    skills: ["Technical Writing", "Kubernetes", "CI/CD"],
    clientCountry: "Germany",
    clientRating: 4.9,
    matchScore: 78,
    discoveredAt: new Date(DEMO_NOW - 1000 * 60 * 60 * 3).toISOString(),
    status: "draft_ready",
    url: "https://www.upwork.com/jobs/example-003",
  },
  {
    id: "prj_004",
    platform: "fiverr",
    title: "Data pipeline for e-commerce analytics",
    descriptionEn:
      "Need a Python engineer to build an ETL pipeline pulling order data from Shopify + Google Ads into BigQuery, with a daily Airflow schedule and basic anomaly alerts.",
    descriptionFa:
      "به یک مهندس پایتون نیاز داریم تا خط لوله ETL برای انتقال داده‌های سفارش از Shopify و Google Ads به BigQuery بسازد، همراه با زمان‌بندی روزانه در Airflow و هشدارهای ناهنجاری پایه.",
    budgetMin: 1200,
    budgetMax: 2500,
    currency: "USD",
    skills: ["Python", "Airflow", "BigQuery", "ETL"],
    clientCountry: "United Kingdom",
    clientRating: 4.5,
    matchScore: 81,
    discoveredAt: new Date(DEMO_NOW - 1000 * 60 * 60 * 5).toISOString(),
    status: "submitted",
    url: "https://www.fiverr.com/example-004",
  },
  {
    id: "prj_005",
    platform: "toptal",
    title: "Senior backend engineer — fintech ledger service",
    descriptionEn:
      "Building a double-entry ledger microservice in Go for a Series B fintech. Need someone comfortable with financial correctness, idempotency, and PostgreSQL performance tuning.",
    descriptionFa:
      "در حال ساخت یک میکروسرویس دفترکل دوطرفه با Go برای یک استارتاپ فین‌تک در مرحله Series B هستیم. نیاز به فردی داریم که با صحت مالی، ایده‌مپوتنسی و بهینه‌سازی عملکرد PostgreSQL آشنا باشد.",
    budgetMin: 6000,
    budgetMax: 9000,
    currency: "USD",
    skills: ["Go", "PostgreSQL", "Distributed Systems"],
    clientCountry: "United States",
    clientRating: 4.9,
    matchScore: 74,
    discoveredAt: new Date(DEMO_NOW - 1000 * 60 * 60 * 9).toISOString(),
    status: "new",
    url: "https://www.toptal.com/example-005",
  },
  {
    id: "prj_006",
    platform: "upwork",
    title: "Landing page copy + translation (EN → FA)",
    descriptionEn:
      "We need our SaaS landing page rewritten for clarity and conversion, then localized into Persian for a new market launch. Native-level Persian fluency required.",
    descriptionFa:
      "نیاز داریم صفحه فرود SaaS ما برای وضوح بیشتر و افزایش نرخ تبدیل بازنویسی شود و سپس برای راه‌اندازی در بازار جدید به فارسی بومی‌سازی گردد. تسلط بومی به زبان فارسی الزامی است.",
    budgetMin: 300,
    budgetMax: 600,
    currency: "USD",
    skills: ["Copywriting", "Translation", "Persian"],
    clientCountry: "United Arab Emirates",
    clientRating: 4.7,
    matchScore: 96,
    discoveredAt: new Date(DEMO_NOW - 1000 * 60 * 12).toISOString(),
    status: "new",
    url: "https://www.upwork.com/jobs/example-006",
  },
  {
    id: "prj_007",
    platform: "freelancer",
    title: "WordPress → Next.js migration",
    descriptionEn:
      "Migrating a 40-page WordPress site to Next.js with a headless CMS. Need clean component architecture and SEO parity with the existing site.",
    descriptionFa:
      "در حال انتقال یک سایت ۴۰ صفحه‌ای وردپرس به Next.js با CMS هدلس هستیم. نیاز به معماری تمیز کامپوننت‌ها و حفظ سئو مشابه سایت فعلی داریم.",
    budgetMin: 1800,
    budgetMax: 3200,
    currency: "USD",
    skills: ["Next.js", "Headless CMS", "SEO"],
    clientCountry: "Australia",
    clientRating: 4.4,
    matchScore: 69,
    discoveredAt: new Date(DEMO_NOW - 1000 * 60 * 60 * 14).toISOString(),
    status: "lost",
    url: "https://www.freelancer.com/projects/example-007",
  },
  {
    id: "prj_008",
    platform: "fiverr",
    title: "Figma → responsive UI implementation",
    descriptionEn:
      "We have a complete Figma design system and need it implemented pixel-accurately as a responsive React component library with Storybook documentation.",
    descriptionFa:
      "ما یک سیستم طراحی کامل در Figma داریم و نیاز داریم آن به‌صورت دقیق به یک کتابخانه کامپوننت React واکنش‌گرا همراه با مستندات Storybook تبدیل شود.",
    budgetMin: 900,
    budgetMax: 1600,
    currency: "USD",
    skills: ["React", "Storybook", "CSS"],
    clientCountry: "Netherlands",
    clientRating: 4.8,
    matchScore: 84,
    discoveredAt: new Date(DEMO_NOW - 1000 * 60 * 60 * 20).toISOString(),
    status: "won",
    url: "https://www.fiverr.com/example-008",
  },
  {
    id: "prj_009",
    platform: "upwork",
    title: "AI chatbot integration for customer support",
    descriptionEn:
      "Integrate an LLM-based chatbot into our Zendesk workflow to draft first-response replies for support agents to review before sending.",
    descriptionFa:
      "یک چت‌بات مبتنی بر مدل زبانی را در گردش کار Zendesk ما ادغام کنید تا پیش‌نویس پاسخ‌های اولیه را برای بازبینی عامل‌های پشتیبانی پیش از ارسال آماده کند.",
    budgetMin: 2500,
    budgetMax: 5000,
    currency: "USD",
    skills: ["LLM Integration", "Node.js", "Zendesk API"],
    clientCountry: "United States",
    clientRating: 4.7,
    matchScore: 88,
    discoveredAt: new Date(DEMO_NOW - 1000 * 60 * 40).toISOString(),
    status: "reviewing",
    url: "https://www.upwork.com/jobs/example-009",
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}
