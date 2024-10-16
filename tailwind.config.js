/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        wink: {
          50: '#e3ecff',
          100: '#c8d9ff',
          200: '#a6c1ff',
          300: '#83a9ff',
          400: '#5f8fff',
          500: '#3a70ff',
          600: '#2f5ce6',
          700: '#2649b3',
          800: '#1d3680',
          900: '#14234d',
        },
      },
      fontFamily: {
        sans: ['pretendard', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
