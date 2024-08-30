import { App, Plugin } from 'vue'
import Drawer from './src/Index.vue'


export const DrawerPlugin: Plugin = {
    install(app: App) {
        app.component('yh-drawer', Drawer)
    }
}

export {
    Drawer
}