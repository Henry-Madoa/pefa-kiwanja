import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Surface tokens flip between light/dark via CSS variables.
        white: "rgb(var(--c-surface) / <alpha-value>)", // cards
        page: "rgb(var(--c-bg) / <alpha-value>)", // page/nav surface
        // Brand colors stay constant across themes. Derived from the
        // PEFA Branch Kiwanja Cathedral logo: royal purple + antique gold.
        // `purple` is the canonical name; `wine` is kept as an alias so the
        // existing utility classes across the site re-theme in one place.
        purple: {
          DEFAULT: "#3B1B72", // logo background (exact)
          dark: "#2C1457",
          deeper: "#1D0E3B",
        },
        wine: {
          DEFAULT: "#3B1B72",
          dark: "#2C1457",
          deeper: "#1D0E3B",
        },
        gold: {
          DEFAULT: "#C9A44A",
          bright: "#E4C874",
          soft: "#D8B878", // the logo's champagne-gold line work
        },
        cream: {
          DEFAULT: "#F7F1E3", // constant: light text on dark bands
          dim: "rgb(var(--c-surface-2) / <alpha-value>)", // secondary surface (flips)
        },
        ink: {
          DEFAULT: "rgb(var(--c-text) / <alpha-value>)",
          soft: "rgb(var(--c-text-soft) / <alpha-value>)",
        },
        forest: "#1F3A2B",
        line: "var(--line)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        serif: ["var(--font-source-serif)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        arch: "120px 120px 6px 6px",
      },
    },
  },
  plugins: [],
};

export default config;
