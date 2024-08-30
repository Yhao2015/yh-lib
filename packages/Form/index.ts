import { App, Plugin } from 'vue'
import Form from './src/Index.vue'


export const FormPlugin: Plugin = {
    install(app: App) {
        app.component('yh-form', Form)
    }
}

export {
    Form
}