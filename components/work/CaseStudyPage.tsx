import { ArcTransition } from "@/components/effects/ArcTransition";
import { BentoBlocks } from "@/components/work/bento/BentoBlocks";
import { StoryBlocks } from "@/components/work/story/StoryBlocks";
import { BackLink } from "@/components/work/chrome/BackLink";
import { CaseStudyOutro } from "@/components/work/chrome/CaseStudyOutro";
import { ScrollProgress } from "@/components/work/chrome/ScrollProgress";
import { SectionDock } from "@/components/work/chrome/SectionDock";
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
  // Sits under the section's heading, as one paragraph or several.
  intro?: string | string[];
  blocks: CaseBlock[];
};

export type CaseStudy = {
  slug: string;
  // The project's colour from Featured Work, used in place of the site blue (globals.css,
  // [data-project-theme]). Left out by the blue project, which is already the site's colour.
  theme?: "yellow" | "purple" | "green";
  // How the sections render. Without it, one card per block (components/work/CaseBlocks.tsx).
  // "bento": the Aboard-style tile grid (components/work/bento/BentoBlocks.tsx).
  // "story": the overview as bento, then each numbered section told in one column of
  //   large type, after the Hubhopper case study (components/work/story/StoryBlocks.tsx).
  // "editorial": prose on the page, labels in the margin (components/work/editorial/*).
  layout?: "bento" | "story" | "editorial";
  // "own": the case study carries its own navigation and ending instead of the site's
  // (a progress bar, a section dock, a fixed way back, and a link to the contact form).
  chrome?: "own";
  meta: { title: string; description: string };
  hero: CaseStudyHeroContent;
  sections: CaseStudySection[];
};

// A full case study page from a content file: the hero, the sections, then the way out.
//
// How its sections are laid out (`layout`) and how it is navigated (`chrome`) are set
// separately, so a case study can keep the card sections and still carry its own
// navigation.
//
// Without `chrome: "own"` it keeps the site's: the sticky section nav under the hero,
// then the Let's Talk transition and form into the footer, in the site blue.
//
// With it, the case study carries its own, in the project's colour: a scroll progress
// bar across the top, a fixed "All work", a section dock in the floating nav's place
// (the root layout leaves the footer and the floating nav out on these routes), and one
// "Let's connect" link to the home page's contact form in place of the form and footer.
export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const ownChrome = study.chrome === "own";
  // The product's short name, from titles written "Name, what it is".
  const product = study.meta.title.split(",")[0];
  const sections = study.sections.map((section) => ({ id: section.id, label: section.nav, number: section.number }));

  return (
    <main id="main" className="overflow-x-clip">
      <div data-project-theme={study.theme}>
        {study.layout === "editorial" ? <DirectionalRows /> : null}
        {ownChrome ? (
          <>
            <ScrollProgress />
            <BackLink label="All work" href="/#work" heroId="top" />
          </>
        ) : null}
        <CaseStudyHero hero={study.hero} hideBackLink={ownChrome} />
        {ownChrome ? null : (
          <SectionNav label="Case study sections" menuLabel="Current section" items={sections} startId="top" />
        )}
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
              {study.layout === "story" && section.number ? (
                <StoryBlocks blocks={section.blocks} product={product} stickerStart={index * 2} />
              ) : study.layout === "bento" || study.layout === "story" ? (
                <BentoBlocks blocks={section.blocks} product={product} stickerStart={index * 2} />
              ) : (
                <CaseBlocks blocks={section.blocks} />
              )}
            </CaseSection>
          ),
        )}
        {ownChrome ? (
          <>
            <CaseStudyOutro cta="Let’s connect" />
            <SectionDock items={sections} label="On this page" />
          </>
        ) : null}
      </div>
      {ownChrome ? null : (
        <>
          <ArcTransition {...sectionIntros.contact} />
          <LetsTalk />
          <ArcTransition {...sectionIntros.end} />
        </>
      )}
    </main>
  );
}
