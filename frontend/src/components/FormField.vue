<script setup>
defineProps({
  modelValue: { type: String, default: '' },
  id: { type: String, required: true },
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  autocomplete: { type: String, default: 'off' },
  error: { type: String, default: '' },
})
defineEmits(['update:modelValue', 'focus', 'blur'])
</script>

<template>
  <div>
    <label :for="id" class="text-xs font-medium uppercase tracking-wide text-ink-soft">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      class="mt-1.5 w-full rounded-md border bg-paper px-3.5 py-2.5 text-sm text-ink outline-none transition-colors duration-200 placeholder:text-ink-soft/50 focus:border-ink"
      :class="error ? 'border-rose-400' : 'border-line'"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="$emit('focus')"
      @blur="$emit('blur')"
    />
    <Transition
      enter-active-class="error-drop"
      leave-active-class="transition-opacity duration-150"
      leave-to-class="opacity-0"
    >
      <p v-if="error" class="mt-1.5 text-xs text-rose-500">{{ error }}</p>
    </Transition>
  </div>
</template>
