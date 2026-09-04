<script setup>
import { brand, footer } from '../content/landing.content.js'
</script>

<template>
  <footer class="border-t border-line bg-paper">
    <div class="mx-auto max-w-6xl px-0 py-5">
      <div class="grid gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
        <div>
          <p class="font-serif text-lg font-semibold text-ink">{{ brand.name }}</p>
          <p class="mt-3 max-w-xs text-sm text-ink-soft">{{ footer.description }}</p>
        </div>

        <div v-for="column in footer.columns" :key="column.heading">
          <p class="text-sm font-medium text-ink">{{ column.heading }}</p>
          <ul class="mt-4 space-y-2.5">
            <li v-for="link in column.links" :key="link.label">
              <router-link :to="link.to" class="nav-underline text-sm text-ink-soft transition-colors hover:text-ink">
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <p class="mt-14 border-t border-line pt-6 text-xs text-ink-soft">{{ footer.copyright }}</p>
    </div>
  </footer>
</template>
