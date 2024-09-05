import { createRouter, createWebHistory, RouterOptions } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: {
            name: 'Table'
        }
    },
    {
        title: '表格',
        name: 'Table',
        path: '/Table',
        component: () => import('packages/Table/docs/README.md')
    },
    {
        title: '弹框',
        name: 'Dialog',
        path: '/Dialog',
        component: () => import('packages/Dialog/docs/README.md')
    },
    {
        title: '表单',
        name: 'Form',
        path: '/Form',
        component: () => import('packages/Form/docs/README.md')
    },
    {
        title: '树形控件',
        name: 'Tree',
        path: '/Tree',
        component: () => import('packages/Tree/docs/README.md')
    },
    {
        title: '动态表单',
        name: 'DynamicForm',
        path: '/DynamicForm',
        component: () => import('packages/DynamicForm/docs/README.md')
    },
    {
        title: '抽屉',
        name: 'Drawer',
        path: '/Drawer',
        component: () => import('packages/Drawer/docs/README.md')
    },
    {
        title: '增删改查页面',
        name: 'FormTable',
        path: '/FormTable',
        component: () => import('packages/FormTable/docs/README.md')
    },
    {
        title: 'Grid',
        name: 'Grid',
        path: '/Grid',
        component: () => import('packages/Grid/docs/README.md')
    }
]

const routerConfig = {
    history: createWebHistory(),
    routes,
    scrollBehavior(to: any, from: any) {
        if (to.path !== from.path) {
            return { top: 0 }
        }
    }
}

export default createRouter(routerConfig as RouterOptions)
