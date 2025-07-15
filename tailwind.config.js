const tokens = require('./design-tokens.json');

module.exports = {
  content: [ "./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}" ],
  safelist: [
    "bg-plan-basic",
    "bg-plan-pro",
    "bg-plan-premium",
  ],
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
      
      backgroundImage: {
        'plan-basic':   'radial-gradient(ellipse 89.9% 86.8% at 82.1% 100%, #2C3553 0%, #171E38 100%)',
        'plan-pro':     'radial-gradient(ellipse 101.9% 102.4% at 48.7% 120.6%, #3E5C89 0%, #171E38 100%)',
        'plan-premium': 'radial-gradient(ellipse 75.8% 70.4% at 8.1% 106.0%, #3E5C89 0%, #171E38 100%)',
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
