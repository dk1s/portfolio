import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CountUpProps {
  /** Final value, e.g. "10", "5+". A leading integer is animated; the rest is kept verbatim. */
  value: string;
  className?: string;
  duration?: number;
}

/**
 * Animates a numeric statistic from zero when it scrolls into view.
 *
 * The final value is what assistive tech reads: the animated digits are marked
 * `aria-hidden` and the real value is exposed once via `aria-label`, so a
 * screen reader announces "10 Projects shipped" rather than a stream of
 * intermediate numbers.
 *
 * Values without a leading integer ("Open to work") render as plain text.
 */
const CountUp = ({ value, className, duration = 1.4 }: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });
  const prefersReducedMotion = useReducedMotion();

  const match = value.match(/^(\d+)(.*)$/s);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";

  const [display, setDisplay] = useState(() => (target === null ? value : "0"));

  useEffect(() => {
    if (target === null) return;
    // Reduced motion, or the element never scrolled into view: show the value.
    if (prefersReducedMotion || !isInView) {
      if (prefersReducedMotion) setDisplay(`${target}${suffix}`);
      return;
    }

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      // easeOutExpo: fast start, gentle settle, reads as "counting up and landing"
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(`${Math.round(eased * target)}${suffix}`);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, prefersReducedMotion, target, suffix, duration]);

  if (target === null) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} aria-label={value} className={className}>
      <span aria-hidden="true">{display}</span>
    </span>
  );
};

export default CountUp;