import baseConfig from './base.config'
import { defineConfig } from 'vite'

export default defineConfig({
    ...baseConfig,
    base: '/ztxn-lib',
    build: {
        outDir: 'docs'
    }
})
