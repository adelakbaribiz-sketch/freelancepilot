"use client";

import { useEffect, useState } from "react";

/**
 * Simulates a network round-trip for demo purposes (no real backend exists yet).
 * Returns `loading` for `ms` milliseconds after mount or after `deps` change.
 */
export function useSimulatedLoad(ms: number = 600, deps: unknown[] = []): boolean {
  const [loading, setLoading] = useState(true);

  // Re-arms the simulated network delay whenever `deps` changes (e.g. a demo
  // "retry" action), so the setState calls below are intentional, not incidental.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), ms);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  /* eslint-enable react-hooks/set-state-in-effect */

  return loading;
}
