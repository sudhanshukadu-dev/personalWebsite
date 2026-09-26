"use client";

import { useEffect, useRef } from "react";

// A muted, looping clip that plays only while it's on screen. Under reduced motion it
// doesn't autoplay and shows controls instead.
export function AutoplayVideo({
  src,
  label,
  className,
  ...rest
}: {
  src: string;
  label: string;
  className?: string;
} & React.ComponentPropsWithoutRef<"video">) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.controls = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      {...rest}
      ref={videoRef}
      src={src}
      aria-label={label}
      muted
      loop
      playsInline
      preload="metadata"
      className={className}
    />
  );
}
