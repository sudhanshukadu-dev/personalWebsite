import { featuredWork } from "@/content/home";
import { StickyFeatures } from "@/components/effects/StickyFeatures";

// Featured Work: a pinned block that steps through the four projects as you scroll.
export function FeaturedWork() {
  return (
    <section id="work" aria-labelledby="work-title">
      <h2 id="work-title" className="sr-only">
        Featured work
      </h2>
      <StickyFeatures items={featuredWork.projects} linkLabel={featuredWork.linkLabel} />
    </section>
  );
}
