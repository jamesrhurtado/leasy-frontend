import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../accounts/pages/sign-in.component.vue')
    },
    {
      path: '/sign-in',
      name: 'Sign In',
      component: () => import('../accounts/pages/sign-in.component.vue')
    },
    {
      path: '/sign-up',
      name: 'Sign Up',
      component: () => import('../accounts/pages/sign-up.component.vue')
    }
  ]
})

export default router
