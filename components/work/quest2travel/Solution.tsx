import {
  Camera,
  CheckCircle,
  Desktop,
  DeviceMobile,
  ForkKnife,
  Lock,
  Receipt,
  Stack,
  Warning,
  WarningOctagon,
} from "@phosphor-icons/react/ssr";
import { CardLabel, CaseCard, IconBadge } from "@/components/work/CaseCard";
import { CaseSection, CaseSubheading } from "@/components/work/CaseSection";
import { Laptop, Phone } from "@/components/work/DeviceFrames";
import { quest2travel } from "@/content/work/quest2travel";
import { cn } from "@/lib/cn";

const { solution } = quest2travel;

// In story order: the meal, the bill, the camera, logged.
const STORY_ICONS = [ForkKnife, Receipt, Camera, CheckCircle];

function FeatureHeading({ label, title }: { label: string; title: string }) {
  return (
    <>
      <CardLabel>{label}</CardLabel>
      <h3 className="mt-3 text-balance text-[26px] font-medium leading-[1.15] tracking-[-0.03em] sm:text-[34px]">{title}</h3>
    </>
  );
}

// Solution: the capture story, the five features, the four roles, the dashboard,
// and the charts shipped as code.
export function Solution() {
  const { standalone, responsive, reportFlow, hardestCall, flagging, tips, roles, dashboard, charts } = solution;

  return (
    <CaseSection id="solution" tag={solution.tag} title={solution.title}>
      <CaseSubheading>{solution.storyTitle}</CaseSubheading>
      <ol className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {solution.story.map((frame, index) => (
          <CaseCard
            as="li"
            key={frame}
            tone={index === solution.story.length - 1 ? "blue" : "tint"}
            className="flex min-h-[190px] flex-col justify-between gap-8"
          >
            <div className="flex items-center justify-between">
              <IconBadge icon={STORY_ICONS[index]} />
              <span className="font-mono text-[12px] tracking-[0.06em] text-(--card-muted)">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="text-[22px] font-medium leading-[1.2] tracking-[-0.02em]">{frame}</p>
          </CaseCard>
        ))}
      </ol>

      {/* 01 · Standalone creation, with where the product is responsive and where it isn't. */}
      <CaseCard padding="large" className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <FeatureHeading label={standalone.label} title={standalone.title} />
          <p className="mt-4 text-[16px] leading-[1.65] text-(--card-muted)">{standalone.text}</p>

          <div className="mt-8 rounded-[20px] bg-(--card-soft) p-5 sm:p-6">
            <h4 className="text-[18px] font-medium leading-[1.35] tracking-[-0.01em]">{responsive.title}</h4>
            <p className="mt-3 text-[15px] leading-[1.65] text-(--card-muted)">{responsive.text}</p>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              {responsive.groups.map((group, index) => {
                const GroupIcon = index === 0 ? DeviceMobile : Desktop;
                return (
                  <div key={group.label}>
                    <dt className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.06em] text-(--card-muted)">
                      <GroupIcon size={16} aria-hidden />
                      {group.label}
                    </dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {group.roles.map((role) => (
                        <span
                          key={role}
                          className="rounded-full bg-bento-card px-3 py-1.5 text-[14px] font-medium leading-none shadow-[inset_0_0_0_1px_var(--bento-line)]"
                        >
                          {role}
                        </span>
                      ))}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
        <div className="grid place-items-center rounded-[20px] bg-(--card-soft) px-6 py-10 lg:col-span-5">
          <Phone />
          <p className="sr-only">{standalone.visual}</p>
        </div>
      </CaseCard>

      {/* 02 · The report flow, and 03 · the hardest call. */}
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-12">
        <CaseCard tone="blue" padding="large" className="flex flex-col lg:col-span-5">
          <FeatureHeading label={reportFlow.label} title={reportFlow.title} />
          <p className="mt-4 text-[17px] leading-[1.6]">{reportFlow.text}</p>
          <ol className="mt-auto flex flex-col gap-2 pt-8">
            {quest2travel.process.pattern.steps.map((step, index) => (
              <li
                key={step.step}
                className="flex items-center gap-3 rounded-full bg-bento-on-blue py-2 pl-2 pr-4 text-[15px] font-medium leading-none text-bento-blue"
              >
                <span
                  aria-hidden
                  className="grid size-7 flex-none place-items-center rounded-full bg-bento-blue text-[12px] text-bento-on-blue"
                >
                  {index + 1}
                </span>
                {step.expense}
              </li>
            ))}
          </ol>
        </CaseCard>

        <CaseCard padding="large" className="lg:col-span-7">
          <FeatureHeading label={hardestCall.label} title={hardestCall.title} />
          <dl className="mt-6 flex flex-col gap-5">
            {hardestCall.parts.map((part) => (
              <div key={part.label}>
                <dt className="font-mono text-[12px] uppercase tracking-[0.06em] text-(--card-muted)">{part.label}</dt>
                <dd className="mt-2 text-[16px] leading-[1.65]">{part.text}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 font-mono text-[12px] uppercase tracking-[0.06em] text-(--card-muted)">
            {hardestCall.decisionLabel}
          </p>
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {hardestCall.decisions.map((decision, index) => {
              const blocked = index === 1;
              const DecisionIcon = blocked ? Lock : CheckCircle;
              return (
                <li
                  key={decision.context}
                  className={cn("rounded-[20px] p-5", blocked ? "bg-bento-ink text-bento-page" : "bg-(--card-soft)")}
                >
                  <DecisionIcon size={22} aria-hidden className={blocked ? undefined : "text-bento-blue"} />
                  <p
                    className={cn(
                      "mt-4 font-mono text-[12px] uppercase tracking-[0.06em]",
                      blocked ? "text-bento-page/75" : "text-(--card-muted)",
                    )}
                  >
                    {decision.context}
                  </p>
                  <p className="mt-1 text-[17px] font-medium leading-[1.35]">{decision.rule}</p>
                </li>
              );
            })}
          </ul>
        </CaseCard>
      </div>

      {/* 04 · Two tiers of flags. */}
      <CaseCard tone="tint" padding="large">
        <FeatureHeading label={flagging.label} title={flagging.title} />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {flagging.tiers.map((tier) => {
            const critical = tier.level === "critical";
            const TierIcon = critical ? WarningOctagon : Warning;
            return (
              <div
                key={tier.name}
                className={cn(
                  "flex flex-col rounded-[20px] p-6 sm:p-7",
                  critical ? "bg-bento-ink text-bento-page" : "bg-bento-card text-bento-ink",
                )}
              >
                <div className="flex items-center gap-3">
                  <TierIcon size={28} weight="duotone" aria-hidden />
                  <h4 className="text-[24px] font-medium tracking-[-0.02em]">{tier.name}</h4>
                </div>
                <p className="mt-5 text-[17px] font-medium leading-[1.4]">{tier.when}</p>
                <p className={cn("mt-2 text-[15px] leading-[1.6]", critical ? "text-bento-page/75" : "text-bento-muted")}>
                  {tier.text}
                </p>
              </div>
            );
          })}
        </div>
        <p className="mt-6 max-w-[60ch] text-[17px] font-medium leading-[1.5]">{flagging.after}</p>
      </CaseCard>

      {/* 05 · The Tips panel. */}
      <CaseCard padding="large" className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <FeatureHeading label={tips.label} title={tips.title} />
          <p className="mt-4 text-[16px] leading-[1.65] text-(--card-muted)">{tips.text}</p>
          <dl className="mt-6 grid gap-3">
            {tips.shift.map((item, index) => (
              <div
                key={item.label}
                className={cn("rounded-[18px] p-4", index === 0 ? "bg-(--card-soft)" : "bg-bento-blue text-bento-on-blue")}
              >
                <dt
                  className={cn(
                    "font-mono text-[12px] uppercase tracking-[0.06em]",
                    index === 0 && "text-(--card-muted)",
                  )}
                >
                  {item.label}
                </dt>
                <dd className="mt-1 text-[16px] font-medium">{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="px-[4%] pb-2 lg:col-span-7">
          <Laptop />
          <p className="sr-only">{tips.visual}</p>
        </div>
      </CaseCard>

      {/* Four roles on one recursive hierarchy. */}
      <CaseSubheading>{roles.title}</CaseSubheading>
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-12">
        <CaseCard tone="blue" padding="large" className="flex flex-col lg:col-span-5">
          <p className="text-[17px] leading-[1.65]">{roles.text}</p>
          <div className="mt-8 flex flex-col gap-2 lg:mt-auto lg:pt-8">
            <div className="rounded-[20px] border-2 border-dashed border-bento-on-blue px-5 py-4">
              <p className="flex items-center gap-2 text-[17px] font-medium">
                <Stack size={18} aria-hidden />
                {roles.layers.added}
              </p>
              <p className="mt-1 text-[14px]">{roles.layers.addedNote}</p>
            </div>
            <div className="rounded-[20px] bg-bento-on-blue px-5 py-4 text-bento-blue">
              <p className="text-[17px] font-medium">{roles.layers.base}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {roles.layers.baseItems.map((item) => (
                  <li
                    key={item}
                    className="rounded-full bg-bento-blue px-3 py-1.5 text-[13px] font-medium leading-none text-bento-on-blue"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CaseCard>

        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:col-span-7">
          {roles.details.map((detail) => (
            <CaseCard as="li" key={detail.role} className="flex flex-col">
              <h4 className="text-[20px] font-medium leading-[1.25] tracking-[-0.02em]">{detail.role}</h4>
              <p className="mt-3 text-[15px] leading-[1.6] text-(--card-muted)">{detail.text}</p>
            </CaseCard>
          ))}
        </ul>
      </div>

      {/* The Accountant Dashboard, with a sketch of its first row. */}
      <CaseCard padding="large" className="grid gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <FeatureHeading label={dashboard.label} title={dashboard.title} />
          <p className="mt-4 text-[16px] leading-[1.65] text-(--card-muted)">{dashboard.text}</p>
          <p className="mt-4 text-[16px] leading-[1.65]">{dashboard.question}</p>
        </div>

        {/* A sketch of what the text above describes, so it is hidden from screen readers. */}
        <div aria-hidden className="self-center rounded-[20px] bg-(--card-soft) p-4 sm:p-6 lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex rounded-full bg-bento-card p-1 shadow-[inset_0_0_0_1px_var(--bento-line)]">
              {dashboard.tabs.map((tab, index) => (
                <span
                  key={tab}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-[13px] font-medium leading-none",
                    index === 1 ? "bg-bento-ink text-bento-page" : "text-bento-muted",
                  )}
                >
                  {tab}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {dashboard.filters.map((filter) => (
                <span key={filter} className="rounded-full bg-bento-card px-2.5 py-1 text-[12px] leading-none text-bento-muted">
                  {filter}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {dashboard.kpis.map((kpi, index) => (
              <div
                key={kpi}
                className={cn("rounded-[16px] p-4", index === 0 ? "bg-bento-blue text-bento-on-blue" : "bg-bento-card")}
              >
                <p className="text-[13px] font-medium leading-[1.3]">{kpi}</p>
                <span
                  className={cn(
                    "mt-5 block h-5 w-3/4 rounded-full",
                    index === 0 ? "bg-bento-on-blue/40" : "bg-bento-line",
                  )}
                />
              </div>
            ))}
          </div>

          <div className="mt-3 flex h-36 items-end gap-2 rounded-[16px] bg-bento-card p-4 sm:h-44">
            {[40, 62, 48, 75, 58, 88, 70, 95, 66, 80].map((height, index) => (
              <span
                key={index}
                className={cn("flex-1 rounded-t-[6px]", index === 7 ? "bg-bento-blue" : "bg-bento-blue/25")}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
      </CaseCard>

      <CaseCard tone="ink" padding="large" className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
        <div className="lg:col-span-7">
          <FeatureHeading label={charts.label} title={charts.title} />
          <p className="mt-4 text-[16px] leading-[1.65] text-(--card-muted)">{charts.text}</p>
        </div>
        <p className="text-balance text-[28px] font-medium leading-[1.15] tracking-[-0.03em] sm:text-[36px] lg:col-span-5">
          {charts.highlight}
        </p>
      </CaseCard>
    </CaseSection>
  );
}
