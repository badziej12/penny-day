/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "outfit-extralight": ["OutfitExtraLight"],
        "outfit-light": ["OutfitLight"],
        outfit: ["OutfitRegular"],
        "outfit-medium": ["OutfitMedium"],
        "outfit-semibold": ["OutfitSemiBold"],
        "outfit-bold": ["OutfitBold"],
        "outfit-extra-bold": ["OutfitExtraBold"],
        "outfit-black": ["OutfitBlack"],
      },
      width: {
        "1/7": "14.285%", // 100 / 7 ≈ 14.2857%
        "2/7": "28.571429%",
        "3/7": "42.857143%",
        "4/7": "57.142857%",
        "5/7": "71.428571%",
        "6/7": "85.714286%",
      },
    },
  },
  plugins: [],
};
