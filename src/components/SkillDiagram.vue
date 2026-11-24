<template>
  <div class="skill-section-one relative h-[300px] mt-16 mb-16 mx-auto flex flex-col items-center">
    <!-- Central Spinning Circle -->
    <div class="core-skills w-[100px] h-[100px] mobile:w-[100px] mobile:h-[100px] tablet:w-[200px] tablet:h-[200px] bg-grunge bg-[rgba(230,230,230,0.9)] rounded-full flex items-center justify-center font-display font-light text-[20px] mobile:text-[20px] tablet:text-[40px] text-center leading-[100px] mobile:leading-[100px] tablet:leading-[200px] animate-spin-slow hover:bg-[rgba(0,0,0,0.9)] hover:bg-grunge cursor-pointer z-10">
      {{ coreLabel }}
    </div>

    <!-- Triangles -->
    <div class="skill-diagram relative w-[300px] h-[300px] mt-[-120px] mobile:w-[200px] mobile:h-[200px] mobile:mt-[-80px]">
      <div
        v-for="skill in skills"
        :key="skill.name"
        class="absolute text-white text-center leading-[40px] border-b-[40px] border-l-[20px] border-r-[20px] border-l-transparent border-r-transparent rounded-[45px] w-[160px] h-0"
        :style="{ borderBottomColor: skill.color, ...getSkillPosition(skill.name) }"
      >
        <div
          class="skill-content transform rotate-[180deg]"
          :style="{ transform: 'rotate(-180deg)' }"
        >
          {{ skill.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLocale } from '../composables/useLocale'
import { skillDiagramItems } from '../data/skills'

const { t } = useLocale()
const skills = skillDiagramItems
const coreLabel = computed(() => t.value.core_skills)

const positions = {
  'java-php': { top: '0px', left: '70px', transform: 'rotate(180deg)', animation: 'div_java_php_skill 5s forwards' },
  'html5-css3': { top: '65px', left: '-40px', transform: 'rotate(120deg)', animation: 'div_html5_css3_skill 5s forwards' },
  'js-jquery': { top: '65px', left: '180px', transform: 'rotate(-120deg)', animation: 'div_js_jquery_skill 5s forwards' },
  'mysql-oracle': { top: '195px', left: '-40px', transform: 'rotate(60deg)', animation: 'div_mysql_oracle_skill 5s forwards' },
  'nosql': { top: '195px', left: '180px', transform: 'rotate(-60deg)', animation: 'div_nosql_skill 5s forwards' },
  'hbase-thrift': { top: '260px', left: '70px', transform: 'rotate(0deg)', animation: 'div_hbase_thrift_skill 5s forwards' },
}

function getSkillPosition(name) {
  return positions[name] || {}
}
</script>
