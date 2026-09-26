import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/work/CaseStudyPage";
import { site } from "@/content/home";
import { quest2travel } from "@/content/work/quest2travel";

export const metadata: Metadata = {
  title: `${quest2travel.meta.title} | ${site.name}`,
  description: quest2travel.meta.description,
};

export default function Quest2TravelPage() {
  return <CaseStudyPage study={quest2travel} />;
}
