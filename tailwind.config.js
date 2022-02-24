module.exports = {
  mode: "jit",
  theme: {
    backgroundColor: (theme) => ({
      ...theme("colors"),
      happy: "#61cdbb",
      neutral: "#ffed4a",
      angry: "#f47560",
      sad: "#e8c1a0",
    }),
  },
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
