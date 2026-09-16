import { contact } from "@/content/home";
import { ContactForm } from "@/components/contact/ContactForm";

// Let's Talk: just the form, in a card on the hero's blue and grain (fading in from the
// page). Its title and sticker live in the arc transition before it; the heading here is
// for screen readers. The blue carries on into the footer.
export function LetsTalk() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="contact-gradient relative isolate overflow-clip"
    >
      <div aria-hidden className="grain is--fade-in" data-grain-animate="true" />

      <h2 id="contact-title" className="sr-only">
        {contact.question} {contact.cta}
      </h2>

      <div className="relative z-[1] mx-auto flex w-full max-w-[1320px] justify-center px-6 pb-20 pt-(--contact-fade) sm:px-12 sm:pb-28">
        <div className="w-full max-w-[36rem] rounded-[0.5rem] bg-bento-card p-6 text-bento-ink sm:p-8 lg:p-10">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
