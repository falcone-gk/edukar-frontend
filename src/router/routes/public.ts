import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('@/layouts/HomeLayout.vue'),
        children:[
            {
                path: '',
                name: 'home',
                component: () => import('@/pages/Home.vue')
            }
        ]
    },
    {
        path: '/account',
        component: () => import('@/layouts/Default.vue'),
        children:[
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
            {
                path: 'after-signup',
                name: 'after-signup',
                component: () => import('@/pages/Account/AfterSignup.vue')
            },
            {
                path: 'activate/:uid/:token',
                name: 'activate',
                component: () => import('@/pages/Account/Activate.vue')
            },
            {
                path: 'reset-password',
                name: 'reset-password',
                component: () => import('@/pages/Account/ResetPassword.vue')
            },
            {
                path: 'after-reset-password',
                name: 'after-reset-password',
                component: () => import('@/pages/Account/AfterResetPassword.vue')
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
    {
        path: '/services',
        component: () => import('@/layouts/Default.vue'),
        children:[
            {
                path: '',
                name: 'services',
                component: () => import('@/pages/Services/Services.vue')
            },
        ]
    },
]

export default routes