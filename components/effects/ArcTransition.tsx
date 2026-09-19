"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/*
  Arc scroll transition, ported from the reference Sudhanshu shared and used as a
  full-screen panel between home sections, carrying a one-line intro to the next
  section and a sticker below it (with the hero stickers' soft shadow and slight
  float). As the panel scrolls in, an arc in its colour rises over the section
  above (cover) and bulges as it goes; as the panel scrolls out, a second arc over
  the section below pulls back up (reveal). Both are scrubbed, so they reverse on
  the way back. Under reduced motion the arcs are skipped and the panel just
  scrolls by. Styles live in globals.css (.arc-transition*).

  The line also takes the variable font weight hover from another reference: it's
  split into letters, and once the pointer moves, each letter's Geist weight follows
  its distance from the pointer (heavier up close, lighter further out, within a
  narrow range), eased per letter, with each letter's width locked so the line never
  reflows. It runs only while the panel is on screen, and not on touch screens or
  under reduced motion.
*/

const VIEWBOX = 100;
const CURVE = 12;
const SCRUB = 0.3;

// Variable font weight hover: letters within WEIGHT_RANGE px of the pointer go from
// WEIGHT_MIN (at the edge) to WEIGHT_MAX (under it). Capped at 700 so it
// never goes very heavy.
const WEIGHT_MIN = 300;
const WEIGHT_MAX = 700;
const WEIGHT_RANGE = 400;

type Mode = "cover" | "reveal";

type ArcTransitionProps = {
  text: string;
  sticker?: string;
};

const round = (value: number) => Math.round(value * 100) / 100;

export function ArcTransition({ text, sticker }: ArcTransitionProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  // Variable font weight hover on the line.
  useEffect(() => {
    const line = textRef.current;
    if (
      !line ||
      window.matchMedia("(hover: none), (pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const split = new SplitText(line, { type: "chars,words", charsClass: "char" });
    const chars = split.chars as HTMLElement[];
    const baseWeight = parseFloat(getComputedStyle(line).fontWeight) || 500;
    chars.forEach((char) => {
      char.style.setProperty("--wght", String(baseWeight));
      char.style.fontVariationSettings = "'wght' var(--wght)";
    });
    const setWeight = chars.map((char) => gsap.quickTo(char, "--wght", { duration: 0.4, ease: "power2.out" }));

    // Heavier weights are wider, which would reflow the line. Lock each letter to its width
    // at the base weight (in em, so it scales with the text) once the font has loaded.
    let cancelled = false;
    void document.fonts.ready.then(() => {
      if (cancelled) return;
      const fontSize = parseFloat(getComputedStyle(line).fontSize);
      chars.forEach((char) => {
        char.style.display = "inline-block";
        char.style.textAlign = "center";
        char.style.width = `${char.getBoundingClientRect().width / fontSize}em`;
      });
    });

    let pointer: { x: number; y: number } | null = null;
    let onScreen = false;
    const onPointerMove = (event: PointerEvent) => {
      pointer = { x: event.clientX, y: event.clientY };
    };

    // Measured each frame: the line moves as the panel scrolls and rises in.
    const tick = () => {
      if (!pointer || !onScreen) return;
      chars.forEach((char, index) => {
        const rect = char.getBoundingClientRect();
        const distance = Math.hypot(pointer!.x - (rect.left + rect.width / 2), pointer!.y - (rect.top + rect.height / 2));
        const closeness = Math.max(0, 1 - distance / WEIGHT_RANGE);
        setWeight[index](WEIGHT_MIN + (WEIGHT_MAX - WEIGHT_MIN) * closeness);
      });
    };

    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    observer.observe(line);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    gsap.ticker.add(tick);

    return () => {
      cancelled = true;
      gsap.ticker.remove(tick);
      window.removeEventListener("pointermove", onPointerMove);
      observer.disconnect();
      gsap.killTweensOf(chars);
      split.revert();
    };
  }, [text]);

  useEffect(() => {
    const root = rootRef.current;
    const coverPath = root?.querySelector<SVGPathElement>("[data-arc-cover] path");
    const revealPath = root?.querySelector<SVGPathElement>("[data-arc-reveal] path");
    const introEl = root?.querySelector<HTMLElement>("[data-arc-text]");
    if (!root || !coverPath || !revealPath || !introEl) return;

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

      // The line and sticker rise gently into place as the panel arrives.
      gsap.fromTo(
        introEl,
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
        <div data-arc-text className="arc-transition__intro">
          <p ref={textRef} className="arc-transition__text">
            {text}
          </p>
          {sticker ? (
            <span aria-hidden className="arc-transition__sticker">
              <span className="sticker-float">
                <Image src={sticker} alt="" fill sizes="136px" className="object-contain" />
              </span>
            </span>
          ) : null}
        </div>
      </div>

      <svg data-arc-reveal aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="arc-transition__shape is--reveal">
        <path />
      </svg>
    </div>
  );
}
