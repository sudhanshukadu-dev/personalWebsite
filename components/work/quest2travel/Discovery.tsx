import { Quotes } from "@phosphor-icons/react/ssr";
import { CardLabel, CaseCard } from "@/components/work/CaseCard";
import { CaseSection, CaseSubheading } from "@/components/work/CaseSection";
import { quest2travel } from "@/content/work/quest2travel";
import { cn } from "@/lib/cn";

const { discovery } = quest2travel;

// Discovery: the two research tracks, five competitor lessons, the central finding,
// and the client quote that became the Tips panel.
export function Discovery() {
  return (
    <CaseSection id="discovery" tag={discovery.tag} title={discovery.title}>
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        {discovery.research.map((track, index) => (
          <CaseCard key={track.label} tone={index === 0 ? "card" : "tint"}>
            <CardLabel>{track.label}</CardLabel>
            <p className="mt-4 text-[16px] leading-[1.65]">{track.text}</p>
          </CaseCard>
        ))}
      </div>

      <CaseSubheading>{discovery.platformsTitle}</CaseSubheading>
      <ul className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-6">
        {discovery.platforms.map((platform, index) => (
          <CaseCard
            as="li"
            key={platform.name}
            className={cn(
              "flex flex-col lg:col-span-2",
              index >= 3 && "lg:col-span-3",
              index === discovery.platforms.length - 1 && "md:col-span-2",
            )}
          >
            <h4 className="text-[24px] font-medium leading-none tracking-[-0.03em]">{platform.name}</h4>
            <CardLabel className="mt-6">{discovery.platformLabels.took}</CardLabel>
            <p className="mt-2 text-[16px] font-medium leading-[1.45]">{platform.took}</p>
            <CardLabel className="mt-5">{discovery.platformLabels.why}</CardLabel>
            <p className="mt-2 text-[15px] leading-[1.6] text-(--card-muted)">{platform.why}</p>
          </CaseCard>
        ))}
      </ul>

      <CaseCard tone="ink" padding="large">
        <CardLabel>{discovery.finding.label}</CardLabel>
        <p className="mt-5 max-w-[40ch] text-[24px] font-medium leading-[1.3] tracking-[-0.02em] sm:text-[30px]">
          {discovery.finding.text}
        </p>
      </CaseCard>

      <CaseCard as="figure" tone="blue" padding="large">
        <CardLabel>{discovery.insight.label}</CardLabel>
        <p className="mt-5 max-w-[60ch] text-[16px] leading-[1.65]">{discovery.insight.lead}</p>
        <Quotes size={44} weight="fill" aria-hidden className="mt-10" />
        <blockquote className="mt-4">
          <p className="max-w-[24ch] text-balance text-[30px] font-medium leading-[1.12] tracking-[-0.03em] sm:text-[44px] lg:text-[56px]">
            “{discovery.insight.quote}”
          </p>
        </blockquote>
        <figcaption className="mt-8 text-[17px] font-medium">{discovery.insight.after}</figcaption>
      </CaseCard>
    </CaseSection>
  );
}
