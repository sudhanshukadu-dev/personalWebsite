import { ArrowUpRight } from "@phosphor-icons/react/ssr";
import { MarkGithubIcon } from "@primer/octicons-react";
import { siGmail } from "simple-icons";
import { footer } from "@/content/home";
import { PixelGrid } from "@/components/effects/PixelGrid";
import { CurrentYear } from "@/components/footer/CurrentYear";
import { FallingStickers } from "@/components/footer/FallingStickers";

// The LinkedIn mark from Sudhanshu's social-share reference, GitHub's own mark from GitHub's
// icon set (Octicons), and the Gmail mark (Simple Icons) in Gmail red for email.
function LinkedInIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M19.039 19.043H16.078V14.4C16.078 13.294 16.055 11.87 14.534 11.87C12.99 11.87 12.754 13.07 12.754 14.319V19.041H9.792V9.50001H12.637V10.8H12.676C12.9609 10.3131 13.3725 9.91263 13.867 9.6411C14.3614 9.36957 14.9203 9.23717 15.484 9.25801C18.484 9.25801 19.04 11.233 19.04 13.804V19.042L19.039 19.043ZM6.447 8.19401C6.1069 8.19381 5.7745 8.09279 5.4918 7.90372C5.2091 7.71465 4.98879 7.44601 4.85874 7.13176C4.72868 6.81751 4.6947 6.47176 4.7611 6.13821C4.8275 5.80465 4.99129 5.49827 5.23178 5.25778C5.47226 5.0173 5.77865 4.8535 6.1122 4.7871C6.44575 4.72071 6.79151 4.75468 7.10575 4.88474C7.42 5.0148 7.68864 5.2351 7.87771 5.5178C8.06678 5.8005 8.1678 6.13291 8.168 6.47301C8.16826 6.69909 8.12393 6.923 8.03753 7.13192C7.95114 7.34084 7.82438 7.53066 7.66452 7.69052C7.50466 7.85039 7.31483 7.97714 7.10591 8.06354C6.89699 8.14993 6.67308 8.19427 6.447 8.19401ZM7.932 19.043H4.963V9.50001H7.932V19.043ZM20.521 2.00001H3.476C3.28445 1.99763 3.0943 2.03302 2.91643 2.10417C2.73856 2.17531 2.57646 2.28081 2.43938 2.41464C2.30231 2.54846 2.19295 2.70799 2.11756 2.8841C2.04217 3.06021 2.00222 3.24945 2 3.44101V20.559C2.00222 20.7506 2.04217 20.9398 2.11756 21.1159C2.19295 21.292 2.30231 21.4515 2.43938 21.5854C2.57646 21.7192 2.73856 21.8247 2.91643 21.8958C3.0943 21.967 3.28445 22.0024 3.476 22H20.518C20.9055 22.0051 21.2792 21.8562 21.5571 21.586C21.8349 21.3159 21.9942 20.9465 22 20.559V3.44101C21.9939 3.05359 21.8346 2.68438 21.5568 2.41427C21.279 2.14416 20.9054 1.99519 20.518 2.00001H20.521Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" aria-hidden>
      <path d={siGmail.path} fill={`#${siGmail.hex}`} />
    </svg>
  );
}

function GitHubIcon() {
  return <MarkGithubIcon size="small" aria-hidden className="h-full w-full" />;
}

const ICONS = { linkedin: LinkedInIcon, github: GitHubIcon, email: MailIcon } as const;

// Site footer, one screen tall: the credit line at hero size, the social links and a resume
// button under it, and each section's sticker falling into a pile along the bottom (click
// one to go back to its section). Behind it all is the interactive pixel grid. The content
// layer lets the pointer through to the stickers, except on the links. It follows the
// closing arc transition, whose arc lifts off it over one screen of scrolling, so it needs
// to be a full screen tall.
export function Footer() {
  return (
    <footer className="relative isolate flex min-h-svh flex-col overflow-clip bg-bento-card text-bento-ink">
      <PixelGrid />
      <FallingStickers stickers={footer.stickers} />

      <div className="pointer-events-none relative z-[2] mx-auto w-full max-w-[1320px] px-6 pt-[clamp(4rem,14svh,9rem)] text-center sm:px-12 lg:px-24 xl:px-36">
        {/* Same scale as the hero headline, ending with the current year. A no-break space
            before each "·" keeps the dots from starting a line. */}
        <p className="mx-auto text-balance text-[40px] font-medium leading-[1.06] tracking-[-0.04em] sm:text-[52px] lg:text-[60px] xl:text-[72px] xl:leading-[1.04]">
          {footer.credit.replaceAll(" · ", "\u00a0· ")}{"\u00a0· "}<CurrentYear fallback={new Date().getFullYear()} />
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <div className="social-share pointer-events-auto">
            {footer.socials.map((social) => {
              const Icon = ICONS[social.icon];
              const external = social.href.startsWith("http");
              return (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  data-social={social.icon}
                  className="social-share__button"
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  <i className="social-share__icon">
                    <Icon />
                  </i>
                </a>
              );
            })}
          </div>

          {/* Bubble arrow button, the site's primary CTA (styles in globals.css). */}
          <a
            href={footer.resume.href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-bubble-arrow is--on-page pointer-events-auto"
          >
            <span aria-hidden className="btn-bubble-arrow__arrow">
              <ArrowUpRight size="40%" className="btn-bubble-arrow__arrow-svg" />
            </span>
            <span className="btn-bubble-arrow__content">
              <span className="btn-bubble-arrow__content-text">{footer.resume.label}</span>
            </span>
            <span aria-hidden className="btn-bubble-arrow__arrow is--duplicate">
              <ArrowUpRight size="40%" className="btn-bubble-arrow__arrow-svg" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
