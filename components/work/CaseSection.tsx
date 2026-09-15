import type { ReactNode } from "react";

type CaseSectionProps = {
  id: string;
  tag: string;
  title: string;
  intro?: string;
  children: ReactNode;
};

// A case study section, after the Aboard reference: a blue tag chip, a large heading
// and an optional intro, then the section's cards stacked with an even gap.
export function CaseSection({ id, tag, title, intro, children }: CaseSectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="py-16 sm:py-24">
      <div className="mx-auto w-full max-w-[1320px] px-6 sm:px-12 lg:px-24 xl:px-36">
        <header className="reveal max-w-3xl">
          <p className="inline-flex rounded-full bg-bento-blue px-3 py-1.5 text-[13px] font-medium leading-none text-bento-on-blue">
            {tag}
          </p>
          <h2
            id={`${id}-title`}
            className="mt-5 text-balance text-[32px] font-medium leading-[1.08] tracking-[-0.04em] text-bento-ink sm:text-[44px] lg:text-[52px]"
          >
            {title}
          </h2>
          {intro ? (
            <p className="mt-5 max-w-[60ch] text-[17px] leading-[1.6] text-bento-muted sm:text-lg">{intro}</p>
          ) : null}
        </header>

        <div className="mt-10 flex flex-col gap-4 sm:mt-14 sm:gap-5">{children}</div>
      </div>
    </section>
  );
}

// A heading for a group of cards inside a section.
export function CaseSubheading({ children }: { children: ReactNode }) {
  return (
    <h3 className="reveal mt-8 text-[24px] font-medium leading-[1.15] tracking-[-0.03em] text-bento-ink first:mt-0 sm:mt-12 sm:text-[30px]">
      {children}
    </h3>
  );
}
