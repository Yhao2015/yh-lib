<template>
    <div class="form-table">
        <template v-if="config.form && config.form.formData && config.form.formData.length">
            <yh-form :formData="config.form.formData" :config="config.form.config" :functions="functions" v-bind="formBind">
                <template v-for="(name) in formSlot" v-slot:[name]="scope">
                    <slot :name="name" :data="scope.data"></slot>
                </template>
            </yh-form>
        </template>

        <slot name="btn"></slot>

        <template v-if="config.table && config.table.tableData && config.table.tableData.length">
            <yh-table :style="{ 'margin-top': '16px' }" :config="config.table.config" :tableData="config.table.tableData" :columns="config.table.columns" :functions="functions" v-bind="tableBind">
                <template v-for="(name) in tableSlot" v-slot:[name]="scope">
                    <slot :name="name" :data="scope.data"></slot>
                </template>
            </yh-table>
        </template>

        <template v-if="config.dialog">
            <yh-dialog :config="config.dialog" :functions="dialogFunctions" v-bind="dialogBind">
                <slot name="dialog"></slot>
            </yh-dialog>
        </template>

        <template v-if="config.drawer">
            <yh-drawer :config="config.drawer" :functions="drawerFunctions" v-bind="drawerBind">
                <slot name="drawer"></slot>
            </yh-drawer>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, defineProps, watch } from 'vue'

let props = defineProps({
    config: {
        type: Object,
        default: () => {
            return {
                form: {},
                table: {},
                dialog: {},
                drawer: {}
            }
        }
    },
    functions: {
        type: Object,
        default: () => {
            return {}
        }
    }
})

let formSlot = ref<string[]>([]), tableSlot = ref<string[]>([]), tableBind = ref({}), formBind = ref({}), dialogBind = ref({}), drawerBind = ref({})
let dialogFunctions = reactive({}), drawerFunctions = reactive({})
watch(
    () => props.config,
    (value) => {
        let { form, table, dialog, drawer } = value
        if(form) {
            if(form.config && Object.keys(form.config).length) {
                formBind.value = {}
                for(let key in form.config) {
                    if(!['inline', 'label-width', 'rowSpan', 'justify', 'gutter', 'item-bottom'].includes(key)) {
                        formBind.value[key] = form.config[key]
                    }
                }
            }

            if(form.formData ?.length) {
                formSlot.value = form.formData.filter((el: any) => el.slot).map((el: any) => el.slot as string)
            }
        }

        if(table) {
            if(table.config && Object.keys(table.config).length) {
                tableBind.value = {}
                for(let key in table.config) {
                    if(!['row-key', 'selection', 'pagination', 'index', 'pageIndex', 'pageSize', 'total', 'layout', 'className'].includes(key)) {
                        tableBind.value[key] = table.config[key]
                    }
                }
            }

            if(table.columns ?.length) {
                tableSlot.value = table.columns.filter((el: any) => el.scopedSlots).map((el: any) => el.scopedSlots as string)
            }
        }

        if(dialog && Object.keys(dialog).length) {
            dialogBind.value = {}
            for(let key in dialog) {
                if(!['functions', 'visible', 'title', 'width', 'loading', 'footer', 'isSave', 'saveText', 'cancelText', 'customClass'].includes(key)) {
                    dialogBind.value[key] = dialog[key]
                }
            }

            // 方法映射
            if(dialog.functions && Object.keys(dialog.functions).length) {
                dialogFunctions = reactive(props.functions)
                for(let key in dialog.functions) {
                    if(typeof dialog.functions[key] === 'function') {
                        dialogFunctions[key] = dialog.functions[key]
                    } else if(typeof dialog.functions[key] === 'string') {
                        dialogFunctions[key] = props.functions[dialog.functions[key]]
                    }
                }
            }
        }

        if(drawer && Object.keys(drawer).length) {
            drawerBind.value = {}
            for(let key in drawer) {
                if(!['functions', 'visible', 'title', 'customClass', 'width'].includes(key)) {
                    drawerBind.value[key] = drawer[key]
                }
            }

            // 方法映射
            if(drawer.functions && Object.keys(drawer.functions).length) {
                drawerFunctions = reactive(props.functions)
                for(let key in drawer.functions) {
                    if(typeof drawer.functions[key] === 'function') {
                        drawerFunctions[key] = drawer.functions[key]
                    } else if(typeof drawer.functions[key] === 'string') {
                        drawerFunctions[key] = props.functions[drawer.functions[key]]
                    }
                }
            }
        }
    },
    {
        deep: true,
        immediate: true
    }
)
</script>

<style scoped lang="scss"></style>