import { HourglassMedium, MagnifyingGlass, Question, Receipt } from "@phosphor-icons/react/ssr";
import { CardLabel, CaseCard, IconBadge, type CardTone } from "@/components/work/CaseCard";
import { CaseSection, CaseSubheading } from "@/components/work/CaseSection";
import { quest2travel } from "@/content/work/quest2travel";

const { problem } = quest2travel;

// One icon and tone per frustration, in content order: manual entry, lost receipts,
// unclear policies, approval delays. The tones checkerboard the 2x2 grid.
const FRUSTRATION_ICONS = [Receipt, MagnifyingGlass, Question, HourglassMedium];
const FRUSTRATION_TONES: CardTone[] = ["tint", "card", "card", "tint"];

// Problem: Manohar's four frustrations as quote tiles, where the platform fell short,
// then the design question underneath it all.
export function Problem() {
  return (
    <CaseSection id="problem" tag={problem.tag} title={problem.title}>
      <CaseSubheading>{problem.frustrationsTitle}</CaseSubheading>
      <ul className="grid gap-4 sm:gap-5 md:grid-cols-2">
        {problem.frustrations.map((frustration, index) => (
          <CaseCard
            as="li"
            key={frustration.label}
            tone={FRUSTRATION_TONES[index]}
            className="flex min-h-[240px] flex-col sm:min-h-[280px]"
          >
            <div className="flex items-start justify-between gap-4">
              <CardLabel className="pt-1">{frustration.label}</CardLabel>
              <IconBadge icon={FRUSTRATION_ICONS[index]} />
            </div>
            <blockquote className="mt-auto pt-10">
              <p className="text-balance text-[24px] font-medium leading-[1.25] tracking-[-0.02em] sm:text-[30px]">
                “{frustration.quote}”
              </p>
            </blockquote>
          </CaseCard>
        ))}
      </ul>

      <CaseSubheading>{problem.issuesTitle}</CaseSubheading>
      <CaseCard padding="none">
        <dl className="divide-y divide-bento-line">
          {problem.issues.map((issue) => (
            <div
              key={issue.issue}
              className="grid gap-2 px-6 py-5 sm:px-8 sm:py-6 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-8"
            >
              <dt className="text-[18px] font-medium leading-[1.35] tracking-[-0.01em]">{issue.issue}</dt>
              <dd className="text-[16px] leading-[1.6] text-(--card-muted)">{issue.impact}</dd>
            </div>
          ))}
        </dl>
      </CaseCard>

      <CaseCard tone="blue" padding="large">
        <CardLabel>{problem.question.label}</CardLabel>
        <p className="mt-6 max-w-[30ch] text-balance text-[28px] font-medium leading-[1.15] tracking-[-0.03em] sm:text-[40px] lg:text-[48px]">
          {problem.question.text}
        </p>
      </CaseCard>
    </CaseSection>
  );
}
