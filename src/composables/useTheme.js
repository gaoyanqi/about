import { computed, ref } from 'vue'

const STORAGE_KEY = 'resume-theme'
const VALID_THEMES = ['dark', 'light']

function getStoredTheme() {
  if (typeof window === 'undefined') return null

  try {
    const savedTheme = window.localStorage.getItem(STORAGE_KEY)
    return VALID_THEMES.includes(savedTheme) ? savedTheme : null
  } catch {
    return null
  }
}

function getSystemTheme() {
  if (typeof window === 'undefined' || !window.matchMedia) return 'dark'
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function applyTheme(value) {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  root.dataset.theme = value
  root.style.colorScheme = value
  root.style.backgroundColor = value === 'light' ? '#f7f8fa' : '#0a0a0b'

  const themeColor = document.querySelector('meta[name="theme-color"]')
  if (themeColor) {
    themeColor.setAttribute('content', value === 'light' ? '#f7f8fa' : '#0a0a0b')
  }
}

const theme = ref(getStoredTheme() || getSystemTheme())
let initialized = false

export function initializeTheme() {
  applyTheme(theme.value)

  if (initialized || typeof window === 'undefined') return
  initialized = true

  if (window.matchMedia) {
    const systemTheme = window.matchMedia('(prefers-color-scheme: light)')
    systemTheme.addEventListener('change', event => {
      if (!getStoredTheme()) {
        theme.value = event.matches ? 'light' : 'dark'
        applyTheme(theme.value)
      }
    })
  }

  window.addEventListener('storage', event => {
    if (event.key !== STORAGE_KEY) return

    const nextTheme = VALID_THEMES.includes(event.newValue) ? event.newValue : getSystemTheme()
    theme.value = nextTheme
    applyTheme(nextTheme)
  })
}

export function useTheme() {
  const isDark = computed(() => theme.value === 'dark')

  function setTheme(value) {
    if (!VALID_THEMES.includes(value)) return

    theme.value = value
    applyTheme(value)

    try {
      window.localStorage.setItem(STORAGE_KEY, value)
    } catch {
      // The selected theme still works when storage is unavailable.
    }
  }

  function toggleTheme() {
    setTheme(isDark.value ? 'light' : 'dark')
  }

  return {
    theme: computed(() => theme.value),
    isDark,
    setTheme,
    toggleTheme,
  }
}
