import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    rollupOptions: {
      external: [],
    },
    target: 'es2015',
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
})
