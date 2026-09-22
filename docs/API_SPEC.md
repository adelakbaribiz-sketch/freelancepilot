# API Specification (Proposed)

**Status: proposed, not implemented.** This demo has no API routes and no
server — see [ARCHITECTURE.md](ARCHITECTURE.md). This document specifies
the contract a real backend would need to expose to make the existing
frontend real, with zero component-level reshaping (`src/lib/data/*.ts`
would become thin fetch wrappers matching these shapes).

Base URL: `/api/v1` · Auth: `Authorization: Bearer <token>` (proposed —
mechanism TBD, see [SECURITY.md](SECURITY.md))

## Projects

```
GET /projects?platform=&status=&q=
  → 200 Project[]

GET /projects/:id
  → 200 Project | 404
```

## Proposals

```
GET /proposals?status=
  → 200 Proposal[]

GET /projects/:id/proposals
  → 200 Proposal[]

POST /proposals
  body: { projectId, contentEn, bidAmount, currency }
  → 201 Proposal   (status starts as "draft")

POST /proposals/:id/send
  → 200 Proposal   (status becomes "sent"; this is the one real side-effecting
                     call — the platform connector picks it up async, see
                     ARCHITECTURE.md)
```

## Translation & drafting (AI service)

```
POST /ai/translate
  body: { text, sourceLocale, targetLocale }
  → 200 { translatedText }

POST /ai/draft-proposal
  body: { projectId }
  → 200 { contentEn, suggestedBid }
```

These two endpoints are the real integration points that were entirely
simulated client-side in the demo (`src/lib/assistant-responses.ts` and the
inline draft builder in the project detail page).

## User & settings

```
GET  /me                → 200 UserProfile
PATCH /me                body: Partial<UserProfile> → 200 UserProfile

GET  /me/platforms       → 200 ConnectedPlatform[]
POST /me/platforms/:platform/connect     → 200 ConnectedPlatform
POST /me/platforms/:platform/disconnect  → 200 ConnectedPlatform
```

## Analytics

```
GET /analytics/weekly     → 200 AnalyticsWeekPoint[]
GET /analytics/platforms  → 200 PlatformBreakdown[]
```

## Error shape (proposed convention)

```json
{ "error": { "code": "string", "message": "human-readable" } }
```

## What's intentionally not specified here

Authentication/session issuance, rate limiting, and webhook contracts for
async platform-connector events are not specified because they depend on
decisions not yet made (see [Open risks](ARCHITECTURE.md#open-risks-carried-over-from-the-original-concept)
in ARCHITECTURE.md) — specifying them now would mean guessing.
