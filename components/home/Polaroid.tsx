import Image from "next/image";
import { cn } from "@/lib/cn";

type Props = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  // Which of the reference's four resting tilts to use (1: 5deg, 2: -5deg, 3: -3deg, 4: 3deg).
  tilt?: 1 | 2 | 3 | 4;
  sizes?: string;
  className?: string;
};

// Polaroid photo, ported from the reference CodePen. The tilt, curled shadow and
// hover behaviour live in the .polaroid-item rules in globals.css.
export function Polaroid({ src, alt, caption, width, height, tilt = 1, sizes, className }: Props) {
  return (
    <div data-tilt={tilt} className={cn("polaroid-item", className)}>
      <figure className="polaroid">
        <Image src={src} alt={alt} width={width} height={height} sizes={sizes ?? "(min-width: 1024px) 260px, 46vw"} />
        <figcaption className="polaroid-caption">{caption}</figcaption>
      </figure>
    </div>
  );
}
