import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/work/CaseStudyPage";
import { site } from "@/content/home";
import { shriram } from "@/content/work/shriram";

export const metadata: Metadata = {
  title: `${shriram.meta.title} | ${site.name}`,
  description: shriram.meta.description,
};

export default function ShriramLifeInsurancePage() {
  return <CaseStudyPage study={shriram} />;
}