import { App, Plugin } from 'vue'
import FormTable from './src/Index.vue'


export const FormTablePlugin: Plugin = {
    install(app: App) {
        app.component('yh-form-table', FormTable)
    }
}

export {
    FormTable
}