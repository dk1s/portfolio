import { cn } from "@/lib/utils";

type SectionTone = "default" | "raised" | "deep";

interface SectionProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  /** Section background. Use alternating tones to create rhythm down the page. */
  tone?: SectionTone;
  /** Render a hairline divider above the section. */
  divider?: boolean;
}

const toneClasses: Record<SectionTone, string> = {
  default: "bg-background",
  raised: "bg-surface-2",
  deep: "bg-card",
};

/**
 * Standard page section: consistent vertical rhythm, optional hairline
 * divider and consistent max width. Every section on the page uses this so
 * spacing and alignment never drift.
 */
const Section = ({
  id,
  children,
  className,
  tone = "default",
  divider = false,
}: SectionProps) => {
  return (
    <section
      id={id}
      className={cn(
        "relative section-rhythm",
        toneClasses[tone],
        divider && "border-t border-border",
        className
      )}
    >
      <div className="container mx-auto">{children}</div>
    </section>
  );
};

export default Section;
