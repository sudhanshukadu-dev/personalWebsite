import { ArrowRight, Quotes } from "@phosphor-icons/react/ssr";
import { Polaroid } from "@/components/home/Polaroid";
import { CardLabel, CaseCard, type CardTone } from "@/components/work/CaseCard";
import { CaseSection, CaseSubheading } from "@/components/work/CaseSection";
import { quest2travel } from "@/content/work/quest2travel";
import { cn } from "@/lib/cn";

const { impact } = quest2travel;

const STATUS_STYLES = {
  live: "bg-bento-blue text-bento-on-blue",
  developed: "bg-bento-ink text-bento-page",
  progress: "text-bento-ink shadow-[inset_0_0_0_1px_var(--bento-muted)]",
} as const;

// In content order: enterprise validation, accessibility, strategy.
const OUTCOME_TONES: CardTone[] = ["tint", "card", "blue"];

// Impact: what shipped, before and after, the outcomes, recognition and colleagues'
// words, then the four numbers I'd measure.
export function Impact() {
  const { shipped, recognition } = impact;

  return (
    <CaseSection id="impact" tag={impact.tag} title={impact.title}>
      <CaseCard padding="large" className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <CardLabel>{shipped.label}</CardLabel>
          <p className="mt-5 text-[17px] leading-[1.65]">{shipped.text}</p>
        </div>
        <ul className="flex flex-col gap-2 self-center lg:col-span-5">
          {shipped.statuses.map((row) => (
            <li
              key={row.item}
              className="flex items-center justify-between gap-4 rounded-[18px] bg-(--card-soft) py-3 pl-4 pr-3"
            >
              <span className="text-[15px] font-medium leading-[1.35]">{row.item}</span>
              <span
                className={cn(
                  "flex-none rounded-full px-3 py-1.5 text-[13px] font-medium leading-none",
                  STATUS_STYLES[row.kind],
                )}
              >
                {row.status}
              </span>
            </li>
          ))}
        </ul>
      </CaseCard>

      <CaseSubheading>{impact.changedTitle}</CaseSubheading>
      <ul className="flex flex-col gap-4 sm:gap-5">
        {impact.changes.map((change, index) => (
          <CaseCard
            as="li"
            key={change.before}
            tone={index === 0 ? "blue" : "card"}
            className="grid items-center gap-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-8"
          >
            <div>
              <CardLabel>{impact.changeLabels.before}</CardLabel>
              <p className="mt-2 text-[16px] leading-[1.55] text-(--card-muted)">{change.before}</p>
            </div>
            <span
              aria-hidden
              className="grid size-10 place-items-center rounded-full bg-(--card-soft) text-(--card-accent)"
            >
              <ArrowRight size={18} className="rotate-90 md:rotate-0" />
            </span>
            <div>
              <CardLabel>{impact.changeLabels.after}</CardLabel>
              {change.afterHeadline ? (
                <p className="mt-2 text-[40px] font-medium leading-none tracking-[-0.04em] sm:text-[52px]">
                  <span aria-hidden>{change.afterHeadline}</span>
                  <span className="sr-only">{change.afterHeadlineSpoken}</span>
                </p>
              ) : null}
              <p className="mt-2 text-[17px] font-medium leading-[1.5]">{change.after}</p>
            </div>
          </CaseCard>
        ))}
      </ul>

      <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
        {impact.outcomes.map((outcome, index) => (
          <CaseCard key={outcome.label} tone={OUTCOME_TONES[index]}>
            <CardLabel>{outcome.label}</CardLabel>
            <p className="mt-4 text-[16px] leading-[1.65]">{outcome.text}</p>
          </CaseCard>
        ))}
      </div>

      <div className="grid gap-4 sm:gap-5 lg:grid-cols-12">
        <CaseCard
          tone="tint"
          padding="large"
          className="flex flex-col items-center gap-10 sm:flex-row lg:col-span-5 lg:flex-col lg:items-start"
        >
          <Polaroid
            src={recognition.polaroid.src}
            alt={recognition.polaroid.alt}
            caption={recognition.polaroid.caption}
            width={recognition.polaroid.width}
            height={recognition.polaroid.height}
            tilt={1}
            sizes="240px"
            className="w-[70%] max-w-[240px] flex-none sm:w-[220px] lg:mx-auto"
          />
          <div>
            <CardLabel>{recognition.label}</CardLabel>
            <h3 className="mt-3 text-[26px] font-medium leading-[1.15] tracking-[-0.03em] sm:text-[30px]">
              {recognition.title}
            </h3>
            <p className="mt-3 text-[16px] leading-[1.6] text-(--card-muted)">{recognition.text}</p>
          </div>
        </CaseCard>

        <ul className="grid gap-4 sm:gap-5 lg:col-span-7">
          {impact.testimonials.map((testimonial, index) => (
            <CaseCard as="li" key={testimonial.name} tone={index === 0 ? "ink" : "card"}>
              <figure>
                <Quotes size={28} weight="fill" aria-hidden className="text-(--card-accent)" />
                <blockquote className="mt-4">
                  <p className="text-[20px] font-medium leading-[1.4] tracking-[-0.01em] sm:text-[22px]">
                    “{testimonial.quote}”
                  </p>
                </blockquote>
                <figcaption className="mt-4 text-[15px]">
                  <span className="font-medium">{testimonial.name}</span>
                  <span className="text-(--card-muted)">, {testimonial.role}</span>
                </figcaption>
              </figure>
            </CaseCard>
          ))}
        </ul>
      </div>

      <CaseSubheading>{impact.measureTitle}</CaseSubheading>
      <p className="reveal max-w-[65ch] text-[17px] leading-[1.6] text-bento-muted">{impact.measureIntro}</p>
      <ol className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {impact.measures.map((measure, index) => (
          <CaseCard as="li" key={measure.metric} tone="tint" className="flex flex-col">
            <span className="font-mono text-[12px] tracking-[0.06em] text-(--card-muted)">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h4 className="mt-6 text-[19px] font-medium leading-[1.3] tracking-[-0.01em]">{measure.metric}</h4>
            <p className="mt-3 text-[15px] leading-[1.6] text-(--card-muted)">{measure.text}</p>
          </CaseCard>
        ))}
      </ol>
    </CaseSection>
  );
}
