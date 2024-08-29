import { createApp } from 'vue'
import router  from './routers'
import App from './App.vue'
import '@/assets/css/global.css'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
