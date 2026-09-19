"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import type { Body, Engine as MatterEngine, Render as MatterRender, Runner as MatterRunner } from "matter-js";

/*
  Falling stickers, adapted from the Matter.js reference Sudhanshu shared. When the
  footer comes into view, each section transition's sticker drops into a
  physics box along the bottom of the footer and piles up; they can be picked up and
  thrown (a held sticker grows slightly, with a grab cursor). Hovering one shows its section
  name in the cursor bubble, and clicking one
  goes to that section (scrolling on this page, or back to the home page from a case
  study). The box is a square as wide as the footer, anchored to its bottom, so the
  stickers fall in from above the visible area. It pauses while the footer is off
  screen, rebuilds when the width changes, and is replaced by a static row of sticker
  links under reduced motion (globals.css, .falling-stickers*). Matter.js loads only
  when needed.
*/

export type FallingSticker = { src: string; label: string; id: string; width: number; height: number };

const COPIES = 1;
// Each sticker is about a fifth of the footer's width, within these bounds.
const SIZE_DIVISOR = 5;
const MIN_SIZE = 110;
const MAX_SIZE = 300;
// How much a sticker grows while it's held.
const LIFT = 1.12;
const RESTITUTION = 0.75;
const GRAVITY = 2;
const DROP_INTERVAL = 100;
const CLICK_TOLERANCE = 6;

type World = { pause: () => void; resume: () => void; destroy: () => void };

// Scroll to the section when it's on this page; otherwise go to it on the home page.
const goTo = (id: string, push: (href: string) => void) => {
  const target = document.getElementById(id);
  if (!target) {
    push(`/#${id}`);
    return;
  }
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  if (location.hash !== `#${id}`) history.pushState(history.state, "", `#${id}`);
};

export function FallingStickers({ stickers }: { stickers: FallingSticker[] }) {
  const router = useRouter();
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = targetRef.current;
    if (!target || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let world: World | null = null;
    let onScreen = false;
    let cancelled = false;
    let builtWidth = 0;
    let resizeTimer = 0;

    const build = async (): Promise<World | null> => {
      const Matter = (await import("matter-js")).default;
      if (cancelled) return null;
      const { Engine, Render, Runner, Bodies, Composite, Events, Mouse, MouseConstraint, Query } = Matter;

      const width = target.clientWidth + 2;
      const height = target.clientHeight + 2;
      const wall = width / 4;
      const size = Math.min(Math.max(width / SIZE_DIVISOR, MIN_SIZE), MAX_SIZE);
      builtWidth = target.clientWidth;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const engine: MatterEngine = Engine.create();
      engine.gravity.y = GRAVITY;

      const render: MatterRender = Render.create({
        element: target,
        engine,
        options: {
          background: "transparent",
          wireframes: false,
          width,
          height,
          pixelRatio,
        },
      });

      // Floor, side walls and a lid, all outside the visible box.
      Composite.add(engine.world, [
        Bodies.rectangle(width / 2 + wall * 2, height + wall, width + wall * 4, wall * 2, { isStatic: true }),
        Bodies.rectangle(-wall, height / 2, wall * 2, height, { isStatic: true }),
        Bodies.rectangle(width + wall, height / 2, wall * 2, height, { isStatic: true }),
        Bodies.rectangle(width / 2 + wall * 2, -wall, width + wall * 4, wall * 2, { isStatic: true }),
      ]);

      // Drop each sticker COPIES times, one every DROP_INTERVAL ms.
      const stickerBodies: Body[] = [];
      const stickerFor = new Map<number, FallingSticker>();
      const queue = Array.from({ length: stickers.length * COPIES }, (_, i) => stickers[i % stickers.length]);
      let dropTimer = 0;
      const drop = (index: number) => {
        if (index >= queue.length) return;
        const sticker = queue[index];
        const scale = size / Math.max(sticker.width, sticker.height);
        const body = Bodies.circle(size / 2 + Math.random() * (width - size), size, size * 0.45, {
          restitution: RESTITUTION,
          render: { sprite: { texture: sticker.src, xScale: scale, yScale: scale } },
        });
        stickerBodies.push(body);
        stickerFor.set(body.id, sticker);
        Composite.add(engine.world, body);
        dropTimer = window.setTimeout(() => drop(index + 1), DROP_INTERVAL);
      };

      // Picking up and throwing stickers.
      const mouse = Mouse.create(render.canvas);
      // Matter reads the canvas's pixel ratio back with parseInt, so a fractional ratio (1.25 or
      // 1.5, common on Windows laptops) would throw its pointer maths off and stickers couldn't
      // be grabbed. Give it the exact ratio.
      mouse.pixelRatio = pixelRatio;
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness: 0.2, render: { visible: false } },
      });
      Composite.add(engine.world, mouseConstraint);
      render.mouse = mouse;

      // A held sticker grows a little, like the hero's stickers, and settles back when let go.
      const scaleSprite = (body: Body, factor: number) => {
        const sprite = body.render.sprite;
        if (!sprite || !stickerFor.has(body.id)) return;
        sprite.xScale *= factor;
        sprite.yScale *= factor;
      };
      // Matter's types leave out the dragged body on these events.
      Events.on(mouseConstraint, "startdrag", (event) => {
        scaleSprite((event as unknown as { body: Body }).body, LIFT);
        render.canvas.style.cursor = "grabbing";
      });
      Events.on(mouseConstraint, "enddrag", (event) => {
        scaleSprite((event as unknown as { body: Body }).body, 1 / LIFT);
        render.canvas.style.cursor = "grab";
      });

      // Let the page scroll over the canvas: drop Matter's wheel handler, and only claim
      // touch moves while a sticker is being dragged.
      const element = mouse.element;
      element.removeEventListener("wheel", (mouse as unknown as { mousewheel: EventListener }).mousewheel);
      const mouseHandlers = mouse as unknown as Record<"mousedown" | "mousemove" | "mouseup", EventListener>;
      element.removeEventListener("touchstart", mouseHandlers.mousedown);
      element.removeEventListener("touchmove", mouseHandlers.mousemove);
      element.removeEventListener("touchend", mouseHandlers.mouseup);
      const onTouchMove = (event: Event) => {
        if (mouseConstraint.body) mouseHandlers.mousemove(event);
      };
      const onTouchEnd = (event: Event) => {
        if (mouseConstraint.body) mouseHandlers.mouseup(event);
      };
      element.addEventListener("touchstart", mouseHandlers.mousedown, { passive: true });
      element.addEventListener("touchmove", onTouchMove);
      element.addEventListener("touchend", onTouchEnd);

      // Which sticker is under a pointer event, in the box's own coordinates.
      const canvas = render.canvas;
      const stickerAt = (event: { clientX: number; clientY: number }) => {
        const rect = canvas.getBoundingClientRect();
        const point = { x: event.clientX - rect.left, y: event.clientY - rect.top };
        const body = Query.point(stickerBodies, point)[0];
        return body ? stickerFor.get(body.id) : undefined;
      };

      // Hover: label the canvas for the cursor bubble while over a sticker, with a grab cursor.
      const onMove = (event: PointerEvent) => {
        if (mouseConstraint.body) return;
        const sticker = stickerAt(event);
        if (sticker) {
          canvas.dataset.cursorHover = "";
          canvas.dataset.cursorText = sticker.label;
          canvas.style.cursor = "grab";
        } else {
          delete canvas.dataset.cursorHover;
          delete canvas.dataset.cursorText;
          canvas.style.cursor = "";
        }
      };

      // Click (a press that barely moves) on a sticker goes to its section; a drag doesn't.
      let press: { x: number; y: number; sticker?: FallingSticker } | null = null;
      const onDown = (event: PointerEvent) => {
        press = { x: event.clientX, y: event.clientY, sticker: stickerAt(event) };
      };
      const onUp = (event: PointerEvent) => {
        const pressed = press;
        press = null;
        if (!pressed?.sticker) return;
        if (Math.hypot(event.clientX - pressed.x, event.clientY - pressed.y) < CLICK_TOLERANCE) goTo(pressed.sticker.id, router.push);
      };

      canvas.addEventListener("pointermove", onMove);
      canvas.addEventListener("pointerdown", onDown);
      canvas.addEventListener("pointerup", onUp);

      const runner: MatterRunner = Runner.create();
      Render.run(render);
      Runner.run(runner, engine);
      drop(0);

      return {
        pause: () => {
          Runner.stop(runner);
          Render.stop(render);
        },
        resume: () => {
          Runner.run(runner, engine);
          Render.run(render);
        },
        destroy: () => {
          window.clearTimeout(dropTimer);
          Runner.stop(runner);
          Render.stop(render);
          canvas.removeEventListener("pointermove", onMove);
          canvas.removeEventListener("pointerdown", onDown);
          canvas.removeEventListener("pointerup", onUp);
          element.removeEventListener("touchstart", mouseHandlers.mousedown);
          element.removeEventListener("touchmove", onTouchMove);
          element.removeEventListener("touchend", onTouchEnd);
          Composite.clear(engine.world, false);
          Engine.clear(engine);
          canvas.remove();
        },
      };
    };

    const ensureWorld = async () => {
      if (world) {
        world.resume();
        return;
      }
      world = await build();
      if (world && !onScreen) world.pause();
    };

    // Drop the stickers when the footer comes into view; pause while it's away.
    const footer = target.closest("footer") ?? target;
    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) void ensureWorld();
        else world?.pause();
      },
      { threshold: 0.35 },
    );
    observer.observe(footer);

    // A new width means a new box: rebuild, and let the stickers fall again.
    const resizeObserver = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (!world || target.clientWidth === builtWidth) return;
        world.destroy();
        world = null;
        if (onScreen) void ensureWorld();
      }, 250);
    });
    resizeObserver.observe(target);

    return () => {
      cancelled = true;
      window.clearTimeout(resizeTimer);
      observer.disconnect();
      resizeObserver.disconnect();
      world?.destroy();
      world = null;
    };
  }, [stickers, router]);

  return (
    <>
      <div aria-hidden className="falling-stickers">
        <div className="falling-stickers__before" />
        <div ref={targetRef} className="falling-stickers__target" />
      </div>

      {/* Reduced motion: the same stickers as a still row of links. */}
      <ul className="falling-stickers__static">
        {stickers.map((sticker) => (
          <li key={sticker.id}>
            <a
              href={sticker.id === "top" ? "#top" : `/#${sticker.id}`}
              aria-label={sticker.label}
              data-cursor-hover
              data-cursor-text={sticker.label}
              className="falling-stickers__link"
            >
              <Image src={sticker.src} alt="" width={sticker.width} height={sticker.height} className="h-full w-auto" />
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
