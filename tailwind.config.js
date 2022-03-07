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
      spacing: {
        chat: "88vh",
        fullscreen: "80vh",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
