"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

/*
  What someone said, ported from the reference Sudhanshu shared: a card with the quote
  set large, who said it underneath, and the source's mark above when there is one.
  Where there are several, the lines of the old one fade out as the new one's rise in,
  the mark slides up and out while the next slides in, and the dots along the bottom
  fill as the clock runs, so the wait is visible rather than a surprise. It only counts
  down while it is on screen, and holds while the pointer or the keyboard is inside it.
  With a single quote there is no clock and no dots, just the card. Under reduced motion
  the quotes cross-fade. Styles live in globals.css (.quote-card).
*/

export type Testimonial = { quote: string; name: string; role: string; logo?: string };

const AUTOPLAY_SECONDS = 6;

export function Testimonials({ items, label }: { items: Testimonial[]; label?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || items.length < 2) return;

    const cards = gsap.utils.toArray<HTMLElement>("[data-quote-item]", root);
    const dots = gsap.utils.toArray<HTMLElement>("[data-quote-dot]", root);
    const fills = dots.map((dot) => dot.querySelector<HTMLElement>("[data-quote-fill]"));
    if (cards.length < 2) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let activeIndex = 0;
    let transition: gsap.core.Timeline | null = null;
    let timer: gsap.core.Tween | null = null;
    let isInView = false;
    let isHeld = false;

    const slides = cards.map((card) => ({
      card,
      logo: card.querySelector<HTMLElement>("[data-quote-logo]"),
      splits: reduceMotion
        ? []
        : gsap.utils
            .toArray<HTMLElement>("[data-quote-split]", card)
            .map((element) => SplitText.create(element, { type: "lines", autoSplit: true })),
    }));
    const linesOf = (index: number) => slides[index].splits.flatMap((split) => split.lines);

    const setStatus = (index: number, status: "active" | "leaving" | "inactive") => {
      const isActive = status === "active";
      slides[index].card.dataset.status = status;
      slides[index].card.setAttribute("aria-hidden", String(!isActive));
      dots[index].dataset.status = isActive ? "active" : "inactive";
      dots[index].setAttribute("aria-current", String(isActive));
    };

    const updateTimer = () => {
      if (!timer) return;
      if (isInView && !isHeld) timer.resume();
      else timer.pause();
    };

    const startTimer = () => {
      timer?.kill();
      gsap.set(fills.filter(Boolean), { scaleX: 0 });
      timer = gsap.fromTo(
        fills[activeIndex],
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: AUTOPLAY_SECONDS,
          ease: "none",
          onComplete: () => goTo((activeIndex + 1) % slides.length),
        },
      );
      updateTimer();
    };

    function goTo(nextIndex: number) {
      if (nextIndex === activeIndex) return;
      transition?.progress(1);

      const outgoing = activeIndex;
      const incoming = nextIndex;
      const outgoingLines = linesOf(outgoing);
      const incomingLines = linesOf(incoming);

      setStatus(outgoing, "leaving");
      setStatus(incoming, "active");
      activeIndex = nextIndex;
      startTimer();

      transition = gsap.timeline({
        onComplete: () => {
          setStatus(outgoing, "inactive");
          gsap.set(
            [...outgoingLines, ...incomingLines, slides[outgoing].logo, slides[incoming].logo, slides[outgoing].card, slides[incoming].card].filter(
              Boolean,
            ),
            { clearProps: "transform,opacity" },
          );
          transition = null;
        },
      });

      if (reduceMotion) {
        transition
          .to(slides[outgoing].card, { opacity: 0, duration: 0.4, ease: "power2.out" }, 0)
          .fromTo(slides[incoming].card, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" }, 0);
        return;
      }

      transition
        .to(outgoingLines, { opacity: 0, duration: 0.4, ease: "power2.out", stagger: { amount: 0.1 } }, 0)
        .fromTo(
          incomingLines,
          { opacity: 0, yPercent: 40 },
          { opacity: 1, yPercent: 0, duration: 0.8, ease: "power3.out", stagger: { amount: 0.3 } },
          0.35,
        );

      if (slides[outgoing].logo) {
        transition.to(slides[outgoing].logo, { yPercent: -110, duration: 0.6, ease: "power4.inOut" }, 0);
      }
      if (slides[incoming].logo) {
        transition.fromTo(slides[incoming].logo, { yPercent: 110 }, { yPercent: 0, duration: 0.7, ease: "power4.inOut" }, 0.15);
      }
    }

    const onDotClick = (index: number) => () => goTo(index);
    const clicks = dots.map((dot, index) => {
      const handler = onDotClick(index);
      dot.addEventListener("click", handler);
      return () => dot.removeEventListener("click", handler);
    });

    const hold = () => {
      isHeld = true;
      updateTimer();
    };
    const release = (event: Event) => {
      if (event.type === "focusout" && root.contains((event as FocusEvent).relatedTarget as Node | null)) return;
      isHeld = false;
      updateTimer();
    };
    root.addEventListener("pointerenter", hold);
    root.addEventListener("pointerleave", release);
    root.addEventListener("focusin", hold);
    root.addEventListener("focusout", release);

    const observer = new IntersectionObserver(([entry]) => {
      isInView = entry.isIntersecting;
      updateTimer();
    });
    observer.observe(root);

    slides.forEach((_, index) => setStatus(index, index === activeIndex ? "active" : "inactive"));
    startTimer();

    return () => {
      timer?.kill();
      transition?.kill();
      observer.disconnect();
      clicks.forEach((off) => off());
      root.removeEventListener("pointerenter", hold);
      root.removeEventListener("pointerleave", release);
      root.removeEventListener("focusin", hold);
      root.removeEventListener("focusout", release);
      slides.forEach((slide) => slide.splits.forEach((split) => split.revert()));
    };
  }, [items]);

  const many = items.length > 1;

  return (
    <div ref={rootRef} className="quote-card">
      {label ? <p className="quote-card__label">{label}</p> : null}

      <div className="quote-card__card">
        <div role="list" className="quote-card__list">
          {items.map((item, index) => (
            <blockquote
              key={item.name}
              role="listitem"
              data-quote-item
              data-status={index === 0 ? "active" : "inactive"}
              aria-hidden={many && index !== 0}
              className="quote-card__item"
            >
              {item.logo ? (
                <span className="quote-card__logo-slot">
                  <Image
                    data-quote-logo
                    src={item.logo}
                    alt=""
                    width={160}
                    height={40}
                    unoptimized={item.logo.endsWith(".svg")}
                    className="quote-card__logo"
                  />
                </span>
              ) : null}

              {/* The marks live here, not in the copy, so every quote gets them. */}
              <p data-quote-split className="quote-card__quote">
                “{item.quote}”
              </p>

              <footer className="quote-card__who">
                <span data-quote-split className="quote-card__name">
                  {item.name}
                </span>
                <span data-quote-split className="quote-card__role">
                  {item.role}
                </span>
              </footer>
            </blockquote>
          ))}
        </div>

        {many ? (
          <div className="quote-card__dots">
            {items.map((item, index) => (
              <button
                key={item.name}
                type="button"
                data-quote-dot
                data-status={index === 0 ? "active" : "inactive"}
                aria-label={`Show what ${item.name} said`}
                className="quote-card__dot"
              >
                <span className="quote-card__dot-bar">
                  <span data-quote-fill className="quote-card__dot-fill" />
                </span>
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
