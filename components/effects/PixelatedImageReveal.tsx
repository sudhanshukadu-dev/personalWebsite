"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

/*
  Pixelated image reveal, ported from the reference Sudhanshu shared. On hover
  (or keyboard focus), a grid of pixels flicks on in random order, the active
  image swaps in underneath, and the pixels flick off again; leaving reverses
  it. Touch screens toggle on tap.

  Listeners are delegated from the document and cards are looked up per event,
  because the About chip lives inside text that SplitText splits and re-splits,
  which replaces its DOM. The markup (images and pixels) is rendered on the
  server; see .pixel-card in globals.css. Renders nothing itself.
*/

const STEP_DURATION = 0.3;
const CARD = "[data-pixelated-image-reveal]";

export function PixelatedImageReveal() {
  useEffect(() => {
    const delayedCalls = new WeakMap<HTMLElement, gsap.core.Tween>();
    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0 || window.matchMedia("(pointer: coarse)").matches;

    const cardFrom = (target: EventTarget | null) =>
      target instanceof Element ? target.closest<HTMLElement>(CARD) : null;

    const animatePixels = (card: HTMLElement, activate: boolean) => {
      const pixels = card.querySelectorAll<HTMLElement>(".pixel-card__pixel");
      const activeLayer = card.querySelector<HTMLElement>("[data-pixelated-image-reveal-active]");
      if (!pixels.length || !activeLayer) return;

      card.dataset.active = String(activate);
      const stagger = { each: STEP_DURATION / pixels.length, from: "random" as const };

      gsap.killTweensOf(pixels);
      delayedCalls.get(card)?.kill();
      gsap.set(pixels, { display: "none" });
      gsap.to(pixels, { display: "block", duration: 0, stagger });
      delayedCalls.set(
        card,
        gsap.delayedCall(STEP_DURATION, () => {
          activeLayer.style.display = activate ? "block" : "none";
        }),
      );
      gsap.to(pixels, { display: "none", duration: 0, delay: STEP_DURATION, stagger });
    };

    const isActive = (card: HTMLElement) => card.dataset.active === "true";

    // Enter/leave via over/out, ignoring moves between the card's own children.
    const onOver = (event: PointerEvent | FocusEvent) => {
      const card = cardFrom(event.target);
      if (!card || (event.relatedTarget instanceof Node && card.contains(event.relatedTarget))) return;
      if (!isActive(card)) animatePixels(card, true);
    };
    const onOut = (event: PointerEvent | FocusEvent) => {
      const card = cardFrom(event.target);
      if (!card || (event.relatedTarget instanceof Node && card.contains(event.relatedTarget))) return;
      if (isActive(card)) animatePixels(card, false);
    };
    const onClick = (event: MouseEvent) => {
      const card = cardFrom(event.target);
      if (card) animatePixels(card, !isActive(card));
    };

    if (isTouch) {
      document.addEventListener("click", onClick);
    } else {
      document.addEventListener("pointerover", onOver);
      document.addEventListener("pointerout", onOut);
    }
    document.addEventListener("focusin", onOver);
    document.addEventListener("focusout", onOut);

    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerout", onOut);
      document.removeEventListener("focusin", onOver);
      document.removeEventListener("focusout", onOut);
    };
  }, []);

  return null;
}
