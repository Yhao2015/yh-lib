<template>
    <el-dialog
        ref="dialogRef"
        v-model="visible"
        :title="baseConfig.title"
        :width="baseConfig.width"
        :class="baseConfig.customClass"
        destroy-on-close
        align-center
        v-bind="$attrs"
        @close="onCancel"
    >
        <slot></slot>
        <template #footer v-if="baseConfig.footer">
            <slot name="btn"></slot>
            <el-button v-if="baseConfig.isSave" v-loading="baseConfig.loading" type="primary" @click="onConfirm">{{ baseConfig.saveText || '确定' }}</el-button>
            <el-button plain @click="onCancel">{{ baseConfig.cancelText || '取消' }}</el-button>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref, defineProps, watch, PropType } from 'vue'
import { Config } from './definitions'
import { merge } from 'lodash-es'

let props = defineProps({
    config: {
        type: Object as PropType<Config>,
        default: () => {
            return {}
        }
    },
    functions: {
        type: Object,
        default: () => {
            return {}
        }
    }
})

let baseConfig = ref<Config>({
    visible: false,
    title: '',
    width: 440,
    loading: false,
    footer: false,
    isSave: true,
    saveText: '确定',
    cancelText: '取消',
    customClass: ''
})

let visible = ref<boolean>(false)

watch(
    () => props.config,
    (value) => {
        baseConfig.value = merge(baseConfig.value, value)
        // 赋值
        visible.value = baseConfig.value.visible as boolean
    },
    {
        immediate: true,
        deep: true
    }
)

let onConfirm = () => {
    if(props.functions ?.handleSave) {
        props.functions.handleSave()
    }
}
let onCancel = () => {
    console.log('=>', props.functions)
    if(props.functions ?.handleCancel) {
        props.functions.handleCancel()
    }
}
</script>

<style scoped lang="scss">
</style>