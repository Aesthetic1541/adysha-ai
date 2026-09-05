<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

/**
 * Usage:
 *   <OnboardingModal v-model="showOnboarding" @completed="userStore.markOnboardingComplete()" />
 *
 * Expected GET /api/onboarding/progress response shape (adjust to match your API):
 * [
 *   { id: 'physics', name: 'Physics', chapters: [
 *       { id: 'kinematics', name: 'Kinematics', progress: 40 },
 *       { id: 'gravitation', name: 'Gravitation', progress: 0 },
 *   ]},
 *   { id: 'chemistry', name: 'Chemistry', chapters: [...] },
 *   { id: 'mathematics', name: 'Mathematics', chapters: [...] },
 * ]
 * progress is 0-100. Missing/unset chapters can default to 0.
 *
 * On Save, this posts the same shape to POST /api/onboarding/progress.
 */

const props = defineProps({
  modelValue: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue', 'completed'])

const subjects = ref([])
const activeSubjectId = ref(null)
const loading = ref(true)
const saving = ref(false)
const loadError = ref(null)

const activeSubject = computed(() => subjects.value.find((s) => s.id === activeSubjectId.value) || null)

function subjectAverage(subject) {
  if (!subject || subject.chapters.length === 0) return 0
  const total = subject.chapters.reduce((sum, c) => sum + (c.progress || 0), 0)
  return Math.round(total / subject.chapters.length)
}

async function loadProgress() {
  loading.value = true
  loadError.value = null
  try {
    const { data } = await axios.get('/api/onboarding/progress')
    subjects.value = data
    activeSubjectId.value = data[0]?.id ?? null
  } catch (err) {
    loadError.value = 'Could not load your subjects. Please try again.'
  } finally {
    loading.value = false
  }
}

async function handleSave() {
  saving.value = true
  try {
    await axios.post('/api/onboarding/progress', { subjects: subjects.value })
  } catch (err) {
    loadError.value = 'Could not save your progress. Please try again.'
  } finally {
    emit('completed')
    emit('update:modelValue', false)
    saving.value = false
  }
}

onMounted(loadProgress)
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4 py-8 backdrop-blur-sm"
      >
        <div class="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-line bg-paper shadow-[0_30px_70px_-20px_rgba(20,33,61,0.45)]">
          <!-- Header -->
          <div class="border-b border-line px-6 pt-6">
            <p class="font-mono-tight text-xs font-medium uppercase tracking-widest text-accent-deep">Before you start</p>
            <h2 class="mt-2 font-serif text-2xl font-semibold text-ink">Where do you stand right now?</h2>
            <p class="mt-1 text-sm text-ink-soft">Slide each chapter to your honest prep level. It's fine if most of it is zero.</p>

            <!-- Subject tabs -->
            <div class="mt-5 flex gap-2">
              <button
                v-for="s in subjects"
                :key="s.id"
                type="button"
                @click="activeSubjectId = s.id"
                class="rounded-t-md px-4 py-2 text-sm font-medium transition-colors"
                :class="
                  s.id === activeSubjectId
                    ? 'border border-b-0 border-line bg-panel text-ink'
                    : 'text-ink-soft hover:text-ink'
                "
              >
                {{ s.name }}
              </button>
            </div>
          </div>

          <!-- Body -->
          <div class="flex-1 overflow-y-auto px-6 py-6">
            <p v-if="loading" class="text-sm text-ink-soft">Loading your subjects…</p>
            <p v-else-if="loadError" class="text-sm text-rose-600">{{ loadError }}</p>

            <Transition v-else name="subject-slide" mode="out-in">
              <div :key="activeSubjectId">
                <!-- Overall progress bar -->
                <div>
                  <div class="flex items-center justify-between text-sm">
                    <span class="font-medium text-ink">{{ activeSubject?.name }} overall</span>
                    <span class="font-mono-tight text-ink-soft">{{ subjectAverage(activeSubject) }}%</span>
                  </div>
                  <div class="mt-2 h-2 w-full overflow-hidden rounded-full bg-panel">
                    <div
                      class="h-full rounded-full bg-accent-deep transition-all duration-500 ease-out"
                      :style="{ width: subjectAverage(activeSubject) + '%' }"
                    />
                  </div>
                </div>

                <!-- Chapters -->
                <div class="mt-8 space-y-5">
                  <div v-for="chapter in activeSubject?.chapters" :key="chapter.id">
                    <div class="flex items-center justify-between text-sm">
                      <span class="text-ink">{{ chapter.name }}</span>
                      <span class="font-mono-tight text-xs text-ink-soft">{{ chapter.progress }}%</span>
                    </div>
                    <input
                      v-model.number="chapter.progress"
                      type="range"
                      min="0"
                      max="100"
                      class="mt-2 w-full accent-accent-deep"
                    />
                  </div>
                </div>
              </div>
            </Transition>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-end gap-3 border-t border-line px-6 py-4">
            <button
              type="button"
              :disabled="saving || loading"
              @click="handleSave"
              class="rounded-md bg-ink px-5 py-2 text-sm font-medium text-paper transition-opacity disabled:opacity-50"
            >
              {{ saving ? 'Saving…' : 'Save & continue' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.subject-slide-enter-active,
.subject-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.subject-slide-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.subject-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
