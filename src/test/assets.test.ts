import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const read = (relative: string) =>
  readFileSync(resolve(__dirname, "..", "..", relative), "utf8");

describe("asset and metadata references", () => {
  it("points og:image at the generated share image", () => {
    const html = read("index.html");
    expect(html).toContain('property="og:image"');
    expect(html).toContain("og-image.png");
  });

  it("declares og:image dimensions so platforms reserve space correctly", () => {
    const html = read("index.html");
    expect(html).toContain('property="og:image:width"');
    expect(html).toContain('property="og:image:height"');
    expect(html).toContain('property="og:image:type"');
  });

  it("references the favicon set and the web manifest", () => {
    const html = read("index.html");
    for (const asset of [
      "/favicon-16.png",
      "/favicon-32.png",
      "/favicon.png",
      "/apple-touch-icon.png",
      "/site.webmanifest",
    ]) {
      expect(html).toContain(asset);
    }
  });

  it("declares a browser chrome colour for both the light and dark palettes", () => {
    const html = read("index.html");
    expect(html).toContain('name="theme-color"');
    // The indigo dark surface and the white canvas of the design system
    expect(html).toMatch(/name="theme-color"[^>]*#131420/i);
    expect(html).toMatch(/name="theme-color"[^>]*#ffffff/i);
  });

  it("declares a sitemap in robots.txt", () => {
    const robots = read("public/robots.txt");
    expect(robots).toMatch(/Sitemap:\s*https:\/\/dk1s\.github\.io\/Portfolio\/sitemap\.xml/);
  });
});