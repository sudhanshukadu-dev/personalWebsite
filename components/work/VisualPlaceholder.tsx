import { cn } from "@/lib/cn";

// Stand-in for a case study image that hasn't been exported yet. It says what belongs
// here so the layout can be reviewed. TODO: swap each one for next/image once the screens exist.
export function VisualPlaceholder({ label, className }: { label: string; className?: string }) {
  return (
    <div
      className={cn(
        "relative grid aspect-[4/3] w-full place-items-center overflow-hidden rounded-[20px] bg-(--card-soft) p-6",
        className,
      )}
    >
      <div aria-hidden className="visual-placeholder absolute inset-0 text-(--card-muted)" />
      <p className="relative max-w-[32ch] text-balance rounded-full bg-(--card-soft) px-4 py-2 text-center font-mono text-[12px] uppercase leading-[1.6] tracking-[0.06em] text-(--card-muted)">
        {label}
      </p>
    </div>
  );
}
