/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    colors: {
      "strong-lavander": "#7971ea",
      "medium-lavander": "#8e98f5",
      "light-lavander": "#b1cbfa",
      "pale.lavander": "#dfe2fe",
      black: "#191919",
      white: "#f9f9f9",
    },
    extend: {},
  },
  plugins: [],
};
