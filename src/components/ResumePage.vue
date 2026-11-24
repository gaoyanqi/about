<template>
  <main>
    <IntroductionSection />
    <TechnologySection />
    <WorkSection />
    <QrCodeSection />
    <StatementSection />
    <footer class="py-16 border-t border-[var(--border)]">
      <div class="max-w-6xl mx-auto px-6 text-center">
        <p class="font-mono text-[11px] text-[var(--text-muted)] tracking-wider">
          <span class="text-[var(--accent)]">&lt;/&gt;</span>
          <span class="mx-2"><a href="https://www.luomor.com">{{ isZh ? '烙馍网' : 'Luomor' }}</a></span>
          <span class="opacity-40">·</span>
          <span class="mx-2">2015 - {{ new Date().getFullYear() }}</span>
          <span class="opacity-40">·</span>
          <span class="mx-2"><a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" class="hover:text-gray-500 transition-colors"> 京ICP备16044936号-1 </a></span>
        </p>
      </div>
    </footer>
  </main>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useLocale } from '../composables/useLocale'
import { useScrollAnimations } from '../composables/useScrollAnimations'
import IntroductionSection from './IntroductionSection.vue'
import TechnologySection from './TechnologySection.vue'
import WorkSection from './WorkSection.vue'
import QrCodeSection from './QrCodeSection.vue'
import StatementSection from './StatementSection.vue'

const { currentLocale, t } = useLocale()
const isZh = computed(() => currentLocale.value === 'zh')

useScrollAnimations()
</script>
