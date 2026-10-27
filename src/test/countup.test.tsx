import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import CountUp from "@/components/CountUp";

describe("CountUp", () => {
  it("exposes the real value to assistive tech, not the animated digits", () => {
    render(<CountUp value="10" />);
    expect(screen.getByLabelText("10")).toBeInTheDocument();
  });

  it("keeps a trailing suffix such as '5+'", () => {
    render(<CountUp value="5+" />);
    expect(screen.getByLabelText("5+")).toBeInTheDocument();
  });

  it("renders non-numeric values verbatim", () => {
    render(<CountUp value="Open to work" />);
    expect(screen.getByText("Open to work")).toBeInTheDocument();
  });
});