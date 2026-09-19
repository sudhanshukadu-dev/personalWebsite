import type { CSSProperties } from "react";
import Image from "next/image";
import { beyondTheScreen } from "@/content/home";
import { AutoplayVideo } from "@/components/effects/AutoplayVideo";
import { cn } from "@/lib/cn";

// Beyond the Screen: a compact bento grid with the rowing clip in the centre (styles in
// globals.css, .photo-bento*). Photos and the clip open in the click-to-zoom lightbox.
// No visible title: the arc transition before this section introduces it. The section is two
// screens tall: the first is spent on the arc revealing it, so the grid still gets a full
// screen of its own. On phones the grid is taller than the screen, so it flows normally after
// a screen of clearance instead of being held in place.
export function BeyondTheScreen() {
  return (
    <section id="photos" aria-labelledby="photos-title" className="relative min-h-[200svh]">
      <h2 id="photos-title" className="sr-only">
        {beyondTheScreen.heading}
      </h2>

      <div className="flex min-h-svh items-center pb-16 pt-[100svh] sm:sticky sm:top-0 sm:py-24">
        {/* The grid is 6 x 4 square cells, so its height is about two thirds of its width.
            Capping the width by the screen height keeps the whole grid on one screen. */}
        <div className="photo-bento mx-auto w-full max-w-[min(1120px,calc((100svh-10rem)*1.5))] px-4 sm:px-8">
        <div className="photo-bento__grid">
          {beyondTheScreen.items.map((item) => {
            const placement = {
              "--col": item.col,
              "--row": item.row,
              "--mcol": item.mobileCol ?? 1,
              "--mrow": item.mobileRow ?? 1,
            } as CSSProperties;
            const isVideo = item.type === "video";

            return (
              <div
                key={item.src}
                data-click-zoom
                role="button"
                tabIndex={0}
                aria-label={`${isVideo ? "Enlarge video" : "Enlarge photo"}: ${item.alt}`}
                className="photo-bento__item"
                style={placement}
              >
                {isVideo ? (
                  <AutoplayVideo src={item.src} label={item.alt} className="photo-bento__media" />
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 767px) 50vw, 200px"
                    className={cn("photo-bento__media", item.mono && "is--mono")}
                    style={item.focus ? { objectPosition: item.focus } : undefined}
                  />
                )}
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </section>
  );
}
