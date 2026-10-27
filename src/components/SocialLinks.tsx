import { Github, Linkedin, Mail, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SocialLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
  /** "icons" = compact square buttons, "labels" = icon + text rows. */
  variant?: "icons" | "labels";
  /** Index used to stagger hover/entrance animations. */
  startIndex?: number;
}

const SocialLinks = ({
  links,
  className,
  variant = "icons",
  startIndex = 0,
}: SocialLinksProps) => {
  if (variant === "labels") {
    return (
      <ul className={cn("flex flex-col gap-1", className)}>
        {links.map((link, index) => (
          <li key={link.label} style={{ transitionDelay: `${(startIndex + index) * 40}ms` }}>
            <a
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-accent"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-brand">
                <link.icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium text-foreground transition-colors group-hover:text-brand">
                {link.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={cn("flex items-center gap-2.5", className)}>
      {links.map((link, index) => (
        <li key={link.label} style={{ transitionDelay: `${(startIndex + index) * 40}ms` }}>
          <a
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
            aria-label={link.label}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-brand hover:shadow-glow-sm"
          >
            <link.icon className="h-4 w-4" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
};

export default SocialLinks;
