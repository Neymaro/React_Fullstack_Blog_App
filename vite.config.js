import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy: {
    '/api': {
         target: 'https://react-fullstack-blog-app-deployment.onrender.com:8800',
         changeOrigin: true,
         secure: false,      
         ws: true,
     }
}
})
