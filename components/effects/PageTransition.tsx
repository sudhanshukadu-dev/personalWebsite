"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";

/*
  Pixel page transition, adapted from the reference Sudhanshu shared. Clicking a link
  marked [data-page-transition] covers the screen with square pixels in the link's
  project colour (--project-color from [data-project-color]), line by line in the
  reading direction (columns left to right in landscape, rows top to bottom in
  portrait), each line's pixels switching on in random order. Once covered, it
  navigates; when the new page has rendered, the pixels clear in the same sweep.
  Rendered once in the root layout, so it survives the route change. Under reduced
  motion it simply navigates. Styles live in globals.css (.page-transition*).
*/

const LINES = 12;
const SWEEP_DURATION = 0.55; // time for the sweep to cross the screen
const LINE_FADE = 0.2; // spread of random pixel timing within a line
const PIXEL_DURATION = 0.06;

export function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const wrapRef = useRef<HTMLDivElement>(null);
  const pendingRef = useRef<HTMLElement[] | null>(null);

  // Clear the pixels once the new page has rendered.
  useEffect(() => {
    const wrap = wrapRef.current;
    const lines = pendingRef.current;
    if (!wrap || !lines) return;
    pendingRef.current = null;

    const timeline = gsap.timeline({
      delay: 0.05,
      onComplete: () => {
        wrap.removeAttribute("data-active");
        wrap.replaceChildren();
      },
    });
    lines.forEach((line, index) => {
      timeline.to(
        Array.from(line.children),
        { opacity: 0, duration: PIXEL_DURATION, ease: "none", stagger: { amount: LINE_FADE, from: "random" } },
        (index / LINES) * SWEEP_DURATION,
      );
    });
  }, [pathname]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let busy = false;

    // One line per step of the sweep, each filled with square pixels across the screen.
    const buildGrid = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const portrait = height > width;
      const lineSize = (portrait ? height : width) / LINES;
      const cross = Math.ceil((portrait ? width : height) / lineSize);

      wrap.style.flexDirection = portrait ? "column" : "row";
      const fragment = document.createDocumentFragment();
      const lines: HTMLElement[] = [];
      for (let i = 0; i < LINES; i++) {
        const line = document.createElement("div");
        line.className = "page-transition__line";
        line.style.flexDirection = portrait ? "row" : "column";
        for (let j = 0; j < cross; j++) {
          const pixel = document.createElement("div");
          pixel.className = "page-transition__pixel";
          pixel.style[portrait ? "height" : "width"] = `${lineSize}px`;
          line.appendChild(pixel);
        }
        lines.push(line);
        fragment.appendChild(line);
      }
      wrap.replaceChildren(fragment);
      return lines;
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[data-page-transition]") : null;
      if (!link || link.target === "_blank") return;

      const url = new URL(link.href);
      if (url.origin !== window.location.origin) return;
      event.preventDefault();
      if (busy) return;

      const href = url.pathname + url.search + url.hash;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        router.push(href);
        return;
      }

      busy = true;
      wrap.style.color = getComputedStyle(link).getPropertyValue("--project-color").trim() || "var(--bento-blue)";
      const lines = buildGrid();
      wrap.setAttribute("data-active", "");

      const timeline = gsap.timeline({
        onComplete: () => {
          pendingRef.current = lines;
          busy = false;
          router.push(href);
        },
      });
      lines.forEach((line, index) => {
        timeline.to(
          Array.from(line.children),
          { opacity: 1, duration: PIXEL_DURATION, ease: "none", stagger: { amount: LINE_FADE, from: "random" } },
          (index / LINES) * SWEEP_DURATION,
        );
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [router]);

  return <div ref={wrapRef} aria-hidden className="page-transition" />;
}
