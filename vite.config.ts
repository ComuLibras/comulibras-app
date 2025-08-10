import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from 'vite-plugin-pwa';
import icons from './public/icons.json';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(), 
    VitePWA({
      registerType: 'prompt',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif,webp,woff,woff2,ttf,eot}'],
        cleanupOutdatedCaches: true,
        skipWaiting: true,
      },
      includeAssets: ['vite.svg', 'logo.png', 'logo-light.png'],
      manifest: {
        name: 'ComuLibras',
        short_name: 'ComuLibras',
        description: 'Aplicativo ComuLibras para comunicação em Libras',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: icons.icons,
        categories: ['education', 'accessibility'],
        lang: 'pt-BR',
        dir: 'ltr'
      },
      devOptions: {
        enabled: true,
        type: 'module'
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
