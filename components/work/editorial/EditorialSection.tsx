import type { ReactNode } from "react";

type Props = {
  id: string;
  number?: string;
  nav: string;
  title: string;
  intro?: string;
  // Sections alternate their background so the page reads as chapters.
  tinted?: boolean;
  children: ReactNode;
};

/*
  A section of an editorial case study: the number out in the left margin, the title
  and intro aligned with the prose, then the blocks on a breakout grid that lets each
  one take the text column, the wider column or the whole screen. Styles live in
  globals.css (.case-section, .case-grid).
*/
export function EditorialSection({ id, number, nav, title, intro, tinted, children }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      data-tinted={tinted ? "" : undefined}
      className="case-section"
    >
      <div className="case-grid">
        <header className="case-row case-row--head">
          <p className="case-row__label">
            {number ? <span className="case-head__number">{number}</span> : null}
            {nav}
          </p>
          <div className="case-row__body">
            <h2 id={`${id}-title`} className="case-head__title reveal">
              {title}
            </h2>
            {intro ? <p className="case-head__intro reveal">{intro}</p> : null}
          </div>
        </header>
        {children}
      </div>
    </section>
  );
}
