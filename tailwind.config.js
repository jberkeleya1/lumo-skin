// tailwind.config.js

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF6EF",
        card: "#FFFFFF",
        borderColor: "#E3DDD3",
        primary: "#D4CBB6",           // button background
        primaryText: "#3B3B3B",       // button text
        textMain: "#2E2E2E",
        textMuted: "#6B6B6B",
      },
    },
  },
  plugins: [],
}
