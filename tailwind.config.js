/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--main-background)",
        text: {
          primary: "var(--text-color)",
        },
      },
    },
  },
  plugins: [],
};
