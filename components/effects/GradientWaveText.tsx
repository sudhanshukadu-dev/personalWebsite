"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/*
  Gradient wave text, adapted from the reference Sudhanshu shared.
  The text is split into characters that start as a faint ghost colour.
  As it scrolls through the trigger range, characters switch on in order,
  each flashing the wave colour before settling on the element's own colour;
  scrolling back reverses them.

  Rendered as a "div", it splits every child block instead (several
  paragraphs, say) and runs one continuous wave across all of them, driven
  by a single trigger on the wrapper. Inline elements like images are kept.

  Colours come from CSS tokens (--wave-start, --wave-color, and the element's
  color) and are re-read when the theme changes. SplitText keeps the text
  readable to screen readers. Under reduced motion the text stays as is.
*/

type Props = {
  children: ReactNode;
  as?: "h2" | "h3" | "p" | "div";
  id?: string;
  className?: string;
  scrollStart?: string;
  scrollEnd?: string;
  waveDuration?: number;
  scrub?: number;
};

export function GradientWaveText({
  children,
  as: Tag = "h2",
  id,
  className,
  scrollStart = "top 90%",
  scrollEnd = "center 40%",
  waveDuration = 0.4,
  scrub = 0.1,
}: Props) {
  const ref = useRef<HTMLHeadingElement & HTMLParagraphElement & HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const readColors = () => {
      const cs = getComputedStyle(el);
      return {
        start: cs.getPropertyValue("--wave-start").trim(),
        wave: cs.getPropertyValue("--wave-color").trim(),
        end: cs.color,
      };
    };

    let colors = readColors();
    let resync: (() => void) | null = null;

    // A wrapper splits its child blocks, so their characters form one ordered run.
    const targets = Tag === "div" ? Array.from(el.children) : el;

    const split = new SplitText(targets, {
      type: "words, chars",
      autoSplit: true,
      onSplit(self) {
        const chars = self.chars;
        const activeChars = new Set<Element>();
        const progress = { value: 0 };
        let isReady = false;

        // Flag the wrapper once every character has switched on, so follow-up
        // effects (like About's underlines) can start after the wave ends.
        const markComplete = () => el.toggleAttribute("data-wave-complete", progress.value >= 0.999);

        // Snap every character to its state for the current progress, no animation.
        const syncChars = () => {
          markComplete();
          const activeCount = Math.round(progress.value * chars.length);
          chars.forEach((char, index) => {
            const isActive = index < activeCount;
            gsap.killTweensOf(char);
            gsap.set(char, { color: isActive ? colors.end : colors.start });
            if (isActive) activeChars.add(char);
            else activeChars.delete(char);
          });
        };
        resync = syncChars;

        return gsap.context(() => {
          gsap.set(chars, { color: colors.start });

          gsap.to(progress, {
            value: 1,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: scrollStart,
              end: scrollEnd,
              scrub,
              onRefresh: () => {
                isReady = false;
                syncChars();
                requestAnimationFrame(() => {
                  isReady = true;
                });
              },
            },
            onUpdate: () => {
              markComplete();
              if (!isReady) return;

              const activeCount = Math.round(progress.value * chars.length);
              chars.forEach((char, index) => {
                const isActive = index < activeCount;

                if (isActive && !activeChars.has(char)) {
                  activeChars.add(char);
                  gsap.killTweensOf(char);
                  gsap
                    .timeline()
                    .to(char, { color: colors.wave, duration: waveDuration * 0.3, ease: "power2.out" })
                    .to(char, { color: colors.end, duration: waveDuration * 0.7, ease: "power2.in" });
                }

                if (!isActive && activeChars.has(char)) {
                  activeChars.delete(char);
                  gsap.killTweensOf(char);
                  gsap.to(char, { color: colors.start, duration: waveDuration * 0.5, ease: "none" });
                }
              });
            },
          });
        }, el);
      },
    });

    // Theme switches change the token colours; re-read them and repaint the characters.
    const onThemeChange = () => {
      colors = readColors();
      resync?.();
    };
    const observer = new MutationObserver(onThemeChange);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    mql.addEventListener("change", onThemeChange);

    return () => {
      observer.disconnect();
      mql.removeEventListener("change", onThemeChange);
      split.revert();
    };
  }, [Tag, scrollStart, scrollEnd, waveDuration, scrub]);

  return (
    <Tag ref={ref} id={id} data-gradient-wave-text className={className}>
      {children}
    </Tag>
  );
}
