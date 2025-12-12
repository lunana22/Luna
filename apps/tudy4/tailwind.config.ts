// import preset from "@luna/design-system/tailwind.preset";
import type { Config } from "tailwindcss";

export default {
  //   presets: [preset],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@luna/ui/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@luna/features/**/*.{js,ts,jsx,tsx}",
  ],
} satisfies Config;
