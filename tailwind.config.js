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
      "first-dark": "#0A0E1A",
      "second-dark": "#1D243D",
      "third-dark": "#353D60",
      "neutral-medium": "#515A82",
      "third-light": "#737BA5",
      "second-light": "#9AA0C8",
      "first-light": "C6CAEB",
      liliac: "#8e98f5",
    },
    extend: {
      width: {
        100: "100px",
        200: "200px",
        300: "300px",
        400: "400px",
        500: "500px",
        600: "600px",
      },
    },
  },
  plugins: [],
};
