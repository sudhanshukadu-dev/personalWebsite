import { Scales, SlidersHorizontal, Stamp, Suitcase, Target, Warning } from "@phosphor-icons/react/ssr";
import { CaseCard, IconBadge } from "@/components/work/CaseCard";
import { CaseSection, CaseSubheading } from "@/components/work/CaseSection";
import { quest2travel } from "@/content/work/quest2travel";

const { users } = quest2travel;

// In content order: Employee, Approver / Manager, Financial Auditor, Travel / Finance Admin.
const ROLE_ICONS = [Suitcase, Stamp, Scales, SlidersHorizontal];

// Users: Manohar with his goals and frustrations, then the four roles around him.
export function Users() {
  const { persona } = users;
  const groups = [
    { ...persona.goals, icon: Target },
    { ...persona.frustrations, icon: Warning },
  ];

  return (
    <CaseSection id="users" tag={users.tag} title={users.title}>
      <CaseSubheading>{users.personaTitle}</CaseSubheading>
      <CaseCard padding="large" className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-4">
            <span
              aria-hidden
              className="grid size-16 flex-none place-items-center rounded-full bg-bento-blue text-[26px] font-medium text-bento-on-blue"
            >
              {persona.initial}
            </span>
            <div>
              <h4 className="text-[28px] font-medium leading-none tracking-[-0.03em]">{persona.name}</h4>
              <p className="mt-2 text-[15px] text-(--card-muted)">{persona.meta}</p>
            </div>
          </div>
          <p className="mt-6 text-[19px] font-medium leading-[1.45] tracking-[-0.01em]">{persona.summary}</p>
          <p className="mt-4 text-[15px] leading-[1.65] text-(--card-muted)">{persona.basis}</p>
        </div>

        <div className="grid content-start gap-4 sm:grid-cols-2 lg:col-span-7">
          {groups.map((group) => {
            const GroupIcon = group.icon;
            return (
              <div key={group.label} className="rounded-[20px] bg-(--card-soft) p-5 sm:p-6">
                <p className="font-mono text-[12px] uppercase leading-none tracking-[0.06em] text-(--card-muted)">
                  {group.label}
                </p>
                <ul className="mt-5 flex flex-col gap-4">
                  {group.items.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-[1.5]">
                      <GroupIcon size={18} aria-hidden className="mt-0.5 flex-none text-bento-blue" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </CaseCard>

      <CaseSubheading>{users.rolesTitle}</CaseSubheading>
      <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {users.roles.map((role, index) => (
          <CaseCard as="li" key={role.role} tone={index === 0 ? "blue" : "tint"} className="flex flex-col">
            <IconBadge icon={ROLE_ICONS[index]} />
            <h4 className="mt-8 text-[20px] font-medium leading-[1.25] tracking-[-0.02em]">{role.role}</h4>
            <p className="mt-2 text-[15px] leading-[1.55] text-(--card-muted)">{role.need}</p>
          </CaseCard>
        ))}
      </ul>
    </CaseSection>
  );
}
