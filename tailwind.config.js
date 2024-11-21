/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', 'class'],
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
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
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
        lg: '0.5rem',
        md: 'calc(0.5rem - 2px)',
        sm: 'calc(0.5rem - 4px)',
      },
      keyframes: {
        rotate: {
          '0%': {
            transform: 'translate(-50%, 0) rotateZ(0deg)',
          },
          '50%': {
            transform: 'translate(-50%, -2%) rotateZ(180deg)',
          },
          '100%': {
            transform: 'translate(-50%, 0%) rotateZ(360deg)',
          },
        },
        moveDiagonally: {
          '0%, 100%': {
            transform: 'translateX(0) translateY(0)',
          },
          '50%': {
            transform: 'translateX(20px) translateY(-20px)',
          },
        },
        updown: {
          from: {
            transform: 'translatey(0px)',
          },
          to: {
            transform: 'translatey(-20px)',
          },
        },
        'updown-shadow': {
          from: {
            width: '184px',
            '-webkit-filter': 'blur(6px)',
          },
          to: {
            width: '240px',
            '-webkit-filter': 'blur(10px)',
          },
        },
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        rotate: 'rotate 15s linear infinite',
        rocket: 'moveDiagonally 3s ease-in-out infinite',
        updown: 'updown 1.4s infinite ease-in-out alternate',
        'updown-shadow': 'updown-shadow 1.4s infinite ease-in-out alternate',
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontFamily: {
        sans: ['pretendard', 'sans-serif'],
        roboto: ['Roboto'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
