# Product Requirements

## Problem statement

Freelancers whose first language isn't English are at a structural
disadvantage on international marketplaces: they lose time monitoring
multiple platforms by hand, lose winnable projects to language friction in
proposals, and have no single place to see translated context alongside
their response before sending it.

## Primary persona

**Sara, a Persian-speaking freelance developer/designer.** Works across
Upwork and Freelancer.com, fluent enough to deliver work but not to write
fast, persuasive, native-sounding proposals under time pressure. Wants to
spend her time on the work, not on re-reading marketplace listings in a
second language.

## In-scope for this demo

| # | Requirement | Where it lives |
|---|---|---|
| R1 | Show a ranked list of matching projects across multiple platforms | [Projects](../src/app/(app)/projects/page.tsx) |
| R2 | Show a project's original text and a Persian translation, toggleable | [Project detail](<../src/app/(app)/projects/[id]/page.tsx>) |
| R3 | Draft a proposal and bid, editable before sending | Project detail |
| R4 | Let the user approve/submit without it silently happening automatically (human-in-the-loop, per the original dossier's own safety requirement) | Project detail — submit is a manual click, always editable first |
| R5 | Track proposal history and status | [Proposals](../src/app/(app)/proposals/page.tsx) |
| R6 | Show performance analytics (win rate, volume, per-platform) | [Analytics](../src/app/(app)/analytics/page.tsx) |
| R7 | Let the user manage skills, platform connections, language, and AI preference | [Settings](../src/app/(app)/settings/page.tsx) |
| R8 | Answer ad hoc questions about the workspace | [AI Assistant](../src/app/(app)/assistant/page.tsx) |
| R9 | Work in English and Persian, including RTL layout | Locale switcher, app-wide |
| R10 | Be usable on a phone, not just desktop | Responsive layout + mobile nav drawer |
| R11 | Never imply real data or real actions without saying so | `DemoBanner` component on every data-bearing page |

## Explicitly out of scope for this demo

- Real authentication (own account system or marketplace OAuth)
- Real marketplace integration of any kind
- Real translation or LLM calls
- Payments, payouts, or any handling of financial credentials
- Multi-user / multi-tenant support
- Anything requiring a persistent database

These are documented as **proposed** future work in
[ARCHITECTURE.md](ARCHITECTURE.md) and [ROADMAP.md](ROADMAP.md), not built
here — see [DECISIONS.md](DECISIONS.md) for the reasoning.

## Success criteria for the demo (not a live product's KPIs)

- A reviewer can go from the landing page to a submitted (simulated)
  proposal in under two minutes without instructions.
- Every screen makes it obvious, without reading documentation, what's real
  versus simulated.
- The UI holds up on both a phone-width viewport and desktop, in both light
  and dark mode, and in both English and Persian/RTL.
