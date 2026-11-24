<template>
  <button
    type="button"
    class="theme-toggle"
    :aria-label="themeLabel"
    :title="themeLabel"
    @click="toggleTheme"
  >
    <svg v-if="isDark" class="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="3.5" stroke-width="1.5" />
      <path stroke-linecap="round" stroke-width="1.5" d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4" />
    </svg>
    <svg v-else class="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 15.2A8.5 8.5 0 0 1 8.8 4a8.5 8.5 0 1 0 11.2 11.2Z" />
    </svg>
  </button>
</template>

<script setup>
import { computed } from 'vue'
import { useLocale } from '../composables/useLocale'
import { useTheme } from '../composables/useTheme'

const { t } = useLocale()
const { isDark, toggleTheme } = useTheme()

const themeLabel = computed(() => isDark.value ? t.value.theme_to_light : t.value.theme_to_dark)
</script>
