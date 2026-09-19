import type { Metadata } from "next";
import { CaseStudyPage } from "@/components/work/CaseStudyPage";
import { site } from "@/content/home";
import { networth } from "@/content/work/networth";

export const metadata: Metadata = {
  title: `${networth.meta.title} | ${site.name}`,
  description: networth.meta.description,
};

export default function NetworthPage() {
  return <CaseStudyPage study={networth} />;
}