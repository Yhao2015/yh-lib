<template>
    <el-radio-group v-model="config.selection">
        <el-radio-button label="radio">radio</el-radio-button>
        <el-radio-button label="checkbox">checkbox</el-radio-button>
    </el-radio-group>

    <yh-table :config="config" :tableData="tableData" :columns="columns" :functions="functions">
        <template #rangTime="scope">
            {{ scope.data.startTime + '至' + (scope.data.endTime || '———') }}
        </template>
    </yh-table>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

let config = reactive({
    selection: 'radio',
    'row-key': 'orderNo'
})

let functions = {}

let tableData = ref([
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
])

let columns = ref([
    {
        title: '订单时间',
        dataIndex: 'startTime',
        width: '400',
        align: 'center',
        scopedSlots: 'rangTime'
    },
    {
        title: '订单编号',
        dataIndex: 'orderNo',
        width: '400',
        align: 'center'
    },
    {
        title: '充电时长(h)',
        dataIndex: 'chargeHourStr',
        width: '200',
        align: 'center'
    },
    {
        title: '充电电量(kWh)',
        dataIndex: 'totalPower',
        width: '200',
        align: 'center'
    },
    {
        title: '开始时SOC(%)',
        dataIndex: 'beginSoc',
        width: '200',
        align: 'center'
    },
    {
        title: '结束时SOC(%)',
        dataIndex: 'endSoc',
        width: '200',
        align: 'center'
    }
])
</script>
