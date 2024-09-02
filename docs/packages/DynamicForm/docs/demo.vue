<template>
    <yh-dynamic :formData="formData" :config="config" ref="dynamicRef" btnType="right"></yh-dynamic>

    <h5>常用操作</h5>
    <div class="flex-center">
        <el-button :style="{ width: '100%' }" type="success" @click="methods.onSave">提交</el-button>
    </div>

    <div class="flex-center">
        <el-button :style="{ width: '100%' }" type="info" @click="methods.onSetValue">赋值</el-button>
    </div>

    <div class="flex-center">
        <el-button :style="{ width: '100%' }" type="warning" @click="methods.onUpdate">更新</el-button>
    </div>
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
    }
])

let config = reactive({
    inline: false,
    rowSpan: 8,
    'item-bottom': '0'
})


let methods = {
    onSave() {
        dynamicRef.value.save().then(data => {
            console.log(data)
        })
    },
    onSetValue() {
        dynamicRef.value.setFieldsValue([
            {
                name: '张删',
                age: '18',
                sex: '1',
                disabled: true
            },
            {
                name: '李思',
                age: '20',
                sex: '1'
            },
            {
                name: '王武',
                age: '18',
                sex: '1',
                disabled: true
            },
            {
                name: '宋尔',
                age: '20',
                sex: '1'
            },
        ])
    },
    onUpdate() {
        let ans = dynamicRef.value.getFieldsValue()
        if(ans.length == 0) {
            return
        }

        dynamicRef.value.setFieldValue({
            id: ans[0].uuid,
            key: 'name',
            value: '张三'
        })
    }
}

onMounted(() => {
    dynamicRef.value.add()
})
</script>

<style lang="scss" scoped>
.flex-center {
    width: 100%;
    justify-content: center;
    display: flex;
    margin-top: 24px;
}
</style>