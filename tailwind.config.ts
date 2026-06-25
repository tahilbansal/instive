import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Page surfaces — near-black, not pure black.
        ink: {
          DEFAULT: "#0a0a0f",
          surface: "#13131a",
          raised: "#1a1a23",
        },
        // Sidecar accent colours (kept in sync with SIDECAR_META in data/mockups.ts).
        sidecar: {
          carrier: "#3b82f6",
          demand: "#8b5cf6",
          reporting: "#06b6d4",
          invoice: "#f59e0b",
          labor: "#10b981",
          returns: "#f97316",
          dispatch: "#ec4899",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      borderColor: {
        hairline: "rgba(255,255,255,0.07)",
      },
    },
  },
  plugins: [],
};

export default config;
