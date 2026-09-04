<script setup>
defineProps({
  name: { type: String, required: true },
  handle: { type: String, required: true },
  body: { type: String, required: true },
})

// Small deterministic set of avatar tints so each card reads distinctly
// without needing real photos.
const tints = ['bg-card-blue', 'bg-card-orange', 'bg-card-green', 'bg-card-lavender', 'bg-card-pink', 'bg-ink']
function tintFor(name) {
  const sum = [...name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0)
  return tints[sum % tints.length]
}
</script>

<template>
  <article
    class="w-[300px] shrink-0 mt-1 rounded-xl border border-line bg-paper p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-ink hover:shadow-[0_16px_32px_-16px_rgba(20,33,61,0.35)]"
  >
    <div class="flex items-center gap-3">
      <span
        class="flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-white"
        :class="tintFor(name)"
      >
        {{ name.charAt(0) }}
      </span>
      <div>
        <p class="text-sm font-medium text-ink">{{ name }}</p>
        <p class="text-xs text-ink-soft">{{ handle }}</p>
      </div>
    </div>
    <p class="mt-4 text-sm leading-relaxed text-ink-soft">{{ body }}</p>
  </article>
</template>
