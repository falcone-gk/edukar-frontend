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
            },
            {
                path: 'login',
                name: 'login',
                component: () => import('@/pages/Account/Login.vue')
            },
            {
                path: 'signup',
                name: 'signup',
                component: () => import('@/pages/Account/Signup.vue')
            },
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
                path: 'new-post',
                name: 'new-post',
                component: () => import('@/pages/Forum/NewPost.vue')
            },
            {
                path: 'post/:slug',
                name: 'post',
                component: () => import('@/pages/Forum/Post.vue')
            },
        ]
    },
]

export default routes