import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  extend: {
    keyframes: {
      fadeUp: {
        "0%": { opacity: "0", transform: "translateY(20px)" },
        "100%": { opacity: "1", transform: "translateY(0)" },
      },
    },
    animation: {
      "fade-up": "fadeUp 0.8s ease-out forwards",
      "fade-up-delay-1": "fadeUp 0.8s ease-out 0.2s forwards",
      "fade-up-delay-2": "fadeUp 0.8s ease-out 0.4s forwards",
      "fade-up-delay-3": "fadeUp 0.8s ease-out 0.6s forwards",
      "fade-up-delay-4": "fadeUp 0.8s ease-out 0.8s forwards",
    },
  },
});
