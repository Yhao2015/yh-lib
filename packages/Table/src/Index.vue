<template>
    <el-table
        ref="tableRef"
        :data="tableData"
        show-overflow-tooltip
        :highlight-current-row="selection == 'radio' ? true : false"
        @selection-change="methods.onSelectionChange"
        @current-change="methods.onCurrentChange"
        v-bind="$attrs"
    >
        <el-table-column type="index" :index="methods.indexFun" width="50" align="center" v-if="baseConfig.index" />
        <template v-if="selection != ''">
            <el-table-column type="selection" width="50" align="center" v-if="selection == 'checkbox'" />
            <el-table-column width="50" align="center" v-if="selection == 'radio'">
                <template #default="scope">
                    <el-radio :value="scope.row[baseConfig['row-key'] as string]" v-model="selectionValue"> </el-radio>
                </template>
            </el-table-column>
        </template>

        <ColumnChild :columns="columns">
            <template v-for="item in slotList" #[item]="scope">
                <slot :name="item" :data="scope.data"></slot>
            </template>
        </ColumnChild>

        <slot name="columns"></slot>
    </el-table>

    <template v-if="baseConfig.pagination">
        <el-pagination
            :style="{ marginTop: '16px' }"
            :class="basePagination.className"
            :total="basePagination.total"
            :current-page="basePagination.pageIndex"
            :page-size="basePagination.pageSize"
            :layout="basePagination.layout"
            @current-change="methods.handleCurrentChange"
            @size-change="methods.handleSizeChange"
        />
    </template>
</template>

<script lang="ts" setup>
import { ref, defineProps, watch } from 'vue'
import { Config } from './definitions'
import { merge } from 'lodash-es'
import ColumnChild from './ColumnChild.vue'

let props = defineProps<{
    config: Config,
    columns: any[],
    tableData: any[],
    functions: any
}>()

let baseConfig = ref<Config>({
    'row-key': '',
    pagination: false,
    index: false,
    selection: ''
})

let basePagination = ref({
    pageIndex: 1,
    pageSize: 10,
    total: 0,
    layout: 'total, sizes, prev, pager, next, jumper',
    className: 'y-pagination'
})

let selection = ref(''), slotList = ref<string[]>([]), selectionValue = ref<any>()

let methods = {
    indexFun(index: number) {
        let { pagination } = baseConfig.value
        let { pageIndex, pageSize } = basePagination.value

        return pagination ? ((pageIndex as number) - 1) * (pageSize as number) + index + 1 : index + 1
    },
    setPagination(value: Config) {
        let { pageIndex, pageSize, total, layout, className } = value
        if(pageIndex) {
            basePagination.value.pageIndex = pageIndex
        }

        if(pageSize) {
            basePagination.value.pageSize = pageSize
        }

        if(total != undefined) {
            basePagination.value.total = total
        }

        if(layout != undefined) {
            basePagination.value.layout = layout
        }

        if(className != '') {
            basePagination.value.className = className as string
        }
    },
    handleCurrentChange(val: number) {
        if (props.functions && props.functions.handleCurrentChange) {
            props.functions.handleCurrentChange(val)
        }
    },
    handleSizeChange(val: number) {
        if (props.functions && props.functions.handleSizeChange) {
            props.functions.handleSizeChange(val)
        }
    },
    onCurrentChange(val: any) {
        // 单选
        selectionValue.value = val

        if (props.functions && props.functions.onCurrentChange) {
            props.functions.onCurrentChange(val)
        }
    },
    onSelectionChange(val) {
        // 多选
        selectionValue.value = val

        if (props.functions && props.functions.onSelectionChange) {
            props.functions.onSelectionChange(val)
        }
    }
}

watch(
    () => props.config,
    (value) => {
        baseConfig.value = merge(baseConfig.value, value)
        value.pagination && methods.setPagination(value)

        selectionValue.value = null
        // 赋值
        selection.value = baseConfig.value.selection as string
    },
    {
        immediate: true,
        deep: true
    }
)

watch(
    () => props.columns,
    (value) => {
        slotList.value = value.filter((item: any) => item.scopedSlots).map((item: any) => item.scopedSlots as string)
    },
    {
        immediate: true,
        deep: true
    }
)

defineExpose({
    getSelection: () => selectionValue.value
})
</script>

<style scoped lang="scss"></style>