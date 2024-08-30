<template>
    <yh-dynamic :formData="formData" :config="config" ref="dynamicRef" btnType="bottom">
        <template #address="scope">
            {{ '插槽 code= ' + scope.data.code }}
        </template>
    </yh-dynamic>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
let dynamicRef = ref()
let formData = reactive([
    {
        label: '姓名',
        code: 'name',
        type: 'input',
        show: true,
        required: true
    },
    {
        label: '年龄',
        code: 'age',
        type: 'input',
        show: true
    },
    {
        label: '性别',
        code: 'sex',
        type: 'select',
        show: true,
        options: [
            {
                label: '男',
                value: '1'
            },
            {
                label: '女',
                value: '2'
            }
        ]
    },
    {
        label: '地址',
        code: 'address',
        type: '',
        slot: 'address',
        show: true
    }
])

let config = reactive({
    inline: false,
    rowSpan: 6,
    'item-bottom': '0'
})

onMounted(() => {
    dynamicRef.value.add()
})
</script>

<style lang="scss" scoped>
</style>