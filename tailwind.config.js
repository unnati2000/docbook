module.exports = {
  mode: "jit",

  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        happy: "#61cdbb",
        neutral: "#ffed4a",
        angry: "#f47560",
        sad: "#e8c1a0",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
