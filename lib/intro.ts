declare global {
  interface Window {
    __introFailsafe?: number;
  }
}

// The pre-paint script in app/layout.tsx arms a timeout that releases the page
// if the loader never hydrates. Once the loader runs, it owns the page and
// cancels that timeout, so a paused background tab can't cut the intro short.
export function cancelIntroFailsafe() {
  window.clearTimeout(window.__introFailsafe);
}
