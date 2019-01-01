import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import 'bulma/css/bulma.css'
import 'bulma-extensions/bulma-slider/dist/css/bulma-slider.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMinus, faExpand, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faMinus, faExpand, faTimes)

import Receipt from './components/Receipt'

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('receipt', Receipt)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')

