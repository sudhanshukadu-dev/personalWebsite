import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/work/CaseStudyPage";
import { site } from "@/content/home";
import { knode } from "@/content/work/knode";

export const metadata: Metadata = {
  title: `${knode.meta.title} | ${site.name}`,
  description: knode.meta.description,
};

export default function KnodePage() {
  return <CaseStudyPage study={knode} />;
}