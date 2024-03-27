/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#5871EB',
        default: '#282A2F',
        'foreground-primary': '#202227'
      }
    }
  },
  plugins: []
}
