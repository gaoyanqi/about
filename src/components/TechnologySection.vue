<template>
  <section id="technology" class="section-divider py-20">
    <div class="max-w-6xl mx-auto px-6">
      <div class="section-heading animate-on-scroll">
        <h2>{{ t.skill_info }}</h2>
        <p>{{ t.tech_description }}</p>
      </div>

      <div class="skills-ribbon animate-on-scroll">
        <div class="core-skills-title">{{ t.core_skills }}</div>
        <div class="skills-grid">
          <span
            v-for="skill in skills"
            :key="skill.name"
            class="skill-badge"
            :style="{ borderColor: skill.color + '40', color: skill.color }"
          >
            {{ skill.content }}
          </span>
        </div>
      </div>

      <div class="skills-detail">
        <article
          v-for="(item, index) in t.tech_desc"
          :key="index"
          class="skill-group animate-on-scroll"
        >
          <h3>{{ item.category }}</h3>
          <p>{{ item.desc }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useLocale } from '../composables/useLocale'
import { skillDiagramItems } from '../data/skills'

const { t } = useLocale()
const skills = skillDiagramItems
</script>

<style scoped>
.skills-ribbon {
  display: grid;
  grid-template-columns: 180px minmax(0, 1fr);
  margin-bottom: 50px;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.core-skills-title {
  display: flex;
  align-items: center;
  padding: 26px 24px 26px 0;
  color: var(--text-primary);
  font-size: 23px;
  font-weight: 700;
  line-height: 1.4;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.skills-grid .skill-badge {
  display: flex;
  min-height: 78px;
  align-items: center;
  justify-content: center;
  padding: 18px 12px;
  color: var(--text-secondary) !important;
  background: transparent;
  border: 0 !important;
  border-left: 1px solid var(--border) !important;
  border-radius: 0;
  font-size: 12px;
  line-height: 1.6;
  text-align: center;
  transform: none;
}

.skills-grid .skill-badge:nth-child(n + 4) {
  border-top: 1px solid var(--border) !important;
}

.skills-detail {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  column-gap: 56px;
}

.skill-group {
  padding: 25px 0 28px;
  border-top: 1px solid var(--border);
}

.skill-group h3 {
  margin: 0 0 11px;
  color: var(--accent);
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: -0.015em;
  line-height: 1.75;
  overflow-wrap: anywhere;
}

.skill-group p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.85;
}

@media (max-width: 767px) {
  .skills-ribbon {
    grid-template-columns: 1fr;
    margin-bottom: 36px;
  }

  .core-skills-title {
    padding: 18px 0;
    border-bottom: 1px solid var(--border);
    font-size: 20px;
  }

  .skills-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .skills-grid .skill-badge {
    min-height: 70px;
    border: 0 !important;
    font-size: 11px;
  }

  .skills-grid .skill-badge:nth-child(even) {
    border-left: 1px solid var(--border) !important;
  }

  .skills-grid .skill-badge:nth-child(n + 3) {
    border-top: 1px solid var(--border) !important;
  }

  .skills-detail {
    grid-template-columns: 1fr;
  }

  .skill-group {
    padding: 22px 0 24px;
  }
}
</style>
