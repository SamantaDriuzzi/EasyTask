import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        color1: "#329FA6",
        color2: "#5CB0C8",
        color3: "#AF87EA",
        color4: "#6C5DBC",
        color5: "#4A48A4",
        color6: "#29338D",
        color7: "#5F98DF",
        color8: "#CD9AE4",
        grey: "#CCCCCC",
        white: "#FFFFFF",
        "blue-dark": "#1e3a8a",
        "blue-medium": "#60a5fa",
        "blue-light": "#3b82f6",
        "color-button": "#329FA6",
        "color-button-hover": "#955CB0",
      },
      backgroundImage: {
        "gradient-lineal":
          "linear-gradient(to top, #29338D 0%, #414BA3 24%, #6249AB 39%, #5F98DF 90%, #5F98DF 100%)",
        "gradient-benefits":
          "linear-gradient(to bottom, #29338D 0%, #6249AB 50%, #329FA6 100%)",
        "gradient-register":
          "linear-gradient(to bottom, #2F84A0 0%, #6048A4 50%, #353F98 100%)",
        "footer-gradient": "linear-gradient(180deg, #4A48A4, #634C84 100%)",
      },
    },
  },
  variants: {},
  plugins: [],
};
export default config;
