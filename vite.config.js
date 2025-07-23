import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Food-App-Frontend/', // 👈 Add this line
  plugins: [react()],
})

