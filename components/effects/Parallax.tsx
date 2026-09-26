"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
  Global parallax, ported from the reference Sudhanshu shared. Anything on the page
  marked [data-parallax="trigger"] drifts as it passes through the screen, set entirely
  from attributes:

    data-parallax-start / -end        how far it moves, in percent of its own size
                                      (defaults 20 to -20)
    data-parallax-direction           "horizontal" to move it sideways instead
    data-parallax-scrub               how long it takes to catch up (defaults true)
    data-parallax-scroll-start / -end where the movement starts and ends, as a
                                      ScrollTrigger position (defaults top bottom,
                                      bottom top). Both are clamped, so nothing
                                      starts already part way through.
    data-parallax-disable             "mobile", "mobileLandscape" or "tablet"
    [data-parallax="target"]          moves instead of the trigger itself, when the
                                      thing that moves is inside the thing that
                                      measures

  Rendered once in the root layout and rebuilt on each page, like the rest of the
  site-wide behaviour. Reduced motion leaves everything where it is.
*/
export function Parallax() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const media = gsap.matchMedia();
    media.add(
      {
        isMobile: "(max-width: 479px)",
        isMobileLandscape: "(max-width: 767px)",
        isTablet: "(max-width: 991px)",
        isDesktop: "(min-width: 992px)",
      },
      (context) => {
        const { isMobile, isMobileLandscape, isTablet } = context.conditions as Record<string, boolean>;

        const ctx = gsap.context(() => {
          document.querySelectorAll<HTMLElement>('[data-parallax="trigger"]').forEach((trigger) => {
            const disable = trigger.getAttribute("data-parallax-disable");
            if (
              (disable === "mobile" && isMobile) ||
              (disable === "mobileLandscape" && isMobileLandscape) ||
              (disable === "tablet" && isTablet)
            ) {
              return;
            }

            const target = trigger.querySelector<HTMLElement>('[data-parallax="target"]') ?? trigger;
            const direction = trigger.getAttribute("data-parallax-direction") ?? "vertical";
            const property = direction === "horizontal" ? "xPercent" : "yPercent";

            const scrubAttr = trigger.getAttribute("data-parallax-scrub");
            const startAttr = trigger.getAttribute("data-parallax-start");
            const endAttr = trigger.getAttribute("data-parallax-end");

            const scrub = scrubAttr !== null ? parseFloat(scrubAttr) : true;
            const from = startAttr !== null ? parseFloat(startAttr) : 20;
            const to = endAttr !== null ? parseFloat(endAttr) : -20;

            const start = `clamp(${trigger.getAttribute("data-parallax-scroll-start") ?? "top bottom"})`;
            const end = `clamp(${trigger.getAttribute("data-parallax-scroll-end") ?? "bottom top"})`;

            gsap.fromTo(
              target,
              { [property]: from },
              {
                [property]: to,
                ease: "none",
                scrollTrigger: { trigger, start, end, scrub },
              },
            );
          });
        });

        return () => ctx.revert();
      },
    );

    return () => media.revert();
  }, [pathname]);

  return null;
}
