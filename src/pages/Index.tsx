import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Credentials from "@/components/Credentials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SecretAdminButton from "@/components/SecretAdminButton";

/**
 * Single-page portfolio. The previous version held a 2s full-screen loader
 * before revealing content — a delay that reads as a slow site. Content now
 * renders immediately and each section animates in on scroll instead.
 */
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <Navbar />

      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Credentials />
        <Contact />
      </main>

      <Footer />
      <SecretAdminButton />
    </div>
  );
};

export default Index;
