<template>
  <div class="min-h-screen bg-slate-950 text-white">

    <!-- Header -->
    <div class="border-b border-slate-800">
      <div class="mx-auto max-w-4xl px-6 py-5">
        <div class="text-2xl font-bold">
          ADYSHA<span class="text-indigo-400"> AI</span>
        </div>
      </div>
    </div>

    <!-- Form -->
    <main class="mx-auto max-w-3xl px-6 py-12">

      <div class="mb-10">
        <p class="mb-2 text-sm font-semibold text-indigo-400">
          STEP 1 OF 3
        </p>

        <h1 class="text-4xl font-bold">
          Let's build your preparation plan.
        </h1>

        <p class="mt-3 text-slate-400">
          Tell us about your exam and preparation goals.
        </p>
      </div>

      <form
        @submit.prevent="submitForm"
        class="space-y-8"
      >

        <!-- Exam -->
        <div>
          <label class="mb-3 block font-semibold">
            Which exam are you preparing for?
          </label>

          <div class="grid grid-cols-2 gap-4">

            <button
              type="button"
              @click="form.exam = 'JEE'"
              :class="[
                'rounded-xl border p-5 text-left transition',
                form.exam === 'JEE'
                  ? 'border-indigo-500 bg-indigo-500/10'
                  : 'border-slate-700 bg-slate-900 hover:border-slate-500'
              ]"
            >
              <p class="text-lg font-bold">JEE</p>
              <p class="mt-1 text-sm text-slate-400">
                Engineering entrance
              </p>
            </button>

            <button
              type="button"
              @click="form.exam = 'NEET'"
              :class="[
                'rounded-xl border p-5 text-left transition',
                form.exam === 'NEET'
                  ? 'border-indigo-500 bg-indigo-500/10'
                  : 'border-slate-700 bg-slate-900 hover:border-slate-500'
              ]"
            >
              <p class="text-lg font-bold">NEET</p>
              <p class="mt-1 text-sm text-slate-400">
                Medical entrance
              </p>
            </button>

          </div>
        </div>

        <!-- Exam Date -->
        <div>
          <label class="mb-3 block font-semibold">
            Exam date
          </label>

          <input
            v-model="form.examDate"
            type="date"
            class="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-indigo-500"
          />
        </div>

        <!-- Study Hours -->
        <div>
          <label class="mb-3 block font-semibold">
            How many hours can you study daily?
          </label>

          <input
            v-model.number="form.studyHours"
            type="number"
            min="1"
            max="16"
            class="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-indigo-500"
          />
        </div>

        <!-- Target -->
        <div>
          <label class="mb-3 block font-semibold">
            What is your target?
          </label>

          <input
            v-model="form.target"
            type="text"
            placeholder="e.g. 99 percentile / 650 marks"
            class="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder-slate-500 outline-none focus:border-indigo-500"
          />
        </div>

        <!-- Level -->
        <div>
          <label class="mb-3 block font-semibold">
            What is your current preparation level?
          </label>

          <div class="grid grid-cols-3 gap-3">

            <button
              type="button"
              @click="form.level = 'beginner'"
              :class="[
                'rounded-xl border px-4 py-3 transition',
                form.level === 'beginner'
                  ? 'border-indigo-500 bg-indigo-500/10'
                  : 'border-slate-700 bg-slate-900'
              ]"
            >
              Beginner
            </button>

            <button
              type="button"
              @click="form.level = 'intermediate'"
              :class="[
                'rounded-xl border px-4 py-3 transition',
                form.level === 'intermediate'
                  ? 'border-indigo-500 bg-indigo-500/10'
                  : 'border-slate-700 bg-slate-900'
              ]"
            >
              Intermediate
            </button>

            <button
              type="button"
              @click="form.level = 'advanced'"
              :class="[
                'rounded-xl border px-4 py-3 transition',
                form.level === 'advanced'
                  ? 'border-indigo-500 bg-indigo-500/10'
                  : 'border-slate-700 bg-slate-900'
              ]"
            >
              Advanced
            </button>

          </div>
        </div>

        <!-- Submit -->
        <button
          type="submit"
          class="w-full rounded-xl bg-indigo-500 px-6 py-4 font-semibold transition hover:bg-indigo-400"
        >
          Generate My Plan →
        </button>

      </form>

    </main>

  </div>
</template>


<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const form = reactive({
  exam: '',
  examDate: '',
  studyHours: 6,
  target: '',
  level: ''
})

function submitForm() {

  if (
    !form.exam ||
    !form.examDate ||
    !form.studyHours ||
    !form.target ||
    !form.level
  ) {
    alert('Please complete all fields.')
    return
  }

  router.push({
    name: 'Dashboard',
    query: {
      exam: form.exam,
      examDate: form.examDate,
      studyHours: form.studyHours,
      target: form.target,
      level: form.level
    }
  })
}
</script>