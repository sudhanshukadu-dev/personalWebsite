"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/*
  Click to zoom, ported from the reference Sudhanshu shared. Clicking an element
  marked [data-click-zoom] (or pressing Enter or Space on it) clones its image or
  video into a fixed lightbox and FLIP-animates it from its place on the page to fit
  the screen over a darkening backdrop. Clicking, scrolling or Escape sends it back
  to where it came from, following the page if it has scrolled. An image clone asks
  the browser for a sharper srcset candidate at its enlarged size; a video clone
  keeps playing, muted, from the same moment. Focus returns to the trigger on close.
  Under reduced motion it opens and closes instantly. Rendered once in the root
  layout; styles live in globals.css (.click-zoom__lightbox).
*/

const OPEN_DURATION = 0.55;
const CLOSE_DURATION = 0.45;
const FADE_DURATION = 0.3;
const TRANSPARENT = "rgba(0, 0, 0, 0)";

type Rect = { top: number; left: number; width: number; height: number };
type Media = HTMLImageElement | HTMLVideoElement;

const computeFlip = (src: Rect, dst: Rect) => ({
  scaleX: src.width / dst.width,
  scaleY: src.height / dst.height,
  tx: src.left + src.width / 2 - (dst.left + dst.width / 2),
  ty: src.top + src.height / 2 - (dst.top + dst.height / 2),
});

const isReady = (media: Media) =>
  media instanceof HTMLVideoElement
    ? media.readyState >= 2 && media.videoWidth > 0
    : media.complete && media.naturalWidth > 0;

export function ClickZoom() {
  const lightboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lightbox = lightboxRef.current;
    if (!lightbox) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const time = (seconds: number) => (reduceMotion ? 0.01 : seconds);
    const backdropColor = getComputedStyle(lightbox).backgroundColor;

    let clone: Media | null = null;
    let trigger: HTMLElement | null = null;
    let sourceRect: Rect | null = null; // in document coordinates
    let isOpen = false;
    let isAnimating = false;
    let openScrollY = 0;

    const onOverlayClick = () => close();
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const onScroll = () => {
      if (Math.abs(window.scrollY - openScrollY) >= 2) close();
    };

    const attachCloseListeners = () => {
      lightbox.addEventListener("click", onOverlayClick);
      document.addEventListener("keydown", onEscape);
      window.addEventListener("scroll", onScroll, { passive: true });
    };

    const detachCloseListeners = () => {
      lightbox.removeEventListener("click", onOverlayClick);
      document.removeEventListener("keydown", onEscape);
      window.removeEventListener("scroll", onScroll);
    };

    const open = (media: Media, from: HTMLElement) => {
      if (isOpen || isAnimating || !isReady(media)) return;
      isAnimating = true;
      trigger = from;
      openScrollY = window.scrollY;

      const srcRect = media.getBoundingClientRect();
      sourceRect = { top: srcRect.top + window.scrollY, left: srcRect.left, width: srcRect.width, height: srcRect.height };
      const srcStyles = getComputedStyle(media);

      // A bare copy: next/image's fill styles and page classes are dropped.
      const zoomed = media.cloneNode(false) as Media;
      zoomed.removeAttribute("style");
      zoomed.removeAttribute("class");

      gsap.set(lightbox, { display: "flex", backgroundColor: TRANSPARENT });
      const lightboxStyles = getComputedStyle(lightbox);
      const maxWidth =
        lightbox.clientWidth - parseFloat(lightboxStyles.paddingLeft) - parseFloat(lightboxStyles.paddingRight);
      const maxHeight =
        lightbox.clientHeight - parseFloat(lightboxStyles.paddingTop) - parseFloat(lightboxStyles.paddingBottom);
      const aspect = srcRect.width / srcRect.height;
      let width = maxWidth;
      let height = width / aspect;
      if (height > maxHeight) {
        height = maxHeight;
        width = height * aspect;
      }

      if (zoomed instanceof HTMLVideoElement && media instanceof HTMLVideoElement) {
        // React sets `muted` as a property, which cloning doesn't carry over.
        zoomed.muted = true;
        zoomed.loop = true;
        zoomed.playsInline = true;
        zoomed.controls = false;
        zoomed.currentTime = media.currentTime;
        zoomed.play().catch(() => {});
      } else if (zoomed instanceof HTMLImageElement) {
        zoomed.loading = "eager";
        // Let the browser pick a srcset candidate for the enlarged size.
        zoomed.sizes = `${Math.ceil(width)}px`;
      }
      gsap.set(zoomed, { width, height, objectFit: srcStyles.objectFit, objectPosition: srcStyles.objectPosition });

      lightbox.replaceChildren(zoomed);
      clone = zoomed;
      const flip = computeFlip(srcRect, zoomed.getBoundingClientRect());

      lightbox.setAttribute("aria-hidden", "false");
      lightbox.focus({ preventScroll: true });

      gsap
        .timeline({
          onComplete: () => {
            isAnimating = false;
            isOpen = true;
            attachCloseListeners();
          },
        })
        .to(lightbox, { backgroundColor: backdropColor, duration: time(FADE_DURATION), ease: "none" }, 0)
        .fromTo(
          zoomed,
          { x: flip.tx, y: flip.ty, scaleX: flip.scaleX, scaleY: flip.scaleY },
          { x: 0, y: 0, scaleX: 1, scaleY: 1, duration: time(OPEN_DURATION), ease: "power3.out" },
          0,
        );
    };

    const close = () => {
      if (!isOpen || isAnimating || !clone || !sourceRect) return;
      isAnimating = true;
      detachCloseListeners();

      const zoomed = clone;
      const source = sourceRect;
      const dstRect = zoomed.getBoundingClientRect();
      const start = {
        x: Number(gsap.getProperty(zoomed, "x")) || 0,
        y: Number(gsap.getProperty(zoomed, "y")) || 0,
        scaleX: Number(gsap.getProperty(zoomed, "scaleX")) || 1,
        scaleY: Number(gsap.getProperty(zoomed, "scaleY")) || 1,
      };
      const state = { t: 0 };

      gsap.to(state, {
        t: 1,
        duration: time(CLOSE_DURATION),
        ease: "power2.inOut",
        onUpdate: () => {
          // Recomputed every frame, so the media lands where its source is now.
          const flip = computeFlip({ ...source, top: source.top - window.scrollY }, dstRect);
          const t = state.t;
          gsap.set(zoomed, {
            x: start.x + (flip.tx - start.x) * t,
            y: start.y + (flip.ty - start.y) * t,
            scaleX: start.scaleX + (flip.scaleX - start.scaleX) * t,
            scaleY: start.scaleY + (flip.scaleY - start.scaleY) * t,
          });
        },
        onComplete: () => {
          gsap.set(lightbox, { display: "none", clearProps: "backgroundColor" });
          if (zoomed instanceof HTMLVideoElement) zoomed.pause();
          zoomed.remove();
          clone = null;
          sourceRect = null;
          lightbox.setAttribute("aria-hidden", "true");
          isOpen = false;
          isAnimating = false;
          trigger?.focus({ preventScroll: true });
          trigger = null;
        },
      });

      gsap.to(lightbox, {
        backgroundColor: TRANSPARENT,
        duration: time(FADE_DURATION),
        ease: "power2.in",
        delay: time(CLOSE_DURATION) * 0.4,
      });
    };

    const mediaFor = (element: HTMLElement): Media | null =>
      element instanceof HTMLImageElement || element instanceof HTMLVideoElement
        ? element
        : element.querySelector<Media>("img, video");

    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-click-zoom]") : null;
      const media = target ? mediaFor(target) : null;
      if (!target || !media) return;
      event.preventDefault();
      open(media, target);
    };

    const onTriggerKey = (event: KeyboardEvent) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const target =
        event.target instanceof HTMLElement && event.target.matches("[data-click-zoom]") ? event.target : null;
      const media = target ? mediaFor(target) : null;
      if (!target || !media) return;
      event.preventDefault();
      open(media, target);
    };

    document.addEventListener("click", onDocumentClick);
    document.addEventListener("keydown", onTriggerKey);

    return () => {
      document.removeEventListener("click", onDocumentClick);
      document.removeEventListener("keydown", onTriggerKey);
      detachCloseListeners();
      gsap.killTweensOf(lightbox);
      if (clone) gsap.killTweensOf(clone);
    };
  }, []);

  return (
    <div
      ref={lightboxRef}
      data-click-zoom-lightbox
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged image"
      aria-hidden="true"
      tabIndex={-1}
      className="click-zoom__lightbox"
    />
  );
}
