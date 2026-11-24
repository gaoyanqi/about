import { ref, onMounted, onUnmounted } from 'vue'

export function useScroll() {
  const showBackToTop = ref(false)
  const scrollOffset = ref(0)

  function handleScroll() {
    scrollOffset.value = document.documentElement.scrollTop || document.body.scrollTop
    showBackToTop.value = scrollOffset.value > 10
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function scrollTo(el) {
    if (typeof el === 'string') {
      el = document.querySelector(el)
    }
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return { showBackToTop, scrollOffset, scrollToTop, scrollTo }
}
