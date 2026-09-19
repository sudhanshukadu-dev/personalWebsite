"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/*
  Custom cursor, ported from the reference Sudhanshu shared: a small mint dot that
  trails the pointer and swells into a soft ring over links, buttons, anything with a
  cursor label, and images that open larger (styles in globals.css, .cursor-dot). It appears on the first mouse
  move and hides when the pointer leaves the window. Mouse and trackpad only; under
  reduced motion it follows without the trailing ease.
*/
export function DotCursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 0.6;
    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(dot, "x", { duration, ease: "power3" });
    const yTo = gsap.quickTo(dot, "y", { duration, ease: "power3" });

    let shown = false;
    const onMove = (event: MouseEvent) => {
      // Start at the pointer rather than sliding in from the corner.
      if (!shown) {
        gsap.set(dot, { x: event.clientX, y: event.clientY });
        shown = true;
      }
      xTo(event.clientX);
      yTo(event.clientY);
      dot.dataset.visible = "";
    };
    const onLeave = () => {
      delete dot.dataset.visible;
    };

    window.addEventListener("mousemove", onMove);
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(dot);
    };
  }, []);

  return <div ref={dotRef} aria-hidden className="cursor-dot" />;
}
