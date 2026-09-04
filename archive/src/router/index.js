import { createRouter, createWebHistory } from 'vue-router'
import axios from 'axios'

import Home from '../views/Home.vue'
import Setup from '../views/Setup.vue'
import Dashboard from '../views/Dashboard.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: false }
    },
    {
      path: '/setup',
      name: 'Setup',
      component: Setup,
      meta: { requiresAuth: true }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: { requiresAuth: false }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: { requiresAuth: false }
    }
  ]
})

router.beforeEach(async (to, from) => {
  console.log("Navigating to:", to.name, "from:", from.name);
  if (to.meta.requiresAuth) {
    const isAuthenticated = await check_me();
    console.log("Isauthenticated: ", isAuthenticated);

    if (!isAuthenticated) {
      return { name: 'Login' }
    }
  }
})

async function check_me() {
  try {
    console.log("Running check_me()");

    let response = await axios.get('/api/auth/me', {}, { withCredentials: true })

    console.log("Response from /api/auth/me:", response.data);

    return true;

  } catch (error) {

    console.log("Error checking authentication:", error.response.data);
    return false;
  }
}

export default router