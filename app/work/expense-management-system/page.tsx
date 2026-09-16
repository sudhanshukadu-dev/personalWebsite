import type { Metadata } from "next";
import { ArcTransition } from "@/components/effects/ArcTransition";
import { LetsTalk } from "@/components/home/LetsTalk";
import { CaseStudyHero } from "@/components/work/CaseStudyHero";
import { SectionNav } from "@/components/work/SectionNav";
import { Context } from "@/components/work/quest2travel/Context";
import { Discovery } from "@/components/work/quest2travel/Discovery";
import { Impact } from "@/components/work/quest2travel/Impact";
import { Problem } from "@/components/work/quest2travel/Problem";
import { Process } from "@/components/work/quest2travel/Process";
import { Reflection } from "@/components/work/quest2travel/Reflection";
import { Solution } from "@/components/work/quest2travel/Solution";
import { Summary } from "@/components/work/quest2travel/Summary";
import { Users } from "@/components/work/quest2travel/Users";
import { sectionIntros, site } from "@/content/home";
import { quest2travel } from "@/content/work/quest2travel";

export const metadata: Metadata = {
  title: `${quest2travel.meta.title} | ${site.name}`,
  description: quest2travel.meta.description,
};

// Quest2Travel case study: the hero, the 90-second version, the eight numbered
// sections from the case study doc, then the Let's Talk transition and form into the footer.
export default function ExpenseManagementSystemPage() {
  return (
    <main id="main" className="overflow-x-clip">
      <CaseStudyHero hero={quest2travel.hero} />
      <SectionNav {...quest2travel.sectionNav} startId="top" />
      <Summary />
      <Context />
      <Problem />
      <Discovery />
      <Users />
      <Process />
      <Solution />
      <Impact />
      <Reflection />
      <ArcTransition {...sectionIntros.contact} />
      <LetsTalk />
    </main>
  );
}
