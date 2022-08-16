import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes/index'

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  linkActiveClass: 'text-white'
})

export default router