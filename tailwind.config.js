// tailwind.config.js

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Space Grotesk", "sans-serif"],   // Primary font
        accent: ["var(--font-accent)", "Satoshi", "sans-serif"],      // Accent font
      },
    },
  },
  plugins: [
    function ({ addUtilities, theme }) {
      addUtilities({
        '.font-accent': {
          fontFamily: theme('fontFamily.accent').join(', '),
        }
      })
    }
  ]
}
