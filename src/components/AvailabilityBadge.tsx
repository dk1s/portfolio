import { cn } from "@/lib/utils";

interface AvailabilityBadgeProps {
  label: string;
  className?: string;
  size?: "sm" | "md";
  /** Rendered on the indigo hero/footer, where the chip is white on white/10. */
  tone?: "on-light" | "on-dark";
}

/**
 * "Available for hire" signal with a pulsing status dot. Recruiters scan for
 * this in the first two seconds, so it lives in the navbar and the hero.
 */
const AvailabilityBadge = ({
  label,
  className,
  size = "md",
  tone = "on-light",
}: AvailabilityBadgeProps) => {
  const onDark = tone === "on-dark";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border font-medium backdrop-blur-sm",
        onDark
          ? "border-white/30 bg-white/10 text-white"
          : "border-brand/25 bg-brand/10 text-brand",
        size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-xs",
        className
      )}
    >
      <span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden="true">
        <span
          className={cn(
            "absolute inline-flex h-full w-full animate-pulse-ring rounded-full",
            onDark ? "bg-accent" : "bg-brand"
          )}
        />
        <span
          className={cn(
            "relative inline-flex h-1.5 w-1.5 rounded-full",
            onDark ? "bg-accent" : "bg-brand"
          )}
        />
      </span>
      {label}
    </span>
  );
};

export default AvailabilityBadge;
