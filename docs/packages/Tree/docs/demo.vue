<template>
    <yh-tree :data="data" :props="props">
        <template #nodeBtn="scope">
            <el-icon @click="(e) => add(e, scope.data)"><Plus /></el-icon>
            <el-icon><Minus /></el-icon>
        </template>
    </yh-tree>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Minus } from '@element-plus/icons-vue'
let data = ref<any>([]),
    props = { children: 'children', label: 'label' }
let getTreeData = () => {
    setTimeout(() => {
        data.value = [
            {
                label: 'Level one 1',
                children: [
                    {
                        label: 'Level two 1-1',
                        children: [
                            {
                                label: 'Level three 1-1-1'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Level one 2',
                children: [
                    {
                        label: 'Level two 2-1',
                        children: [
                            {
                                label: 'Level three 2-1-1'
                            }
                        ]
                    },
                    {
                        label: 'Level two 2-2',
                        children: [
                            {
                                label: 'Level three 2-2-1'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Level one 3',
                children: [
                    {
                        label: 'Level two 3-1',
                        children: [
                            {
                                label: 'Level three 3-1-1'
                            }
                        ]
                    },
                    {
                        label: 'Level two 3-2',
                        children: [
                            {
                                label: 'Level three 3-2-1'
                            }
                        ]
                    }
                ]
            }
        ]
    }, 100)
}

let add = (e, node) => {
    e.stopPropagation()
    console.log(node)
}

getTreeData()
</script>
