import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入重置样式
import './assets/scss/reset.scss'
import 'amfe-flexible'

// 引入字体图标的css
import './assets/font/iconfont.css'

createApp(App).use(store).use(router).mount('#app')
