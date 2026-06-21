import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#FFFBF3",
        lime: "#CEEF32",
        pinky: "#FF78E5",
        redfire: "#FF2D01",
        bluepop: "#0395FF",
        paper: "#FFFFFF",
        ink: {
          DEFAULT: "#2E2E2E",
          soft: "#7A7A7A",
          line: "#E5E5E5",
        },
        accent: {
          DEFAULT: "#5CE1E6",
        },
      },
      fontFamily: {
        sf: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "system-ui",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      letterSpacing: {
        tightest: "-0.045em",
        tighter: "-0.025em",
        apple: "-0.022em",
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.42, 0, 0.58, 1)",
        "apple-out": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
