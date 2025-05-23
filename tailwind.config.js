/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./App.{js,jsx,ts,tsx}","./src/**/*.{js,jsx,ts,tsx}"],
  // NOTE: You can also use the paths to your component files here.
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}