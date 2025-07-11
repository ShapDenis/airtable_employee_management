import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages base path
  base: command === 'build' ? '/airtable_employee_management/' : '/',
  server: {
    port: 3000,
  },
})) 