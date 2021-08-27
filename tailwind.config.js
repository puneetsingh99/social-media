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
        "dark-2": "#253240",
        "dark-gray": "#6A7176",
        "dark-1": "#6E5A40",
        outline: "#38444D",
        brand: "#1DA1F2",
        brandPink: "#E1245F",
        "text-light": "#FFFEFE",
        "text-gray": "#8898A7",
        "light-blue": "#173853",
        "semi-trans": "rgba(0,0,0,0.3)",
      },
      width: {
        100: "100px",
        150: "150px",
        175: "175px",
        200: "200px",
        250: "250px",
        300: "300px",
        350: "350px",
        400: "400px",
        450: "450px",
        500: "500px",
        550: "550px",
        700: "700px",
      },
      height: {
        "100%": "100%",
        50: "50px",
        100: "100px",
        200: "200px",
        250: "250px",
        300: "300px",
        350: "350px",
      },
      maxWidth: {
        1250: "1250px",
      },
      maxHeight: {
        200: "200px",
        250: "250px",
        275: "275px",
        300: "300px",
        350: "350px",
        400: "400px",
      },
      minHeight: {
        100: "100px",
        200: "200px",
        250: "250px",
        300: "300px",
      },
      gridTemplateColumns: {
        252: "2fr 4.5fr 3fr",
      },

      boxShadow: {
        "md-white":
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
