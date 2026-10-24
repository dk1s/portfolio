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

const badgeTone: Record<string, string> = {
  Professional: "border-primary/25 bg-primary/10 text-brand",
  Personal: "border-border bg-muted text-muted-foreground",
  Academic: "border-border bg-muted text-muted-foreground",
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
        className="panel panel-hover panel-glow flex h-full flex-col overflow-hidden transition-transform duration-500 group-hover:-translate-y-1 group-hover:shadow-card-lift"
      >
        {/* Header band */}
        <div className="relative flex items-start justify-between gap-3 border-b border-border bg-surface-2 p-5">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-brand transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
            <ProjectIcon name={project.icon} className="h-5 w-5" />
          </span>
          <span
            className={cn(
              "rounded-full border px-2.5 py-1 text-xs font-medium",
              badgeTone[project.type] ?? badgeTone.Personal
            )}
          >
            {project.type}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="flex items-start justify-between gap-2 font-display text-lg font-semibold leading-snug text-foreground">
            {project.title}
            <ArrowUpRight
              className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
              aria-hidden="true"
            />
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          {project.highlights.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {project.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="rounded-md bg-muted px-2 py-1 text-xs font-medium text-foreground/85"
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
        action={
          <div
            role="group"
            aria-label="Filter projects by type"
            className="flex flex-wrap gap-2"
          >
            {types.map((type) => (
              <button
                key={type}
                type="button"
                aria-pressed={activeType === type}
                onClick={() => setActiveType(type)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-300",
                  activeType === type
                    ? "border-primary/30 bg-primary/10 text-brand"
                    : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        }
      />

      <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </AnimatePresence>
      </motion.ul>

      <SectionReveal delay={0.1} className="mt-12 flex justify-center">
        <Button variant="outline" size="lg" asChild>
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
