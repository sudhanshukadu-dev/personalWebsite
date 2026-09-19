"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

/*
  Draggable stickers, ported from the reference Sudhanshu shared. The wrap covers
  its parent but lets clicks through; each sticker can be dragged within it,
  growing and tilting while held and springing back when let go. Positions and
  sizes live in globals.css (.sticker-*). Purely decorative, so hidden from
  assistive tech.
*/

export type Sticker = { src: string };

// `variant` adds an is--<variant> class to the wrap, so a section can place its stickers
// differently from the hero's.
export function DraggableStickers({ stickers, variant }: { stickers: Sticker[]; variant?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const items = Array.from(wrap.querySelectorAll<HTMLElement>("[data-sticker='item']"));
    const draggables = items.flatMap((item) =>
      Draggable.create(item, {
        bounds: wrap,
        dragResistance: 0.1,
        onPress() {
          gsap.to(this.target, {
            scale: 1.2,
            rotation: gsap.utils.random(-30, 30),
            filter: "drop-shadow(0px 10px 8px rgba(0,0,0,0.3))",
            duration: 0.1,
          });
        },
        onRelease() {
          gsap.to(this.target, {
            scale: 1,
            rotation: 0,
            ease: "back.out(3)",
            filter: "drop-shadow(0px 0px 0px rgba(0,0,0,0))",
            duration: 0.2,
          });
        },
      }),
    );

    return () => {
      draggables.forEach((draggable) => draggable.kill());
      gsap.killTweensOf(items);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      data-sticker="wrap"
      className={variant ? `sticker-img-wrap is--${variant}` : "sticker-img-wrap"}
    >
      {stickers.map((sticker, index) => (
        <div key={sticker.src} data-sticker="item" className={`sticker-item is--${index + 1}`}>
          {/* Inner layer carries the resting shadow and the idle float, so it never
              fights the transform and filter GSAP puts on the item while dragging. */}
          <span className="sticker-float">
            <Image src={sticker.src} alt="" fill draggable={false} sizes="(max-width: 767px) 20vw, 144px" className="object-contain" />
          </span>
        </div>
      ))}
    </div>
  );
}
