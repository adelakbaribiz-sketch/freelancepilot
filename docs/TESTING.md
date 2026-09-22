# Testing

## What was actually run

- `npx next build` — production build, including TypeScript type-checking.
- `npx eslint .` — full lint pass (Next's `core-web-vitals` + TypeScript +
  React Compiler / hooks-correctness rules).
- Manual browser verification (Claude's in-app browser pane) across every
  route, at both desktop and 375px mobile widths, in both light and dark
  theme, and in both English (LTR) and Persian (RTL) locale.
- Console error/network inspection on every route.

No automated component or E2E test suite exists yet — see
[Remaining](#remaining) below. For a static-data demo with no backend, the
build + lint + full manual pass above is proportionate; a real test suite
becomes proportionate once there's real logic (an API, real state
transitions) worth regression-testing.

## PASSED

- Production build succeeds with zero TypeScript errors.
- Lint passes with zero errors across the whole `src/` tree.
- All 9 routes (`/`, `/login`, `/dashboard`, `/projects`,
  `/projects/[id]`, `/proposals`, `/analytics`, `/settings`, `/assistant`)
  load with zero console errors, on a fresh dev server and a fresh browser
  tab.
- Core loop works end to end: browse → open project → toggle translation →
  edit draft → submit → status updates → toast fires.
- Locale switch (EN ⇄ FA) correctly mirrors the entire layout (sidebar
  side, breadcrumb arrows, paragraph alignment), not just the text strings.
- Dark mode toggle applies correctly across pages, including chart colors
  (validated separately, see below).
- Mobile (375px) layout has no horizontal scroll/overflow on any route.
- Chart color pair validated with the data-viz accessibility checker
  (colorblind-safe separation, ΔE ≥ 9 in both light and dark) — one
  contrast WARN on the light-mode "won" series was mitigated with a
  table-view toggle, per the checker's own relief rule.

## FIXED (found during this testing pass, corrected in the same session)

| Issue | Root cause | Fix |
|---|---|---|
| No way to navigate on mobile | `Sidebar` was `hidden md:flex` with no mobile equivalent | Added a hamburger-triggered slide-over drawer (`AppShell`, updated `Sidebar`/`Topbar`) |
| Horizontal overflow on mobile dashboard | A flex-wrapped `<p className="truncate">` title had no `min-w-0`, so it never shrank below its full text width, forcing the whole grid wider than the viewport | Switched to `line-clamp-1` + `min-w-0` on the title and its wrapping row |
| Console hydration-mismatch error | Mock `discoveredAt` timestamps computed via `Date.now()` at module load, which differs between server-render time and client-hydration time | Replaced with a fixed `DEMO_NOW` constant ([`demo-now.ts`](../src/lib/data/demo-now.ts)); added `suppressHydrationWarning` to the handful of elements that still format a live "X ago" string at render time |
| Production build failing entirely | `next/font/google` (Inter/Fraunces/Noto Sans Arabic) requires outbound network access at build time, unavailable in this sandbox | Switched to system font stacks in `globals.css` |
| Weekly trend chart Y-axis showing non-monotonic tick labels | Recharts' default tick generation on small integer ranges | Set explicit `allowDecimals={false}`, `domain={[0, 'dataMax + 1']}`, `tickCount={5}` |
| 13 lint errors (unescaped entities, impure-during-render `Date.now()`, unsafe effect-based state seeding) | See [DECISIONS.md](DECISIONS.md) D4 and inline fixes | All resolved; `npx eslint .` is clean |

## REMAINING

- No automated test suite (unit/component/E2E). Proportionate for the
  current static-data scope; should be added starting with the core loop
  (project detail → submit) once there's real backend logic to protect
  against regressions.
- No accessibility audit beyond the chart-specific colorblind/contrast
  validation and semantic HTML/keyboard-reachable controls used throughout
  — a full WCAG pass (screen reader testing, focus-order audit) was not
  performed.
- No cross-browser testing beyond the Chromium-based browser pane used
  during development.
