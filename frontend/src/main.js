import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './style.css'
import App from './App.vue'
import router from './router'
import { revealDirective } from './composables/revealDirective.js'


const app = createApp(App)

app.use(createPinia())
app.use(router)
app.directive('reveal', revealDirective)
app.mount('#app')
