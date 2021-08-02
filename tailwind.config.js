module.exports = {
  purge: ["./src/**/*.jsx"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito Sans", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "dark-3": "#14212B",
        "dark-3-hover": "#1C2633",
        "dark-2": "#163142",
        "dark-gray": "#6A7176",
        "dark-1": "#243447",
        outline: "#38444D",
        brand: "#1DA1F2",
        "text-light": "#FFFEFE",
        "text-gray": "#8898A7",
        "light-blue": "#173853",
      },
      width: {
        250: "250px",
        300: "300px",
        350: "350px",
        400: "400px",
        450: "450px",
        500: "500px",
        700: "700px",
      },
      maxWidth: {
        1250: "1250px",
      },
      gridTemplateColumns: {
        252: "2fr 5fr 2.5fr",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
