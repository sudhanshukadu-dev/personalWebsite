import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { geist, geistMono, poorStory, unbounded } from "@/app/fonts";
import { BottomNav } from "@/components/nav/BottomNav";
import { CursorBubble } from "@/components/cursor/CursorBubble";
import { Footer } from "@/components/footer/Footer";
import { SmoothAnchors } from "@/components/nav/SmoothAnchors";
import { ClickZoom } from "@/components/effects/ClickZoom";
import { PageTransition } from "@/components/effects/PageTransition";
import { Loader } from "@/components/loader/Loader";
import { hero, site } from "@/content/home";
import "./globals.css";

export const metadata: Metadata = {
  title: `${site.name}, ${site.role}`,
  description: hero.subtext,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F2F3F5" },
    { media: "(prefers-color-scheme: dark)", color: "#0D0E10" },
  ],
};

// Before first paint: restore the theme choice, and decide whether the intro
// loader plays (once per session, or whenever the URL contains ?intro).
// The 10s timeout releases the page if the loader script never runs; the loader
// cancels it as soon as it starts.
const restorePreferences = `try{var d=document.documentElement,t=localStorage.getItem("theme");if(t==="light"||t==="dark")d.dataset.theme=t;if(!sessionStorage.getItem("intro-seen")||/[?&]intro\\b/.test(location.search)){d.dataset.intro="on";d.dataset.loading="on";window.__introFailsafe=setTimeout(function(){delete d.dataset.loading;delete d.dataset.intro},10000)}}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${unbounded.variable} ${poorStory.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-bento-page font-bento text-bento-ink antialiased">
        <Script id="restore-preferences" strategy="beforeInteractive">
          {restorePreferences}
        </Script>
        <Loader />
        <a
          href="#main"
          className="sr-only z-(--z-skip) rounded-full bg-bento-inverse px-4 py-2 text-sm font-medium text-bento-on-inverse focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        {children}
        <Footer />
        <BottomNav />
        <CursorBubble />
        <SmoothAnchors />
        <ClickZoom />
        <PageTransition />
      </body>
    </html>
  );
}
