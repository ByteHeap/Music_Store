/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'apple-blue': '#007aff',
        'apple-gray': {
          100: '#f5f5f7',
          200: '#e5e5ea',
          300: '#d1d1d6',
          400: '#c7c7cc',
          500: '#aeaeb2',
          600: '#8e8e93',
        },
        dark: {
          background: '#000000',
          surface: '#1c1c1e',
          'on-surface': '#ffffff',
          primary: '#0a84ff',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}