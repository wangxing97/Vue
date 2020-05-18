import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../src/assets/css/global.css'
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://localhost:8080/users/user/'
Vue.prototype.$http = axios
Vue.use(ElementUi)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
