import { ArcTransition } from "@/components/effects/ArcTransition";
import { LetsTalk } from "@/components/home/LetsTalk";
import { CaseBlocks, type CaseBlock } from "@/components/work/CaseBlocks";
import { CaseSection } from "@/components/work/CaseSection";
import { CaseStudyHero, type CaseStudyHeroContent } from "@/components/work/CaseStudyHero";
import { DirectionalRows } from "@/components/work/editorial/DirectionalRows";
import { EditorialBlocks } from "@/components/work/editorial/EditorialBlocks";
import { EditorialSection } from "@/components/work/editorial/EditorialSection";
import { SectionNav } from "@/components/work/SectionNav";
import { sectionIntros } from "@/content/home";

export type CaseStudySection = {
  id: string;
  // Label in the sticky section nav, and the section's tag (with its number).
  nav: string;
  number?: string;
  title: string;
  intro?: string;
  blocks: CaseBlock[];
};

export type CaseStudy = {
  slug: string;
  // The project's colour from Featured Work, used in place of the site blue (globals.css,
  // [data-project-theme]).
  theme: "yellow" | "purple" | "green";
  // "editorial" renders the sections with components/work/editorial/*: prose on the
  // page instead of in cards, labels in the margin, full-bleed statements. Without it
  // the sections render as cards (components/work/CaseBlocks.tsx).
  layout?: "editorial";
  meta: { title: string; description: string };
  hero: CaseStudyHeroContent;
  sections: CaseStudySection[];
};

// A full case study page from a content file: the hero, the sticky section nav, each
// section's blocks, then the Let's Talk transition and form into the footer, like the
// Quest2Travel page. The hero, nav and sections take the project's colour; the contact form and
// footer keep the site blue.
export function CaseStudyPage({ study }: { study: CaseStudy }) {
  return (
    <main id="main" className="overflow-x-clip">
      <div data-project-theme={study.theme}>
        {study.layout === "editorial" ? <DirectionalRows /> : null}
        <CaseStudyHero hero={study.hero} />
        <SectionNav
          label="Case study sections"
          menuLabel="Current section"
          items={study.sections.map((section) => ({ id: section.id, label: section.nav, number: section.number }))}
          startId="top"
        />
        {study.sections.map((section, index) =>
          study.layout === "editorial" ? (
            <EditorialSection
              key={section.id}
              id={section.id}
              number={section.number}
              nav={section.nav}
              title={section.title}
              intro={section.intro}
              tinted={index % 2 === 1}
            >
              <EditorialBlocks blocks={section.blocks} />
            </EditorialSection>
          ) : (
            <CaseSection
              key={section.id}
              id={section.id}
              tag={section.number ? `${section.number} · ${section.nav}` : section.nav}
              title={section.title}
              intro={section.intro}
            >
              <CaseBlocks blocks={section.blocks} />
            </CaseSection>
          ),
        )}
      </div>
      <ArcTransition {...sectionIntros.contact} />
      <LetsTalk />
      <ArcTransition {...sectionIntros.end} />
    </main>
  );
}
