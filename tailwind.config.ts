import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "grid-rows-[0fr]",
    "grid-rows-[1fr]",
    "transition-[grid-template-rows]",
  ],
  theme: {
    extend: {
      colors: {
        gold:     "#c9a84c",
        "gold-light": "#e8c97a",
        "gold-dim":   "#8a6f2e",
        "gold-bg":    "#1a1500",
        ink:      "#0a0a0a",
        "ink-1":  "#111111",
        "ink-2":  "#161616",
        "ink-3":  "#1e1e1e",
        "ink-4":  "#2a2a2a",
        stone:    "#6b6b6b",
        cream:    "#f4f0e8",
      },
      fontFamily: {
        display: ["var(--font-bebas)", "sans-serif"],
        body:    ["var(--font-dm)",    "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.25em",
        widest3: "0.35em",
      },
      keyframes: {
        "fade-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)"    },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center"  },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)"   },
          "50%":      { transform: "translateY(-12px)" },
        },
        "scan-line": {
          "0%":   { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(400%)"  },
        },
        pulse2: {
          "0%, 100%": { opacity: "1"   },
          "50%":      { opacity: "0.4" },
        },
        "border-spin": {
          "0%":   { transform: "rotate(0deg)"   },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "fade-up":    "fade-up 0.7s ease forwards",
        "fade-in":    "fade-in 0.6s ease forwards",
        shimmer:      "shimmer 3s linear infinite",
        float:        "float 4s ease-in-out infinite",
        "scan-line":  "scan-line 3s linear infinite",
        pulse2:       "pulse2 2s ease-in-out infinite",
        "border-spin":"border-spin 4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
