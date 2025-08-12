import { createApp } from 'vue'
import App from './App.vue'
import router from './router/routes'
import './assets/tailwind.css' 

createApp(App).use(router).mount('#app')
