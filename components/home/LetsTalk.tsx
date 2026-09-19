import { contact, site } from "@/content/home";
import { ContactForm } from "@/components/contact/ContactForm";
import { DraggableStickers } from "@/components/effects/DraggableStickers";

// Let's Talk: the hero's surface flipped, fading from the transition panel's colour into
// blue, with the hero's drifting pools and grain, so the page closes the way it opens and
// runs straight into the blue footer. The form sits in a white card with draggable stickers
// either side, and an email link below it for anyone who'd rather write directly (styles in
// globals.css, .contact-*). Its title and sticker live in the arc transition before it; the
// heading here is for screen readers. The section is two screens tall with the form held in
// place: the first screen is spent on the arc revealing it, so the form still gets a full
// screen of its own.
export function LetsTalk() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative min-h-[200svh] bg-bento-blue">
      <h2 id="contact-title" className="sr-only">
        {contact.question} {contact.cta}
      </h2>

      <div className="contact-stage hero-drift sticky top-0 isolate flex min-h-svh items-center overflow-clip">
        <div aria-hidden className="grain is--fade-in" data-grain-animate="true" />

        {/* The bottom padding keeps the form and the email line clear of the floating nav. */}
        <div className="relative z-[1] mx-auto flex w-full max-w-[1320px] flex-col items-center px-6 pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-[clamp(1.5rem,4svh,3rem)] sm:px-12">
          <div className="contact-card w-full max-w-[36rem] rounded-[0.5rem] bg-bento-card p-6 text-bento-ink sm:p-8 lg:p-10">
            <ContactForm />

            {/* For anyone who'd rather write directly: hovering shows the cursor bubble, clicking opens their mail app. */}
            <p className="mt-5 text-center text-[14px] leading-[1.5] text-bento-muted">
              {contact.emailPrompt}{" "}
              <a
                href={`mailto:${site.email}`}
                data-cursor-hover
                data-cursor-text={contact.emailCursor}
                className="font-medium text-bento-ink underline decoration-bento-ink/30 underline-offset-4 transition-[text-decoration-color] duration-200 hover:decoration-bento-ink"
              >
                {contact.emailLink} {site.email}
              </a>
            </p>
          </div>
        </div>

        <DraggableStickers stickers={contact.stickers} variant="contact" />
      </div>
    </section>
  );
}
