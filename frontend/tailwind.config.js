/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        voilet:{
          300:"#e0e7ff",
          400 : "#635cca",
          700:"#5046e4",
        },
        gray :{
          300 : "#f9fbfc",
          700 : "#8d8d98",

        }
      }
    },
  },
  plugins: [],
};
