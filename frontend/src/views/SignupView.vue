<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { brand } from '../content/landing.content.js'
import MascotGuide from '../components/MascotGuide.vue'
import FormField from '../components/FormField.vue'
import PasswordField from '../components/PasswordField.vue'
import AppButton from '../components/AppButton.vue'
import axios from 'axios'

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const errors = reactive({ name: '', email: '', password: '', confirmPassword: '' })
const submitted = ref(false)
const shake = ref(false)
const formError = ref('')

const activeField = ref(null) // 'name' | 'email' | 'password' | 'confirmPassword' | null
const passwordVisible = ref(false)
const confirmVisible = ref(false)

const mascotState = computed(() => {
  if (activeField.value === 'password') return passwordVisible.value ? 'closed' : 'peeking'
  if (activeField.value === 'confirmPassword') return confirmVisible.value ? 'closed' : 'peeking'
  if (activeField.value === 'name' || activeField.value === 'email') return 'typing'
  return 'idle'
})

function triggerShake() {
  shake.value = true
  setTimeout(() => (shake.value = false), 500)
}

function validate() {
  errors.name = name.value.trim() ? '' : 'Enter your name'
  errors.email = email.value.includes('@') ? '' : 'Enter a valid email address'
  errors.password = password.value.length >= 6 ? '' : 'Use at least 6 characters'
  errors.confirmPassword =
    confirmPassword.value && confirmPassword.value === password.value ? '' : 'Passwords do not match'

  return !errors.name && !errors.email && !errors.password && !errors.confirmPassword
}

async function handleSubmit() {
  formError.value = ''
  const valid = validate()
  if (!valid) {
    triggerShake()
    return
  }

  try {
    console.log("about to make request.")
    const response = await axios.post('/api/auth/register', {
      name: name.value,
      email: email.value,
      password: password.value,
      confirmation: confirmPassword.value
    })

    submitted.value = true
    setTimeout(() => router.replace({name: 'home'}), 1000)

  } catch (err) {
      formError.value = err.response?.data?.error || 'Registration failed'
      console.log(err);
  }
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
        <h1 class="mt-2 text-center font-serif text-2xl font-semibold text-ink">Create your account</h1>
        <p class="mt-1.5 text-center text-sm text-ink-soft">Free forever for PYQ tests. No credit card needed.</p>

        <form class="mt-7 space-y-5" @submit.prevent="handleSubmit">
          <FormField
            id="signup-name"
            v-model="name"
            label="Name"
            placeholder="Your full name"
            autocomplete="name"
            :error="errors.name"
            @focus="activeField = 'name'"
            @blur="activeField = null"
          />

          <FormField
            id="signup-email"
            v-model="email"
            label="Email"
            type="email"
            placeholder="you@example.com"
            autocomplete="email"
            :error="errors.email"
            @focus="activeField = 'email'"
            @blur="activeField = null"
          />

          <PasswordField
            id="signup-password"
            v-model="password"
            label="Password"
            placeholder="At least 6 characters"
            autocomplete="new-password"
            :error="errors.password"
            @focus="activeField = 'password'"
            @blur="activeField = null"
            @visibility-change="(v) => (passwordVisible = v)"
          />

          <PasswordField
            id="signup-confirm-password"
            v-model="confirmPassword"
            label="Confirm password"
            placeholder="Re-enter your password"
            autocomplete="new-password"
            :error="errors.confirmPassword"
            @focus="activeField = 'confirmPassword'"
            @blur="activeField = null"
            @visibility-change="(v) => (confirmVisible = v)"
          />
          
          <Transition
            enter-active-class="error-drop"
            leave-active-class="transition-opacity duration-150"
            leave-to-class="opacity-0"
          >
            <p v-if="formError" class="rounded-md bg-rose-50 px-3 py-2 text-xs text-rose-600">{{ formError }}</p>
          </Transition>

          <AppButton type="submit" variant="dark" show-arrow class="w-full justify-center">Create free account</AppButton>
        </form>

        <p class="mt-6 text-center text-sm text-ink-soft">
          Already have an account?
          <router-link to="/login" class="font-medium text-ink transition-colors hover:text-accent-deep">Log in</router-link>
        </p>
      </div>

      <div v-else class="mt-6 text-center">
        <h1 class="font-serif text-2xl font-semibold text-ink">Account created</h1>
        <p class="mt-2 text-sm text-ink-soft">Taking you to log in…</p>
      </div>
    </div>
  </div>
</template>
