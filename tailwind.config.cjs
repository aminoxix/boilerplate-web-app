/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xs: "376px",
      sm: "390px",
      md: "640px",
      lg: "1025px",
      xl: "1440px",
      "2xl": "1920px",
    },
    extend: {
      colors: {
        brand: "#242424",
        accent: "#E54D43",
      },
      fontFamily: {
        inter: ["Inter"],
      },
    },
  },
  plugins: [],
};
