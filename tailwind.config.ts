import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // The modelling canvas the whole page is drawn on.
        canvas: "#F1F5F7",
        pool: "#FFFFFF",
        rule: "#B9C8D2",
        grid: "#DCE5EA",

        // Ink. All node strokes and body text.
        ink: {
          DEFAULT: "#002E45",
          soft: "#0B4462",
          mute: "#4A6274",
        },

        // Palette law: each colour means exactly one thing, everywhere.
        // flow = sequence flow / movement of work
        // auto = a step a machine now handles
        // act  = something the visitor does
        flow: {
          DEFAULT: "#00A8E8", // on ink
          ink: "#00688F", // on canvas, AA for text
        },
        auto: {
          DEFAULT: "#4CAF50", // on ink
          ink: "#2E7D32", // on canvas, AA for text
        },
        act: {
          DEFAULT: "#FF9800", // fills, on ink
          ink: "#A85A00", // on canvas, AA for text
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      maxWidth: {
        measure: "68ch",
      },
      transitionTimingFunction: {
        // Exponential ease-out. One curve for the whole page.
        settle: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
