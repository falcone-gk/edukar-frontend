import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('@/layouts/Default.vue'),
        children:[
            {
                path: '',
                name: 'home',
                component: () => import('@/pages/Home.vue')
            }
        ]
    },
    {
        path: '/foro',
        component: () => import('@/layouts/Default.vue'),
        children:[
            {
                path: '',
                name: 'forum',
                component: () => import('@/pages/Forum/Forum.vue')
            },
            {
                path: '/new-post',
                name: 'new-post',
                component: () => import('@/pages/Forum/NewPost.vue')
            }
        ]
    },
]

export default routes