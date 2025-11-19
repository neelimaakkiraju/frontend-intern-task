/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "fade-in-up": {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(-10%)" },
          "50%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.7s ease-out",
        "fade-in-up": "fade-in-up 0.7s cubic-bezier(0.39, 0.575, 0.565, 1)",
        "bounce-slow": "bounce-slow 1.2s infinite",
      },
      colors: {
        primary: require("tailwindcss/colors").pink,
      },
    },
  },
  plugins: [],
};
