import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from "vite-plugin-pwa"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA(
      {
        registerType: 'autoUpdate',
        devOptions: {
          enabled: true
        },
        manifest: {
          "name": "CourseRegistration",
          "short_name": "CourseRegist",
          "start_url": "./",
          "display": "standalone",
          "background_color": "#fff",
          "description": "Course Registration App.",
          "theme_color": "#ffffff",
          "icons": [
            {
              "src": "src/images/pwa-512x512.png",
              "sizes": "512x512",
              "type": "image/png",
              "purpose": "any"
            },
            {
              "src": "src/images/pwa.png",
              "sizes": "144x144",
              "type": "image/png",
              "purpose": "any"
            }
          ]
        }
      }
    )
  ]
})
