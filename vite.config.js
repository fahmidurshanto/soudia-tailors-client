// vite.config.js
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    tailwindcss({
      /* inline Tailwind config goes here */
      theme: {
        extend: {
          colors: {
            light: '#fafafa',   // <─ define missing colour
            dark:  '#111827',   // <─ define missing colour
          },
        },
      },
    }),
  ],
})