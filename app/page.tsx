import { Hero } from "@/components/home/Hero";
import { About } from "@/components/home/About";
import { Experience } from "@/components/home/Experience";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { BeyondTheScreen } from "@/components/home/BeyondTheScreen";
import { LetsTalk } from "@/components/home/LetsTalk";
import { ArcTransition } from "@/components/effects/ArcTransition";
import { sectionIntros } from "@/content/home";

export default function Home() {
  return (
    // overflow-x-clip lives here, not on <body>: body overflow is handed to the
    // viewport, where it stops clipping (the loader briefly scales the hero to 110%).
    <main id="main" className="overflow-x-clip">
      <Hero />
      <ArcTransition {...sectionIntros.about} />
      <About />
      <ArcTransition {...sectionIntros.experience} />
      <Experience />
      <ArcTransition {...sectionIntros.work} />
      <FeaturedWork />
      <ArcTransition {...sectionIntros.photos} />
      <BeyondTheScreen />
      <ArcTransition {...sectionIntros.contact} />
      <LetsTalk />
      <ArcTransition {...sectionIntros.end} />
    </main>
  );
}
