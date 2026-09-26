"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(Observer, ScrollTrigger);

/*
  Wavy logo marquee, ported from the reference Sudhanshu shared. Round logo cards run in
  a loop along a sine wave: they drift on their own, speed up and change direction with
  the scroll, and can be dragged. React renders one static row of cards, which is what a
  reader without JavaScript sees; the script clones that row enough times to fill the
  screen twice over into its own element, which React never touches, and moves that.
  Styles live in globals.css (.logo-marquee, .logo-card).
*/

export type LogoItem = { name: string; src?: string; width?: number; height?: number };

// The reference's numbers, kept as they were.
const AUTO_SPEED = 100;
const SCROLL_SPEED = 0.0075;
const DRAG_SPEED = 0.5;
const MAX_DRAG_SPEED = 75;
const DRAG_EASE = 0.1;
const WAVE_Y = 0.25;
const WAVE_BOOST = 0.01;
const ITEMS_PER_WAVE = 10;
const WAVE_TRAVEL = 0.25;
// Width, then how far it drifts and how deep the wave runs, at that width and up.
const VIEWPORTS: [number, number, number][] = [
  [992, 1, 1],
  [768, 0.75, 1],
  [480, 0.6, 0.75],
  [0, 0.5, 0.75],
];

type Card = HTMLElement & { _x?: number; _width?: number; _height?: number; _setY?: (value: number) => void };

export function LogoMarquee({ items, label }: { items: LogoItem[]; label: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sourceRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const source = sourceRef.current;
    const list = listRef.current;
    if (!container || !source || !list) return;
    // Without motion the static row is the whole feature.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const originals = Array.from(source.children).map((item) => item.cloneNode(true) as HTMLElement);
    if (!originals.length) return;
    container.dataset.ready = "";

    const viewportScales = () => VIEWPORTS.find(([min]) => window.innerWidth >= min)!.slice(1) as [number, number];
    const setX = gsap.quickSetter(list, "x", "px");
    const FULL_CIRCLE = Math.PI * 2;

    let cards: Card[] = [];
    let loopWidth = 0;
    let waveLength = 0;
    let averageWidth = 1;
    let travel = 0;
    let pausePadding = 0;
    let speed = 1;
    let targetSpeed = 1;
    let direction = -1;
    let isActive = false;
    let isDragging = false;
    let [speedScale, waveScale] = viewportScales();

    const addBatch = () => {
      const fragment = document.createDocumentFragment();
      originals.forEach((item) => fragment.appendChild(item.cloneNode(true)));
      list.appendChild(fragment);
    };

    const render = () => {
      if (!loopWidth || !waveLength) return;
      const x = gsap.utils.wrap(-loopWidth, 0, travel);
      const depth = WAVE_Y + (speed - 1) * WAVE_BOOST;
      const phaseTravel = (travel / waveLength) * FULL_CIRCLE * WAVE_TRAVEL;
      const width = container.offsetWidth;
      setX(x);
      for (const card of cards) {
        const cardX = card._x! + x;
        if (cardX + card._width! < 0 || cardX > width) continue;
        const phase = (cardX / waveLength) * FULL_CIRCLE + phaseTravel;
        card._setY!(Math.sin(phase) * card._height! * depth);
      }
    };

    const buildLoop = () => {
      list.replaceChildren();
      addBatch();
      addBatch();

      const first = Array.from(list.children) as Card[];
      loopWidth = first[originals.length].offsetLeft - first[0].offsetLeft;
      for (let i = 2; i < Math.max(2, Math.ceil(container.offsetWidth / loopWidth) + 1); i++) addBatch();

      cards = Array.from(list.children) as Card[];
      averageWidth = first.slice(0, originals.length).reduce((sum, card) => sum + card.offsetWidth, 0) / originals.length;
      waveLength = Math.max(container.offsetWidth, averageWidth * ITEMS_PER_WAVE) * waveScale;

      let maxHeight = 0;
      for (const card of cards) {
        card._x = card.offsetLeft;
        card._width = card.offsetWidth;
        card._height = card.offsetHeight;
        card._setY = gsap.quickSetter(card, "y", "px") as (value: number) => void;
        maxHeight = Math.max(maxHeight, card._height);
      }
      pausePadding = maxHeight * (Math.abs(WAVE_Y) + 1);
      render();
    };

    const tick = (_: number, deltaTime: number) => {
      if (!isActive || !loopWidth) return;
      speed += ((targetSpeed !== 1 ? targetSpeed : 1) - speed) * DRAG_EASE;
      if (targetSpeed !== 1) targetSpeed += (1 - targetSpeed) * DRAG_EASE;
      travel += (AUTO_SPEED * speedScale * speed * direction * deltaTime) / 1000;
      render();
    };

    const observer = Observer.create({
      target: container,
      type: "touch,pointer",
      lockAxis: true,
      onChangeX: (self) => {
        if (!isActive || !self.deltaX) return;
        isDragging = true;
        container.style.cursor = "grabbing";
        direction = self.deltaX > 0 ? 1 : -1;
        const dragAmount = (Math.abs(self.deltaX) / averageWidth) * 100 * DRAG_SPEED;
        targetSpeed = Math.min(1 + dragAmount, MAX_DRAG_SPEED);
      },
      onRelease: () => {
        isDragging = false;
        container.style.cursor = "grab";
      },
    });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: () => `top-=${pausePadding}px bottom`,
      end: () => `bottom+=${pausePadding}px top`,
      invalidateOnRefresh: true,
      onToggle: (self) => {
        isActive = self.isActive;
      },
      onUpdate: (self) => {
        if (isDragging) return;
        direction = self.direction === 1 ? 1 : -1;
        speed = 1 + Math.abs(self.getVelocity()) * SCROLL_SPEED;
      },
    });

    buildLoop();
    isActive = ScrollTrigger.isInViewport(container);
    gsap.ticker.add(tick);

    let lastWidth = window.innerWidth;
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (window.innerWidth === lastWidth) return;
        lastWidth = window.innerWidth;
        [speedScale, waveScale] = viewportScales();
        buildLoop();
        ScrollTrigger.refresh();
      }, 150);
    };
    window.addEventListener("resize", onResize);

    return () => {
      observer.kill();
      trigger.kill();
      gsap.ticker.remove(tick);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(resizeTimer);
      gsap.killTweensOf(list);
      list.replaceChildren();
      delete container.dataset.ready;
    };
  }, [items]);

  return (
    <div ref={containerRef} className="logo-marquee">
      {/* The row React owns: the reader's copy, and the script's template. */}
      <div ref={sourceRef} aria-label={label} role="list" className="logo-marquee__row is--source">
        {items.map((item, index) => (
          // Keyed by file: several marks share the name "Client logo".
          <div key={item.src ?? `${item.name}-${index}`} role="listitem" className="logo-card">
            {item.src ? (
              <Image
                src={item.src}
                alt={item.name === "Client logo" ? "" : item.name}
                width={item.width ?? 160}
                height={item.height ?? 64}
                // An SVG mark is served as it is; there is nothing to optimise.
                unoptimized={item.src.endsWith(".svg")}
                className="logo-card__img"
              />
            ) : (
              // TODO: swap for the client's mark once the logos are cleared for use.
              <span aria-hidden className="logo-card__placeholder" />
            )}
            <span className="sr-only">{item.name}</span>
          </div>
        ))}
      </div>
      {/* The row the script builds and moves. */}
      <div ref={listRef} aria-hidden className="logo-marquee__row is--loop" />
    </div>
  );
}
