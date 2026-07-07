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
        bg: "#f7f7f4",
        surface: "#ffffff",
        "surface-soft": "#f1f1ee",
        text: "#1d1d1f",
        muted: "#6e6e73",
        line: "#e4e4df",
        accent: "#0a84ff",
        "accent-soft": "#e8f2ff",
        note: "#064a8b",
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
