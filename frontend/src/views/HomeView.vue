<script setup>
import { ref, onMounted } from 'vue'
import AppHomeNavbar from '../components/AppHomeNavbar.vue'
import OnboardingModal from '../components/OnboardingModal.vue'
import { useUserStore } from '../stores/user.js'

const userStore = useUserStore()
const showOnboarding = ref(false)

onMounted(async () => {
  await userStore.fetchProfile()
  showOnboarding.value = !userStore.hasCompletedOnboarding
})
</script>

<template>
  <div class="min-h-screen bg-paper">
    <AppHomeNavbar />

    <main class="mx-auto max-w-6xl px-6 py-10">
      <h1 class="font-serif text-2xl font-semibold text-ink">
        Welcome back<span v-if="userStore.name">, {{ userStore.name }}</span>
      </h1>

      <div class="mt-8 grid gap-6 lg:grid-cols-3">
        <!-- Ask AI — scoped to the user's own performance/prep, not general Q&A -->
        <section class="flex flex-col rounded-lg border border-line bg-panel/40 p-6 lg:col-span-2 lg:row-span-2">
          <p class="font-mono-tight text-xs font-medium uppercase tracking-widest text-accent-deep">Ask about yourself</p>
          <h2 class="mt-2 font-serif text-lg font-semibold text-ink">How's your prep going?</h2>
          <p class="mt-1 text-sm text-ink-soft">
            Ask things like "which chapter am I weakest in" or "how did my last test compare to the one before".
          </p>

          <div class="mt-5 flex-1 space-y-3 overflow-y-auto rounded-md border border-line bg-paper p-4 text-sm text-ink-soft">
            <p class="text-center text-xs text-ink-soft/70">Your conversation will appear here</p>
          </div>

          <form class="mt-4 flex gap-2" @submit.prevent>
            <input
              type="text"
              placeholder="Ask about your performance…"
              class="flex-1 rounded-md border border-line bg-paper px-4 py-2 text-sm text-ink placeholder:text-ink-soft/70 focus:outline-none focus:ring-2 focus:ring-accent-deep/40"
            />
            <button type="submit" class="rounded-md bg-ink px-4 py-2 text-sm font-medium text-paper">Ask</button>
          </form>
        </section>

        <!-- Timetable generator -->
        <section class="rounded-lg border border-line bg-panel/40 p-6">
          <p class="font-mono-tight text-xs font-medium uppercase tracking-widest text-accent-deep">Plan</p>
          <h2 class="mt-2 font-serif text-lg font-semibold text-ink">Generate a timetable</h2>
          <p class="mt-1 text-sm text-ink-soft">Build a study schedule based on your current progress.</p>
          <button type="button" class="mt-4 w-full rounded-md border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-panel">
            Generate timetable
          </button>
        </section>

        <!-- PYQ test -->
        <section class="rounded-lg border border-line bg-panel/40 p-6">
          <p class="font-mono-tight text-xs font-medium uppercase tracking-widest text-accent-deep">Practice</p>
          <h2 class="mt-2 font-serif text-lg font-semibold text-ink">Take a PYQ test</h2>
          <p class="mt-1 text-sm text-ink-soft">Practice with previous years' questions.</p>
          <button type="button" class="mt-4 w-full rounded-md border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-panel">
            Start test
          </button>
        </section>

        <!-- Score card upload -->
        <section class="rounded-lg border border-dashed border-line bg-panel/40 p-6">
          <p class="font-mono-tight text-xs font-medium uppercase tracking-widest text-accent-deep">Track</p>
          <h2 class="mt-2 font-serif text-lg font-semibold text-ink">Upload a score card</h2>
          <p class="mt-1 text-sm text-ink-soft">Add a recent test's score card to log it against your history.</p>
          <button type="button" class="mt-4 w-full rounded-md border border-line px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-panel">
            Upload score card
          </button>
        </section>

        <!-- Performance history -->
        <section class="rounded-lg border border-line bg-panel/40 p-6 lg:col-span-3">
          <p class="font-mono-tight text-xs font-medium uppercase tracking-widest text-accent-deep">History</p>
          <h2 class="mt-2 font-serif text-lg font-semibold text-ink">Your performance over time</h2>
          <p class="mt-1 text-sm text-ink-soft">Scores and trends from your uploaded tests will show here.</p>
          <div class="mt-4 flex h-40 items-center justify-center rounded-md border border-line bg-paper text-sm text-ink-soft">
            No test history yet
          </div>
        </section>
      </div>
    </main>

    <OnboardingModal v-model="showOnboarding" @completed="userStore.markOnboardingComplete()" />
  </div>
</template>
