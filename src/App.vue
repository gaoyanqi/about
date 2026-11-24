<template>
  <div class="min-h-screen font-body text-[var(--text-primary)] text-sm leading-relaxed overflow-x-hidden">
    <div class="noise-overlay"></div>
    <TheNavbar />
    <router-view />
    <BackToTop />
  </div>
</template>

<script setup>
import TheNavbar from './components/TheNavbar.vue'
import BackToTop from './components/BackToTop.vue'
</script>
