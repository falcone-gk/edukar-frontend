import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes/index'
import { useAuthStore } from '../stores/auth';

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  linkActiveClass: 'text-black h-full w-full border-b-4 border-b-primary-color'
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const authenticatedUser = authStore.isAuthenticated;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && ! authenticatedUser) next({name: 'login'})
  else next();
});

export default router