import { App, Plugin } from 'vue'
import DynamicForm from './src/Index.vue'


export const DynamicFormPlugin: Plugin = {
    install(app: App) {
        app.component('yh-dynamic', DynamicForm)
    }
}

export {
    DynamicForm
}