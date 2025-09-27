import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'CineVerse-Ultimate-Movie-Experience',  // 👈 use your repo name here
})
