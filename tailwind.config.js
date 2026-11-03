/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/state/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          base: "#0B0F19",
          surface: "#111827",
          border: "#1F2937",
        },
        light: {
          base: "#F8FAFC",
          surface: "#FFFFFF",
          border: "#E2E8F0",
        },
        brand: {
          darkest: "#0B0F19",
          dark: "#0F172A",
          navy: "#111827",
          card: "#111827",
          cardBorder: "#1F2937",
          teal: "#34D399",
          tealHover: "#10B981",
          coral: "#10B981",
          coralHover: "#059669",
          textLight: "#F8FAFC",
          textMuted: "#94A3B8",
          textDim: "#64748B",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "Plus Jakarta Sans",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "Roboto",
          "sans-serif",
        ],
      },
      screens: {
        xs: "420px",
      },
    },
  },
  plugins: [],
};
