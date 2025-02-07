/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx,jsx}'],
  theme: {
    extend: {
      colors: {
        tm: {
          50: '#eefff8',
          100: '#d8fff1',
          200: '#b4fee2',
          300: '#79fccb',
          400: '#38f0ad',
          500: '#0fef9e',
          600: '#04b575',
          700: '#088d5e',
          800: '#0c6f4d',
          900: '#0c5b40',
          950: '#003323',
        },
        accent: '#aac8e4',
        'accent-2': '#68d412',
      },
    },
  },
  plugins: [],
};
