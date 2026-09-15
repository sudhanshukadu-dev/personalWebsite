import { Geist, Geist_Mono, Poor_Story, Unbounded } from "next/font/google";

// Interface and body copy.
export const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

// Small uppercase labels (nav panel).
export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

// Logo wordmark (loader and nav).
export const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "block",
});

// Handwritten polaroid captions (Experience), as in the reference CodePen.
export const poorStory = Poor_Story({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-poor-story",
  display: "swap",
});
