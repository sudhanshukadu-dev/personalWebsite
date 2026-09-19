import type { CSSProperties } from "react";
import { ArrowDownRight } from "@phosphor-icons/react/ssr";
import { DraggableStickers } from "@/components/effects/DraggableStickers";
import { VinylPlayer } from "@/components/home/VinylPlayer";
import { hero } from "@/content/home";

const order = (i: number) => ({ "--i": i }) as CSSProperties;

// The headline starts with "I". The record deck is tucked in after it.
const [firstWord, ...restWords] = hero.headline.split(" ");

// Full-bleed hero: tag, headline and CTAs on a blue gradient that fades into the page.
export function Hero() {
  return (
    <section
      id="top"
      data-loading-header
      aria-labelledby="hero-title"
      className="hero-gradient hero-drift relative isolate flex min-h-[100dvh] flex-col justify-center overflow-clip"
    >
      {/* Film grain over the gradient. overflow-clip trims its 1em overhang without adding scroll width. */}
      <div aria-hidden className="grain" data-grain-animate="true" />

      <div className="relative z-[1] mx-auto w-full max-w-[1320px] px-6 pb-[18vh] pt-24 text-center sm:px-12 lg:px-24 xl:px-36">
        <p className="rise text-[15px] font-medium text-bento-on-blue sm:text-base" style={order(0)}>
          {hero.nameLine}
        </p>

        <h1
          id="hero-title"
          className="rise mt-6 text-balance text-[40px] font-medium leading-[1.06] tracking-[-0.04em] text-bento-on-blue sm:text-[52px] lg:text-[60px] xl:text-[72px] xl:leading-[1.04]"
          style={order(1)}
        >
          {firstWord}{" "}
          <VinylPlayer src={hero.track.src} label={hero.track.label} />{" "}
          {restWords.join(" ")}
        </h1>

        <div className="rise mt-10 flex flex-wrap items-center justify-center gap-3" style={order(2)}>
          {/* Bubble arrow button, ported from Sudhanshu's reference; styles in globals.css. */}
          <a href={hero.primaryCta.href} className="btn-bubble-arrow">
            <span aria-hidden className="btn-bubble-arrow__arrow">
              <ArrowDownRight size="40%" className="btn-bubble-arrow__arrow-svg" />
            </span>
            <span className="btn-bubble-arrow__content">
              <span className="btn-bubble-arrow__content-text">{hero.primaryCta.label}</span>
            </span>
            <span aria-hidden className="btn-bubble-arrow__arrow is--duplicate">
              <ArrowDownRight size="40%" className="btn-bubble-arrow__arrow-svg" />
            </span>
          </a>
          {/* Bouncy button, ported from Sudhanshu's reference; styles in globals.css. */}
          <a href={hero.secondaryCta.href} className="btn-bounce">
            <span aria-hidden className="btn-bounce-bg" />
            <span className="btn-bounce-text__wrap">
              <span className="btn-bounce-text">{hero.secondaryCta.label}</span>
            </span>
          </a>
        </div>
      </div>

      <DraggableStickers stickers={hero.stickers} />
    </section>
  );
}
