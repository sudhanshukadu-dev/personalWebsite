"use client";

import { useEffect } from "react";

/*
  Directional hover, ported from the Osmo reference Sudhanshu shared. A tile waits
  outside each row; on hover it is placed against the edge the cursor crossed, then
  transitions to cover the row, and it leaves the way the cursor goes. The move is a
  CSS transition, so nothing here runs per frame: the script only sets the transform
  and a data-status the styles can read. `data-type` on the container picks the axis,
  "y", "x" or "all" (the nearest of the four edges). Styles live in globals.css
  (.dir-tile, .case-list); reduced motion drops the slide there.
*/

const DIRECTIONS = {
  top: "translateY(-100%)",
  bottom: "translateY(100%)",
  left: "translateX(-100%)",
  right: "translateX(100%)",
} as const;

type Direction = keyof typeof DIRECTIONS;

const directionOf = (event: MouseEvent, element: HTMLElement, type: string): Direction => {
  const { left, top, width, height } = element.getBoundingClientRect();
  const x = event.clientX - left;
  const y = event.clientY - top;

  if (type === "y") return y < height / 2 ? "top" : "bottom";
  if (type === "x") return x < width / 2 ? "left" : "right";

  const distances: [Direction, number][] = [
    ["top", y],
    ["right", width - x],
    ["bottom", height - y],
    ["left", x],
  ];
  return distances.reduce((a, b) => (a[1] < b[1] ? a : b))[0];
};

export function DirectionalRows() {
  useEffect(() => {
    // On touch there is no leave event, so a tapped row would stay lit.
    if (window.matchMedia("(hover: none)").matches) return;

    const teardowns: (() => void)[] = [];

    document.querySelectorAll<HTMLElement>("[data-directional-hover]").forEach((container) => {
      const type = container.getAttribute("data-type") ?? "all";

      container.querySelectorAll<HTMLElement>("[data-directional-hover-item]").forEach((item) => {
        const tile = item.querySelector<HTMLElement>("[data-directional-hover-tile]");
        if (!tile) return;

        const enter = (event: MouseEvent) => {
          const direction = directionOf(event, item, type);
          // Jump the tile to that edge without animating, then let it transition in.
          tile.style.transition = "none";
          tile.style.transform = DIRECTIONS[direction];
          void tile.offsetHeight;
          tile.style.transition = "";
          tile.style.transform = "translate(0%, 0%)";
          item.dataset.status = `enter-${direction}`;
        };

        const leave = (event: MouseEvent) => {
          const direction = directionOf(event, item, type);
          item.dataset.status = `leave-${direction}`;
          tile.style.transform = DIRECTIONS[direction];
        };

        item.addEventListener("mouseenter", enter);
        item.addEventListener("mouseleave", leave);
        teardowns.push(() => {
          item.removeEventListener("mouseenter", enter);
          item.removeEventListener("mouseleave", leave);
        });
      });
    });

    return () => teardowns.forEach((teardown) => teardown());
  }, []);

  return null;
}
