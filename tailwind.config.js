/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        rotate: {
          '0%': { transform: 'translate(-50%, 0) rotateZ(0deg)' },
          '50%': { transform: 'translate(-50%, -2%) rotateZ(180deg)' },
          '100%': { transform: 'translate(-50%, 0%) rotateZ(360deg)' },
        },
      },
      animation: {
        rotate: 'rotate 15s linear infinite',
      },
      fontFamily: {
        sans: ['pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
