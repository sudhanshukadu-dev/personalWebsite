import { useSyncExternalStore } from "react";

const DARK_QUERY = "(prefers-color-scheme: dark)";

// An explicit choice on <html data-theme> wins; otherwise follow the system.
function resolvedTheme(): "light" | "dark" {
  const chosen = document.documentElement.dataset.theme;
  if (chosen === "light" || chosen === "dark") return chosen;
  return window.matchMedia(DARK_QUERY).matches ? "dark" : "light";
}

// Flips between light and dark from whatever is currently showing,
// and remembers the choice for the pre-paint script in app/layout.tsx.
export function toggleTheme() {
  const next = resolvedTheme() === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    // Storage can be blocked. The theme still switches for this visit.
  }
}

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const mql = window.matchMedia(DARK_QUERY);
  mql.addEventListener("change", onChange);
  return () => {
    observer.disconnect();
    mql.removeEventListener("change", onChange);
  };
}

export function useIsDark() {
  return useSyncExternalStore(subscribe, () => resolvedTheme() === "dark", () => false);
}
