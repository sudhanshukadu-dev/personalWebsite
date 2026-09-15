"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ArrowUpRight } from "@phosphor-icons/react";
import { ThemeSwitch } from "@/components/theme/ThemeSwitch";
import { navLinks, navSecondary, site } from "@/content/home";
import { cn } from "@/lib/cn";

gsap.registerPlugin(CustomEase);

/*
  Expanding bottom navigation, adapted from the reference Sudhanshu shared.

  Closed: a small bar with the wordmark and a blue menu toggle.
  Open: the container grows up and out, the toggle bars cross, and the links
  rise in with a stagger. One paused timeline holds both halves: it plays to
  `enterEnd` to open, then carries on through the close half.

  Closes on the toggle, Escape, a link click, or a click outside the nav.
  Under reduced motion the states snap instead of animating.
*/

type Dimensions = { closedW: number; closedH: number; openW: number; openH: number };

const OPEN_BAR = { top: { y: "0.175em", rotation: 45 }, bottom: { y: "-0.175em", rotation: -45 } };

export function BottomNav() {
  const navRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    const inner = innerRef.current;
    const bar = barRef.current;
    const panel = panelRef.current;
    const toggle = toggleRef.current;
    if (!nav || !inner || !bar || !panel || !toggle) return;

    CustomEase.create("osmo", "M0,0 C0.625,0.05 0,1 1,1");

    const reveals = panel.querySelectorAll("[data-bottom-nav-reveal]");
    const barTop = toggle.querySelector("[data-toggle-bar='top']");
    const barBottom = toggle.querySelector("[data-toggle-bar='bottom']");
    const divider = panel.querySelector("[data-bottom-nav-divider]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let isOpen = false;
    let enterEnd = 0;
    let dimensions: Dimensions = { closedW: 0, closedH: 0, openW: 0, openH: 0 };
    let tl: gsap.core.Timeline | null = null;
    let resizeTimer = 0;

    // Temporarily lays the container out at both sizes to read real pixel values.
    const measure = (): Dimensions => {
      const w = inner.style.width;
      const h = inner.style.height;
      inner.style.width = "var(--open-width)";
      inner.style.height = "auto";
      const openW = inner.offsetWidth;
      const openH = inner.offsetHeight;
      inner.style.width = "var(--closed-width)";
      const closedW = inner.offsetWidth;
      inner.style.width = w;
      inner.style.height = h;
      return { closedW, closedH: bar.offsetHeight, openW, openH };
    };

    const snap = (open: boolean) => {
      gsap.set(inner, open ? { width: dimensions.openW, height: dimensions.openH } : { width: dimensions.closedW, height: dimensions.closedH });
      gsap.set(panel, { autoAlpha: open ? 1 : 0 });
      gsap.set(reveals, { autoAlpha: open ? 1 : 0, yPercent: 0 });
      if (divider) gsap.set(divider, { autoAlpha: open ? 1 : 0, scaleX: 1 });
      gsap.set(barTop, open ? OPEN_BAR.top : { y: 0, rotation: 0 });
      gsap.set(barBottom, open ? OPEN_BAR.bottom : { y: 0, rotation: 0 });
    };

    const ctx = gsap.context(() => {
      dimensions = measure();
      gsap.set(inner, { width: dimensions.closedW, height: dimensions.closedH });

      if (reduceMotion) {
        snap(false);
        return;
      }

      const timeline = gsap.timeline({
        paused: true,
        defaults: { ease: "osmo", easeReverse: "power2.inOut" },
      });

      timeline
        .to(inner, { width: () => dimensions.openW, height: () => dimensions.openH, duration: 0.65 }, 0)
        .to(barTop, { ...OPEN_BAR.top, duration: 0.4, ease: "back.out(2)", easeReverse: "power3.out" }, 0.05)
        .to(barBottom, { ...OPEN_BAR.bottom, duration: 0.4, ease: "back.out(2)", easeReverse: "power3.out" }, 0.05)
        .set(panel, { autoAlpha: 1 }, 0.1)
        .fromTo(
          reveals,
          { autoAlpha: 0, yPercent: 100 },
          { autoAlpha: 1, yPercent: 0, duration: 0.6, stagger: 0.03 },
          0.1,
        );

      if (divider) {
        timeline.fromTo(divider, { scaleX: 0, autoAlpha: 0 }, { scaleX: 1, autoAlpha: 1, duration: 1.1 }, 0);
      }

      enterEnd = timeline.duration();
      timeline.addPause();

      // Close half
      timeline
        .to(reveals, { autoAlpha: 0, yPercent: 10, duration: 0.25, stagger: { each: 0.01, from: "end" } })
        .to(
          inner,
          { width: () => dimensions.closedW, height: () => dimensions.closedH, duration: 0.45, ease: "power3.inOut" },
          "<",
        )
        .to([barTop, barBottom], { y: 0, rotation: 0, duration: 0.3, ease: "power3.in" }, "<")
        .set(panel, { autoAlpha: 0 });

      tl = timeline;
    }, nav);

    const setState = (open: boolean) => {
      isOpen = open;
      nav.dataset.bottomNavOpen = String(open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      panel.toggleAttribute("inert", !open);
    };

    const toggleNav = () => {
      setState(!isOpen);

      if (reduceMotion || !tl) {
        dimensions = measure();
        snap(isOpen);
        return;
      }

      if (isOpen) {
        // Re-measure on every open so late-loading fonts can't leave it short.
        dimensions = measure();
        tl.invalidate();
        if (tl.time() >= enterEnd) tl.timeScale(1).restart();
        else tl.timeScale(1).play();
      } else if (tl.time() < enterEnd) {
        tl.timeScale(1).reverse();
      } else {
        tl.timeScale(1).play();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        toggleNav();
        toggle.focus();
      }
    };

    const onPanelClick = (event: MouseEvent) => {
      if (isOpen && event.target instanceof Element && event.target.closest("a")) toggleNav();
    };

    const onPointerDown = (event: PointerEvent) => {
      if (isOpen && event.target instanceof Node && !nav.contains(event.target)) toggleNav();
    };

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        dimensions = measure();
        if (isOpen) {
          gsap.set(inner, { width: dimensions.openW, height: dimensions.openH });
        } else {
          tl?.invalidate();
          gsap.set(inner, { width: dimensions.closedW, height: dimensions.closedH });
        }
      }, 150);
    };

    toggle.addEventListener("click", toggleNav);
    panel.addEventListener("click", onPanelClick);
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("resize", onResize);

    return () => {
      toggle.removeEventListener("click", toggleNav);
      panel.removeEventListener("click", onPanelClick);
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("resize", onResize);
      window.clearTimeout(resizeTimer);
      ctx.revert();
    };
  }, []);

  return (
    <nav
      ref={navRef}
      aria-label="Primary"
      data-bottom-nav-open="false"
      className="fixed bottom-6 left-1/2 z-(--z-nav) -translate-x-1/2 [--bar-height:4em] [--closed-width:min(90vw,15em)] [--open-width:min(90vw,25em)] md:bottom-8"
    >
      <div
        ref={innerRef}
        className="relative flex h-(--bar-height) w-(--closed-width) flex-col-reverse items-center justify-start overflow-hidden rounded-[0.5em] border border-bento-ink/20 bg-bento-card"
      >
        <div
          ref={barRef}
          className="relative flex h-(--bar-height) w-full flex-none items-center justify-between py-2 pl-4 pr-2"
        >
          <Link
            href="/#top"
            aria-label={`${site.name}, home`}
            data-cursor-hover
            data-cursor-text={site.name}
            className="flex items-center font-(family-name:--font-unbounded) text-[15px] font-bold leading-none tracking-[-0.01em] text-bento-ink"
          >
            {site.logo}
          </Link>
          <button
            ref={toggleRef}
            type="button"
            aria-expanded="false"
            aria-controls="site-menu"
            aria-label="Open menu"
            className="flex size-10 flex-col items-center justify-center gap-1 rounded-[0.3125em] bg-bento-blue p-0 text-bento-on-blue"
          >
            <span data-toggle-bar="top" className="block h-[0.1em] w-5 flex-none bg-current" />
            <span data-toggle-bar="bottom" className="block h-[0.1em] w-5 flex-none bg-current" />
          </button>
        </div>

        <div
          ref={panelRef}
          id="site-menu"
          inert
          className="invisible flex max-h-[calc(100svh-7em)] w-(--open-width) flex-none flex-col gap-6 overflow-y-auto overscroll-contain px-4 pb-4 pt-5 [scrollbar-width:none]"
        >
          <ul className="flex flex-col items-start">
            {navLinks.map((link) => (
              <li key={link.href} data-bottom-nav-reveal className="block">
                <a
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1 py-[0.2em] text-[2em] font-medium leading-none tracking-[-0.05em]",
                    link.cta ? "text-bento-blue" : "text-bento-ink",
                  )}
                >
                  {link.label}
                  {link.cta ? <ArrowUpRight size="0.8em" weight="bold" aria-hidden /> : null}
                </a>
              </li>
            ))}
          </ul>

          <div data-bottom-nav-divider className="h-px w-full bg-bento-ink/20" />

          <div className="flex flex-wrap items-start gap-x-12 gap-y-6">
            {navSecondary.map((group) => (
              <div key={group.label} className="flex flex-col items-start gap-3">
                <span data-bottom-nav-reveal className="font-mono text-[0.75em] uppercase leading-none text-bento-ink/65">
                  {group.label}
                </span>
                <ul className="flex flex-col items-start">
                  {group.links.map((link) => (
                    <li key={link.label} data-bottom-nav-reveal className="block">
                      <a
                        href={link.href}
                        {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="block py-[0.25em] text-[1em] font-medium leading-none tracking-[-0.02em] text-bento-ink"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="flex flex-col items-start gap-3">
              <span data-bottom-nav-reveal className="font-mono text-[0.75em] uppercase leading-none text-bento-ink/65">
                Theme
              </span>
              <div data-bottom-nav-reveal className="py-[0.25em]">
                <ThemeSwitch />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
