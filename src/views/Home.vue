<template>
  <div class="min-h-screen bg-slate-950 text-white">

    <!-- Navbar -->
    <nav class="flex items-center justify-between px-8 py-6">

      <div class="text-2xl font-bold">
        ADYSHA<span class="text-indigo-400"> AI</span>
      </div>

      <button
        class="rounded-lg border border-slate-700 px-5 py-2 text-sm
               text-slate-300 hover:bg-slate-800"
      >
        Login
      </button>

    </nav>

    <!-- Hero -->
    <main class="flex min-h-[80vh] items-center justify-center px-6">

      <div class="max-w-4xl text-center">

        <div
          class="mb-6 inline-block rounded-full border border-indigo-500/30
                 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300"
        >
          AI-Powered JEE & NEET Preparation
        </div>

        <h1 class="text-5xl font-bold leading-tight md:text-7xl">
          Your preparation.
          <br />

          <span class="text-indigo-400">
            Your path. Your pace.
          </span>
        </h1>

        <p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">
          ADYSHA creates a personalized study roadmap based on
          your exam, preparation level, available time and goals —
          then continuously adapts it as you progress.
        </p>

        <div class="mt-10 flex justify-center gap-4">

          <router-link
            to="/setup"
            class="rounded-xl bg-indigo-500 px-7 py-3 font-semibold
                   transition hover:bg-indigo-400"
          >
            Start Preparing →
          </router-link>

          <button
            class="rounded-xl border border-slate-700 px-7 py-3
                   font-semibold text-slate-300 hover:bg-slate-800"
          >
            How It Works
          </button>

        </div>

        <!-- Features -->
        <div class="mt-16 grid gap-4 text-left md:grid-cols-3">

          <div class="rounded-2xl border border-slate-800
                      bg-slate-900/50 p-6">

            <div class="mb-3 text-2xl">🧠</div>

            <h3 class="font-semibold">
              AI Roadmap
            </h3>

            <p class="mt-2 text-sm text-slate-400">
              Get a preparation plan designed around your goals.
            </p>

          </div>

          <div class="rounded-2xl border border-slate-800
                      bg-slate-900/50 p-6">

            <div class="mb-3 text-2xl">📅</div>

            <h3 class="font-semibold">
              Smart Schedule
            </h3>

            <p class="mt-2 text-sm text-slate-400">
              Turn your available time into a realistic daily plan.
            </p>

          </div>

          <div class="rounded-2xl border border-slate-800
                      bg-slate-900/50 p-6">

            <div class="mb-3 text-2xl">🔄</div>

            <h3 class="font-semibold">
              Adaptive Planning
            </h3>

            <p class="mt-2 text-sm text-slate-400">
              Missed a target? ADYSHA adjusts your upcoming schedule.
            </p>

          </div>

        </div>

      </div>

    </main>

  </div>
</template>