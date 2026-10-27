import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Period from "@/components/Period";

describe("Period", () => {
  it("expands an abbreviated month into a readable name", () => {
    render(<Period period="03/2025 - Present" />);
    expect(screen.getByText(/March 2025/)).toBeInTheDocument();
  });

  it("keeps an open-ended range open", () => {
    render(<Period period="03/2025 - Present" />);
    expect(screen.getByText("March 2025 – Present")).toBeInTheDocument();
  });

  it("marks the range up as a machine-readable date range", () => {
    const { container } = render(<Period period="12/2023 - 01/2024" />);
    const time = container.querySelector("time");
    expect(time).toHaveAttribute("dateTime", "2023-12/2024-01");
  });

  it("omits dateTime for an open-ended range", () => {
    const { container } = render(<Period period="03/2025 - Present" />);
    expect(container.querySelector("time")?.getAttribute("datetime")).toBe(
      "2025-03"
    );
  });

  it("passes through unparseable text untouched", () => {
    render(<Period period="Summer 2024" />);
    expect(screen.getByText("Summer 2024")).toBeInTheDocument();
  });
});