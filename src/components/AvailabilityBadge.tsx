import { cn } from "@/lib/utils";

interface AvailabilityBadgeProps {
  label: string;
  className?: string;
  size?: "sm" | "md";
}

/**
 * "Available for hire" signal with a pulsing status dot. Recruiters scan for
 * this in the first two seconds, so it lives in the navbar and the hero.
 */
const AvailabilityBadge = ({ label, className, size = "md" }: AvailabilityBadgeProps) => {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/10 font-medium text-brand backdrop-blur-sm",
        size === "sm" ? "px-3 py-1 text-xs" : "px-4 py-1.5 text-xs",
        className
      )}
    >
      <span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-brand" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
      </span>
      {label}
    </span>
  );
};

export default AvailabilityBadge;
