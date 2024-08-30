<template>
    <div class="dynamicForm">
        <div class="my-flex" v-for="(item, index) in lists" :key="item.id">
            <div class="bordered" :style="{ '--padding': border.padding || '0 12px', '--color': border.color || 'transparent' }">
                <yh-form :formData="item.data" :config="item.base" :functions="item.fun" :ref="(el: any) => setRefMap(el, item.id)">
                    <template v-for="slot in slotList" v-slot:[slot]="scope">
                        <slot :name="slot" :data="scope.data"></slot>
                    </template>
                </yh-form>
            </div>

            <div :style="{ width: btnType == 'right' ? '90px' : '40px' }">
                <el-space>
                    <el-button type="danger" :disabled="item.disabled" :icon="Minus" @click="methods.del(item.id)"></el-button>
                    <el-button type="primary" :icon="Plus" @click="methods.add()" v-if="btnType == 'right' && index == lists.length - 1"></el-button>
                </el-space>
            </div>
        </div>

        <slot name="content"></slot>

        <div class="flex-center" v-if="btnType == 'bottom'"><el-button round :icon="Plus" type="primary" :style="{ width: '100%' }" @click="methods.add()">新增</el-button></div>
    </div>
</template>

<script lang="ts" setup>
import { Plus, Minus } from '@element-plus/icons-vue'
import { ref, reactive, watch, defineProps } from 'vue'
import { cloneDeep } from 'lodash-es'
import { ElMessage } from 'element-plus'
let getUuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0
        const v = c === 'x' ? r : (r & 0x3) | 0x8
        return v.toString(16)
    })
}
let refMap = <any>{}
let setRefMap = (el: any, id: string) => {
    if (el) {
        refMap[`yh_${id}`] = el
    }
}

let props = defineProps({
    border: {
        type: Object,
        default: () => {
            return {}
        }
    },
    btnType: {
        type: String,
        default: 'bottom'
    },
    formData: {
        type: Array,
        required: true,
        default: () => []
    },
    config: {
        type: Object,
        default: () => {}
    },
    functions: {
        type: Object,
        default: () => {
            return {}
        }
    }
})

let lists = ref<any>([])

let methods = {
    add(disabled: boolean = false) {
        let id = getUuid()
        let data = cloneDeep(props.formData)
        let base = cloneDeep(props.config)
        let fun = cloneDeep(props.functions)
        let ans = {
            id,
            data,
            base,
            fun,
            disabled
        }

        lists.value.push(ans)
    },
    del(id: string) {
        if(lists.value.length == 1) {
            ElMessage({
                message: '不能删除最后一条记录！',
                type: 'warning'
            })

            return
        }

        lists.value = lists.value.filter((el: any) => el.id !== id)
    },
    save() {
        let count = 0, ans = [] as any
        return new Promise((resolve, reject) => {
            lists.value.map((el: any) => {
                refMap[`yh_${el.id}`].checkForm().then((formState: any) => {
                    count++

                    let data = cloneDeep(formState)
                    ans.push({
                        ...data,
                        uuid: el.id
                    })

                    if(count == lists.value.length) {
                        resolve(ans)
                    }
                })
            })
        })
    },
    setFieldsValue(data: any) {
        if(!(data ?.length && Array.isArray(data))) {
            return
        }
        methods.resetFields()
        data.map((el) => methods.add(el.disabled))

        setTimeout(() => {
            lists.value.map((el, index: number) => {
                refMap[`yh_${el.id}`].setFieldsValue(data[index])
            })
        })
    },
    setFieldValue({ id, key, value }) {
        if(!id) {
            return
        }

        refMap[`yh_${id}`].setFieldValue(key, value)
    },
    getFieldsValue() {
        let ans = [] as any
        lists.value.map(el => {
            let formState = refMap[`yh_${el.id}`].getFieldsValue()
            ans.push({
                ...formState,
                uuid: el.id
            })
        })

        return ans
    },
    getFieldValue({ id, key }) {
        if(!id) {
            return
        }

        return key ? refMap[`yh_${id}`].getFieldValue(key) : refMap[`yh_${id}`].getFieldsValue()
    },
    resetFields() {
        lists.value = []
    }
}

let slotList = ref<string[]>([])
watch(
    () => props.formData,
    (value) => {
        if (value ?.length) {
            slotList.value = value.filter((el: any) => el.slot).map((el: any) => el.slot)
        }
    },
    {
        immediate: true,
        deep: true
    }
)

defineExpose({
    ...methods
})
</script>

<style scoped lang="scss">
.bordered {
    padding: var(--padding);
    flex: 1;
    border: 1px solid;
    border-color: var(--color);
}

.my-flex {
    display: flex;
    align-items: center;
}

.my-flex + .my-flex {
    margin-top: 16px;
}

.flex-center {
    width: 100%;
    justify-content: center;
    display: flex;
    margin-top: 16px;
}
</style>