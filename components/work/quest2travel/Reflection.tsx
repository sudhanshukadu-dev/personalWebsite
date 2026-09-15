import { CardLabel, CaseCard } from "@/components/work/CaseCard";
import { CaseSection, CaseSubheading } from "@/components/work/CaseSection";
import { quest2travel } from "@/content/work/quest2travel";

const { reflection } = quest2travel;

// Reflection: what I'd change and why, what I'd do next time, and the four lessons.
export function Reflection() {
  const [opening, ...rest] = reflection.paragraphs;

  return (
    <CaseSection id="reflection" tag={reflection.tag} title={reflection.title}>
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-5">
        <div className="reveal flex flex-col gap-5 lg:col-span-7 lg:pr-10">
          <p className="text-[22px] font-medium leading-[1.4] tracking-[-0.02em] text-bento-ink sm:text-[26px]">{opening}</p>
          {rest.map((paragraph) => (
            <p key={paragraph} className="text-[17px] leading-[1.7] text-bento-muted">
              {paragraph}
            </p>
          ))}
        </div>

        <CaseCard tone="blue" padding="large" className="lg:col-span-5 lg:self-start">
          <CardLabel>{reflection.again.label}</CardLabel>
          <p className="mt-5 text-[20px] font-medium leading-[1.45] tracking-[-0.01em]">{reflection.again.text}</p>
        </CaseCard>
      </div>

      <CaseSubheading>{reflection.lessonsTitle}</CaseSubheading>
      <ol className="grid gap-4 sm:gap-5 md:grid-cols-2">
        {reflection.lessons.map((lesson, index) => (
          <CaseCard as="li" key={lesson.title} tone={index === 0 || index === 3 ? "tint" : "card"} className="flex flex-col">
            <span className="font-mono text-[12px] tracking-[0.06em] text-(--card-muted)">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h4 className="mt-8 text-[22px] font-medium leading-[1.25] tracking-[-0.02em]">{lesson.title}</h4>
            <p className="mt-3 text-[16px] leading-[1.6] text-(--card-muted)">{lesson.text}</p>
          </CaseCard>
        ))}
      </ol>

      <p className="reveal mt-10 text-center font-mono text-[12px] uppercase leading-[1.6] tracking-[0.06em] text-bento-muted">
        {reflection.signoff}
      </p>
    </CaseSection>
  );
}
