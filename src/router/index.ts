import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes/index'

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  linkActiveClass: 'flex justify-center items-center text-black h-full w-full border-b-4 border-b-indigo-500'
})

export default router