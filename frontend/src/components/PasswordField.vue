<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  id: { type: String, required: true },
  label: { type: String, required: true },
  placeholder: { type: String, default: '' },
  autocomplete: { type: String, default: 'current-password' },
  error: { type: String, default: '' },
})
const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'visibility-change'])

const visible = ref(false)
const inputType = computed(() => (visible.value ? 'text' : 'password'))

function toggleVisible() {
  visible.value = !visible.value
  emit('visibility-change', visible.value)
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <label :for="id" class="text-xs font-medium uppercase tracking-wide text-ink-soft">{{ label }}</label>
      <slot name="side-label" />
    </div>

    <div class="relative mt-1.5">
      <input
        :id="id"
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        :autocomplete="autocomplete"
        class="w-full rounded-md border bg-paper px-3.5 py-2.5 pr-11 text-sm text-ink outline-none transition-colors duration-200 placeholder:text-ink-soft/50 focus:border-ink"
        :class="error ? 'border-rose-400' : 'border-line'"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
      />
      <button
        type="button"
        class="absolute right-1 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-ink-soft transition-colors hover:bg-panel hover:text-ink"
        :aria-label="visible ? 'Hide password' : 'Show password'"
        @click="toggleVisible"
      >
        <svg v-if="!visible" class="h-4.5 w-4.5" viewBox="0 0 20 20" fill="none">
          <path
            d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6Z"
            stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"
          />
          <circle cx="10" cy="10" r="2.4" stroke="currentColor" stroke-width="1.5" />
        </svg>
        <svg v-else class="h-4.5 w-4.5" viewBox="0 0 20 20" fill="none">
          <path
            d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6Z"
            stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"
          />
          <circle cx="10" cy="10" r="2.4" stroke="currentColor" stroke-width="1.5" />
          <line x1="3" y1="17" x2="17" y2="3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
        </svg>
      </button>
    </div>

    <Transition
      enter-active-class="error-drop"
      leave-active-class="transition-opacity duration-150"
      leave-to-class="opacity-0"
    >
      <p v-if="error" class="mt-1.5 text-xs text-rose-500">{{ error }}</p>
    </Transition>
  </div>
</template>
