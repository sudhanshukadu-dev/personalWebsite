"use client";

import { useEffect, useRef, useState } from "react";

/*
  A tiny record deck tucked into the hero headline, in place of the photo chip.
  Tap it and the tonearm swings onto the record, the record spins and the track
  plays; tap again to stop. The audio only loads on first play. Styles live in
  globals.css (.vinyl*).
*/

type VinylPlayerProps = {
  src: string;
  label: string;
};

export function VinylPlayer({ src, label }: VinylPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  // Follow the audio element itself, so the deck stays in sync however playback stops.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.pause();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => setPlaying(false));
    } else {
      audio.pause();
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      aria-pressed={playing}
      data-playing={playing}
      data-cursor-hover
      data-cursor-text={playing ? "Pause" : "Play"}
      className="vinyl"
    >
      <span aria-hidden className="vinyl-disc" />
      <span aria-hidden className="vinyl-arm" />
      <audio ref={audioRef} src={src} loop preload="none" />
    </button>
  );
}
