import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('@/layouts/Default.vue'),
        children:[
            {
                path: 'home',
                name: 'home',
                component: () => import('@/pages/Home.vue')
            }
        ]
    }
]

export default routes