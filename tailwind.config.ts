// tailwind.config.js
import { nextui } from "@nextui-org/react";
import type { Config } from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: [
    // ...
    // make sure it's pointing to the ROOT node_module
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    darkMode: 'class',
    extend: {
      screens: {
        'ssm':'375px',
        'sm': '640px',
        'md': '768px',
        'md-lg': '905px',
        'lg': '1024px',
        '1lg-xl': '1280px',
        '2lg-xl': '1440px',
        'xl': '1880px',
      },
    },
  },
  plugins: [
    nextui({
      themes: {
        "wata-light": {
          extend: "light",
          colors: {
            background: "#ffffff",
            foreground: "#000000",//text color
            primary: {
              50: "#ffffff",// active sidebar
              100: "#e3e3e3",//sidebar bg
              200: "#ffffff",
              300: "#caccd1",//border color
              400: "#c031e2",
              500: "#ffffff",//component bg
              600: "#000",//hightlight button
              700: "#f0f8f7",//light green 
              800: "#fef7f6",//light red
              900: "#f0f8f7",//calendar selected bg
              DEFAULT: "#caccd1",
              foreground: "#000000",
            },
            focus: "#000",
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
        "wata-dark": {
          extend: "dark",
          colors: {
            background: "#2b2b2b",
            foreground: "#ffffff",
            primary: {
              50: "#000000",
              100: "#171717",
              200: "#000a15",//header
              300: "#ffffff",//b
              400: "#c031e2",
              500: "#231f20",//component bg
              600: "#00bce4",
              700: "#078339",//dark green
              800: "#e3355a",//dark red
              900: "#000000",//calendar selected bg
              DEFAULT: "#00bce4",
              foreground: "#ffffff",
            },
            focus: "#fff",
          },
          layout: {
            disabledOpacity: "0.3",
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
            borderWidth: {
              small: "1px",
              medium: "2px",
              large: "3px",
            },
          },
        },
      },
    }),
  ],
};

export default config;