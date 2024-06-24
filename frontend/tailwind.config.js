/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   
    extend: {
      colors: {
        'bg': '#D6D6D6',
        'green':'#4DAE80',
        'pink':'#F74070',
        'orange':'#F5BC70',
        'blue':'#7A84F2'
      },ringColor:{
        DEFAULT: '#F5BC70'
      },
    },
  },
  variants: {
    extend: {
      ringColor: ['focus'],
    },
  },
  plugins: [],
}