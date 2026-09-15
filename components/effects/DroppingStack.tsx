"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CaretRight } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger, CustomEase);

/*
  Dropping cards stack, ported from the reference Sudhanshu shared and driven by
  scroll. The stack pins to the screen (heading, cards and controls fill exactly
  one viewport); each step of scroll drops the top card away (down, fading late)
  while the cards behind step forward, and scrolling back lifts cards back into
  place. After the last card the pin releases and the page carries on.

  The prev/next buttons either side of the stack, and the arrow keys while it is
  pinned, scroll the page to the neighbouring card, so they always agree with the
  scroll position. Card positions are computed from the active index, so fast
  scrolls that skip steps still land right. The outer div stays React's;
  ScrollTrigger inserts its pin spacer inside it. Styles live in globals.css
  (.dropping-stack*).
*/

const VISIBLE_COUNT = 4;
const DURATION = 0.75;
// Scroll distance per card, as a share of the viewport height.
const SCROLL_PER_CARD = 0.8;

type DroppingStackProps = {
  heading?: ReactNode;
  prevLabel: string;
  nextLabel: string;
  children: ReactNode;
};

export function DroppingStack({ heading, prevLabel, nextLabel, children }: DroppingStackProps) {
  const pinRef = useRef<HTMLDivElement>(null);
  const collectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const pinEl = pinRef.current;
    const collection = collectionRef.current;
    const list = listRef.current;
    const prevButton = prevRef.current;
    const nextButton = nextRef.current;
    if (!pinEl || !collection || !list) return;

    const cards = Array.from(list.querySelectorAll<HTMLElement>("[data-dropping-stack-item]"));
    const total = cards.length;
    if (total < 2) return;

    CustomEase.create("osmo", "0.625, 0.05, 0, 1");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduceMotion ? 0.01 : DURATION;
    let activeIndex = -1;
    let offsetX = 0;
    let offsetY = 0;
    let trigger: ScrollTrigger | null = null;

    const updateOffsets = () => {
      const styles = getComputedStyle(collection);
      const padRight = parseFloat(styles.paddingRight) || 0;
      const padLeft = parseFloat(styles.paddingLeft) || 0;
      const padBottom = parseFloat(styles.paddingBottom) || 0;
      const padTop = parseFloat(styles.paddingTop) || 0;
      const steps = Math.max(1, VISIBLE_COUNT - 1);
      offsetX = (Math.max(padRight, padLeft) / steps) * (padLeft > padRight ? -1 : 1);
      offsetY = (Math.max(padBottom, padTop) / steps) * (padTop > padBottom ? -1 : 1);
    };

    // Move every card to where it belongs when `index` is the top card.
    const render = (index: number, animate: boolean) => {
      const previous = activeIndex;
      activeIndex = index;
      updateOffsets();
      if (prevButton) prevButton.disabled = index === 0;
      if (nextButton) nextButton.disabled = index === total - 1;

      cards.forEach((card, i) => {
        const depth = i - index;
        gsap.killTweensOf(card);

        // Already read: dropped away below the stack, fading out late.
        if (depth < 0) {
          if (animate && i >= previous) {
            gsap.set(card, { zIndex: 2000 + i });
            gsap.to(card, { x: 0, y: 0, yPercent: 200, duration, ease: "osmo" });
            gsap.to(card, { opacity: 0, duration: duration * 0.2, delay: duration * 0.4, ease: "none" });
          } else {
            gsap.set(card, { x: 0, y: 0, yPercent: 200, opacity: 0, zIndex: 0 });
          }
          return;
        }

        const slot = Math.min(depth, VISIBLE_COUNT);
        const target = { x: offsetX * slot, y: offsetY * slot, yPercent: 0 };
        const opacity = depth < VISIBLE_COUNT ? 1 : 0;
        const zIndex = 999 - depth;

        if (!animate) {
          gsap.set(card, { ...target, opacity, zIndex });
          return;
        }

        // A card coming back from below rides on top while it rises into place.
        const returning = previous > index && i < previous;
        gsap.set(card, { zIndex: returning ? 2000 + (total - i) : zIndex });
        gsap.to(card, {
          ...target,
          duration,
          ease: "osmo",
          onComplete: () => {
            gsap.set(card, { zIndex });
          },
        });
        gsap.to(card, { opacity, duration: returning ? duration * 0.2 : duration * 0.5, ease: "none" });
      });
    };

    const indexFor = (progress: number) => Math.min(total - 1, Math.floor(progress * total));

    // Scroll to the middle of a card's step, so the pinned stack shows that card.
    const goTo = (index: number) => {
      if (!trigger) return;
      const target = Math.max(0, Math.min(total - 1, index));
      const y = trigger.start + (trigger.end - trigger.start) * ((target + 0.5) / total);
      window.scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" });
    };

    const onPrev = () => goTo(activeIndex - 1);
    const onNext = () => goTo(activeIndex + 1);

    const onKeyDown = (event: KeyboardEvent) => {
      if (!trigger?.isActive) return;
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase() ?? "";
      if (tag === "input" || tag === "textarea" || tag === "select" || target?.isContentEditable) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrev();
      }
    };

    const ctx = gsap.context(() => {
      render(0, false);
      trigger = ScrollTrigger.create({
        trigger: pinEl,
        start: "top top",
        end: () => `+=${window.innerHeight * SCROLL_PER_CARD * total}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const index = indexFor(self.progress);
          if (index !== activeIndex) render(index, true);
        },
        onRefresh: (self) => render(indexFor(self.progress), false),
      });
    }, pinEl);

    prevButton?.addEventListener("click", onPrev);
    nextButton?.addEventListener("click", onNext);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      prevButton?.removeEventListener("click", onPrev);
      nextButton?.removeEventListener("click", onNext);
      window.removeEventListener("keydown", onKeyDown);
      ctx.revert();
      gsap.killTweensOf(cards);
      gsap.set(cards, { clearProps: "all" });
    };
  }, []);

  return (
    <div>
      <div ref={pinRef} className="dropping-stack">
        {heading}

        <div className="dropping-stack__stage">
          <button ref={prevRef} type="button" aria-label={prevLabel} className="dropping-stack__control is--prev">
            <span className="dropping-stack__control-circle is--prev">
              <CaretRight size={18} weight="bold" aria-hidden />
            </span>
          </button>

          <div ref={collectionRef} className="dropping-stack__collection">
            <ul ref={listRef} className="dropping-stack__list">
              {children}
            </ul>
          </div>

          <button ref={nextRef} type="button" aria-label={nextLabel} className="dropping-stack__control">
            <span className="dropping-stack__control-circle">
              <CaretRight size={18} weight="bold" aria-hidden />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
