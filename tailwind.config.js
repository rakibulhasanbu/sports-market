/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF5A35",
        textBlack: "#1B1818",
        textBlueBlack: "#1D2939",
        textDarkGrey: "#403C3C",
        textGreyBlack: "#312F2F",
        textGrey: "#645D5D",
        borderColor: "#D5D8DB",
        success: "#2AAE09",
        red: "#E11C1B",
        bgWhite: "#FAFAFA",
        mainColor: "#D06F0E",
        textDark: "#282829",
        textDarkBlue: "#27304B",
        textSecondary: "#4E4F50",
        bgSecondary: "#3C3C3D",
        bgred: "#DA2B2F",
      },
      container: {
        center: true,
      }
    },
  },
  plugins: [],
}