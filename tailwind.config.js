// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",  // or 'media'
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      // Здесь можно расширить цвета для dark-theme
      colors: {
        background: {
          light: "#ffffff",
          dark: "#121212",
        },
        text: {
          light: "#1f2937",  // gray-800
          dark: "#f3f4f6",   // gray-100
        },
      },
    },
  },
  plugins: [],
};

