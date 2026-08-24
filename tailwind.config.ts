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
        ochre: "#C58A43",
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
