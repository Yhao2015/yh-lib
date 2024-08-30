<template>
    <yh-form :formData="formData" :config="config" :functions="functions" ref="formRef">
        <template #btn>
            <el-button type="primary">查询</el-button>
        </template>
    </yh-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
let formData = reactive([
    {
        label: '姓名',
        code: 'name',
        type: 'input',
        show: true
    },
    {
        label: '年龄',
        code: 'age',
        type: 'input',
        show: false
    },
    {
        label: '性别',
        code: 'sex',
        type: 'select',
        show: true,
        options: [ ],
        changeFunName: 'onChange'
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
        options: [ ]
    },
    {
        type: '',
        slot: 'btn',
        show: true,
        'label-width': '0'
    }
])

let config = reactive({
    inline: true
})

let formRef = ref()
let methods = {
    getOptions() {
        setTimeout(() => {
            ;(formData.find(el => el.code == 'sex') as any).options = [
                {
                    label: '男',
                    value: '1'
                },
                {
                    label: '女',
                    value: '2'
                }
            ]
        }, 100)
    },
    onChange(value) {
        formRef.value.setFieldsValue({
            work: ''
        })
        let ans = (formData.find(el => el.code == 'work') as any)
        if(value == 1) {
            ans.options = [
                {
                    label: '前端',
                    value: '1'
                },
                {
                    label: '后端',
                    value: '2'
                }
            ]
        } else {
            ans.options = [
                {
                    label: '运营',
                    value: '3'
                },
                {
                    label: '设计',
                    value: '4'
                }
            ]
        }
        ;(formData.find(el => el.code == 'address') as any).show = value == 1 ? false : true
    }
}

let functions = {
    onChange: methods.onChange
}

methods.getOptions()
</script>

<style scoped lang="scss">
:deep(.w_250) {
    width: 200px;
}
</style>