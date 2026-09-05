<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { useUserStore } from '../stores/user.js'
import { brand } from '../content/landing.content.js'
import axios from 'axios'

const userStore = useUserStore()
const router = useRouter()

async function logout() {
  try {
    await axios.post('/api/auth/logout')
    router.push('/')
  } catch (err) {
    console.error(err)
  }
}
</script>
<template>
  <header
    class="sticky top-0 z-40 border-b border-line bg-paper/80 backdrop-blur-md transition-all duration-300 hover:bg-paper/95 hover:shadow-sm"
  >
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
      <!-- Logo -->
      <RouterLink
        to="/home"
        class="group flex items-center font-serif text-lg font-semibold text-ink transition-all duration-200 hover:opacity-80 active:scale-95"
      >
        <slot name="logo">{{ brand.name }}</slot>
      </RouterLink>

      <div class="flex items-center gap-3 sm:gap-4">
        <!-- Streak -->
        <div
          class="group flex items-center gap-1.5 rounded-full border border-line bg-panel px-3 py-1.5 shadow-sm transition-all duration-200 hover:border-orange-300 hover:bg-orange-50/50 hover:shadow"
          title="Your current streak"
        >
          <svg
            class="h-4 w-4 text-orange-500 transition-transform duration-300 group-hover:scale-125 group-hover:animate-bounce"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M12.5 2c.3 2.6-.6 4.4-2.2 6-1.7 1.7-3 3.3-3 5.8a4.7 4.7 0 0 0 9.4 0c0-1-.3-1.8-.8-2.6.9.5 1.6 1.4 1.9 2.6.2.7.3 1.5.3 2.2A6.6 6.6 0 0 1 5 15.8c0-3 1.6-4.9 3.4-6.6C10.2 7.6 12.8 5.4 12.5 2Z"
            />
          </svg>
          <span class="font-mono-tight text-sm font-medium text-ink transition-colors group-hover:text-orange-600">
            {{ userStore.streak }}
          </span>
        </div>

        <!-- Profile -->
        <RouterLink
          to="/profile"
          class="group flex items-center gap-2.5 rounded-full border border-line bg-transparent py-1 pl-1 pr-3 transition-all duration-200 hover:border-accent hover:bg-panel hover:shadow-sm active:scale-95"
        >
          <div class="relative overflow-hidden rounded-full">
            <img
              v-if="userStore.avatarUrl"
              :src="userStore.avatarUrl"
              :alt="userStore.name"
              class="h-7 w-7 rounded-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <span
              v-else
              class="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-semibold text-ink transition-transform duration-300 group-hover:scale-110"
            >
              {{ userStore.name?.charAt(0).toUpperCase() || '?' }}
            </span>
          </div>

          <span class="hidden text-left sm:block">
            <span class="block text-sm font-medium leading-tight text-ink transition-colors group-hover:text-black">
              {{ userStore.name || '' }}
            </span>
            <span v-if="userStore.targetExam" class="block text-xs leading-tight text-ink-soft">
              {{ userStore.targetExam || '' }}
            </span>
          </span>
        </RouterLink>

        <!-- Logout Button -->
        <button
          type="button"
          class="group flex items-center gap-1.5 rounded-full border border-line bg-transparent px-3 py-1.5 text-sm font-medium text-ink transition-all duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-600 active:scale-95"
          @click="logout"
        >
          <svg
            class="h-4 w-4 text-ink-soft transition-colors duration-200 group-hover:text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span class="hidden sm:inline">Logout</span>
        </button>
      </div>
    </div>
  </header>
</template>