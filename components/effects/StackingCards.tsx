"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

/*
  Featured Work as a stack of full-screen cards, ported from the reference Sudhanshu
  shared. Each project is a card in its case study's colour with rounded top corners.
  A card sticks to the top of the screen, holding the whole viewport to itself, until
  the next one slides up over it. While that happens the card behind drifts down at
  half speed and its mockup lifts and tilts away. Styles live in globals.css
  (.stack-card*), where the hold is the extra height on .stack-card. Under reduced
  motion the stack stays and the drift is dropped.
*/

export type StackingCard = {
  tag: string;
  // A quiet line above the title: what the project is, in two or three words.
  kicker: string;
  title: string;
  summary: string;
  chips: string[];
  // Project theme, the same as its case study: it colours the card, the chips and the link.
  color: "blue" | "yellow" | "purple" | "green";
  href: string;
  // The card's middle: the project's mockup when it has one (click to enlarge), otherwise
  // the case study's headline and one true stat.
  poster: { headline: string; figure: string; caption: string };
  mockup?: { src: string; alt: string; width: number; height: number };
};

type Props = {
  items: StackingCard[];
  // Repeated in every card's top corner, like a running head.
  label: string;
  linkLabel: string;
};

export function StackingCards({ items, label, linkLabel }: Props) {
  const listRef = useRef<HTMLDivElement>(null);
  const total = String(items.length).padStart(2, "0");

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = gsap.utils.toArray<HTMLElement>("[data-stacking-card]", list);
    if (cards.length < 2) return;

    const ctx = gsap.context(() => {
      // Each card drives the one behind it, from the moment it enters (which is the
      // moment the one behind stops holding the screen) until it fills the screen.
      cards.forEach((card, index) => {
        if (index === 0) return;
        const previous = cards[index - 1].querySelector<HTMLElement>("[data-stacking-card-pane]");
        if (!previous) return;
        const previousMedia = previous.querySelector<HTMLElement>("[data-stacking-card-media]");

        const timeline = gsap.timeline({
          defaults: { ease: "none", duration: 1 },
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "top top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });

        timeline.fromTo(previous, { yPercent: 0 }, { yPercent: 50 });
        if (previousMedia) {
          timeline.fromTo(previousMedia, { rotate: 0, yPercent: 0 }, { rotate: -5, yPercent: -25 }, "<");
        }
      });
    }, list);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={listRef} className="stack-cards">
      {items.map((item) => (
        // The section is taller than the screen; the pane inside it sticks, so each
        // project holds the whole viewport before the next card covers it.
        <section key={item.title} data-stacking-card data-project-color={item.color} className="stack-card">
          <article data-stacking-card-pane className="stack-card__pane">
            <div aria-hidden className="grain" data-grain-animate="true" />
            <div className="stack-card__inner">
              <p aria-hidden className="stack-card__top">
                <span>{label}</span>
                <span>
                  {item.tag} / {total}
                </span>
              </p>

              <div className="stack-card__body">
                <h3 className="stack-card__heading">
                  <span className="stack-card__kicker">{item.kicker}</span>
                  {item.title}
                </h3>

                <div data-stacking-card-media className="stack-card__media">
                  {item.mockup ? (
                    <Image
                      src={item.mockup.src}
                      alt={item.mockup.alt}
                      width={item.mockup.width}
                      height={item.mockup.height}
                      sizes="(min-width: 768px) 55vw, 90vw"
                      data-click-zoom
                      role="button"
                      tabIndex={0}
                      aria-label={`Enlarge mockup: ${item.mockup.alt}`}
                      className="stack-card__mockup"
                    />
                  ) : (
                    /* No mockup yet, so the slot carries the case study's headline and stat
                       at the same size a mockup would be. */
                    <div className="stack-card__poster">
                      <p className="stack-card__poster-headline">{item.poster.headline}</p>
                      <p className="stack-card__poster-stat">
                        <span className="stack-card__poster-figure">{item.poster.figure}</span>
                        <span className="stack-card__poster-caption">{item.poster.caption}</span>
                      </p>
                    </div>
                  )}
                </div>

                <p className="stack-card__summary">{item.summary}</p>

                <ul className="stack-card__chips">
                  {item.chips.map((chip) => (
                    <li key={chip} className="stack-card__chip">
                      {chip}
                    </li>
                  ))}
                </ul>

                {/* The hero's bubble arrow CTA, in the card's colours. */}
                {/* data-page-transition: PageTransition covers the screen in the project's colour before navigating. */}
                <a
                  data-page-transition
                  data-project-color={item.color}
                  href={item.href}
                  aria-label={`${linkLabel}: ${item.title}`}
                  className="btn-bubble-arrow is--on-color"
                >
                  <span aria-hidden className="btn-bubble-arrow__arrow">
                    <ArrowDownRight size="40%" className="btn-bubble-arrow__arrow-svg" />
                  </span>
                  <span className="btn-bubble-arrow__content">
                    <span className="btn-bubble-arrow__content-text">{linkLabel}</span>
                  </span>
                  <span aria-hidden className="btn-bubble-arrow__arrow is--duplicate">
                    <ArrowDownRight size="40%" className="btn-bubble-arrow__arrow-svg" />
                  </span>
                </a>
              </div>
            </div>
          </article>
        </section>
      ))}
    </div>
  );
}
