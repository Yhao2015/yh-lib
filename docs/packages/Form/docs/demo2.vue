<template>
    <yh-form :formData="formData" :functions="functions" ref="formRef">
        <template #slotName="scope">
            {{ scope.data }}
        </template>
    </yh-form>

    <el-button type="primary" @click="methods.onSave">提交</el-button>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
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
        show: true,
        required: true
    },
    {
        label: '性别',
        code: 'sex',
        type: 'select',
        show: true,
        required: true,
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
        type: 'input',
        show: true
    },
    {
        label: '工种',
        code: 'work',
        type: 'select',
        show: true,
        options: [
            {
                label: '前端',
                value: '1'
            },
            {
                label: '后端',
                value: '2'
            },
            {
                label: '运营',
                value: '3'
            },
            {
                label: '设计',
                value: '4'
            }
        ]
    },
    {
        label: '插槽',
        type: '',
        slot: 'slotName',
        show: true
    }
])

let formRef = ref()
let methods = {
    onChange(value) {
        ;(formData.find((el) => el.code == 'address') as any).show = value == 1 ? false : true
    },
    onSave() {
        formRef.value.checkForm().then(formState => {
            console.log(formState)
        })
    }
}

let functions = {
    onChange: methods.onChange
}
</script>

<style scoped lang="scss">
:deep(.w_250) {
    width: 200px;
}
</style>
