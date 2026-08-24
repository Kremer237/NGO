import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        forest: "#17382F",
        ivory: "#F7F5EF",
        surface: "#FEFEFC",
        charcoal: "#171A18",
        slate: "#6B716D",
        // Darkened from the spec's #C58A43 to meet WCAG AA text contrast
        // (4.5:1) on the Ivory background — the original value tests at
        // ~2.7:1 wherever it's used for small text (eyebrow labels, badges).
        // Same hue/saturation, just less light. The brand mark's accent dot
        // (public/brand/*.svg) is exempt as a logo and keeps the original.
        ochre: "#93652D",
        border: "#DFE2DC",
        success: "#47745D",
      },
      fontFamily: {
        heading: ["var(--font-manrope)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        content: "1280px",
      },
      borderRadius: {
        button: "6px",
      },
    },
  },
  plugins: [],
};

export default config;
