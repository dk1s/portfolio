import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/pages/**/*.{ts,tsx}",
    "./src/contexts/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        "2xl": "1280px",
      },
    },
    extend: {
      // Fluid type scale.
      // Sizes interpolate continuously between a 375px and 1440px viewport so
      // headings never "jump" at a breakpoint. Small sizes stay fixed (fluid
      // small text hurts legibility); headings use unitless leading so the
      // ratio holds at both ends of the scale.
      fontSize: {
        xs: ["0.75rem", "1rem"],
        sm: ["0.875rem", "1.25rem"],
        base: ["1rem", "1.5rem"],
        lg: ["1.125rem", "1.7rem"],
        xl: ["clamp(1.25rem, 1.162rem + 0.376vw, 1.5rem)", "1.4"],
        "2xl": ["clamp(1.5rem, 1.368rem + 0.563vw, 1.875rem)", "1.3"],
        "3xl": ["clamp(1.875rem, 1.655rem + 0.939vw, 2.5rem)", "1.2"],
        "4xl": ["clamp(2.25rem, 1.898rem + 1.502vw, 3.25rem)", "1.1"],
        "5xl": ["clamp(2.75rem, 2.134rem + 2.629vw, 4.5rem)", "1.02"],
        "6xl": ["clamp(3.25rem, 2.282rem + 4.131vw, 6rem)", "1"],
        "7xl": ["clamp(3.5rem, 1.915rem + 6.761vw, 8rem)", "1"],
        "8xl": ["clamp(4rem, 1.887rem + 9.015vw, 10rem)", "1"],
        "9xl": ["clamp(4.5rem, 1.859rem + 11.268vw, 12rem)", "1"],
        // Wordmark-scale type, used for the hero name (40px mobile → 72px desktop)
        display: ["clamp(2.5rem, 1.875rem + 3.38vw, 4.5rem)", "1.15"],
      },
      fontFamily: {
        // Friendly geometric sans, used for headings, nav and buttons (DESIGN.md §3)
        display: ['"Poppins"', "system-ui", "sans-serif"],
        serif: ['"Poppins"', "system-ui", "sans-serif"],
        // UI + body — Poppins everywhere, per spec
        sans: ['"Poppins"', "system-ui", "-apple-system", "sans-serif"],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Brand ramp — indigo + yellow accent (DESIGN.md §2)
        brand: {
          DEFAULT: "hsl(var(--brand))",
          dark: "hsl(var(--brand-dark))",
          light: "hsl(var(--brand-light))",
          soft: "hsl(var(--brand-soft))",
          ink: "hsl(var(--brand-ink))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          dark: "hsl(var(--accent-dark))",
          tint: "hsl(var(--accent-tint))",
          foreground: "hsl(var(--accent-foreground))",
        },
        star: "hsl(var(--star))",
        surface: {
          DEFAULT: "hsl(var(--surface))",
          2: "hsl(var(--surface-2))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 0.25rem)",
        "2xl": "calc(var(--radius) + 0.75rem)",
        "3xl": "calc(var(--radius) + 1.25rem)",
      },
      boxShadow: {
        glow: "0 0 0 1px hsl(var(--brand) / 0.14), 0 24px 80px -32px hsl(var(--brand) / 0.55)",
        "glow-sm": "0 8px 30px -12px hsl(var(--brand) / 0.5)",
        // Yellow CTA lift (DESIGN.md §6)
        "accent-glow": "0 8px 20px rgba(244, 178, 70, 0.4)",
        card: "0 10px 30px rgba(45, 47, 58, 0.06)",
        "card-lift": "0 12px 40px rgba(45, 47, 58, 0.1)",
        chip: "0 8px 24px rgba(45, 47, 58, 0.12)",
      },
      maxWidth: {
        prose: "68ch",
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.9)", opacity: "0" },
          "100%": { transform: "scale(1.9)", opacity: "0" },
        },
        aurora: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) scale(1)" },
          "50%": { transform: "translate3d(3%, -4%, 0) scale(1.08)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 40s linear infinite",
        "pulse-ring": "pulse-ring 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        aurora: "aurora 18s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
