<template>
    <el-tree :data="props.data" highlight-current v-bind="$attrs" ref="treeRef">
        <template #default="{ node }">
            <div class="custom-tree-node">
                <span>{{ node.label }}</span>
                <el-space v-if="node.isCurrent">
                    <slot name="nodeBtn" :data="node"></slot>
                </el-space>
            </div>
        </template>
    </el-tree>
</template>

<script lang="ts" setup>
// import { merge } from 'lodash-es'
import { ref, defineProps } from 'vue'

let treeRef = ref()
let props = defineProps<{
    data: any[]
}>()
</script>

<style scoped lang="scss">
.custom-tree-node {
    width: calc(100% - 30px);
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
