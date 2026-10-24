import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, GraduationCap, Award } from "lucide-react";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import SectionReveal from "@/components/SectionReveal";
import Period from "@/components/Period";
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
        className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted"
        role="meter"
        aria-valuenow={skill.level}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={skill.name}
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand to-brand/55"
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
    <Section id="skills" tone="raised" divider>
      <SectionHeading
        eyebrow="03 — Skills"
        title="The stack I reach for"
        description="A practical toolkit built by shipping real products — daily, in React and TypeScript, with the API and state layers that keep them running."
      />

      {/* ---- Proficiency ---- */}
      <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
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

      {/* ---- Experience & Education ---- */}
      <div className="mt-6 grid gap-6 lg:grid-cols-12">
        <SectionReveal className="lg:col-span-7">
          <div className="panel h-full p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-brand">
                <Briefcase className="h-4 w-4" aria-hidden="true" />
              </span>
              <h3 className="font-display text-xl font-semibold text-foreground">
                Experience
              </h3>
            </div>

            <ol className="mt-8 space-y-0">
              {skills.experience.map((exp, index) => (
                <li key={exp.title} className="relative flex gap-5 pb-8 last:pb-0">
                  {index < skills.experience.length - 1 && (
                    <span
                      className="absolute left-[7px] top-5 h-full w-px bg-border"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className="relative mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-brand bg-background"
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-[0.12em] text-brand">
                      <Period period={exp.period} />
                    </p>
                    <h4 className="mt-1.5 font-display text-lg font-semibold leading-snug text-foreground">
                      {exp.title}
                    </h4>
                    <p className="mt-0.5 text-sm text-muted-foreground">{exp.company}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {exp.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </SectionReveal>

        <SectionReveal from="left" delay={0.1} className="lg:col-span-5">
          <div className="panel h-full p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-brand">
                <GraduationCap className="h-4 w-4" aria-hidden="true" />
              </span>
              <h3 className="font-display text-xl font-semibold text-foreground">
                Education
              </h3>
            </div>

            <ul className="mt-8 space-y-4">
              {skills.education.map((edu) => (
                <li
                  key={edu.degree}
                  className="rounded-xl border border-border bg-surface-2 p-5 transition-colors duration-500 hover:border-primary/30"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                      <Period period={edu.period} />
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs font-medium text-brand">
                      <Award className="h-3 w-3" aria-hidden="true" />
                      {edu.grade}
                    </span>
                  </div>
                  <h4 className="mt-3 text-[15px] font-semibold leading-snug text-foreground">
                    {edu.degree}
                  </h4>
                  <p className="mt-1 text-sm text-muted-foreground">{edu.institution}</p>
                </li>
              ))}
            </ul>
          </div>
        </SectionReveal>
      </div>
    </Section>
  );
};

export default Skills;
