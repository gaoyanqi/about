<template>
  <div :class="['relative mt-4 mb-12 animate-on-scroll', positionClass]">
    <div class="timeline-dot" style="background: var(--accent);"></div>
    <div class="timeline-card">
      <!-- Header (always visible) -->
      <div class="flex items-center gap-3 mb-1">
        <span class="timeline-tag !text-[10px]">{{ t.project }}</span>
        <h5 class="font-display text-sm font-bold text-[var(--text-primary)]">
          {{ project.project_name }}
        </h5>
      </div>
      <button class="project-toggle mt-4 mb-3" @click="expanded = !expanded">
        <span>{{ expanded ? (isZh ? '收起' : 'Collapse') : (isZh ? '展开' : 'Expand') }}</span>
        <span class="arrow" :class="{ 'rotate-90': expanded }">▸</span>
      </button>

      <!-- Details (collapsible) -->
      <transition name="slide">
        <div v-show="expanded" class="mt-4">
          <!-- Time -->
          <div class="font-mono text-[11px] text-[var(--text-muted)] tracking-wider mb-3">
            {{ project.start_time }} — {{ project.end_time }}
          </div>

          <!-- Details -->
          <ul class="space-y-2 text-sm">
            <li v-for="(kv, idx) in project.kv" :key="idx">
              <span class="text-[var(--text-secondary)] break-all" v-html="formatKV(kv)"></span>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLocale } from '../composables/useLocale'

const props = defineProps({
  project: { type: Object, required: true },
  index: { type: Number, default: 0 },
})

const { t, currentLocale } = useLocale()
const isZh = computed(() => currentLocale.value === 'zh')
const expanded = ref(false)

const positionClass = computed(() => {
  return props.index % 2 === 0 ? 'timeline-item-left' : 'timeline-item-right'
})

function formatKV(kv) {
  const label = `${kv.name}: ${kv.value || ''}`
  const urlMatch = label.match(/(https?:\/\/\S+)/)
  if (urlMatch) {
    const url = urlMatch[1]
    const before = label.substring(0, label.indexOf(url))
    const after = label.substring(label.indexOf(url) + url.length)
    return `${before}<a href="${url}" class="text-[var(--accent)] hover:underline break-all">${url}</a>${after}`
  }
  return label
}
</script>
