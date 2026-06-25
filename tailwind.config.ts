import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ink: "#0E1A24",
        "ink-2": "#16252F",
        "ink-3": "#1F313C",
        paper: "#F5F2EA",
        "paper-dim": "#D8D3C7",
        signal: "#FFB23E",
        "signal-deep": "#E8941A",
        cleared: "#5BD6A6",
        hold: "#FF6B5E",
        muted: "#8A9AA5",
      },
      fontFamily: {
        display: [
          "var(--font-display)",
          "'Space Grotesk'",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "'JetBrains Mono'",
          "ui-monospace",
          "monospace",
        ],
        body: ["var(--font-body)", "'Inter'", "system-ui", "sans-serif"],
      },
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
        "4xl": "96px",
      },
      borderRadius: {
        tight: "4px",
      },
    },
  },
  plugins: [],
};

export default config;
