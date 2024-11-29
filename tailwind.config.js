/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ["./src/**/*.{js,vue}"],
  theme: {
    extend: {
      colors: {
        primeButton: "#7e4c4f",
      },
    },
  },
  plugins: [require("tailwindcss-primeui")],
};
