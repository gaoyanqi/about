import { ref, onMounted, watch } from 'vue'
import { useLocale } from './useLocale'

const API_BASE = 'https://about.luomor.com/about'

export function useWorkExperience() {
  const { currentLocale } = useLocale()
  const experiences = ref(null)
  const grouped = ref({})
  const loading = ref(true)
  const error = ref(null)

  async function fetchData() {
    try {
      loading.value = true
      error.value = null
      const endpoint = currentLocale.value === 'en'
        ? `${API_BASE}/workExperienceEn?jsonp=0`
        : `${API_BASE}/workExperience?jsonp=0`

      const res = await fetch(endpoint)
      const json = await res.json()

      console.log('Fetched work experience data:', json)
      if (json.code === 200) {
        experiences.value = json.result.work_experiences
        grouped.value = groupByTag(experiences.value)
      }
    } catch (e) {
      error.value = e
      console.error('Failed to fetch work experience:', e)
    } finally {
      loading.value = false
    }
  }

  function groupByTag(items) {
    const tagOrder = []
    const tagMap = {}

    // Iterate from last to first (newest experience first)
    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i]
      const tag = item.tag
      if (!tagMap[tag]) {
        tagOrder.push(tag)
        tagMap[tag] = []
      }
      tagMap[tag].push(item)
    }

    const groups = {}
    for (let i = 0; i < tagOrder.length; i++) {
      groups[`${i + 1}_${tagOrder[i]}`] = tagMap[tagOrder[i]]
    }
    return groups
  }

  onMounted(fetchData)
  watch(currentLocale, fetchData)

  return { experiences, grouped, loading, error, fetch: fetchData }
}
