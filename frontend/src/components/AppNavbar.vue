<script setup>
import { ref } from 'vue'
import { brand, nav, announcement } from '../content/landing.content.js'
import AppButton from './AppButton.vue'

const menuOpen = ref(false)
const subjectsOpen = ref(false)
const bannerVisible = ref(true)
let closeTimer = null

function openSubjects() {
  clearTimeout(closeTimer)
  subjectsOpen.value = true
}
function scheduleCloseSubjects() {
  closeTimer = setTimeout(() => (subjectsOpen.value = false), 150)
}
</script>

<template>
  <div>
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="-translate-y-full opacity-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-to-class="-translate-y-full opacity-0"
    >
      <div v-if="bannerVisible" class="relative z-[60] bg-ink text-paper">
        <div class="mx-auto flex max-w-6xl items-center justify-center gap-2 px-6 py-2 text-center text-xs">
          <span class="rounded bg-accent px-1.5 py-0.5 font-mono font-semibold text-ink">{{ announcement.label }}</span>
          <span>{{ announcement.text }}</span>
          <a :href="announcement.cta.href" class="nav-underline font-medium text-accent">{{ announcement.cta.label }} &rarr;</a>
          <button
            class="absolute right-4 text-paper/60 transition-colors hover:text-paper"
            aria-label="Dismiss announcement"
            @click="bannerVisible = false"
          >
            &times;
          </button>
        </div>
      </div>
    </Transition>

    <header class="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <router-link to="/" class="flex items-center gap-2">
          <span class="font-serif text-xl font-semibold tracking-tight text-ink">{{ brand.name }}</span>
          <span class="rounded bg-ink px-1.5 py-0.5 font-mono text-[10px] font-semibold text-paper">{{ brand.badge }}</span>
        </router-link>

        <nav class="hidden items-center gap-8 md:flex">
          <div
            class="relative"
            @mouseenter="openSubjects"
            @mouseleave="scheduleCloseSubjects"
          >
            <button
              class="nav-underline flex items-center gap-1 text-sm text-ink-soft transition-colors hover:text-ink"
              :class="{ 'text-ink': subjectsOpen }"
              @click="subjectsOpen = !subjectsOpen"
            >
              {{ nav.learningMenu.label }}
              <svg
                class="h-3 w-3 transition-transform duration-300"
                :class="{ 'rotate-180': subjectsOpen }"
                viewBox="0 0 10 10"
                fill="none"
              >
                <path d="M2 3.5 5 6.5 8 3.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>

            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 -translate-y-2 scale-95"
              leave-active-class="transition-all duration-150 ease-in"
              leave-to-class="opacity-0 -translate-y-2 scale-95"
            >
              <div
                v-if="subjectsOpen"
                class="absolute left-1/2 top-full mt-3 w-64 -translate-x-1/2 rounded-lg border border-line bg-paper p-2 shadow-[0_16px_40px_-16px_rgba(20,33,61,0.4)]"
              >
                <router-link
                  v-for="item in nav.learningMenu.items"
                  :key="item.label"
                  :to="item.to"
                  class="flex items-center justify-between rounded-md px-3 py-2.5 text-sm text-ink-soft transition-colors hover:bg-panel hover:text-ink"
                  @click="subjectsOpen = false"
                >
                  <span>{{ item.label }}</span>
                  <span class="font-mono text-[10px] uppercase tracking-wide text-ink-soft/70">{{ item.hint }}</span>
                </router-link>
              </div>
            </Transition>
          </div>

          <a
            v-for="link in nav.links"
            :key="link.label"
            :href="link.href"
            class="nav-underline text-sm text-ink-soft transition-colors hover:text-ink"
          >
            {{ link.label }}
          </a>
        </nav>

        <div class="hidden items-center gap-3 md:flex">
          <router-link
            :to="nav.login.to"
            class="rounded-md px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink"
          >
            {{ nav.login.label }}
          </router-link>
          <AppButton :to="nav.signup.to" variant="dark">{{ nav.signup.label }}</AppButton>
        </div>

        <button
          class="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
          @click="menuOpen = !menuOpen"
        >
          <span class="h-0.5 w-6 bg-ink transition-transform duration-200" :class="{ 'translate-y-2 rotate-45': menuOpen }"></span>
          <span class="h-0.5 w-6 bg-ink transition-opacity duration-200" :class="{ 'opacity-0': menuOpen }"></span>
          <span class="h-0.5 w-6 bg-ink transition-transform duration-200" :class="{ '-translate-y-2 -rotate-45': menuOpen }"></span>
        </button>
      </div>

      <Transition
        enter-active-class="transition-all duration-250 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        leave-active-class="transition-all duration-150 ease-in"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="menuOpen" class="border-t border-line px-6 py-4 md:hidden">
          <nav class="flex flex-col gap-4">
            <a
              v-for="link in nav.links"
              :key="link.label"
              :href="link.href"
              class="text-sm text-ink-soft"
              @click="menuOpen = false"
            >
              {{ link.label }}
            </a>
            <router-link :to="nav.login.to" class="text-sm text-ink-soft">{{ nav.login.label }}</router-link>
            <AppButton :to="nav.signup.to" variant="dark" class="justify-center">{{ nav.signup.label }}</AppButton>
          </nav>
        </div>
      </Transition>
    </header>
  </div>
</template>
