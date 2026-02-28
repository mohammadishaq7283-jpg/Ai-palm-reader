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
        mystic: {
          900: "#1a0b2e", // Deep purple
          800: "#2d1b4e",
          700: "#432c7a",
          500: "#764ba2",
          300: "#b8a4c9",
          100: "#e0d4fc",
        },
        gold: {
          500: "#ffd700",
          400: "#ffec8b",
        }
      },
      backgroundImage: {
        "mystic-gradient": "linear-gradient(135deg, #1a0b2e 0%, #2d1b4e 50%, #000000 100%)",
        "glass": "linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "from": { boxShadow: "0 0 10px #764ba2, 0 0 20px #764ba2" },
          "to": { boxShadow: "0 0 20px #ffd700, 0 0 30px #ffd700" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
