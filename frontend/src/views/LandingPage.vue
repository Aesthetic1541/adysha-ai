<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import AppNavbar from '../components/AppNavbar.vue'
import AppFooter from '../components/AppFooter.vue'
import AppButton from '../components/AppButton.vue'
import ColorCard from '../components/ColorCard.vue'
import MarqueeRow from '../components/MarqueeRow.vue'
import TestimonialCard from '../components/TestimonialCard.vue'
import { hero, marqueeLogos, paths, everything, testimonials, cta } from '../content/landing.content.js'

// --- Rotating word in the hero headline ("Everything a [topper / AIR 1 / ...] knows") ---
const wordIndex = ref(0)
let wordTimer = null
onMounted(() => {
  wordTimer = setInterval(() => {
    wordIndex.value = (wordIndex.value + 1) % hero.rotatingWords.length
  }, 2200)
})
onUnmounted(() => clearInterval(wordTimer))

const driftTones = {
  panel: 'bg-panel text-ink border border-line',
  accent: 'bg-accent text-ink',
  ink: 'bg-ink text-paper',
}
</script>

<template>
  <div>
    <AppNavbar />

    <main>
      <!-- ============================= HERO ============================= -->
      <section class="ruled-bg relative overflow-hidden border-b border-line">
        <div class="mx-auto max-w-6xl px-6 pb-24 pt-16 md:pt-20">
          <div class="relative mx-auto max-w-3xl text-center">
            <p v-reveal class="font-mono-tight text-xs font-medium uppercase tracking-widest text-accent-deep">
              {{ hero.eyebrow }}
            </p>

            <h1 v-reveal="80" class="mt-5 font-serif text-4xl font-semibold leading-[1.1] text-ink md:text-6xl">
              {{ hero.headlineStart }}
              <span class="relative inline-block min-w-[3.2ch] align-baseline text-accent-deep md:min-w-[4ch]">
                <Transition name="word" mode="out-in">
                  <span :key="wordIndex" class="inline-block">{{ hero.rotatingWords[wordIndex] }}</span>
                </Transition>
              </span>
              {{ hero.headlineEnd }}
            </h1>

            <p v-reveal="140" class="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-soft md:text-lg">
              {{ hero.subhead }}
            </p>

            <div v-reveal="200" class="mt-9 flex flex-wrap items-center justify-center gap-4">
              <AppButton :to="hero.primaryCta.to" variant="dark" show-arrow>{{ hero.primaryCta.label }}</AppButton>
              <AppButton :href="hero.secondaryCta.href" variant="outline">{{ hero.secondaryCta.label }}</AppButton>
            </div>

            <p v-reveal="240" class="mt-5 text-xs text-ink-soft">{{ hero.trustLine }}</p>
          </div>

          <!-- Drifting decorative cards -->
          <div class="pointer-events-none absolute inset-x-0 top-6 hidden justify-between px-4 lg:flex">
            <div
              v-for="(card, i) in hero.driftCards"
              :key="card.title"
              class="drift w-40 rounded-lg px-4 py-3 text-left shadow-[0_12px_28px_-12px_rgba(20,33,61,0.35)]"
              :class="[driftTones[card.tone], i === 1 ? 'mt-16' : i === 2 ? 'mt-2' : '']"
              :style="{ '--drift-delay': i * 0.7 + 's', '--drift-rot': (i - 1) * 2.5 + 'deg' }"
            >
              <p class="text-[10px] uppercase tracking-wide opacity-70">{{ card.label }}</p>
              <p class="mt-1 font-serif text-sm font-semibold">{{ card.title }}</p>
            </div>
          </div>

          <!-- Scorecard panel -->
          <div v-reveal="260" class="mx-auto mt-14 flex max-w-sm justify-center md:max-w-md">
            <div
              class="w-full rounded-lg border border-line bg-paper p-6 shadow-[0_20px_50px_-24px_rgba(20,33,61,0.35)] transition-transform duration-500 ease-out hover:-translate-y-1"
            >
              <div class="flex items-baseline justify-between border-b border-line pb-4">
                <div>
                  <p class="font-serif text-lg font-semibold text-ink">{{ hero.scorecard.title }}</p>
                  <p class="text-xs text-ink-soft">{{ hero.scorecard.subtitle }}</p>
                </div>
                <span class="flex items-center gap-1.5 rounded bg-accent/20 px-2 py-1 text-xs font-medium text-accent-deep">
                  <span class="pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  Live
                </span>
              </div>

              <div class="mt-5 grid grid-cols-2 gap-4">
                <div>
                  <p class="text-xs uppercase tracking-wide text-ink-soft">Percentile</p>
                  <p class="font-serif text-2xl font-semibold text-ink">{{ hero.scorecard.percentile }}</p>
                </div>
                <div>
                  <p class="text-xs uppercase tracking-wide text-ink-soft">Predicted rank</p>
                  <p class="font-serif text-2xl font-semibold text-ink">{{ hero.scorecard.rank }}</p>
                </div>
              </div>

              <ul class="mt-5 divide-y divide-line border-t border-line">
                <li
                  v-for="row in hero.scorecard.rows"
                  :key="row.subject"
                  class="flex items-center justify-between py-2.5 text-sm"
                >
                  <span class="text-ink-soft">{{ row.subject }}</span>
                  <span class="flex items-center gap-1.5 font-medium text-ink">
                    {{ row.score }}
                    <svg v-if="row.trend === 'up'" class="h-3.5 w-3.5 text-emerald-600" viewBox="0 0 12 12" fill="none">
                      <path d="M2 8 L6 4 L10 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <svg v-else class="h-3.5 w-3.5 text-rose-500" viewBox="0 0 12 12" fill="none">
                      <path d="M2 4 L6 8 L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </span>
                </li>
              </ul>

              <p class="mt-4 rounded-md bg-panel px-3 py-2 text-xs text-ink-soft">{{ hero.scorecard.footnote }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ============================= LOGO MARQUEE ============================= -->
      <section v-reveal class="border-b border-line bg-panel/40 py-10">
        <p class="text-center font-mono-tight text-xs uppercase tracking-widest text-ink-soft">Trusted by aspirants from</p>
        <div class="mt-6">
          <MarqueeRow :duration="28">
            <span
              v-for="logo in marqueeLogos"
              :key="logo"
              class="whitespace-nowrap font-serif text-lg font-medium text-ink-soft/70 transition-colors hover:text-ink"
            >
              {{ logo }}
            </span>
          </MarqueeRow>
        </div>
      </section>

      <!-- ============================= PICK YOUR PATH ============================= -->
      <section id="paths" class="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <p v-reveal class="font-mono-tight text-xs font-medium uppercase tracking-widest text-accent-deep">
          {{ paths.eyebrow }}
        </p>
        <h2 v-reveal="60" class="mt-3 font-serif text-3xl font-semibold text-ink md:text-4xl">{{ paths.heading }}</h2>

        <div class="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(item, i) in paths.items"
            :key="item.code"
            v-reveal="i * 90"
            :class="item.code === '04' ? 'lg:row-span-2' : ''"
          >
            <ColorCard
              :to="item.to"
              :tone="item.tone"
              :code="item.code"
              :tag="item.tag"
              :title="item.title"
              :subtitle="item.subtitle"
              :bullets="item.bullets"
              :meta="item.meta"
              :soon="item.soon"
              class="h-full"
            />
          </div>
        </div>
      </section>

      <!-- ============================= EVERYTHING ELSE ============================= -->
      <section id="everything" class="border-y border-line bg-panel/40 py-20 md:py-28">
        <div class="mx-auto max-w-6xl px-6">
          <p v-reveal class="font-mono-tight text-xs font-medium uppercase tracking-widest text-accent-deep">
            {{ everything.eyebrow }}
          </p>
          <h2 v-reveal="60" class="mt-3 font-serif text-3xl font-semibold text-ink md:text-4xl">{{ everything.heading }}</h2>

          <div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div v-for="(item, i) in everything.items" :key="item.code" v-reveal="i * 90">
              <ColorCard :to="item.to" :tone="item.tone" :code="item.code" :title="item.title" :subtitle="item.subtitle" class="h-44" />
            </div>
          </div>
        </div>
      </section>

      <!-- ============================= TESTIMONIALS ============================= -->
      <section v-reveal class="py-20 md:py-28">
        <h2 class="text-center font-serif text-3xl font-semibold text-ink md:text-4xl">{{ testimonials.heading }}</h2>
        <div class="mt-10 space-y-5">
          <MarqueeRow :duration="46" gap="gap-5">
            <TestimonialCard
              v-for="t in testimonials.items.slice(0, 3)"
              :key="t.handle"
              :name="t.name"
              :handle="t.handle"
              :body="t.body"
            />
          </MarqueeRow>
          <MarqueeRow :duration="42" gap="gap-5" reverse>
            <TestimonialCard
              v-for="t in testimonials.items.slice(3)"
              :key="t.handle"
              :name="t.name"
              :handle="t.handle"
              :body="t.body"
            />
          </MarqueeRow>
        </div>
      </section>

      <!-- ============================= CTA ============================= -->
      <section id="pricing" v-reveal class="bg-ink">
        <div class="mx-auto max-w-6xl px-6 py-20 text-center md:py-24">
          <h2 class="font-serif text-3xl font-semibold text-paper md:text-4xl">{{ cta.heading }}</h2>
          <p class="mx-auto mt-4 max-w-md text-base text-paper/70">{{ cta.subheading }}</p>

          <div class="mt-8 flex flex-wrap items-center justify-center gap-4">
            <AppButton :to="cta.primaryCta.to" variant="accent" show-arrow>{{ cta.primaryCta.label }}</AppButton>
            <AppButton :to="cta.secondaryCta.to" variant="ghost-light">{{ cta.secondaryCta.label }}</AppButton>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>
