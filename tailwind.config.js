/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors")
const { fontFamily } = require("tailwindcss/defaultTheme")

module.exports = {
  darkMode: "class",
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["var(--font-roboto)"],
      },
      animation: {
        wiggle: "wiggle 2s ease-in-out infinite",
        bounce: "bounce 1.5s infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "scale(1.2) rotate(-4deg)" },
          "50%": { transform: " scale(1) rotate(0deg)" },
        },
      },
      colors: {
        primary: colors.blue,
      },
      screens: {
        sm: "1px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
