import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3


import { createSSRApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia';



export function createApp() {
    const app = createSSRApp(App)
    // 全局注册 ElementPlus
    app.use(ElementPlus)
	app.use(createPinia()); 
    return {
        app, 
    } 
}
// #endif