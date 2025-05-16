const tokens = require('./design-tokens.json');

module.exports = {
  content: [ "./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}" ],
  theme: {
    extend: {
      colors: tokens.color,
      spacing: tokens.spacing,
      fontSize: Object.fromEntries(
        Object.entries(tokens.fontSize).map(([key, [size, lh]]) => [key, size + '/' + lh])
      ),
      borderRadius: tokens.radius,
      boxShadow: tokens.shadow,
    }
  },
  plugins: [],
};
