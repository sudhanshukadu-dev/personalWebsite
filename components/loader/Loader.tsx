"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { introWords, site } from "@/content/home";
import { cancelIntroFailsafe } from "@/lib/intro";

gsap.registerPlugin(CustomEase);

/*
  Intro loader: "welcoming words", adapted from the reference Sudhanshu shared.
  Runs once per browser session (add ?intro to the URL to replay). The pre-paint
  script in app/layout.tsx sets <html data-intro data-loading> when it should play.

  A dot and a word rise onto a dark screen, the word runs through its greetings,
  then the pair lifts away and the screen fades, with the hero
  ([data-loading-header]) settling in from above behind it.
*/

const WORD_HOLD = 0.15;

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

    const words = root.querySelector<HTMLElement>("[data-loading-words]");
    const target = root.querySelector<HTMLElement>("[data-loading-words-target]");
    const header = document.querySelectorAll<HTMLElement>("[data-loading-header]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {}, root);

    const play = () => {
      if (cancelled) return;
      ctx.add(() => {
        if (reduceMotion) {
          gsap
            .timeline({ onComplete: finish })
            .set(words, { opacity: 1 })
            .add(reveal, 0.8)
            .to(root, { autoAlpha: 0, duration: 0.3 });
          return;
        }

        const tl = gsap.timeline({ onComplete: finish });

        tl.set(words, { yPercent: 50 });
        tl.to(words, { opacity: 1, yPercent: 0, duration: 1, ease: "expo.inOut" });

        // Each greeting in turn, in the one place the word is set.
        introWords.forEach((word) => {
          tl.call(
            () => {
              if (target) target.textContent = word;
            },
            undefined,
            `+=${WORD_HOLD}`,
          );
        });

        tl.to(words, { opacity: 0, yPercent: -75, duration: 0.8, ease: "expo.in" }, `+=${WORD_HOLD}`);
        tl.to(root, { autoAlpha: 0, duration: 0.6, ease: "power1.inOut" }, "-=0.2");
        tl.add(reveal, "<");

        if (header.length) {
          tl.from(
            header,
            { rotate: 0.001, yPercent: -25, scale: 1.1, duration: 1.5, ease: "osmo", clearProps: "transform" },
            "<",
          );
        }
      });
    };

    whenVisible().then(play);

    return () => {
      cancelled = true;
      ctx.revert();
    };
  }, []);

  if (done) return null;

  return (
    <div ref={rootRef} data-loading-container className="intro pointer-events-none fixed inset-0 z-(--z-loader)">
      <div className="loading-screen">
        <p data-loading-words className="loading-words">
          <span aria-hidden className="loading-words__dot" />
          <span data-loading-words-target className="loading-words__word">
            {introWords[0]}
          </span>
        </p>
      </div>

      <span role="status" className="sr-only">
        Loading {site.name}&apos;s portfolio
      </span>
    </div>
  );
}
