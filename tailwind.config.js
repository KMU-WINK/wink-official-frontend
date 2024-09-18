/** @type {import('tailwindcss').Config} */
module.exports = {
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
          500: '#3a70ff', // Base color
          600: '#2f5ce6',
          700: '#2649b3',
          800: '#1d3680',
          900: '#14234d',
        },
      },
      width: {
        page: '1440px',
        carousel: '895px',
        project: '1150px',
        study: '880px',
        history: '600px',
      },
      height: {
        recruit: '800px',
      },
      margin: {
        4.5: '18px',
        'admin-sidebar': '120px',
      },
      spacing: {
        4.5: '18px',
      },
      borderRadius: {
        'project-card': '45px',
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'translate(-50%, 0) rotateZ(0deg)' },
          '50%': { transform: 'translate(-50%, -2%) rotateZ(180deg)' },
          '100%': { transform: 'translate(-50%, 0%) rotateZ(360deg)' },
        },
        moveDiagonally: {
          '0%, 100%': {
            transform: 'translateX(0) translateY(0)',
          },
          '50%': {
            transform: 'translateX(20px) translateY(-20px)',
          },
        },
      },
      animation: {
        rotate: 'rotate 15s linear infinite',
        rocket: 'moveDiagonally 3s ease-in-out infinite',
      },
      fontFamily: {
        sans: ['pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
