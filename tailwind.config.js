/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    spacing: {
      '32': '32rem',
      '156': '39rem'
    }
  },
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
  ],
  theme: {
    extend: {
      fontFamily:{
        sans: ['Inter', 'sans-serif'],
        'custom': ['Anton', 'sans-serif']
      }
    }
  },
  plugins: [
  require('@tailwindcss/forms'),
],
}

