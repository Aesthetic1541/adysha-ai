<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import ProgressLoader from './ProgressLoader.vue'


const props = defineProps({
  modelValue: { type: Boolean, default: false },
})
const emit = defineEmits(['update:modelValue', 'completed'])

const step = ref('exam') // 'exam' | 'progress'
const direction = ref('slide-forward')

const exams = ref([])
const examsLoading = ref(true)
const examsError = ref(null)
const selectedExamId = ref(null)

const subjects = ref([])
const activeSubjectId = ref(null)
const lastPatchedExamId = ref(null)
const progressLoading = ref(false)
const progressError = ref(null)
const saving = ref(false)

const activeSubject = computed(() => subjects.value.find((s) => s.id === activeSubjectId.value) || null)

function subjectAverage(subject) {
  if (!subject || subject.chapters.length === 0) return 0
  const total = subject.chapters.reduce((sum, c) => sum + (c.progress || 0), 0)
  return Math.round(total / subject.chapters.length)
}

async function loadExams() {
  examsLoading.value = true
  examsError.value = null
  try {
    const { data } = await axios.get('/api/onboarding/exams')
    exams.value = data
  } catch (err) {
    examsError.value = 'Could not load exams. Please try again.'
  } finally {
    examsLoading.value = false
  }
}

async function handleNext() {
  if (step.value !== 'exam' || !selectedExamId.value) return

  direction.value = 'slide-forward'
  step.value = 'progress'

  if (selectedExamId.value === lastPatchedExamId.value && subjects.value.length) {
    progressError.value = null
    return
  }

  progressLoading.value = true
  progressError.value = null
  try {
    await axios.post('/api/onboarding/exams', { exam: selectedExamId.value })
    const { data } = await axios.get('/api/onboarding/progress')
    console.log(data)
    subjects.value = data
    activeSubjectId.value = data[0]?.id ?? null
    console.log("asi: ", activeSubjectId.value)
    lastPatchedExamId.value = selectedExamId.value
  } catch (err) {
    progressError.value = err
  } finally {
    progressLoading.value = false
  }
}

function handleBack() {
  direction.value = 'slide-back'
  step.value = 'exam'
}

async function handleSave() {
  saving.value = true
  try {
    await axios.post('/api/onboarding/progress', { subjects: subjects.value })
    emit('completed')
    emit('update:modelValue', false)
  } catch (err) {
    progressError.value = err
  } finally {
    saving.value = false
  }
}

function handleClose() {
  emit('completed')
  emit('update:modelValue', false)
}

onMounted(loadExams)
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
            <h2 class="mt-2 font-serif text-2xl font-semibold text-ink">
              {{ step === 'exam' ? 'Which exam are you preparing for?' : 'Where do you stand right now?' }}
            </h2>
            <p class="mt-1 text-sm text-ink-soft">
              {{ step === 'exam'
                ? 'Pick the exam you want to prepare for.'
                : "Slide each chapter to your honest prep level. It's fine if most of it is zero." }}
            </p>

            <!-- Two-part progress bar -->
            <div class="mt-5 flex gap-2">
              <div class="h-1.5 flex-1 rounded-full bg-accent-deep"></div>
              <div
                class="h-1.5 flex-1 rounded-full transition-colors duration-300"
                :class="step === 'progress' ? 'bg-accent-deep' : 'bg-panel'"
              ></div>
            </div>
          </div>

          <!-- Body -->
          <div class="flex-1 overflow-hidden px-6 py-6">
            <Transition :name="direction" mode="out-in">
              <!-- STEP 1: exam selection -->
              <div v-if="step === 'exam'" key="exam">
                <p v-if="examsLoading" class="text-sm text-ink-soft">Loading exams…</p>
                <p v-else-if="examsError" class="text-sm text-rose-600">{{ examsError }}</p>
                <div v-else class="grid grid-cols-2 gap-3">
                  <button
                    v-for="exam in exams"
                    :key="exam.id"
                    type="button"
                    @click="selectedExamId = exam.id"
                    class="rounded-md border px-4 py-3 text-left text-sm font-medium transition-colors"
                    :class="
                      selectedExamId === exam.id
                        ? 'border-accent-deep bg-panel text-ink'
                        : 'border-line text-ink-soft hover:text-ink'
                    "
                  >
                    {{ exam.name }}
                  </button>
                </div>
              </div>

              <!-- STEP 2: progress -->
              <div v-else key="progress" class="max-h-[50vh] overflow-y-auto">
                <ProgressLoader v-if="progressLoading" label="Fetching your progress" />

                <p v-else-if="progressError" class="text-sm text-rose-600">{{ progressError }}</p>

                <div v-else>
                  <!-- Subject tabs -->
                  <div class="mb-6 flex gap-2">
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
                        <span class="text-ink">{{ chapter.title }}</span>
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
              </div>
            </Transition>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between border-t border-line px-6 py-4">
            <button
              v-if="step === 'progress'"
              type="button"
              :disabled="progressLoading"
              @click="handleBack"
              class="rounded-md border border-line px-5 py-2 text-sm font-medium text-ink transition-opacity disabled:opacity-50"
            >
              Back
            </button>
            <div v-else></div>

            <button
              v-if="step === 'exam'"
              type="button"
              :disabled="!selectedExamId || examsLoading"
              @click="handleNext"
              class="rounded-md bg-ink px-5 py-2 text-sm font-medium text-paper transition-opacity disabled:opacity-50"
            >
              Next
            </button>

            <button
              v-else-if="progressError"
              type="button"
              @click="handleClose"
              class="rounded-md bg-ink px-5 py-2 text-sm font-medium text-paper"
            >
              Close
            </button>

            <button
              v-else
              type="button"
              :disabled="saving || progressLoading"
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

.slide-forward-enter-active,
.slide-forward-leave-active,
.slide-back-enter-active,
.slide-back-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.slide-forward-enter-from {
  opacity: 0;
  transform: translateX(24px);
}
.slide-forward-leave-to {
  opacity: 0;
  transform: translateX(-24px);
}
.slide-back-enter-from {
  opacity: 0;
  transform: translateX(-24px);
}
.slide-back-leave-to {
  opacity: 0;
  transform: translateX(24px);
}
</style>
