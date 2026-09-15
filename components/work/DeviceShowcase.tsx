"use client";

import { useState } from "react";
import { Laptop, Phone } from "@/components/work/DeviceFrames";
import { cn } from "@/lib/cn";

/*
  Device showcase for a case study hero, after the Portal/Admin switch on the
  Aboard reference: a segmented control swaps a laptop for a phone. The control
  sits above the device so it never moves when the frame changes height.
*/

type ViewId = "desktop" | "mobile";

export type ShowcaseContent = {
  label: string;
  views: { id: ViewId; label: string; caption: string; description: string }[];
};

export function DeviceShowcase({ showcase }: { showcase: ShowcaseContent }) {
  const [viewId, setViewId] = useState<ViewId>(showcase.views[0].id);
  const view = showcase.views.find((item) => item.id === viewId) ?? showcase.views[0];

  return (
    <figure className="flex flex-col items-center">
      <div
        role="group"
        aria-label={showcase.label}
        className="inline-flex rounded-full border border-bento-ink/10 bg-bento-card p-1 shadow-[0_8px_24px_-16px_rgba(15,16,18,0.35)]"
      >
        {showcase.views.map((item) => {
          const active = item.id === viewId;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => setViewId(item.id)}
              className={cn(
                "h-9 rounded-full px-5 text-[14px] font-medium transition-colors duration-200",
                active ? "bg-bento-ink text-bento-page" : "text-bento-muted hover:text-bento-ink",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Keyed so each switch replays the entrance. */}
      <div key={view.id} className="device-in mt-8 flex w-full justify-center sm:mt-10">
        {view.id === "desktop" ? <Laptop /> : <Phone />}
      </div>

      <figcaption className="mt-6 max-w-[48ch] text-balance text-center text-[15px] leading-[1.5] text-bento-muted">
        <span className="sr-only">{view.description} </span>
        {view.caption}
      </figcaption>
    </figure>
  );
}
