export type Platform = "upwork" | "freelancer" | "fiverr" | "toptal";

export type ProjectStatus =
  | "new"
  | "reviewing"
  | "draft_ready"
  | "submitted"
  | "won"
  | "lost";

export interface Project {
  id: string;
  platform: Platform;
  title: string;
  descriptionEn: string;
  descriptionFa: string;
  budgetMin: number;
  budgetMax: number;
  currency: string;
  skills: string[];
  clientCountry: string;
  clientRating: number;
  matchScore: number;
  discoveredAt: string;
  status: ProjectStatus;
  url: string;
}

export type ProposalStatus = "draft" | "sent" | "won" | "lost";

export interface Proposal {
  id: string;
  projectId: string;
  contentEn: string;
  contentFa: string;
  bidAmount: number;
  currency: string;
  status: ProposalStatus;
  createdAt: string;
  sentAt: string | null;
}

export interface Skill {
  name: string;
  proficiency: 1 | 2 | 3 | 4 | 5;
}

export interface ConnectedPlatform {
  platform: Platform;
  connected: boolean;
  lastSynced: string | null;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  locale: "en" | "fa";
  timezone: string;
  skills: Skill[];
  connectedPlatforms: ConnectedPlatform[];
}

export interface AnalyticsWeekPoint {
  week: string;
  proposalsSent: number;
  won: number;
}

export interface PlatformBreakdown {
  platform: Platform;
  projectsFound: number;
  proposalsSent: number;
  winRate: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}
