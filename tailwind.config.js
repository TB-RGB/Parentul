/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.jsx"],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
    daisyui: {
      themes: ['dracula']
    }
}

