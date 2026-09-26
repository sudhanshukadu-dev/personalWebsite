import type { CaseBlock } from "@/components/work/CaseBlocks";
import { rich } from "@/components/work/CaseBlocks";
import { VisualPlaceholder } from "@/components/work/VisualPlaceholder";
import { Checks, isChipList, Label, Sticker } from "@/components/work/bento/BentoBlocks";
import { FlowChain, FlowTree } from "@/components/work/bento/FlowTree";
import { AutoplayVideo } from "@/components/effects/AutoplayVideo";
import { LogoMarquee } from "@/components/work/blocks/LogoMarquee";
import { Testimonials } from "@/components/work/blocks/Testimonials";

/*
  Story rendering of the case study blocks, after the Hubhopper case study Sudhanshu
  shared, for `layout: "story"` (components/work/CaseStudyPage.tsx). Same CaseBlock union
  and the same copy; a calmer arrangement than the bento. A section reads as one column,
  told in large type with nothing boxed around it. Rectangles are kept for what earns
  them:

  - the big statements, as a solid tile in the project colour with a sticker (one colour
    moment in a section, like the bento's);
  - the asides ("Trade-off accepted") as a pale note;
  - side-by-side comparisons as a pair of tiles;
  - screens, as figures a little wider than the text;
  - the flow diagram, on its own tile.

  Everything else is type: prose, pulled lines, lists, figures for numbers, numbered
  decisions. Tiles reuse the bento's styles (.bento-tile); the rest is .story in
  globals.css.
*/

type Flow = Extract<CaseBlock, { type: "flow" }>;

function StoryBlock({ block, sticker }: { block: CaseBlock; sticker: number | null }) {
  switch (block.type) {
    case "subheading":
      return <h3 className="story-subhead">{block.text}</h3>;

    case "text":
      // Asides and labelled notes sit on a pale tile; plain prose is just the story.
      if (block.tone || block.label) {
        return (
          <aside className="bento-tile story-note" data-tone="pale">
            {block.label ? <Label>{block.label}</Label> : null}
            {block.title ? <p className="bento-tile__title">{rich(block.title)}</p> : null}
            <div>
              {block.paragraphs.map((paragraph) => (
                <p key={paragraph} className="bento-tile__text">
                  {rich(paragraph)}
                </p>
              ))}
            </div>
          </aside>
        );
      }
      return (
        <div className="story-prose">
          {block.title ? <p className="story-lead">{rich(block.title)}</p> : null}
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph}>{rich(paragraph)}</p>
          ))}
        </div>
      );

    case "statement":
      // The big ones get the section's colour moment; the rest are pulled out in type.
      if (block.tone === "blue") {
        return (
          <div className="bento-tile bento-tile--statement story-statement" data-tone="solid">
            {block.label ? <Label>{block.label}</Label> : <span aria-hidden />}
            <p className="bento-tile__statement">{rich(block.text)}</p>
            {sticker !== null ? <Sticker index={sticker} /> : null}
          </div>
        );
      }
      return (
        <figure className="story-pull">
          {block.label ? <figcaption className="story-label">{block.label}</figcaption> : null}
          <blockquote>
            <p>{rich(block.text)}</p>
          </blockquote>
        </figure>
      );

    case "stats":
      return (
        <dl className="story-stats">
          {block.items.map((item) => (
            <div key={item.caption}>
              <dt>{item.figure}</dt>
              <dd>{item.caption}</dd>
            </div>
          ))}
        </dl>
      );

    case "cards":
      return (
        <div className="story-pair">
          {block.items.map((item) => (
            <div key={item.title ?? item.label ?? item.text} className="bento-tile" data-tone="card">
              {item.label ? <Label>{item.label}</Label> : null}
              {item.title ? <p className="bento-tile__title">{rich(item.title)}</p> : null}
              {item.text ? <p className="bento-tile__text">{rich(item.text)}</p> : null}
              {item.points ? <Checks items={item.points} /> : null}
            </div>
          ))}
        </div>
      );

    case "list":
      if (isChipList(block)) {
        return (
          <div className="bento-chips story-chips">
            {block.label ? <Label>{block.label}</Label> : null}
            <ul>
              {block.items.map((item) => (
                <li key={item}>{rich(item)}</li>
              ))}
            </ul>
          </div>
        );
      }
      return (
        <div className="story-list">
          {block.label ? <p className="story-label">{block.label}</p> : null}
          <ul>
            {block.items.map((item) => (
              <li key={item}>{rich(item)}</li>
            ))}
          </ul>
        </div>
      );

    case "numbered":
      return (
        <div className="story-numbered">
          {block.label ? <p className="story-label">{block.label}</p> : null}
          {block.lead ? <p className="story-lead">{rich(block.lead)}</p> : null}
          <ol>
            {block.items.map((item) => (
              <li key={item.title}>
                <p className="story-numbered__title">{rich(item.title)}</p>
                <p>{rich(item.text)}</p>
              </li>
            ))}
          </ol>
        </div>
      );

    case "flow":
      return (
        <div className="story-flow">
          {block.label ? <p className="story-label">{block.label}</p> : null}
          <FlowChain steps={block.steps} />
        </div>
      );

    case "logos":
      return <LogoMarquee items={block.items} label={block.label} />;

    case "testimonials":
      return <Testimonials items={block.items} label={block.label} />;

    case "visual":
      // TODO: swap the placeholder for next/image once the screen is exported.
      return (
        <figure
          className="story-figure"
          data-parallax="trigger"
          data-parallax-start="6"
          data-parallax-end="-6"
          data-parallax-disable="mobileLandscape"
        >
          {block.video ? (
            <AutoplayVideo
              src={block.video}
              label={block.label}
              className="case-visual__video"
              data-click-zoom=""
              role="button"
              tabIndex={0}
            />
          ) : (
            <VisualPlaceholder label={block.label} className="story-figure__frame" />
          )}
          <figcaption>{block.label}</figcaption>
        </figure>
      );

    case "table":
      return (
        <div className="story-table bento-table">
          {block.label ? <p className="story-label">{block.label}</p> : null}
          <table>
            <thead>
              <tr>
                {block.head.map((cell) => (
                  <th key={cell} scope="col">
                    {cell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row.join("|")}>
                  {row.map((cell, index) =>
                    index === 0 ? (
                      <th key={index} scope="row">
                        {rich(cell)}
                      </th>
                    ) : (
                      <td key={index}>{rich(cell)}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

// A run of flows for different people is drawn as one diagram, on its own tile.
type Item = { kind: "block"; block: CaseBlock; sticker: number | null } | { kind: "tree"; flows: Flow[] };

export function StoryBlocks({
  blocks,
  product,
  stickerStart = 0,
}: {
  blocks: CaseBlock[];
  product: string;
  stickerStart?: number;
}) {
  const items: Item[] = [];
  let stickers = 0;
  for (let index = 0; index < blocks.length; index++) {
    const block = blocks[index];
    if (block.type === "flow") {
      const run: Flow[] = [block];
      while (blocks[index + 1]?.type === "flow") run.push(blocks[++index] as Flow);
      if (run.length > 1 && run.every((flow) => flow.label)) {
        items.push({ kind: "tree", flows: run });
        continue;
      }
      run.forEach((flow) => items.push({ kind: "block", block: flow, sticker: null }));
      continue;
    }
    const sticker = block.type === "statement" && block.tone === "blue" ? stickerStart + stickers++ : null;
    items.push({ kind: "block", block, sticker });
  }

  return (
    <div className="story">
      {items.map((item, index) =>
        item.kind === "tree" ? (
          <div key={index} className="bento-tile bento-tile--tree story-tree" data-tone="card">
            <FlowTree root={product} flows={item.flows} />
          </div>
        ) : (
          <StoryBlock key={index} block={item.block} sticker={item.sticker} />
        ),
      )}
    </div>
  );
}
