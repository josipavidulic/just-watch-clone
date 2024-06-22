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
        primary: "var(--ion-color-primary)",
        secondary: "var(--ion-color-secondary)",
        tertiary: "var(--ion-color-tertiary)",
        light: "var(--ion-color-light)",
      },
      fontFamily: {
        lato: ["Lato", "Lato-fallback", "Arial", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "ion-background": "var(--ion-background-color)",
        "custom-gradient":
          "linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.1), #000)",
        "blue-gradient":
          "linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.1), #060d17)",
        "card-gradient":
          "linear-gradient(180deg, #11181f, rgba(17, 24, 31, 0))",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
export default config;
