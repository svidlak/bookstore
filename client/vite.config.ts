import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'import.meta.env.DEV_BASE_PATH': JSON.stringify('http://localhost:3000'),
    'import.meta.env.PROD_BASE_PATH': JSON.stringify('http://18.201.37.94:3000')
  }
})
