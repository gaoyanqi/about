<template>
  <section id="introduction" class="section-divider relative min-h-screen flex items-center justify-center pt-16">
    <!-- Background gradient -->
    <div class="absolute inset-0 bg-gradient-to-b from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]"></div>
    <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(circle at 1px 1px, var(--text-muted) 1px, transparent 0); background-size: 40px 40px;"></div>

    <div class="relative max-w-4xl mx-auto px-6 text-center">
      <!-- Terminal-style prefix -->
      <div class="animate-fade-in font-mono text-xs text-[var(--text-muted)] tracking-wider mb-8">
        <span class="text-[var(--green)]">●</span>
        <span class="mx-2">~/resume</span>
        <span class="text-[var(--text-muted)]">—</span>
        <span class="mx-2">{{ isZh ? '张春生的个人简历' : "Chunsheng Zhang's Resume" }}</span>
      </div>

      <!-- Name -->
      <h1 class="animate-fade-in stagger-1 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-[0.9]">
        <span class="gradient-text">{{ t.name }}</span>
      </h1>

      <!-- Subtitle -->
      <p class="animate-fade-in stagger-2 font-mono text-xs sm:text-sm text-[var(--text-muted)] tracking-widest uppercase mb-10">
        {{ isZh ? '全栈软件工程师 · 架构师' : 'Full-Stack Engineer · Architect' }}
      </p>

      <!-- Bio -->
      <p class="animate-fade-in stagger-3 text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-10">
        {{ t.strapline }}
      </p>

      <!-- Email -->
      <div class="animate-fade-in stagger-4 font-mono text-sm mb-10">
        <span class="text-[var(--text-muted)]">email:</span>
        <a href="mailto:1097692918@qq.com" class="text-[var(--accent)] hover:underline ml-1">1097692918@qq.com</a>
      </div>

      <!-- Social Links -->
      <nav id="social" class="animate-fade-in stagger-5 mb-10">
        <ul id="social-icons" class="flex justify-center gap-3 flex-wrap">
          <li v-for="social in socialLinks" :key="social.name">
            <a :href="social.url" target="_blank" rel="noopener" :title="social.label[currentLocale]">
              <img :src="social.image" :alt="social.label[currentLocale]" class="social-icon" />
            </a>
          </li>
        </ul>
      </nav>

      <!-- Environmental Message -->
      <div class="environment-message animate-fade-in stagger-6 flex items-center justify-center gap-3 text-[var(--green)] text-sm font-mono">
        <canvas ref="heartCanvas" width="18" height="18" class="inline-block"></canvas>
        <span class="opacity-60">{{ t.env_message }}</span>
        <canvas ref="earthCanvas" width="40" height="40" class="inline-block"></canvas>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
        <svg class="w-5 h-5 text-[var(--text-muted)] opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useLocale } from '../composables/useLocale'
import socialLinks from '../data/socialLinks'
import { useHeart } from '../canvas/useHeart'
import { useEarth } from '../canvas/useEarth'

const { t, currentLocale } = useLocale()
const isZh = computed(() => currentLocale.value === 'zh')

const heartCanvas = ref(null)
const earthCanvas = ref(null)

onMounted(() => {
  if (heartCanvas.value) useHeart(heartCanvas.value, { width: 18, height: 18, scale: 0.5 })
  if (earthCanvas.value) useEarth(earthCanvas.value, { width: 40, height: 40 })
})
</script>
