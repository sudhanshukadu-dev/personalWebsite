"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpLeft } from "@phosphor-icons/react";

/*
  The way out of a case study, fixed to the top corner so it's one click away while you
  read. The site's bubble arrow button: at rest the circle carries the keyboard sticker,
  which is how the rest of the site marks the work (the section transition on the home
  page, and the sticker in the footer that leads there). On hover the arrow sweeps in and
  swings round to point back. Past the hero it
  folds down to just that circle so it stops covering headings as they scroll under it,
  and opens back out on hover or keyboard focus. The label stays in the page for screen
  readers when folded.

  It is fixed while the page moves under it, so no one colour works everywhere. As the
  page scrolls it reads the colour actually behind it and sets data-on: "light" turns it
  dark, "dark" (the dark page, the project colour) turns it light, and over the hero it
  keeps its own look. Styles in globals.css (.back-link, .btn-bubble-arrow.is--back).
*/

// Above this relative luminance a surface counts as light (so the button goes dark).
// The project purple sits near 0.13, the page grey near 0.9, the dark page near 0.005.
const LIGHT_SURFACE = 0.4;

const toLinear = (channel: number) => {
  const c = channel / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};
export function BackLink({ label, href, heroId }: { label: string; href: string; heroId: string }) {
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const link = linkRef.current;
    const hero = document.getElementById(heroId);
    if (!link || !hero) return;
    const observer = new IntersectionObserver(([entry]) => {
      link.toggleAttribute("data-compact", !entry.isIntersecting);
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, [heroId]);

  useEffect(() => {
    const link = linkRef.current;
    if (!link) return;

    // Any CSS colour (rgb, oklab from color-mix, ...) resolves to sRGB bytes on a 1px canvas.
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const paint = canvas.getContext("2d", { willReadFrequently: true });
    if (!paint) return;

    const luminanceOf = (color: string) => {
      paint.clearRect(0, 0, 1, 1);
      paint.fillStyle = "#000";
      paint.fillStyle = color;
      paint.fillRect(0, 0, 1, 1);
      const [r, g, b, a] = paint.getImageData(0, 0, 1, 1).data;
      if (a < 128) return null; // see-through: look further back
      return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
    };

    // What's behind the circle: the topmost element under its centre, then up through its
    // ancestors to the first one with a solid background.
    const surface = () => {
      const rect = link.getBoundingClientRect();
      const x = rect.right - rect.height / 2;
      const y = rect.top + rect.height / 2;
      const behind = document.elementsFromPoint(x, y).find((element) => !link.contains(element));
      if (!behind) return "light";
      if (behind.closest(`#${heroId}`)) return "hero";
      for (let node: Element | null = behind; node; node = node.parentElement) {
        const luminance = luminanceOf(getComputedStyle(node).backgroundColor);
        if (luminance !== null) return luminance > LIGHT_SURFACE ? "light" : "dark";
      }
      return "light";
    };

    let frame = 0;
    const update = () => {
      frame = 0;
      const on = surface();
      if (on === "hero") link.removeAttribute("data-on");
      else link.setAttribute("data-on", on);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [heroId]);

  return (
    // A plain anchor on purpose: PageTransition catches the click and navigates once the
    // screen is covered. A next/link would navigate first and skip the transition.
    <a ref={linkRef} href={href} data-page-transition className="btn-bubble-arrow is--back back-link">
      <span aria-hidden className="btn-bubble-arrow__arrow">
        <ArrowUpLeft size="40%" className="btn-bubble-arrow__arrow-svg" />
      </span>
      <span className="btn-bubble-arrow__content">
        <span className="btn-bubble-arrow__content-text">{label}</span>
      </span>
      <span aria-hidden className="btn-bubble-arrow__arrow is--duplicate">
        <Image
          src="/images/stickers/keyboard.png"
          alt=""
          width={112}
          height={98}
          aria-hidden
          className="back-link__sticker"
        />
      </span>
    </a>
  );
}
