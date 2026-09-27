import Image from "next/image";
import { beyondTheScreen } from "@/content/home";
import { AutoplayVideo } from "@/components/effects/AutoplayVideo";
import { SpatialSlider } from "@/components/effects/SpatialSlider";
import { cn } from "@/lib/cn";

/*
  Beyond the Screen: Sudhanshu's own photos on a card carousel that curves away to
  either side (components/effects/SpatialSlider.tsx). Each card is a square crop with
  its caption underneath, and a photo opens in the click-to-zoom lightbox.

  No visible title: the arc transition before this section introduces it. The section is
  two screens tall with the carousel held in place, so the first screen is spent on the
  arc revealing it and the carousel still gets a full screen of its own.
*/
export function BeyondTheScreen() {
  return (
    <section id="photos" aria-labelledby="photos-title" className="relative min-h-[200svh]">
      <h2 id="photos-title" className="sr-only">
        {beyondTheScreen.heading}
      </h2>

      <div className="sticky top-0 flex min-h-svh items-center overflow-clip py-16 sm:py-24">
        <SpatialSlider label={beyondTheScreen.heading}>
          {beyondTheScreen.items.map((item) => (
            <figure key={item.src} className="photo-card">
              <div
                data-click-zoom
                role="button"
                tabIndex={0}
                aria-label={`${item.type === "video" ? "Enlarge video" : "Enlarge photo"}: ${item.alt}`}
                className="photo-card__media"
              >
                {item.type === "video" ? (
                  <AutoplayVideo src={item.src} label={item.alt} className="photo-card__cover" />
                ) : (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 767px) 60vw, 320px"
                    className={cn("photo-card__cover", item.mono && "is--mono")}
                    style={item.focus ? { objectPosition: item.focus } : undefined}
                  />
                )}
              </div>
              <figcaption className="photo-card__caption">{item.label}</figcaption>
            </figure>
          ))}
        </SpatialSlider>
      </div>
    </section>
  );
}
