import { footer } from "@/content/home";
import { ContactLinks } from "@/components/footer/ContactLinks";
import { PixelGrid } from "@/components/effects/PixelGrid";
import { CurrentYear } from "@/components/footer/CurrentYear";
import { FallingStickers } from "@/components/footer/FallingStickers";

// Site footer, one screen tall: the credit line at hero size, the social links and a resume
// button under it, and each section's sticker falling into a pile along the bottom (click
// one to go back to its section). Behind it all is the interactive pixel grid. The content
// layer lets the pointer through to the stickers, except on the links. It follows the
// closing arc transition, whose arc lifts off it over one screen of scrolling, so it needs
// to be a full screen tall.
export function Footer() {
  return (
    <footer className="relative isolate flex min-h-svh flex-col overflow-clip bg-bento-card text-bento-ink">
      <PixelGrid />
      <FallingStickers stickers={footer.stickers} />

      <div className="pointer-events-none relative z-[2] mx-auto w-full max-w-[1320px] px-6 pt-[clamp(4rem,14svh,9rem)] text-center sm:px-12 lg:px-24 xl:px-36">
        {/* Same scale as the hero headline, ending with the current year. A no-break space
            before each "·" keeps the dots from starting a line. */}
        <p className="mx-auto text-balance text-[40px] font-medium leading-[1.06] tracking-[-0.04em] sm:text-[52px] lg:text-[60px] xl:text-[72px] xl:leading-[1.04]">
          {footer.credit.replaceAll(" · ", "\u00a0· ")}{"\u00a0· "}<CurrentYear fallback={new Date().getFullYear()} />
        </p>

        <ContactLinks className="mt-10" />
      </div>
    </footer>
  );
}
