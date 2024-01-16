/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Railey: ["Railey", "sans-serif"],
        poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        antiquewhite: "#faebd7",
        brown: "#5b3113",
      },
    },
  },
  plugins: [],
};
