<template>
    <div class="main">
        <yh-grid :columns="4" :rows="2">
            <div class="gridDiv" v-for="i in 7">{{ i }}</div>
        </yh-grid>
    </div>
</template>

<script setup lang="ts">
console.log(window.$utils)
</script>

<style lang="scss" scoped>
.main {
    width: 100%;
    height: 500px;
}

.gridDiv {
    background-color: aqua;
}
</style>