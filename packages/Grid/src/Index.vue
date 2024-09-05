<template>
    <div class="yh-grid" :style="{ 'grid-template-columns': methods.setColumns(), 'grid-template-rows': methods.setRows() }">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
let props = defineProps({
    gap: {
        type: String,
        default: '16px'
    },
    columns: {
        type: Number,
        default: 1
    },
    rows: {
        type: Number,
        default: 1
    }
})


let methods = {
    setColumns() {
        let type = typeof props.columns
        if (type == 'number') {
            return props.columns == 1 ? 'auto' : `repeat(${props.columns}, 1fr)`
        } else if (type == 'string') {
            return props.columns
        } else {
            return 'auto'
        }
    },
    setRows() {
        let type = typeof props.rows
        if (type == 'number') {
            return props.rows == 1 ? 'auto' : `repeat(${props.rows}, 1fr)`
        } else if (type == 'string') {
            return props.rows
        } else {
            return 'auto'
        }
    }
}
</script>

<style lang="scss" scoped>
.yh-grid {
    display: grid;
    grid-gap: v-bind(gap);
    width: 100%;
    height: 100%;

    :deep(>div) {
        border-radius: 4px;
        backdrop-filter: blur(10px);
    }
}

</style>