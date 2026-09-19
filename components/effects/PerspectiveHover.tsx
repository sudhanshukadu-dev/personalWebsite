"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

/*
  3D perspective hover, ported from the reference Sudhanshu shared. Every element marked
  [data-3d-hover-target] tilts toward the pointer (up to data-max-rotate degrees, 20 by
  default), with a perspective of half the screen width, easing into each new angle.
  Mouse and trackpad only, and off under reduced motion. Renders nothing itself.
*/

const DEFAULT_MAX_DEG = 20;
const DURATION = 0.5;
const EASE = "power3.out";

export function PerspectiveHover() {
  useEffect(() => {
    if (
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-3d-hover-target]"));
    if (!elements.length) return;

    const targets = elements.map((el) => {
      const max = parseFloat(el.dataset.maxRotate ?? "");
      gsap.set(el, { transformPerspective: window.innerWidth * 0.5 });
      return {
        el,
        maxRotate: Number.isFinite(max) ? max : DEFAULT_MAX_DEG,
        rect: el.getBoundingClientRect(),
        rotateX: gsap.quickTo(el, "rotationX", { duration: DURATION, ease: EASE }),
        rotateY: gsap.quickTo(el, "rotationY", { duration: DURATION, ease: EASE }),
      };
    });

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let frame = 0;

    const measure = () => {
      targets.forEach((target) => {
        target.rect = target.el.getBoundingClientRect();
      });
    };

    const update = () => {
      frame = 0;
      targets.forEach(({ rect, maxRotate, rotateX, rotateY }) => {
        const normX = Math.max(-1, Math.min(1, (mouseX - (rect.left + rect.width / 2)) / (rect.width / 2 || 1)));
        const normY = Math.max(-1, Math.min(1, (mouseY - (rect.top + rect.height / 2)) / (rect.height / 2 || 1)));
        rotateX(-normY * maxRotate);
        rotateY(normX * maxRotate);
      });
    };

    const onPointerMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onResize = () => {
      targets.forEach(({ el }) => gsap.set(el, { transformPerspective: window.innerWidth * 0.5 }));
      requestAnimationFrame(measure);
    };
    const onScroll = () => requestAnimationFrame(measure);

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      gsap.killTweensOf(elements);
      gsap.set(elements, { clearProps: "transform" });
    };
  }, []);

  return null;
}
