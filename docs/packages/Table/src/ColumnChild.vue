<template>
    <el-table-column
        v-for="column in columns"
        :key="column.dataIndex"
        :prop="column.dataIndex"
        :label="column.title"
        :width="column.width"
        :fixed="column.fixed"
        :sortable="column.sortable"
        :resizable="column.resizable"
        :align="column.align"
        :class-name="column.className"
    >
        <template #default="scope" v-if="column.scopedSlots">
            <slot :name="column.scopedSlots" :data="scope.row" />
        </template>

        <template v-if="column.children ?.length">
            <ColumnChild v-if="column.children ?.length" :columns="column.children" />
        </template>
    </el-table-column>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
defineProps<{
    columns: any[]
}>()
</script>