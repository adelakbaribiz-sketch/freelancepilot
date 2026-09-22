import { projects } from "./data/projects";
import { proposals } from "./data/proposals";

/**
 * Rule-based canned response generator for the AI Assistant demo page.
 * This is NOT a real LLM call — it pattern-matches keywords against the
 * mock dataset so the interaction pattern can be demonstrated without a
 * backend. See docs/LIMITATIONS.md.
 */
export function generateAssistantReply(input: string): string {
  const q = input.toLowerCase();

  if (q.includes("how many") && q.includes("project")) {
    return `You have ${projects.length} projects in your feed right now, ${
      projects.filter((p) => p.status === "new").length
    } of which are new and haven't been reviewed yet.`;
  }

  if (q.includes("win rate") || q.includes("winning")) {
    const won = proposals.filter((p) => p.status === "won").length;
    const sent = proposals.filter((p) => p.status !== "draft").length;
    return `Out of ${sent} proposals sent, ${won} were won — that's roughly a ${Math.round(
      (won / Math.max(sent, 1)) * 100,
    )}% win rate in this demo dataset.`;
  }

  if (q.includes("best match") || q.includes("top project") || q.includes("recommend")) {
    const top = [...projects].sort((a, b) => b.matchScore - a.matchScore)[0];
    return `Your strongest match right now is "${top.title}" on ${top.platform} at ${top.matchScore}% — mainly because it lines up with your top-rated skills.`;
  }

  if (q.includes("translat")) {
    return "I can translate any project brief between English and Persian — open a project and use the \"Show Persian translation\" toggle to see it side-by-side with the original.";
  }

  if (q.includes("bid") || q.includes("price") || q.includes("budget")) {
    return "For most drafts I suggest bidding near the midpoint of the client's stated budget range, then adjusting down slightly if the brief signals a tight budget. You can edit the suggested bid on any project page before submitting.";
  }

  if (q.includes("hello") || q.includes("hi") || q.includes("سلام")) {
    return "Hi! Ask me about your current projects, win rate, or which proposal to prioritize next.";
  }

  return "I'm a simulated demo assistant, so my answers are limited to this sample dataset. Try asking about your project count, win rate, top match, or how translation works.";
}

export const suggestedPrompts = [
  "How many projects do I have right now?",
  "What's my current win rate?",
  "Which project is my best match?",
  "How does translation work here?",
];
