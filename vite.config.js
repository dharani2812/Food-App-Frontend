import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Food-App-Frontend/', // ✅ ADD THIS LINE
  plugins: [react()],
})
