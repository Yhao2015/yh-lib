import { App, Plugin } from 'vue'
import Tree from './src/Index.vue'


export const TreePlugin: Plugin = {
    install(app: App) {
        app.component('yh-tree', Tree)
    }
}

export {
    Tree
}