import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation"

const deps = require('./package.json').dependencies;

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    port: 5000
  },
  plugins: [react(), federation({
    name: 'project1',
    filename: 'remoteEntry.js',
    remotes: {
      remote_app: "http://localhost:5001/assets/remoteEntry.js",
    },
    shared: {
      ...deps,
      react: {
        singleton: true,
        requiredVersion: deps['react']
      },
      'react-dom': {
        singleton: true,
        requiredVersion: deps['react-dom']
      }
    }
  })]
})