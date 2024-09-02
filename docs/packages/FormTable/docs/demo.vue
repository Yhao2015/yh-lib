<template>
    <yh-form-table :config="config" :functions="functions">
        <template #formBtn>
            <el-button type="primary">提交</el-button>
            <el-button>重置</el-button>
        </template>

        <template #btn>
            <div :style="{ 'margin-top': '16px' }">
                <el-space>
                    <el-button type="primary" @click="methods.onAdd">新增</el-button>
                    <el-button @click="methods.onExport">导出</el-button>
                </el-space>
            </div>
        </template>

        <template #rangTime="scope">
            {{ scope.data.startTime + '至' + (scope.data.endTime || '———') }}
        </template>

        <template #dialog>
            dialog
        </template>

        <template #drawer>
            drawer
        </template>
    </yh-form-table>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

let config = reactive({
    form: {
        formData: [
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
                type: 'input',
                show: true
            },
            {
                type: '',
                slot: 'formBtn',
                show: true,
                'label-width': '0'
            }
        ],
        config: { inline: true }
    },
    table: {
        config: {
            'row-key': 'orderNo',
            pagination: true,
            border: true,
            total: 11
        },
        columns: [
            {
                title: '订单时间',
                dataIndex: 'startTime',
                scopedSlots: 'rangTime',
                width: 400
            },
            {
                title: '订单编号',
                dataIndex: 'orderNo',
                width: 300
            },
            {
                title: '充电时长(h)',
                dataIndex: 'chargeHourStr'
            },
            {
                title: '充电电量(kWh)',
                dataIndex: 'totalPower'
            },
            {
                title: '开始时SOC(%)',
                dataIndex: 'beginSoc'
            },
            {
                title: '结束时SOC(%)',
                dataIndex: 'endSoc'
            }
        ],
        tableData: [] as any
    },
    dialog: {
        visible: false,
        title: '新增',
        width: 720,
        footer: true,
        // 方法隐射
        functions: {
            'handleCancel': 'onDialogCancel'
        }
    },
    drawer: {
        visible: false,
        title: '导出',
        functions: {
            'handleCancel': 'onDrawerCancel'
        }
    }
})

let methods = {
    onAdd() {
        config.dialog.visible = true
    },
    onExport() {
        config.drawer.visible = true
    },
    onSearch() {
        methods.getTableData()
    },
    getTableData() {
        setTimeout(() => {
            config.table.tableData = [
                {
                    startTime: '2023-10-27 12:48:49',
                    orderNo: '395815801202310270500146815',
                    status: 4,
                    endTime: '2023-10-27 13:11:51',
                    chargeHour: '0.38',
                    totalPower: '23.70',
                    beginSoc: '71.00',
                    endSoc: '84.00',
                    chargeHourStr: '00:23:02'
                },
                {
                    startTime: '2023-10-27 11:43:50',
                    orderNo: '395815801202310270500120874',
                    status: 4,
                    endTime: '2023-10-27 12:15:39',
                    chargeHour: '0.53',
                    totalPower: '9.33',
                    beginSoc: '79.00',
                    endSoc: '99.00',
                    chargeHourStr: '00:31:48'
                }
            ]
        }, 1000)
    }
}

let functions = {
    handleCancel: () => {

    },
    handleSave: () => {},
    onDialogCancel() {
        config.dialog.visible = false
        console.log('onDialogCancel')
    },
    onDrawerCancel() {
        config.drawer.visible = false
        console.log('onDrawerCancel')
    }
}

onMounted(() => {
    methods.onSearch()
})
</script>
