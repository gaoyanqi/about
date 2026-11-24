<template>
  <section id="qrcode" class="contact-section">
    <div class="qrcode-layout max-w-6xl mx-auto px-6">
      <div class="qrcode-copy">
        <h2>{{ t.contact_title }}</h2>
        <p>{{ t.contact_description }}</p>
        <a class="email-link" href="mailto:1097692918@qq.com">1097692918@qq.com</a>
      </div>

      <div class="qrcode-frame">
        <img
          src="/images/qrcode2_new.png"
          :alt="t.contact_qr_alt"
          width="190"
          height="190"
          loading="lazy"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { useLocale } from '../composables/useLocale'

const { t } = useLocale()
</script>

<style scoped>
.contact-section {
  padding: 76px 0;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.qrcode-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 72px;
  align-items: center;
}

.qrcode-copy h2 {
  margin: 0 0 14px;
  color: var(--text-primary);
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 36px;
  font-weight: 700;
  letter-spacing: -0.035em;
  line-height: 1.3;
}

.qrcode-copy p {
  max-width: 520px;
  margin: 0 0 24px;
  color: var(--text-secondary);
  font-size: 15px;
  line-height: 1.85;
}

.qrcode-frame {
  padding: 14px;
  background: #ffffff;
  border: 1px solid var(--border);
  border-radius: 12px;
  box-shadow: 0 16px 38px var(--shadow-card);
}

.qrcode-frame img {
  display: block;
  width: 190px;
  height: 190px;
  object-fit: contain;
}

@media (max-width: 767px) {
  .contact-section {
    padding: 60px 0;
  }

  .qrcode-layout {
    grid-template-columns: 1fr;
    gap: 34px;
  }

  .qrcode-copy h2 {
    font-size: 31px;
  }

  .qrcode-frame {
    width: max-content;
  }
}
</style>
