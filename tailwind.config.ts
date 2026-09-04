import type { Config } from "tailwindcss";

// כל הערכים כאן מועתקים אחד-לאחד ממשתני העיצוב שהיו ב-next-mvp-v2.html.
// שום צבע, רדיוס או צל לא הומצא או שונה כאן.

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#f5f0e8",
        surface: "#fffdf8",
        "surface-soft": "#eee6dc",
        text: "#20231f",
        muted: "#746d65",
        line: "#ded3c6",
        accent: "#6f1831",
        "accent-soft": "#f0dfe3",
        note: "#183f32",
      },
      borderRadius: {
        card: "24px",
        hero: "30px",
        button: "18px",
        "button-sm": "16px",
        seg: "15px",
        nav: "15px",
      },
      boxShadow: {
        card: "0 12px 35px rgba(0,0,0,.045)",
        hero: "0 18px 45px rgba(0,0,0,.12)",
        navActive: "0 4px 16px rgba(0,0,0,.05)",
      },
      fontFamily: {
        assistant: [
          "Assistant",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
