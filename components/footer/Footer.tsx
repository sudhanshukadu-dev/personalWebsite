import { ArrowUp } from "@phosphor-icons/react/ssr";
import { footer, hero, navLinks, navSecondary, site } from "@/content/home";
import { cn } from "@/lib/cn";

const linkGroups = [{ label: footer.pagesLabel, links: navLinks.filter((link) => !link.cta) }, ...navSecondary];

// Site footer: carries on the Let's Talk blue and grain, with the links, a giant
// wordmark and the small print. The bottom padding keeps it clear of the floating nav.
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="on-blue relative isolate overflow-clip bg-bento-blue text-bento-on-blue">
      <div aria-hidden className="grain is--solid" data-grain-animate="true" />

      <div className="relative z-[1] mx-auto w-full max-w-[1320px] px-6 pb-[calc(7.5rem+env(safe-area-inset-bottom))] sm:px-12 lg:px-24 xl:px-36">
        <div className="grid gap-12 border-t border-bento-on-blue/25 pt-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="font-(family-name:--font-unbounded) text-[28px] font-bold leading-none tracking-[-0.01em]">
              {site.logo}
            </p>
            <p className="mt-4 text-[17px] leading-[1.5]">{hero.nameLine}</p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-[1fr_1fr_auto] lg:col-span-7"
          >
            {linkGroups.map((group, index) => (
              <div
                key={group.label}
                className={cn("flex flex-col gap-4", index === linkGroups.length - 1 && "col-span-2 sm:col-span-1")}
              >
                <p className="font-mono text-[12px] uppercase leading-none tracking-[0.04em]">{group.label}</p>
                <ul className="flex flex-col gap-2.5">
                  {group.links.map((link) => {
                    const external = link.href.startsWith("http");
                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="text-[17px] font-medium underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-200 hover:decoration-bento-on-blue"
                        >
                          {link.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Decorative wordmark, sized in container units so it spans the content width exactly. */}
        <div aria-hidden className="@container mt-20 select-none sm:mt-28">
          <p className="whitespace-nowrap text-[length:14.2cqi] font-medium leading-[0.8] tracking-[-0.06em]">
            {site.name}
          </p>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-4 border-t border-bento-on-blue/25 pt-6 text-[15px] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. {footer.credit}
          </p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 self-start font-medium underline decoration-transparent underline-offset-4 transition-[text-decoration-color] duration-200 hover:decoration-bento-on-blue sm:self-auto"
          >
            {footer.backToTop}
            <ArrowUp size={16} weight="bold" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
