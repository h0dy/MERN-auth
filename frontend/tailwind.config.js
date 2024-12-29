/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        xs: "22.5rem",
      },
      animation: {
        "spin-fast": "spin 0.5s linear infinite",
      },
    },
    fontFamily: {
      sans: ["IBM Plex Mono", "sans serif"],
    },
  },
  plugins: [],
};
