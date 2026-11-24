<template>
  <section id="statement" class="section-divider py-20">
    <div class="max-w-4xl mx-auto px-6">
      <div class="section-heading">
        <h2>{{ t.statement_ref }}</h2>
      </div>
      <ul class="flex justify-start">
        <li>
          <a href="https://about.luomor.com/aboutMe/aboutMe.html" class="font-mono text-sm text-[var(--accent)] hover:underline break-all">
            Timeline
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import { useLocale } from '../composables/useLocale'

const { t } = useLocale()
</script>
