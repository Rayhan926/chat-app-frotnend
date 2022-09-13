/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'soft-gray': '#EFF3F6',
        primary: '#703DFE',
        dark: {
          900: '#140F26',
          800: '#8a929e',
          700: '#AEB5C2',
          100: '#F2F5F9',
        },
      },
    },
  },
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  plugins: [require('@tailwindcss/line-clamp'), require('tailwind-scrollbar')],
};
