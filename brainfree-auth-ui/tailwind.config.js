/** @type {import("tailwindcss").Config} */
const { guessProductionMode } = require("@ngneat/tailwind");

process.env.TAILWIND_MODE = guessProductionMode() ? "build" : "watch";

module.exports = {
  prefix: "",
  mode: "jit",
  content: [
    "./src/**/*.{html,ts}"
  ],
  darkMode: true, // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  //plugins: [require('@tailwindcss/aspect-ratio'),require('@tailwindcss/forms'),require('@tailwindcss/line-clamp'),require('@tailwindcss/typography')],
  plugins: []
};
