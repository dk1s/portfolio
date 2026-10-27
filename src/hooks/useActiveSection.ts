import { useEffect, useState } from "react";

/**
 * Returns the id of the section currently occupying the viewport.
 * Used to highlight the active nav item as the visitor scrolls.
 */
export const useActiveSection = (ids: string[], offset = 120): string => {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const handleScroll = () => {
      // Walk from the bottom up and take the last section whose top edge has
      // passed the offset line. More reliable than IntersectionObserver when
      // sections have wildly different heights.
      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) {
          current = id;
        }
      }
      setActive(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [ids, offset]);

  return active;
};

/** Tracks vertical scroll progress of the document from 0 to 1. */
export const useScrollProgress = (): number => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return progress;
};
