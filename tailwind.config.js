/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        updown: {
          from: { transform: "translatey(0px)" },
          to: { transform: "translatey(-20px)" },
        },
        "updown-shadow": {
          from: {
            width: "184px",
            "-webkit-filter": "blur(6px)",
          },
          to: {
            width: "240px",
            "-webkit-filter": "blur(10px)",
          },
        },
      },
      animation: {
        updown: "updown 1.4s infinite ease-in-out alternate",
        "updown-shadow": "updown-shadow 1.4s infinite ease-in-out alternate",
      },
      fontFamily: {
        pretendard: ["pretendard"],
        roboto: ["Roboto"],
      },
    },
  },
  plugins: [],
};
