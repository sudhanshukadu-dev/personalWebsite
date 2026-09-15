"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
  Arc scroll transition, ported from the reference Sudhanshu shared and used as a
  full-screen panel between home sections, carrying a one-line intro to the next
  section. As the panel scrolls in, an arc in its colour rises over the section
  above (cover) and bulges as it goes; as the panel scrolls out, a second arc over
  the section below pulls back up (reveal). Both are scrubbed, so they reverse on
  the way back. Under reduced motion the arcs are skipped and the panel just
  scrolls by. Styles live in globals.css (.arc-transition*).
*/

const VIEWBOX = 100;
const CURVE = 12;
const SCRUB = 0.3;

type Mode = "cover" | "reveal";

const round = (value: number) => Math.round(value * 100) / 100;

export function ArcTransition({ text }: { text: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const coverPath = root?.querySelector<SVGPathElement>("[data-arc-cover] path");
    const revealPath = root?.querySelector<SVGPathElement>("[data-arc-reveal] path");
    const textEl = root?.querySelector<HTMLElement>("[data-arc-text]");
    if (!root || !coverPath || !revealPath || !textEl) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // The arc's depth scales with the shape's aspect (full width by one screen tall).
      let depth = 0;
      const measure = () => {
        depth = CURVE * (window.innerWidth / Math.max(1, window.innerHeight));
      };

      const draw = (path: SVGPathElement, mode: Mode, progress: number) => {
        const fill = mode === "cover" ? progress : 1 - progress;
        const curve = depth * Math.sin(fill * Math.PI);

        if (mode === "cover") {
          const edge = round(VIEWBOX - VIEWBOX * fill);
          const control = round(edge - curve * 2);
          path.setAttribute(
            "d",
            `M0 ${VIEWBOX} L0 ${edge} Q${VIEWBOX / 2} ${control} ${VIEWBOX} ${edge} L${VIEWBOX} ${VIEWBOX} Z`,
          );
          return;
        }

        const edge = round(VIEWBOX * fill);
        const control = round(edge + curve * 2);
        path.setAttribute("d", `M0 0 L0 ${edge} Q${VIEWBOX / 2} ${control} ${VIEWBOX} ${edge} L${VIEWBOX} 0 Z`);
      };

      measure();
      const cover = { progress: 0 };
      const reveal = { progress: 0 };
      draw(coverPath, "cover", 0);
      draw(revealPath, "reveal", 0);

      // Cover: while the panel's top travels from the bottom of the screen to the top.
      gsap.to(cover, {
        progress: 1,
        ease: "none",
        onUpdate: () => draw(coverPath, "cover", cover.progress),
        scrollTrigger: {
          trigger: root,
          start: "top bottom",
          end: "top top",
          scrub: SCRUB,
          invalidateOnRefresh: true,
          onRefresh: measure,
        },
      });

      // Reveal: while the panel's bottom (the next section's top) travels up the screen.
      gsap.to(reveal, {
        progress: 1,
        ease: "none",
        onUpdate: () => draw(revealPath, "reveal", reveal.progress),
        scrollTrigger: {
          trigger: root,
          start: "bottom bottom",
          end: "bottom top",
          scrub: SCRUB,
          invalidateOnRefresh: true,
          onRefresh: measure,
        },
      });

      // The line rises gently into place as the panel arrives.
      gsap.fromTo(
        textEl,
        { y: 60, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          ease: "none",
          scrollTrigger: { trigger: root, start: "top 70%", end: "top 15%", scrub: SCRUB },
        },
      );

      return () => {
        coverPath.removeAttribute("d");
        revealPath.removeAttribute("d");
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={rootRef} className="arc-transition">
      <svg data-arc-cover aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="arc-transition__shape is--cover">
        <path />
      </svg>

      <div className="arc-transition__panel">
        <p data-arc-text className="arc-transition__text">
          {text}
        </p>
      </div>

      <svg data-arc-reveal aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="arc-transition__shape is--reveal">
        <path />
      </svg>
    </div>
  );
}
