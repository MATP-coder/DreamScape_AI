module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#a78bfa',
          DEFAULT: '#7c3aed',
          dark: '#5b21b6'
        }
      }
    },
  },
  plugins: [],
}