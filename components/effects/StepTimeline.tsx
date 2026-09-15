"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

/*
  Step-by-step timeline, adapted from the reference Sudhanshu shared.
  Children are the steps: elements marked [data-step-timeline-item], each with a
  [data-step-timeline-marker]. A line runs from the first marker's centre to the
  last; its fill scrubs with scroll, and as it passes each marker that step gets
  data-status="active", the latest one data-current (styles in globals.css).
  Under reduced motion the line is full and every step is active.
*/

type Props = {
  children: ReactNode;
  // Point in the viewport (0 top, 1 bottom) where the fill's leading edge sits.
  activation?: number;
  className?: string;
};

export function StepTimeline({ children, activation = 0.5, className }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const line = root.querySelector<HTMLElement>("[data-step-timeline-line]");
    const fill = root.querySelector<HTMLElement>("[data-step-timeline-fill]");
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-step-timeline-item]"));
    if (!line || !fill || !items.length) return;

    const anchors = items.map((item) => item.querySelector<HTMLElement>("[data-step-timeline-marker]") ?? item);
    const activationPercent = Math.min(Math.max(activation, 0), 1) * 100;
    const lastIndex = items.length - 1;
    let anchorFractions = [0];

    // Stretch the line between the first and last marker centres, and record
    // where each marker sits along it (0 to 1).
    const measureLine = () => {
      if (items.length < 2) {
        line.style.height = "0px";
        anchorFractions = [0];
        return;
      }
      const base = root.getBoundingClientRect().top;
      const centers = anchors.map((anchor) => {
        const box = anchor.getBoundingClientRect();
        return box.top + box.height / 2 - base;
      });
      const firstCenter = centers[0];
      const span = centers[lastIndex] - firstCenter;
      line.style.top = `${firstCenter}px`;
      line.style.height = `${span}px`;
      anchorFractions = centers.map((center) => (span > 0 ? (center - firstCenter) / span : 0));
    };

    let currentIndex = -2;

    const setCurrentIndex = (index: number) => {
      if (index === currentIndex) return;
      currentIndex = index;
      items.forEach((item, i) => {
        const status = index >= 0 && i <= index ? "active" : "inactive";
        if (item.getAttribute("data-status") !== status) item.setAttribute("data-status", status);
        item.toggleAttribute("data-current", i === index);
        item.toggleAttribute("data-previous", i === index - 1);
        item.toggleAttribute("data-next", i === index + 1);
      });
    };

    const indexForProgress = (reached: boolean, progress: number) => {
      if (!reached) return -1;
      let index = 0;
      for (let i = 0; i < anchorFractions.length; i++) {
        if (progress + 0.0001 >= anchorFractions[i]) index = i;
      }
      return index;
    };

    const updateFromScroll = (self: ScrollTrigger) => {
      const reached = self.isActive || self.progress >= 1;
      setCurrentIndex(indexForProgress(reached, self.progress));
    };

    setCurrentIndex(-1);
    gsap.set(fill, { transformOrigin: "top", scaleY: 0 });

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      measureLine();
      ScrollTrigger.addEventListener("refreshInit", measureLine);

      if (items.length > 1) {
        gsap.fromTo(
          fill,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: line,
              start: `top ${activationPercent}%`,
              end: `bottom ${activationPercent}%`,
              scrub: true,
              onUpdate: updateFromScroll,
              onToggle: updateFromScroll,
              onRefresh: updateFromScroll,
            },
          },
        );
      } else {
        setCurrentIndex(0);
      }

      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      document.fonts?.ready.then(refresh);
      ScrollTrigger.refresh();

      return () => {
        window.removeEventListener("load", refresh);
        ScrollTrigger.removeEventListener("refreshInit", measureLine);
      };
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      measureLine();
      gsap.set(fill, { scaleY: 1 });
      setCurrentIndex(lastIndex);
    });

    // Step heights change as photos load or text reflows; re-measure when they do.
    let resizeTimer = 0;
    const observer = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        measureLine();
        ScrollTrigger.refresh();
      }, 150);
    });
    observer.observe(root);

    return () => {
      observer.disconnect();
      window.clearTimeout(resizeTimer);
      mm.revert();
    };
  }, [activation]);

  return (
    <div ref={rootRef} data-step-timeline-init className={cn("relative", className)}>
      <div
        data-step-timeline-line
        className="pointer-events-none absolute left-[calc(1.5em-1px)] top-0 bottom-0 w-0.5 bg-bento-ink/15"
      >
        <div data-step-timeline-fill className="absolute inset-0 bg-bento-blue" style={{ transform: "scaleY(0)" }} />
      </div>
      {children}
    </div>
  );
}
