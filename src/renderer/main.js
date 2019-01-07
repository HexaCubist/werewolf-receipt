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

import Toasted from 'vue-toasted';
 
Vue.use(Toasted)

import Receipt from './components/Receipt'

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('receipt', Receipt)

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false


// Get list of games in the /src/games folder and l
var glob = require( 'glob' )
  , path = require( 'path' )
const settings = require('electron-settings');

var games = []
var normalizedPath = path.join(__static, "/games")

require("fs").readdirSync(normalizedPath).forEach(function(file) {
  console.log("Found game:")
  console.log(file)
  games.push( require("../../static/games/" + file) )
})

if (!settings.has('game_ind')) {
  // Game is not initialised, set to default (0).
  settings.set('game_ind', 0)
}


/* eslint-disable no-new */
var vm = new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
  data: {
    games: games,
  },
}).$mount('#app')
