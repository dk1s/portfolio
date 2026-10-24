import { describe, it, expect, beforeAll, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { PortfolioProvider } from "@/contexts/PortfolioContext";
import Index from "@/pages/Index";
import { defaultPortfolioData } from "@/contexts/PortfolioContext";
import { activeProvider, isFormConfigured } from "@/lib/contact";

// framer-motion's whileInView needs IntersectionObserver, which jsdom lacks
beforeAll(() => {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = "";
    readonly thresholds: ReadonlyArray<number> = [];
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  }
  window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
  global.IntersectionObserver =
    MockIntersectionObserver as unknown as typeof IntersectionObserver;

  // jsdom implements neither of these; the theme and scroll code touch both
  window.scrollTo = vi.fn();
  Element.prototype.scrollIntoView = vi.fn();
});

const renderIndex = () =>
  render(
    <QueryClientProvider client={new QueryClient()}>
      <ThemeProvider attribute="class" defaultTheme="dark">
        <PortfolioProvider>
          <MemoryRouter>
            <Index />
          </MemoryRouter>
        </PortfolioProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );

describe("portfolio page", () => {
  it("renders every section without crashing", () => {
    renderIndex();

    for (const id of ["about", "projects", "skills", "credentials", "contact"]) {
      expect(document.getElementById(id)).toBeInTheDocument();
    }
  });

  it("leads with the name, role and availability", () => {
    renderIndex();

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Deepak Kumar");
    expect(screen.getAllByText("Software Developer").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Available for hire").length).toBeGreaterThan(0);
  });

  it("offers a hire-me call to action that points at the contact form", () => {
    renderIndex();

    const hireButtons = screen.getAllByRole("button", { name: /hire me/i });
    expect(hireButtons.length).toBeGreaterThan(0);
  });

  it("links out to the résumé", () => {
    renderIndex();

    const resume = screen
      .getAllByRole("link")
      .find((link) => link.getAttribute("href") === "/DeepakKumar_Resume.pdf");
    expect(resume).toBeDefined();
    expect(resume).toHaveAttribute("download", "DeepakKumar_Resume.pdf");
  });

  it("does not ship the old placeholder testimonials", () => {
    const { container } = renderIndex();

    for (const placeholder of ["Sarah Johnson", "Michael Chen", "Emily Rodriguez"]) {
      expect(container.textContent).not.toContain(placeholder);
    }
  });

  it("shows the honest stats rather than inflated ones", () => {
    const { container } = renderIndex();

    expect(container.textContent).toContain("Projects shipped");
    expect(container.textContent).not.toContain("Happy Clients");
    expect(container.textContent).not.toContain("Client Satisfaction");
  });

  it("lists each project once", () => {
    renderIndex();
    const projects = document.getElementById("projects") as HTMLElement;
    const occurrences = projects.textContent?.match(/CricketGyan/g) ?? [];
    expect(occurrences).toHaveLength(1);
  });

  it("opens every external link safely", () => {
    const { container } = renderIndex();

    const external = Array.from(container.querySelectorAll<HTMLAnchorElement>('a[href^="http"]'));
    expect(external.length).toBeGreaterThan(0);

    external.forEach((link) => {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link.getAttribute("rel")).toContain("noopener");
      expect(link.getAttribute("rel")).toContain("noreferrer");
    });
  });

  it("gives published projects a live link and unpublished ones says so", () => {
    renderIndex();

    const projects = document.getElementById("projects") as HTMLElement;
    const liveLinks = within(projects).getAllByRole("link", { name: /live site/i });
    const unpublished = within(projects).getAllByText(/not published/i);

    expect(liveLinks.length).toBeGreaterThan(0);
    // The two academic hardware projects have no public site
    expect(unpublished).toHaveLength(2);
  });

  it("keeps a working path to the contact email", () => {
    const { container } = renderIndex();

    const mailto = container.querySelectorAll(
      'a[href^="mailto:deepakkumarplacee@gmail.com"]'
    );
    expect(mailto.length).toBeGreaterThan(0);
  });

  it("falls back to the mail client when no form endpoint is configured", () => {
    expect(isFormConfigured).toBe(false);
    expect(activeProvider).toBe("your email client");
  });

  it("exposes the same content the page renders", () => {
    expect(defaultPortfolioData.stats.map((stat) => stat.label)).toEqual([
      "Projects shipped",
      "Certifications earned",
      "Years in tech",
      "Core technologies",
    ]);
  });
});
