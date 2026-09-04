<script setup>
defineProps({
  to: { type: String, required: true },
  tone: { type: String, required: true },
  code: { type: String, required: true },
  tag: { type: String, default: '' },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  bullets: { type: Array, default: () => [] },
  meta: { type: String, default: '' },
  soon: { type: Boolean, default: false },
})

const toneClasses = {
  blue: 'bg-card-blue text-white',
  green: 'bg-card-green text-white',
  amber: 'bg-card-amber text-ink',
  dark: 'bg-ink text-paper',
  lavender: 'bg-card-lavender text-ink',
  pink: 'bg-card-pink text-ink',
  orange: 'bg-card-orange text-white',
  blueDark: 'bg-card-blueDark text-white',
  cream: 'bg-card-cream text-ink',
}

const rimClasses = {
  blue: 'ring-white/15',
  green: 'ring-white/15',
  amber: 'ring-ink/10',
  dark: 'ring-paper/15',
  lavender: 'ring-ink/10',
  pink: 'ring-ink/10',
  orange: 'ring-white/15',
  blueDark: 'ring-white/15',
  cream: 'ring-ink/10',
}
</script>

<template>
  <component
    :is="soon ? 'div' : 'router-link'"
    :to="soon ? undefined : to"
    class="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl p-6 ring-1 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:rotate-[-0.4deg] hover:shadow-[0_20px_40px_-16px_rgba(20,33,61,0.4)]"
    :class="[toneClasses[tone], rimClasses[tone], soon ? 'cursor-default opacity-90' : 'cursor-pointer']"
  >
    <div
      class="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
    />

    <div class="relative flex items-start justify-between">
      <span class="font-mono text-xs tracking-wide opacity-70">{{ code }}</span>
      <span v-if="tag" class="rounded-full bg-black/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide">
        {{ tag }}
      </span>
    </div>

    <div class="relative mt-8">
      <h3 class="font-serif text-2xl font-semibold leading-tight">{{ title }}</h3>
      <p class="mt-1.5 text-sm opacity-80">{{ subtitle }}</p>

      <ul v-if="bullets.length" class="mt-5 space-y-2 text-sm opacity-90">
        <li v-for="b in bullets" :key="b" class="flex items-center gap-2">
          <span class="text-xs opacity-70">+</span>
          <span>{{ b }}</span>
        </li>
      </ul>

      <p v-if="meta" class="mt-6 border-t border-white/15 pt-3 font-mono text-[11px] uppercase tracking-wide opacity-70">
        {{ meta }}
      </p>
    </div>

    <span
      v-if="!soon"
      class="relative mt-4 inline-flex items-center gap-1 text-sm font-medium opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
    >
      Open
      <svg class="h-3.5 w-3.5" viewBox="0 0 12 12" fill="none">
        <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </span>
  </component>
</template>
