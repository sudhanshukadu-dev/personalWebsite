import { Fragment, type CSSProperties } from "react";
import Image from "next/image";
import { about } from "@/content/home";
import { GradientWaveText } from "@/components/effects/GradientWaveText";
import { PixelatedImageReveal } from "@/components/effects/PixelatedImageReveal";

// Tokens in the copy: {photo} places the portrait chip, [[...]] highlights a phrase.
const PHOTO_TOKEN = "{photo}";
const TOKEN_PATTERN = /(\{photo\}|\[\[[^\]]+\]\])/;
const GRID_SIZE = 7;
const PIXELS = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => ({
  left: `${(index % GRID_SIZE) * (100 / GRID_SIZE)}%`,
  top: `${Math.floor(index / GRID_SIZE) * (100 / GRID_SIZE)}%`,
}));

// The portrait chip: a sketch that pixelates into the real photo on hover.
function PhotoChip() {
  return (
    <span role="img" aria-label={about.photo.alt} tabIndex={0} data-pixelated-image-reveal className="pixel-card">
      <span className="pixel-card__default">
        <Image src={about.photo.sketch} alt="" fill sizes="(max-width: 639px) 110px, 168px" className="object-cover" />
      </span>
      <span data-pixelated-image-reveal-active className="pixel-card__active">
        {/* Eager: it starts hidden, and a lazy load would leave the first reveal blank. */}
        <Image
          src={about.photo.src}
          alt=""
          fill
          loading="eager"
          sizes="(max-width: 639px) 110px, 168px"
          className="object-cover"
        />
      </span>
      <span aria-hidden className="pixel-card__pixels">
        {PIXELS.map((pixel) => (
          <span key={`${pixel.left}-${pixel.top}`} className="pixel-card__pixel" style={pixel} />
        ))}
      </span>
    </span>
  );
}

// nextHighlight numbers the highlights across paragraphs, so their underlines draw in order.
function renderParagraph(paragraph: string, nextHighlight: () => number) {
  return paragraph
    .split(TOKEN_PATTERN)
    .filter(Boolean)
    .map((part, index) => {
      if (part === PHOTO_TOKEN) return <PhotoChip key={index} />;
      if (part.startsWith("[[")) {
        return (
          <mark key={index} className="about-highlight" style={{ "--i": nextHighlight() } as CSSProperties}>
            {part.slice(2, -2)}
          </mark>
        );
      }
      return <Fragment key={index}>{part}</Fragment>;
    });
}

// About: the story as large h3 paragraphs, filled in by one continuous wave as they
// scroll in, with the portrait chip opening the first line. Key phrases are bold, and
// their underlines draw in one after another once the wave has finished.
export function About() {
  let highlightCount = 0;
  const nextHighlight = () => highlightCount++;

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mx-auto flex min-h-[100svh] w-full max-w-[1320px] flex-col justify-center px-6 py-16 text-center sm:px-12 lg:px-24 xl:px-36"
    >
      {/* Keeps the heading outline valid (h1 hero, h2 section, h3 content) without a visible label. */}
      <h2 id="about-title" className="sr-only">
        About
      </h2>

      <GradientWaveText
        as="div"
        className="space-y-6 text-[20px] font-normal leading-[1.45] tracking-[-0.01em] text-bento-ink sm:space-y-8 sm:text-[24px]"
      >
        {about.paragraphs.map((paragraph) => (
          <h3 key={paragraph}>{renderParagraph(paragraph, nextHighlight)}</h3>
        ))}
      </GradientWaveText>

      <PixelatedImageReveal />
    </section>
  );
}
