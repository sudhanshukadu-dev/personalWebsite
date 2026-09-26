"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";

// Leaves out site chrome (the footer, the floating nav) on the routes that bring their own.
export function HideOnRoutes({ paths, children }: { paths: string[]; children: ReactNode }) {
  const pathname = usePathname();
  return paths.includes(pathname) ? null : children;
}
