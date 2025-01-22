/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./storybook/**/*.{js,jsx,ts,tsx}",
    "./test/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        lightMode: "#f3f4f6",
        darkMode: "#1f2937",
      }
    },
  },
  plugins: [],
};