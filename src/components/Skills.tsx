import { Fragment } from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award } from "lucide-react";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import SectionReveal from "@/components/SectionReveal";
import Period from "@/components/Period";
import { CurveArrowDown, CurveArrowRight, DashedRing } from "@/components/Decor";
import { usePortfolio } from "@/contexts/PortfolioContext";

const Skills = () => {
  const { data } = usePortfolio();
  const { skills } = data;

  const skillCategories = [
    {
      title: "Programming Languages",
      items: ["JavaScript", "TypeScript", "SQL"],
    },
    {
      title: "Frontend Frameworks & Libraries",
      items: [
        "React.js",
        "Next.js",
        "Redux Toolkit",
        "Zustand",
        "RTK Query",
        "Tailwind CSS",
        "HTML5",
        "CSS3",
      ],
    },
    {
      title: "Real-time & API Technologies",
      items: ["WebSocket", "Agora SDK", "Socket.io", "REST API Integration"],
    },
    {
      title: "Development Tools & Platforms",
      items: ["Git", "GitHub", "Postman", "Salesforce Supersets", "n8n"],
    },
    {
      title: "Web & Content Management",
      items: ["WordPress", "SEO Management", "UI/UX Design"],
    },
    {
      title: "AI & Automation",
      items: [
        "AI Automation",
        "Workflow Automation",
        "OpenAI API",
        "Google Gemini API",
        "Prompt Engineering",
      ],
    },
    {
      title: "AI Development Tools",
      items: ["Claude Code", "Gemini CLI", "OpenAI Codex", "OpenCode"],
    },
    {
      title: "Backend & Database",
      items: ["Node.js", "Express.js", "REST APIs", "MongoDB", "JWT Authentication"],
    },
  ];

  return (
    <Section id="skills" tone="default">
      <SectionHeading
        eyebrow="03 — Skills"
        title="The stack I reach for"
        description="A practical toolkit built by shipping real products — daily, in React, TypeScript, and modern AI tooling."
        align="center"
        className="mb-12 sm:mb-16"
      />

      {/* ---- Skills by Category ---- */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {skillCategories.map((category, categoryIndex) => (
          <SectionReveal key={category.title} delay={categoryIndex * 0.04}>
            <motion.div
              className="panel panel-hover group relative h-full overflow-hidden p-6"
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
              <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-primary/5 transition-all duration-500 group-hover:scale-150" />
              <div className="relative">
                <div className="mb-4 flex items-center gap-3">
                  <span className="h-px w-6 bg-primary" aria-hidden="true" />
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {category.title}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skillName) => (
                    <span
                      key={skillName}
                      className="inline-flex items-center rounded-full border border-border/80 bg-background/70 px-2.5 py-1 text-xs font-medium text-foreground shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-accent-tint hover:text-foreground"
                    >
                      {skillName}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </SectionReveal>
        ))}
      </div>

      {/* ---- Experience, as working-process steps ---- */}
      <div className="mt-16 sm:mt-20">
        <SectionReveal>
          <h3 className="text-center font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Experience
          </h3>
        </SectionReveal>

        <div className="mt-10 flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-center lg:gap-3">
          {skills.experience.map((exp, index) => (
            <Fragment key={exp.title}>
              <SectionReveal
                delay={index * 0.1}
                className="flex w-full max-w-sm flex-col items-center text-center lg:w-auto lg:max-w-[22rem] lg:flex-1"
              >
                {/* Indigo icon circle inside a dashed yellow ring */}
                <div className="relative h-[150px] w-[150px] shrink-0">
                  <DashedRing className="absolute inset-0 text-accent" />
                  <span className="absolute inset-[15px] inline-flex items-center justify-center rounded-full bg-primary text-white">
                    <Briefcase className="h-8 w-8" aria-hidden="true" />
                  </span>
                </div>

                <p className="mt-6 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                  <Period period={exp.period} />
                </p>
                <h4 className="mt-2 font-display text-2xl font-semibold leading-snug text-foreground">
                  {exp.title}
                </h4>
                <p className="mt-1 text-sm font-semibold text-brand">{exp.company}</p>
                <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-muted-foreground lg:max-w-none">
                  {exp.description}
                </p>
              </SectionReveal>

              {/* Hand-drawn arrows between steps: right on desktop, down on mobile */}
              {index < skills.experience.length - 1 && (
                <>
                  <CurveArrowRight
                    className="hidden w-24 shrink-0 pt-16 text-accent lg:block"
                  />
                  <CurveArrowDown className="-my-4 w-8 text-accent lg:hidden" />
                </>
              )}
            </Fragment>
          ))}
        </div>
      </div>

      {/* ---- Education ---- */}
      <div className="mt-16 sm:mt-20">
        <SectionReveal>
          <div className="flex items-center justify-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
              <GraduationCap className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Education
            </h3>
          </div>
        </SectionReveal>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.education.map((edu, index) => (
            <SectionReveal key={edu.degree} delay={index * 0.06}>
              <li className="panel panel-hover h-full p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                    <Period period={edu.period} />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-tint px-2.5 py-1 text-xs font-medium text-foreground">
                    <Award className="h-3 w-3 text-brand" aria-hidden="true" />
                    {edu.grade}
                  </span>
                </div>
                <h4 className="mt-3 text-[15px] font-semibold leading-snug text-foreground">
                  {edu.degree}
                </h4>
                <p className="mt-1 text-sm text-muted-foreground">{edu.institution}</p>
              </li>
            </SectionReveal>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default Skills;
