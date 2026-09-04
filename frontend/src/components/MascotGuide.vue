<script setup>
import { computed } from 'vue'

const props = defineProps({
  // 'idle' | 'typing' | 'peeking' | 'closed'
  state: { type: String, default: 'idle' },
  shake: { type: Boolean, default: false },
})

const isClosed = computed(() => props.state === 'closed')
const isPeeking = computed(() => props.state === 'peeking')
const isTyping = computed(() => props.state === 'typing')
</script>

<template>
  <div class="mascot-bob flex justify-center" :class="{ 'shake-x': shake }">
    <svg viewBox="0 0 160 150" class="h-28 w-28 md:h-32 md:w-32" aria-hidden="true">
      <!-- sparkles when covering its eyes (can't believe you revealed it!) -->
      <g v-if="isClosed" class="text-accent-deep">
        <path class="sparkle-pop" style="animation-delay: 0s" d="M22 34 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3 z" fill="currentColor" />
        <path class="sparkle-pop" style="animation-delay: 0.3s" d="M132 26 l2.5 6.5 6.5 2.5 -6.5 2.5 -2.5 6.5 -2.5 -6.5 -6.5 -2.5 6.5 -2.5 z" fill="currentColor" />
      </g>

      <!-- ears -->
      <path d="M46 46 L34 18 L62 34 Z" class="fill-ink" />
      <path d="M114 46 L126 18 L98 34 Z" class="fill-ink" />
      <path d="M48 44 L40 26 L60 36 Z" class="fill-accent" />
      <path d="M112 44 L120 26 L100 36 Z" class="fill-accent" />

      <!-- head -->
      <circle cx="80" cy="82" r="52" class="fill-accent" stroke="#14213D" stroke-width="3" />
      <!-- face plate -->
      <ellipse cx="80" cy="92" rx="34" ry="30" class="fill-paper" />

      <!-- blush when embarrassed -->
      <ellipse v-if="isClosed" cx="52" cy="98" rx="7" ry="4.5" class="fill-card-pink" opacity="0.85" />
      <ellipse v-if="isClosed" cx="108" cy="98" rx="7" ry="4.5" class="fill-card-pink" opacity="0.85" />

      <!-- open eyes: idle / typing / peeking -->
      <g v-if="!isClosed">
        <g class="mascot-blink" style="transform-origin: 63px 86px">
          <circle cx="63" cy="86" r="12" class="fill-ink" />
          <circle
            cx="63" cy="86"
            :r="isPeeking ? 6 : 5"
            class="fill-paper"
            :class="isTyping ? 'mascot-pupil-dart' : ''"
          />
        </g>
        <g class="mascot-blink" style="transform-origin: 97px 86px; animation-delay: 0.15s">
          <circle cx="97" cy="86" r="12" class="fill-ink" />
          <circle
            cx="97" cy="86"
            :r="isPeeking ? 6 : 5"
            class="fill-paper"
            :class="isTyping ? 'mascot-pupil-dart' : ''"
          />
        </g>
        <!-- raised, curious eyebrows while peeking at a hidden password -->
        <path v-if="isPeeking" d="M52 68 Q63 60 74 68" stroke="#14213D" stroke-width="2.5" fill="none" stroke-linecap="round" />
        <path v-if="isPeeking" d="M86 68 Q97 60 108 68" stroke="#14213D" stroke-width="2.5" fill="none" stroke-linecap="round" />
      </g>

      <!-- closed eyes: password is visible, mascot looks away -->
      <g v-else>
        <path d="M53 87 Q63 94 73 87" stroke="#14213D" stroke-width="3.5" fill="none" stroke-linecap="round" />
        <path d="M87 87 Q97 94 107 87" stroke="#14213D" stroke-width="3.5" fill="none" stroke-linecap="round" />
      </g>

      <!-- beak / mouth -->
      <path
        v-if="!isClosed"
        d="M74 104 Q80 110 86 104 Q80 100 74 104 Z"
        class="fill-accent-deep"
        stroke="#14213D"
        stroke-width="1.5"
      />
      <ellipse v-else cx="80" cy="106" rx="5" ry="6" class="fill-accent-deep" stroke="#14213D" stroke-width="1.5" />

      <!-- wings / hands: rise to cover the eyes once the password is revealed -->
      <g
        class="origin-bottom transition-transform duration-500 ease-out"
        :style="{ transform: isClosed ? 'translateY(-40px)' : 'translateY(0)' }"
      >
        <ellipse cx="40" cy="118" rx="14" ry="18" class="fill-accent" stroke="#14213D" stroke-width="2.5" />
      </g>
      <g
        class="origin-bottom transition-transform duration-500 ease-out"
        :style="{ transform: isClosed ? 'translateY(-40px)' : 'translateY(0)' }"
      >
        <ellipse cx="120" cy="118" rx="14" ry="18" class="fill-accent" stroke="#14213D" stroke-width="2.5" />
      </g>
    </svg>
  </div>
</template>
