/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6", // Blue-500
        secondary: "#10b981", // Emerald-500
        accent: "#f59e0b", // Amber-500
      }
    },
  },
  plugins: [],
}
