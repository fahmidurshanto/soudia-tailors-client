/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A90E2', // A vibrant blue
        secondary: '#50E3C2', // A refreshing teal
        accent: '#F5A623', // A warm orange
        dark: '#2C3E50', // Dark blue-gray for text/backgrounds
        light: '#ECF0F1', // Light gray for backgrounds
        text: '#34495E', // Darker text color
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Modern sans-serif font
        serif: ['Merriweather', 'serif'], // Complementary serif font
      },
    },
  },
  plugins: [],
}