"use client";

import { useEffect } from "react";

/*
  Smooth scrolling for same-page hash links (See the work, Say hello, Back to top).
  This is JS on purpose: CSS `scroll-behavior: smooth` fights ScrollTrigger, whose
  refresh jumps the page to 0 to measure and then back, and a smooth <html> turns
  each jump into a slow scroll, so pages with pinned sections drift after load or
  navigation. Links to other pages are left to the browser and Next.js.
*/
export function SmoothAnchors() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const link = event.target instanceof Element ? event.target.closest("a[href*='#']") : null;
      if (!(link instanceof HTMLAnchorElement) || link.target === "_blank") return;

      const url = new URL(link.href);
      if (url.origin !== location.origin || url.pathname !== location.pathname || url.hash.length < 2) return;

      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;

      event.preventDefault();
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      if (location.hash !== url.hash) history.pushState(history.state, "", url.hash);

      // Keep keyboard users where they jumped to, as a native anchor would.
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
