/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["src/**/*.{js,jsx,ts,tsx}"],
  important: true,
  // prefix: "tw-", // prefix for whether class is tailwind utility class or class for custom style
  theme: {
    screens: {
      tv: { max: "1920px" },
      macbook: { max: "1440px" },
      desktop: { max: "1280px" },
      laptop: { max: "1024px" },
      tablet: { max: "830px" },
      normal: { max: "768px" },
      mobile: { max: "480px" },
      last: { max: "374px" }, // for responsive(until 320px)
    },
    extend: {
      colors: {
        bar: "#00D2C8",
        card_normal: "#121212",
        copy_right: "#0A0A0A",
        trust: "#00D2C8",
        label: "#BEAFFA",
        tokenomics: "#7AFFF7",
        error: "#FD8999",
      },
      backgroundImage: (theme) => ({
        // primary_gradient: `linear-gradient(to right, ${theme("colors.gradient1")}, ${theme("colors.gradient2")})`,
        card_gradient1: "linear-gradient(180deg, #47DFD8 0%, #00B5AD 100%)",
        card_gradient2: "linear-gradient(180deg, #BEAFFA 0%, #7C62E4 100%)",
        card_gradient3: "linear-gradient(180deg, #8B74ED 0%, #5B36E9 100%)",
        card_gradient4: "linear-gradient(180deg, #17D0C7 0%, #00AEA4 100%)",
        card_gradient5: "linear-gradient(180deg, #45DED7 0%, #03B7AF 100%)",
        card_gradient6: "linear-gradient(111.46deg, #BEAEFA 21.48%, #8168E6 77.79%)",
        border_gradient: "linear-gradient(90deg, #43DDD6 0%, #BEAFFA 50%)",
        text_gradient1: "linear-gradient(90.12deg, #9781ED 0.05%, #BEAFFA 70.33%)",
        text_gradient2: "linear-gradient(90.12deg, #43DDD6 0.05%, #00D2C8 70.33%)",
        text_gradient3: "linear-gradient(85.86deg, #A259FF 29.06%, #BEAFFA 66.12%)",
        primary_gradient: "linear-gradient(101.3deg, #FD8999 7.28%, #B89DF1 34.88%, #05BCEE 67.09%, #02BBA4 91.43%)",
        primary_gradient_hover: "linear-gradient(100.1deg, #fd8999 7.22%, #b89df1 61.39%, #05bcee 124.61%, #02bba4 172.35%)",
        primary_gradient_active:
          "linear-gradient(0deg, rgba(255, 255, 255, 0.27), rgba(255, 255, 255, 0.27)), linear-gradient(101.3deg, #FD8999 7.28%, #B89DF1 34.88%, #05BCEE 67.09%, #02BBA4 91.43%)",
        second_gradient: "linear-gradient(65.4deg, #47c488 18.74%, #ffab87 88.33%)",
      }),
      backgroundSize: {
        "100%": "100%",
      },
      boxShadow: {
        range: "0px 0px 15px rgba(21, 28, 61, 0.25)",
        button_hover: "0px 7px 10px #B89DF170",
        card_box1: "16px 12px 10px #00D2C850",
        card_box2: "16px 12px 10px #836DDD50",
        card_box3: "16px 12px 10px #7C62E450",
        card_box4: "16px 12px 10px #00D2C850",
        card_box5: "16px 12px 10px #43DDD650",
      },
      fontFamily: {
        sans: ["Encode Sans", ...defaultTheme.fontFamily.sans], // default font style
      },
      keyframes: {
        hero: {
          "50%": { transform: "translateY(15%)" },
        },
        up_back: {
          "25%": { transform: "translateY(-15px)" },
          "75%": { transform: "translateY(15px)" },
        },
        right_back: {
          "50%": { transform: "translateX(10px)" },
        },
        gradient: {
          "0%, 100%": {
            backgroundSize: "400%, 400%",
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundSize: "400%, 400%",
            backgroundPosition: "100% 50%",
          },
        },
        mount: {
          "0%": {
            opacity: 0,
            transform: "translateY(50%)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        flip_horizontal: {
          "50%": { transform: "rotateY(180deg)" },
        },
      },
      animation: {
        up_back: "up_back 8s ease-in-out infinite",
        right_back: "right_back 6s ease-in-out infinite",
        hero: "hero 10s ease-in-out infinite",
        gradient: "gradient 8s ease infinite",
        modal_mount: "mount 0.2s ease",
        flip_horizontal: "flip_horizontal 2s ease",
      },
    },
  },
  plugins: [require("tailwindcss-animation-delay"), require("tailwind-scrollbar")({ nocompatible: true })],
};
