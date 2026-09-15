"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

/*
  Sticky section nav for long case studies. A floating bar slides down once the
  hero has scrolled away and back up past the last section. It marks the section
  being read, slides a blue highlight to it, and fills a thin progress line.
  Wide screens list every section; narrower ones show the current section and
  open a menu of all of them. Links are plain hashes, so SmoothAnchors scrolls
  and moves focus. Scroll work writes to the DOM directly; React state only
  changes when the active section, visibility or menu actually change.
*/

export type SectionNavItem = { id: string; label: string; number?: string };

type SectionNavProps = {
  label: string;
  menuLabel: string;
  items: SectionNavItem[];
  // The element that must scroll out of view before the nav appears (the hero).
  startId: string;
};

// Where a section counts as "being read", as a share of the viewport height.
const READING_LINE = 0.35;

export function SectionNav({ label, menuLabel, items, startId }: SectionNavProps) {
  const navRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  // Track the active section, whether the nav should show, and reading progress.
  useEffect(() => {
    const start = document.getElementById(startId);
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null);
    if (!sections.length) return;

    let lastActive = -1;
    let lastVisible: boolean | null = null;

    const update = () => {
      const viewport = window.innerHeight;
      const line = viewport * READING_LINE;
      const firstTop = sections[0].getBoundingClientRect().top;
      const lastBottom = sections[sections.length - 1].getBoundingClientRect().bottom;
      const startBottom = start ? start.getBoundingClientRect().bottom : firstTop;

      let index = 0;
      sections.forEach((section, i) => {
        if (section.getBoundingClientRect().top <= line) index = i;
      });
      if (index !== lastActive) {
        lastActive = index;
        setActive(index);
      }

      const nextVisible = startBottom <= 80 && lastBottom > viewport * 0.45;
      if (nextVisible !== lastVisible) {
        lastVisible = nextVisible;
        setVisible(nextVisible);
      }

      const progress = Math.min(1, Math.max(0, (line - firstTop) / (lastBottom - firstTop)));
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
    };

    const initial = window.setTimeout(update, 0);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.clearTimeout(initial);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items, startId]);

  // Slide the highlight under the active link (wide screens).
  useEffect(() => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    if (!list || !indicator) return;

    const place = () => {
      const link = list.querySelectorAll<HTMLElement>("a")[active];
      if (!link) return;
      indicator.style.setProperty("--x", `${link.offsetLeft}px`);
      indicator.style.setProperty("--w", `${link.offsetWidth}px`);
    };

    place();
    document.fonts?.ready.then(place);
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

  // The menu closes on Escape or a click outside the nav.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const current = items[active] ?? items[0];
  const menuOpen = open && visible;

  return (
    <nav
      ref={navRef}
      aria-label={label}
      data-visible={visible}
      className="section-nav fixed inset-x-0 top-3 z-(--z-nav) mx-auto w-[min(calc(100vw-1.5rem),24rem)] sm:top-4 lg:w-fit"
    >
      <div className="relative rounded-full border border-bento-ink/10 bg-bento-card p-1 shadow-[0_12px_32px_-18px_rgba(15,16,18,0.45)]">
        {/* Wide screens: every section, with a sliding highlight on the current one. */}
        <div className="relative hidden lg:block">
          <span
            ref={indicatorRef}
            aria-hidden
            className="section-nav-indicator absolute inset-y-0 left-0 rounded-full bg-bento-blue"
          />
          <ul ref={listRef} className="relative flex items-center">
            {items.map((item, index) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={index === active ? "location" : undefined}
                  className={cn(
                    "flex h-9 items-center rounded-full px-3.5 text-[14px] font-medium transition-colors duration-300",
                    index === active ? "text-bento-on-blue" : "text-bento-muted hover:text-bento-ink",
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Narrower screens: the current section, opening a menu of all of them. */}
        <div className="lg:hidden">
          <button
            ref={buttonRef}
            type="button"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setOpen((value) => !value)}
            className="flex h-10 w-full items-center gap-3 rounded-full pl-4 pr-3 text-left"
          >
            {current.number ? (
              <span className="font-mono text-[12px] tracking-[0.06em] text-bento-muted">{current.number}</span>
            ) : null}
            <span className="flex-1 truncate text-[15px] font-medium text-bento-ink">
              <span className="sr-only">{menuLabel}: </span>
              {current.label}
            </span>
            <CaretDown
              size={16}
              weight="bold"
              aria-hidden
              className={cn("text-bento-muted transition-transform duration-300", menuOpen && "rotate-180")}
            />
          </button>

          <div
            id={menuId}
            hidden={!menuOpen}
            className="section-nav-panel absolute inset-x-0 top-full mt-2 max-h-[calc(100dvh-6rem)] overflow-y-auto rounded-[24px] border border-bento-ink/10 bg-bento-card p-2 shadow-[0_24px_48px_-24px_rgba(15,16,18,0.45)]"
          >
            <ul className="flex flex-col">
              {items.map((item, index) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    aria-current={index === active ? "location" : undefined}
                    className={cn(
                      "flex h-11 items-center gap-3 rounded-[16px] px-3 text-[15px] font-medium",
                      index === active ? "bg-(--bento-tint) text-bento-ink" : "text-bento-muted hover:text-bento-ink",
                    )}
                  >
                    <span className="w-6 font-mono text-[12px] tracking-[0.06em]">{item.number ?? ""}</span>
                    {item.label}
                    {index === active ? <span aria-hidden className="ml-auto size-2 rounded-full bg-bento-blue" /> : null}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Reading progress along the bottom edge of the bar. */}
        <span aria-hidden className="pointer-events-none absolute inset-x-6 -bottom-px h-0.5 overflow-hidden rounded-full">
          <span
            ref={progressRef}
            className="block h-full origin-left bg-bento-blue"
            style={{ transform: "scaleX(0)" }}
          />
        </span>
      </div>
    </nav>
  );
}
