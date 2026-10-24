import { cn } from "@/lib/utils";

interface WordmarkProps {
  className?: string;
  /** Render as a clickable link back to the top of the page. */
  asLink?: boolean;
}

/**
 * The logotype. Serif, tight tracking, with the surname in the brand colour —
 * small detail, but it is the mark a visitor remembers.
 */
const Wordmark = ({ className, asLink = false }: WordmarkProps) => {
  const content = (
    <span className={cn("font-display text-lg font-semibold tracking-tight text-foreground", className)}>
      Deepak
      <span className="text-brand">.</span>
      Kumar
    </span>
  );

  if (!asLink) return content;

  return (
    <a
      href="#top"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="rounded-md transition-opacity hover:opacity-80"
      aria-label="Deepak Kumar — back to top"
    >
      {content}
    </a>
  );
};

export default Wordmark;
