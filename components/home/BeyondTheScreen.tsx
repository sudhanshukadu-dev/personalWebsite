import { beyondTheScreen } from "@/content/home";
import { InteractiveCollage } from "@/components/effects/InteractiveCollage";

// Beyond the Screen: heading and line, then the phone-photo collage that focuses on hover.
export function BeyondTheScreen() {
  return (
    <section id="photos" aria-labelledby="photos-title" className="overflow-clip py-16 sm:py-24 lg:py-28">
      <div className="mx-auto w-full max-w-[1320px] px-6 sm:px-12 lg:px-24 xl:px-36">
        <h2
          id="photos-title"
          className="text-[40px] font-medium leading-none tracking-[-0.05em] text-bento-ink sm:text-[56px] lg:text-[64px]"
        >
          {beyondTheScreen.heading}
        </h2>
        <p className="mt-5 max-w-[46ch] text-[17px] leading-[1.5] text-bento-muted sm:text-lg">
          {beyondTheScreen.line}
        </p>
      </div>

      <div className="collage-stage mt-12 sm:mt-16">
        <InteractiveCollage photos={beyondTheScreen.photos} />
      </div>
    </section>
  );
}
