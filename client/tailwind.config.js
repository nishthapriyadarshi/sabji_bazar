/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4CAF50", // Vibrant green for primary elements
        secondary: "#8BC34A", // Lighter green for accents
        background: "#F1F8E9", // Soft, natural green-tinted background
        textPrimary: "#2E7D32", // Dark green for primary text
        textSecondary: "#6D4C41", // Earthy brown for secondary text
        button: "#4CAF50", // Consistent with the primary color
        buttonHover: "#388E3C", // Slightly darker green for hover states
        highlight: "#FFEB3B", // Yellow for drawing attention to deals or specials
        border: "#C5E1A5", // Light green for subtle borders
      },
      fontFamily: {
        headings: ["Merriweather", "serif"], // Professional and elegant for headings
        body: ["Roboto", "sans-serif"], // Clean and readable for body text
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "3rem",
          xl: "4rem",
          "2xl": "5rem",
        },
      },
      boxShadow: {
        card: "0 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for card components
      },
    },
  },
  plugins: [],
};
