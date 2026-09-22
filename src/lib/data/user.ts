import type { AnalyticsWeekPoint, NotificationItem, PlatformBreakdown, UserProfile } from "./types";
import { DEMO_NOW } from "./demo-now";

// DEMO DATA: fabricated for portfolio/demo purposes only.
export const currentUser: UserProfile = {
  id: "user_001",
  name: "Sara Ahmadi",
  email: "sara.ahmadi@example.com",
  locale: "en",
  timezone: "Asia/Tehran",
  skills: [
    { name: "React", proficiency: 5 },
    { name: "Node.js", proficiency: 4 },
    { name: "Shopify", proficiency: 4 },
    { name: "Python", proficiency: 3 },
    { name: "Technical Writing", proficiency: 3 },
  ],
  connectedPlatforms: [
    { platform: "upwork", connected: true, lastSynced: new Date(DEMO_NOW - 1000 * 60 * 6).toISOString() },
    { platform: "freelancer", connected: true, lastSynced: new Date(DEMO_NOW - 1000 * 60 * 40).toISOString() },
    { platform: "fiverr", connected: false, lastSynced: null },
    { platform: "toptal", connected: false, lastSynced: null },
  ],
};

export const notifications: NotificationItem[] = [
  {
    id: "notif_001",
    title: "New high-match project",
    body: "\"Landing page copy + translation (EN → FA)\" scored 96% match on Upwork.",
    read: false,
    createdAt: new Date(DEMO_NOW - 1000 * 60 * 12).toISOString(),
  },
  {
    id: "notif_002",
    title: "Proposal won",
    body: "Your proposal for \"Figma → responsive UI implementation\" was accepted.",
    read: false,
    createdAt: new Date(DEMO_NOW - 1000 * 60 * 60 * 24 * 2).toISOString(),
  },
  {
    id: "notif_003",
    title: "Platform sync completed",
    body: "Freelancer.com sync finished — 3 new projects discovered.",
    read: true,
    createdAt: new Date(DEMO_NOW - 1000 * 60 * 60 * 5).toISOString(),
  },
];

export const analyticsWeekly: AnalyticsWeekPoint[] = [
  { week: "Jul 28", proposalsSent: 4, won: 1 },
  { week: "Aug 4", proposalsSent: 6, won: 1 },
  { week: "Aug 11", proposalsSent: 5, won: 2 },
  { week: "Aug 18", proposalsSent: 7, won: 2 },
  { week: "Aug 25", proposalsSent: 6, won: 3 },
  { week: "Sep 1", proposalsSent: 8, won: 3 },
  { week: "Sep 8", proposalsSent: 7, won: 4 },
  { week: "Sep 15", proposalsSent: 9, won: 4 },
];

export const platformBreakdown: PlatformBreakdown[] = [
  { platform: "upwork", projectsFound: 142, proposalsSent: 38, winRate: 0.29 },
  { platform: "freelancer", projectsFound: 96, proposalsSent: 22, winRate: 0.23 },
  { platform: "fiverr", projectsFound: 54, proposalsSent: 11, winRate: 0.36 },
  { platform: "toptal", projectsFound: 18, proposalsSent: 3, winRate: 0.33 },
];
