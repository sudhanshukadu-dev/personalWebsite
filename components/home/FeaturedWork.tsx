import { featuredWork } from "@/content/home";
import { StackingCards } from "@/components/effects/StackingCards";

// Featured Work: the four projects as full-screen cards that stack over each other as you scroll.
export function FeaturedWork() {
  return (
    <section id="work" aria-labelledby="work-title">
      <h2 id="work-title" className="sr-only">
        Featured work
      </h2>
      <StackingCards items={featuredWork.projects} label="Featured work" linkLabel={featuredWork.linkLabel} />
    </section>
  );
}
