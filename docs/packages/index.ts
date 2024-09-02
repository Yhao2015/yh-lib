import { App, Plugin } from 'vue'

import { TablePlugin } from './Table'
import { DialogPlugin } from './Dialog'
import { FormPlugin } from './Form'
import { DynamicFormPlugin } from './DynamicForm'
import { DrawerPlugin } from './Drawer'
import { FormTablePlugin } from './FormTable'
import { TreePlugin } from './Tree'


const YPlugin: Plugin = {
    install(app: App) {
        TablePlugin.install ?.(app)
        DialogPlugin.install ?.(app)
        FormPlugin.install ?.(app)
        DynamicFormPlugin.install ?.(app)
        DrawerPlugin.install ?.(app)
        FormTablePlugin.install ?.(app)
        TreePlugin.install ?.(app)
    }
}

export default YPlugin