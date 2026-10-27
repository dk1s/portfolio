import { ArrowRight, Brain, Code2, Lightbulb, Target, Check, type LucideIcon } from "lucide-react";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import SectionReveal from "@/components/SectionReveal";
import {
  DashedRing,
  OutlineCircle,
  PlayTriangles,
  SolidTriangle,
} from "@/components/Decor";
import profileImage from "@/assets/deepak-profile.jpg";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { cn } from "@/lib/utils";

const RESUME_HREF = "/DeepakKumar_Resume.pdf";

const valueIcons: Record<string, LucideIcon> = {
  "Quick Learner": Brain,
  "Clean Code": Code2,
  "Problem Solver": Lightbulb,
  "Goal-Oriented": Target,
};

/** Spec info card: 12px radius, icon in the left gutter, bold title + 2 lines. */
const InfoCard = ({
  label,
  value,
  tint,
}: {
  label: string;
  value: string;
  tint: "peach" | "lavender";
}) => (
  <div
    className={cn(
      "flex gap-5 rounded-lg p-6",
      tint === "peach" ? "bg-accent-tint" : "bg-secondary"
    )}
  >
    <span
      className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-brand/30 text-brand"
      aria-hidden="true"
    >
      <ArrowRight className="h-4 w-4" />
    </span>
    <div className="min-w-0">
      <p className="text-lg font-semibold leading-snug text-foreground">{label}</p>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{value}</p>
    </div>
  </div>
);

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
    <Section id="about" tone="raised" className="topo-lines-soft overflow-hidden">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        {/* ---- Portrait in a yellow circle, with hand-drawn accents ---- */}
        <SectionReveal from="left" className="lg:col-span-5">
          <div className="relative mx-auto aspect-square w-[min(100%,24rem)]">
            {/* Offset indigo arcs around the disc */}
            <div
              className="absolute -inset-4 rounded-full border-[5px] border-brand border-r-transparent border-t-transparent"
              aria-hidden="true"
            />
            <DashedRing className="absolute -inset-9 text-brand/70" />

            {/* Yellow disc + circular photo */}
            <div className="absolute inset-0 rounded-full bg-accent" aria-hidden="true" />
            <img
              src={profileImage}
              alt={`${hero.name}, ${hero.role}`}
              width={1000}
              height={729}
              className="absolute inset-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)] rounded-full object-cover"
              loading="lazy"
            />

            {/* Scattered decorations */}
            <OutlineCircle className="absolute -left-8 -top-4 hidden w-10 text-brand sm:block" />
            <OutlineCircle className="absolute -right-6 bottom-16 hidden w-7 text-accent sm:block" />
            <SolidTriangle className="absolute -top-8 right-16 hidden w-5 rotate-[18deg] text-accent sm:block" />
            <SolidTriangle className="absolute bottom-4 -right-10 hidden w-4 -rotate-12 text-accent sm:block" />
            <PlayTriangles className="absolute -bottom-10 left-8 hidden w-20 text-accent sm:block" />
          </div>
        </SectionReveal>

        {/* ---- Copy, info cards and the CV button ---- */}
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="01 — About"
            title="Frontend developer focused on shipping"
            description="I care about the parts of engineering that decide whether a product actually works: clean architecture, predictable state, and an interface that holds up on any screen."
            className="mb-8 sm:mb-10"
          />

          <div className="space-y-5">
            {about.bio.map((paragraph, index) => (
              <SectionReveal key={index} delay={index * 0.06}>
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {paragraph}
                </p>
              </SectionReveal>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {facts.map((fact, index) => (
              <SectionReveal key={fact.label} delay={index * 0.05}>
                <InfoCard
                  label={fact.label}
                  value={fact.value}
                  tint={index % 2 === 0 ? "peach" : "lavender"}
                />
              </SectionReveal>
            ))}
          </div>

          <SectionReveal delay={0.15} className="mt-8">
            <a
              href={RESUME_HREF}
              download="DeepakKumar_Resume.pdf"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-9 py-3.5 text-base font-medium text-accent-foreground shadow-accent-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-dark"
            >
              Download CV
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </SectionReveal>
        </div>
      </div>

      {/* ---- What I focus on ---- */}
      <div className="mt-16 sm:mt-20">
        <SectionReveal>
          <h3 className="eyebrow">What I focus on</h3>
        </SectionReveal>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {about.focus.map((item, index) => (
            <SectionReveal key={item} delay={index * 0.05}>
              <li className="flex items-start gap-2.5 rounded-lg bg-card p-4 text-sm text-foreground sm:text-base">
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-brand"
                  strokeWidth={2.5}
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            </SectionReveal>
          ))}
        </ul>
      </div>

      {/* ---- How I work ---- */}
      <div className="mt-14 sm:mt-20">
        <SectionReveal>
          <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            How I work
          </h3>
        </SectionReveal>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => {
            const Icon = valueIcons[value.title] ?? Brain;
            return (
              <SectionReveal key={value.title} delay={index * 0.07}>
                <article className="panel panel-hover group h-full p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-brand transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
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
