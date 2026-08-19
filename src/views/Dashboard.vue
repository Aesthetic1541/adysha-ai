<template>
  <div class="min-h-screen bg-slate-950 text-white">

    <!-- Navbar -->
    <nav class="border-b border-slate-800 bg-slate-950/90">
      <div class="flex items-center justify-between px-6 py-5 lg:px-10">

        <div class="text-2xl font-bold">
          ADYSHA<span class="text-indigo-400"> AI</span>
        </div>

        <div class="flex items-center gap-4">

          <div class="hidden text-right sm:block">
            <p class="text-sm font-semibold">Student</p>
            <p class="text-xs text-slate-400">
                {{ student.exam }} Aspirant
            </p>
          </div>

          <div
            class="flex h-10 w-10 items-center justify-center
                   rounded-full bg-indigo-500 font-bold"
          >
            A
          </div>

        </div>

      </div>
    </nav>


    <!-- Main -->
    <main class="mx-auto max-w-7xl px-6 py-8 lg:px-10">

      <!-- Welcome -->
      <section>

        <p class="text-sm text-indigo-400">
          Wednesday, August 19
        </p>

        <h1 class="mt-2 text-3xl font-bold md:text-4xl">
          Good evening, Aditya 👋
        </h1>

        <p class="mt-2 text-slate-400">
          Stay consistent. Your goal is getting closer every day.
        </p>

      </section>

      <div class="mt-4 flex flex-wrap gap-3">

        <span
            class="rounded-full border border-indigo-500/20
                bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300"
        >
            🎯 Target: {{ student.target }}
        </span>

        <span
            class="rounded-full border border-slate-800
                bg-slate-900 px-4 py-2 text-sm text-slate-400"
        >
            📚 Level: {{ student.level }}
        </span>

        </div>


      <!-- Stats -->
      <section class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <!-- Study Time -->
        <div class="rounded-2xl border border-slate-800
                    bg-slate-900 p-5">

          <div class="flex items-center justify-between">

            <p class="text-sm text-slate-400">
              Today's Study
            </p>

            <span class="text-xl">⏱️</span>

          </div>

          <p class="mt-3 text-3xl font-bold">
            3h 45m
          </p>

          <p class="mt-2 text-xs text-slate-500">
            Target: {{ student.studyHours }} hours
            </p>

        </div>


        <!-- Progress -->
        <div class="rounded-2xl border border-slate-800
                    bg-slate-900 p-5">

          <div class="flex items-center justify-between">

            <p class="text-sm text-slate-400">
              Today's Progress
            </p>

            <span class="text-xl">📈</span>

          </div>

          <p class="mt-3 text-3xl font-bold">
            68%
          </p>

          <div class="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">

            <div
              class="h-full w-[68%] rounded-full bg-indigo-500"
            ></div>

          </div>

        </div>


        <!-- Streak -->
        <div class="rounded-2xl border border-slate-800
                    bg-slate-900 p-5">

          <div class="flex items-center justify-between">

            <p class="text-sm text-slate-400">
              Current Streak
            </p>

            <span class="text-xl">🔥</span>

          </div>

          <p class="mt-3 text-3xl font-bold">
            12 Days
          </p>

          <p class="mt-2 text-xs text-slate-500">
            Keep it going!
          </p>

        </div>


        <!-- Days -->
        <div class="rounded-2xl border border-slate-800
                    bg-slate-900 p-5">

          <div class="flex items-center justify-between">

            <p class="text-sm text-slate-400">
              Exam Countdown
            </p>

            <span class="text-xl">🎯</span>

          </div>

          <p class="mt-3 text-3xl font-bold">
            {{ daysRemaining }}
          </p>

          <p class="mt-2 text-xs text-slate-500">
            Days remaining
          </p>

        </div>

      </section>


      <!-- Main Grid -->
      <section class="mt-8 grid gap-6 lg:grid-cols-3">


        <!-- Today's Schedule -->
        <div class="lg:col-span-2 rounded-2xl border
                    border-slate-800 bg-slate-900">

          <div class="flex items-center justify-between
                      border-b border-slate-800 p-6">

            <div>

              <h2 class="text-xl font-bold">
                Today's Schedule
              </h2>

              <p class="mt-1 text-sm text-slate-400">
                Your AI-generated study plan
              </p>

            </div>

            <button
              class="rounded-lg border border-slate-700 px-4 py-2
                     text-sm text-slate-300 hover:bg-slate-800"
            >
              View Full Plan
            </button>

          </div>


          <!-- Tasks -->
          <div class="divide-y divide-slate-800">


            <!-- Completed -->
            <div class="flex items-center gap-4 p-5">

              <div
                class="flex h-10 w-10 items-center justify-center
                       rounded-full bg-green-500/10 text-green-400"
              >
                ✓
              </div>

              <div class="flex-1">

                <h3 class="font-semibold">
                  Physics — Current Electricity
                </h3>

                <p class="mt-1 text-sm text-slate-400">
                  Concept Revision
                </p>

              </div>

              <div class="text-right">

                <p class="text-sm font-medium">
                  1h 30m
                </p>

                <p class="text-xs text-green-400">
                  Completed
                </p>

              </div>

            </div>


            <!-- Current -->
            <div
              class="flex items-center gap-4 border-l-2
                     border-indigo-500 bg-indigo-500/5 p-5"
            >

              <div
                class="flex h-10 w-10 items-center justify-center
                       rounded-full bg-indigo-500/10 text-indigo-400"
              >
                ▶
              </div>

              <div class="flex-1">

                <h3 class="font-semibold">
                  Mathematics — Integration
                </h3>

                <p class="mt-1 text-sm text-slate-400">
                  Practice + PYQs
                </p>

              </div>

              <div class="text-right">

                <p class="text-sm font-medium">
                  1h 30m
                </p>

                <button
                  class="mt-1 text-xs text-indigo-400
                         hover:text-indigo-300"
                >
                  Start →
                </button>

              </div>

            </div>


            <!-- Upcoming -->
            <div class="flex items-center gap-4 p-5">

              <div
                class="flex h-10 w-10 items-center justify-center
                       rounded-full bg-slate-800 text-slate-400"
              >
                ○
              </div>

              <div class="flex-1">

                <h3 class="font-semibold">
                  Chemistry — Aldehydes
                </h3>

                <p class="mt-1 text-sm text-slate-400">
                  NCERT + Practice Questions
                </p>

              </div>

              <div class="text-right">

                <p class="text-sm font-medium">
                  1h 30m
                </p>

                <p class="text-xs text-slate-500">
                  7:00 PM
                </p>

              </div>

            </div>


            <!-- Upcoming -->
            <div class="flex items-center gap-4 p-5">

              <div
                class="flex h-10 w-10 items-center justify-center
                       rounded-full bg-slate-800 text-slate-400"
              >
                ○
              </div>

              <div class="flex-1">

                <h3 class="font-semibold">
                  Physics — PYQs
                </h3>

                <p class="mt-1 text-sm text-slate-400">
                  Previous Year Questions
                </p>

              </div>

              <div class="text-right">

                <p class="text-sm font-medium">
                  1h
                </p>

                <p class="text-xs text-slate-500">
                  9:00 PM
                </p>

              </div>

            </div>

          </div>

        </div>


        <!-- Right Side -->
        <div class="space-y-6">


          <!-- AI Insight -->
          <div
            class="rounded-2xl border border-indigo-500/20
                   bg-indigo-500/5 p-6"
          >

            <div class="flex items-center gap-3">

              <div
                class="flex h-10 w-10 items-center justify-center
                       rounded-xl bg-indigo-500/10 text-xl"
              >
                🧠
              </div>

              <div>

                <h2 class="font-bold">
                  AI Insight
                </h2>

                <p class="text-xs text-slate-400">
                  Based on your recent activity
                </p>

              </div>

            </div>

            <p class="mt-5 text-sm leading-6 text-slate-300">
              Your Physics performance is improving, but
              <span class="font-semibold text-indigo-400">
                Optics
              </span>
              is currently your weakest area.
            </p>

            <button
              class="mt-5 w-full rounded-xl bg-indigo-500
                     py-3 text-sm font-semibold
                     hover:bg-indigo-400"
            >
              Ask ADYSHA AI →
            </button>

          </div>


          <!-- Subject Progress -->
          <div
            class="rounded-2xl border border-slate-800
                   bg-slate-900 p-6"
          >

            <h2 class="font-bold">
              Subject Progress
            </h2>

            <div class="mt-6 space-y-5">


              <div>

                <div class="mb-2 flex justify-between text-sm">

                  <span>
                    Physics
                  </span>

                  <span class="text-slate-400">
                    72%
                  </span>

                </div>

                <div class="h-2 rounded-full bg-slate-800">

                  <div
                    class="h-full w-[72%] rounded-full
                           bg-indigo-500"
                  ></div>

                </div>

              </div>


              <div>

                <div class="mb-2 flex justify-between text-sm">

                  <span>
                    Chemistry
                  </span>

                  <span class="text-slate-400">
                    64%
                  </span>

                </div>

                <div class="h-2 rounded-full bg-slate-800">

                  <div
                    class="h-full w-[64%] rounded-full
                           bg-indigo-500"
                  ></div>

                </div>

              </div>


              <div>

                <div class="mb-2 flex justify-between text-sm">

                  <span>
                    Mathematics
                  </span>

                  <span class="text-slate-400">
                    48%
                  </span>

                </div>

                <div class="h-2 rounded-full bg-slate-800">

                  <div
                    class="h-full w-[48%] rounded-full
                           bg-indigo-500"
                  ></div>

                </div>

              </div>


            </div>

          </div>


          <!-- Quick Actions -->
          <div
            class="rounded-2xl border border-slate-800
                   bg-slate-900 p-6"
          >

            <h2 class="font-bold">
              Quick Actions
            </h2>

            <div class="mt-4 grid grid-cols-2 gap-3">

              <button
                class="rounded-xl border border-slate-800
                       p-4 text-left text-sm
                       hover:bg-slate-800"
              >
                📝
                <span class="mt-2 block">
                  Take Quiz
                </span>
              </button>

              <button
                class="rounded-xl border border-slate-800
                       p-4 text-left text-sm
                       hover:bg-slate-800"
              >
                📚
                <span class="mt-2 block">
                  PYQs
                </span>
              </button>

              <button
                class="rounded-xl border border-slate-800
                       p-4 text-left text-sm
                       hover:bg-slate-800"
              >
                🤖
                <span class="mt-2 block">
                  AI Tutor
                </span>
              </button>

              <button
                class="rounded-xl border border-slate-800
                       p-4 text-left text-sm
                       hover:bg-slate-800"
              >
                📊
                <span class="mt-2 block">
                  Analytics
                </span>
              </button>

            </div>

          </div>

        </div>

      </section>

    </main>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const student = computed(() => ({
  exam: route.query.exam || 'JEE',
  examDate: route.query.examDate || '',
  studyHours: route.query.studyHours || 6,
  target: route.query.target || '98 percentile',
  level: route.query.level || 'intermediate'
}))

const daysRemaining = computed(() => {

  if (!student.value.examDate) {
    return 148
  }

  const today = new Date()
  const examDate = new Date(student.value.examDate)

  const difference = examDate - today

  return Math.max(
    0,
    Math.ceil(difference / (1000 * 60 * 60 * 24))
  )
})
</script>