import { defineConfig } from 'vite'
import { readFileSync } from 'fs'

const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'))

export default defineConfig({
  base: '/hzstrobe/',
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
  },
})
