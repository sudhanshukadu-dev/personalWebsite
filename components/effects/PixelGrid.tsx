"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/*
  Interactive pixel grid, ported from the reference Sudhanshu shared and used as the
  footer background. A canvas of square cells (28 across on desktop, 12 on phones) with
  very faint borders; moving the pointer over a cell lights it in one of the brand
  colours, which then fades out. The pointer is tracked on the grid's parent, not the
  canvas, because other layers (the falling stickers, the content) sit on top of it.
  Colours come from the theme tokens, so it follows light and dark. It only repaints
  while cells are lit, and it's skipped on touch screens and under reduced motion,
  where the plain grid is drawn once. Styles live in globals.css (.pixel-grid).
*/

const COLUMNS_DESKTOP = 28;
const COLUMNS_MOBILE = 12;
const BORDER_WIDTH = 1;
const FADE_IN = 0.1;
const HOLD = 0.5;
const FADE_OUT = 2;

type Block = { x: number; y: number; color: string; alpha: number };

export function PixelGrid() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = root?.querySelector("canvas");
    const context = canvas?.getContext("2d");
    if (!root || !canvas || !context) return;

    const interactive =
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      !window.matchMedia("(hover: none)").matches;
    const host = root.parentElement ?? root;

    let blocks: Block[] = [];
    let squareSize = 0;
    let borderColor = "";
    let colors: string[] = [];
    let lastIndex = -1;
    let running = false;

    const readTokens = () => {
      const styles = getComputedStyle(root);
      borderColor = styles.getPropertyValue("--grid-line").trim();
      colors = ["--grid-pop-1", "--grid-pop-2", "--grid-pop-3", "--grid-pop-4"]
        .map((token) => styles.getPropertyValue(token).trim())
        .filter(Boolean);
    };

    const setupGrid = () => {
      const width = root.offsetWidth;
      const height = root.offsetHeight;
      if (!width || !height) return;

      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);

      const columns = window.innerWidth < 768 ? COLUMNS_MOBILE : COLUMNS_DESKTOP;
      squareSize = width / columns;
      const rows = Math.ceil(height / squareSize);

      blocks = [];
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          blocks.push({ x: x * squareSize, y: y * squareSize, color: borderColor, alpha: 0 });
        }
      }
      lastIndex = -1;
    };

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.lineWidth = BORDER_WIDTH;
      blocks.forEach((block) => {
        if (block.alpha > 0) {
          context.globalAlpha = block.alpha;
          context.fillStyle = block.color;
          context.fillRect(block.x, block.y, squareSize, squareSize);
          context.globalAlpha = 1;
        }
        context.strokeStyle = borderColor;
        context.strokeRect(block.x, block.y, squareSize, squareSize);
      });

      // Nothing lit: the grid is static again, so stop repainting.
      if (running && !blocks.some((block) => block.alpha > 0.001)) stop();
    };

    const start = () => {
      if (running || !interactive) return;
      running = true;
      gsap.ticker.add(draw);
    };

    const stop = () => {
      if (!running) return;
      running = false;
      gsap.ticker.remove(draw);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!interactive || !squareSize) return;
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

      const index = Math.floor(y / squareSize) * Math.round(rect.width / squareSize) + Math.floor(x / squareSize);
      if (index < 0 || index >= blocks.length || index === lastIndex) return;

      const block = blocks[index];
      block.color = colors[Math.floor(Math.random() * colors.length)] ?? borderColor;
      gsap.to(block, { alpha: 1, duration: FADE_IN, overwrite: true });
      gsap.to(block, { alpha: 0, duration: FADE_OUT, delay: HOLD });
      lastIndex = index;
      start();
    };

    readTokens();
    setupGrid();
    draw();

    const resizeObserver = new ResizeObserver(() => {
      setupGrid();
      draw();
    });
    resizeObserver.observe(root);

    // Follow the theme: the toggle sets data-theme, and the system setting can change too.
    const onThemeChange = () => {
      readTokens();
      draw();
    };
    const themeObserver = new MutationObserver(onThemeChange);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    scheme.addEventListener("change", onThemeChange);

    host.addEventListener("pointermove", onPointerMove);

    return () => {
      stop();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      scheme.removeEventListener("change", onThemeChange);
      host.removeEventListener("pointermove", onPointerMove);
      blocks.forEach((block) => gsap.killTweensOf(block));
    };
  }, []);

  return (
    <div ref={rootRef} aria-hidden className="pixel-grid">
      <canvas />
    </div>
  );
}
