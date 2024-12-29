/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        xs: "22.5rem",
      },
    },
    fontFamily: {
      sans: ["IBM Plex Mono", "sans serif"],
    },
  },
  plugins: [],
};
