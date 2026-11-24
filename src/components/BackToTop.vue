<template>
  <div
    v-show="showBackToTop"
    class="back-to-top"
    @click="scrollToTop"
    :title="t.back_to_top"
  >
    <svg class="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
    </svg>
  </div>
</template>

<script setup>
import { useScroll } from '../composables/useScroll'
import { useLocale } from '../composables/useLocale'

const { showBackToTop, scrollToTop } = useScroll()
const { t } = useLocale()
</script>
