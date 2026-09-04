<script setup>
import { ref } from 'vue'
import { brand } from '../content/landing.content.js'
import FormField from '../components/FormField.vue'
import AppButton from '../components/AppButton.vue'

const email = ref('')
const sent = ref(false)

function handleSubmit() {
  if (!email.value.includes('@')) return
  sent.value = true
}
</script>

<template>
  <div class="ruled-bg flex min-h-screen items-center justify-center px-6 py-16">
    <div class="card-pop-in w-full max-w-sm rounded-xl border border-line bg-paper p-8 shadow-[0_24px_60px_-28px_rgba(20,33,61,0.35)]">
      <router-link to="/" class="flex items-center justify-center gap-2">
        <span class="font-serif text-xl font-semibold text-ink">{{ brand.name }}</span>
        <span class="rounded bg-ink px-1.5 py-0.5 font-mono text-[10px] font-semibold text-paper">{{ brand.badge }}</span>
      </router-link>

      <div v-if="!sent">
        <h1 class="mt-6 text-center font-serif text-2xl font-semibold text-ink">Reset your password</h1>
        <p class="mt-1.5 text-center text-sm text-ink-soft">We'll send a reset link to your email.</p>

        <form class="mt-7 space-y-5" @submit.prevent="handleSubmit">
          <FormField id="forgot-email" v-model="email" label="Email" type="email" placeholder="you@example.com" autocomplete="email" />
          <AppButton type="submit" variant="dark" show-arrow class="w-full justify-center">Send reset link</AppButton>
        </form>

        <p class="mt-6 text-center text-sm text-ink-soft">
          Remembered it?
          <router-link to="/login" class="font-medium text-ink transition-colors hover:text-accent-deep">Log in</router-link>
        </p>
      </div>

      <div v-else class="mt-6 text-center">
        <h1 class="font-serif text-2xl font-semibold text-ink">Check your inbox</h1>
        <p class="mt-2 text-sm text-ink-soft">If an account exists for {{ email }}, a reset link is on its way.</p>
      </div>
    </div>
  </div>
</template>
