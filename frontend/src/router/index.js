import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import axios from 'axios'

const routes = [
  {
    path: '/',
    name: 'landing',
    component: LandingPage,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignupView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('../views/ForgotPasswordView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { requiresAuth: true },
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.beforeEach(async (to, from) => {
  console.log("Navigating to:", to.name, "from:", from.name);
  if (to.meta.requiresAuth) {
    const isAuthenticated = await check_me();
    console.log("Isauthenticated: ", isAuthenticated);

    if (!isAuthenticated) {
      console.log("User is not authenticated. Redirecting to login.");
      return { name: 'login' }
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

