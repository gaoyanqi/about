<template>
  <div :class="[
    'relative mb-12 animate-on-scroll',
    index % 2 === 0 ? 'timeline-item-left' : 'timeline-item-right'
  ]">
    <div class="timeline-dot"></div>
    <div class="timeline-card">
      <!-- Time -->
      <div class="font-mono text-[11px] text-[var(--text-muted)] tracking-wider mb-3">
        {{ experience.start_time }} — {{ experience.end_time }}
      </div>

      <!-- Title -->
      <h4 class="font-display text-lg font-bold text-[var(--text-primary)] mb-2">
        {{ experience.title }}
      </h4>

      <!-- Description -->
      <p v-if="experience.desc" class="text-[var(--text-secondary)] text-sm mb-4 leading-relaxed" v-html="experience.desc"></p>

      <!-- Meta -->
      <ul class="space-y-2 text-sm">
        <li v-if="experience.address">
          <span class="text-[var(--text-secondary)]">{{ isZh ? '地点' : 'LOC' }}: {{ experience.address }}</span>
        </li>
        <li v-if="experience.job_title">
          <span class="text-[var(--text-secondary)]">{{ isZh ? '职位' : 'ROLE' }}: {{ experience.job_title }}</span>
        </li>
        <li v-if="experience.responsibility">
          <span class="text-[var(--text-secondary)]">{{ isZh ? '职责' : 'RESP' }}: {{ experience.responsibility }}</span>
        </li>
        <li v-for="(ext, idx) in experience.ext" :key="idx">
          <span class="text-[var(--text-secondary)] break-all" v-html="formatExt(ext)"></span>
        </li>
      </ul>
    </div>

  </div>
</template>

<script setup>
const props = defineProps({
  experience: { type: Object, required: true },
  index: { type: Number, required: true },
  total: { type: Number, required: true },
  parentIndex: { type: Number, default: 0 },
})

function formatExt(ext) {
  const label = `${ext.name}: ${ext.value || ''}`
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
