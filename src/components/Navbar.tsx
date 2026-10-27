import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import Wordmark from "@/components/Wordmark";
import AvailabilityBadge from "@/components/AvailabilityBadge";
import { navItems, scrollToSection, sectionIds } from "@/lib/nav";
import { useActiveSection, useScrollProgress } from "@/hooks/useActiveSection";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { cn } from "@/lib/utils";

const RESUME_HREF = "/DeepakKumar_Resume.pdf";

const Navbar = () => {
  const { data } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setIsMobileMenuOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleNavigate = (href: string) => {
    setIsMobileMenuOpen(false);
    // Wait for the sheet to unmount so the scroll lands on the right position
    window.setTimeout(() => scrollToSection(href), isMobileMenuOpen ? 180 : 0);
  };

  return (
    <>
      {/* Reading-progress bar */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent"
        style={{ scaleX: scrollProgress }}
        aria-hidden="true"
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 bg-primary transition-all duration-500",
          isScrolled ? "shadow-[0_10px_30px_rgba(45,47,58,0.12)]" : "shadow-none"
        )}
      >
        <div className="container mx-auto">
          <div
            className={cn(
              "flex items-center justify-between transition-all duration-500",
              isScrolled ? "h-16" : "h-20"
            )}
          >
            <Wordmark asLink onDark />

            {/* Desktop navigation */}
            <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.slice(1);
                return (
                  <button
                    key={item.href}
                    onClick={() => handleNavigate(item.href)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-[17px] font-medium transition-colors duration-300",
                      isActive
                        ? "text-accent"
                        : "text-white/85 hover:text-white"
                    )}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Desktop actions */}
            <div className="hidden items-center gap-2.5 lg:flex">
              <AvailabilityBadge
                label={data.hero.availability}
                size="sm"
                tone="on-dark"
                className="mr-1"
              />
              <ThemeToggle className="text-white hover:bg-white/10 hover:text-white" />
              <Button
                variant="outline"
                size="sm"
                className="border-white/40 bg-transparent text-white backdrop-blur-sm hover:border-white/70 hover:bg-white/10 hover:text-white"
                onClick={() => handleNavigate("#contact")}
              >
                Hire me
              </Button>
              {/* The spec's pill CTA: the résumé download */}
              <Button variant="brand" size="sm" asChild>
                <a href={RESUME_HREF} download="DeepakKumar_Resume.pdf">
                  <Download className="h-3.5 w-3.5" />
                  Résumé
                </a>
              </Button>
            </div>

            {/* Mobile trigger */}
            <div className="flex items-center gap-1 lg:hidden">
              <ThemeToggle className="text-white hover:bg-white/10 hover:text-white" />
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 hover:text-white"
                onClick={() => setIsMobileMenuOpen((open) => !open)}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-primary lg:hidden"
          >
            <div className="container mx-auto flex h-full flex-col justify-between pb-10 pt-28">
              <nav className="flex flex-col" aria-label="Mobile">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.slice(1);
                  return (
                    <motion.button
                      key={item.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + index * 0.05, duration: 0.4 }}
                      onClick={() => handleNavigate(item.href)}
                      className={cn(
                        "flex items-center justify-between border-b border-white/15 py-5 text-left font-display text-2xl font-medium transition-colors",
                        isActive ? "text-accent" : "text-white hover:text-accent"
                      )}
                    >
                      {item.label}
                      <span className="text-xs font-sans tabular-nums text-white/60">
                        0{index + 1}
                      </span>
                    </motion.button>
                  );
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="space-y-4"
              >
                <AvailabilityBadge
                  label={data.hero.availability}
                  tone="on-dark"
                  className="w-fit"
                />
                <div className="flex flex-col gap-2.5">
                  <Button variant="brand" size="lg" onClick={() => handleNavigate("#contact")}>
                    Hire me
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/40 bg-transparent text-white hover:border-white/70 hover:bg-white/10 hover:text-white"
                    asChild
                  >
                    <a href={RESUME_HREF} download="DeepakKumar_Resume.pdf">
                      <Download className="h-4 w-4" />
                      Download résumé
                    </a>
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
