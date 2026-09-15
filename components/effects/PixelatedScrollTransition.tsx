"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
  Pixelated scroll transition, ported from the reference Sudhanshu shared. Placed
  between two sections as a zero-height marker, it builds two grids of square
  pixels at the boundary. As the boundary scrolls up the screen, pixels flick on
  over the bottom of the section above (cover) while the pixels over the top of
  the section below flick off (reveal), so a pixel band sweeps between them.
  Scrubbed, so it reverses on the way back up. Columns adapt to the breakpoint
  and the grids rebuild when it changes; skipped under reduced motion. Styles
  live in globals.css (.pixel-transition*).
*/

const ROWS = 6;
const COLUMNS = { desktop: 16, tablet: 10, landscape: 10, mobile: 6 };
const SCRUB = 0.3;
const PIXEL_DURATION = 0.1;
const STAGGER_AMOUNT = 1.5;

type Mode = "cover" | "reveal";

// `color` should be the background of the section below the marker; it defaults to
// the page colour, which every home section below the hero uses.
export function PixelatedScrollTransition({ color }: { color?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const bands = Array.from(root.querySelectorAll<HTMLElement>("[data-pixel-band]"));
    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: "(min-width: 992px)",
        isTablet: "(min-width: 768px) and (max-width: 991px)",
        isLandscape: "(min-width: 479px) and (max-width: 767px)",
        isMobile: "(max-width: 478px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const { isDesktop, isTablet, isLandscape, reduceMotion } = context.conditions as Record<string, boolean>;
        if (reduceMotion) return;

        const columns = isDesktop
          ? COLUMNS.desktop
          : isTablet
            ? COLUMNS.tablet
            : isLandscape
              ? COLUMNS.landscape
              : COLUMNS.mobile;

        const panels = bands.map((band) => {
          const mode = band.dataset.pixelBand as Mode;
          const panel = document.createElement("div");
          panel.className = "pixel-transition__panel";

          // Bottom rows go first, with some randomness and a gentle wave across columns.
          const cells: { element: HTMLElement; priority: number }[] = [];
          for (let c = 0; c < columns; c++) {
            const column = document.createElement("div");
            column.className = "pixel-transition__col";
            for (let r = 0; r < ROWS; r++) {
              const pixel = document.createElement("div");
              pixel.className = "pixel-transition__pixel";
              column.appendChild(pixel);
              const distance = ROWS - 1 - r;
              cells.push({ element: pixel, priority: distance * 50 + Math.random() * 300 + Math.sin(c * 0.3) * 30 });
            }
            panel.appendChild(column);
          }
          band.appendChild(panel);

          const ordered = cells.sort((a, b) => a.priority - b.priority).map((cell) => cell.element);
          gsap.set(ordered, { autoAlpha: mode === "cover" ? 0 : 1 });
          gsap
            .timeline({
              scrollTrigger: {
                trigger: root,
                start: "top bottom",
                end: mode === "cover" ? "top top" : "top center",
                scrub: SCRUB,
                invalidateOnRefresh: true,
              },
            })
            .to(ordered, {
              autoAlpha: mode === "cover" ? 1 : 0,
              duration: PIXEL_DURATION,
              stagger: { amount: STAGGER_AMOUNT, from: "start" },
              ease: "none",
            });

          return panel;
        });

        return () => panels.forEach((panel) => panel.remove());
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <div ref={rootRef} aria-hidden className="pixel-transition" style={color ? { color } : undefined}>
      <div data-pixel-band="cover" className="pixel-transition__band is--cover" />
      <div data-pixel-band="reveal" className="pixel-transition__band is--reveal" />
    </div>
  );
}
