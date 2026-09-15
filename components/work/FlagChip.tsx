import { Warning, WarningOctagon } from "@phosphor-icons/react/ssr";
import { cn } from "@/lib/cn";

// Policy flag chip: Critical is solid ink, Warning is outlined. Kept in the site's
// black, white and blue, with the icon carrying the difference alongside the word.
export function FlagChip({ tier, label }: { tier: "warning" | "critical"; label: string }) {
  const TierIcon = tier === "critical" ? WarningOctagon : Warning;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-medium leading-none",
        tier === "critical"
          ? "bg-bento-ink text-bento-page"
          : "bg-bento-card text-bento-ink shadow-[inset_0_0_0_1px_var(--bento-line)]",
      )}
    >
      <TierIcon size={14} weight="bold" aria-hidden />
      {label}
    </span>
  );
}
