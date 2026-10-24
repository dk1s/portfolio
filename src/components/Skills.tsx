import { Fragment } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, GraduationCap, Award } from "lucide-react";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import SectionReveal from "@/components/SectionReveal";
import Period from "@/components/Period";
import { CurveArrowDown, CurveArrowRight, DashedRing } from "@/components/Decor";
import { usePortfolio } from "@/contexts/PortfolioContext";
import type { Skill } from "@/contexts/PortfolioContext";

const SkillBar = ({ skill, index }: { skill: Skill; index: number }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <li>
      <div className="flex items-baseline justify-between gap-4 text-sm">
        <span className="font-medium text-foreground">{skill.name}</span>
        <span className="tabular-nums text-xs text-muted-foreground">{skill.level}%</span>
      </div>
      <div
        className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted"
        role="meter"
        aria-valuenow={skill.level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={skill.name}
      >
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: prefersReducedMotion ? `${skill.level}%` : 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.9, delay: 0.1 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </li>
  );
};

const Skills = () => {
  const { data } = usePortfolio();
  const { skills } = data;

  return (
    <Section id="skills" tone="default">
      <SectionHeading
        eyebrow="03 — Skills"
        title="The stack I reach for"
        description="A practical toolkit built by shipping real products — daily, in React and TypeScript, with the API and state layers that keep them running."
        align="center"
        className="mb-12 sm:mb-16"
      />

      {/* ---- Proficiency ---- */}
      <div className="grid gap-6 lg:grid-cols-2">
        {(
          [
            { title: "Frontend & Web", items: skills.frontend },
            { title: "Backend & Tools", items: skills.backend },
          ] as const
        ).map((group, groupIndex) => (
          <SectionReveal key={group.title} delay={groupIndex * 0.08}>
            <div className="panel h-full p-6 sm:p-8">
              <h3 className="font-display text-xl font-semibold text-foreground">
                {group.title}
              </h3>
              <ul className="mt-7 space-y-5">
                {group.items.map((skill, index) => (
                  <SkillBar key={skill.name} skill={skill} index={index} />
                ))}
              </ul>
            </div>
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
