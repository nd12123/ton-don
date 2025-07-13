const tokens = require('./design-tokens.json');

module.exports = {
  content: [ "./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}" ],
  theme: {
    extend: {
      keyframes: {
        "pulse-slow": {
          "0%, 100%": { opacity: "0.3" },
          "50%":       { opacity: "0.8" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(12px)" },
        },
      },
      animation: {
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
      },
      
      colors: tokens.color,
      spacing: tokens.spacing,
      fontSize: Object.fromEntries(
        Object.entries(tokens.fontSize).map(([key, [size, lh]]) => [key, size + '/' + lh])
      ),
      borderRadius: tokens.radius,
      boxShadow: tokens.shadow,

      // вот добавляем fontFamily
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],  // теперь font-sans → Inter по умолчанию он везде
        inter: ['var(--font-inter)', 'sans-serif'],
      },
    }
  },
  plugins: [],
};
