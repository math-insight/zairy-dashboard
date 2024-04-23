import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig( {
    server: {
        proxy: {
            "/api": "https://api.zairymon.pl",
        }
    },
    plugins: [ react() ],
    base: "./",
    build: {
        outDir: "dist"
    }
} )
