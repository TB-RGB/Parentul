/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.jsx"],
  theme: {
    extend: { 
      backgroundColor: {
        'custom-bg': '#1a1a1a',
      }
    },
  },
  plugins: [
    require('daisyui')
  ],
    daisyui: {
      themes: ['dracula']
    }
}

