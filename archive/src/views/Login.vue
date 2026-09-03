<template>
  <div class="min-h-screen bg-slate-950 text-white">

    <!-- Navbar -->
    <nav class="border-b border-slate-800 bg-slate-950/90">
      <div class="flex items-center justify-between px-6 py-5 lg:px-10">

        <div class="text-2xl font-bold">
          ADYSHA<span class="text-indigo-400"> AI</span>
        </div>

      </div>
    </nav>


    <!-- Main -->
    <main class="mx-auto flex max-w-md flex-col justify-center px-6 py-16">

      <h1 class="text-3xl font-bold">
        Welcome back
      </h1>

      <p class="mt-2 text-slate-400">
        Log in to continue your prep.
      </p>


      <form @submit.prevent="handleLogin" class="mt-8 space-y-4">

        <div>
          <label class="text-sm text-slate-400">
            Email
          </label>
          <input
            v-model="form.email"
            type="email"
            class="mt-1 w-full rounded-xl border border-slate-800
                   bg-slate-900 px-4 py-3 text-sm outline-none
                   focus:border-indigo-500"
          />
        </div>

        <div>
          <label class="text-sm text-slate-400">
            Password
          </label>
          <input
            v-model="form.password"
            type="password"
            class="mt-1 w-full rounded-xl border border-slate-800
                   bg-slate-900 px-4 py-3 text-sm outline-none
                   focus:border-indigo-500"
          />
        </div>

        <p v-if="error" class="text-sm text-red-400">
          {{ error }}
        </p>

        <button
          type="submit"
          :disabled="loading"
          class="w-full rounded-xl bg-indigo-500 py-3 text-sm
                 font-semibold hover:bg-indigo-400
                 disabled:opacity-50"
        >
          {{ loading ? 'Logging in...' : 'Log In' }}
        </button>

      </form>

      <p class="mt-6 text-center text-sm text-slate-400">
        Don't have an account?
        <router-link to="/register" class="text-indigo-400 hover:text-indigo-300">
          Register
        </router-link>
      </p>

    </main>

  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const form = reactive({
  email: '',
  password: ''
})

const loading = ref(false)
const error = ref('')

async function handleLogin() {

  error.value = ''
  loading.value = true

  try {

    const response = await axios.post(
      '/api/auth/login',
      {
        email: form.email,
        password: form.password
      },
      { withCredentials: true }
    )

    router.replace('/dashboard')

  } catch (err) {

    error.value = err.response?.data?.error || 'Login failed'

  } finally {

    loading.value = false

  }

}
</script>