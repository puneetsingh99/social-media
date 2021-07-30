module.exports = {
  purge: ["./src/**/*.jsx"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito Sans", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {},
      width: {
        250: "250px",
        300: "300px",
        350: "350px",
        400: "400px",
        500: "500px",
        700: "700px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
