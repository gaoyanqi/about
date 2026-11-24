<template>
  <section id="introduction" class="hero-section section-divider">
    <div class="hero-shell max-w-6xl mx-auto px-6">
      <div class="hero-copy animate-fade-in">
        <h1 class="hero-title">
          <span class="hero-greeting">{{ t.hero.greeting }}</span>
          <span class="hero-name">{{ t.hero.name }}</span>
        </h1>

        <p class="hero-role">{{ t.hero.role }}</p>
        <p class="hero-summary">{{ t.hero.summary }}</p>
        <p class="hero-detail">{{ t.hero.detail }}</p>

        <div class="hero-keywords" :aria-label="t.hero.keywords_label">
          <span v-for="keyword in t.hero.keywords" :key="keyword">{{ keyword }}</span>
        </div>

        <div class="contact-line">
          <a class="email-link" href="mailto:1097692918@qq.com">1097692918@qq.com</a>
          <span class="location-note">{{ t.hero.location }}</span>
        </div>

        <nav id="social" :aria-label="t.hero.social_label">
          <ul id="social-icons" class="flex justify-start gap-3 flex-wrap">
            <li v-for="social in socialLinks" :key="social.name">
              <a
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                :title="social.label[currentLocale]"
              >
                <img :src="social.image" :alt="social.label[currentLocale]" class="social-icon" />
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <ArchitectureBoard class="animate-fade-in stagger-1" />
    </div>

    <div class="hero-footer max-w-6xl mx-auto px-6">
      <div class="environment-message flex items-center gap-2 text-[var(--green)] text-xs font-mono">
        <canvas ref="heartCanvas" width="18" height="18" class="inline-block" aria-hidden="true"></canvas>
        <span>{{ t.env_message }}</span>
      </div>
      <span class="hero-footer-note">ENGINEERING / CURIOSITY / CRAFT</span>
      <canvas ref="earthCanvas" width="40" height="40" class="earth-canvas" aria-hidden="true"></canvas>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useLocale } from '../composables/useLocale'
import socialLinks from '../data/socialLinks'
import { useHeart } from '../canvas/useHeart'
import { useEarth } from '../canvas/useEarth'
import ArchitectureBoard from './ArchitectureBoard.vue'

const { t, currentLocale } = useLocale()
const heartCanvas = ref(null)
const earthCanvas = ref(null)
let cleanupHeart
let cleanupEarth

onMounted(() => {
  if (heartCanvas.value) {
    cleanupHeart = useHeart(heartCanvas.value, { width: 18, height: 18, scale: 0.5 })
  }
  if (earthCanvas.value) {
    cleanupEarth = useEarth(earthCanvas.value, { width: 40, height: 40 })
  }
})

onUnmounted(() => {
  cleanupHeart?.()
  cleanupEarth?.()
})
</script>

<style scoped>
.hero-section {
  display: flex;
  min-height: 100svh;
  flex-direction: column;
  justify-content: center;
  padding: 120px 0 32px;
}

.hero-shell {
  display: grid;
  width: 100%;
  grid-template-columns: minmax(0, 1.12fr) minmax(370px, 0.88fr);
  gap: 64px;
  align-items: center;
}

.hero-copy {
  min-width: 0;
}

.hero-title {
  margin: 0 0 26px;
  line-height: 1.05;
}

.hero-greeting {
  display: block;
  margin-bottom: 16px;
  color: var(--accent);
  font-family: 'DM Sans', -apple-system, sans-serif;
  font-size: 20px;
  font-weight: 600;
  letter-spacing: 0;
  line-height: 1.4;
}

.hero-name {
  display: block;
  color: var(--text-primary);
  font-family: 'Playfair Display', Georgia, serif;
  font-size: clamp(54px, 6vw, 80px);
  font-weight: 900;
  letter-spacing: -0.055em;
  line-height: 1.04;
  text-wrap: balance;
}

.hero-role {
  margin: 0 0 20px;
  color: var(--text-primary);
  font-size: 21px;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.5;
}

.hero-summary {
  max-width: 630px;
  margin: 0 0 16px;
  color: var(--text-secondary);
  font-size: 16px;
  line-height: 1.9;
}

.hero-detail {
  max-width: 630px;
  margin: 0;
  color: var(--text-muted);
  font-size: 14px;
  line-height: 1.85;
}

.hero-keywords {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 24px 0;
}

.hero-keywords span {
  padding: 5px 11px;
  color: var(--accent);
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.6;
}

.contact-line {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  margin: 26px 0 22px;
}

.location-note {
  color: var(--text-muted);
  font-size: 13px;
}

.hero-footer {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-top: 56px;
  padding-top: 22px;
  border-top: 1px solid var(--border);
}

.hero-footer-note {
  color: var(--text-muted);
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.04em;
}

.earth-canvas {
  display: block;
  flex: 0 0 40px;
  border-radius: 50%;
}

@media (max-width: 1020px) {
  .hero-shell {
    grid-template-columns: minmax(0, 1fr) minmax(330px, 0.82fr);
    gap: 38px;
  }

  .hero-name {
    font-size: 58px;
  }
}

@media (max-width: 880px) {
  .hero-section {
    padding-top: 104px;
  }

  .hero-shell {
    grid-template-columns: minmax(0, 1fr);
    gap: 48px;
  }

  .hero-copy {
    max-width: 700px;
  }

  .hero-name {
    font-size: clamp(48px, 9vw, 70px);
  }
}

@media (max-width: 767px) {
  .hero-section {
    padding: 96px 0 26px;
  }

  .hero-greeting {
    margin-bottom: 12px;
    font-size: 17px;
  }

  .hero-name {
    font-size: clamp(43px, 12vw, 62px);
  }

  .hero-role {
    font-size: 19px;
  }

  .hero-summary {
    font-size: 15px;
    line-height: 1.85;
  }

  .hero-footer {
    margin-top: 40px;
  }

  .hero-footer-note {
    display: none;
  }
}

@media (max-width: 390px) {
  .email-link {
    font-size: 12px;
  }
}
</style>
