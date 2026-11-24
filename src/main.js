import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/custom.css'
import { initializeTheme } from './composables/useTheme'

initializeTheme()

const app = createApp(App)
app.use(router)
app.mount('#app')
