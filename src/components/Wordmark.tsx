import { cn } from "@/lib/utils";

interface WordmarkProps {
  className?: string;
  /** Render as a clickable link back to the top of the page. */
  asLink?: boolean;
  /** Sits on the indigo hero/footer background, where the mark is white. */
  onDark?: boolean;
}

/**
 * The logotype. Poppins bold, with the dot in the brand colour — small detail,
 * but it is the mark a visitor remembers.
 */
const Wordmark = ({ className, asLink = false, onDark = false }: WordmarkProps) => {
  const content = (
    <span
      className={cn(
        "font-display text-xl font-bold tracking-tight",
        onDark ? "text-white" : "text-foreground",
        className
      )}
    >
      Deepak
      <span className={onDark ? "text-accent" : "text-brand"}>.</span>
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
