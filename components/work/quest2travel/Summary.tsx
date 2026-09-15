import { CheckCircle } from "@phosphor-icons/react/ssr";
import { CardLabel, CaseCard } from "@/components/work/CaseCard";
import { CaseSection } from "@/components/work/CaseSection";
import { quest2travel } from "@/content/work/quest2travel";

const { summary } = quest2travel;

// The 90-second version: both problems side by side, what I did beside the result,
// then what I'd measure and what I'd change.
export function Summary() {
  return (
    <CaseSection id="summary" tag={summary.tag} title={summary.title} intro={summary.intro}>
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        {summary.problems.map((problem) => (
          <CaseCard key={problem.label} tone="tint">
            <CardLabel>{problem.label}</CardLabel>
            <p className="mt-4 text-[17px] leading-[1.6]">{problem.text}</p>
          </CaseCard>
        ))}
      </div>

      <div className="grid gap-4 sm:gap-5 lg:grid-cols-12">
        <CaseCard className="lg:col-span-7 lg:row-span-2">
          <CardLabel>{summary.did.label}</CardLabel>
          <p className="mt-4 text-[20px] font-medium leading-[1.35] tracking-[-0.02em]">{summary.did.lead}</p>
          <ol className="mt-6 flex flex-col divide-y divide-bento-line">
            {summary.did.items.map((item, index) => (
              <li key={item.title} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                <span
                  aria-hidden
                  className="grid size-8 flex-none place-items-center rounded-full bg-bento-blue text-[13px] font-medium text-bento-on-blue"
                >
                  {index + 1}
                </span>
                <div>
                  <p className="text-[17px] font-medium leading-[1.4]">{item.title}</p>
                  <p className="mt-1 text-[15px] leading-[1.6] text-(--card-muted)">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </CaseCard>

        <CaseCard tone="blue" className="flex flex-col lg:col-span-5">
          <CardLabel>{summary.result.label}</CardLabel>
          <p className="mt-6 text-[72px] font-medium leading-[0.95] tracking-[-0.05em] sm:text-[96px]">
            <span aria-hidden>{summary.result.figure}</span>
            <span className="sr-only">{summary.result.figureSpoken}</span>
          </p>
          <p className="mt-2 text-[17px] font-medium">{summary.result.caption}</p>
          <p className="mt-auto pt-8 text-[16px] leading-[1.55]">{summary.result.line}</p>
        </CaseCard>

        <CaseCard className="lg:col-span-5">
          <CardLabel>{summary.landed.label}</CardLabel>
          <ul className="mt-5 flex flex-col gap-3">
            {summary.landed.items.map((item) => (
              <li key={item} className="flex gap-3 text-[15px] leading-[1.55]">
                <CheckCircle size={20} aria-hidden className="mt-px flex-none text-(--card-accent)" />
                {item}
              </li>
            ))}
          </ul>
        </CaseCard>
      </div>

      <div className="grid gap-4 sm:gap-5 lg:grid-cols-12">
        <CaseCard tone="tint" className="lg:col-span-7">
          <CardLabel>{summary.measure.label}</CardLabel>
          <p className="mt-4 text-[15px] leading-[1.55] text-(--card-muted)">{summary.measure.note}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {summary.measure.items.map((item) => (
              <li key={item.metric} className="rounded-[18px] bg-(--card-soft) p-4">
                <p className="text-[16px] font-medium leading-[1.35]">{item.metric}</p>
                <p className="mt-1 text-[14px] leading-[1.5] text-(--card-muted)">{item.test}</p>
              </li>
            ))}
          </ul>
        </CaseCard>

        <CaseCard tone="ink" className="flex flex-col justify-between gap-8 lg:col-span-5">
          <CardLabel>{summary.change.label}</CardLabel>
          <p className="text-[22px] font-medium leading-[1.35] tracking-[-0.02em] sm:text-[26px]">{summary.change.text}</p>
        </CaseCard>
      </div>
    </CaseSection>
  );
}
