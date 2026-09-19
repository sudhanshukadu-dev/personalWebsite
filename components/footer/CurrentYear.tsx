"use client";

import { useSyncExternalStore } from "react";

// The current year from the visitor's clock, so the footer never goes stale. The server
// renders `fallback` (the year at build time) and the client swaps in its own year after
// hydration, without a mismatch.
const subscribe = () => () => {};
const getYear = () => new Date().getFullYear();

export function CurrentYear({ fallback }: { fallback: number }) {
  return useSyncExternalStore(subscribe, getYear, () => fallback);
}
