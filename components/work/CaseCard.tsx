import type { ElementType, ReactNode } from "react";
import type { Icon } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

export type CardTone = "card" | "tint" | "blue" | "ink";

const PADDING = {
  default: "p-6 sm:p-8",
  large: "p-6 sm:p-10 lg:p-12",
  // For cards whose rows carry their own padding (divided lists).
  none: "",
} as const;

type CaseCardProps = {
  tone?: CardTone;
  padding?: keyof typeof PADDING;
  as?: ElementType;
  className?: string;
  children: ReactNode;
};

/*
  Case study card, after the Aboard reference's coloured tiles: one shape (28px
  corners), four tones. Each tone sets --card-muted (secondary text that stays
  readable on it), --card-accent (icons) and --card-soft (inset panels); see
  .case-card in globals.css. Cards rise in as they scroll into view.
*/
export function CaseCard({ tone = "card", padding = "default", as: Tag = "div", className, children }: CaseCardProps) {
  return (
    <Tag data-tone={tone} className={cn("case-card reveal", PADDING[padding], className)}>
      {children}
    </Tag>
  );
}

// Small mono label at the top of a card.
export function CardLabel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("font-mono text-[12px] uppercase leading-[1.3] tracking-[0.06em] text-(--card-muted)", className)}>
      {children}
    </p>
  );
}

// Round icon chip in the card's accent colour.
export function IconBadge({ icon: IconComponent, className }: { icon: Icon; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "grid size-11 flex-none place-items-center rounded-full bg-(--card-soft) text-(--card-accent)",
        className,
      )}
    >
      <IconComponent size={22} />
    </span>
  );
}
