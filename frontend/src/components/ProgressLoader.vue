<script setup>
defineProps({
  label: { type: String, default: 'Fetching your progress' },
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-6 py-10">
    <div class="relative h-32 w-32">
      <!-- outer ring -->
      <div class="absolute inset-0 rounded-full border-2 border-line/40 loader-spin-slow"></div>
      <!-- mid ring, opposite direction -->
      <div class="absolute inset-3 rounded-full border-2 border-dashed border-accent-deep/50 loader-spin-reverse"></div>
      <!-- inner ring -->
      <div class="absolute inset-8 rounded-full border-2 border-accent-deep loader-spin-fast"></div>

      <!-- orbiting dots -->
      <div class="absolute inset-0 loader-spin-slow">
        <span class="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-deep loader-pulse"></span>
      </div>
      <div class="absolute inset-0 loader-spin-reverse">
        <span class="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-deep/70 loader-pulse"></span>
      </div>

      <!-- glowing core -->
      <div class="absolute inset-0 flex items-center justify-center">
        <span class="h-4 w-4 rounded-full bg-accent-deep loader-core"></span>
      </div>
    </div>

    <p class="font-mono-tight text-xs uppercase tracking-widest text-ink-soft">
      {{ label }}<span class="loader-dots"></span>
    </p>
  </div>
</template>

<style scoped>
.loader-spin-slow {
  animation: spin 3.2s linear infinite;
}
.loader-spin-reverse {
  animation: spin-reverse 2.2s linear infinite;
}
.loader-spin-fast {
  animation: spin 1.1s linear infinite;
}
.loader-pulse {
  animation: pulse-glow 1.4s ease-in-out infinite;
}
.loader-core {
  animation: core-beat 1.2s ease-in-out infinite, core-glow 1.2s ease-in-out infinite;
}
.loader-dots::after {
  display: inline-block;
  width: 1.2em;
  text-align: left;
  content: '';
  animation: dots 1.4s steps(4, end) infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes spin-reverse {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}
@keyframes pulse-glow {
  0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(0.8); }
  50% { opacity: 1; transform: translate(-50%, -50%) scale(1.4); }
}
@keyframes core-beat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.35); }
}
@keyframes core-glow {
  0%, 100% { box-shadow: 0 0 0px 0px rgba(20, 33, 61, 0.0); }
  50% { box-shadow: 0 0 18px 6px rgba(20, 33, 61, 0.25); }
}
@keyframes dots {
  0% { content: ''; }
  25% { content: '.'; }
  50% { content: '..'; }
  75% { content: '...'; }
  100% { content: ''; }
}
</style>
