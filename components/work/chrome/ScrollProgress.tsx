"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToTarget } from "@/lib/smooth-scroll";

gsap.registerPlugin(ScrollTrigger);

/*
  Scroll progress bar, ported from the reference Sudhanshu shared. A bar across the top
  of the screen fills as the page is read, scrubbed so it eases in behind the scroll.
  Clicking anywhere along it jumps to that point of the page. The jump goes through
  Locomotive Scroll (scrollToTarget), like every other page-driven scroll on the site,
  rather than GSAP's ScrollTo, which would fight the smooth scroller. It is a pointer
  shortcut on top of the section dock and the links, so it is hidden from assistive
  tech. Styles in globals.css (.progress-bar).
*/
export function ScrollProgress() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const bar = barRef.current;
    if (!wrap || !bar) return;

    const ctx = gsap.context(() => {
      gsap.to(bar, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          // How long the bar takes to catch up with the scroll.
          scrub: 0.5,
        },
      });
    });

    const onClick = (event: MouseEvent) => {
      const progress = event.clientX / wrap.offsetWidth;
      scrollToTarget(progress * (document.documentElement.scrollHeight - window.innerHeight));
    };
    wrap.addEventListener("click", onClick);

    return () => {
      wrap.removeEventListener("click", onClick);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={wrapRef} aria-hidden className="progress-bar-wrap">
      <div ref={barRef} className="progress-bar" />
    </div>
  );
}
