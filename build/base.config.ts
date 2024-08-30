import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Markdown from 'vite-plugin-md'

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(__dirname, '../src'),
            packages: resolve(__dirname, '../packages')
        }
    },
    server: {
        host: '0.0.0.0',
        port: 9999,
        open: true
    },
    plugins: [
        vue({
            include: [/\.vue$/, /\.md$/]
        }),
        Markdown()
    ]
})
