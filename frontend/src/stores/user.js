import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

/**
 * Logged-in user state.
 * Adjust field names / endpoint to match your Flask API once it exists —
 * everything here is a placeholder shape based on what the Home page needs.
 */
export const useUserStore = defineStore('user', () => {
  const name = ref('')
  const avatarUrl = ref('')
  const targetExam = ref('') // e.g. "JEE Main", "NEET"
  const streak = ref(0)
  const hasCompletedOnboarding = ref(true)

  const loading = ref(false)
  const error = ref(null)

  async function fetchProfile() {
    loading.value = true
    error.value = null
    try {
      const { data } = await axios.get('/api/user/me')
      name.value = data.name
      avatarUrl.value = data.avatarUrl
      targetExam.value = data.targetExam
      streak.value = data.streak
      hasCompletedOnboarding.value = data.hasCompletedOnboarding
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  function markOnboardingComplete() {
    hasCompletedOnboarding.value = true
  }

  return {
    name,
    avatarUrl,
    targetExam,
    streak,
    hasCompletedOnboarding,
    loading,
    error,
    fetchProfile,
    markOnboardingComplete,
  }
})
