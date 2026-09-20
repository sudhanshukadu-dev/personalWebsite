import type { ReactNode } from "react";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/ssr";
import { rich, type CaseBlock } from "@/components/work/CaseBlocks";
import { VisualPlaceholder } from "@/components/work/VisualPlaceholder";
import { cn } from "@/lib/cn";

/*
  Editorial rendering of the case study blocks, opted into with `layout: "editorial"`
  on a case study (components/work/CaseStudyPage.tsx). Same CaseBlock union as
  CaseBlocks.tsx, a different idea of what deserves a box: prose reads as prose on the
  page, mono labels sit out in the left margin, statements become full-bleed bands, and
  only a real object (a comparison, a table, a screen) keeps a panel. Everything sits on
  the section's breakout grid, so blocks can take the text column, the wider column or
  the whole screen. Styles live in globals.css (.case-row, .case-prose, .case-band ...).
*/

// One line of the editorial spine: an optional mono label in the left margin, the
// content in the column that every other block shares.
function Row({ label, children, className }: { label?: string; children: ReactNode; className?: string }) {
  return (
    <div className={cn("case-row reveal", className)}>
      {label ? <p className="case-row__label">{label}</p> : null}
      <div className="case-row__body">{children}</div>
    </div>
  );
}

// The tile that slides into a row on hover (components/work/editorial/DirectionalRows.tsx).
function RowTile() {
  return <span aria-hidden data-directional-hover-tile className="dir-tile" />;
}

function Checks({ items }: { items: string[] }) {
  return (
    <ul className="case-checks" data-directional-hover data-type="y">
      {items.map((item) => (
        <li key={item} data-directional-hover-item>
          <RowTile />
          <CheckCircle size={20} aria-hidden />
          <span>{rich(item)}</span>
        </li>
      ))}
    </ul>
  );
}

function Block({ block }: { block: CaseBlock }) {
  switch (block.type) {
    case "subheading":
      return (
        <Row className="case-row--subhead">
          <h3 className="case-subhead">{block.text}</h3>
        </Row>
      );

    case "text":
      return (
        <Row label={block.label}>
          <div className={cn(block.tone === "tint" && "case-aside")}>
            {block.title ? <p className="case-lead">{rich(block.title)}</p> : null}
            {block.paragraphs.map((paragraph) => (
              <p key={paragraph} className="case-prose">
                {rich(paragraph)}
              </p>
            ))}
          </div>
        </Row>
      );

    // A real side by side, so this one keeps a panel, pared back to a hairline and a tint.
    case "cards":
      return (
        <div className={cn("case-panels reveal", block.columns === 3 && "case-panels--three")}>
          {block.items.map((item) => (
            <div key={item.title ?? item.label ?? item.text} className="case-panel">
              {item.label ? <p className="case-panel__label">{item.label}</p> : null}
              {item.title ? <p className="case-panel__title">{rich(item.title)}</p> : null}
              {item.text ? <p className="case-panel__text">{rich(item.text)}</p> : null}
              {item.points ? <Checks items={item.points} /> : null}
            </div>
          ))}
        </div>
      );

    case "numbered":
      return (
        <div className="case-row reveal">
          {block.label ? <p className="case-row__label">{block.label}</p> : null}
          <div className="case-row__body">
            {block.lead ? <p className="case-lead">{rich(block.lead)}</p> : null}
            <ol className="case-numbers" data-directional-hover data-type="y">
              {block.items.map((item, index) => (
                <li key={item.title} data-directional-hover-item>
                  <RowTile />
                  <span aria-hidden className="case-numbers__n">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="case-numbers__title">{rich(item.title)}</p>
                    <p className="case-numbers__text">{rich(item.text)}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      );

    case "list":
      return (
        <Row label={block.label}>
          <Checks items={block.items} />
        </Row>
      );

    case "table":
      return (
        <div className="case-wide reveal">
          {block.label ? <p className="case-row__label case-row__label--over">{block.label}</p> : null}
          <div className="case-list" role="table" data-directional-hover data-type="y">
            <div className="case-list__head" role="row">
              {block.head.map((cell) => (
                <p key={cell} role="columnheader" className="case-list__eyebrow">
                  {cell}
                </p>
              ))}
            </div>
            {block.rows.map((row) => (
              <div key={row.join("|")} role="row" className="case-list__item" data-directional-hover-item>
                <RowTile />
                {row.map((cell, index) => (
                  <p key={index} role={index === 0 ? "rowheader" : "cell"} className="case-list__cell">
                    {rich(cell)}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      );

    // The page's punctuation: the blue ones cross the whole screen, the rest are
    // pull quotes with a rule, never a box.
    case "statement":
      if (block.tone === "blue") {
        return (
          <aside className="case-band">
            <div className="case-band__inner reveal">
              {block.label ? <p className="case-row__label">{block.label}</p> : null}
              <p className="case-band__text">{rich(block.text)}</p>
            </div>
          </aside>
        );
      }
      return (
        <blockquote className="case-quote reveal">
          {block.label ? <p className="case-row__label">{block.label}</p> : null}
          <p className="case-quote__text">{rich(block.text)}</p>
        </blockquote>
      );

    case "flow":
      return (
        <div className="case-wide reveal">
          {block.label ? <p className="case-row__label case-row__label--over">{block.label}</p> : null}
          <ol className="case-steps">
            {block.steps.map((step, index) => (
              <li key={step}>
                <span className="case-steps__step">{rich(step)}</span>
                {index < block.steps.length - 1 ? <ArrowRight size={16} aria-hidden /> : null}
              </li>
            ))}
          </ol>
        </div>
      );

    case "stats":
      return (
        <dl className="case-stats reveal">
          {block.items.map((item) => (
            <div key={item.caption}>
              <dt>{item.figure}</dt>
              <dd>{item.caption}</dd>
            </div>
          ))}
        </dl>
      );

    case "visual":
      // TODO: swap the placeholder for next/image once the screen is exported; the
      // figure is already sized for it.
      return (
        <figure className="case-figure reveal">
          <VisualPlaceholder label={block.label} className="case-figure__frame" />
          <figcaption>{block.label}</figcaption>
        </figure>
      );
  }
}

export function EditorialBlocks({ blocks }: { blocks: CaseBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </>
  );
}
