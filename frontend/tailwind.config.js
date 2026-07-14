/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'blue-bg' : '#2A3439',
        'black-bg' : '#0C0C0C',
        'glod-color' : '#f9cb5e',
        'richblack-5': '#F1F2FF',
        'richblack-25': '#DBDFEA',
        'richblack-50': '#C5C7D4',
        'richblack-100': '#AFB2BF',
        'richblack-200': '#999DAA',
        'richblack-300': '#838894',
        'richblack-400': '#6D727F',
        'richblack-500': '#585D69',
        'richblack-600': '#424854',
        'richblack-700': '#2C333F',
        'richblack-800': '#161D29',
        'richblack-900': '#000814',
      },
      fontFamily: {
        cursive: ['"Great Vibes"', 'cursive'],
      }
    },
  },
  plugins: [],
}

