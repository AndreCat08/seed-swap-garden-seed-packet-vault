/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

const alias = (p: string) => fileURLToPath(new URL(`./src/${p}`, import.meta.url))

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@entities': alias('entities'),
      '@use-cases': alias('use-cases'),
      '@adapters': alias('adapters'),
      '@ui': alias('ui'),
      '@hooks': alias('hooks'),
    },
  },
  test: { globals: true, environment: 'jsdom', setupFiles: ['./src/test/setup.ts'], css: false },
})
