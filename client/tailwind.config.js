/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "#e5e7eb",      // Example color, change as needed
        background: "#ffffff",  // Example color, change as needed
        foreground: "#111827",  // Example color, change as needed
      },
    },
  },
  plugins: [],
}