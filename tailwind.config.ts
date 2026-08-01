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
        // Brand colors stay constant across themes.
        wine: {
          DEFAULT: "#6E1423",
          dark: "#430B15",
          deeper: "#2E070E",
        },
        gold: {
          DEFAULT: "#B8923F",
          bright: "#E3C077",
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
