import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          navy: "#003D5C",
          blue: "#00A8E8",
          green: "#4CAF50",
          orange: "#FF9800",
        },
      },
    },
  },
  plugins: [],
};
export default config;
