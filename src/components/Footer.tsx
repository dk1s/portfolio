import { ArrowUp, Github, Linkedin, Mail, type LucideIcon } from "lucide-react";
import Wordmark from "@/components/Wordmark";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { navItems, scrollToSection } from "@/lib/nav";

const Footer = () => {
  const { data } = usePortfolio();
  const { hero, contact, projects } = data;
  const year = new Date().getFullYear();

  const socials: { label: string; href: string; icon: LucideIcon }[] = [
    { label: "GitHub", href: hero.githubUrl, icon: Github },
    { label: "LinkedIn", href: hero.linkedinUrl, icon: Linkedin },
    { label: "Email", href: `mailto:${hero.email}`, icon: Mail },
  ];

  const featured = projects.filter((project) => project.featured).slice(0, 5);

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-5">
            <Wordmark asLink />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {hero.role} at {hero.company}, building responsive web applications with React,
              Next.js and TypeScript.
            </p>
            <AvailabilityBadge label={hero.availability} size="sm" className="mt-6" />
          </div>

          {/* Navigate */}
          <nav className="lg:col-span-2" aria-label="Footer navigation">
            <h2 className="eyebrow">Navigate</h2>
            <ul className="mt-5 space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-sm text-muted-foreground transition-colors hover:text-brand"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Selected work */}
          <nav className="lg:col-span-3" aria-label="Featured projects">
            <h2 className="eyebrow">Selected work</h2>
            <ul className="mt-5 space-y-3">
              {featured.map((project) => (
                <li key={project.title}>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors hover:text-brand"
                  >
                    {project.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h2 className="eyebrow">Contact</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="break-all text-sm text-muted-foreground transition-colors hover:text-brand"
                >
                  {contact.email}
                </a>
              </li>
              <li className="text-sm text-muted-foreground">{contact.location}</li>
            </ul>
            <ul className="mt-6 flex items-center gap-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={social.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-brand"
                  >
                    <social.icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {year} Deepak Kumar. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with React, TypeScript &amp; Tailwind CSS
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-brand"
          >
            Back to top
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border transition-colors group-hover:border-primary/40">
              <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
