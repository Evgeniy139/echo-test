import Vue from 'vue'
import VueMask from 'v-mask'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './assets/styles/styles.scss'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(VueMask)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
