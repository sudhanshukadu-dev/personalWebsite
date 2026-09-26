import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { ContactLinks } from "@/components/footer/ContactLinks";
import { contact } from "@/content/home";

/*
  The end of a case study, in place of the home page's contact form, transitions and
  footer: the home page's question, one big link to the form, and the same direct ways
  to reach Sudhanshu the footer carries (LinkedIn, GitHub, email, resume), so a reader
  who is convinced here doesn't have to leave the page to find them. The section dock
  steps aside here ([data-section-dock-hide]). Styles in globals.css (.case-outro).
*/
export function CaseStudyOutro({ cta }: { cta: string }) {
  return (
    <section data-section-dock-hide aria-labelledby="outro-title" className="case-outro">
      <p className="case-outro__kicker">{contact.question}</p>
      <h2 id="outro-title" className="case-outro__title">
        {/* A plain anchor so PageTransition can cover the screen before navigating (see BackLink). */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/#contact" data-page-transition className="case-outro__link">
          {cta}
          <ArrowUpRight aria-hidden weight="bold" />
        </a>
      </h2>
      <ContactLinks className="case-outro__links" />
    </section>
  );
}
