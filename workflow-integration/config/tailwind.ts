import plugin from "tailwindcss/plugin";

export default {
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Work Sans", "sans-serif"],
      },
      colors: {
        bnb: { // It'll be extended to primary on NuxtUI configuration (app.config.ts)
          50: "#DEF8E9",
          100: "#C7F3D9",
          200: "#99E9BA",
          300: "#6BE09A",
          400: "#3CD67B",
          500: "#26B460",
          DEFAULT: "#26B460",
          600: "#1D8A4A",
          700: "#146033",
          800: "#0B361D",
          900: "#020C06"
        },
        secondary: {
          50: "#EEE8F2",
          100: "#E0D4E7",
          200: "#C3ADD2",
          300: "#A686BC",
          400: "#895EA6",
          500: "#694780",
          DEFAULT: "#694780",
          600: "#513762",
          700: "#392645",
          800: "#201627",
          900: "#08050A"
        }
      }
    }
  },
  plugins: [
    plugin(function({ addBase }) {
     addBase({
        'html': { fontSize: "14px" },
      })
    }),
    plugin(function({ addComponents }) {
      addComponents({
        ".col-1": {
          flex: "0 0 8.333333333333333333333333333333%",
          maxWidth: "8.333333333333333333333333333333%",
        },
        ".col-2": {
          flex: "0 0 16.66666666666666666666666666666%",
          maxWidth: "16.66666666666666666666666666666%",
        },
        ".col-3": {
          flex: "0 0 25%",
          maxWidth: "25%",
        },
        ".col-4": {
          flex: "0 0 33.333333333333333333333333333333%",
          maxWidth: "33.333333333333333333333333333333%",
        },
        ".col-5": {
          flex: "0 0 41.666666666666666666666666666666%",
          maxWidth: "41.666666666666666666666666666666%",
        },
        ".col-6": {
          flex: "0 0 50%",
          maxWidth: "50%",
        },
        ".col-7": {
          flex: "0 0 58.333333333333333333333333333333%",
          maxWidth: "58.333333333333333333333333333333%",
        },
        ".col-8": {
          flex: "0 0 66.666666666666666666666666666666%",
          maxWidth: "66.666666666666666666666666666666%",
        },
        ".col-9": {
          flex: "0 0 75%",
          maxWidth: "75%",
        },
        ".col-10": {
          flex: "0 0 83.333333333333333333333333333333%",
          maxWidth: "83.333333333333333333333333333333%",
        },
        ".col-11": {
          flex: "0 0 91.666666666666666666666666666666%",
          maxWidth: "91.666666666666666666666666666666%",
        },
        ".col-12": {
          flex: "0 0 100%",
          maxWidth: "100%",
        },
        ".offset": { marginLeft: "0%" },
        ".offset-1": { marginLeft: "8.333333333333333333333333333333%" },
        ".offset-2": { marginLeft: "16.66666666666666666666666666666%" },
        ".offset-3": { marginLeft: "25%" },
        ".offset-4": { marginLeft: "33.333333333333333333333333333333%" },
        ".offset-5": { marginLeft: "41.666666666666666666666666666666%" },
        ".offset-6": { marginLeft: "50%" },
        ".offset-7": { marginLeft: "58.333333333333333333333333333333%" },
        ".offset-8": { marginLeft: "66.666666666666666666666666666666%" },
        ".offset-9": { marginLeft: "75%" },
        ".offset-10": { marginLeft: "83.333333333333333333333333333333%" },
        ".offset-11": { marginLeft: "91.666666666666666666666666666666%" },
        ".offset-12": { marginLeft: "100%" },
      });
    })
  ]
}
