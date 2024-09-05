import { App, Plugin } from 'vue'

import { TablePlugin } from './Table'
import { DialogPlugin } from './Dialog'
import { FormPlugin } from './Form'
import { DynamicFormPlugin } from './DynamicForm'
import { DrawerPlugin } from './Drawer'
import { FormTablePlugin } from './FormTable'
import { TreePlugin } from './Tree'
import { GridPlugin } from './Grid'

import Utils from './Utils'


const YPlugin: Plugin = {
    install(app: App) {
        TablePlugin.install ?.(app)
        DialogPlugin.install ?.(app)
        FormPlugin.install ?.(app)
        DynamicFormPlugin.install ?.(app)
        DrawerPlugin.install ?.(app)
        FormTablePlugin.install ?.(app)
        TreePlugin.install ?.(app)
        GridPlugin.install ?.(app)
        app.config.globalProperties.$utils = Utils
    }
}

export default YPlugin