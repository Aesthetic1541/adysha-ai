import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Setup from '../views/Setup.vue'
import Dashboard from '../views/Dashboard.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/setup',
      name: 'Setup',
      component: Setup
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})

export default router