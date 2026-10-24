import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import SocialLinks, { type SocialLink } from "@/components/SocialLinks";
import profileImage from "@/assets/deepak-profile.jpg";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { scrollToSection } from "@/lib/nav";

const RESUME_HREF = "/DeepakKumar_Resume.pdf";

const TECHS = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Redux",
  "Zustand",
  "Node.js",
  "REST APIs",
  "Socket.IO",
  "PostgreSQL",
  "Git",
  "Framer Motion",
];

const ease = [0.22, 1, 0.36, 1] as const;

interface MarqueeRowProps {
  items: string[];
  /** Scroll right-to-left instead of left-to-right. */
  reverse?: boolean;
  /** Freeze the animation (reduced-motion users). */
  paused?: boolean;
}

/**
 * One endlessly scrolling row of technologies.
 *
 * The list is duplicated once and translated -50%, so the seam lands exactly
 * where the second copy starts and the loop is invisible.
 */
const MarqueeRow = ({ items, reverse = false, paused = false }: MarqueeRowProps) => (
  <ul
    className="flex w-max animate-marquee items-center gap-10 sm:gap-14"
    style={
      paused
        ? { animation: "none" }
        : { animationDirection: reverse ? "reverse" : "normal" }
    }
  >
    {[...items, ...items].map((item, index) => (
      <li
        key={`${item}-${index}`}
        aria-hidden={index >= items.length}
        className="whitespace-nowrap font-display text-xl font-medium text-muted-foreground/70 transition-colors hover:text-brand sm:text-2xl"
      >
        {item}
      </li>
    ))}
  </ul>
);

const Hero = () => {
  const { data } = usePortfolio();
  const { hero, about } = data;
  const prefersReducedMotion = useReducedMotion();

  const [firstName, ...rest] = hero.name.split(" ");
  const lastName = rest.join(" ");

  const socialLinks: SocialLink[] = [
    { label: "GitHub", href: hero.githubUrl, icon: Github },
    { label: "LinkedIn", href: hero.linkedinUrl, icon: Linkedin },
    { label: "Email", href: `mailto:${hero.email}`, icon: Mail },
  ];

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: prefersReducedMotion ? 0 : delay, ease },
  });

  return (
    <section
      id="top"
      className="grain relative overflow-hidden pb-16 pt-32 sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40"
    >
      {/* Ambient background: emerald bloom, hairline grid, vignette */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <div
          className="absolute -left-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-primary/12 blur-[130px] animate-aurora"
        />
        <div className="absolute -right-32 top-1/3 h-[30rem] w-[30rem] rounded-full bg-primary/8 blur-[120px]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, hsl(var(--foreground) / 0.055) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--foreground) / 0.055) 1px, transparent 1px)",
            backgroundSize: "68px 68px",
            maskImage:
              "radial-gradient(ellipse 85% 60% at 50% 0%, black 20%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 85% 60% at 50% 0%, black 20%, transparent 78%)",
          }}
        />
      </div>

      <div className="container mx-auto">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* ---- Copy column ---- */}
          <div className="lg:col-span-7">
            <motion.div {...fade(0.05)}>
              <AvailabilityBadge label={hero.availability} />
            </motion.div>

            <motion.h1
              {...fade(0.15)}
              className="mt-7 font-display text-display font-semibold leading-[0.95] tracking-tightest"
            >
              {/* A whitespace node keeps the accessible name "Deepak Kumar"
                  even though the two words sit on separate lines visually */}
              <span className="block text-foreground">{firstName}</span>{" "}
              {lastName && (
                <span className="text-gradient-emerald block italic">{lastName}</span>
              )}
            </motion.h1>

            <motion.div {...fade(0.25)} className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2">
              <h2 className="text-lg font-medium text-foreground sm:text-xl">{hero.role}</h2>
              <span className="hidden h-4 w-px bg-border sm:block" aria-hidden="true" />
              <span className="text-base text-muted-foreground sm:text-lg">
                at <span className="text-foreground">{hero.company}</span>
              </span>
            </motion.div>

            <motion.p
              {...fade(0.32)}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {hero.description}
            </motion.p>

            {/* Primary actions */}
            <motion.div {...fade(0.4)} className="mt-9 flex flex-wrap items-center gap-3">
              <Button variant="brand" size="xl" onClick={() => scrollToSection("#contact")}>
                Hire me
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="xl" asChild>
                <a href={RESUME_HREF} download="DeepakKumar_Resume.pdf">
                  <Download className="h-4 w-4" />
                  Download résumé
                </a>
              </Button>
            </motion.div>

            <motion.div {...fade(0.48)} className="mt-10 flex flex-wrap items-center gap-6">
              <SocialLinks links={socialLinks} />
              <span className="hidden h-8 w-px bg-border sm:block" aria-hidden="true" />
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                  {hero.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5 text-brand" aria-hidden="true" />
                  {hero.company}
                </span>
              </div>
            </motion.div>
          </div>

          {/* ---- Portrait column ---- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: prefersReducedMotion ? 0 : 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              {/* Emerald bloom behind the portrait */}
              <div
                className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-primary/12 blur-3xl"
                aria-hidden="true"
              />
              <figure className="panel overflow-hidden p-2 shadow-card-lift">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] bg-surface-2">
                  <img
                    src={profileImage}
                    alt={`${hero.name}, ${hero.role}`}
                    width={1000}
                    height={729}
                    className="h-full w-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                  />
                  {/* Legibility scrim at the bottom of the portrait */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-card via-card/70 to-transparent"
                    aria-hidden="true"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                    <div>
                      <p className="font-display text-xl font-semibold text-foreground">
                        {hero.name}
                      </p>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {hero.tagline}
                      </p>
                    </div>
                    <AvailabilityBadge label="Open" size="sm" className="shrink-0" />
                  </figcaption>
                </div>
              </figure>

              {/* Focus chips */}
              <ul className="mt-4 flex flex-wrap gap-2">
                {about.focus.slice(0, 3).map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* ---- Technology marquee: two counter-scrolling rows ---- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-16 sm:mt-20"
        >
          <p className="eyebrow mb-5 text-center">Built with</p>
          <div
            className="mask-fade-x relative flex flex-col gap-y-4 overflow-hidden"
            aria-hidden="true"
          >
            {/* The first row is the accessible list; the second is decoration,
                so the whole band is hidden from screen readers to avoid noise. */}
            <MarqueeRow items={TECHS} reverse={false} paused={prefersReducedMotion} />
            <MarqueeRow items={TECHS} reverse paused={prefersReducedMotion} />
          </div>
          {/* Screen-reader equivalent of the decorative marquee */}
          <ul className="sr-only">
            {TECHS.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
