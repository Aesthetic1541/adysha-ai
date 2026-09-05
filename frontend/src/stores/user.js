import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'


export const useUserStore = defineStore('user', () => {
  const name = ref('')
  const avatarUrl = ref('')
  const targetExam = ref('') // e.g. "JEE Main", "NEET"
  const streak = ref(0)
  const hasCompletedOnboarding = ref(true)

  const loading = ref(false)
  const error = ref(null)

  async function fetchProfile() {
    console.log('Fetching user profile...');
    loading.value = true
    error.value = null
    try {
      const { data } = await axios.get('/api/auth/me')
      console.log('Fetched user profile:', data);
      name.value = data.name
      avatarUrl.value = data.avatarUrl
      targetExam.value = data.exam
      streak.value = data.streak
      hasCompletedOnboarding.value = data.onboarding
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  function markOnboardingComplete() {
    hasCompletedOnboarding.value = true
    axios.post('/api/onboarding/update', {"target": "onboarding", "onboarding": true})
    .catch(err => console.error('Error marking onboarding complete:', err))
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
