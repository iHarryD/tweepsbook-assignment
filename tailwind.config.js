/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{jsx,tsx}", "./components/**/*.{jsx,tsx}"],
  theme: {
    fontFamily: {
      primary: ["Source Sans Pro", "sans-serif"],
    },
    fontSize: {
      sm: "0.9rem",
      mid: "1rem",
      lrg: "clamp(1.2rem, 0.8rem + 2vw, 1.5rem)",
    },
    extend: {
      borderRadius: {
        "btn-input": "5rem",
      },
      colors: {
        accent: "#4ddaff",
        "accent-text": "#000",
        "error-red": "#ff6767",
        "light-grey": "#464646",
        "primary-bg": "#202020",
        "primary-text": "#fff",
        "success-green": "#3ba23d",
      },
      height: {
        "otp-input": "clamp(1.5rem, 1.3rem + 2vw, 2.5rem)",
      },
      padding: {
        "body-y": "1rem",
        "body-x": "2.5rem",
        "btn-y": "0.75rem",
        "btn-x": "2rem",
        "input-y": "0.8rem",
        "input-x": "1.5rem",
      },
      scale: {
        102: "1.02",
      },
      width: {
        "otp-input": "clamp(1.5rem, 1.3rem + 2vw, 2.5rem)",
      },
    },
  },
  plugins: [],
};
