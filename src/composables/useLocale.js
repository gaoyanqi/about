import { computed } from 'vue'
import { useRoute } from 'vue-router'
import zh from '../locales/zh'
import en from '../locales/en'

const locales = { zh, en }

export function useLocale() {
  const route = useRoute()
  const currentLocale = computed(() => route.meta.locale || 'zh')
  const t = computed(() => locales[currentLocale.value] || locales.zh)
  return { currentLocale, t }
}
