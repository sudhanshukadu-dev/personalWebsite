"use client";

import { Children, useEffect, useRef, type ReactNode } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react/ssr";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(Draggable, InertiaPlugin, CustomEase);

/*
  Spatial cards slider, ported from the reference Sudhanshu shared. The cards sit on a
  circle seen in perspective, so the one in front faces the reader and the rest curve
  away to either side. It can be dragged and thrown, stepped with the arrows, or jumped
  with the dots, and it wraps around forever.

  React owns the cards and the dots; the script only measures them, positions them every
  frame, and clones cards onto the end when there are too few to fill the curve (which
  it takes back on cleanup). The geometry comes from four custom properties on the
  container: --slider-gap, --slider-curve, --slider-perspective and --slider-direction.
  Styles live in globals.css (.spatial-slider).
*/

const SLIDE_DURATION = 1;

export function SpatialSlider({ label, children }: { label: string; children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const collectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const slides = Children.toArray(children);
  const count = slides.length;

  useEffect(() => {
    const container = containerRef.current;
    const collection = collectionRef.current;
    const track = trackRef.current;
    if (!container || !collection || !track) return;

    CustomEase.create("spatial", "0.25, 0.1, 0, 1");

    let draggable: Draggable | null = null;
    let proxy: HTMLElement | null = null;
    let clones: HTMLElement[] = [];

    const teardown = () => {
      draggable?.kill();
      draggable = null;
      clones.forEach((clone) => clone.remove());
      clones = [];
      if (proxy) {
        gsap.killTweensOf(proxy);
        proxy.remove();
        proxy = null;
      }
    };

    const build = () => {
      teardown();
      gsap.set(track, { clearProps: "transform" });

      const originalItems = gsap.utils.toArray<HTMLElement>(
        ":scope > [data-spatial-slider-item]:not([data-spatial-slider-clone])",
        track,
      );
      if (!originalItems.length) return;
      originalItems.forEach((item) => gsap.set(item, { clearProps: "transform" }));

      const controls = gsap.utils.toArray<HTMLButtonElement>("[data-spatial-slider-control]", container);
      const mod = (value: number, total: number) => ((value % total) + total) % total;

      // The curve's shape, read from the container so CSS stays in charge of it.
      const containerStyles = getComputedStyle(container);
      const trackStyles = getComputedStyle(track);
      const curve = Math.abs(parseFloat(containerStyles.getPropertyValue("--slider-curve"))) || 12;
      const directionValue = parseFloat(containerStyles.getPropertyValue("--slider-direction"));
      const direction = directionValue < 0 ? -1 : 1;
      const gap = parseFloat(trackStyles.columnGap) || 0;
      const curveRadians = (curve * Math.PI) / 180;

      const firstRect = originalItems[0].getBoundingClientRect();
      const itemWidth = firstRect.width;
      const itemHeight = firstRect.height;
      if (!itemWidth) return;

      const perspectiveValue = parseFloat(trackStyles.perspective);
      const perspective = Number.isFinite(perspectiveValue) ? perspectiveValue : 1200;

      // Where a card's edge lands on screen once the perspective has had its way with it.
      const getProjectedEdgeX = (radius: number, angle: number, side: number) => {
        const radians = (angle * Math.PI) / 180;
        const rotation = -direction * radians;
        const localX = (side * itemWidth) / 2;
        const centerX = Math.sin(radians) * radius;
        const centerZ = direction * radius * (1 - Math.cos(radians));
        const x = centerX + localX * Math.cos(rotation);
        const z = centerZ - localX * Math.sin(rotation);
        return (x * perspective) / (perspective - z);
      };

      // Widen the circle until the projected gap between two cards matches the CSS gap.
      let spatialRadius = itemWidth / Math.sin(curveRadians);
      for (let i = 0; i < 8; i++) {
        const currentGap = getProjectedEdgeX(spatialRadius, curve, -1) - itemWidth / 2;
        spatialRadius += (gap - currentGap) / Math.sin(curveRadians);
      }

      const stepDistance = Math.sin(curveRadians) * spatialRadius;
      const tangentRatio = (-direction * spatialRadius) / (perspective - direction * spatialRadius);
      const edgeAngle = (Math.acos(gsap.utils.clamp(-1, 1, tangentRatio)) * 180) / Math.PI;
      const maxSideItems = Math.ceil(edgeAngle / curve);
      const maxLoopItems = maxSideItems * 2;

      const getSpatialPosition = (offset: number) => {
        const angle = gsap.utils.clamp(-edgeAngle, edgeAngle, offset * curve);
        const radians = (angle * Math.PI) / 180;
        return {
          x: Math.sin(radians) * spatialRadius,
          z: direction * spatialRadius * (1 - Math.cos(radians)),
          rotationY: -direction * angle,
        };
      };

      // How many cards it takes to fill the screen, so the loop never shows a gap.
      const containerRect = container.getBoundingClientRect();
      const trackRect = track.getBoundingClientRect();
      const originX = trackRect.left + trackRect.width / 2;
      const leftLimit = containerRect.left - originX;
      const rightLimit = containerRect.right - originX;

      const isOffsetInside = (offset: number) => {
        if (Math.abs(offset * curve) >= edgeAngle) return false;
        const position = getSpatialPosition(offset);
        const scale = perspective / (perspective - position.z);
        const radians = (Math.abs(position.rotationY) * Math.PI) / 180;
        const halfWidth = (Math.abs(Math.cos(radians)) * itemWidth * scale) / 2;
        const x = position.x * scale;
        return x + halfWidth >= leftLimit && x - halfWidth <= rightLimit;
      };

      let left = 0;
      let right = 0;
      for (let i = 1; i < maxSideItems && isOffsetInside(i); i++) right = i;
      for (let i = 1; i < maxSideItems && isOffsetInside(-i); i++) left = i;
      const minItemsNeeded = Math.min(maxLoopItems, 1 + left + right + 2);

      const neededItems =
        originalItems.length >= minItemsNeeded
          ? originalItems.length
          : Math.ceil(minItemsNeeded / originalItems.length) * originalItems.length;

      for (let i = originalItems.length; i < neededItems; i++) {
        const clone = originalItems[i % originalItems.length].cloneNode(true) as HTMLElement;
        clone.setAttribute("data-spatial-slider-clone", "");
        clone.setAttribute("aria-hidden", "true");
        clone.querySelectorAll("video").forEach((video) => video.remove());
        track.appendChild(clone);
        clones.push(clone);
      }

      const items = gsap.utils.toArray<HTMLElement>(":scope > [data-spatial-slider-item]", track);
      const totalItems = items.length;

      track.style.height = `${itemHeight}px`;
      container.dataset.spatialSliderDragStatus = "grab";

      // An invisible element carries the position; the cards are drawn from it.
      proxy = document.createElement("div");
      Object.assign(proxy.style, { position: "absolute", width: "1px", height: "1px", pointerEvents: "none", opacity: "0" });
      container.appendChild(proxy);
      gsap.set(proxy, { x: 0 });

      const setX = items.map((item) => gsap.quickSetter(item, "x", "px"));
      const setZ = items.map((item) => gsap.quickSetter(item, "z", "px"));
      const setRotationY = items.map((item) => gsap.quickSetter(item, "rotationY", "deg"));

      const getIndex = () => -(gsap.getProperty(proxy, "x") as number) / stepDistance;
      const nearestDelta = (index: number, realIndex: number) =>
        index - (realIndex - Math.round((realIndex - index) / totalItems) * totalItems);

      // The shortest way round to a given card, since the loop runs both ways.
      const getSlideDelta = (target: number, realIndex: number) => {
        let bestDelta = 0;
        let bestDistance = Infinity;
        items.forEach((_, index) => {
          if (index % originalItems.length !== target) return;
          const delta = nearestDelta(index, realIndex);
          if (Math.abs(delta) < bestDistance) {
            bestDelta = delta;
            bestDistance = Math.abs(delta);
          }
        });
        return bestDelta;
      };

      let lastActiveIndex: number | null = null;

      const updateActiveUI = (activeIndex: number, activeSlideIndex: number) => {
        if (activeIndex === lastActiveIndex) return;
        items.forEach((item, index) => {
          item.dataset.spatialSliderItemStatus = index === activeIndex ? "active" : "inview";
        });
        controls.forEach((button) => {
          const value = button.dataset.spatialSliderControl ?? "";
          if (!/^\d+$/.test(value)) return;
          const isActive = parseInt(value, 10) - 1 === activeSlideIndex;
          button.dataset.spatialSliderControlStatus = isActive ? "active" : "not-active";
          button.setAttribute("aria-current", String(isActive));
        });
        lastActiveIndex = activeIndex;
      };

      const render = () => {
        const realIndex = getIndex();
        const activeIndex = mod(Math.round(realIndex), totalItems);
        items.forEach((item, index) => {
          const position = getSpatialPosition(nearestDelta(index, realIndex));
          setX[index](position.x);
          setZ[index](position.z);
          setRotationY[index](position.rotationY);
        });
        updateActiveUI(activeIndex, activeIndex % originalItems.length);
      };

      controls.forEach((button) => {
        const value = button.dataset.spatialSliderControl ?? "";
        button.onclick = () => {
          gsap.killTweensOf(proxy);
          const currentIndex = getIndex();
          let targetIndex: number;

          if (value === "next" || value === "prev") {
            targetIndex = Math.round(currentIndex) + (value === "next" ? 1 : -1);
          } else if (/^\d+$/.test(value)) {
            const targetSlide = gsap.utils.clamp(0, originalItems.length - 1, parseInt(value, 10) - 1);
            targetIndex = currentIndex + getSlideDelta(targetSlide, currentIndex);
          } else {
            return;
          }

          gsap.to(proxy, { x: -targetIndex * stepDistance, duration: SLIDE_DURATION, ease: "spatial", onUpdate: render });
        };
      });

      const setStatus = (status: "grab" | "grabbing") => {
        container.dataset.spatialSliderDragStatus = status;
      };

      draggable = Draggable.create(proxy, {
        type: "x",
        trigger: collection,
        inertia: true,
        throwResistance: 2000,
        dragResistance: 0.05,
        maxDuration: 1,
        minDuration: 0.5,
        edgeResistance: 0.75,
        overshootTolerance: 0,
        snap: (value: number) => Math.round(value / stepDistance) * stepDistance,
        onDrag: render,
        onThrowUpdate: render,
        onThrowComplete: () => {
          setStatus("grab");
          render();
        },
        onPress: () => setStatus("grabbing"),
        onDragStart: () => setStatus("grabbing"),
        onRelease: () => setStatus("grab"),
      })[0];

      render();
    };

    build();

    // Only a change of width changes the geometry; a phone's address bar sliding
    // away should not rebuild the whole thing.
    let lastWidth = window.innerWidth;
    let timer = 0;
    const onResize = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (window.innerWidth === lastWidth) return;
        lastWidth = window.innerWidth;
        build();
      }, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(timer);
      teardown();
    };
  }, [count]);

  return (
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      data-spatial-slider-drag-status="grab"
      className="spatial-slider"
    >
      <div ref={collectionRef} className="spatial-slider__collection">
        <div ref={trackRef} role="group" aria-label="Slides" className="spatial-slider__list">
          {slides.map((slide, index) => (
            <div
              key={index}
              data-spatial-slider-item
              role="group"
              aria-label={`Slide ${index + 1} of ${count}`}
              className="spatial-slider__item"
            >
              {slide}
            </div>
          ))}
        </div>
      </div>

      <div className="spatial-slider__controls">
        <button
          type="button"
          data-spatial-slider-control="prev"
          aria-label="Previous slide"
          className="spatial-slider__btn"
        >
          <CaretLeft size={18} weight="bold" aria-hidden />
        </button>

        <div className="spatial-slider__dots">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              data-spatial-slider-control={index + 1}
              data-spatial-slider-control-status={index === 0 ? "active" : "not-active"}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === 0}
              className="spatial-slider__dot"
            />
          ))}
        </div>

        <button
          type="button"
          data-spatial-slider-control="next"
          aria-label="Next slide"
          className="spatial-slider__btn is--next"
        >
          <CaretRight size={18} weight="bold" aria-hidden />
        </button>
      </div>
    </div>
  );
}
