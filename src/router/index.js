import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/zh',
    name: 'zh',
    component: () => import('../components/ResumePage.vue'),
    meta: { locale: 'zh', title: '张春生 | 软件工程师' }
  },
  {
    path: '/en',
    name: 'en',
    component: () => import('../components/ResumePage.vue'),
    meta: { locale: 'en', title: 'Chunsheng Zhang | Software Engineer' }
  },
  {
    path: '/',
    redirect: '/zh'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth', top: 80 }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  }
})

router.afterEach((to) => {
  document.title = to.meta.title || 'Chunsheng Zhang | Software Engineer'
  document.documentElement.lang = to.meta.locale === 'en' ? 'en' : 'zh-CN'
})

export default router
