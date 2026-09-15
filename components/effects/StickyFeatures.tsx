"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
  Sticky features, adapted from the reference Sudhanshu shared.
  The block pins for (count - 1) screens of scroll. As it advances, the next
  image opens from the centre with a clip-path reveal (closing again when
  scrolling back), the text swaps with a fade-and-rise stagger, and a bar
  along the image tracks overall progress. Styles live in globals.css
  (.sticky-features__*). Under reduced motion the swaps are near-instant.
*/

export type StickyFeature = {
  tag: string;
  title: string;
  summary: string;
  href: string;
  image: { src: string; alt: string };
};

type Props = {
  items: StickyFeature[];
  linkLabel: string;
};

const DURATION = 0.75;
const DURATION_REDUCED = 0.01;
const EASE = "power4.inOut";
const SCROLL_AMOUNT = 0.9; // share of the pinned scroll used for step changes

export function StickyFeatures({ items, linkLabel }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const visualWraps = gsap.utils.toArray<HTMLElement>("[data-sticky-feature-visual-wrap]", wrap);
    const textItems = gsap.utils.toArray<HTMLElement>("[data-sticky-feature-item]", wrap);
    const progressBar = wrap.querySelector("[data-sticky-feature-progress]");
    const count = Math.min(visualWraps.length, textItems.length);
    if (count < 1) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduceMotion ? DURATION_REDUCED : DURATION;
    const getTexts = (el: HTMLElement) => Array.from(el.querySelectorAll<HTMLElement>("[data-sticky-feature-text]"));

    const animateOut = (itemEl: HTMLElement) => {
      gsap.to(getTexts(itemEl), {
        autoAlpha: 0,
        y: -30,
        ease: "power4.out",
        duration: 0.4,
        overwrite: "auto",
        onComplete: () => {
          gsap.set(itemEl, { autoAlpha: 0 });
        },
      });
    };

    const animateIn = (itemEl: HTMLElement) => {
      gsap.set(itemEl, { autoAlpha: 1 });
      gsap.fromTo(
        getTexts(itemEl),
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, ease: "power4.out", duration, stagger: 0.1, overwrite: "auto" },
      );
    };

    const transition = (fromIndex: number, toIndex: number) => {
      if (fromIndex === toIndex) return;
      if (fromIndex < toIndex) {
        gsap.to(visualWraps[toIndex], { clipPath: "inset(0% round 0.75em)", duration, ease: EASE, overwrite: "auto" });
      } else {
        gsap.to(visualWraps[fromIndex], { clipPath: "inset(50% round 0.75em)", duration, ease: EASE, overwrite: "auto" });
      }
      animateOut(textItems[fromIndex]);
      animateIn(textItems[toIndex]);
    };

    const ctx = gsap.context(() => {
      gsap.set(visualWraps[0], { clipPath: "inset(0% round 0.75em)" });
      gsap.set(textItems[0], { autoAlpha: 1 });

      let currentIndex = 0;
      const steps = Math.max(1, count - 1);

      ScrollTrigger.create({
        trigger: wrap,
        start: "center center",
        end: () => `+=${steps * 100}%`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = Math.min(self.progress, SCROLL_AMOUNT) / SCROLL_AMOUNT;
          const idx = Math.max(0, Math.min(steps, Math.floor(p * steps + 1e-6)));

          if (progressBar) gsap.to(progressBar, { scaleX: p, ease: "none", overwrite: "auto" });

          if (idx !== currentIndex) {
            transition(currentIndex, idx);
            currentIndex = idx;
          }
        },
      });
    }, wrap);

    return () => {
      ctx.revert();
      gsap.killTweensOf([...visualWraps, ...textItems.flatMap(getTexts), ...textItems]);
    };
  }, []);

  return (
    // The outer div stays React's; ScrollTrigger inserts its pin spacer inside it.
    <div>
      <div ref={wrapRef} data-sticky-feature-wrap className="sticky-features__wrap px-6 sm:px-12 lg:px-24 xl:px-36">
        <div className="sticky-features__scroll">
          <div className="sticky-features__container">
            <div className="sticky-features__col is--img">
              <div className="sticky-features__img-list">
                {items.map((item) => (
                  <div key={item.title} data-sticky-feature-visual-wrap className="sticky-features__img-item">
                    {/* Eager: all four share one spot and are revealed within a few screens of scroll. */}
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      loading="eager"
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="sticky-features__progress-w">
                <div className="sticky-features__progress-bar" data-sticky-feature-progress />
              </div>
            </div>

            <div className="sticky-features__col">
              <div className="sticky-features__text-list">
                {items.map((item) => (
                  <div key={item.title} data-sticky-feature-item className="sticky-features__text-item">
                    <span data-sticky-feature-text className="sticky-features__tag">
                      {item.tag}
                    </span>
                    <h3 data-sticky-feature-text className="sticky-features__heading">
                      {item.title}
                    </h3>
                    <p data-sticky-feature-text className="sticky-features__p">
                      {item.summary}
                    </p>
                    <a data-sticky-feature-text href={item.href} className="sticky-features__p is--link">
                      {linkLabel}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
