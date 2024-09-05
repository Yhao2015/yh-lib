import { App, Plugin } from 'vue'
import Grid from './src/Index.vue'


export const GridPlugin: Plugin = {
    install(app: App) {
        app.component('yh-grid', Grid)
    }
}

export {
    Grid
}