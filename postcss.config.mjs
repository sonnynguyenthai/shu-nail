/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1E3A8A",  // Custom primary color
        secondary: "#9333EA", // Custom secondary color
        accent: {
          light: "#FDE68A",
          DEFAULT: "#F59E0B",
          dark: "#B45309",
        },
      },
    },
  },
  plugins: ["@tailwindcss/postcss"],
};

export default config;