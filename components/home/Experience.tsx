import Image from "next/image";
import { DroppingStack } from "@/components/effects/DroppingStack";
import type { CardTone } from "@/components/work/CaseCard";
import { experience } from "@/content/home";

// One tone per role, in order, from the site's card tones.
const TONES: CardTone[] = ["blue", "tint", "ink", "card"];

// Experience: a section title, then the roles as a dropping card stack that pins for
// exactly one screen and steps through the cards as you scroll (or with the prev/next
// controls), then lets the page move on. Each card shows the role's photo, the meta
// and summary, and the name as a big heading.
export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="w-full px-4 sm:px-12">
      <DroppingStack
        prevLabel="Previous role"
        nextLabel="Next role"
        heading={
          <h2
            id="experience-title"
            className="text-balance text-center text-[28px] font-medium leading-none tracking-[-0.04em] text-bento-ink sm:text-[36px] lg:text-[44px]"
          >
            {experience.heading}
          </h2>
        }
      >
        {experience.roles.map((role, index) => (
          <li key={role.title} data-dropping-stack-item className="dropping-stack__item">
            <div data-tone={TONES[index % TONES.length]} className="case-card dropping-stack-card">
              {/* Doubles as the retro rings-and-halftone backdrop (see globals.css). */}
              <div aria-hidden className="dropping-stack-card__before" />
              <div className="dropping-stack-card__content">
                <div className="dropping-stack-card__start">
                  <div className="dropping-stack-card__visual">
                    <div className="dropping-stack-card__visual-before" />
                    {role.polaroid ? (
                      <Image
                        src={role.polaroid.src}
                        alt={role.polaroid.alt}
                        fill
                        draggable={false}
                        sizes="(max-width: 767px) 80vw, 380px"
                        className="object-cover object-[50%_35%]"
                      />
                    ) : null}
                  </div>
                  <div className="dropping-stack-card__words">
                    <p className="font-mono text-[12px] uppercase leading-[1.3] tracking-[0.06em] text-(--card-muted)">
                      {role.meta}
                    </p>
                    <p className="mt-3 text-[15px] font-medium leading-[1.45] sm:text-[17px]">{role.summary}</p>
                  </div>
                </div>
                <div className="dropping-stack-card__end">
                  <h3 className="dropping-stack-card__h">{role.title}.</h3>
                </div>
              </div>
            </div>
          </li>
        ))}
      </DroppingStack>
    </section>
  );
}
