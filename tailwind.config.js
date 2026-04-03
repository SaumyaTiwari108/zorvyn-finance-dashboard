/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // We are inventing a new color name here!
        'brand-purple': '#6b21a8', 
      }
    },
  },
  plugins: [],
}