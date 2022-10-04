/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'soft-gray': '#EFF3F6',
        primary: '#016AFD',
        dark: {
          900: '#140F26',
          800: '#8a929e',
          700: '#AEB5C2',
          200: '#eef3f9',
          100: '#F2F5F9',
        },
        'dark-mode': {
          900: '#111',
          800: '#222',
          700: '#333',
          600: '#444',
          500: '#555',
          400: '#666',
          300: '#777',
          200: '#888',
          100: '#999',
        },
      },
    },
    screens: {
      sm: '420px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  plugins: [require('@tailwindcss/line-clamp'), require('tailwind-scrollbar')],
};
