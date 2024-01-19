/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "green-primary": "hsl(75, 94%, 57%)",
        "white-neutral": "hsl(0, 0%, 100%)",
        "grey-neutral": "hsl(0, 0%, 20%)",
        "dark-grey-neutral": "hsl(0, 0%, 12%)",
        "off-black-neutral": "hsl(0, 0%, 8%)",
      },
    },
  },
  plugins: [],
};
