# Security Review

## Scope of this review

This reviews the demo application as it actually exists — a static-data
Next.js frontend with no server, no database, and no authentication — plus
notes what a real backend would require. It does not claim any certification
(SOC 2, ISO 27001, etc.) — none has been pursued or is applicable to a demo.

## What was checked, and result

| Area | Finding |
|---|---|
| Secrets in the repo | None present. `.env.example` documents variables a real backend would need; no real credentials exist anywhere in this project. |
| Authentication | There is none — the login form accepts any input and does not check it against anything. This is disclosed on the login page itself and in [LIMITATIONS.md](LIMITATIONS.md), not hidden. |
| Authorization | N/A — single hardcoded demo user, no access-control surface to test. |
| XSS | All dynamic text (including Persian translations and user-editable proposal drafts) is rendered through React's default JSX text interpolation, which HTML-escapes by default. No `dangerouslySetInnerHTML` is used anywhere in the codebase. |
| Injection (SQL/command) | N/A — no database, no shell execution from user input. |
| File upload | Not implemented — no upload surface exists to review. |
| API exposure | N/A — no API routes exist in this repository. |
| Sensitive data handling | The only "personal" data is fabricated demo content (`Sara Ahmadi`, a placeholder email). No real user data is collected, stored, or transmitted anywhere — there is nowhere for it to go. |
| Third-party network calls | None. No analytics, no tracking scripts, no external font/CDN fetches at runtime (fonts are system-stack, not remotely loaded — see [DECISIONS.md](DECISIONS.md)). |
| Dependency risk | Standard `npm audit` surface only (Next.js, React, Recharts, lucide-react, clsx) — no unusual or unmaintained packages. Run `npm audit` before any real deployment. |

**Result: no findings requiring a fix.** This is expected — a static demo
with no backend has a very small attack surface by construction, not because
of hardening effort.

## What a real backend would need (proposed, not built)

If/when the [proposed architecture](ARCHITECTURE.md) is built:

- **Authentication:** real password hashing (argon2/bcrypt) or a managed
  auth provider; session tokens over HTTPS only, `httpOnly` + `Secure` +
  `SameSite` cookies.
- **Authorization:** every `/proposals`, `/projects`, `/me` endpoint must
  scope queries to the authenticated user's own ID — the current mock data
  layer has no such boundary because there's only ever one user.
- **Input validation:** all `POST`/`PATCH` bodies validated against a schema
  (e.g. Zod) before touching the database — none of this exists yet because
  no endpoint exists yet.
- **Marketplace credentials:** if a platform connector ever needs a user's
  marketplace session, that must go through a secrets manager (e.g. Vault)
  with per-user encryption at rest — never stored in plaintext, never
  logged. This is a hard requirement, not a nice-to-have, given the product
  premise.
- **Payments/payouts:** explicitly not this product's responsibility — any
  real payout flow should hand off to a licensed payments provider (Stripe,
  Wise) rather than touching funds directly. See the note in
  [ARCHITECTURE.md](ARCHITECTURE.md#open-risks-carried-over-from-the-original-concept).

## Reporting

This is a portfolio project with no production deployment; there is no
active security contact or bug bounty.
