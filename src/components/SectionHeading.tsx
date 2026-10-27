import { cn } from "@/lib/utils";
import SectionReveal from "@/components/SectionReveal";

interface SectionHeadingProps {
  /** Small uppercase label above the title, e.g. "01 — About". */
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  /** Optional element rendered opposite the title (e.g. a filter row). */
  action?: React.ReactNode;
}

/**
 * The one heading pattern used by every section: eyebrow, serif title, muted
 * supporting line. Consistent hierarchy is what makes a page read as designed
 * rather than assembled.
 */
const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  action,
}: SectionHeadingProps) => {
  const isCentered = align === "center";

  return (
    <SectionReveal
      className={cn(
        "mb-10 flex flex-col gap-6 sm:mb-14",
        isCentered ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className={cn("max-w-2xl", isCentered && "mx-auto")}>
        {eyebrow && (
          <div
            className={cn(
              "eyebrow mb-5 flex items-center gap-3",
              isCentered && "justify-center"
            )}
          >
            <span className="h-px w-6 bg-primary" aria-hidden="true" />
            {eyebrow}
          </div>
        )}
        <h2
          className={cn(
            "font-display text-3xl font-bold leading-[1.2] tracking-tight text-foreground sm:text-4xl"
          )}
        >
          {title}
        </h2>
        {description && (
          <p className="mt-4 max-w-prose text-base leading-relaxed text-muted-foreground sm:text-lg">
            {description}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </SectionReveal>
  );
};

export default SectionHeading;
