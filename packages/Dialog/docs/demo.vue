<template>
    <el-button type="primary" @click="onShow">弹框</el-button>


    <yh-dialog :config="config" :functions="functions" :draggable="false">
        这是内容

        <template #btn>
            <el-button type="danger">按钮插槽</el-button>
        </template>
    </yh-dialog>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { Config } from '../src/definitions'


let config = reactive<Config>({
    visible: false,
    title: '',
    width: 440,
    loading: false,
    footer: true
})

let functions = {
    handleCancel: () => {
        config.visible = false
        console.log('关闭')
    },
    handleSave: () => {
        config.visible = false
        console.log('保存')
    }
}

let onShow = () => {
    config.visible = true
    config.title = '新增'
    config.width = 720
}
</script>

<style scoped lang="scss">
</style>