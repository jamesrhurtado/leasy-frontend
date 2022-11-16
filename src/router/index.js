import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: 'home'
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/home/pages/home.component.vue')
    },
    {
      path: '/information',
      name: 'Information',
      component: () => import('@/home/pages/information.component.vue')
    },
    {
      path: '/sign-in',
      name: 'Sign In',
      component: () => import('@/accounts/pages/sign-in.component.vue')
    },
    {
      path: '/sign-up',
      name: 'Sign Up',
      component: () => import('@/accounts/pages/sign-up.component.vue')
    },
    {
      path: '/my-profile',
      name: 'Profile',
      component: () => import('@/accounts/pages/user-profile.component.vue')
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import('@/accounts/pages/user-settings.component.vue')
    },
    {
      path: '/calculator',
      name: 'Calculator',
      component: () => import('@/reports/pages/calculator.component.vue')
    },
    {
      path: '/reports',
      name: 'Reports',
      component: () => import('@/reports/pages/reports.component.vue')
    },
    {
      path: '/header',
      name: 'Header',
      component: () => import('@/components/header.component.vue')
    },
  ]
})

export default router
