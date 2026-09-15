import { ArrowRight } from "@phosphor-icons/react/ssr";
import { CardLabel, CaseCard } from "@/components/work/CaseCard";
import { CaseSection, CaseSubheading } from "@/components/work/CaseSection";
import { FlagChip } from "@/components/work/FlagChip";
import { VisualPlaceholder } from "@/components/work/VisualPlaceholder";
import { quest2travel } from "@/content/work/quest2travel";
import { cn } from "@/lib/cn";

const { process } = quest2travel;

function CardHeading({ label, title }: { label: string; title: string }) {
  return (
    <>
      <CardLabel>{label}</CardLabel>
      <h3 className="mt-4 text-balance text-[26px] font-medium leading-[1.15] tracking-[-0.03em] sm:text-[34px]">{title}</h3>
    </>
  );
}

// Process: the hygiene pass, the V1 that missed, the 3-step pattern borrowed from
// Travel, the flagging correction, and the constraints that shaped the result.
export function Process() {
  const { phase0, v1, pattern, flagging } = process;

  return (
    <CaseSection id="process" tag={process.tag} title={process.title}>
      <CaseCard padding="large" className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <CardHeading label={phase0.label} title={phase0.title} />
          <p className="mt-4 text-[16px] leading-[1.65] text-(--card-muted)">{phase0.text}</p>
        </div>
        <VisualPlaceholder label={phase0.visual} />
      </CaseCard>

      <CaseCard tone="tint" padding="large" className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <CardHeading label={v1.label} title={v1.title} />
          <p className="mt-4 text-[16px] leading-[1.65] text-(--card-muted)">{v1.text}</p>
          <figure className="mt-6">
            <blockquote>
              <p className="text-balance text-[22px] font-medium leading-[1.3] tracking-[-0.02em] sm:text-[26px]">
                “{v1.quote}”
              </p>
            </blockquote>
            <figcaption className="mt-3 text-[14px] text-(--card-muted)">{v1.quoteBy}</figcaption>
          </figure>
          <p className="mt-6 text-[16px] font-medium leading-[1.6]">{v1.after}</p>
        </div>
        <VisualPlaceholder label={v1.visual} className="lg:order-first" />
      </CaseCard>

      <CaseCard tone="blue" padding="large">
        <CardHeading label={pattern.label} title={pattern.title} />
        <p className="mt-4 max-w-[60ch] text-[17px] leading-[1.6]">{pattern.text}</p>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[14px] font-medium">
          <span className="inline-flex items-center gap-2">
            <span aria-hidden className="size-3.5 rounded-full border-2 border-bento-on-blue" />
            {pattern.legend.travel}
          </span>
          <span className="inline-flex items-center gap-2">
            <span aria-hidden className="size-3.5 rounded-full bg-bento-on-blue" />
            {pattern.legend.expense}
          </span>
        </div>

        <ol className="mt-5 grid gap-5 sm:grid-cols-3 sm:gap-4">
          {pattern.steps.map((step, index) => (
            <li key={step.step} className="flex flex-col gap-2">
              <p className="flex items-center justify-between font-mono text-[12px] uppercase tracking-[0.06em]">
                {step.step}
                {index < pattern.steps.length - 1 ? (
                  <ArrowRight size={16} aria-hidden className="hidden sm:block" />
                ) : null}
              </p>
              <p className="rounded-full border-2 border-bento-on-blue px-4 py-3 text-[15px] font-medium leading-none">
                <span className="sr-only">{pattern.legend.travel}: </span>
                {step.travel}
              </p>
              <p className="rounded-full border-2 border-bento-on-blue bg-bento-on-blue px-4 py-3 text-[15px] font-medium leading-none text-bento-blue">
                <span className="sr-only">{pattern.legend.expense}: </span>
                {step.expense}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-8 max-w-[70ch] text-[16px] leading-[1.65]">{pattern.after}</p>
      </CaseCard>

      <CaseCard padding="large">
        <CardHeading label={flagging.label} title={flagging.title} />
        <p className="mt-4 max-w-[68ch] text-[16px] leading-[1.65] text-(--card-muted)">{flagging.text}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {flagging.versions.map((version, versionIndex) => (
            <div
              key={version.name}
              className={cn("rounded-[20px] p-5 sm:p-6", versionIndex === 0 ? "bg-(--card-soft)" : "bg-(--bento-tint)")}
            >
              <p className="text-[17px] font-medium">{version.name}</p>
              <dl className="mt-4 flex flex-col divide-y divide-bento-line">
                {version.cells.map((cell, index) => (
                  <div
                    key={flagging.moments[index]}
                    className="flex flex-wrap items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                  >
                    <dt className="text-[15px] text-(--card-muted)">{flagging.moments[index]}</dt>
                    <dd className="flex flex-wrap items-center justify-end gap-2">
                      {cell.warning ? <FlagChip tier="warning" label={flagging.tiers.warning} /> : null}
                      {cell.critical ? <FlagChip tier="critical" label={flagging.tiers.critical} /> : null}
                      {cell.note ? <span className="text-[14px] text-(--card-muted)">{cell.note}</span> : null}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </CaseCard>

      <CaseSubheading>{process.constraintsTitle}</CaseSubheading>
      <ul className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        {process.constraints.map((item) => (
          <CaseCard as="li" key={item.constraint} className="flex flex-col">
            <CardLabel>{process.constraintLabels.constraint}</CardLabel>
            <p className="mt-3 text-[18px] font-medium leading-[1.35] tracking-[-0.01em]">{item.constraint}</p>
            <div aria-hidden className="my-5 h-px bg-bento-line" />
            <CardLabel>{process.constraintLabels.response}</CardLabel>
            <p className="mt-3 text-[15px] leading-[1.6] text-(--card-muted)">{item.response}</p>
          </CaseCard>
        ))}
        <CaseCard as="li" tone="ink" className="flex items-end">
          <p className="text-[22px] font-medium leading-[1.3] tracking-[-0.02em] sm:text-[24px]">
            {process.constraintsClose}
          </p>
        </CaseCard>
      </ul>
    </CaseSection>
  );
}
