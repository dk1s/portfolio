import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import SectionReveal from "@/components/SectionReveal";
import ProjectIcon from "@/components/ProjectIcon";
import { Button } from "@/components/ui/button";
import { usePortfolio, type Project } from "@/contexts/PortfolioContext";
import { usePointerGlow } from "@/hooks/usePointerGlow";
import { cn } from "@/lib/utils";
import logyxpress from "@/assets/images/LogyXpress_logo.png";
import cricarabia from "@/assets/images/Cric_Arabia.png";
import cricketgyan from "@/assets/images/cricketgyan_logo.jpg";
import firesetgo from "@/assets/images/FSG_logo.png";
import criccross from "@/assets/images/criccross_logo.png";
import aplus1admin from "@/assets/images/aplus1_admin.png";
import agency86 from "@/assets/images/86-agency-logo.webp";

const projectImageMap: Record<string, string> = {
  logyxpress,
  cricarabia,
  "cric 11": cricarabia,
  "cric11": cricarabia,
  cricketgyan,
  firesetgo,
  eventbooking: firesetgo,
  criccross,
  "cric cross": criccross,
  "a plus one admin": aplus1admin,
  aplus1admin,
  "86 agency": agency86,
  agency86,
};

const badgeTone: Record<string, string> = {
  Professional: "bg-accent-tint text-foreground",
  Personal: "bg-secondary text-muted-foreground",
  Academic: "bg-secondary text-muted-foreground",
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

/**
 * A single project card: header band with icon and type badge, description,
 * highlight chips, tag chips, and always-visible links.
 */
const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const glow = usePointerGlow();
  const hasLive = project.liveUrl && project.liveUrl !== "#";
  const hasSource = project.githubUrl && project.githubUrl !== "#";

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 16, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      className="group"
    >
      <article
        ref={glow.ref}
        onPointerMove={glow.onPointerMove}
        onPointerLeave={glow.onPointerLeave}
        className="panel panel-hover panel-glow flex h-full flex-col overflow-hidden border-0 bg-surface-2"
      >
        {/* Header band — turns indigo on hover, like a highlighted card */}
        <div className="relative flex items-center justify-between gap-3 bg-primary/10 p-5 transition-colors duration-300 group-hover:bg-primary">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-brand transition-colors duration-300 group-hover:bg-white group-hover:text-brand overflow-hidden shadow-sm">
              {(() => {
                const imageSrc =
                  projectImageMap[project.title.toLowerCase()] ||
                  projectImageMap[project.title.toLowerCase().replace(/\s+/g, "")] ||
                  (project as any).image;
                if (imageSrc) {
                  return (
                    <img
                      src={imageSrc}
                      alt={`${project.title} logo`}
                      className="h-full w-full object-contain p-1.5 rounded-full"
                    />
                  );
                }
                return <ProjectIcon name={project.icon} className="h-6 w-6" />;
              })()}
            </span>
            <div className="flex flex-col">
              <h3 className="font-display text-lg font-semibold leading-snug text-foreground group-hover:text-white transition-colors duration-300">
                {project.title}
              </h3>
            </div>
          </div>
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium",
              badgeTone[project.type] ?? badgeTone.Personal
            )}
          >
            {project.type}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-start justify-between gap-2">
            <p className="sr-only">{project.title}</p>
            <ArrowUpRight
              className="ml-auto h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
              aria-hidden="true"
            />
          </div>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          {project.highlights.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="rounded-lg bg-card px-2.5 py-1 text-xs font-medium text-foreground/85"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          )}

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-border px-2 py-1 text-xs text-muted-foreground"
              >
                {tag}
              </li>
            ))}
            {project.tags.length > 4 && (
              <li className="rounded-md px-2 py-1 text-xs text-muted-foreground/70">
                +{project.tags.length - 4}
              </li>
            )}
          </ul>

          {/* Links stay visible: a hover-only overlay is unusable on touch */}
          <div className="mt-auto flex items-center gap-2 pt-6">
            {hasLive ? (
              <Button variant="brand" size="sm" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  Live site
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </Button>
            ) : (
              <span className="rounded-full border border-dashed border-border px-3 py-1.5 text-xs text-muted-foreground">
                Not published
              </span>
            )}
            {hasSource && (
              <Button variant="outline" size="sm" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-3.5 w-3.5" />
                  Source
                </a>
              </Button>
            )}
          </div>
        </div>
      </article>
    </motion.li>
  );
};

const Projects = () => {
  const { data } = usePortfolio();
  const { projects, hero } = data;

  const types = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((project) => project.type)))],
    [projects]
  );
  const [activeType, setActiveType] = useState("All");

  const visibleProjects = useMemo(
    () =>
      activeType === "All"
        ? projects
        : projects.filter((project) => project.type === activeType),
    [projects, activeType]
  );

  return (
    <Section id="projects" tone="default">
      <SectionHeading
        eyebrow="02 — Selected work"
        title="Projects I've shipped"
        description="Production work across logistics, sports, events and fintech — built with React, Next.js and TypeScript, with the state management and API work that real products need."
        align="center"
        className="mb-12 sm:mb-16"
        action={
          <div
            role="group"
            aria-label="Filter projects by type"
            className="flex flex-wrap justify-center gap-2"
          >
            {types.map((type) => (
              <button
                key={type}
                type="button"
                aria-pressed={activeType === type}
                onClick={() => setActiveType(type)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                  activeType === type
                    ? "bg-accent text-accent-foreground shadow-accent-glow"
                    : "bg-card text-muted-foreground shadow-card hover:text-foreground"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        }
      />

      <motion.ul layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </AnimatePresence>
      </motion.ul>

      <SectionReveal delay={0.1} className="mt-12 flex justify-center">
        <Button variant="brand" size="lg" asChild>
          <a href={hero.githubUrl} target="_blank" rel="noopener noreferrer">
            <Github className="h-4 w-4" />
            See everything on GitHub
          </a>
        </Button>
      </SectionReveal>
    </Section>
  );
};

export default Projects;
