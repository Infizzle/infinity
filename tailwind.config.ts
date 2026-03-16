import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: "#0A0A0A",
          card: "#111111",
          elevated: "#1A1A1A",
        },
        accent: {
          DEFAULT: "#00D2BE",
          hover: "#00B8A6",
          glow: "rgba(0, 210, 190, 0.15)",
        },
        text: {
          heading: "#F0F0F0",
          body: "#AAAAAA",
          muted: "#666666",
        },
      },
      fontFamily: {
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
      },
    },
  },
  plugins: [],
};

export default config;
