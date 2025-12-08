import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' //importing tailwindcss from tailwindcss/vite package

// https://vite.dev/config/
export default defineConfig({
  plugins:
    [
      tailwindcss(), //and exporting it by default. so index.css file can import tailwindcss from config
      react()], 
})
