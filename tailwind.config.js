/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'accent': '#d4a574',
        'accent-dim': '#b8895e',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['IBM Plex Mono', 'Fira Code', 'monospace'],
        body: ['DM Sans', '-apple-system', 'sans-serif'],
      },
      screens: {
        'mobile': {'max': '600px'},
        'tablet': {'min': '601px', 'max': '880px'},
      },
    },
  },
  plugins: [],
}
