<template>
  <div class="architecture-board" role="img" :aria-label="t.hero.map_label">
    <div class="board-heading" aria-hidden="true">
      <span>{{ t.hero.map_title }}</span>
      <small>ZCS / SYSTEM MAP</small>
    </div>

    <div class="system-map" aria-hidden="true">
      <svg viewBox="0 0 400 390" preserveAspectRatio="none">
        <circle cx="200" cy="195" r="137"></circle>
        <path d="M200 195L82 88M200 195L318 88M200 195L84 306M200 195L318 306M200 195L344 195"></path>
      </svg>

      <div class="map-core">
        <strong>ZCS</strong>
        <span>Full Stack</span>
      </div>

      <div
        v-for="node in t.hero.map_nodes"
        :key="node.key"
        class="map-node"
        :class="`node-${node.key}`"
      >
        <span>{{ node.label }}</span>
        <small>{{ node.tech }}</small>
      </div>
    </div>

    <div class="board-caption" aria-hidden="true">
      <span>{{ t.hero.map_caption }}</span>
      <small>CODE × ART</small>
    </div>
  </div>
</template>

<script setup>
import { useLocale } from '../composables/useLocale'

const { t } = useLocale()
</script>

<style scoped>
.architecture-board {
  position: relative;
  width: 100%;
  min-width: 0;
  overflow: hidden;
  color: #f0f4f8;
  background: #102a43;
  border: 1px solid #243b53;
  border-radius: 16px;
  box-shadow: 0 24px 60px var(--shadow-card);
}

.architecture-board::before {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(159, 179, 200, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(159, 179, 200, 0.07) 1px, transparent 1px);
  background-size: 28px 28px;
  content: '';
  pointer-events: none;
}

.board-heading,
.board-caption {
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 21px 26px;
}

.board-heading {
  border-bottom: 1px solid rgba(159, 179, 200, 0.18);
  font-size: 13px;
  font-weight: 600;
}

.board-heading small {
  color: #69dbcf;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.06em;
  white-space: nowrap;
}

.system-map {
  position: relative;
  z-index: 1;
  height: 390px;
  margin: 0 8px;
}

.system-map svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.system-map svg path,
.system-map svg circle {
  fill: none;
  stroke: #69dbcf;
  stroke-width: 1.25;
  vector-effect: non-scaling-stroke;
}

.system-map svg path {
  opacity: 0.42;
}

.system-map svg circle {
  opacity: 0.2;
  stroke-dasharray: 4 7;
}

.map-core,
.map-node {
  position: absolute;
  z-index: 2;
  text-align: center;
}

.map-core {
  top: 50%;
  left: 50%;
  display: flex;
  width: 124px;
  height: 124px;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: #0b1f33;
  background: #69dbcf;
  border: 7px solid rgba(105, 219, 207, 0.15);
  border-radius: 50%;
  box-shadow: 0 0 0 1px #69dbcf, 0 12px 30px rgba(0, 0, 0, 0.18);
  transform: translate(-50%, -50%);
}

.map-core strong {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1.2;
}

.map-core span {
  margin-top: 4px;
  font-size: 11px;
  font-weight: 650;
}

.map-node {
  min-width: 132px;
  max-width: 154px;
  padding: 11px 13px;
  background: rgba(11, 31, 51, 0.92);
  border: 1px solid #486581;
  border-radius: 7px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
}

.map-node span,
.map-node small {
  display: block;
}

.map-node span {
  color: #f0f4f8;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.5;
}

.map-node small {
  margin-top: 2px;
  color: #9fb3c8;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 8px;
  line-height: 1.5;
  white-space: nowrap;
}

.node-frontend {
  top: 28px;
  left: 0;
}

.node-backend {
  top: 28px;
  right: 0;
}

.node-data {
  bottom: 24px;
  left: 0;
}

.node-cloud {
  right: 0;
  bottom: 24px;
}

.node-ai {
  top: 50%;
  right: -4px;
  transform: translateY(-50%);
}

.board-caption {
  border-top: 1px solid rgba(159, 179, 200, 0.18);
  color: #d9e2ec;
  font-size: 12px;
}

.board-caption small {
  color: #829ab1;
  font-size: 9px;
  white-space: nowrap;
}

@media (max-width: 1100px) {
  .map-node {
    min-width: 114px;
    padding-right: 9px;
    padding-left: 9px;
  }

  .board-heading,
  .board-caption {
    padding-right: 20px;
    padding-left: 20px;
  }
}

@media (max-width: 767px) {
  .architecture-board {
    max-width: 600px;
    border-radius: 12px;
  }

  .system-map {
    height: 350px;
  }

  .map-core {
    width: 108px;
    height: 108px;
  }

  .board-caption small {
    display: none;
  }
}

@media (max-width: 390px) {
  .system-map {
    height: 320px;
  }

  .board-heading,
  .board-caption {
    padding: 17px 18px;
  }

  .board-heading {
    font-size: 12px;
  }

  .board-heading small {
    font-size: 8px;
  }

  .map-node {
    min-width: 98px;
    max-width: 110px;
    padding: 8px 5px;
  }

  .map-node span {
    font-size: 11px;
  }

  .map-node small {
    font-size: 7px;
  }

  .map-core {
    width: 94px;
    height: 94px;
    border-width: 5px;
  }

  .map-core strong {
    font-size: 23px;
  }

  .map-core span {
    font-size: 9px;
  }
}
</style>
