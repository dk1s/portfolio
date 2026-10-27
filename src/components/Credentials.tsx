import { Award, ArrowRight, Sparkles } from "lucide-react";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import SectionReveal from "@/components/SectionReveal";
import CountUp from "@/components/CountUp";
import { Button } from "@/components/ui/button";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import { SparkleOutline, SolidStar } from "@/components/Decor";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { scrollToSection } from "@/lib/nav";

const OPEN_TO = ["Full-time roles", "Frontend & React", "Freelance projects"];

const Credentials = () => {
  const { data } = usePortfolio();
  const { stats, certifications, hero } = data;

  return (
    <Section id="credentials" tone="default" className="overflow-hidden">
      {/* Decorations */}
      <SparkleOutline className="float-slow absolute right-6 top-16 hidden w-10 text-accent lg:block" />
      <SolidStar className="absolute left-10 top-1/3 hidden w-5 text-accent lg:block" />

      <SectionHeading
        eyebrow="04 — Credentials"
        title="Backed by training and shipped work"
        description="Rather than unattributed praise, here is the record: what I have built, and what I have studied to build it well."
        align="center"
        className="mb-12 sm:mb-16"
      />

      {/* ---- Stats ---- */}
      <SectionReveal>
        <dl className="grid grid-cols-2 gap-5 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-secondary px-6 py-10 text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <CountUp
                  value={stat.value}
                  className="block font-display text-4xl font-bold tracking-tight text-brand sm:text-5xl"
                />
                <span className="mt-3 block text-sm text-muted-foreground">{stat.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </SectionReveal>

      {/* ---- Certifications ---- */}
      <div className="mt-16 sm:mt-20">
        <SectionReveal>
          <h3 className="text-center font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Certifications &amp; training
          </h3>
        </SectionReveal>

        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => (
            <SectionReveal key={cert.name} delay={index * 0.05}>
              <li className="panel panel-hover group flex h-full items-start gap-4 p-6">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                  <Award className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold leading-snug text-foreground">
                    {cert.name}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{cert.issuer}</p>
                </div>
              </li>
            </SectionReveal>
          ))}
        </ul>
      </div>

      {/* ---- Availability CTA: the one highlighted indigo card ---- */}
      <SectionReveal delay={0.1} className="mt-16 sm:mt-20">
        <div className="topo-lines relative overflow-hidden rounded-2xl bg-primary p-8 text-white sm:p-12">
          <div
            className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-white/10"
            aria-hidden="true"
          />
          <div className="relative flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <AvailabilityBadge label={hero.availability} size="sm" tone="on-dark" />
              <h3 className="mt-5 font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                Currently open to new opportunities
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {OPEN_TO.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs text-white/90"
                  >
                    <Sparkles className="h-3 w-3 text-accent" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <Button variant="brand" size="xl" onClick={() => scrollToSection("#contact")}>
              Start a conversation
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SectionReveal>
    </Section>
  );
};

export default Credentials;
