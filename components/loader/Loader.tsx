"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { introCards, site } from "@/content/home";
import { cancelIntroFailsafe } from "@/lib/intro";

gsap.registerPlugin(CustomEase);

/*
  Intro loader: "dropping cards", adapted from the reference Sudhanshu shared.
  Runs once per browser session (add ?intro to the URL to replay). The pre-paint
  script in app/layout.tsx sets <html data-intro data-loading> when it should play.

  1. A deck of photo cards springs into a stack.
  2. Cards drop off the bottom one by one while the deck re-stacks.
  3. The background slides away, the hero ([data-loading-header]) settles in
     from above, and the name at the bottom slips out.
*/

const SCALE_DECREASE = 0.1;
const Y_OFFSET = -7.5;
const TOTAL_FALL_STAGGER = 0.75;
const DECK_MOVE_DURATION = 1;
const ROTATION_PATTERN = [-10, 10, -15, 10, 20];
const X_PATTERN = [-5, 7.5, 10, 5, -10];
const IMAGE_WAIT_MS = 1200;

const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));
const patternValue = (pattern: number[], index: number) => pattern[index % pattern.length];

// Resolves once the tab is on screen. A background tab pauses GSAP's frame loop,
// so the intro holds (page still covered) until someone is actually looking.
function whenVisible() {
  if (document.visibilityState === "visible") return Promise.resolve();
  return new Promise<void>((resolve) => {
    const onChange = () => {
      if (document.visibilityState !== "visible") return;
      document.removeEventListener("visibilitychange", onChange);
      resolve();
    };
    document.addEventListener("visibilitychange", onChange);
  });
}

function getStack(index: number, total: number) {
  const reverseIndex = total - 1 - index;
  return {
    scale: 1 - reverseIndex * SCALE_DECREASE,
    yPercent: reverseIndex * Y_OFFSET,
  };
}

const stackProp = (prop: "scale" | "yPercent", total: number) => (index: number) =>
  getStack(index, total)[prop];

export function Loader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    const html = document.documentElement;
    if (!root || html.dataset.intro !== "on") return;

    cancelIntroFailsafe();
    let cancelled = false;

    // Hands the page back: scrolling, paused entrance animations, delayed timers.
    const reveal = () => {
      delete html.dataset.loading;
      try {
        sessionStorage.setItem("intro-seen", "1");
      } catch {
        // Storage can be blocked. The intro just plays again next time.
      }
      window.dispatchEvent(new Event("intro:done"));
    };

    const finish = () => {
      delete html.dataset.intro;
      setDone(true);
    };

    CustomEase.create("osmo", "M0,0 C0.625,0.05 0,1 1,1");

    const cardsList = root.querySelector("[data-loading-cards-list]");
    const cards = gsap.utils.toArray<HTMLElement>("[data-loading-card]", root);
    const background = root.querySelector("[data-loading-background]");
    const logo = root.querySelector("[data-loading-logo]");
    const header = document.querySelectorAll<HTMLElement>("[data-loading-header]");
    const images = Array.from(root.querySelectorAll("img"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {}, root);

    const play = () => {
      if (cancelled) return;
      ctx.add(() => {
        if (reduceMotion) {
          gsap
            .timeline({ onComplete: finish })
            .add(reveal, 0.4)
            .to(root, { autoAlpha: 0, duration: 0.3 });
          return;
        }

        const getFallY = (card: HTMLElement) => {
          const containerRect = root.getBoundingClientRect();
          const cardRect = card.getBoundingClientRect();
          return containerRect.bottom - cardRect.top + cardRect.height;
        };

        const tl = gsap.timeline({ onComplete: finish });

        tl.fromTo(cardsList, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.5);

        tl.fromTo(
          cards,
          { rotate: 0.001, scale: 0.5, yPercent: 0 },
          {
            rotate: 0.001,
            scale: stackProp("scale", cards.length),
            yPercent: stackProp("yPercent", cards.length),
            stagger: -0.05,
            duration: 1.5,
            ease: "elastic.out(1,0.7)",
          },
          "<",
        );

        const fallCards = cards.slice().reverse();
        const fallStagger = TOTAL_FALL_STAGGER / Math.max(cards.length - 1, 1);
        const fallStart = tl.duration();

        fallCards.forEach((card, fallIndex) => {
          const remainingCards = cards.slice(0, cards.indexOf(card));
          const fallTime = fallStart + fallIndex * fallStagger;

          if (remainingCards.length) {
            tl.to(
              remainingCards,
              {
                scale: stackProp("scale", remainingCards.length),
                yPercent: stackProp("yPercent", remainingCards.length),
                duration: DECK_MOVE_DURATION,
                ease: "sine.inOut",
              },
              fallTime,
            );
          }

          tl.to(
            card,
            {
              y: () => getFallY(card),
              xPercent: patternValue(X_PATTERN, fallIndex),
              rotate: patternValue(ROTATION_PATTERN, fallIndex),
              duration: 0.8,
              ease: "power4.in",
            },
            fallTime,
          );
        });

        tl.to(background, { rotate: 0.001, yPercent: 100, duration: 1.5, ease: "osmo" }, "-=0.6");
        tl.add(reveal, "<");

        if (header.length) {
          tl.from(
            header,
            { rotate: 0.001, yPercent: -25, scale: 1.1, duration: 1.5, ease: "osmo", clearProps: "transform" },
            "<",
          );
        }

        tl.to(logo, { rotate: 0.001, yPercent: 100, opacity: 0, duration: 0.8, ease: "power4.in" }, "<-=1.5");
      });
    };

    // Give the card photos a moment to decode so the deck never springs in empty,
    // then wait until the tab is visible before starting.
    const decoded = Promise.all(images.map((img) => img.decode().catch(() => undefined)));
    Promise.race([decoded, wait(IMAGE_WAIT_MS)]).then(whenVisible).then(play);

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      data-loading-container
      className="intro pointer-events-none fixed inset-0 z-(--z-loader)"
    >
      <div className="pointer-events-auto absolute inset-0 flex items-center justify-center overflow-clip text-[#eef0f2]">
        <div data-loading-background className="absolute inset-0 bg-[#111316]" />

        <p
          data-loading-logo
          className="absolute bottom-8 font-(family-name:--font-unbounded) text-[length:clamp(1rem,1.6vw,1.5rem)] font-bold leading-none tracking-[-0.01em]"
        >
          {site.logo}
        </p>

        <div
          data-loading-cards-list
          aria-hidden
          className="relative flex items-center justify-center opacity-0"
        >
          {introCards.map((src) => (
            <div
              key={src}
              data-loading-card
              className="absolute aspect-[3/4] w-[10em] overflow-hidden rounded-[0.5em] bg-[#1c1e22] text-[length:max(1.5vw,2em)]"
            >
              <Image src={src} alt="" fill sizes="(min-width: 2134px) 15vw, 320px" className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      <span role="status" className="sr-only">
        Loading {site.name}&apos;s portfolio
      </span>
    </div>
  );
}
