/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{html,js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      'mobile': '100px',
      'tablet': '500px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {}
  },
  plugins: [],
}

