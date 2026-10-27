export const navItems = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Credentials", href: "#credentials" },
  { label: "Contact", href: "#contact" },
] as const;

export const sectionIds = navItems.map((item) => item.href.slice(1));

export const scrollToSection = (href: string) => {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
};
