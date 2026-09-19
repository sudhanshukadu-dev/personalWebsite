import { Fragment, type ReactNode } from "react";
import { ArrowRight, CheckCircle } from "@phosphor-icons/react/ssr";
import { CardLabel, CaseCard, type CardTone } from "@/components/work/CaseCard";
import { CaseSubheading } from "@/components/work/CaseSection";
import { VisualPlaceholder } from "@/components/work/VisualPlaceholder";
import { cn } from "@/lib/cn";

/*
  Content blocks for data-driven case studies (Shriram, Knode, Networth). Each block is
  one of the card patterns from the Quest2Travel page, so every case study shares its
  look: text cards, card grids, numbered decisions, checklists, tables, statements,
  step flows, stats and image placeholders. Copy may use **bold** and *italic*.
*/

export type CaseBlock =
  | { type: "subheading"; text: string }
  | { type: "text"; label?: string; title?: string; paragraphs: string[]; tone?: CardTone }
  | {
      type: "cards";
      columns?: 2 | 3 | 4;
      items: { label?: string; title?: string; text?: string; points?: string[]; tone?: CardTone }[];
    }
  | { type: "numbered"; label?: string; lead?: string; items: { title: string; text: string }[]; tone?: CardTone }
  | { type: "list"; label?: string; items: string[]; tone?: CardTone }
  | { type: "table"; label?: string; head: string[]; rows: string[][] }
  | { type: "statement"; label?: string; text: string; tone?: "blue" | "ink" | "tint" }
  | { type: "flow"; label?: string; steps: string[] }
  | { type: "stats"; items: { figure: string; caption: string }[] }
  | { type: "visual"; label: string };

// **bold** and *italic* inside copy.
export function rich(text: string): ReactNode {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/).map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) return <em key={index}>{part.slice(1, -1)}</em>;
    return <Fragment key={index}>{part}</Fragment>;
  });
}

const GRID = { 2: "md:grid-cols-2", 3: "md:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" } as const;

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="mt-5 flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[16px] leading-[1.55]">
          <CheckCircle size={20} aria-hidden className="mt-0.5 flex-none text-(--card-accent)" />
          <span>{rich(item)}</span>
        </li>
      ))}
    </ul>
  );
}

function Block({ block }: { block: CaseBlock }) {
  switch (block.type) {
    case "subheading":
      return <CaseSubheading>{block.text}</CaseSubheading>;

    case "text":
      return (
        <CaseCard tone={block.tone}>
          {block.label ? <CardLabel>{block.label}</CardLabel> : null}
          {block.title ? (
            <p className={cn("text-[22px] font-medium leading-[1.3] tracking-[-0.02em]", block.label && "mt-4")}>
              {rich(block.title)}
            </p>
          ) : null}
          <div className={cn("flex max-w-[70ch] flex-col gap-4", (block.label || block.title) && "mt-4")}>
            {block.paragraphs.map((paragraph) => (
              <p key={paragraph} className="text-[17px] leading-[1.65]">
                {rich(paragraph)}
              </p>
            ))}
          </div>
        </CaseCard>
      );

    case "cards":
      return (
        <div className={cn("grid gap-4 sm:gap-5", GRID[block.columns ?? 2])}>
          {block.items.map((item) => (
            <CaseCard key={item.title ?? item.label ?? item.text} tone={item.tone}>
              {item.label ? <CardLabel>{item.label}</CardLabel> : null}
              {item.title ? (
                <p className={cn("text-[20px] font-medium leading-[1.3] tracking-[-0.02em]", item.label && "mt-4")}>
                  {rich(item.title)}
                </p>
              ) : null}
              {item.text ? (
                <p className={cn("text-[16px] leading-[1.6]", (item.label || item.title) && "mt-3")}>{rich(item.text)}</p>
              ) : null}
              {item.points ? <Checklist items={item.points} /> : null}
            </CaseCard>
          ))}
        </div>
      );

    case "numbered":
      return (
        <CaseCard tone={block.tone}>
          {block.label ? <CardLabel>{block.label}</CardLabel> : null}
          {block.lead ? (
            <p className="mt-4 text-[20px] font-medium leading-[1.35] tracking-[-0.02em]">{rich(block.lead)}</p>
          ) : null}
          <ol className={cn("flex flex-col divide-y divide-bento-line", (block.label || block.lead) && "mt-6")}>
            {block.items.map((item, index) => (
              <li key={item.title} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                <span
                  aria-hidden
                  className="grid size-8 flex-none place-items-center rounded-full bg-bento-blue text-[13px] font-medium text-bento-on-blue"
                >
                  {index + 1}
                </span>
                <div>
                  <p className="text-[17px] font-medium leading-[1.4]">{rich(item.title)}</p>
                  <p className="mt-1 text-[15px] leading-[1.6] text-(--card-muted)">{rich(item.text)}</p>
                </div>
              </li>
            ))}
          </ol>
        </CaseCard>
      );

    case "list":
      return (
        <CaseCard tone={block.tone}>
          {block.label ? <CardLabel>{block.label}</CardLabel> : null}
          <Checklist items={block.items} />
        </CaseCard>
      );

    case "table":
      return (
        <CaseCard padding="none" className="overflow-hidden">
          {block.label ? <CardLabel className="px-6 pt-6 sm:px-8 sm:pt-8">{block.label}</CardLabel> : null}
          <div className={cn("overflow-x-auto", block.label ? "mt-4" : "pt-2")}>
            <table className="w-full min-w-[560px] border-collapse text-left text-[15px] leading-[1.55]">
              <thead>
                <tr className="border-b border-bento-line">
                  {block.head.map((cell) => (
                    <th
                      key={cell}
                      scope="col"
                      className="px-6 py-4 font-mono text-[12px] font-normal uppercase tracking-[0.06em] text-(--card-muted) first:pl-6 sm:px-8"
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-bento-line">
                {block.rows.map((row) => (
                  <tr key={row.join("|")}>
                    {row.map((cell, index) =>
                      index === 0 ? (
                        <th key={index} scope="row" className="px-6 py-4 align-top font-medium sm:px-8">
                          {rich(cell)}
                        </th>
                      ) : (
                        <td key={index} className="px-6 py-4 align-top sm:px-8">
                          {rich(cell)}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CaseCard>
      );

    case "statement":
      return (
        <CaseCard tone={block.tone ?? "ink"} padding="large">
          {block.label ? <CardLabel>{block.label}</CardLabel> : null}
          <p
            className={cn(
              "max-w-[36ch] text-balance text-[24px] font-medium leading-[1.3] tracking-[-0.03em] sm:text-[32px]",
              block.label && "mt-5",
            )}
          >
            {rich(block.text)}
          </p>
        </CaseCard>
      );

    case "flow":
      return (
        <CaseCard tone="tint">
          {block.label ? <CardLabel>{block.label}</CardLabel> : null}
          <ol className={cn("flex flex-wrap items-center gap-x-2 gap-y-3", block.label && "mt-5")}>
            {block.steps.map((step, index) => (
              <li key={step} className="flex items-center gap-2">
                <span className="rounded-full bg-(--card-soft) px-4 py-2 text-[15px] font-medium leading-[1.35]">
                  {rich(step)}
                </span>
                {index < block.steps.length - 1 ? (
                  <ArrowRight size={16} aria-hidden className="flex-none text-(--card-accent)" />
                ) : null}
              </li>
            ))}
          </ol>
        </CaseCard>
      );

    case "stats":
      return (
        <div className={cn("grid gap-4 sm:gap-5", GRID[Math.min(Math.max(block.items.length, 2), 4) as 2 | 3 | 4])}>
          {block.items.map((item) => (
            <CaseCard key={item.caption} tone="blue">
              <p className="text-[48px] font-medium leading-[1] tracking-[-0.05em] sm:text-[60px]">{item.figure}</p>
              <p className="mt-3 text-[16px] font-medium leading-[1.4]">{item.caption}</p>
            </CaseCard>
          ))}
        </div>
      );

    case "visual":
      // TODO: replace each placeholder with the real screen once it's exported.
      return (
        <CaseCard tone="tint" padding="none" className="p-3 sm:p-4">
          <VisualPlaceholder label={block.label} className="aspect-[16/9]" />
        </CaseCard>
      );
  }
}

export function CaseBlocks({ blocks }: { blocks: CaseBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </>
  );
}
