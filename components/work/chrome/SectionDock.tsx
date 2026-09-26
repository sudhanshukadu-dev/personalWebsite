"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
  Section anchor dock, ported from the reference Sudhanshu shared. It takes the floating
  nav's place at the foot of a case study: a pill naming the section being read, whose
  label slides up or down as you scroll into the next one. Hovering it (or tapping it)
  opens the list of every section, with a pill that hops to the current one. It stays out
  of the way over the hero and after the last section, and anywhere marked
  [data-section-dock-hide]. Links are plain hashes, so SmoothAnchors scrolls to them.

  The label inside the toggle is owned by this script, not React, because it is rebuilt
  on every change; React only renders the empty wrapper. Styles in globals.css
  (.section-dock).
*/

export type SectionDockItem = { id: string; label: string; number?: string };

// "bouncy" is the reference's default; "smooth" drops the overshoot everywhere.
const MOTION: "bouncy" | "smooth" = "bouncy";

export function SectionDock({ items, label }: { items: SectionDockItem[]; label: string }) {
  const dockRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const pill = dock.querySelector<HTMLElement>("[data-section-dock-pill]");
    const toggle = dock.querySelector<HTMLButtonElement>("[data-section-dock-toggle]");
    const labelWrap = dock.querySelector<HTMLElement>("[data-section-dock-label-wrap]");
    const list = dock.querySelector<HTMLElement>("[data-section-dock-list]");
    const indicator = dock.querySelector<HTMLElement>("[data-section-dock-indicator]");
    const links = list ? Array.from(list.querySelectorAll<HTMLAnchorElement>("[data-section-dock-link]")) : [];
    const sections = links.map((link) => document.querySelector<HTMLElement>(link.getAttribute("href") ?? ""));
    if (!pill || !toggle || !labelWrap || !list || !indicator || links.length < 2 || sections.some((s) => !s)) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const canHover = window.matchMedia("(hover: hover)");
    const smooth = () => MOTION === "smooth" || reduceMotion.matches;
    const dur = (d: number) => (reduceMotion.matches ? 0 : d);
    const ease = (bouncy: string, calm: string) => (smooth() ? calm : bouncy);

    let activeIndex = 0;
    let open = false;
    let dockTl: gsap.core.Timeline | null = null;
    const rect = { x: 0, y: 0, w: 0, h: 0 };

    const ctx = gsap.context(() => {
      gsap.set(pill, { transformOrigin: "50% 100%" });
    });

    const syncLinkState = () => {
      links.forEach((link, i) => {
        link.toggleAttribute("data-active", i === activeIndex);
        if (i === activeIndex) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    };

    // The toggle's label is a copy of the active link's contents.
    const buildLabel = (index: number) => {
      const span = document.createElement("span");
      span.className = "section-dock__label";
      span.innerHTML = links[index].innerHTML;
      return span;
    };

    const setLabel = (index: number) => {
      labelWrap.textContent = "";
      labelWrap.appendChild(buildLabel(index));
      gsap.set(labelWrap, { width: "auto" });
    };

    const swapLabel = (index: number, movingDown: boolean) => {
      const olds = Array.from(labelWrap.children) as HTMLElement[];
      const startWidth = labelWrap.offsetWidth;
      gsap.killTweensOf(labelWrap);
      olds.forEach((old) => {
        gsap.killTweensOf(old);
        gsap.set(old, { position: "absolute", top: 0, left: 0 });
        gsap.to(old, {
          yPercent: movingDown ? -120 : 120,
          autoAlpha: 0,
          duration: dur(0.35),
          ease: "power2.out",
          onComplete: () => old.remove(),
        });
      });

      const next = buildLabel(index);
      labelWrap.appendChild(next);
      gsap.set(labelWrap, { width: "auto" });
      const targetWidth = next.offsetWidth;

      gsap.fromTo(
        labelWrap,
        { width: startWidth },
        { width: targetWidth, duration: dur(0.45), ease: ease("back.out(1.6)", "power3.out") },
      );
      gsap.fromTo(
        next,
        { yPercent: movingDown ? 120 : -120, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: dur(0.45), ease: "power3.out" },
      );

      if (!smooth()) {
        gsap.killTweensOf(pill, "scaleY");
        gsap
          .timeline()
          .to(pill, { scaleY: 0.85, duration: 0.15, ease: "power2.out" })
          .to(pill, { scaleY: 1, duration: 0.45, ease: "back.out(2.5)" });
      }
    };

    const rectFor = (link: HTMLElement) => ({
      x: link.offsetLeft,
      y: link.offsetTop,
      w: link.offsetWidth,
      h: link.offsetHeight,
    });

    const render = () => {
      gsap.set(indicator, { x: rect.x, y: rect.y, width: rect.w, height: rect.h });
    };

    const placeIndicator = (index: number) => {
      Object.assign(rect, rectFor(links[index]));
      gsap.killTweensOf(rect);
      gsap.killTweensOf(indicator);
      gsap.set(indicator, { scaleX: 1, scaleY: 1 });
      render();
    };

    const hopIndicator = (index: number) => {
      const target = rectFor(links[index]);
      gsap.killTweensOf(rect);
      gsap.killTweensOf(indicator);

      if (smooth()) {
        gsap.set(indicator, { scaleX: 1, scaleY: 1 });
        gsap.to(rect, { ...target, duration: dur(0.35), ease: "power3.out", onUpdate: render });
        return;
      }

      // Overshoot a little past the target, then settle: the hop.
      const delta = target.y - rect.y;
      const sign = delta === 0 ? 1 : Math.sign(delta);
      const overshoot = gsap.utils.clamp(6, 12, Math.abs(delta) * 0.08) * sign;
      const apexY = gsap.utils.clamp(0, list.clientHeight - target.h, target.y + overshoot);

      gsap.set(indicator, { transformOrigin: "50% 50%" });
      gsap
        .timeline()
        .to(rect, { x: target.x, y: apexY, w: target.w, h: target.h, duration: 0.35, ease: "power3.out", onUpdate: render })
        .to(rect, { y: target.y, duration: 0.25, ease: "power2.inOut", onUpdate: render });
      gsap
        .timeline()
        .to(indicator, { scaleX: 0.78, duration: 0.15, ease: "power2.out" })
        .to(indicator, { scaleY: 1, scaleX: 1, duration: 0.45, ease: "back.out(2.5)" });
    };

    const setActive = (index: number, movingDown: boolean) => {
      if (index === activeIndex) return;
      activeIndex = index;
      syncLinkState();
      if (open) {
        setLabel(index);
        hopIndicator(index);
      } else {
        swapLabel(index, movingDown);
        placeIndicator(index);
      }
    };

    const openDock = () => {
      if (open) return;
      open = true;
      toggle.setAttribute("aria-expanded", "true");
      placeIndicator(activeIndex);

      const fromW = pill.offsetWidth;
      const fromH = pill.offsetHeight;

      dockTl?.kill();
      gsap.set(list, { visibility: "inherit" });
      gsap.set(pill, { width: fromW, height: fromH });
      gsap.set(links[activeIndex], { yPercent: 0, opacity: 1 });

      dockTl = gsap
        .timeline()
        .to(
          pill,
          { width: list.offsetWidth, height: list.offsetHeight, duration: dur(0.45), ease: ease("back.out(1.4)", "power3.out") },
          0,
        )
        .to(toggle, { autoAlpha: 0, duration: dur(0.15), ease: "power1.out" }, 0)
        .to(list, { opacity: 1, duration: dur(0.25), ease: "power1.out" }, dur(0.05))
        .fromTo(
          links.filter((_, i) => i !== activeIndex),
          { yPercent: 40, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: dur(0.25),
            ease: "power2.out",
            stagger: { each: dur(0.05), from: "end" },
          },
          dur(0.05),
        );
    };

    const closeDock = () => {
      if (!open) return;
      open = false;
      toggle.setAttribute("aria-expanded", "false");

      dockTl?.kill();
      dockTl = gsap
        .timeline({
          onComplete: () => {
            gsap.set(pill, { clearProps: "width,height" });
            gsap.set(list, { visibility: "hidden" });
            gsap.set(links, { yPercent: 0, opacity: 1 });
          },
        })
        .to(pill, { width: toggle.offsetWidth, height: toggle.offsetHeight, duration: dur(0.3), ease: "power3.out" }, 0)
        .to(list, { opacity: 0, duration: dur(0.15), ease: "power1.out" }, 0)
        .to(toggle, { autoAlpha: 1, duration: dur(0.25), ease: "power1.out" }, dur(0.1));
    };

    // Which section is being read: the one crossing 45% of the screen.
    const triggers: ScrollTrigger[] = sections.map((section, i) =>
      ScrollTrigger.create({
        trigger: section as HTMLElement,
        start: "top 45%",
        end: "bottom 45%",
        onToggle: (self) => {
          if (self.isActive) setActive(i, self.direction !== -1);
        },
      }),
    );

    // Hidden until the first section, after the last, and over any [data-section-dock-hide].
    let isHidden = true;
    let hideTriggers: ScrollTrigger[] = [];
    let rangeTrigger: ScrollTrigger | null = null;

    gsap.set(dock, { yPercent: 40, autoAlpha: 0 });
    dock.toggleAttribute("data-hidden", true);

    const updateHidden = () => {
      const inRange = rangeTrigger ? rangeTrigger.isActive : true;
      const hidden = !inRange || hideTriggers.some((t) => t.isActive);
      if (hidden === isHidden) return;
      isHidden = hidden;
      if (hidden && open) closeDock();
      dock.toggleAttribute("data-hidden", hidden);
      gsap.to(dock, {
        yPercent: hidden ? 40 : 0,
        autoAlpha: hidden ? 0 : 1,
        duration: dur(0.3),
        ease: hidden ? "power2.out" : ease("back.out(1.4)", "power3.out"),
      });
    };

    rangeTrigger = ScrollTrigger.create({
      trigger: sections[0] as HTMLElement,
      endTrigger: sections[sections.length - 1] as HTMLElement,
      start: "top 45%",
      end: "bottom 45%",
      onToggle: updateHidden,
    });

    hideTriggers = Array.from(document.querySelectorAll<HTMLElement>("[data-section-dock-hide]")).map((zone) => {
      const offset = parseFloat(zone.getAttribute("data-section-dock-hide") ?? "");
      const line = 100 - gsap.utils.clamp(0, 100, Number.isNaN(offset) ? 10 : offset);
      return ScrollTrigger.create({ trigger: zone, start: `top ${line}%`, end: "bottom top", onToggle: updateHidden });
    });

    const onLinkClick = () => closeDock();
    links.forEach((link) => link.addEventListener("click", onLinkClick));

    const onToggleClick = () => {
      if (open) {
        closeDock();
        return;
      }
      openDock();
      links[activeIndex].focus();
    };
    toggle.addEventListener("click", onToggleClick);

    if (canHover.matches) {
      dock.addEventListener("mouseenter", openDock);
      dock.addEventListener("mouseleave", closeDock);
    }

    const onKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        closeDock();
        gsap.delayedCall(0.15, () => toggle.focus());
      }
    };
    const onDocumentClick = (event: MouseEvent) => {
      if (open && !dock.contains(event.target as Node)) closeDock();
    };
    const onFocusOut = (event: FocusEvent) => {
      if (open && !dock.contains(event.relatedTarget as Node | null)) closeDock();
    };
    document.addEventListener("keydown", onKeydown);
    document.addEventListener("click", onDocumentClick);
    dock.addEventListener("focusout", onFocusOut);

    const refreshLayout = () => {
      setLabel(activeIndex);
      placeIndicator(activeIndex);
      if (open) gsap.set(pill, { width: list.offsetWidth, height: list.offsetHeight });
    };
    window.addEventListener("resize", refreshLayout);
    document.fonts?.ready.then(refreshLayout);

    syncLinkState();
    refreshLayout();

    return () => {
      [...triggers, ...hideTriggers, rangeTrigger].forEach((trigger) => trigger?.kill());
      links.forEach((link) => link.removeEventListener("click", onLinkClick));
      toggle.removeEventListener("click", onToggleClick);
      dock.removeEventListener("mouseenter", openDock);
      dock.removeEventListener("mouseleave", closeDock);
      dock.removeEventListener("focusout", onFocusOut);
      document.removeEventListener("keydown", onKeydown);
      document.removeEventListener("click", onDocumentClick);
      window.removeEventListener("resize", refreshLayout);
      dockTl?.kill();
      gsap.killTweensOf([dock, pill, labelWrap, indicator, rect, ...links]);
      ctx.revert();
      labelWrap.textContent = "";
    };
  }, [items]);

  return (
    <nav ref={dockRef} aria-label={label} className="section-dock">
      <div data-section-dock-pill className="section-dock__pill">
        <button
          type="button"
          data-section-dock-toggle
          aria-expanded="false"
          aria-controls="section-dock-list"
          className="section-dock__toggle"
        >
          <span data-section-dock-label-wrap className="section-dock__label-wrap" />
        </button>
        <div data-section-dock-list id="section-dock-list" className="section-dock__list">
          <div data-section-dock-indicator className="section-dock__indicator" />
          <ul className="section-dock__items">
            {items.map((item) => (
              <li key={item.id}>
                <a data-section-dock-link href={`#${item.id}`} className="section-dock__link">
                  {item.number ? <span className="section-dock__link-num">{item.number}</span> : null}
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
