/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      keyframes: {
        'slide-up': {
          '0%': {
            transform: 'translateY(100%)',
            opacity: '0',
            filter: 'blur(4px)'
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
            filter: 'blur(0)'
          }
        },
        'slide-out': {
          '0%': {
            transform: 'translateY(0)',
            opacity: '1',
            filter: 'blur(0)'
          },
          '100%': {
            transform: 'translateY(-100%)',
            opacity: '0',
            filter: 'blur(4px)'
          }
        }
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-out forwards',
        'slide-out': 'slide-out 0.3s ease-out forwards'
      }
    },
  },
  plugins: [],
};