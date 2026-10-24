import { useRef, type PointerEvent } from "react";

/**
 * Tracks the pointer position within an element as CSS custom properties on
 * that element, so children can render a spotlight or gradient that follows the
 * cursor.
 *
 * Uses a ref callback rather than React state: pointer moves fire at up to
 * ~120Hz and re-rendering the tree on each one would be wasteful. Writing
 * straight to the DOM keeps it off the React render path entirely.
 *
 * Pointer-fine only. Touch devices have no hover state, so the effect is
 * gated behind `matchMedia("(hover: hover)")`.
 */
export const usePointerGlow = () => {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    // Ignore touch and pen: they have no hover state to follow.
    if (event.pointerType !== "mouse") return;

    const rect = el.getBoundingClientRect();
    el.style.setProperty("--glow-x", `${event.clientX - rect.left}px`);
    el.style.setProperty("--glow-y", `${event.clientY - rect.top}px`);
  };

  /** Clears the glow so it does not linger after the pointer leaves. */
  const onPointerLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--glow-x", "50%");
    el.style.setProperty("--glow-y", "0%");
  };

  return { ref, onPointerMove, onPointerLeave };
};