import { contact, site } from "@/content/home";
import { ContactForm } from "@/components/contact/ContactForm";

// Let's Talk: the hero's blue and grain, fading in from the page this time, with the
// line on the left and the form in a card on the right. The blue carries on into the footer.
export function LetsTalk() {
  return (
    <section aria-labelledby="contact-title" className="contact-gradient relative isolate overflow-clip">
      <div aria-hidden className="grain is--fade-in" data-grain-animate="true" />

      <div className="relative z-[1] mx-auto grid w-full max-w-[1320px] gap-12 px-6 pb-20 pt-(--contact-fade) sm:px-12 sm:pb-28 lg:grid-cols-12 lg:gap-8 lg:px-24 xl:px-36">
        {/* The #contact anchor sits on the text, not the section, so "Say hello" links land past the fade. */}
        <div id="contact" className="on-blue lg:col-span-6 lg:pr-8">
          <h2
            id="contact-title"
            className="text-balance text-[36px] font-medium leading-[1.08] tracking-[-0.04em] text-bento-on-blue sm:text-[48px] lg:text-[44px] xl:text-[52px]"
          >
            <span className="text-bento-on-blue/75">{contact.question}</span> {contact.cta}
          </h2>
          <p className="mt-8 text-[17px] leading-[1.5] text-bento-on-blue sm:text-lg">
            {contact.emailPrompt}{" "}
            <a
              href={`mailto:${site.email}`}
              className="font-medium underline decoration-bento-on-blue/40 underline-offset-4 transition-[text-decoration-color] duration-200 hover:decoration-bento-on-blue"
            >
              {site.email}
            </a>
          </p>
        </div>

        <div className="rounded-card bg-bento-card p-6 text-bento-ink sm:p-8 lg:col-span-6 lg:p-10">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
