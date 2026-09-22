# Decisions Log

Real engineering decisions made while building this repository, in the order
they came up. Each includes the reasoning, not just the outcome.

## D1 — Frontend-heavy demo over the original microservices design

**Decision:** build a Next.js frontend over a typed mock data layer instead
of the originally-planned Kafka/Temporal/Keycloak/Kubernetes stack.
**Why:** the original design was sized for a platform with real users and
real revenue; building it speculatively for a zero-user demo would produce
infrastructure nobody could evaluate, at the cost of the frontend quality
that a portfolio reviewer can actually judge. See
[PROJECT_CONTEXT.md](PROJECT_CONTEXT.md).

## D2 — Typed data-access functions instead of importing arrays directly

**Decision:** every page reads data through functions like
`getProjectById()` in `src/lib/data/`, never by importing and filtering the
mock arrays inline.
**Why:** this is the one seam that has to exist for a real backend to slot
in later without reshaping components — see
[ARCHITECTURE.md](ARCHITECTURE.md).

## D3 — Dropped `next/font/google` for system font stacks

**Decision:** removed Google Fonts (Inter/Fraunces/Noto Sans Arabic) loaded
via `next/font/google` and replaced them with system font stacks defined in
`globals.css`.
**Why:** the build sandbox this project was built in has no outbound network
access at build time, and Turbopack's font loader hard-fails without it
(`Module not found: @vercel/turbopack-next/internal/font/google/font`).
System fonts also mean the app builds and renders identically offline,
which is a reasonable trade for a demo. A production deployment with normal
network access could reinstate custom webfonts without any other change.

## D4 — Fixed `DEMO_NOW` reference instead of `Date.now()` in mock data

**Decision:** all "discovered 22 minutes ago"-style mock timestamps are
computed from a fixed constant (`src/lib/data/demo-now.ts`), not
`Date.now()` at module load.
**Why:** `Date.now()` evaluated at module load produces a different
timestamp on the server (at SSR time) than on the client (at hydration
time), which showed up as a real React hydration-mismatch error during
manual browser testing. Fixing the data layer removed the root cause;
`suppressHydrationWarning` was additionally applied to the few places that
still format a *live* relative-time string at render time (e.g.
"24m ago"), which is the pattern React's own docs recommend for
clock-dependent text.

## D5 — Distinct visual identity, not a reused template

**Decision:** deep teal + terracotta palette, an editorial serif for
headings paired with a system sans body, rather than a generic
purple-gradient SaaS look.
**Why:** explicit instruction to avoid every portfolio project looking like
the same template, and the serif-for-headings choice ties thematically to
the product's actual value prop (native-quality writing).

## D6 — Chart colors validated, not eyeballed

**Decision:** the two-series weekly chart and the platform win-rate bar
chart use a color pair (`#eb6834` / `#1baf7a`) run through a
colorblind-safety validator (CVD ΔE and contrast checks) rather than picked
by eye, with a table-view fallback for the one contrast WARN it surfaced.
**Why:** accessible-by-construction is cheaper than accessible-by-review.

## D7 — Added a mobile navigation drawer (not in the original page inventory)

**Decision:** added a hamburger-triggered slide-over nav (`AppShell`,
updated `Sidebar`/`Topbar`) after manual mobile-viewport testing showed the
desktop-only sidebar left mobile users with zero navigation.
**Why:** "responsive" was a stated requirement; a demo that's unusable at
375px width would fail it. Caught and fixed during the testing pass — see
[TESTING.md](TESTING.md).

## D8 — No testimonials, no fabricated traction

**Decision:** the landing page has no customer quotes, logos, or usage
numbers.
**Why:** there are no real customers. A fabricated testimonial would violate
the core instruction not to invent evidence, and a "look how popular this
is" section with zero real users would be actively misleading to anyone
reviewing this as a portfolio piece.
