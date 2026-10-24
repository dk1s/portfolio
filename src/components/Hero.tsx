import { motion, useReducedMotion } from "framer-motion";
import {
  Download,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import SocialLinks, { type SocialLink } from "@/components/SocialLinks";
import {
  Blob,
  CurlyArrow,
  DotColumn,
  HalfCircle,
  SquiggleCheck,
} from "@/components/Decor";
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
        className="whitespace-nowrap font-display text-xl font-medium text-white/65 transition-colors hover:text-accent sm:text-2xl"
      >
        {item}
      </li>
    ))}
  </ul>
);

const Hero = () => {
  const { data } = usePortfolio();
  const { hero, about, stats } = data;
  const prefersReducedMotion = useReducedMotion();

  const [firstName, ...rest] = hero.name.split(" ");
  const lastName = rest.join(" ");

  const socialLinks: SocialLink[] = [
    { label: "GitHub", href: hero.githubUrl, icon: Github },
    { label: "LinkedIn", href: hero.linkedinUrl, icon: Linkedin },
    { label: "Email", href: `mailto:${hero.email}`, icon: Mail },
  ];

  // A real stat from the data, used for the floating chip (DESIGN.md §5.2)
  const headlineStat = stats[0];

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: prefersReducedMotion ? 0 : 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: prefersReducedMotion ? 0 : delay, ease },
  });

  return (
    <section
      id="top"
      className="grain relative overflow-hidden bg-primary pb-16 pt-32 text-white sm:pb-20 sm:pt-36 lg:pb-24 lg:pt-40"
    >
      {/* Faint topographic contour lines (DESIGN.md §5.2) */}
      <div className="topo-lines pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />

      {/* Far-left dot column */}
      <DotColumn className="absolute left-6 top-1/2 hidden -translate-y-1/2 text-white lg:flex" />

      {/* Far-right dot column, lower area */}
      <DotColumn className="absolute bottom-16 right-6 hidden text-white lg:flex" />

      {/* Hand-drawn doodles */}
      <SquiggleCheck
        className="float-slow absolute right-[8%] top-28 hidden w-28 text-accent/80 xl:block"
      />

      <div className="container mx-auto relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* ---- Copy column ---- */}
          <div className="lg:col-span-7">
            <motion.div {...fade(0.05)}>
              <AvailabilityBadge label={hero.availability} tone="on-dark" />
            </motion.div>

            {/* Curly arrow pointing from the headline toward the portrait */}
            <CurlyArrow
              className="float-slower absolute -right-4 top-40 hidden w-32 text-white/70 xl:block"
            />

            <motion.h1
              {...fade(0.15)}
              className="mt-8 font-display text-display font-bold leading-[1.15] tracking-tight"
            >
              <span className="block text-[1.75rem] font-semibold text-white/85 sm:text-4xl">
                Hello, I&apos;m
              </span>
              <span className="mt-1 block">
                {firstName} {lastName}
              </span>
              <span className="mt-1 block text-white/90">{hero.role}</span>
            </motion.h1>

            <motion.div {...fade(0.25)} className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="text-lg text-white/90">
                at <span className="font-semibold text-white">{hero.company}</span>
              </span>
              <span className="hidden h-4 w-px bg-white/40 sm:block" aria-hidden="true" />
              <span className="inline-flex items-center gap-1.5 text-base text-white/80 sm:text-lg">
                <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
                {hero.location}
              </span>
            </motion.div>

            <motion.p
              {...fade(0.32)}
              className="mt-6 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg"
            >
              {hero.description}
            </motion.p>

            {/* Primary actions: yellow pill + ghost link with outlined play-style icon */}
            <motion.div {...fade(0.4)} className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => scrollToSection("#contact")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-10 py-4 text-lg font-medium text-accent-foreground shadow-accent-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-dark"
              >
                Hire me
              </button>
              <a
                href={RESUME_HREF}
                download="DeepakKumar_Resume.pdf"
                className="group inline-flex items-center gap-3 px-2 py-2 text-lg font-medium text-white transition-colors hover:text-accent"
              >
                <span
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-accent text-accent transition-transform duration-300 group-hover:scale-105"
                  aria-hidden="true"
                >
                  <Download className="h-4 w-4" />
                </span>
                Download résumé
              </a>
            </motion.div>

            <motion.div {...fade(0.48)} className="mt-10 flex flex-wrap items-center gap-6">
              <SocialLinks
                links={socialLinks}
                className="[&_a]:border-white/30 [&_a]:bg-white/10 [&_a]:text-white [&_a:hover]:border-accent [&_a:hover]:bg-accent [&_a:hover]:text-accent-foreground"
              />
            </motion.div>
          </div>

          {/* ---- Portrait column ---- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: prefersReducedMotion ? 0 : 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto aspect-square w-[min(100%,26rem)] lg:w-full lg:max-w-[26rem]">
              {/* Big yellow blob behind the portrait */}
              <Blob className="absolute -inset-8 h-[calc(100%+4rem)] w-[calc(100%+4rem)] text-accent" />
              {/* Smaller blob to the left of the head */}
              <Blob className="float-slow absolute -left-10 top-6 h-24 w-24 text-accent/80" />
              {/* Yellow half circle at the bottom-left */}
              <HalfCircle className="float-slower absolute -bottom-6 left-2 w-24 rotate-[215deg] text-accent" />

              <img
                src={profileImage}
                alt={`${hero.name}, ${hero.role}`}
                width={1000}
                height={729}
                className="absolute inset-0 h-full w-full rounded-full border-[6px] border-primary object-cover shadow-card-lift"
                loading="eager"
                fetchPriority="high"
              />

              {/* Floating stat chip (real data, top-right of the photo) */}
              {headlineStat && (
                <div className="float-slow absolute -right-2 top-6 rounded-[10px] bg-white px-4 py-3 text-left shadow-chip sm:-right-8">
                  <span className="block font-display text-3xl font-bold leading-none text-brand">
                    {headlineStat.value}
                  </span>
                  <span className="mt-1 block text-xs font-medium text-muted-foreground">
                    {headlineStat.label}
                  </span>
                </div>
              )}

              {/* Floating focus chip (bottom-left) */}
              {about.focus[0] && (
                <div className="float-slower absolute -left-3 bottom-8 max-w-[11rem] rounded-[10px] bg-white px-4 py-3 text-left shadow-chip sm:-left-10">
                  <span className="block text-xs font-medium text-muted-foreground">
                    Focus
                  </span>
                  <span className="mt-0.5 block text-sm font-semibold leading-snug text-foreground">
                    {about.focus[0]}
                  </span>
                </div>
              )}
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
          <p className="eyebrow mb-5 text-center text-accent">Built with</p>
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
