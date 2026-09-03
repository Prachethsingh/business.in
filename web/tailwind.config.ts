import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "var(--cream)",
        "cream-2": "var(--cream-2)",
        paper: "var(--paper)",
        "paper-2": "var(--paper-2)",
        pad: "var(--pad)",
        "pad-hi": "var(--pad-hi)",
        text: "var(--text)",
        muted: "var(--muted)",
        "muted-2": "var(--muted-2)",
        blue: "var(--blue)",
        sky: "var(--sky)",
        gold: "var(--gold)",
        "gold-2": "var(--gold-2)",
        green: "var(--green)",
        red: "var(--red)",
        best: "var(--best)",
        expected: "var(--expected)",
        worst: "var(--worst)",
      },
      fontFamily: {
        serif: ["var(--serif)"],
        sans: ["var(--sans)"],
        mono: ["var(--mono)"],
      },
      borderRadius: {
        DEFAULT: "var(--radius)",
        sm: "var(--radius-sm)",
        xs: "var(--radius-xs)",
      },
    },
  },
  plugins: [],
};

export default config;
