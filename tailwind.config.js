/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Avenir"],
        logo: ["Recoleta"],
      },
      colors: {
        "egg-white": "#f7f7f2",
        button: "#e7e4e1",
        "active-button": "#d1d1cd",
      },
    },
  },
  plugins: [],
};
