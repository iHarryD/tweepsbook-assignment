/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{jsx,tsx}", "./components/**/*.{jsx,tsx}"],
  theme: {
    colors: {
      accent: "#4ddaff",
      "accent-text": "#000",
      "primary-bg": "#202020",
      "primary-text": "#fff",
      "error-red": "#ff6767",
      "success-green": "#53ff41",
    },
  },
  plugins: [],
};
