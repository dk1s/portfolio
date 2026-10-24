import { Brain, Code2, Lightbulb, Target, Check, type LucideIcon } from "lucide-react";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import SectionReveal from "@/components/SectionReveal";
import { usePortfolio } from "@/contexts/PortfolioContext";

const valueIcons: Record<string, LucideIcon> = {
  "Quick Learner": Brain,
  "Clean Code": Code2,
  "Problem Solver": Lightbulb,
  "Goal-Oriented": Target,
};

const About = () => {
  const { data } = usePortfolio();
  const { about, values, hero, skills, contact } = data;

  const primaryEducation = skills.education[0];
  const primaryExperience = skills.experience[0];

  const facts = [
    { label: "Role", value: `${hero.role} at ${hero.company}` },
    { label: "Experience", value: primaryExperience?.period ?? "" },
    { label: "Location", value: contact.location },
    { label: "Education", value: primaryEducation?.degree ?? "" },
    { label: "Languages", value: about.languages.join(" · ") },
  ];

  return (
    <Section id="about" tone="raised" divider>
      <SectionHeading
        eyebrow="01 — About"
        title="Frontend developer focused on shipping"
        description="I care about the parts of engineering that decide whether a product actually works: clean architecture, predictable state, and an interface that holds up on any screen."
      />

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        {/* ---- Narrative ---- */}
        <div className="lg:col-span-7">
          <div className="space-y-5">
            {about.bio.map((paragraph, index) => (
              <SectionReveal key={index} delay={index * 0.06}>
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {paragraph}
                </p>
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.2} className="mt-10">
            <h3 className="eyebrow mb-5">What I focus on</h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {about.focus.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm text-foreground sm:text-base"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                    strokeWidth={2.5}
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </SectionReveal>
        </div>

        {/* ---- At a glance ---- */}
        <SectionReveal from="left" delay={0.15} className="lg:col-span-5">
          <div className="panel h-full p-6 sm:p-8">
            <h3 className="eyebrow mb-6">At a glance</h3>
            <dl className="divide-y divide-border">
              {facts.map((fact) => (
                <div key={fact.label} className="py-4 first:pt-0 last:pb-0">
                  <dt className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 text-[15px] font-medium leading-snug text-foreground">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </SectionReveal>
      </div>

      {/* ---- Working style ---- */}
      <div className="mt-14 sm:mt-20">
        <SectionReveal>
          <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            How I work
          </h3>
        </SectionReveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => {
            const Icon = valueIcons[value.title] ?? Brain;
            return (
              <SectionReveal key={value.title} delay={index * 0.07}>
                <article className="panel panel-hover group h-full p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-brand transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h4 className="mt-5 font-display text-lg font-semibold text-foreground">
                    {value.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </article>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
};

export default About;
