/**
 * Fixed reference "now" for demo data timestamps.
 *
 * Mock records below are defined as offsets from this constant rather than
 * `Date.now()` at module load, so the same values are produced during
 * server-side rendering and client hydration (avoiding a React hydration
 * mismatch — server and client otherwise evaluate `Date.now()` at two
 * different real moments).
 */
export const DEMO_NOW = new Date("2026-09-22T14:00:00.000Z").getTime();
