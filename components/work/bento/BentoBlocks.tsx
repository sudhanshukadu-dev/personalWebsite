import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { CheckCircle } from "@phosphor-icons/react/ssr";
import { rich, type CaseBlock } from "@/components/work/CaseBlocks";
import { VisualPlaceholder } from "@/components/work/VisualPlaceholder";
import { FlowChain, FlowTree } from "@/components/work/bento/FlowTree";
import { AutoplayVideo } from "@/components/effects/AutoplayVideo";
import { LogoMarquee } from "@/components/work/blocks/LogoMarquee";
import { Testimonials } from "@/components/work/blocks/Testimonials";
import { cn } from "@/lib/cn";

/*
  Bento rendering of the case study blocks, after the Aboard reference Sudhanshu shared,
  opted into with `layout: "bento"` on a case study (components/work/CaseStudyPage.tsx).
  Same CaseBlock union and the same copy as CaseBlocks.tsx; only the arrangement changes.
  Instead of one full-width card per block stacked in a column, each section's blocks are
  planned onto a six-column grid, the way Aboard lays out a section:

  - a screen and the text about it become one wide "feature" tile, screen on the left;
  - statements, stats, short lists and asides become chunky colour tiles, paired up;
  - long runs of short items (what shipped) become a cloud of chips;
  - a run of flows for different people becomes one flow diagram, the product at the
    root and each person branching off it (FlowTree.tsx); a lone flow is a chain;
  - a row that would be left with a hole is stretched to close it, so the grid always
    closes and nothing is reordered except a screen moving up beside its own text.

  Tiles come in three tones: a neutral card, a pale wash of the project colour and the
  solid project colour, which [data-project-theme] supplies. A few solid tiles carry one
  of the site's stickers, the way Aboard's carry its characters. Styles live in
  globals.css (.bento, .bento-tile).
*/

type TextBlock = Extract<CaseBlock, { type: "text" }>;
type StatementBlock = Extract<CaseBlock, { type: "statement" }>;
type ListBlock = Extract<CaseBlock, { type: "list" }>;
type FlowBlock = Extract<CaseBlock, { type: "flow" }>;
type CardItem = Extract<CaseBlock, { type: "cards" }>["items"][number];

type Tile = { span: number } & (
  | { kind: "heading"; text: string }
  | { kind: "feature"; title?: string; text: TextBlock; visual: string }
  | { kind: "text"; block: TextBlock }
  | { kind: "statement"; block: StatementBlock }
  | { kind: "stat"; figure: string; caption: string }
  | { kind: "card"; item: CardItem }
  | { kind: "list"; block: ListBlock }
  | { kind: "chips"; block: ListBlock }
  | { kind: "flow"; block: FlowBlock }
  | { kind: "tree"; flows: FlowBlock[] }
  | { kind: "other"; block: CaseBlock }
);

const WIDE = 6;
const HALF = 3;
const THIRD = 2;

const STICKERS = ["cloud", "heart", "brain", "keyboard", "pencil", "camera", "mailbox"];

// A list of many short items reads better as chips than as a checklist.
export const isChipList = (block: ListBlock) => block.items.length >= 6 && block.items.every((item) => item.length <= 60);

// One section's blocks, planned onto the grid.
function plan(blocks: CaseBlock[]): Tile[] {
  // Subheadings split a section into groups; each group is planned on its own.
  const groups: { heading?: string; blocks: CaseBlock[] }[] = [{ blocks: [] }];
  for (const block of blocks) {
    if (block.type === "subheading") groups.push({ heading: block.text, blocks: [] });
    else groups[groups.length - 1].blocks.push(block);
  }

  const tiles: Tile[] = [];
  for (const group of groups) {
    const queue = [...group.blocks];

    // Aboard's wide tile: the group's screen beside its first plain text. The group's
    // subheading, if any, becomes that tile's title rather than a row of its own.
    const textIndex = queue.findIndex((block) => block.type === "text" && !block.tone && !block.label);
    const visualIndex = queue.findIndex((block) => block.type === "visual");
    let feature: Tile | null = null;
    if (textIndex >= 0 && visualIndex >= 0) {
      const text = queue[textIndex] as TextBlock;
      const visual = queue[visualIndex] as Extract<CaseBlock, { type: "visual" }>;
      feature = { kind: "feature", span: WIDE, title: group.heading, text, visual: visual.label };
      queue.splice(visualIndex, 1);
    }

    if (group.heading && !feature) tiles.push({ kind: "heading", span: WIDE, text: group.heading });

    for (let index = 0; index < queue.length; index++) {
      const block = queue[index];
      if (feature && block === (feature as Extract<Tile, { kind: "feature" }>).text) {
        tiles.push(feature);
        continue;
      }
      // Consecutive flows, each for someone different, share one diagram.
      if (block.type === "flow") {
        const run: FlowBlock[] = [block];
        while (queue[index + 1]?.type === "flow") run.push(queue[++index] as FlowBlock);
        if (run.length > 1 && run.every((flow) => flow.label)) tiles.push({ kind: "tree", span: WIDE, flows: run });
        else run.forEach((flow) => tiles.push({ kind: "flow", span: WIDE, block: flow }));
        continue;
      }
      switch (block.type) {
        case "text":
          tiles.push({ kind: "text", span: block.tone || block.label ? HALF : WIDE, block });
          break;
        case "statement":
          tiles.push({ kind: "statement", span: HALF, block });
          break;
        case "stats":
          block.items.forEach((item) =>
            tiles.push({ kind: "stat", span: block.items.length === 3 ? THIRD : HALF, ...item }),
          );
          break;
        case "cards":
          block.items.forEach((item) =>
            tiles.push({ kind: "card", span: block.items.length === 3 ? THIRD : HALF, item }),
          );
          break;
        case "list":
          if (isChipList(block)) tiles.push({ kind: "chips", span: WIDE, block });
          else tiles.push({ kind: "list", span: block.items.length <= 5 ? HALF : WIDE, block });
          break;
        default:
          tiles.push({ kind: "other", span: WIDE, block });
      }
    }
  }

  // Close every row: tiles fill rows left to right, and a row that ends short is
  // stretched evenly across its tiles, so the grid never shows a hole.
  const rows: Tile[][] = [];
  let row: Tile[] = [];
  let filled = 0;
  for (const tile of tiles) {
    if (filled + tile.span > WIDE) {
      rows.push(row);
      row = [];
      filled = 0;
    }
    row.push(tile);
    filled += tile.span;
  }
  if (row.length) rows.push(row);
  for (const line of rows) {
    const total = line.reduce((sum, tile) => sum + tile.span, 0);
    if (total < WIDE && WIDE % line.length === 0) line.forEach((tile) => (tile.span = WIDE / line.length));
  }
  return rows.flat();
}

export function Label({ children }: { children: ReactNode }) {
  return <p className="bento-tile__label">{children}</p>;
}

export function Checks({ items }: { items: string[] }) {
  return (
    <ul className="bento-checks">
      {items.map((item) => (
        <li key={item}>
          <CheckCircle size={18} aria-hidden />
          <span>{rich(item)}</span>
        </li>
      ))}
    </ul>
  );
}

export function Sticker({ index }: { index: number }) {
  const name = STICKERS[index % STICKERS.length];
  return (
    <Image
      src={`/images/stickers/${name}.png`}
      alt=""
      width={160}
      height={160}
      aria-hidden
      className="bento-tile__sticker"
      style={{ "--tilt": `${index % 2 ? 8 : -8}deg` } as CSSProperties}
    />
  );
}

type TileViewProps = { tile: Tile; sticker: number | null; tone?: "solid" | "pale"; product: string };

function TileView({ tile, sticker, tone, product }: TileViewProps) {
  const style = { "--span": tile.span } as CSSProperties;

  switch (tile.kind) {
    case "heading":
      return (
        <h3 className="bento-heading reveal" style={style}>
          {tile.text}
        </h3>
      );

    case "feature":
      return (
        <div className="bento-tile bento-tile--feature reveal" data-tone="card" style={style}>
          <VisualPlaceholder label={tile.visual} className="bento-tile__visual" />
          <div className="bento-tile__copy">
            {tile.title ? <p className="bento-tile__title">{tile.title}</p> : null}
            {tile.text.paragraphs.map((paragraph) => (
              <p key={paragraph} className="bento-tile__text">
                {rich(paragraph)}
              </p>
            ))}
          </div>
        </div>
      );

    case "text": {
      const { block } = tile;
      const wide = tile.span === WIDE;
      return (
        <div
          className={cn("bento-tile reveal", wide ? "bento-tile--prose" : "bento-tile--note")}
          data-tone={block.tone === "tint" || block.label ? "pale" : "card"}
          style={style}
        >
          {block.label ? <Label>{block.label}</Label> : null}
          {block.title ? <p className="bento-tile__title">{rich(block.title)}</p> : null}
          <div className={cn(wide && block.paragraphs.length > 1 && "bento-tile__columns")}>
            {block.paragraphs.map((paragraph) => (
              <p key={paragraph} className="bento-tile__text">
                {rich(paragraph)}
              </p>
            ))}
          </div>
        </div>
      );
    }

    case "statement": {
      const { block } = tile;
      const solid = block.tone === "blue";
      return (
        <div className="bento-tile bento-tile--statement reveal" data-tone={solid ? "solid" : "card"} style={style}>
          {block.label ? <Label>{block.label}</Label> : <span aria-hidden />}
          <p className="bento-tile__statement">{rich(block.text)}</p>
          {sticker !== null ? <Sticker index={sticker} /> : null}
        </div>
      );
    }

    case "stat":
      return (
        <div className="bento-tile bento-tile--stat reveal" data-tone={tone ?? "solid"} style={style}>
          <p className="bento-tile__figure">{tile.figure}</p>
          <p className="bento-tile__caption">{tile.caption}</p>
        </div>
      );

    case "card": {
      const { item } = tile;
      return (
        <div className="bento-tile bento-tile--card reveal" data-tone="card" style={style}>
          {item.label ? <Label>{item.label}</Label> : null}
          {item.title ? <p className="bento-tile__title">{rich(item.title)}</p> : null}
          {item.text ? <p className="bento-tile__text">{rich(item.text)}</p> : null}
          {item.points ? <Checks items={item.points} /> : null}
        </div>
      );
    }

    case "list":
      return (
        <div className="bento-tile bento-tile--card reveal" data-tone="pale" style={style}>
          {tile.block.label ? <Label>{tile.block.label}</Label> : null}
          <Checks items={tile.block.items} />
        </div>
      );

    // Aboard's "bits and pieces": a centred cloud of chips.
    case "chips":
      return (
        <div className="bento-chips reveal" style={style}>
          {tile.block.label ? <Label>{tile.block.label}</Label> : null}
          <ul>
            {tile.block.items.map((item) => (
              <li key={item}>
                <CheckCircle size={16} weight="fill" aria-hidden />
                {rich(item)}
              </li>
            ))}
          </ul>
        </div>
      );

    case "flow":
      return (
        <div className="bento-tile bento-tile--flow reveal" data-tone="pale" style={style}>
          {tile.block.label ? <Label>{tile.block.label}</Label> : null}
          <FlowChain steps={tile.block.steps} />
        </div>
      );

    case "tree":
      return (
        <div className="bento-tile bento-tile--tree reveal" data-tone="card" style={style}>
          <FlowTree root={product} flows={tile.flows} />
        </div>
      );

    case "other":
      return <OtherTile block={tile.block} style={style} />;
  }
}

// Numbered lists, tables and lone screens keep a wide neutral tile.
function OtherTile({ block, style }: { block: CaseBlock; style: CSSProperties }) {
  if (block.type === "numbered") {
    return (
      <div className="bento-tile reveal" data-tone="card" style={style}>
        {block.label ? <Label>{block.label}</Label> : null}
        {block.lead ? <p className="bento-tile__title">{rich(block.lead)}</p> : null}
        <ol className="bento-numbered">
          {block.items.map((item, index) => (
            <li key={item.title}>
              <span className="bento-numbered__n">{index + 1}</span>
              <p className="bento-numbered__title">{rich(item.title)}</p>
              <p className="bento-numbered__text">{rich(item.text)}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  }
  if (block.type === "logos") {
    return <LogoMarquee items={block.items} label={block.label} />;
  }
  if (block.type === "testimonials") {
    return <Testimonials items={block.items} label={block.label} />;
  }
  if (block.type === "visual") {
    return (
      <div
        className="bento-tile bento-tile--screen reveal"
        data-tone="pale"
        style={style}
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
          <VisualPlaceholder label={block.label} className="bento-tile__visual" />
        )}
      </div>
    );
  }
  if (block.type === "table") {
    return (
      <div className="bento-tile reveal" data-tone="card" style={style}>
        {block.label ? <Label>{block.label}</Label> : null}
        <div className="bento-table">
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
      </div>
    );
  }
  return null;
}

// `product` names the root of a flow diagram; `stickerStart` staggers stickers across
// sections so neighbours don't repeat.
export function BentoBlocks({
  blocks,
  product,
  stickerStart = 0,
}: {
  blocks: CaseBlock[];
  product: string;
  stickerStart?: number;
}) {
  const tiles = plan(blocks);

  // Decided in one pass before rendering: which solid statements carry a sticker, and
  // which tone each stat takes. Aboard pairs a pale tile with a solid one, so a stat
  // takes whichever tone its neighbour doesn't.
  const decorated: { tile: Tile; sticker: number | null; tone?: "solid" | "pale" }[] = [];
  let stickers = 0;
  let previous: "solid" | "pale" = "pale";
  for (const tile of tiles) {
    let sticker: number | null = null;
    let tone: "solid" | "pale" | undefined;
    if (tile.kind === "statement") {
      const solid = tile.block.tone === "blue";
      if (solid && tile.span >= HALF) sticker = stickerStart + stickers++;
      previous = solid ? "solid" : "pale";
    } else if (tile.kind === "stat") {
      tone = previous === "solid" ? "pale" : "solid";
      previous = tone;
    }
    decorated.push({ tile, sticker, tone });
  }

  return (
    <div className="bento">
      {decorated.map(({ tile, sticker, tone }, index) => (
        <TileView key={index} tile={tile} sticker={sticker} tone={tone} product={product} />
      ))}
    </div>
  );
}
