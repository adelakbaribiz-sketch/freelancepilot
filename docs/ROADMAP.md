# Roadmap

## Stage 0 — Demo / Prototype (this repository, done)

Frontend-complete product demo on simulated data. See
[LIMITATIONS.md](LIMITATIONS.md) for exactly what's real.

## Stage 1 — Real MVP

Goal: one real platform, real translation, real drafting, real send —
proving the core loop end-to-end for a single user before adding breadth.

- Real auth (single-tenant, one account type)
- Real API server + Postgres (schema already drafted in [DATA_MODEL.md](DATA_MODEL.md))
- One real translation provider integration (replacing the mocked toggle)
- One real LLM call for proposal drafting (replacing the template string)
- One real marketplace integration, **after** a ToS/legal review for that
  specific platform (see [ARCHITECTURE.md](ARCHITECTURE.md#open-risks-carried-over-from-the-original-concept))
- Human-in-the-loop send stays mandatory — this is a product requirement,
  not just a demo affordance

## Stage 2 — Multi-platform

- Add the remaining marketplaces, each behind its own ToS review
- Real notifications (email/Telegram) for high-match projects
- Real analytics computed from actual proposal history, not sample numbers

## Stage 3 — Scale-readiness

- Multi-tenancy, if and when there's a second real customer to justify it
- Proper observability (error tracking, uptime monitoring) sized to actual
  traffic, not provisioned speculatively
- Revisit whether a queue/workflow engine (e.g. Temporal) is actually
  needed, based on real operational pain — not adopted preemptively

## Explicitly not on this roadmap

A plugin marketplace, a mobile app, and a public third-party API were part
of the original concept's long-term vision but require a real user base to
justify — they're not planned work, just acknowledged as things that could
be considered much later if the product finds real traction.
