<script setup>
defineProps({
  duration: { type: Number, default: 32 },
  reverse: { type: Boolean, default: false },
  gap: { type: String, default: 'gap-10' },
})
</script>

<template>
  <div class="marquee-pause relative overflow-hidden">
    <div class="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-paper to-transparent" />
    <div class="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper to-transparent" />

    <div
      class="marquee-track flex w-max"
      :class="gap"
      :data-reverse="reverse"
      :style="{ '--marquee-duration': duration + 's' }"
    >
      <!-- rendered twice back-to-back so the loop is seamless -->
      <div class="flex shrink-0" :class="gap">
        <slot />
      </div>
      <div class="flex shrink-0" :class="gap" aria-hidden="true">
        <slot />
      </div>
    </div>
  </div>
</template>
