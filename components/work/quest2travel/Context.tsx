import { CardLabel, CaseCard } from "@/components/work/CaseCard";
import { CaseSection } from "@/components/work/CaseSection";
import { quest2travel } from "@/content/work/quest2travel";

const { context } = quest2travel;

// Context: the numbers, the client names, then why a weak expense module put the travel revenue at risk.
export function Context() {
  return (
    <CaseSection id="context" tag={context.tag} title={context.title} intro={context.intro}>
      <dl className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
        {context.stats.map((stat, index) => (
          <CaseCard key={stat.label} tone={index === 0 ? "blue" : "card"} className="flex flex-col">
            <dt className="order-2 mt-3 text-[15px] leading-[1.4] text-(--card-muted)">{stat.label}</dt>
            <dd className="order-1 text-[36px] font-medium leading-none tracking-[-0.04em] sm:text-[52px]">
              {stat.value}
            </dd>
          </CaseCard>
        ))}
      </dl>

      <CaseCard tone="tint" className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
        <CardLabel className="flex-none">{context.clients.label}</CardLabel>
        <ul className="flex flex-wrap items-center gap-2">
          {context.clients.names.map((name) => (
            <li key={name} className="rounded-full bg-(--card-soft) px-4 py-2.5 text-[15px] font-medium leading-none">
              {name}
            </li>
          ))}
          <li className="px-2 text-[15px] text-(--card-muted)">{context.clients.more}</li>
        </ul>
      </CaseCard>

      <div className="grid gap-4 sm:gap-5 lg:grid-cols-12">
        <CaseCard padding="large" className="lg:col-span-7">
          <CardLabel>{context.urgency.label}</CardLabel>
          <p className="mt-5 text-[24px] font-medium leading-[1.25] tracking-[-0.03em] sm:text-[30px]">
            {context.urgency.lead}
          </p>
          {context.urgency.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-5 text-[16px] leading-[1.65] text-(--card-muted)">
              {paragraph}
            </p>
          ))}
          <p className="mt-6 text-[17px] font-medium leading-[1.55]">{context.urgency.punchline}</p>
        </CaseCard>

        <div className="grid gap-4 sm:gap-5 lg:col-span-5">
          <CaseCard tone="tint">
            <CardLabel>{context.reality.label}</CardLabel>
            <p className="mt-4 text-[17px] leading-[1.6]">{context.reality.text}</p>
          </CaseCard>
          <CaseCard tone="ink">
            <CardLabel>{context.scope.label}</CardLabel>
            <p className="mt-4 text-[17px] leading-[1.6]">{context.scope.text}</p>
          </CaseCard>
        </div>
      </div>
    </CaseSection>
  );
}
