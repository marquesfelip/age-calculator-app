/** @type {import('tailwindcss').Config} */
export default {
  content: ['./*.{html,js,ts}'],
  theme: {
    extend: {
      colors: {
        'off-white': 'hsl(0, 0%, 94%)',
        'light-gray': 'hsl(0, 0%, 86%)',
        'smokey-grey': 'hsl(0, 1%, 44%)',
        'off-black': 'hsl(0, 0%, 8%)',
        purple: 'hsl(259, 100%, 65%)',
        'light-red': 'hsl(0, 100%, 67%)',
      },
    },
  },
  plugins: [],
}
