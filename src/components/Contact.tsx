import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle2, Mail, MapPin, Send, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Section from "@/components/Section";
import SectionHeading from "@/components/SectionHeading";
import SectionReveal from "@/components/SectionReveal";
import SocialLinks, { type SocialLink } from "@/components/SocialLinks";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import { useToast } from "@/hooks/use-toast";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { sendContactMessage, isFormConfigured, type ContactPayload } from "@/lib/contact";
import { z } from "zod";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email is too long"),
  subject: z.string().trim().min(1, "Subject is required").max(200, "Subject is too long"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message is too long"),
});

type Status = "idle" | "submitting" | "success" | "error";

const EMPTY_FORM = { name: "", email: "", subject: "", message: "" };

const Contact = () => {
  const { data } = usePortfolio();
  const { contact, hero } = data;
  const { toast } = useToast();

  const [status, setStatus] = useState<Status>("idle");
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");

  const socialLinks: SocialLink[] = [
    { label: `Email · ${contact.email}`, href: `mailto:${contact.email}`, icon: Mail },
    { label: "GitHub", href: `https://${contact.github}`, icon: Github },
    { label: "LinkedIn", href: hero.linkedinUrl, icon: Linkedin },
  ];

  const details = [
    { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: MapPin, label: "Location", value: contact.location, href: null },
  ];

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrors({});
    setSubmitError("");

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((error) => {
        const field = error.path[0];
        if (field) fieldErrors[field as string] = error.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");

    const payload: ContactPayload = {
      name: result.data.name,
      email: result.data.email,
      subject: result.data.subject,
      message: result.data.message,
    };
    const response = await sendContactMessage(payload, contact.email);

    if ("error" in response) {
      setStatus("error");
      setSubmitError(response.error);
      toast({
        title: "Message not sent",
        description: "Please email me directly and I'll get back to you.",
      });
      return;
    }

    setStatus("success");
    setFormData(EMPTY_FORM);
    toast({
      title: "Message sent",
      description:
        response.provider === "mailto"
          ? "Thanks — finish sending in your email app."
          : "Thanks for reaching out. I'll reply within a day or two.",
    });
  };

  return (
    <Section id="contact" tone="raised" divider>
      <SectionHeading
        eyebrow="05 — Contact"
        title="Let's build something"
        description="Hiring, freelance work, or just a question about an approach — send a message and it reaches my inbox directly."
      />

      <div className="grid gap-6 lg:grid-cols-12">
        {/* ---- Details ---- */}
        <SectionReveal className="lg:col-span-5">
          <div className="panel flex h-full flex-col p-6 sm:p-8">
            <AvailabilityBadge label={hero.availability} size="sm" className="w-fit" />
            <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight text-foreground">
              Currently open to work
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
              I'm based in {contact.location} and open to software developer roles as well
              as freelance projects. I reply to every message, usually within a day or two.
            </p>

            <ul className="mt-8 space-y-4">
              {details.map((detail) => (
                <li key={detail.label} className="flex items-center gap-3.5">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-2 text-brand">
                    <detail.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                      {detail.label}
                    </p>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        className="block truncate text-sm font-medium text-foreground transition-colors hover:text-brand"
                      >
                        {detail.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-foreground">{detail.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-border pt-6">
              <p className="eyebrow mb-4">Elsewhere</p>
              <SocialLinks links={socialLinks.slice(1)} variant="labels" />
            </div>
          </div>
        </SectionReveal>

        {/* ---- Form ---- */}
        <SectionReveal from="left" delay={0.1} className="lg:col-span-7">
          <div className="panel h-full p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[26rem] flex-col items-center justify-center text-center"
                >
                  <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-primary/25 bg-primary/10 text-brand">
                    <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold text-foreground">
                    Message sent
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground sm:text-base">
                    Thanks for reaching out. I'll get back to you within a day or two.
                  </p>
                  <Button variant="outline" className="mt-7" onClick={() => setStatus("idle")}>
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-foreground">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        autoComplete="name"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "name-error" : undefined}
                        className={cn(
                          "h-12 rounded-lg bg-surface-2",
                          errors.name && "border-destructive focus-visible:ring-destructive"
                        )}
                      />
                      {errors.name && (
                        <p id="name-error" className="text-xs text-destructive">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-foreground">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "email-error" : undefined}
                        className={cn(
                          "h-12 rounded-lg bg-surface-2",
                          errors.email && "border-destructive focus-visible:ring-destructive"
                        )}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-xs text-destructive">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-foreground">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Role, project or question"
                      value={formData.subject}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.subject)}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                      className={cn(
                        "h-12 rounded-lg bg-surface-2",
                        errors.subject && "border-destructive focus-visible:ring-destructive"
                      )}
                    />
                    {errors.subject && (
                      <p id="subject-error" className="text-xs text-destructive">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-foreground">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Tell me about the role or project…"
                      value={formData.message}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "message-error" : undefined}
                      className={cn(
                        "resize-y rounded-lg bg-surface-2",
                        errors.message && "border-destructive focus-visible:ring-destructive"
                      )}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-xs text-destructive">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  {status === "error" && (
                    <div
                      role="alert"
                      className="flex items-start gap-3 rounded-lg border border-destructive/40 bg-destructive/10 p-4"
                    >
                      <AlertCircle
                        className="mt-0.5 h-4 w-4 shrink-0 text-destructive"
                        aria-hidden="true"
                      />
                      <p className="text-sm text-foreground">
                        {submitError || "The message could not be sent."} You can also email me
                        directly at{" "}
                        <a
                          href={`mailto:${contact.email}`}
                          className="font-medium text-brand underline underline-offset-4"
                        >
                          {contact.email}
                        </a>
                        .
                      </p>
                    </div>
                  )}

                  <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                    <Button
                      type="submit"
                      variant="brand"
                      size="lg"
                      disabled={status === "submitting"}
                      className="w-full sm:w-auto"
                    >
                      {status === "submitting" ? (
                        <>
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          {isFormConfigured ? "Send message" : "Send via email"}
                        </>
                      )}
                    </Button>
                    <p className="text-xs leading-relaxed text-muted-foreground sm:text-right">
                      {isFormConfigured
                        ? "Goes straight to my inbox."
                        : "Opens your email app, addressed to me."}
                    </p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </SectionReveal>
      </div>
    </Section>
  );
};

export default Contact;
