<script setup>
defineProps({
  to: { type: String, default: null },
  href: { type: String, default: null },
  type: { type: String, default: 'button' }, // used only when rendered as a real <button>
  variant: {
    type: String,
    default: 'dark', // dark | accent | outline | ghost-light
    validator: (v) => ['dark', 'accent', 'outline', 'ghost-light'].includes(v),
  },
  showArrow: { type: Boolean, default: false },
})

const variantClasses = {
  dark: 'bg-ink text-paper hover:bg-accent-deep',
  accent: 'bg-accent text-ink hover:bg-accent-deep hover:text-paper',
  outline: 'border border-line text-ink hover:border-ink bg-transparent',
  'ghost-light': 'border border-paper/30 text-paper hover:border-paper bg-transparent',
}
</script>

<template>
  <component
    :is="to ? 'router-link' : href ? 'a' : 'button'"
    :to="to || undefined"
    :href="!to ? href : undefined"
    :type="!to && !href ? type : undefined"
    class="btn-sheen group inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-medium transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_24px_-8px_rgba(20,33,61,0.35)] active:translate-y-0"
    :class="variantClasses[variant]"
  >
    <span><slot /></span>
    <svg
      v-if="showArrow"
      class="h-3.5 w-3.5 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1"
      viewBox="0 0 12 12"
      fill="none"
    >
      <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </component>
</template>
