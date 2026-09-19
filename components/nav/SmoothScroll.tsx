"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/locomotive-scroll.css";
import { setSmoothScroll } from "@/lib/smooth-scroll";

gsap.registerPlugin(ScrollTrigger);

/*
  Smooth scrolling with Locomotive Scroll (v5, built on Lenis), from the snippet Sudhanshu
  shared. It keeps native scrolling, so ScrollTrigger keeps working; each smoothed scroll
  step also updates ScrollTrigger directly so pinned and scrubbed sections stay in step.
  Scrolling is paused while the intro loader holds the page (html[data-loading]). Skipped
  under reduced motion, where scrolling stays native. Renders nothing itself.
*/
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let scroll: LocomotiveScroll | null = null;
    let observer: MutationObserver | null = null;
    let cancelled = false;

    void import("locomotive-scroll").then(({ default: Locomotive }) => {
      if (cancelled) return;
      // Started by hand: Locomotive's own auto start runs a frame later and would un-pause
      // scrolling while the intro loader still holds the page.
      const instance = new Locomotive({ autoStart: false, scrollCallback: () => ScrollTrigger.update() });
      scroll = instance;
      setSmoothScroll(instance);

      // Hold still while the intro loader plays, as the page's own overflow lock does.
      const root = document.documentElement;
      const syncWithLoader = () => {
        if (root.hasAttribute("data-loading")) {
          instance.stop();
          instance.lenisInstance?.stop();
        } else {
          instance.start();
        }
      };
      // After Locomotive finishes setting up, which it does on the next frame.
      requestAnimationFrame(syncWithLoader);
      observer = new MutationObserver(syncWithLoader);
      observer.observe(root, { attributes: true, attributeFilter: ["data-loading"] });
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
      setSmoothScroll(null);
      scroll?.destroy();
    };
  }, []);

  return null;
}
