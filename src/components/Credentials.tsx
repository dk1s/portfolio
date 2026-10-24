import { Award, ArrowRight, Sparkles } from "lucide-react";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import SectionReveal from "@/components/SectionReveal";
import CountUp from "@/components/CountUp";
import { Button } from "@/components/ui/button";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { scrollToSection } from "@/lib/nav";

const OPEN_TO = ["Full-time roles", "Frontend & React", "Freelance projects"];

const Credentials = () => {
  const { data } = usePortfolio();
  const { stats, certifications, hero } = data;

  return (
    <Section id="credentials" tone="default">
      <SectionHeading
        eyebrow="04 — Credentials"
        title="Backed by training and shipped work"
        description="Rather than unattributed praise, here is the record: what I have built, and what I have studied to build it well."
      />

      {/* ---- Stats ---- */}
      <SectionReveal>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card px-6 py-10 text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <CountUp
                  value={stat.value}
                  className="block font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl"
                />
                <span className="mt-3 block text-sm text-muted-foreground">{stat.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </SectionReveal>

      {/* ---- Certifications ---- */}
      <div className="mt-6">
        <SectionReveal>
          <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Certifications &amp; training
          </h3>
        </SectionReveal>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => (
            <SectionReveal key={cert.name} delay={index * 0.05}>
              <li className="panel panel-hover group flex h-full items-start gap-4 p-5">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-brand transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground">
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

      {/* ---- Availability CTA ---- */}
      <SectionReveal delay={0.1} className="mt-6">
        <div className="grain relative overflow-hidden rounded-2xl border border-primary/20 bg-card p-8 sm:p-10">
          <div
            className="pointer-events-none absolute -right-20 -top-24 -z-10 h-72 w-72 rounded-full bg-primary/12 blur-3xl"
            aria-hidden="true"
          />
          <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-xl">
              <AvailabilityBadge label={hero.availability} size="sm" />
              <h3 className="mt-5 font-display text-2xl font-semibold leading-tight tracking-tight text-foreground sm:text-3xl">
                Currently open to new opportunities
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {OPEN_TO.map((item) => (
                  <li
                    key={item}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-2 px-3 py-1.5 text-xs text-muted-foreground"
                  >
                    <Sparkles className="h-3 w-3 text-brand" aria-hidden="true" />
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
