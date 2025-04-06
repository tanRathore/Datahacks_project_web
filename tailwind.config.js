/** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {
          colors: {
            'hollywood-gold': '#D4AF37',
            'hollywood-red': '#B31B1B',
            'pop-blue': '#007bff',
            'pop-pink': '#e91e63',
          },
          fontFamily: {
            'display': ['Oswald', 'sans-serif'], // Example display font
            'body': ['Roboto', 'sans-serif'], // Example body font
          },
        },
      },
      plugins: [],
    }
