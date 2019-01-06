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


// Get list of games in the /src/games folder and l
var glob = require( 'glob' )
  , path = require( 'path' )
const settings = require('electron-settings');

var games = []
var normalizedPath = require("path").join(__dirname, "../games")

require("fs").readdirSync(normalizedPath).forEach(function(file) {
  console.log("Found game:")
  console.log(file)
  games.push( require("../games/" + file) )
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
    game_ind: settings.get('game_ind'),
    games: games,
    print: {
      print_all: false,
      fold: true,
      reverse_image: "data:image/png;base64,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"
    }
  },
  computed: {
    card_info: function() {
      return this.$data.games[this.$data.game_ind].card_info
    },
    game_info: function() {
      return this.$data.games[this.$data.game_ind].game_info
    },
  }
}).$mount('#app')
