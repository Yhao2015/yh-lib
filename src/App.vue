<template>
    <div class="jw-doc">
        <aside>
            <router-link v-for="(link, index) in data.links" :key="index" :to="link.path">{{ link.name }}</router-link>
        </aside>
        <main>
            <router-view></router-view>
        </main>
    </div>
</template>

<script setup lang="ts">
import ComponentList from '../packages/list.json'
import { reactive } from 'vue'

const data = reactive({
    links: ComponentList.map((item: any) => ({
        path: `/${item.path}`,
        name: item.name
    }))
})
</script>

<style lang="scss">
html,
body {
    margin: 0;
    padding: 0;
}

.jw-doc {
    display: flex;
    min-height: 100vh;

    aside {
        width: 200px;
        padding: 15px;
        border-right: 1px solid #ccc;
        display: flex;
        flex-direction: column;
    }

    main {
        width: 100%;
        flex: 1;
        padding: 15px;
        overflow: hidden;
    }
}
</style>
