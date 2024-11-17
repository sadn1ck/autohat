import type { Config } from "tailwindcss";
import tailwindcssRadixColors from "tailwindcss-radix-colors";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [tailwindcssRadixColors],
} satisfies Config;
