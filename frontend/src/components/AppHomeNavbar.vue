<script setup>
import { RouterLink } from 'vue-router'
import { useUserStore } from '../stores/user.js'

const userStore = useUserStore()
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
      <!-- Logo -->
      <RouterLink to="/home" class="font-serif text-lg font-semibold text-ink">
        <slot name="logo">Brand</slot>
      </RouterLink>

      <div class="flex items-center gap-4">
        <!-- Streak -->
        <div
          class="flex items-center gap-1.5 rounded-full border border-line bg-panel px-3 py-1.5"
          title="Your current streak"
        >
          <svg class="h-4 w-4 text-orange-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path
              d="M12.5 2c.3 2.6-.6 4.4-2.2 6-1.7 1.7-3 3.3-3 5.8a4.7 4.7 0 0 0 9.4 0c0-1-.3-1.8-.8-2.6.9.5 1.6 1.4 1.9 2.6.2.7.3 1.5.3 2.2A6.6 6.6 0 0 1 5 15.8c0-3 1.6-4.9 3.4-6.6C10.2 7.6 12.8 5.4 12.5 2Z"
            />
          </svg>
          <span class="font-mono-tight text-sm font-medium text-ink">{{ userStore.streak }}</span>
        </div>

        <!-- Profile -->
        <RouterLink
          to="/profile"
          class="flex items-center gap-2.5 rounded-full border border-line py-1 pl-1 pr-3 transition-colors hover:bg-panel"
        >
          <img
            v-if="userStore.avatarUrl"
            :src="userStore.avatarUrl"
            :alt="userStore.name"
            class="h-7 w-7 rounded-full object-cover"
          />
          <span
            v-else
            class="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-semibold text-ink"
          >
            {{ userStore.name?.charAt(0).toUpperCase() || '?' }}
          </span>
          <span class="hidden text-left sm:block">
            <span class="block text-sm font-medium leading-tight text-ink">{{ userStore.name || 'Your name' }}</span>
            <span class="block text-xs leading-tight text-ink-soft">{{ userStore.targetExam || 'Target exam' }}</span>
          </span>
        </RouterLink>
      </div>
    </div>
  </header>
</template>
