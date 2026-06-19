/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#050708',
        'secondary-bg': '#0B111F',
        'accent-gold': '#C8A56A',
        'text-light': '#F2EBDD',
        'text-muted': '#9AA3AF',
      },
      fontFamily: {
        'heading': ['Cormorant Garamond', 'serif'],
        'body': ['Manrope', 'sans-serif'],
      },
      letterSpacing: {
        'wide-sm': '0.05em', // Subtle letter spacing for uppercase text
      },
    },
  },
  plugins: [],
}
