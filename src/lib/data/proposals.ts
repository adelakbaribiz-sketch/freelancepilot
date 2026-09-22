import type { Proposal } from "./types";
import { DEMO_NOW } from "./demo-now";

// DEMO DATA: fabricated for portfolio/demo purposes only.
export const proposals: Proposal[] = [
  {
    id: "prop_001",
    projectId: "prj_004",
    contentEn:
      "Hi there — I've built ETL pipelines on this exact stack (Shopify + Google Ads → BigQuery) for two other e-commerce clients, including Airflow orchestration and Slack-based anomaly alerts. I can share an architecture diagram before we start. Available to begin this week.",
    contentFa:
      "سلام — من دقیقاً روی همین پشته (Shopify و Google Ads به BigQuery) برای دو مشتری تجارت الکترونیک دیگر خط لوله ETL ساخته‌ام، شامل هماهنگ‌سازی با Airflow و هشدارهای ناهنجاری از طریق Slack. می‌توانم قبل از شروع، یک نمودار معماری ارائه دهم. از همین هفته آماده شروع هستم.",
    bidAmount: 1900,
    currency: "USD",
    status: "sent",
    createdAt: new Date(DEMO_NOW - 1000 * 60 * 60 * 4).toISOString(),
    sentAt: new Date(DEMO_NOW - 1000 * 60 * 60 * 4).toISOString(),
  },
  {
    id: "prop_002",
    projectId: "prj_008",
    contentEn:
      "I reviewed your Figma file — the spacing system and component variants are very clean. I've shipped three component libraries with Storybook docs before. I'd deliver the core set (buttons, forms, nav, cards) in week one for early review.",
    contentFa:
      "فایل Figma شما را بررسی کردم — سیستم فاصله‌گذاری و انواع کامپوننت‌ها بسیار تمیز است. من قبلاً سه کتابخانه کامپوننت همراه با مستندات Storybook تحویل داده‌ام. مجموعه اصلی (دکمه‌ها، فرم‌ها، ناوبری، کارت‌ها) را در هفته اول برای بازبینی زودهنگام ارائه می‌دهم.",
    bidAmount: 1350,
    currency: "USD",
    status: "won",
    createdAt: new Date(DEMO_NOW - 1000 * 60 * 60 * 24 * 6).toISOString(),
    sentAt: new Date(DEMO_NOW - 1000 * 60 * 60 * 24 * 6).toISOString(),
  },
  {
    id: "prop_003",
    projectId: "prj_007",
    contentEn:
      "I specialize in WordPress-to-Next.js migrations and can guarantee SEO parity through a redirect map and structured data audit. Happy to start with a 40-page content inventory this week.",
    contentFa:
      "من در انتقال از وردپرس به Next.js تخصص دارم و می‌توانم با نقشه ریدایرکت و بازبینی داده‌های ساخت‌یافته، حفظ سئو را تضمین کنم. خوشحال می‌شوم این هفته با فهرست‌برداری محتوای ۴۰ صفحه شروع کنم.",
    bidAmount: 2600,
    currency: "USD",
    status: "lost",
    createdAt: new Date(DEMO_NOW - 1000 * 60 * 60 * 24 * 9).toISOString(),
    sentAt: new Date(DEMO_NOW - 1000 * 60 * 60 * 24 * 9).toISOString(),
  },
  {
    id: "prop_004",
    projectId: "prj_003",
    contentEn:
      "Draft ready for review: I've outlined 4 article angles based on your last 6 posts to keep a consistent voice, each with a runnable Kubernetes example. Let me know which angle to expand first.",
    contentFa:
      "پیش‌نویس آماده بازبینی است: بر اساس ۶ پست آخر شما، ۴ زاویه مقاله برای حفظ لحن یکسان طراحی کرده‌ام که هرکدام شامل یک مثال قابل اجرای Kubernetes است. به من بگویید کدام زاویه را ابتدا گسترش دهم.",
    bidAmount: 600,
    currency: "USD",
    status: "draft",
    createdAt: new Date(DEMO_NOW - 1000 * 60 * 60 * 2).toISOString(),
    sentAt: null,
  },
];

export function getProposalsForProject(projectId: string): Proposal[] {
  return proposals.filter((p) => p.projectId === projectId);
}
