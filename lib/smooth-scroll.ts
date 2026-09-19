import type LocomotiveScroll from "locomotive-scroll";

// The site's Locomotive Scroll instance (set by SmoothScroll), so page-driven scrolls go
// through the same smooth scroller as the wheel instead of fighting it.
let instance: LocomotiveScroll | null = null;

export function setSmoothScroll(scroll: LocomotiveScroll | null) {
  instance = scroll;
}

// Scroll to an element's top or to a y position: smoothly through Locomotive Scroll when it's
// running, natively otherwise, and instantly under reduced motion.
export function scrollToTarget(target: HTMLElement | number) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (instance && !reduceMotion) {
    instance.scrollTo(target);
    return;
  }
  const behavior = reduceMotion ? "auto" : "smooth";
  if (typeof target === "number") window.scrollTo({ top: target, behavior });
  else target.scrollIntoView({ behavior, block: "start" });
}
