<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { brand } from '../content/landing.content.js'
import MascotGuide from '../components/MascotGuide.vue'
import FormField from '../components/FormField.vue'
import PasswordField from '../components/PasswordField.vue'
import AppButton from '../components/AppButton.vue'

const router = useRouter()

const email = ref('')
const password = ref('')
const emailError = ref('')
const formError = ref('')
const wrongAttempts = ref(0)
const submitted = ref(false)
const shake = ref(false)

// Demo-only credential check — there's no backend here yet, so this just
// lets the flow (including the "forgot password" reveal) be demoed end to end.
const DEMO_EMAIL = 'demo@adysha.com'
const DEMO_PASSWORD = 'demo1234'

const activeField = ref(null) // 'email' | 'password' | null
const passwordVisible = ref(false)

const mascotState = computed(() => {
  if (activeField.value === 'password') return passwordVisible.value ? 'closed' : 'peeking'
  if (activeField.value === 'email') return 'typing'
  return 'idle'
})

function triggerShake() {
  shake.value = true
  setTimeout(() => (shake.value = false), 500)
}

function handleSubmit() {
  emailError.value = ''
  formError.value = ''

  if (!email.value || !email.value.includes('@')) {
    emailError.value = 'Enter a valid email address'
    return
  }

  const isCorrect = email.value.trim().toLowerCase() === DEMO_EMAIL && password.value === DEMO_PASSWORD

  if (isCorrect) {
    submitted.value = true
    setTimeout(() => router.push('/'), 900)
    return
  }

  wrongAttempts.value += 1
  formError.value = 'Incorrect email or password. Try again.'
  triggerShake()
}
</script>

<template>
  <div class="ruled-bg flex min-h-screen items-center justify-center px-6 py-16">
    <div class="card-pop-in w-full max-w-sm rounded-xl border border-line bg-paper p-8 shadow-[0_24px_60px_-28px_rgba(20,33,61,0.35)]" :class="{ 'shake-x': shake }">
      <router-link to="/" class="flex items-center justify-center gap-2">
        <span class="font-serif text-xl font-semibold text-ink">{{ brand.name }}</span>
        <span class="rounded bg-ink px-1.5 py-0.5 font-mono text-[10px] font-semibold text-paper">{{ brand.badge }}</span>
      </router-link>

      <MascotGuide :state="mascotState" :shake="shake" class="mt-4" />

      <div v-if="!submitted">
        <h1 class="mt-2 text-center font-serif text-2xl font-semibold text-ink">Welcome back</h1>
        <p class="mt-1.5 text-center text-sm text-ink-soft">Log in to pick up where you left off.</p>

        <form class="mt-7 space-y-5" @submit.prevent="handleSubmit">
          <FormField
            id="login-email"
            v-model="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            autocomplete="email"
            :error="emailError"
            @focus="activeField = 'email'"
            @blur="activeField = null"
          />

          <PasswordField
            id="login-password"
            v-model="password"
            label="Password"
            placeholder="Enter your password"
            autocomplete="current-password"
            @focus="activeField = 'password'"
            @blur="activeField = null"
            @visibility-change="(v) => (passwordVisible = v)"
          >
            <template v-if="wrongAttempts > 0" #side-label>
              <router-link to="/forgot-password" class="text-xs font-medium text-accent-deep transition-colors hover:text-ink">
                Forgot password?
              </router-link>
            </template>
          </PasswordField>

          <Transition
            enter-active-class="error-drop"
            leave-active-class="transition-opacity duration-150"
            leave-to-class="opacity-0"
          >
            <p v-if="formError" class="rounded-md bg-rose-50 px-3 py-2 text-xs text-rose-600">{{ formError }}</p>
          </Transition>

          <AppButton type="submit" variant="dark" show-arrow class="w-full justify-center">Log in</AppButton>
        </form>

        <p class="mt-6 text-center text-xs text-ink-soft">
          Demo credentials — <span class="font-mono text-ink">demo@adysha.com</span> / <span class="font-mono text-ink">demo1234</span>
        </p>

        <p class="mt-4 text-center text-sm text-ink-soft">
          New to Adysha?
          <router-link to="/signup" class="font-medium text-ink transition-colors hover:text-accent-deep">Sign up free</router-link>
        </p>
      </div>

      <div v-else class="mt-6 text-center">
        <h1 class="font-serif text-2xl font-semibold text-ink">You're in</h1>
        <p class="mt-2 text-sm text-ink-soft">Taking you to Adysha…</p>
      </div>
    </div>
  </div>
</template>
