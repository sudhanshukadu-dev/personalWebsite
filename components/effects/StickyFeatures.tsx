"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

/*
  Sticky features, adapted from the reference Sudhanshu shared.
  The block pins for (count - 1) screens of scroll. Images change with a
  scroll-scrubbed pixelated transition (ported from Sudhanshu's second
  reference): approaching the change, square pixels in the incoming project's
  colour switch on from the bottom of the image in a scattered sweep; the image
  swaps while fully covered; then the pixels switch off again, bottom first.
  Scrolling back plays it in reverse. The text swaps with a fade-and-rise
  stagger, and a bar along the image tracks overall progress. Styles live in
  globals.css (.sticky-features__*). Under reduced motion images swap instantly.
*/

export type StickyFeature = {
  tag: string;
  title: string;
  summary: string;
  chips: string[];
  // Project theme; tints the CTA's hover circle and the pixels when changing to this project.
  color: "blue" | "yellow" | "purple" | "green";
  href: string;
  image: { src: string; alt: string };
};

type Props = {
  items: StickyFeature[];
  linkLabel: string;
};

const DURATION = 0.75;
const DURATION_REDUCED = 0.01;
const SCROLL_AMOUNT = 0.9; // share of the pinned scroll used for step changes
// Pixel columns across the image; rows follow from the image's height.
const PIXEL_COLUMNS = { desktop: 14, tablet: 10, mobile: 8 };
// How far either side of a change (as a share of one step) the pixels are on screen.
const PIXEL_WINDOW = 0.3;

export function StickyFeatures({ items, linkLabel }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const visualWraps = gsap.utils.toArray<HTMLElement>("[data-sticky-feature-visual-wrap]", wrap);
    const textItems = gsap.utils.toArray<HTMLElement>("[data-sticky-feature-item]", wrap);
    const progressBar = wrap.querySelector("[data-sticky-feature-progress]");
    const pixelGrid = wrap.querySelector<HTMLElement>("[data-sticky-feature-pixels]");
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

    const showVisual = (index: number) => {
      visualWraps.forEach((visual, i) => {
        visual.style.visibility = i === index ? "visible" : "hidden";
      });
    };

    // Pixel grid, ordered bottom rows first with some randomness and a gentle wave
    // across columns. Rebuilt on refresh, since the image size can change.
    let pixels: HTMLElement[] = [];
    let pixelShown: boolean[] = [];

    const buildPixels = () => {
      if (!pixelGrid || reduceMotion) return;
      pixelGrid.replaceChildren();
      pixels = [];
      pixelShown = [];

      const { width, height } = pixelGrid.getBoundingClientRect();
      if (!width || !height) return;

      const columns = window.matchMedia("(max-width: 767px)").matches
        ? PIXEL_COLUMNS.mobile
        : window.matchMedia("(max-width: 991px)").matches
          ? PIXEL_COLUMNS.tablet
          : PIXEL_COLUMNS.desktop;
      const rows = Math.ceil((height / width) * columns);
      pixelGrid.style.setProperty("--pixel-columns", String(columns));

      const cells: { element: HTMLElement; priority: number }[] = [];
      const fragment = document.createDocumentFragment();
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
          const pixel = document.createElement("span");
          pixel.className = "sticky-features__pixel";
          fragment.appendChild(pixel);
          const distance = (rows - 1 - r) / Math.max(1, rows - 1);
          cells.push({ element: pixel, priority: distance * 250 + Math.random() * 300 + Math.sin(c * 0.3) * 30 });
        }
      }
      pixelGrid.appendChild(fragment);
      pixels = cells.sort((a, b) => a.priority - b.priority).map((cell) => cell.element);
    };

    // Before a change, pixels switch on from the start of the order; after it, they
    // switch off from the start, so both halves sweep bottom first.
    const paintPixels = (coverage: number, afterChange: boolean) => {
      const total = pixels.length;
      if (!total) return;
      const on = Math.round(coverage * total);
      pixels.forEach((pixel, i) => {
        const visible = afterChange ? i >= total - on : i < on;
        if (pixelShown[i] === visible) return;
        pixelShown[i] = visible;
        pixel.style.opacity = visible ? "1" : "0";
      });
    };

    const ctx = gsap.context(() => {
      gsap.set(textItems[0], { autoAlpha: 1 });
      showVisual(0);

      let currentIndex = 0;
      const steps = Math.max(1, count - 1);

      const update = (progress: number) => {
        const p = Math.min(progress, SCROLL_AMOUNT) / SCROLL_AMOUNT;
        const position = p * steps;
        const index = Math.max(0, Math.min(steps, Math.round(position)));

        if (progressBar) gsap.to(progressBar, { scaleX: p, ease: "none", overwrite: "auto" });

        // The nearest change sits halfway between two images.
        const boundary = Math.round(position - 0.5) + 0.5;
        const incoming = boundary + 0.5;
        const hasChange = incoming >= 1 && incoming <= steps;
        const coverage = hasChange ? Math.max(0, 1 - Math.abs(position - boundary) / PIXEL_WINDOW) : 0;
        if (pixelGrid && hasChange) pixelGrid.dataset.projectColor = visualWraps[incoming].dataset.projectColor;
        paintPixels(coverage, position >= boundary);

        if (index !== currentIndex) {
          showVisual(index);
          animateOut(textItems[currentIndex]);
          animateIn(textItems[index]);
          currentIndex = index;
        }
      };

      ScrollTrigger.create({
        trigger: wrap,
        start: "center center",
        end: () => `+=${steps * 100}%`,
        pin: true,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => update(self.progress),
        onRefresh: (self) => {
          buildPixels();
          update(self.progress);
        },
      });
    }, wrap);

    return () => {
      ctx.revert();
      gsap.killTweensOf([...textItems.flatMap(getTexts), ...textItems]);
      pixelGrid?.replaceChildren();
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
                  <div
                    key={item.title}
                    data-sticky-feature-visual-wrap
                    data-project-color={item.color}
                    data-click-zoom
                    role="button"
                    tabIndex={0}
                    aria-label={`Enlarge image: ${item.image.alt}`}
                    className="sticky-features__img-item"
                  >
                    {/* Eager: all four share one spot and are revealed within a few screens of scroll. */}
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      loading="eager"
                      sizes="(min-width: 768px) 55vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ))}
                <div aria-hidden data-sticky-feature-pixels className="sticky-features__pixels" />
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
                    <ul data-sticky-feature-text className="sticky-features__chips">
                      {item.chips.map((chip) => (
                        <li key={chip} className="sticky-features__chip">
                          {chip}
                        </li>
                      ))}
                    </ul>
                    {/* The hero's bubble arrow CTA; its hover circle takes the project's colour. */}
                    <a
                      data-sticky-feature-text
                      data-project-color={item.color}
                      href={item.href}
                      aria-label={`${linkLabel}: ${item.title}`}
                      className="btn-bubble-arrow is--on-page"
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
