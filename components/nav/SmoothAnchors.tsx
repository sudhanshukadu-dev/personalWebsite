"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { scrollToTarget } from "@/lib/smooth-scroll";

/*
  Smooth scrolling for same-page hash links (See the work, Say hello, Back to top).
  This is JS on purpose: CSS `scroll-behavior: smooth` fights ScrollTrigger, whose
  refresh jumps the page to 0 to measure and then back, and a smooth <html> turns
  each jump into a slow scroll, so pages with pinned sections drift after load or
  navigation. Links to other pages are left to the browser and Next.js.
*/
// How long a hash landing is held in place while the page lays itself out.
const HOLD_MS = 4000;

export function SmoothAnchors() {
  const pathname = usePathname();

  // Arriving on a page with a hash (a link like /#contact from a case study): the browser,
  // or Next on a client navigation, jumps to the target before the page's sticky and pinned
  // sections have grown to full height, so the jump lands thousands of pixels short. Hold
  // the target in place each time the page changes size, until the reader takes over or
  // the layout has had time to settle. Runs per page, since this lives in the root layout.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (!target) return;

    const inputs = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    const align = () => scrollToTarget(target, { immediate: true });
    const observer = new ResizeObserver(align);
    const release = () => {
      observer.disconnect();
      window.clearTimeout(timeout);
      inputs.forEach((type) => window.removeEventListener(type, release));
    };
    const timeout = window.setTimeout(release, HOLD_MS);
    inputs.forEach((type) => window.addEventListener(type, release, { passive: true }));
    observer.observe(document.body);
    align();

    return release;
  }, [pathname]);

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
      scrollToTarget(target);
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
