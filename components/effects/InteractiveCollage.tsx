"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { cn } from "@/lib/cn";

gsap.registerPlugin(CustomEase);

/*
  Interactive collage, adapted from the reference Sudhanshu shared.
  Hovering a photo (tapping on touch screens) focuses it: it grows slightly,
  its neighbours step aside to leave a gap, and the rest shrink and drift
  toward the collage's vertical centre, weaker the further away they are.
  Leaving the collage (or tapping outside) resets it. Positions and card
  sizes live in globals.css (.interactive-collage*); everything is sized in
  em off a vw font size so the collage scales with the viewport.
*/

export type CollagePhoto = {
  src: string;
  alt: string;
  shape: "landscape" | "portrait" | "square";
};

const ACTIVE_SCALE = 1.075;
const INACTIVE_SCALE = 0.9;
const GAP_PERCENT = 3;
const SECOND_CARD_BOOST = 1.35;
const CENTER_PULL_PERCENT = 25;
const DURATION = 0.8;

export function InteractiveCollage({ photos }: { photos: CollagePhoto[] }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    CustomEase.create("move", "0.3, 0.075, 0, 1");

    const list = root.querySelector<HTMLElement>("[data-interactive-collage-list]");
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-interactive-collage-item]"));
    if (!list || !items.length) return;

    const isTouch = !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : DURATION;
    const controller = new AbortController();
    const { signal } = controller;
    let activeItem: HTMLElement | null = null;

    const getInner = (item: HTMLElement) => item.querySelector<HTMLElement>("[data-interactive-collage-item-inner]");

    const getMoveStrength = (distance: number) => {
      const strength = 1 / (1 + Math.pow(distance - 1, 1.2) * 0.45);
      return distance === 2 ? strength * SECOND_CARD_BOOST : strength;
    };

    const animateItem = (item: HTMLElement, xPercent: number, yPercent: number, scale: number) => {
      const inner = getInner(item);
      if (!inner) return;
      gsap.to(inner, { xPercent, yPercent, scale, duration, ease: "move", overwrite: true });
    };

    const resetCollage = () => {
      activeItem = null;
      items.forEach((item) => {
        item.removeAttribute("data-interactive-collage-focus");
        animateItem(item, 0, 0, 1);
      });
    };

    const focusItem = (active: HTMLElement) => {
      if (activeItem === active) return;
      activeItem = active;

      items.forEach((item) => item.toggleAttribute("data-interactive-collage-focus", item === active));

      const listRect = list.getBoundingClientRect();
      const listCenterY = listRect.top + listRect.height / 2;
      const gap = (listRect.width * GAP_PERCENT) / 100;

      // Order by horizontal centre so "neighbours" means left and right on screen.
      const orderedItems = [...items].sort((a, b) => {
        const aRect = a.getBoundingClientRect();
        const bRect = b.getBoundingClientRect();
        return aRect.left + aRect.width / 2 - (bRect.left + bRect.width / 2);
      });

      const activeIndex = orderedItems.indexOf(active);
      const activeRect = active.getBoundingClientRect();
      const activeCenterX = activeRect.left + activeRect.width / 2;
      const activeLeft = activeCenterX - (activeRect.width * ACTIVE_SCALE) / 2;
      const activeRight = activeCenterX + (activeRect.width * ACTIVE_SCALE) / 2;

      const leftItem = orderedItems[activeIndex - 1];
      const rightItem = orderedItems[activeIndex + 1];

      let leftMove = 0;
      let rightMove = 0;

      if (leftItem) {
        const rect = leftItem.getBoundingClientRect();
        const itemRight = rect.left + rect.width / 2 + (rect.width * INACTIVE_SCALE) / 2;
        leftMove = Math.min(0, activeLeft - gap - itemRight);
      }

      if (rightItem) {
        const rect = rightItem.getBoundingClientRect();
        const itemLeft = rect.left + rect.width / 2 - (rect.width * INACTIVE_SCALE) / 2;
        rightMove = Math.max(0, activeRight + gap - itemLeft);
      }

      orderedItems.forEach((item, index) => {
        if (item === active) {
          animateItem(item, 0, 0, ACTIVE_SCALE);
          return;
        }

        const rect = item.getBoundingClientRect();
        const difference = index - activeIndex;
        const strength = getMoveStrength(Math.abs(difference));
        const itemCenterY = rect.top + rect.height / 2;
        const centerProgress = (listCenterY - itemCenterY) / (listRect.height / 2);
        const moveX = difference < 0 ? leftMove * strength : rightMove * strength;
        const scale = INACTIVE_SCALE - (1 - strength) * 0.12;

        animateItem(item, (moveX / rect.width) * 100, CENTER_PULL_PERCENT * centerProgress * strength, scale);
      });
    };

    const getHoveredItem = (event: PointerEvent) => {
      if (activeItem) {
        const rect = getInner(activeItem)?.getBoundingClientRect();
        if (
          rect &&
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom
        ) {
          return activeItem;
        }
      }
      return document.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLElement>("[data-interactive-collage-item]") ?? null;
    };

    if (isTouch) {
      items.forEach((item) => {
        item.addEventListener(
          "click",
          (event) => {
            event.stopPropagation();
            if (activeItem === item) resetCollage();
            else focusItem(item);
          },
          { signal },
        );
      });
      document.addEventListener(
        "click",
        (event) => {
          if (event.target instanceof Node && !root.contains(event.target)) resetCollage();
        },
        { signal },
      );
    } else {
      root.addEventListener(
        "pointermove",
        (event) => {
          const item = getHoveredItem(event);
          if (item) focusItem(item);
          else resetCollage();
        },
        { signal },
      );
      root.addEventListener("pointerleave", resetCollage, { signal });
    }

    return () => {
      controller.abort();
      items.forEach((item) => {
        const inner = getInner(item);
        if (inner) gsap.killTweensOf(inner);
      });
    };
  }, []);

  return (
    <div ref={rootRef} data-interactive-collage-init className="interactive-collage">
      <div data-interactive-collage-list className="interactive-collage__list">
        {photos.map((photo, index) => (
          <div
            key={photo.src}
            data-interactive-collage-item
            className={`interactive-collage__item is--${index + 1}`}
          >
            <div data-interactive-collage-item-inner>
              <div className={cn("collage-card", photo.shape !== "square" && `is--${photo.shape}`)}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 991px) 43vw, 21vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
