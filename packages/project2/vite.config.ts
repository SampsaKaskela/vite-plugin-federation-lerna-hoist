import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from "@originjs/vite-plugin-federation"

const deps = require('./package.json').dependencies;

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
    port: 5001
  },
  plugins: [react(), federation({
    name: 'project2',
    filename: 'remoteEntry.js',
    exposes: {
        './App': './src/App.tsx',
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
