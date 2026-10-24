/**
 * Decorative assets for the "Playful Modern" design (DESIGN.md §7).
 *
 * Every piece is inline SVG or CSS — no external images — and every piece is
 * decoration: absolutely positioned, `pointer-events-none`, `aria-hidden`, and
 * normally hidden or scaled down below 768px by the caller so it never
 * overlaps text.
 */
import { cn } from "@/lib/utils";

interface DecorProps {
  className?: string;
}

/** Column of 5 dots, used at the far edges of the hero. */
export const DotColumn = ({ className }: DecorProps) => (
  <span
    aria-hidden="true"
    className={cn("pointer-events-none flex flex-col items-center gap-[46px]", className)}
  >
    {Array.from({ length: 5 }).map((_, index) => (
      <span
        key={index}
        className="h-2 w-2 rounded-full bg-current"
        style={{ opacity: index % 2 === 0 ? 1 : 0.55 }}
      />
    ))}
  </span>
);

/** Organic blob — the yellow shape sitting behind the hero portrait. */
export const Blob = ({ className }: DecorProps) => (
  <svg
    viewBox="0 0 200 200"
    aria-hidden="true"
    className={cn("pointer-events-none", className)}
    preserveAspectRatio="none"
  >
    <path
      fill="currentColor"
      d="M100.4 6.7c22.4-1.6 45.6 9.4 60.2 26.6 14.6 17.2 20.6 40.6 17.6 63-3 22.4-16.9 43.8-37.2 56.7-20.3 12.9-47 17.3-71.4 10.4C45.2 156.5 27.4 136 17.1 112.4 6.8 88.8 4 62.1 13.4 41.4 22.8 20.7 44.4 6 69.7 3.4c10.2-1 20.6-1.7 30.7 3.3Z"
    />
  </svg>
);

/** Small solid half-circle used at the base of the portrait. */
export const HalfCircle = ({ className }: DecorProps) => (
  <svg viewBox="0 0 100 50" aria-hidden="true" className={cn("pointer-events-none", className)}>
    <path fill="currentColor" d="M0 50A50 50 0 0 1 100 50H0Z" />
  </svg>
);

/** Hand-drawn curly arrow that loops once before pointing right. */
export const CurlyArrow = ({ className }: DecorProps) => (
  <svg
    viewBox="0 0 140 90"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={cn("pointer-events-none", className)}
  >
    <path d="M8 18c26-16 52-6 50 14-2 17-27 22-32 6-4-13 10-24 26-18 18 7 26 34 60 44" />
    <path d="M100 47l16 17-22 8" />
  </svg>
);

/** Squiggle ending in a small check-style arrow. */
export const SquiggleCheck = ({ className }: DecorProps) => (
  <svg
    viewBox="0 0 130 46"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={cn("pointer-events-none", className)}
  >
    <path d="M4 30c10-20 20 14 30-4s20 14 30-6 18 10 26 2" />
    <path d="M84 34l12 10 26-30" />
  </svg>
);

/** Curved arrow pointing right — sits between two working-process steps. */
export const CurveArrowRight = ({ className }: DecorProps) => (
  <svg
    viewBox="0 0 120 46"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={cn("pointer-events-none", className)}
  >
    <path d="M4 34C34 6 74 2 112 18" />
    <path d="M96 6l18 12-14 14" />
  </svg>
);

/** Same arrow, rotated to point down — the mobile fallback between steps. */
export const CurveArrowDown = ({ className }: DecorProps) => (
  <svg
    viewBox="0 0 46 120"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={cn("pointer-events-none", className)}
  >
    <path d="M34 4C6 34 2 74 18 112" />
    <path d="M6 96l12 18 14-14" />
  </svg>
);

/** Four-point hand-drawn sparkle, outlined. */
export const SparkleOutline = ({ className }: DecorProps) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinejoin="round"
    aria-hidden="true"
    className={cn("pointer-events-none", className)}
  >
    <path d="M24 4c2 11 7 16 18 20-11 4-16 9-18 20-2-11-7-16-18-20 11-4 16-9 18-20Z" />
  </svg>
);

/** Solid five-point star. */
export const SolidStar = ({ className }: DecorProps) => (
  <svg viewBox="0 0 40 40" aria-hidden="true" className={cn("pointer-events-none", className)}>
    <path
      fill="currentColor"
      d="M20 2l5.4 11.6L38 15.3l-9 8.9 2.2 12.6L20 30.4 8.8 36.8 11 24.2 2 15.3l12.6-1.7L20 2Z"
    />
  </svg>
);

/** Open spiral swirl. */
export const Swirl = ({ className }: DecorProps) => (
  <svg
    viewBox="0 0 70 70"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    aria-hidden="true"
    className={cn("pointer-events-none", className)}
  >
    <path d="M35 35a10 10 0 1 1-10-10 18 18 0 1 1-18 18 26 26 0 1 1 26 26 34 34 0 1 1 34-34" />
  </svg>
);

/** Three rewind-style triangles pointing left. */
export const PlayTriangles = ({ className }: DecorProps) => (
  <svg viewBox="0 0 84 26" aria-hidden="true" className={cn("pointer-events-none", className)}>
    <g fill="currentColor">
      <path d="M24 1 2 13l22 12V1Z" />
      <path d="M52 1 30 13l22 12V1Z" />
      <path d="M80 1 58 13l22 12V1Z" />
    </g>
  </svg>
);

/** Outlined circle doodle. */
export const OutlineCircle = ({ className }: DecorProps) => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    aria-hidden="true"
    className={cn("pointer-events-none", className)}
  >
    <circle cx="20" cy="20" r="17" />
  </svg>
);

/** Solid triangle. */
export const SolidTriangle = ({ className }: DecorProps) => (
  <svg viewBox="0 0 40 36" aria-hidden="true" className={cn("pointer-events-none", className)}>
    <path fill="currentColor" d="M20 0l20 36H0L20 0Z" />
  </svg>
);

/** Thin dashed ring that slowly rotates around a process icon. */
export const DashedRing = ({ className }: DecorProps) => (
  <svg
    viewBox="0 0 100 100"
    fill="none"
    aria-hidden="true"
    className={cn("pointer-events-none spin-slow", className)}
  >
    <circle
      cx="50"
      cy="50"
      r="47"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeDasharray="6 8"
    />
  </svg>
);
