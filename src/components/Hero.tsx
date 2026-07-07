import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import { usePortfolio } from "@/contexts/PortfolioContext";

const NOIR = "#0A0F0D";
const CARD = "#111827";
const EMERALD = "#10B981";
const MINT = "#D1FAE5";

const cardVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: 0.1 + i * 0.08, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

const Hero = () => {
  const { data } = usePortfolio();
  const { hero } = data;

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const [firstName, ...rest] = hero.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section
      className="min-h-screen w-full flex items-center justify-center font-sans selection:bg-[#10B981] selection:text-[#0A0F0D] px-4 sm:px-8 md:px-12 lg:px-16 pt-24 pb-12"
      style={{ backgroundColor: NOIR }}
    >
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-auto">
        {/* Main Headline Card */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="show"
          variants={cardVariants}
          className="md:col-span-8 md:row-span-2 rounded-[2.5rem] p-8 sm:p-10 md:p-12 flex flex-col justify-end relative overflow-hidden border transition-colors duration-500 min-h-[340px] md:min-h-[420px] group"
          style={{ backgroundColor: CARD, borderColor: "rgba(6, 78, 59, 0.35)" }}
        >
          <div
            className="absolute -top-24 -right-24 w-64 h-64 rounded-full opacity-10 group-hover:opacity-25 transition-opacity"
            style={{ backgroundColor: EMERALD, filter: "blur(100px)" }}
          />
          <div
            className="mb-6 inline-flex items-center px-4 py-2 rounded-full border text-xs font-semibold tracking-widest uppercase w-fit"
            style={{ backgroundColor: NOIR, borderColor: "rgba(16, 185, 129, 0.25)", color: MINT }}
          >
            <span
              className="w-2 h-2 rounded-full mr-2 animate-pulse"
              style={{ backgroundColor: EMERALD }}
            />
            {hero.tagline}
          </div>
          <h1
            className="font-serif text-6xl sm:text-7xl md:text-8xl italic leading-[0.9] tracking-tighter"
            style={{ color: MINT }}
          >
            {firstName}
            {lastName && (
              <>
                <br />
                <span className="not-italic" style={{ color: EMERALD }}>
                  {lastName}
                </span>
              </>
            )}
          </h1>
        </motion.div>

        {/* Role Card */}
        <motion.div
          custom={1}
          initial="hidden"
          animate="show"
          variants={cardVariants}
          className="md:col-span-4 rounded-[2.5rem] p-8 flex flex-col justify-between border min-h-[200px]"
          style={{ backgroundColor: CARD, borderColor: "rgba(6, 78, 59, 0.35)" }}
        >
          <div className="text-sm font-medium tracking-wide" style={{ color: EMERALD }}>
            Current Role
          </div>
          <div className="mt-4">
            <p className="text-2xl font-serif leading-tight" style={{ color: "#fff" }}>
              Software Developer <br />
              <span style={{ color: "rgba(209, 250, 229, 0.6)" }}>at {hero.company}</span>
            </p>
          </div>
        </motion.div>

        {/* Social Links Card */}
        <motion.div
          custom={2}
          initial="hidden"
          animate="show"
          variants={cardVariants}
          className="md:col-span-4 rounded-[2.5rem] p-8 flex items-center justify-around transition-colors duration-500 hover:bg-[#D1FAE5] min-h-[130px]"
          style={{ backgroundColor: EMERALD }}
        >
          <a
            href={hero.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-transform hover:scale-110"
            style={{ color: NOIR }}
          >
            <Github className="w-7 h-7" />
          </a>
          <a
            href={hero.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-transform hover:scale-110"
            style={{ color: NOIR }}
          >
            <Linkedin className="w-7 h-7" />
          </a>
          <a
            href={`mailto:${hero.email}`}
            aria-label="Email"
            className="transition-transform hover:scale-110"
            style={{ color: NOIR }}
          >
            <Mail className="w-7 h-7" />
          </a>
        </motion.div>

        {/* Description Card */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="show"
          variants={cardVariants}
          className="md:col-span-5 rounded-[2.5rem] p-8 border"
          style={{ backgroundColor: CARD, borderColor: "rgba(6, 78, 59, 0.35)" }}
        >
          <p
            className="text-lg leading-relaxed font-light"
            style={{ color: "rgba(209, 250, 229, 0.8)" }}
          >
            {hero.description}
          </p>
        </motion.div>

        {/* Action Links Card */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="show"
          variants={cardVariants}
          className="md:col-span-7 rounded-[2.5rem] p-4 flex flex-col sm:flex-row gap-3 border items-stretch"
          style={{ backgroundColor: CARD, borderColor: "rgba(6, 78, 59, 0.35)" }}
        >
          <button
            onClick={scrollToProjects}
            className="flex-1 font-bold py-6 px-4 rounded-[1.75rem] transition-all transform hover:-translate-y-1 active:scale-95"
            style={{ backgroundColor: EMERALD, color: NOIR }}
          >
            View My Work
          </button>
          <button
            onClick={scrollToContact}
            className="flex-1 border font-semibold py-6 px-4 rounded-[1.75rem] transition-all hover:bg-[rgba(16,185,129,0.1)]"
            style={{ borderColor: "rgba(16, 185, 129, 0.3)", color: MINT }}
          >
            Get in Touch
          </button>
          <a
            href="/DeepakKumar_Resume.pdf"
            download="DeepakKumar_Resume.pdf"
            aria-label="Download resume"
            className="sm:w-20 rounded-[1.75rem] flex items-center justify-center gap-2 transition-all border py-5 hover:bg-[rgba(6,78,59,0.35)]"
            style={{ backgroundColor: NOIR, borderColor: "rgba(6, 78, 59, 0.6)", color: EMERALD }}
          >
            <span className="text-xs font-bold uppercase tracking-tighter sm:hidden">Resume</span>
            <Download className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
