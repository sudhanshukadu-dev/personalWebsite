"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { toggleTheme, useIsDark } from "@/lib/theme";

/*
  Light/dark switch. The track colour and thumb position come from CSS
  (.theme-switch rules in globals.css) so they're right on first paint;
  React only keeps aria-checked in sync.
*/
export function ThemeSwitch() {
  const isDark = useIsDark();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark mode"
      onClick={toggleTheme}
      className="theme-switch relative flex h-7 w-12 items-center rounded-full p-0.5 transition-colors duration-300 motion-reduce:transition-none"
    >
      <span className="theme-switch-thumb grid size-6 place-items-center rounded-full bg-[#fcfcfd] text-[#0f1012] shadow-[0_1px_3px_rgb(15_16_18/0.3)] transition-[translate] duration-300 ease-out-expo motion-reduce:transition-none">
        <Sun size={14} weight="bold" aria-hidden className="theme-light-only" />
        <Moon size={14} weight="fill" aria-hidden className="theme-dark-only" />
      </span>
    </button>
  );
}
