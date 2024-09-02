import { App, Plugin } from 'vue'
import Dialog from './src/Index.vue'


export const DialogPlugin: Plugin = {
    install(app: App) {
        app.component('yh-dialog', Dialog)
    }
}

export {
    Dialog
}