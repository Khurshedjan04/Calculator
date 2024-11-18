/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        main: '"Karla", sans-serif'
      },
      animation: {
        gradientMove: 'gradientMove 5s ease infinite',
        colorChange: 'colorChange 5s ease infinite',
        colorChangeDark: 'colorChangeDark 5s ease infinite',
      },
      keyframes: {
        gradientMove: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        colorChange: {
          '0%': { color: '#4f8ae8' },
          '50%': { color: '#95b4ed' },
          '100%': { color: '#4f8ae8' },
        },
        colorChangeDark: {
          '0%': { color: '#4980e6' },
          '100%': { color: '#2ba9fe' },
          '50%': { color: '#4980e6' },
        },
      },
      boxShadow: {
        'light-shadow': 'inset 0 0 10px 0 rgba(245, 247, 250, 1)', // Custom shadow class
        'dark-shadow': 'inset 0 0 0 0 rgba(245, 247, 250, 0)', // Custom shadow class
      },
      colors: {
        'darkBg': '#2d3238'
      }
    },
  },
  plugins: [],
};