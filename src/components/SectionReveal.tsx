import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before revealing. Use small increments for stagger. */
  delay?: number;
  /** Direction the element travels in from. */
  from?: "up" | "down" | "left" | "right" | "none";
  /** Distance in pixels. */
  distance?: number;
  /** Replay the animation each time it scrolls into view. */
  repeat?: boolean;
}

const offsets = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
  none: { x: 0, y: 0 },
};

/**
 * Scroll-triggered entrance. Respects prefers-reduced-motion by dropping the
 * transform entirely and only fading.
 */
const SectionReveal = ({
  children,
  className,
  delay = 0,
  from = "up",
  distance = 24,
  repeat = false,
}: SectionRevealProps) => {
  const prefersReducedMotion = useReducedMotion();
  const { x, y } = offsets[from];

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: prefersReducedMotion ? 0 : x * distance,
      y: prefersReducedMotion ? 0 : y * distance,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.65,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, amount: 0.15, margin: "0px 0px -80px 0px" }}
    >
      {children}
    </motion.div>
  );
};

export default SectionReveal;
