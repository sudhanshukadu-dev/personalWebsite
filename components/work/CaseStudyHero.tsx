import type { CSSProperties } from "react";
import { ArrowUpLeft } from "@phosphor-icons/react/ssr";
import { DeviceShowcase, type ShowcaseContent } from "@/components/work/DeviceShowcase";
import { VisualPlaceholder } from "@/components/work/VisualPlaceholder";

export type CaseStudyHeroContent = {
  backLink: { label: string; href: string };
  tag: string;
  title: string;
  subtitle: string;
  facts: { label: string; value: string }[];
  // Quest2Travel shows its product on devices; the other case studies show a large image
  // (a placeholder, labelled with the screen it's waiting for, until the export arrives).
  showcase?: ShowcaseContent;
  visual?: string;
};

const order = (i: number) => ({ "--i": i }) as CSSProperties;

// Case study hero, after the Aboard reference: centred tag, title and line with the
// quick facts where Aboard has its CTA, then the product on a device. Same blue
// gradient and grain as the home hero, so the device sits across the fade.
export function CaseStudyHero({ hero }: { hero: CaseStudyHeroContent }) {
  return (
    <section
      id="top"
      data-loading-header
      aria-labelledby="case-title"
      className="hero-gradient relative isolate overflow-clip"
    >
      <div aria-hidden className="grain" data-grain-animate="true" />

      <div className="relative z-[1] mx-auto w-full max-w-[1320px] px-6 pb-20 pt-8 sm:px-12 sm:pb-28 sm:pt-10 lg:px-24 xl:px-36">
        <div className="on-blue">
          {/* The site's bubble arrow button; its arrow swings round to point back. */}
          <a href={hero.backLink.href} className="btn-bubble-arrow rise w-fit" style={order(0)}>
            <span aria-hidden className="btn-bubble-arrow__arrow">
              <ArrowUpLeft size="40%" className="btn-bubble-arrow__arrow-svg" />
            </span>
            <span className="btn-bubble-arrow__content">
              <span className="btn-bubble-arrow__content-text">{hero.backLink.label}</span>
            </span>
            <span aria-hidden className="btn-bubble-arrow__arrow is--duplicate">
              <ArrowUpLeft size="40%" className="btn-bubble-arrow__arrow-svg" />
            </span>
          </a>

          <div className="mx-auto mt-12 flex max-w-4xl flex-col items-center text-center sm:mt-16">
            <p
              className="rise rounded-full bg-bento-on-blue px-3 py-1.5 text-[13px] font-medium leading-none text-bento-blue"
              style={order(1)}
            >
              {hero.tag}
            </p>
            <h1
              id="case-title"
              className="rise mt-6 text-balance text-[40px] font-medium leading-[1.06] tracking-[-0.04em] text-bento-on-blue sm:text-[52px] lg:text-[64px] lg:leading-[1.04]"
              style={order(2)}
            >
              {hero.title}
            </h1>
            <p
              className="rise mt-6 max-w-[58ch] text-balance text-[17px] leading-[1.5] text-bento-on-blue sm:text-lg"
              style={order(3)}
            >
              {hero.subtitle}
            </p>

            <dl
              className="rise mt-10 grid w-full max-w-3xl grid-cols-2 gap-x-6 gap-y-7 sm:mt-12 sm:grid-cols-4"
              style={order(4)}
            >
              {hero.facts.map((fact) => (
                <div key={fact.label} className="flex flex-col items-center gap-2">
                  <dt className="font-mono text-[11px] uppercase leading-none tracking-[0.06em] text-bento-on-blue">
                    {fact.label}
                  </dt>
                  <dd className="text-balance text-[15px] font-medium leading-[1.3] text-bento-on-blue">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="rise mt-14 sm:mt-16" style={order(5)}>
          {hero.showcase ? <DeviceShowcase showcase={hero.showcase} /> : null}
          {hero.visual ? (
            // TODO: replace with the real hero screen once it's exported.
            <div data-tone="card" className="case-card mx-auto max-w-[960px] p-3 sm:p-4">
              <VisualPlaceholder label={hero.visual} className="aspect-[16/10]" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
