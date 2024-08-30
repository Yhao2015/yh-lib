<template>
    <template v-if="formData.length">
        <el-form
            ref="modelRef"
            @submit.prevent
            :model="formState"
            :rules="rulesRef"
            :inline="base.inline"
            :label-position="base['label-position']"
            :label-width="base.inline ? 'auto' : base['label-width']"
            :style="{ '--itemBottom': base['item-bottom'] }"
            v-bind="$attrs"
        >
            <template v-if="base.inline">
                <template v-for="item in configData">
                    <el-form-item :class="item.formClassName" :prop="item.code" :label-width="item['label-width']" v-if="item.show">
                        <template #label>
                            <slot name="prefix"></slot>
                            {{ item.label }}
                            <slot name="suffix"></slot>
                        </template>
                        <slot v-if="item.slot" :name="item.slot" :data="item"></slot>
                        <EForm v-else :item="item" :formState="formState" :methods="methodFun" :class="['w_150', item.className]"></EForm>
                    </el-form-item>
                </template>
            </template>
            <template v-else>
                <el-row :justify="base.justify" :gutter="base.gutter">
                    <template v-for="item in configData">
                        <el-col :span="item.type && item.type.includes('hidden') ? 0 : item.rowSpan || base.rowSpan" v-if="item.show">
                            <el-form-item :class="item.formClassName" :prop="item.code" :label-width="item['label-width']" v-show="!item.type.includes('hidden')">
                                <template #label>
                                    <slot name="prefix"></slot>
                                    {{ item.label }}
                                    <slot name="suffix"></slot>
                                </template>
                                <slot v-if="item.slot" :name="item.slot" :data="item"></slot>
                                <EForm v-else :item="item" :formState="formState" :methods="methodFun" :class="['w_150', item.className]"></EForm>
                            </el-form-item>
                        </el-col>
                    </template>
                </el-row>
            </template>
        </el-form>
    </template>
</template>

<script lang="ts" setup>
import { merge, cloneDeep } from 'lodash-es'
import type { FormItemProp } from 'element-plus'
import { ref, reactive, watch, defineProps } from 'vue'
import EForm from './EForm.vue'
const props = defineProps({
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

let base = reactive({
    inline: false,
    'label-position': 'right',
    'label-width': '100px',
    rowSpan: 24,
    justify: 'start',
    gutter: [16, 16],
    'item-bottom': '16px'
})

let formState = reactive<any>({}),
    rulesRef = reactive<any>({}),
    configData = ref()
let modelRef = ref()

let methods = {
    checkFunction(value: any, callback: Function, el: any) {
        if (props.functions[el.checkFunName]) {
            props.functions[el.checkFunName](value, callback, el)
        }
    },
    checkForm() {
        if (!modelRef.value) return
        return new Promise((resolve) => {
            modelRef.value.validate((isValid: boolean) => {
                isValid && resolve(formState)
            })
        })
    },
    resetForm() {
        if (!modelRef.value) return
        modelRef.value.resetFields()
    },
    setFieldsValue(value: any) {
        for (let key in value) {
            if (formState.hasOwnProperty(key)) {
                methods.setFieldValue(key, value[key])
            }
        }
    },
    setFieldValue(key: string, value: any) {
        if (formState.hasOwnProperty(key)) {
            formState[key] = value
        }
    },
    getFieldsValue() {
        return cloneDeep(formState)
    },
    getFieldValue(key: string) {
        return formState[key]
    }
}

let methodFun = {
    trimFun(e, item) {
        if (['input', 'textarea'].includes(item.type)) {
            let value = e.target ? e.target.value : e
            value = value.trim()
            methods.setFieldValue(item.code, value)
        }
    },
    change(value, item) {
        if (props.functions && props.functions[item.changeFunName]) {
            props.functions[item.changeFunName](value, item)
        }
    },
    input(value, item) {
        if (props.functions && props.functions[item.inputFunName]) {
            props.functions[item.inputFunName](value, item)
        }
    },
    blur(value, item) {
        methodFun.trimFun(value, item)
        if (props.functions && props.functions[item.blurFunName]) {
            props.functions[item.blurFunName](value, item)
        }
    },
    focus(value, item) {
        if (props.functions && props.functions[item.focusFunName]) {
            props.functions[item.focusFunName](value, item)
        }
    }
}

watch(
    () => props.config,
    (value) => {
        if (value && Object.keys(value).length) {
            base = merge(base, value)
        }
    },
    {
        immediate: true,
        deep: true
    }
)

watch(
    () => props.formData,
    (value) => {
        if (value?.length) {
            configData.value = cloneDeep(value)
            value.map((el: any) => {
                if (!el.code) return

                // 赋值
                if(Object.keys(formState).length == 0) {
                    formState[el.code] = el.defaultValue
                }

                // 必填项
                rulesRef[el.code] = [] as Array<Object>
                if (el.required) {
                    rulesRef[el.code].push({
                        required: true,
                        message: el.help ? el.help : (['input', 'number', 'password', 'textarea'].includes(el.type) ? '请输入' : '请选择') + el.label,
                        trigger: el.trigger || 'change'
                    })
                }

                // 正则
                if (el.pattern) {
                    rulesRef[el.code].push({
                        pattern: el.pattern || null,
                        message: el.help ? el.help : '格式错误'
                    })
                }

                // 自定义校验
                if (el.checkFunName) {
                    rulesRef[el.code].push({
                        validator: (rule, value, callback) => methods.checkFunction(value, callback, el)
                    })
                }

                // 没有校验的删除
                if (rulesRef[el.code].length == 0) {
                    delete rulesRef[el.code]
                }
            })
        }
    },
    {
        immediate: true,
        deep: true
    }
)

defineExpose({
    checkForm: methods.checkForm,
    resetForm: methods.resetForm,
    setFieldsValue: methods.setFieldsValue,
    setFieldValue: methods.setFieldValue,
    getFieldsValue: methods.getFieldsValue,
    getFieldValue: methods.getFieldValue
})
</script>

<style scoped lang="scss">
.widthP100 {
    width: 100%;
}

.el-form-item {
    margin-bottom: var(--itemBottom)
}

:deep(.el-form-item__label) {
    display: flex;
    align-items: center;
}

.el-form--inline .el-form-item {
    margin-right: 8px;
}

:deep(.w_150) {
    min-width: 150px;
}
</style>
