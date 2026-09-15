"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/*
  Dynamic text cursor, adapted from the reference Sudhanshu shared.
  Any element with data-cursor-hover and data-cursor-text shows a pill with
  that text trailing the pointer. The pill flips left at the right edge of the
  window and above the pointer at the bottom edge (the logo lives in the
  bottom nav). Mouse and trackpad only; hidden on touch.
*/

export function CursorBubble() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const text = textRef.current;
    if (!cursor || !text || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduceMotion ? 0 : 0.4;
    const xTo = gsap.quickTo(cursor, "x", { duration, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration, ease: "power3.out" });

    let mouseX = 0;
    let mouseY = 0;
    let hasMouseMoved = false;
    let frame = 0;

    const update = () => {
      const hoverItem = document.elementFromPoint(mouseX, mouseY)?.closest<HTMLElement>("[data-cursor-hover]");

      if (hoverItem) {
        const label = hoverItem.dataset.cursorText;
        if (label) text.textContent = label;

        // Edges are judged from the pointer, not the trailing follower, which is
        // still easing toward it and would report a stale position.
        const overRight = mouseX + cursor.offsetWidth >= window.innerWidth;
        const overBottom = mouseY + cursor.offsetHeight >= window.innerHeight;
        cursor.dataset.cursor = overRight ? "active-edge" : "active";
        // Only decided while hovering, so the pill doesn't jump as it fades out.
        cursor.dataset.cursorFlip = String(overBottom);
      } else {
        cursor.dataset.cursor = "";
      }
    };

    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    const onMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      hasMouseMoved = true;
      xTo(mouseX);
      yTo(mouseY);
      schedule();
    };

    // Content can scroll under a still pointer, so re-check what it's over.
    const onScroll = () => {
      if (hasMouseMoved) schedule();
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      gsap.killTweensOf(cursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      data-cursor=""
      data-cursor-flip="false"
      aria-hidden
      className="cursor-follower pointer-events-none fixed left-0 top-0 z-(--z-cursor) pl-2 pr-4 pt-4"
    >
      <div className="cursor-bubble relative flex h-[3.625em] items-center justify-center rounded-full bg-[#fcfcfd] px-8 text-[#0f1012] shadow-[0_6px_24px_-8px_rgb(15_16_18/0.35)]">
        <span ref={textRef} className="whitespace-nowrap text-[1em] font-medium tracking-[-0.02em]" />
      </div>
    </div>
  );
}
