/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F044C',
        secondary: '#141E61',
        muted: '#787A91',
        light: '#EEEEEE',
      },
    },
  },
  plugins: [
    tailwindcss()
  ],
}
