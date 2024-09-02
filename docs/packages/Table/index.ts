import { App, Plugin } from 'vue'
import Table from './src/Index.vue'


export const TablePlugin: Plugin = {
    install(app: App) {
        app.component('yh-table', Table)
    }
}

export {
    Table
}